from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    # path('',include('frontend.urls')),
    path('admin/', admin.site.urls),
    # path('api/',include('project.router')),
    path('api/auth/',include('users.urls')),
    path('api/employees/',include('employees.urls')),
    path('api/facilities/',include('facilities.urls')),
    path('api/primes/',include('primes.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name='index.html'))]