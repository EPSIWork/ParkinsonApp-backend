from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.hashers import make_password



class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have email adresse.')

        user = self.model(
            email=self.normalize_email(email),
            **extra_fields
        )
        password = make_password(password)
        user.password = password
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            **extra_fields
        )
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save()
        return user

