from .import views
from django.urls import path


urlpatterns = [
    path('login/', views.admin_login, name='login'),
    path('', views.admin_index, name='index'),
    path('approve_withdraw/', views.approve_withdraw_records, name='approve_withdraw'),
    path('approve_recharge/', views.approve_recharge_record, name='approve_recharge'),
    path("distribute_income/", views.generate_income, name="distribute_income"),
]