# Generated by Django 5.1.2 on 2024-10-21 09:02

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dws_api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wallet',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='wallet',
            name='last_name',
        ),
        migrations.AddField(
            model_name='wallet',
            name='username',
            field=models.CharField(default=django.utils.timezone.now, max_length=40),
            preserve_default=False,
        ),
    ]
