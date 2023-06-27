import json

import pytils
from api.v1.chat.serializers import ChatRoomMessagesSerializer
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.cache import cache

from chat.models import ChatModel, MessageModel

connected_users = {}


class BaseConsumer(AsyncWebsocketConsumer):
    async def receive(self, text_data):
        data_json = json.loads(text_data)
        action = data_json['action']
        data = data_json['data']

        method = getattr(self, f'action_{action}')
        await method(data)


class ChatConsumer(BaseConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        if not self.scope['user'].is_authenticated:
            await self.close(1000)
        if self.room_name in connected_users.keys():
            connected_users[self.room_name] += 1
        else:
            connected_users[self.room_name] = 1

        cached_room_name = cache.get(self.room_name)
        if not cached_room_name:
            cached_room_name = await self.get_chat_room_name()
            cache.set(self.room_name, cached_room_name, None)

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

        await self.channel_layer.send(
            self.channel_name,
            {
                'type': 'chat.message',
                'json': {
                    'action': 'connect',
                    'data': {
                        'room_name': cached_room_name,
                    },
                },
            },
        )

        await self._update_players()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        connected_users[self.room_name] -= 1
        if connected_users[self.room_name] == 0:
            connected_users.pop(self.room_name)
            cache.delete(self.room_name)

        await self._update_players()

    @database_sync_to_async
    def get_chat_room_name(self):
        return ChatModel.objects.get(id=self.room_name).room_name

    @database_sync_to_async
    def create_message(self, message_text, time, user):
        serializer = ChatRoomMessagesSerializer(
            data={
                'message': message_text,
                'user': self.scope['user'].id,
                'created_at': time,
            }
        )
        if serializer.is_valid():
            return MessageModel.objects.create(
                **serializer.validated_data, chat_id=self.room_name
            )

    async def action_send_message(self, data):
        message_text = data.get('message')
        time = data.get('time')
        user = self.scope['user']

        message = await self.create_message(message_text, time, user)
        if message:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat.message',
                    'json': {
                        'action': 'receive_message',
                        'data': {
                            'message': message.message,
                            'username': message.user.username,
                            'user_id': str(message.user.id),
                            'datetime': str(message.created_at),
                            'delivered': True,
                        },
                    },
                },
            )

    async def chat_message(self, event):
        json_data = event['json']
        await self.send(text_data=json.dumps(json_data))

    async def _update_players(self):
        try:

            users_string = (
                str(connected_users[self.room_name])
                + ' '
                + pytils.numeral.choose_plural(
                    connected_users[self.room_name],
                    (u'участник', u'участника', u'участников'),
                )
            )
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat.message',
                    'json': {
                        'action': 'update_users',
                        'data': {
                            'users': users_string,
                        },
                    },
                },
            )
        except KeyError:
            return None
