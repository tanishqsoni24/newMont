from .import views
from django.urls import path


urlpatterns = [
    path('', views.admin_index, name='index'),
    path("purchase_product/", views.purchase_product, name="purchase_product"),
]