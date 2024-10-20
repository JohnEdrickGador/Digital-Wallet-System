from django.db import models

class Wallet(models.Model):
    first_name = models.CharField(max_length = 100)
    last_name = models.CharField(max_length = 50)
    balance = models.FloatField()
    date_created = models.DateField(auto_now_add = True)