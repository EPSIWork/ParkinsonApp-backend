# myapp/permissions.py

from rest_framework.permissions import BasePermission

class AdminPermissionOnly(BasePermission):
    """
    Custom permission class to restrict access to admin users only.
    """
    def has_permission(self, request, view):
        # Check if the user is authenticated and is an admin
        return request.user.is_authenticated and request.user.is_admin
