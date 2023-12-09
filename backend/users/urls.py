from django.urls import path
from .views import * 
    # (RegisterAPIView,LoginAPIView,RequestPasswordResetEmail,PasswordTokenCheckAPI,
    #                 LogoutAPIView, VerifyEmail,RefrechTokenAPIView,SetNewPasswordAPIView,UserProfileView,UpdateUserAvatarAPIView)

urlpatterns = [
    path('register/',RegisterAPIView.as_view(), name='register'),
    path('login/',LoginAPIView.as_view(), name='login'),
    path('logout/',LogoutAPIView.as_view(), name='logout'),
    path('email-verify/',VerifyEmail.as_view(), name='email-verify'),
    path('refresh-token/',RefrechTokenAPIView.as_view(), name='refresh-token'),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path('password-reset-confirm/<uidb64>/<token>/',  PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view()),
    path('update-user-info/', UserProfileView.as_view(), name="update-user-info"),
    path('update-user-avatar/', UpdateUserAvatarAPIView.as_view(), name="update-user-avatar"),
    path('update-user-password/', ChangeUserPasswordAPIView.as_view(), name="update-user-avatar"),

    path('user/agency/',RegisterAPIView.as_view(), name='register'),
]
