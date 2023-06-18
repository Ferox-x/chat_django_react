from http import HTTPStatus

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import TemplateView

from chat.forms import RoomForm
from chat.models import ChatModel


class ChatView(LoginRequiredMixin, TemplateView, View):
    template_name = 'chat/create_chat.html'
    login_url = reverse_lazy('users-urls:login')

    def post(self, request: HttpRequest):
        data = request.POST
        form = RoomForm(data)
        if form.is_valid():
            room = form.save()
            return redirect('chat-urls:chat_room', room_id=room.id)
        json_error = form.errors.as_json()
        return HttpResponse(json_error, status=HTTPStatus.BAD_REQUEST)


class ChatDetailView(LoginRequiredMixin, View):
    login_url = reverse_lazy('users-urls:login')

    def get(self, request, room_id):
        get_object_or_404(ChatModel, id=room_id)
        return render(
            request, 'chat/room_chat.html', context={'user_id': request.user.id}
        )
