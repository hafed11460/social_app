
from django.urls import path
from .views import (
    PrimetypesListAPI,
    CreatePrimeAPIView,
    # EmployeeDetailAPIView,
    PrimeListAPIView,
    PrimeDetailAPIView,
    UpdatePrimeAPIView,
    PrimeExportExcelAPIView,
    EmployeePrimesAPIView,
    ProcesVerbalListAPIView,
    ProcesVerbalDetailAPIView
   
)

urlpatterns = [
    
    path('', PrimeListAPIView.as_view(),name='prime-types'),
    path('<int:proces_id>/proces-verbal/', ProcesVerbalDetailAPIView.as_view(),name='prime-types'),
    path('proces-verbal/', ProcesVerbalListAPIView.as_view(),name='prime-types'),
    path('<int:matricule>/primes/', EmployeePrimesAPIView.as_view(), name='employee-primes'),
    path('<int:pk>/', PrimeDetailAPIView.as_view(), name='prime-detail'),
    path('types/', PrimetypesListAPI.as_view(),name='prime-types'),
    path('create/', CreatePrimeAPIView.as_view(), name='prime-create'),
    path('<int:pk>/update/', UpdatePrimeAPIView.as_view(), name='prime-update'),
    path('excel/',PrimeExportExcelAPIView.as_view(), name='primes-excel') ,    
]