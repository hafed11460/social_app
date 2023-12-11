from django.shortcuts import render
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from .models import Employee
from .serializers import (
    EmployeeSerializer
)
# Create your views here.

class EmployeeListAPIView(generics.ListAPIView):
    serializer_class = EmployeeSerializer
    # pagination_class = PropertiesPaginations
    filterset_fields = {
        'matricule':['exact'],
        'nom':['icontains'],
        'prenom':['icontains'],        
    }
    def get_queryset(self):
        return Employee.objects.all()