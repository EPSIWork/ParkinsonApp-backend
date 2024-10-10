from django.db import models
import uuid
from .manager import UserManager
from django.contrib.auth.models import AbstractBaseUser
        
class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField(blank=True, null=True)
    # address = models.CharField(blank=True)
    # phone_number = models.CharField(max_length=255, unique=True, blank=True)
    # GENDER_CHOICES = [
    #     ('M', 'Masculin'),
    #     ('F', 'Feminin'),
    #     ('A', 'Autre')
    # ]
    # gender = models.CharField(max_length=255, choices=GENDER_CHOICES, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password', 'first_name', 'last_name',]

    objects = UserManager()

    class Meta:
        db_table = 'users'
