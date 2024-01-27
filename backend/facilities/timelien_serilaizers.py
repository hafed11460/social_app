from rest_framework import serializers
from rest_framework.serializers import ValidationError
from .models import Facilite, Timeline
from employees.serializers import EmployeeSerializer,LiteEmployeeSerializer
from datetime import datetime, timedelta

class AddCommentTimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = ["id",'observation']

    def update(self, instance, validated_data):
        observation = validated_data.get("observation", instance.somme)               
        instance.observation = observation
        instance.save()
        return instance
    
class UpdateTimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = ["id", "month", "facilite", "mois", "somme","observation", "is_commited"]

    def update(self, instance, validated_data):
        facilite = validated_data.get("facilite", instance.facilite)
        somme = validated_data.get("somme", instance.somme)
        observation = validated_data.get("observation", instance.observation)
        
        # check if the new value is not great than montant 
        if ((facilite.solde - instance.somme) + somme) > facilite.montant:
            raise ValidationError(
                {"error": "Impossible de mettre à jour la nouvelle cellule car Solde sera supérieur à Montant Avec cette nouvelle valeur    "}
            )

        if facilite.is_completed:
            raise ValidationError(
                {
                    "error": "Cette facilite est fermée, tu ne peux faire aucun changement"
                }
            )        
        # if facilite.timelines.count() >= int(facilite.duree):
        #     raise ValidationError(
        #         {
        #             "error": "Impossible d'ajouter une cellule. Il a dépassé le nombre de mois"
        #         },
        #     )

        instance.somme = somme
        instance.observation = observation
        instance.save()

        return instance
    

    

class CreateTimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = ["id", "month", "facilite", "mois", "somme", "is_commited"]

    def create(self, validated_data):
        # facilite = validated_data.pop("facilite")
        # somme = validated_data.pop("somme")

        # if (facilite.solde + somme ) > facilite.montant:
        #     raise ValidationError(
        #         {"error": "Can't update new cell because Solde => Montant"}
        #     )

        # if facilite.is_completed:
        #     raise ValidationError(
        #         {
        #             "error": "Impossible d'ajouter une cellule. this facilite is completed"
        #         }
        #     )

        # if facilite.timelines.count() >= int(facilite.duree):
        #     raise ValidationError(
        #         {
        #             "error": "Impossible d'ajouter une cellule. Il a dépassé le nombre de mois"
        #         },
        #     )

        instance = Timeline.objects.create(**validated_data)

        return instance


    # def create(self, validated_data):
    #     print(validated_data)
    #     timeline = Timeline.objects.create(**validated_data)
    #     return timeline
    # answer, created = Timeline.objects.update_or_create(
    #     id=validated_data.get("id",None),
    # )
    # return answer

    # def create(self, validated_data):
    # answer, created = Answer.objects.update_or_create(
    #     question=validated_data.get('question', None),
    #     defaults={'answer': validated_data.get('answer', None)})
    # return answer


class TimelineSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = ["id", "facilite", "month", "mois", "somme",'observation', "is_commited"]

