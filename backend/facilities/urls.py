
from django.urls import path
from .views import (
    FaciliteListAPIView,
    CreateFaciliteAPIView,
    CreateTimelineAPIView,
    UpdateTimelineAPIView,
   
   
)

urlpatterns = [
    path('', FaciliteListAPIView.as_view(), name='facilite-list'),
    path('create/', CreateFaciliteAPIView.as_view(), name='timeline-create'),

    path('timelines/create/', CreateTimelineAPIView.as_view(), name='timeline-create'),
    path('timelines/<int:pk>/update/', UpdateTimelineAPIView.as_view(), name='timeline-update'),
    # path('<int:pk>/', EmployeeDetailAPIView.as_view(), name='employee-detail'),
    # path('agency/', AgencyPropertyListAPIView.as_view(), name='agency-property-list'),
    # path('<int:pk>/', DetailPropertyAPIView.as_view(), name='property-deatil'),
    # path('<int:pk>/delete/', DeletePropertyAPIView.as_view(), name='property-delete'),

    # path('primes/', PrimeListAPIView.as_view(),name='prime-types'),
    # path('primes/<int:pk>/', PrimeDetailAPIView.as_view(), name='prime-detail'),
    # path('primes/types/', PrimetypesListAPI.as_view(),name='prime-types'),
    # path('primes/create/', CreatePrimeAPIView.as_view(), name='prime-create'),
    # path('primes/<int:pk>/update/', UpdatePrimeAPIView.as_view(), name='prime-update'),
    # path('primes/excel/',PrimeExportExcelAPIView.as_view(), name='primes-excel') ,
    # path('amenities/', AmenityListAPIView.as_view(), name='property-list'),
    ## for guest users 
    # path('<int:pk>/delete/', DeletePropertyAPIView.as_view(), name='property-delete'),
]