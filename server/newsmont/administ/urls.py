from .import views
from django.urls import path


urlpatterns = [
    path('login/', views.admin_login, name='login'),
    path('', views.admin_index, name='index'),
]