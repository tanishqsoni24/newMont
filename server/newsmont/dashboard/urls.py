from .import views
from django.urls import path


urlpatterns = [
    path('all_products/', views.all_proucts, name='all_proucts'),
    path("purchase_product/", views.purchase_product, name="purchase_product"),
    path('my_income_details/', views.income_details, name='my_income_details'),
]