from django.shortcuts import render
from rest_framework import viewsets
from helper.models import Helper
from helper.serializers import HelperSerializer

class HelperViewSet(viewsets.ModelViewSet):
    queryset = Helper.objects.all()
    serializer_class = HelperSerializer

