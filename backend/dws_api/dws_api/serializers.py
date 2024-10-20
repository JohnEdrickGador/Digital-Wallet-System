# describe the process of going from Python object to JSON
from rest_framework import serializers
from .models import Wallet

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['id', 'first_name', 'last_name', 'balance', 'date_created']