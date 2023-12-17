from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import Facilite,Timeline

from .serializers import (
    FaciliteSerializer,
    CreateTimelineSerializer,
    UpdateTimelineSerializer
)


class CreateTimelineAPIView(generics.CreateAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class = CreateTimelineSerializer,
    parser_classes = (MultiPartParser, FormParser)
    queryset = Timeline.objects.all()

    def post(self,request):               
        serializer = CreateTimelineSerializer(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)  
        serializer.save()                                  
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    
class UpdateTimelineAPIView(generics.UpdateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = UpdateTimelineSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = Timeline.objects.all()
    

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