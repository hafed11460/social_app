
from django.urls import path
from .views import (
    PrimetypesListAPI,
    CreatePrimeAPIView,
    PrimeListAPIView,
    PrimeDetailAPIView,
    UpdatePrimeAPIView,
    PrimeExportExcelAPIView,
    EmployeePrimesAPIView,
    ProcesVerbalListAPIView,
    ProcesVerbalDetailAPIView,
    CreateProcesVerbalAPIView,
    DeleteProcesVerbalAPIView,
    UpdateProcesVerbalAPIView,
    DeletePrimeAPIView
   
)

urlpatterns = [
    
    path('<int:proces_id>/proces-verbal/', ProcesVerbalDetailAPIView.as_view(),name='prime-list'),
    path('proces-verbal/', ProcesVerbalListAPIView.as_view(),name='proces-verbal'),
    path('proces-verbal/create/', CreateProcesVerbalAPIView.as_view(),name='create-proces-verbal'),
    path('proces-verbal/<int:pk>/update/', UpdateProcesVerbalAPIView.as_view(),name='update-proces-verbal'),
    path('proces-verbal/<int:pk>/delete/', DeleteProcesVerbalAPIView.as_view(),name='delete-proces-verbal'),
    path('employees/<int:matricule>/', EmployeePrimesAPIView.as_view(), name='employee-primes'),
    path('<int:pk>/', PrimeDetailAPIView.as_view(), name='prime-detail'),
    path('types/', PrimetypesListAPI.as_view(),name='prime-types'),


    path('', PrimeListAPIView.as_view(),name='prime-types'),
    path('create/', CreatePrimeAPIView.as_view(), name='prime-create'),
    path('<int:pk>/update/', UpdatePrimeAPIView.as_view(), name='prime-update'),
    path('<int:pk>/delete/', DeletePrimeAPIView.as_view(), name='prime-update'),
    path('proces-verbal/<int:pk>/excel/',PrimeExportExcelAPIView.as_view(), name='primes-excel') ,    
]