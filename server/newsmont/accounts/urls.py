from .import views
from django.urls import path


urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('activate/', views.activate_account, name='activate_account'),
    path('forgot-password/', views.forogt_password, name='forogt_password'),
    path('reset-password/', views.reset_password, name='reset_password'),
    path('verify-forgot-password-token/', views.verify_forgot_password_token, name='verify_forgot_password_token'),
    path('my-teams/', views.my_teams, name='my_teams'),
    path('recharge/', views.recharge, name='recharge'),
    path('withdraw/', views.withdrawl, name='withdraw'),
    path('add-bank-card/', views.add_bank_card, name='bank_card'),
]