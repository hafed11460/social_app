from rest_framework import serializers
from .models import Employee, Direction
# from primes.serializers import PrimeSerialiser

class LiteEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            "id",
            "matricule",
            "nom",
            "prenom"                       
        ]

# class PrimetypeSerialiser(serializers.ModelSerializer):
#     class Meta:
#         model = Primetype
#         fields= '__all__'


# class PrimeSerialiser(serializers.ModelSerializer):
#     prime_type = PrimetypeSerialiser(many=False, read_only=True) 
#     employee =  LiteEmployeeSerializer()  
#     class Meta:
#         model = Prime
#         # fields= '__all__'
#         fields= ['id','employee','prime_type','date_f','date_r','montant','observation']
    


class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ["id", "name"]


# class CreatePrimeSerializer(serializers.ModelSerializer):       
#     class Meta:
#         model = Prime
#         fields = ['employee','prime_type','date_f','date_r','montant','observation']

class EmployeeDetailSerializer(serializers.ModelSerializer):
    direction = DirectionSerializer()
    # prime = serializers.PrimaryKeyRelatedField(queryset=Prime.objects.all(),many=True) 
    # primes = PrimeSerialiser(many=True,read_only=True)
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
            # 'primes'
        ]



        
class EmployeeForSelectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            "id",
            "matricule",
            "nom",
            "prenom",            
        ]

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


# class UpdatePrimeSerializer(serializers.ModelSerializer):
#     prime_type = serializers.PrimaryKeyRelatedField(queryset=Primetype.objects.all(),many=False)
#     employee = EmployeeSerializer(read_only=True,many=False)
#     class Meta:
#         model = Prime                          
#         fields = ['id','employee','prime_type','date_f','date_r','montant','observation']