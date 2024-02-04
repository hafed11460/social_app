from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from .models import Employee
from io import BytesIO
from django.http import HttpResponse
import pandas as pd
from datetime import datetime, timedelta
from rest_framework.response import Response
from .paginations import EmployeesPaginations, LiteEmployeesPaginations
from django_filters import rest_framework as filters
from django.db.models import Q

import django_filters

from .serializers import (
    EmployeeSerializer,
    EmployeeDetailSerializer,
    EmployeeForSelectSerializer,
)


# class EmployeePrimesAPIView(generics.ListAPIView):
#     pagination_class = PrimesPaginations
#     # permission_classes = [IsAuthenticated]
#     serializer_class = PrimeSerialiser
#     lookup_url_kwarg = "matricule"


#     def get_queryset(self):
#         eid = self.kwargs.get(self.lookup_url_kwarg)
#         facilites = Prime.objects.filter(employee__matricule__exact=eid).order_by('-date_r')
#         return facilites


class EmployeeDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EmployeeDetailSerializer
    queryset = Employee.objects.all()
    lookup_field = "matricule"

    # def get_queryset(self):
    #     matricule = self.kwargs.get(self.lookup_field)
    #     return Employee.objects.filter(matricule=matricule)


class EmployeeFilter(django_filters.FilterSet):
    # nom = django_filters.CharFilter(method="nom_filter")
    # prenom = django_filters.CharFilter(method="prenom_filter")
    query = django_filters.CharFilter(method="query_filter")

    class Meta:
        model = Employee
        fields = ['matricule',"nom", "prenom"]

    def query_filter(self, queryset, name, value):
        return Employee.objects.filter(
            Q(nom__icontains=value) | Q(prenom__icontains=value) | Q(matricule__icontains=value)
        )
    # def prenom_filter(self, queryset, name, value):
    #     return Employee.objects.filter(
    #         Q(nom__icontains=value) | Q(prenom__icontains=value) | Q(matricule__icontains=value)
    #     )

class EmployeeListAPIView(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = EmployeeSerializer
    pagination_class = EmployeesPaginations
    filterset_class = EmployeeFilter
    # filterset_fields = {
    #     "matricule": ["exact"],
    #     "nom": ["icontains"],
    #     "prenom": ["icontains"],
    # }

    def get_queryset(self):
        return Employee.objects.all()





class EmployeeLiteFilter(django_filters.FilterSet):
    nom = django_filters.CharFilter(method="nom_filter")
    prenom = django_filters.CharFilter(method="prenom_filter")

    class Meta:
        model = Employee
        fields = ["nom", "prenom"]

    def nom_filter(self, queryset, name, value):
        return Employee.objects.filter(
            Q(nom__icontains=value) | Q(prenom__icontains=value) | Q(matricule__icontains=value)
        )
    def prenom_filter(self, queryset, name, value):
        return Employee.objects.filter(
            Q(nom__icontains=value) | Q(prenom__icontains=value) | Q(matricule__icontains=value)
        )

    

class EmployeeForSelectListAPIView(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = EmployeeForSelectSerializer
    pagination_class = LiteEmployeesPaginations
    filterset_class = EmployeeLiteFilter
    queryset = Employee.objects.all()

    # filterset_fields = {
    #     'matricule':['exact'],
    #     'nom':['icontains'],
    #     'prenom':['icontains'],
    # }
