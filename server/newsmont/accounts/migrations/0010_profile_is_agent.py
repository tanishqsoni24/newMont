# Generated by Django 4.2.6 on 2023-10-24 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_income'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='is_agent',
            field=models.BooleanField(default=False),
        ),
    ]
