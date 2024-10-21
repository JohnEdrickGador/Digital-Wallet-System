from django.db import models

class Wallet(models.Model):
    username = models.CharField(max_length=40)
    email = models.CharField(max_length = 200)
    balance = models.FloatField()
    date_created = models.DateField(auto_now_add = True)

    def __str__(self) -> str:
        return self.username