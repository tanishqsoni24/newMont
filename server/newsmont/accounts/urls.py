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
    path('changePassword/', views.change_password, name='change_password'),
    path('userDetail/', views.user_detail, name='user_detail'),
    path('myorders/', views.orders, name='my_orders'),
    path('resend-otp/', views.resend_otp, name='resend_otp'),
    path('myrechargerecord/', views.show_my_recharge_request, name='my_recharge'),
    path('resend-otp/', views.resend_otp, name='resend_otp'),
    path('deleteMyAccount/', views.delete_account, name='delete_my_account'),
    path('showmybankcard/', views.show_my_bank_cards, name='show_my_bank_card'),
    path('mywithdrawrecord/', views.my_withdraw_requests, name='my_withdraw'),
    path('myIncomeDetails/', views.income_details, name='my_income_details'),
]