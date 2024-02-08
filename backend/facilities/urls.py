from django.urls import path
from .timeline_view import (
    CreateTimelineAPIView,
    UpdateTimelineAPIView,
    DeleteTimelineAPIView,
    AddCommentToTimelineAPIView,
)
from .views import (
    FaciliteListAPIView,
    FaciliteDetailAPIView,
    CreateFaciliteAPIView,
    EmployeefacilitiesAPIView,
    UpdateFaciliteAPIView,
    FaciliteExportExcelAPIView,
    YearFaciliteExportExcelAPIView
)

urlpatterns = [
    path("", FaciliteListAPIView.as_view(), name="facilite-list"),
    path('excel/',FaciliteExportExcelAPIView.as_view(), name='facilite-excel') ,
    path('<int:year>/excel/',YearFaciliteExportExcelAPIView.as_view(), name='year-facilite-excel') ,
    path("create/", CreateFaciliteAPIView.as_view(), name="timeline-create"),
    path("<int:pk>/", FaciliteDetailAPIView.as_view(), name="facilite-detail"),
    path("<int:pk>/update/", UpdateFaciliteAPIView.as_view(), name="facilite-update"),
    path("timelines/create/", CreateTimelineAPIView.as_view(), name="timeline-create"),
    path(
        "timelines/<int:pk>/update/",
        UpdateTimelineAPIView.as_view(),
        name="timeline-update",
    ),
    path(
        "timelines/<int:pk>/comment/",
        AddCommentToTimelineAPIView.as_view(),
        name="timeline-add-comment",
    ),
    path(
        "timelines/<int:pk>/", DeleteTimelineAPIView.as_view(), name="timeline-delete"
    ),
    path(
        "employees/<int:matricule>/",
        EmployeefacilitiesAPIView.as_view(),
        name="employee-facilites",
    ),
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
