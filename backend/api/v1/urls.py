from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.v1.chat.views import ChatRoomMessages, ChatsViewSet
from api.v1.users.views import UserViewSet

app_name = 'v1'

router_v1 = DefaultRouter()

router_v1.register('users', UserViewSet, basename='users')

router_v1.register('chats', ChatRoomMessages, basename='chat-messages')
router_v1.register('chats', ChatsViewSet, basename='chats')

urlpatterns = [
    path('', include(router_v1.urls)),
]
