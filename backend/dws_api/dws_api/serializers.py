# describe the process of going from Python object to JSON
from rest_framework import serializers
from .models import Wallet

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['id', 'first_name', 'last_name', 'email', 'balance', 'date_created']
    
    #prevent email duplicates
    def validate_email(self, value):
        if Wallet.objects.filter(email=value).exists():
            raise serializers.ValidationError("The email address is already connected to another wallet.")
        return value