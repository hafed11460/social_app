from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from .models import Prime,Primetype,ProcesVerbal
from primes.prime_to_excel import PrimeToExcel
from io import BytesIO
from django.http import HttpResponse
import pandas as pd
from datetime import datetime,timedelta
from rest_framework.response import Response
from .paginations import PrimesPaginations

from .serializers import (
    PrimetypeSerialiser,
    CreatePrimeSerializer,
    PrimeSerialiser,
    UpdatePrimeSerializer,
    ProcesVerbalSerialiser,
    ProcesVerbalDetailSerialiser
)

class PrimeExportExcelAPIView(APIView):

    def get(self, request, format=None):
        try:   
            date = request.GET.get('date', '')
            if not date:
                date = datetime.today().strftime('%Y-%m-%d')
            date = datetime.strptime(date, '%Y-%m-%d')                       
            response = HttpResponse(content_type='application/octet-stream')
            response['Content-Disposition'] = 'attachment; filename=your_template_name.xlsx'
            excelgen = PrimeToExcel(date=date)
            response.write(excelgen.start())
            return response
        except Exception as e:
            return  Response({'error'},status=status.HTTP_200_OK   )

class PrimeDetailAPIView(generics.RetrieveAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = UpdatePrimeSerializer
    queryset = Prime.objects.all()

class UpdatePrimeAPIView(generics.UpdateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = UpdatePrimeSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = Prime.objects.all()

class PrimetypesListAPI(generics.ListAPIView):
    serializer_class = PrimetypeSerialiser
    queryset = Primetype.objects.all()



class ProcesVerbalDetailAPIView(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    pagination_class = PrimesPaginations
    serializer_class = PrimeSerialiser
    lookup_url_kwarg = "proces_id"
   
    def get_queryset(self):
        proces_id = self.kwargs.get(self.lookup_url_kwarg)       
        primes = Prime.objects.filter(proces_v__id=proces_id)
        return primes

class ProcesVerbalListAPIView(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ProcesVerbalSerialiser
    # pagination_class = PrimesPaginations

    def get_queryset(self):
        return ProcesVerbal.objects.all().order_by('-id')[:2]
    



class PrimeListAPIView(generics.ListAPIView):
    serializer_class = PrimeSerialiser
    pagination_class = PrimesPaginations
    # filterset_fields = {
    #     'matricule':['exact'],
    #     'nom':['icontains'],
    #     'prenom':['icontains'],        
    # }
    queryset = Prime.objects.all()
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


class EmployeePrimesAPIView(generics.ListAPIView):
    pagination_class = PrimesPaginations
    # permission_classes = [IsAuthenticated]
    serializer_class = PrimeSerialiser
    lookup_url_kwarg = "matricule"
    
   
    def get_queryset(self):
        eid = self.kwargs.get(self.lookup_url_kwarg)       
        facilites = Prime.objects.filter(employee__matricule__exact=eid).order_by('-date_r')
        return facilites

