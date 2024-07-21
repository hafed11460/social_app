from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from facilities.models import Facilite
from employees.models import Employee
from primes.models import Prime
class GlobalStatistic(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        facilites_count = Facilite.objects.all().count()
        employees_count = Employee.objects.all().count()
        primes_count = Prime.objects.all().count()
        
        context = {
            'employees_count':employees_count,
            'facilities_count':facilites_count,
            'primes_count':primes_count
        }
        return Response(context,status=status.HTTP_200_OK)