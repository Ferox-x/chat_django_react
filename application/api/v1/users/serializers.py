from rest_framework import serializers
from users.models import UserModel


class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id',)
