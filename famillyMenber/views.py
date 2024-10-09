from django.shortcuts import render
from rest_framework import viewsets
from famillyMenber.models import FamillyMember
from famillyMenber.serializers import FamillyMemberSerializer

class FamillyMemberViewSet(viewsets.ModelViewSet):
    queryset = FamillyMember.objects.all()
    serializer_class = FamillyMemberSerializer