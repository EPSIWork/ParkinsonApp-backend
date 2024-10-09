import uuid
from django.db import models 

class UserData(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user_id = models.CharField(max_length=100)
    typing_speed = models.FloatField()
    typing_accuracy = models.FloatField()
    pause_duration = models.FloatField()
    message_length = models.FloatField()
    sentiment_score = models.FloatField()
    cohesion_score = models.FloatField()
    error_rate = models.FloatField()
    motor_control_score = models.FloatField()
    typing_fatigue_score = models.FloatField()
    date = models.DateField()
