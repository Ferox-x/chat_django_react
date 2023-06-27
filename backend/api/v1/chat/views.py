from http import HTTPStatus

from chat.models import ChatModel, MessageModel
from django.http import HttpResponse
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import GenericViewSet

from api.v1.chat.serializers import ChatRoomMessagesSerializer, ChatSerializer


class ChatRoomMessages(mixins.RetrieveModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatRoomMessagesSerializer

    def get_queryset(self):
        room_name = self.kwargs.get('pk')
        return MessageModel.objects.filter(chat_id=room_name).order_by('created_at')

    def retrieve(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return HttpResponse(
            JSONRenderer().render(serializer.data),
            status=HTTPStatus.OK,
        )


class ChatsViewSet(mixins.ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ChatModel.objects.all()
    serializer_class = ChatSerializer
