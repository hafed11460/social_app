
from django.urls import path
from .views import (
    EmployeeListAPIView,
    # PrimetypesListAPI,
    # CreatePrimeAPIView,
    EmployeeDetailAPIView,
    # PrimeListAPIView,
    # PrimeDetailAPIView,
    # UpdatePrimeAPIView,
    # PrimeExportExcelAPIView,
    # EmployeePrimesAPIView,
    EmployeeForSelectListAPIView
   
)

urlpatterns = [
    path('', EmployeeListAPIView.as_view(), name='employees-list'),
    path('lite/', EmployeeForSelectListAPIView.as_view(), name='employees-lite'),
    path('<int:matricule>/', EmployeeDetailAPIView.as_view(), name='employee-detail'),
    # path('<int:matricule>/primes/', EmployeePrimesAPIView.as_view(), name='employee-detail'),
    
    ## form Primes
    # path('primes/', PrimeListAPIView.as_view(),name='prime-types'),
    # path('primes/<int:pk>/', PrimeDetailAPIView.as_view(), name='prime-detail'),
    # path('primes/types/', PrimetypesListAPI.as_view(),name='prime-types'),
    # path('primes/create/', CreatePrimeAPIView.as_view(), name='prime-create'),
    # path('primes/<int:pk>/update/', UpdatePrimeAPIView.as_view(), name='prime-update'),
    # path('primes/excel/',PrimeExportExcelAPIView.as_view(), name='primes-excel') ,    
]