# describe the process of going from Python object to JSON
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Wallet

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['id', 'username', 'email', 'balance', 'date_created']
    
    #prevent email duplicates
    def validate_email(self, value):
        if Wallet.objects.filter(email=value).exists():
            raise serializers.ValidationError("The email address is already connected to another wallet.")
        return value
    
    def validate_username(self,value):
        if Wallet.objects.filter(username = value).exists():
            raise serializers.ValidationError("The username is already linked to another account")
        return value

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ["id", "username", "password", "email"]

class TransactionSerializer(serializers.Serializer):
    amount = serializers.FloatField()