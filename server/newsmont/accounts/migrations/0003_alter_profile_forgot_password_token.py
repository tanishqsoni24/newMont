# Generated by Django 4.2.6 on 2023-10-07 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_profile_forgot_password_token_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='forgot_password_token',
            field=models.CharField(blank=True, max_length=6, null=True, unique=True),
        ),
    ]
