# Generated by Django 4.2.6 on 2023-10-18 08:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0005_rename_date_orders_date_purchase_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recharge_record',
            old_name='payment_id',
            new_name='recharge_payment_id',
        ),
    ]
