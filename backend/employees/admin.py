from django.contrib import admin
from employees.models import Direction, Employee
from import_export import resources,fields
from import_export.widgets import ForeignKeyWidget
from import_export.admin import ImportExportModelAdmin

class DirectionResource(resources.ModelResource):
    class Meta:
        model = Direction
        fields = ['id','name']


class EmployeeResource(resources.ModelResource):
    def get_export_headers(self):
        headers =  super().get_export_headers()
        for i,h in enumerate(headers):
            if h == 'date_n':
                headers[i] = 'Date de Naissance'
            if h == 'date_e':
                headers[i] = 'Date d\'entrée'

        return headers
    
    def before_import_row(self, row, **kwargs):
        direction_name = row["direction"]
        print(direction_name)
        if direction_name is not None:
            dr, _created = Direction.objects.get_or_create(name=direction_name)
            if _created:
                row["direction"] = dr.id
            else:
                dr.save()
                row["direction"] = dr.id
        else :
            row["direction"] = None

    # direction = fields.Field(
    #     column_name='direction',
    #     attribute='direction',
    #     widget=ForeignKeyWidget(model=Direction,field="name")
    # )

    class Meta:
        model = Employee
        # exclude = ('id', )
        fields = ['id','matricule','nom','prenom','date_n','date_e','poste','direction','fin_contrat','type_contrat']


class DirectionAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_display = ['id',"name"]
    resource_class = DirectionResource


class EmployeeAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_display = ['matricule','nom','prenom','date_n','date_e','poste','direction','fin_contrat','type_contrat']

    resource_class = EmployeeResource




admin.site.register(Direction, DirectionAdmin)
admin.site.register(Employee, EmployeeAdmin)
