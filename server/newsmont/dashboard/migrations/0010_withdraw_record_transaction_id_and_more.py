# Generated by Django 4.2.6 on 2023-12-22 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0009_alter_recharge_record_transaction_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='withdraw_record',
            name='transaction_id',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='withdraw_record',
            name='upi_ref_number',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
