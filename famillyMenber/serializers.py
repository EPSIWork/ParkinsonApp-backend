from rest_framework import serializers
from famillyMenber.models import FamillyMember

class FamillyMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamillyMember
        fields = '__all__'