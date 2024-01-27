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
from datetime import datetime,timedelta
from rest_framework.response import Response
from .paginations import EmployeesPaginations

from .serializers import (
    EmployeeSerializer,
    # PrimetypeSerialiser,
    # CreatePrimeSerializer,
    EmployeeDetailSerializer,
    # PrimeSerialiser,
    # UpdatePrimeSerializer,
    EmployeeForSelectSerializer
)



# class PrimeDetailAPIView(generics.RetrieveAPIView):
#     # permission_classes = [IsAuthenticated]
#     serializer_class = UpdatePrimeSerializer
#     queryset = Prime.objects.all()

# class UpdatePrimeAPIView(generics.UpdateAPIView):
#     # permission_classes = [IsAuthenticated]
#     serializer_class = UpdatePrimeSerializer
#     parser_classes = (MultiPartParser, FormParser)
#     queryset = Prime.objects.all()

# class PrimetypesListAPI(generics.ListAPIView):
#     serializer_class = PrimetypeSerialiser
#     queryset = Primetype.objects.all()



# class PrimeListAPIView(generics.ListAPIView):
#     serializer_class = PrimeSerialiser
    # pagination_class = PropertiesPaginations
    # filterset_fields = {
    #     'matricule':['exact'],
    #     'nom':['icontains'],
    #     'prenom':['icontains'],        
    # }
    # queryset = Prime.objects.all()
    # def get_queryset(self):
    #     date = self.request.GET.get('date', '')
    #     if not date:
    #         date =datetime.today().strftime('%Y-%m-%d')
    #     date = datetime.strptime(date, '%Y-%m-%d')

    #     results = Prime.objects.filter( 
    #                         # date_f=date                           
    #                         date_f__year__gte=date.year,
    #                         date_f__month__gte=date.month,
    #                         date_f__year__lte=date.year,
    #                         date_f__month__lte=date.month
    #                         )        
    #     return results




# class CreatePrimeAPIView(GenericAPIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = CreatePrimeSerializer
#     parser_classes = (MultiPartParser, FormParser)
#     queryset = Prime.objects.all()

#     def post(self,request):               
#         serializer = CreatePrimeSerializer(data=request.data,context={'request':request})
#         serializer.is_valid(raise_exception=True)  
#         serializer.save()                                  
#         return Response(serializer.data,status=status.HTTP_200_OK)


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
    lookup_field = 'matricule'

    # def get_queryset(self):
    #     matricule = self.kwargs.get(self.lookup_field)
    #     return Employee.objects.filter(matricule=matricule)


class EmployeeListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EmployeeSerializer
    pagination_class = EmployeesPaginations
    filterset_fields = {
        'matricule':['exact'],
        'nom':['icontains'],
        'prenom':['icontains'],        
    }
    def get_queryset(self):
        return Employee.objects.all()
    

class EmployeeForSelectListAPIView(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = EmployeeForSelectSerializer
    queryset = Employee.objects.all()
    