from chat.models import ChatModel, MessageModel
from rest_framework.serializers import ModelSerializer


class ChatRoomMessagesSerializer(ModelSerializer):
    def to_representation(self, instance):
        return {
            'text': instance.message,
            'username': instance.user.username,
            'user_id': str(instance.user.id),
            'time': str(instance.created_at),
            'delivered': True,
        }

    def validate_message(self, message: str):
        return ' '.join(message.strip().split())

    class Meta:
        model = MessageModel
        fields = (
            'message',
            'user',
            'created_at',
        )


class ChatSerializer(ModelSerializer):
    class Meta:
        model = ChatModel
        fields = (
            'id',
            'room_name',
        )
