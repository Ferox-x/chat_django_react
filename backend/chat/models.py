from core.models import UUIDModelMixin
from django.db import models


class ChatModel(UUIDModelMixin):

    room_name = models.CharField(
        'название комнаты',
        max_length=255,
        unique=True,
    )


class MessageModel(UUIDModelMixin):

    chat = models.ForeignKey(
        'chat.ChatModel',
        verbose_name='чат',
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        'users.UserModel',
        verbose_name='пользователь',
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(
        'дата отправки',
    )
    message = models.TextField(
        verbose_name='сообщение',
    )
