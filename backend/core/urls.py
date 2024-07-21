from django.urls import path
from core.views import(
    GlobalStatistic
)

urlpatterns = [
    path("", GlobalStatistic.as_view(), name="statistics"),
]
