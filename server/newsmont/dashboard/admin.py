from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register((Category, Product, Bank_Card, Withdraw_Record, Recharge_Record, Orders))
