from helper.models import Helper
from rest_framework import serializers


class HelperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Helper
        fields = '__all__'