# myapp/decorators.py

from rest_framework.response import Response
from rest_framework import status

from .permissions import AdminPermissionOnly

def admin_permission_required(view_func):
    """
    Custom decorator to check for admin permission.
    """
    def _wrapped_view(view, request, *args, **kwargs):
        permission_checker = AdminPermissionOnly()

        if not permission_checker.has_permission(request, view):
            # User is not an admin, return a response accordingly
            return Response({'detail': 'Permission denied. Admin access required.'}, status=status.HTTP_403_FORBIDDEN)

        # User is an admin, proceed with the original view function
        return view_func(view, request, *args, **kwargs)

    return _wrapped_view
