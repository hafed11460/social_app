from django.shortcuts import render
from rest_framework import generics
from .models import Facilite

from .serializers import (
    FaciliteSerializer
)


class FaciliteListAPIView(generics.ListAPIView):
    serializer_class = FaciliteSerializer
    queryset = Facilite.objects.all()
    # pagination_class = PropertiesPaginations
    # filterset_fields = {
    #     'matricule':['exact'],
    #     'nom':['icontains'],
    #     'prenom':['icontains'],        
    # }
    # def get_queryset(self):
    #     date = self.request.GET.get('date', '')
    #     if not date:
    #         date =datetime.today().strftime('%Y-%m-%d')
    #     date = datetime.strptime(date, '%Y-%m-%d')
    #     return Facilite.objects.all()