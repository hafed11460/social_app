from rest_framework import serializers
from .models import Prime,Primetype, ProcesVerbal
from employees.serializers import LiteEmployeeSerializer,EmployeeSerializer

class ProcesVerbalSerialiser(serializers.ModelSerializer):
    class Meta:
        model= ProcesVerbal
        fields = '__all__'

class ProcesVerbalDetailSerialiser(serializers.ModelSerializer):
    primes = serializers.SerializerMethodField()
    class Meta:
        model= ProcesVerbal
        fields = ['id','name','primes']

    def get_primes(self, obj):

        results = Prime.objects.filter(
            proces_v__id=obj.id
        )

        return PrimeSerialiser(results, many=True).data


class PrimetypeSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Primetype
        fields= '__all__'


class PrimeSerialiser(serializers.ModelSerializer):
    prime_type = PrimetypeSerialiser(many=False, read_only=True) 
    employee =  LiteEmployeeSerializer()  
    class Meta:
        model = Prime
        # fields= '__all__'
        fields= ['id','employee','prime_type','date_f','date_r','montant','observation']
    





class CreatePrimeSerializer(serializers.ModelSerializer):       
    class Meta:
        model = Prime
        fields = ['proces_v','employee','prime_type','date_f','date_r','montant','observation']



        



class UpdatePrimeSerializer(serializers.ModelSerializer):
    prime_type = serializers.PrimaryKeyRelatedField(queryset=Primetype.objects.all(),many=False)
    employee = LiteEmployeeSerializer(read_only=True,many=False)
    class Meta:
        model = Prime                          
        fields = ['id','employee','proces_v','prime_type','date_f','date_r','montant','observation']