from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserProfile
class UserAdmins(UserAdmin):
    list_display = ['id','email','first_name','last_name','is_active','is_staff','is_admin','is_superadmin']
    list_display_links = ['email']
    ordering =()  
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',), 'classes': ('collapse',)}),
    )
    add_fieldsets = (
        (None,{
            'classes':('wide',),
            'fields': ('email', 'first_name','last_name', 'password1', 'password2','is_active','is_admin','is_superadmin',),
            
        }),
        
    )



class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user','image']

admin.site.register(User)
admin.site.register(UserProfile, UserProfileAdmin)

