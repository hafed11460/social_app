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

from .serializers import (
    FaciliteSerializer,
    CreateFaciliteSerializer,    
    EmployeeFaciliteSerializer,
    UpdateFaciliteSerializer
)





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
        