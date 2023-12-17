from django.contrib import admin
from .models import Facilite, Timeline


class FaciliteAdmin(admin.ModelAdmin):
    list_display = ['id','employee','duree','montant','date_achat','is_completed']


class TimelineAdmin(admin.ModelAdmin):
    list_display = ['facilite','mois','somme','is_commited']


admin.site.register(Facilite,FaciliteAdmin)
admin.site.register(Timeline,TimelineAdmin)