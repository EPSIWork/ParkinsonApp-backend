from django.urls import include, path
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from famillyMenber.views import FamillyMemberViewSet
from tips.views import TipViewSet
from users.views import UserViewSet
from helper.views import HelperViewSet
from usersData.views import UserDataViewSet
router = routers.DefaultRouter()

router.register(r'user', UserViewSet, basename='user')
router.register(r'helper', HelperViewSet, basename='helper')
router.register(r'famillyMember', FamillyMemberViewSet, basename='famillyMember')
router.register(r'tip', TipViewSet, basename='tip')
router.register(r'userData', UserDataViewSet, basename='userData')
urlpatterns = [
    path('', include(router.urls)),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
