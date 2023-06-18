from django.forms import ModelForm

from chat.models import ChatModel


class RoomForm(ModelForm):
    class Meta:
        model = ChatModel
        fields = ['room_name']
