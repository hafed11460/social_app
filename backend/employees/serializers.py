from rest_framework import serializers
from .models import Employee, Direction


class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ["id", "name"]


class EmployeeSerializer(serializers.ModelSerializer):
    direction = DirectionSerializer()

    class Meta:
        model = Employee
        fields = [
            "id",
            "matricule",
            "nom",
            "prenom",
            "date_n",
            "date_e",
            "poste",
            "direction",
            "fin_contrat",
            "type_contrat",
            "created_at",
        ]
