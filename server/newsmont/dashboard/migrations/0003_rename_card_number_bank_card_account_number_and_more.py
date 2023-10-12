# Generated by Django 4.2.6 on 2023-10-10 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0002_alter_recharge_record_amount_left_delete_wallet'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bank_card',
            old_name='card_number',
            new_name='account_number',
        ),
        migrations.AddField(
            model_name='withdraw_record',
            name='paid_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='withdraw_record',
            name='upi_ref_number',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]