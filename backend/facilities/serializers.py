from rest_framework import serializers
from .models import Facilite, Timeline
from employees.serializers import EmployeeSerializer
from datetime import datetime, timedelta

class UpdateTimelineSerializer(serializers.ModelSerializer):   
    class Meta:
        model = Timeline                          
        fields = ["id", "month",'facilite', "mois", "somme", "is_commited"]

class CreateTimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = ["id", "month",'facilite', "mois", "somme", "is_commited"]

    # def create(self, validated_data):
    #     print(validated_data)
    #     answer, created = Timeline.objects.update_or_create(
    #         id=validated_data.get("id",None),
    #     )
    #     return answer

    # def create(self, validated_data):
    # answer, created = Answer.objects.update_or_create(
    #     question=validated_data.get('question', None),
    #     defaults={'answer': validated_data.get('answer', None)})
    # return answer


class TimelineSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = ["id",'facilite', "month", "mois", "somme", "is_commited"]


class FaciliteSerializer(serializers.ModelSerializer):
    # timelines = TimelineSerialiser(many=True, read_only=True)
    timelines = serializers.SerializerMethodField()
    employee = EmployeeSerializer()

    class Meta:
        model = Facilite
        fields = [
            "id",
            "employee",
            "duree",
            "montant",
            "date_achat",
            "is_completed",
            "timelines",
        ]

    def get_timelines(self, obj):
        request = self.context["request"]
        date = request.GET.get("date", "")

        print(date)
        if not date:
            date = datetime.today().strftime("%Y-%m-%d")

        date = datetime.strptime(date, "%Y")
        print(date)
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
        fields = ["id", "employee",'duree', "date_achat", "montant"]


    def create(self, validated_data):
        print(validated_data)
        answer, created = Timeline.objects.update_or_create(
            id=validated_data.get("id",None),
        )
        return answer