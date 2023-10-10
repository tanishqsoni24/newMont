from django.db import models
from base.models import BaseModel
from accounts.models import Profile

# Create your models here.

class Admin_wallet(BaseModel):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=True, null=True)
    amount = models.DecimalField(decimal_places=2, blank=True, null=True, default=0.00, max_digits=12)
    date = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.user.user.first_name + " " + str(self.amount) 