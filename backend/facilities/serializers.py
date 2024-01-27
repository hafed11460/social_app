from rest_framework import serializers
from rest_framework.serializers import ValidationError
from .models import Facilite, Timeline
from employees.serializers import EmployeeSerializer,LiteEmployeeSerializer
from datetime import datetime, timedelta
from .timelien_serilaizers import TimelineSerialiser



class EmployeeFaciliteSerializer(serializers.ModelSerializer):
    # timelines = TimelineSerialiser(many=True, read_only=True)
    timelines = serializers.SerializerMethodField()
    employee = LiteEmployeeSerializer()
    solde = serializers.ReadOnlyField()
    class Meta:
        model = Facilite
        fields = [
            "id",
            "employee",
            "duree",
            "montant",
            "solde",
            "date_achat",
            "is_completed",
            "timelines",
        ]

    def get_timelines(self, obj):        
        results = Timeline.objects.filter(
            facilite__id=obj.id            
        )

        return TimelineSerialiser(results, many=True).data
class FaciliteSerializer(serializers.ModelSerializer):
    # timelines = TimelineSerialiser(many=True, read_only=True)
    timelines = serializers.SerializerMethodField()
    employee = LiteEmployeeSerializer()
    solde = serializers.ReadOnlyField()
    class Meta:
        model = Facilite
        fields = [
            "id",
            "employee",
            "duree",
            "montant",
            "solde",
            "date_achat",
            "is_completed",
            "timelines",
        ]

    def get_timelines(self, obj):
        request = self.context["request"]
        date = request.GET.get("date", "")

        if not date:
            date = datetime.today().strftime("%Y")

        date = datetime.strptime(date, "%Y")
        results = Timeline.objects.filter(
            facilite__id=obj.id,
            mois__year__gte=date.year,
            mois__year__lte=date.year,
        )

        return TimelineSerialiser(results, many=True).data


##*******************************************


class CreateFaciliteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facilite
        fields = ["id", "employee", "duree", "date_achat", "montant"]


class UpdateFaciliteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facilite
        fields = ["id","employee", "duree", "date_achat", "montant",'is_completed']

    def update(self, instance, validated_data):
        is_completed = validated_data.get("is_completed", instance.is_completed)                        
        montant = validated_data.get("montant", instance.montant)                        
        date_achat = validated_data.get("date_achat", instance.date_achat)  
        duree = validated_data.get("duree", instance.duree)  
        observation = validated_data.get("observation", instance.observation)  

        instance.is_completed = is_completed       
        instance.montant = montant       
        instance.date_achat = date_achat       
        instance.duree = duree       
        instance.observation = observation       
        instance.save()
        return instance
