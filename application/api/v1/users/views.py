from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from users.models import UserModel

from api.v1.users.permissions import IsCurrentUser
from api.v1.users.serializers import UserMeSerializer


class UserViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, IsCurrentUser]
    queryset = UserModel.objects.all()
    serializer_class = UserMeSerializer

    def get_object(self):
        return self.request.user

    @action(['get'], detail=False)
    def me(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
