from django.urls import path

from chat import views

app_name = 'chat'

urlpatterns = [
    path('chat/', views.ChatView.as_view(), name='chat'),
    path('chat/<str:room_id>', views.ChatDetailView.as_view(), name='chat_room'),
]
