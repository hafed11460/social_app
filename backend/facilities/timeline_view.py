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
from .timelien_serilaizers import (
    CreateTimelineSerializer,
    UpdateTimelineSerializer,
    TimelineSerialiser,
    AddCommentTimelineSerializer,
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

        facilite = serializer.validated_data.get("facilite")  # get facilite object
        somme = serializer.validated_data.get("somme")

        # check if  solde is less than montant
        if (facilite.solde + somme) > facilite.montant:
            return Response(
                {"error": "Impossible d'ajouter une la nouvelle cellule car Solde sera supérieur à Montant Avec cette nouvelle valeur"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # check if facilite is completed
        if facilite.is_completed:
            return Response(
                {
                    "error": "Cette facilite est fermée, tu ne peux faire aucun changement"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        # check if the number of cell is less than number of month
        if facilite.timelines.count() >= int(facilite.duree):
            return Response(
                {
                    "error": "Impossible d'ajouter une cellule. Il a dépassé le nombre de mois"
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        # ["id", "month",'facilite', "mois", "somme", "is_commited"]

        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddCommentToTimelineAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddCommentTimelineSerializer
    queryset = Timeline.objects.all()


class UpdateTimelineAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateTimelineSerializer
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


class DeleteTimelineAPIView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TimelineSerialiser
    queryset = Timeline.objects.all()
