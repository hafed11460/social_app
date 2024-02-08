from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Facilite, Timeline
from employees.models import Employee
from .paginations import FacilitiesPaginations
from rest_framework.generics import GenericAPIView
from datetime import datetime, timedelta
from django.http import HttpResponse
from facilities.facilite_to_excel import FaciliteToExcel
from facilities.year_facilite_to_excel import YearFaciliteToExcel

from .serializers import (
    FaciliteSerializer,
    CreateFaciliteSerializer,    
    EmployeeFaciliteSerializer,
    UpdateFaciliteSerializer
)



class FaciliteExportExcelAPIView(GenericAPIView):
    def get(self, request,format=None):
        try:            
            date = request.GET.get("date", "")
            if not date:
                date = datetime.today().strftime("%Y-%m-%d")
            
            date = datetime.strptime(date, "%Y-%m-%d")
            response = HttpResponse(content_type="application/octet-stream")
            response[
                "Content-Disposition"
            ] = "attachment; filename=your_template_name.xlsx"
            excelgen = FaciliteToExcel(date=date)
            response.write(excelgen.start())
            return response
        except Exception as e:
            return Response({"error"}, status=status.HTTP_200_OK)
        
class YearFaciliteExportExcelAPIView(GenericAPIView):
    def get(self, request,year,format=None):
        try:            
            # date = request.GET.get("date", "")
            # if not date:
            #     date = datetime.today().strftime("%Y-%m-%d")
            
            # date = datetime.strptime(date, "%Y-%m-%d")
            response = HttpResponse(content_type="application/octet-stream")
            response[
                "Content-Disposition"
            ] = "attachment; filename=your_template_name.xlsx"
            excelgen = YearFaciliteToExcel(year=year)
            response.write(excelgen.start())
            return response
        except Exception as e:
            return Response({"error"}, status=status.HTTP_200_OK)


class EmployeefacilitiesAPIView(generics.ListAPIView):
    pagination_class = FacilitiesPaginations
    # permission_classes = [IsAuthenticated]
    serializer_class = EmployeeFaciliteSerializer
    lookup_url_kwarg = "matricule"
   
    def get_queryset(self):
        eid = self.kwargs.get(self.lookup_url_kwarg)       
        facilites = Facilite.objects.filter(employee__matricule__exact=eid)
        return facilites
    


class FaciliteListAPIView(generics.ListAPIView):
    pagination_class = FacilitiesPaginations
    # permission_classes = [IsAuthenticated]
    serializer_class = FaciliteSerializer
    queryset = Facilite.objects.all()
    filterset_fields = {
        'employee__matricule':['exact'],           
        'employee__nom':['icontains'],           
        'employee__prenom':['icontains'],           
        'is_completed':['exact'],           
    }
    
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



class FaciliteDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FaciliteSerializer
    queryset = Facilite.objects.all()



class CreateFaciliteAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateFaciliteSerializer
    # parser_classes = (MultiPartParser, FormParser)
    queryset = Facilite.objects.all()

    def post(self, request):
        serializer = self.get_serializer(data=request.data)        
        serializer.is_valid(raise_exception=True)
        # employee = Employee.objects.get(id=serializer.validated_data.get('employee'))
        if not Facilite.objects.filter(
            employee=serializer.validated_data.get("employee"), is_completed=False
        ).exists():
            instance = serializer.save()
            somme = instance.montant / instance.duree

            start_date_str = serializer.validated_data.get('date_achat')

            # Convert the string date to a datetime object
            start_date = datetime.strptime(str(start_date_str), "%Y-%m-%d")

            # Set the day of the start date to 1
            start_date = start_date.replace(day=1)

            for i in range(instance.duree):
                month = (start_date.month + i - 1) % 12 + 1

                # change year ()
                if (i !=0)  and  (month == 1):
                    start_date = start_date.replace(year=start_date.year + 1)

                
                mois = start_date.replace(month=month)
                
                Timeline.objects.create(
                        month= month,
                        facilite=instance,
                        mois=mois.strftime("%Y-%m-%d"),
                        somme=somme,
                        is_commited= False,
                        observation=""
                )
                print(mois.strftime("%Y-%m-%d"))

            
            new_serializer = FaciliteSerializer(instance,context={"request": request})
            return Response(new_serializer.data, status=status.HTTP_200_OK)

        return Response(
            {"error": "Can not create this recorde"}, status=status.HTTP_404_NOT_FOUND
        )


class UpdateFaciliteAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateFaciliteSerializer
    queryset = Facilite.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)      
        new_serializer = FaciliteSerializer(instance,context={"request": request})
        return Response(new_serializer.data, status=status.HTTP_200_OK)
        