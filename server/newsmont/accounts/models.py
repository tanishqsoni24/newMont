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
    recommended_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="recommended_by", null=True, blank=True)
    forgot_password_token = models.CharField(max_length=6, blank=True, null=True, unique=True)
    forgot_password_token_start_time = models.DateTimeField(null=True, blank=True)
    vip_level = models.IntegerField(default=0)

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