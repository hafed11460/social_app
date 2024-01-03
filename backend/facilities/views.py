from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Facilite, Timeline
from employees.models import Employee

from .serializers import (
    FaciliteSerializer,
    CreateFaciliteSerializer,
    CreateTimelineSerializer,
    UpdateTimelineSerializer,
)


class CreateTimelineAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    # serializer_class = (CreateTimelineSerializer,)
    # parser_classes = (MultiPartParser, FormParser)
    queryset = Timeline.objects.all()

    def post(self, request):

        serializer = CreateTimelineSerializer(
            data=request.data, context={"request": request}
        )

        serializer.is_valid(raise_exception=True)

        facilite = serializer.validated_data.get('facilite') # get facilite object 
        somme = serializer.validated_data.get('somme')
        
        # check if  solde is less than montant
        if (facilite.solde + somme) > facilite.montant:
            return Response(
               {"error": "Can't add new cell because Solde => Montant"}, 
                status=status.HTTP_404_NOT_FOUND)

        # check if facilite is completed 
        if facilite.is_completed:
           return Response(
               {"error": "Impossible d'ajouter une cellule. this facilite is completed"}, 
                status=status.HTTP_404_NOT_FOUND)

        # check if the number of cell is less than number of month  
        if facilite.timelines.count() >= int(facilite.duree):                        
            return Response(
                {"error": "Impossible d'ajouter une cellule. Il a dépassé le nombre de mois"  },
                status=status.HTTP_404_NOT_FOUND,
            )
        # ["id", "month",'facilite', "mois", "somme", "is_commited"]
        
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateTimelineAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateTimelineSerializer
    # parser_classes = (MultiPartParser, FormParser)
    queryset = Timeline.objects.all()
    
    # def update(self, request, *args, **kwargs):
    #    partial = kwargs.pop('partial', False)
    #    instance = self.get_object()
    #    serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #    serializer.is_valid(raise_exception=True)
    #    self.perform_update(serializer)

    # #    print(instance.facilite.montant)
    #    res = FaciliteSerializer(instance.facilite,context={"request": request})
    # #    print(res.data)
    # #    result = {
    # #     "message": "success",
    # #     "details": serializer.data,
    # #     "status": 200,

    # #    }
    #    return Response(res.data)
    





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


##*********************************************************************************

class FaciliteDetailAPIView(generics.RetrieveAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = FaciliteSerializer
    queryset = Facilite.objects.all()



class CreateFaciliteAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = (CreateFaciliteSerializer,)
    # parser_classes = (MultiPartParser, FormParser)
    queryset = Facilite.objects.all()

    def post(self, request):
        serializer = CreateFaciliteSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        # employee = Employee.objects.get(id=serializer.validated_data.get('employee'))
        if not Facilite.objects.filter(
            employee=serializer.validated_data.get("employee"), is_completed=False
        ).exists():
            instance = serializer.save()
            print(serializer.data)
            new_serializer = FaciliteSerializer(instance,context={"request": request})
            return Response(new_serializer.data, status=status.HTTP_200_OK)

        return Response(
            {"error": "Can not create this recorde"}, status=status.HTTP_404_NOT_FOUND
        )
