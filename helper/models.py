import uuid
from django.db import models


class Helper(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    relationship = models.CharField(max_length=100)
    user_id = models.CharField(max_length=100)
    user_helping = models.ForeignKey('users.User', on_delete=models.CASCADE)
    