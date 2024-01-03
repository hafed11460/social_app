from rest_framework import serializers
from rest_framework.serializers import ValidationError
from .models import Facilite, Timeline
from employees.serializers import EmployeeSerializer,LiteEmployeeSerializer
from datetime import datetime, timedelta


class UpdateTimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = ["id", "month", "facilite", "mois", "somme", "is_commited"]

    def update(self, instance, validated_data):
        print('-----------------------------------------------------------------------------------')
        facilite = validated_data.get("facilite", instance.facilite)
        somme = validated_data.get("somme", instance.somme)
        print(somme)
        print(validated_data)
        
        if ((facilite.solde - instance.somme) + somme) > facilite.montant:
            raise ValidationError(
                {"error": "Can't update new cell because Solde => Montant"}
            )

        if facilite.is_completed:
            raise ValidationError(
                {
                    "error": "Impossible d'ajouter une cellule. this facilite is completed"
                }
            )

        if facilite.timelines.count() >= int(facilite.duree):
            raise ValidationError(
                {
                    "error": "Impossible d'ajouter une cellule. Il a dépassé le nombre de mois"
                },
            )

        instance.somme = somme
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
        fields = ["id", "facilite", "month", "mois", "somme", "is_commited"]


class FaciliteSerializer(serializers.ModelSerializer):
    # timelines = TimelineSerialiser(many=True, read_only=True)
    timelines = serializers.SerializerMethodField()
    employee = LiteEmployeeSerializer()

    solde = serializers.ReadOnlyField()
    # solde = serializers.SerializerMethodField()

    # def get_solde(self, obj):
    #     # return sum([item.somme for item in Timeline.objects.filter(facilite=obj)])
    #     return sum([item.somme for item in obj.timelines.all()])

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

    # def create(self, validated_data):
    #     print(validated_data)
    #     answer, created = Timeline.objects.update_or_create(
    #         id=validated_data.get("id",None),
    #     )
    #     return answer
