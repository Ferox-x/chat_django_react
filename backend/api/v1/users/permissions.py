from rest_framework import permissions


class IsCurrentUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            return obj.pk == request.user.pk
