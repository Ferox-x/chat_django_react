from uuid import uuid4

from django.db import models


class UUIDModelMixin(models.Model):
    id = models.UUIDField(
        'uuid4',
        primary_key=True,
        default=uuid4,
        editable=False,
        unique=True,
    )

    class Meta:
        abstract = True
