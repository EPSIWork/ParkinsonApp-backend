from django.contrib.auth import authenticate
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from users.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from users.serializers import ChangePasswordSerializer, LoginSerializer, UserSerializer
from rest_framework.decorators import action
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model
from users.serializers import ChangePasswordSerializer, SendMailSerializer, UserSerializer, \
    UserPasswordResetSerializer
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from users.renderers import UserRenderer
# from .utils import send_reset_password_email

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'], url_path='register')
    def register(self, request, *args, **kwargs):
        try:
            serializer = UserSerializer(data=self.request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'], url_path='login', serializer_class=LoginSerializer)
    def login(self, request):
        try:
            email = self.request.data.get('email')
            password = self.request.data.get('password')
            user = authenticate(request, email=email, password=password)
            if user is not None:
                # login(request, user)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                }, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'], url_path='me', permission_classes=[permissions.IsAuthenticated])
    def me(self, request, *args, **kwargs):
        try:
            queryset = User.objects.get(id=request.user.id)
            serializer = UserSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'], url_path='changePassword',
            permission_classes=[permissions.IsAuthenticated], serializer_class=ChangePasswordSerializer)
    def change_password(self, request, *args, **kwargs):
        user = get_object_or_404(User, id=request.user.id)
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.data.get("old_password")):
                return Response({"detail": "Mot de passe incorrect."}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.data.get("new_password"))
            user.save()

            return Response({
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Mot de passe modifié avec succès'
            })

        return Response({"detail": "Informations incorrectes (ancien mot de passe et nouveau mot de passe)"},
                        status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='send-mail-reset-password')
    def reset_password_send_mail(self, request):
        serializer = SendMailSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            email = serializer.validated_data.get('email')
            print(email)
            print("hello")
            try:
                print("hello")
                user = User.objects.get(email=email)
                print(user.email)
                # send_reset_password_email(user)
                return Response({'message': 'Email de réinitialisation du mot de passe envoyé avec succès'},
                                status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], renderer_classes=[UserRenderer], url_path='reset-password')
    def reset_password(self, request, format=None):
        uid = request.GET.get('uid')
        token = request.GET.get('token')
        serializer = UserPasswordResetSerializer(
            data=request.data, context={'uid': uid, 'token': token})
        serializer.is_valid(raise_exception=True)
        return Response({'message': 'Réinitialisation du mot de passe réussie'}, status=status.HTTP_200_OK)
