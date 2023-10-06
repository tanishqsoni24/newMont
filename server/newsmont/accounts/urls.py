from .import views
from django.urls import path


urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('activate/', views.activate_account, name='activate_account')
]