from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from .models import Employee,Prime,Primetype
from .serializers import (
    EmployeeSerializer,
    PrimetypeSerialiser,
    CreatePrimeSerializer,
    EmployeeDetailSerializer,
    PrimeSerialiser,
    UpdatePrimeSerializer
)


class PrimeDetailAPIView(generics.RetrieveAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = PrimeSerialiser
    queryset = Prime.objects.all()

class UpdatePrimeAPIView(generics.UpdateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = UpdatePrimeSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = Prime.objects.all()

class PrimetypesListAPI(generics.ListAPIView):
    serializer_class = PrimetypeSerialiser
    queryset = Primetype.objects.all()

class PrimeListAPIView(generics.ListAPIView):
    serializer_class = PrimeSerialiser
    # pagination_class = PropertiesPaginations
    # filterset_fields = {
    #     'matricule':['exact'],
    #     'nom':['icontains'],
    #     'prenom':['icontains'],        
    # }
    def get_queryset(self):
        return Prime.objects.all()
    
class CreatePrimeAPIView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreatePrimeSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = Prime.objects.all()

    def post(self,request):               
        serializer = CreatePrimeSerializer(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)  
        serializer.save()                                  
        return Response(serializer.data,status=status.HTTP_200_OK)



class EmployeeDetailAPIView(generics.RetrieveAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = EmployeeDetailSerializer
    queryset = Employee.objects.all()


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