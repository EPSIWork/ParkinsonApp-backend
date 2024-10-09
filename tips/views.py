
from rest_framework import viewsets
from .models import Tip
from .serializers import TipSerializer

class TipViewSet(viewsets.ModelViewSet):
    queryset = Tip.objects.all()
    serializer_class = TipSerializer    