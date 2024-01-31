from django.contrib import admin
from .models import ProcesVerbal,Prime,Primetype

# Register your models here.


class ProcesVerbalAdmin(admin.ModelAdmin):
    list_display=['id','name','is_open']

class PrimetypeAdmin(admin.ModelAdmin):
    list_display=['name']
    

class PrimeAdmin(admin.ModelAdmin):
    list_display = ['employee','prime_type','date_f','date_r','montant','observation']


admin.site.register(ProcesVerbal, ProcesVerbalAdmin)
admin.site.register(Prime, PrimeAdmin)
admin.site.register(Primetype, PrimetypeAdmin)
