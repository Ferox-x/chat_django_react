from core.models import UUIDModelMixin
from django.contrib.auth.models import AbstractUser


class UserModel(AbstractUser, UUIDModelMixin):
    pass
