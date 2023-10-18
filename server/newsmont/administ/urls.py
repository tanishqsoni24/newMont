from .import views
from django.urls import path


urlpatterns = [
    path('', views.admin_index, name='index'),


]