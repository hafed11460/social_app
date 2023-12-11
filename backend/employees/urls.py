
from django.urls import path
from .views import (
    EmployeeListAPIView
   
)

urlpatterns = [
    path('', EmployeeListAPIView.as_view(), name='employees-list'),
    # path('agency/', AgencyPropertyListAPIView.as_view(), name='agency-property-list'),
    # path('create/', CreatePropertyAPIView.as_view(), name='property-create'),
    # path('<int:pk>/', DetailPropertyAPIView.as_view(), name='property-deatil'),
    # path('<int:pk>/update/', UpdatePropertyAPIView.as_view(), name='property-update'),
    # path('<int:pk>/delete/', DeletePropertyAPIView.as_view(), name='property-delete'),

    # path('amenities/', AmenityListAPIView.as_view(), name='property-list'),
    ## for guest users 
    # path('<int:pk>/delete/', DeletePropertyAPIView.as_view(), name='property-delete'),
]