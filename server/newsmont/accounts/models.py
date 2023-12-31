from django.db import models
from base.models import BaseModel
from django.contrib.auth.models import User
from django.utils import timezone
from .import helpers

# Create your models here.

class Profile(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone_number = models.CharField(max_length=10, blank=True, unique=True)
    invite_code = models.CharField(max_length=12, blank=True)
    is_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, blank=True, unique=True)
    start_time = models.DateTimeField(null=True, blank=True)
    recommended_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="recommended_by", null=True, blank=True)
    forgot_password_token = models.CharField(max_length=6, blank=True, null=True, unique=True)
    forgot_password_token_start_time = models.DateTimeField(null=True, blank=True)
    vip_level = models.IntegerField(default=0)
    wallet = models.IntegerField(default=0)
    recharge_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, default=0)
    income = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, default=0)
    is_admin = models.BooleanField(default=False)
    is_agent = models.BooleanField(default=False)

    def __str__(self):
        return self.user.first_name
    
    def start_timer(self):
        self.start_time = timezone.now()
        self.save()

    def forgot_password_token_timer(self):
        self.forgot_password_token_start_time = timezone.now()
        self.save()

    def save(self, *args, **kwargs):
        if not self.invite_code:
            self.invite_code = helpers.generate_ref_code()
        super().save(*args, **kwargs)

class Income(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="income_user")
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, default=0)
    income_type = models.CharField(max_length=200, blank=True, null=True)
    income_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.user.first_name + " " + str(self.amount) + " " + self.income_type + " on " + str(self.income_date.strftime("%d-%m-%Y"))