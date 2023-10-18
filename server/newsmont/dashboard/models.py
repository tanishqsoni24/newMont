from django.db import models
from base.models import BaseModel
from accounts.models import Profile
from django.utils import timezone

# Create your models here.

class Category(BaseModel):
    name = models.CharField(max_length=100, blank=True, null=True)
    slug = models.SlugField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.slug = self.name.replace(" ", "-").lower()
        super().save(*args, **kwargs)

class Product(BaseModel):
    name = models.CharField(max_length=100, blank=True, null=True)
    slug = models.SlugField(max_length=100, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="category")
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    eligible_for_vip_number = models.BigIntegerField(default=0)
    image = models.ImageField(upload_to="products", blank=True, null=True)
    days = models.IntegerField(default=0)
    daily_income = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    total_income = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.name + " - " + self.category.name
    
    def save(self, *args, **kwargs):
        self.slug = self.name.replace(" ", "-").lower()
        super().save(*args, **kwargs)

class Bank_Card(BaseModel):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="bank_card_user")
    card_holder_name = models.CharField(max_length=100, blank=True, null=True)
    account_number = models.CharField(max_length=100, blank=True, null=True)
    ifsc_code = models.CharField(max_length=100, blank=True, null=True)
    bank_name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.card_holder_name + " - " + self.account_number
    
class Withdraw_Record(BaseModel):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="withdraw_user")
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    bank_card = models.ForeignKey(Bank_Card, on_delete=models.CASCADE, related_name="bank_card")
    status = models.BooleanField(default=False)
    date = models.DateTimeField(blank=True, null=True)
    upi_ref_number = models.CharField(max_length=15, blank=True, null=True)
    paid_date = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.name 
    
    def update_paid_date(self):
        self.paid_date = timezone.now()
        self.save()
    
class Recharge_Record(BaseModel):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="recharge_user")
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    status = models.BooleanField(default=False)
    date = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return "Rs. " + str(self.amount) + " - " + str(self.user.user.first_name) + " : " + str(self.date.strftime("%B-%d-%Y"))
    
class Orders(BaseModel):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="orer_user")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="order_product")
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    date_purchase = models.DateTimeField(blank=True, null=True)

    def set_date_purchase(self):
        self.date_purchase = timezone.now()
        self.save()

    def __str__(self):
        return self.user.user.first_name + " : " + str(self.date_purchase.strftime("%B-%d-%Y")) + " : " + self.product.name
    
