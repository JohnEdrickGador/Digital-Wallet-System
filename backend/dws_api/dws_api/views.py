from rest_framework.decorators import (api_view, permission_classes, authentication_classes)
from rest_framework.response import Response
from rest_framework import status
from .models import Wallet
from .serializers import WalletSerializer, TransactionSerializer, UserSerializer

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from .authenticate import BearerAuthentication


@api_view(['POST'])
@authentication_classes([SessionAuthentication, BearerAuthentication])
@permission_classes([IsAuthenticated])
def create_wallet(request, format = None):
    #create a digital wallet
    if request.method == 'POST':
        serializer = WalletSerializer(data = request.data)
        user = request.user
        if serializer.is_valid():
            #check if details are similar to that of the logged in user
            if user.email != request.data.get('email') and user.username != request.data.get('username'):
                return Response({"error message": "Provided details does not match the authenticated user"}, status= status.HTTP_403_FORBIDDEN)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            if serializer.errors.get("email"):
                return Response({"error message": serializer.errors.get("email")[0] },status=status.HTTP_400_BAD_REQUEST)
            elif serializer.errors.get("username"):
                return Response({"error message": serializer.errors.get("username")[0] },status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BearerAuthentication])
@permission_classes([IsAuthenticated])
def check_balance(request, username, format = None):
    #check the balance of wallet
    try:
        wallet = Wallet.objects.get(username = username)
        serializer = WalletSerializer(wallet)
        user = request.user
        if user.username == wallet.username and user.email == wallet.email:
            return Response({'balance':serializer.data.get('balance')}, status=status.HTTP_200_OK)
        else:
            return Response({"error message": "Provided details does not match the authenticated user"}, status= status.HTTP_403_FORBIDDEN)
    except Wallet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)  

@api_view(["PUT"])
@authentication_classes([SessionAuthentication, BearerAuthentication])
@permission_classes([IsAuthenticated])
def deposit(request, username, format = None):
    #cash in function
    try:
        wallet = Wallet.objects.get(username = username)
        transaction_serializer = TransactionSerializer(data = request.data)
        user = request.user

        if transaction_serializer.is_valid():
            if user.email == wallet.email and user.username == wallet.username:
                amount = transaction_serializer.validated_data['amount']
                wallet.balance += amount
                wallet.save()

                serializer = WalletSerializer(wallet)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error message": "Provided details does not match the authenticated user"}, status= status.HTTP_403_FORBIDDEN)
        
        return Response(transaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Wallet.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
@authentication_classes([SessionAuthentication, BearerAuthentication])
@permission_classes([IsAuthenticated])
def debit(request, username, format = None):
    #debit function
    try:
        wallet = Wallet.objects.get(username = username)
        transaction_serializer = TransactionSerializer(data = request.data)
        user = request.user

        if transaction_serializer.is_valid():
            if user.email == wallet.email and user.username == wallet.username:
                amount = transaction_serializer.validated_data['amount']
                if wallet.balance < amount: 
                    return Response({'error message': "Insufficient Balance"}, status=status.HTTP_400_BAD_REQUEST)
                wallet.balance -= amount
                wallet.save()

                serializer = WalletSerializer(wallet)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error message": "Provided details does not match the authenticated user"}, status= status.HTTP_403_FORBIDDEN)              
        return Response(transaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Wallet.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def signup(request, format = None):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        # user = User.objects.get(username = request.data['username'])
        user = User.objects.get(email = request.data['email'])
        user.first_name = request.data['first_name']
        user.last_name = request.data['last_name']
        user.set_password(request.data['password'])
        user.save()
        
        #generate token
        token = Token.objects.create(user = user)
        return Response({"token": token.key}, status=status.HTTP_201_CREATED)
    else:
        return Response("Invalid sign up", status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def login(request):
    try:
        user = get_object_or_404(User, email = request.data['email'])
    except:
        return Response("User not found", status=status.HTTP_404_NOT_FOUND)

    #check if password is incorrect
    if not user.check_password(request.data['password']):
        return Response("Wrong Password", status=status.HTTP_403_FORBIDDEN)
    
    token, created = Token.objects.get_or_create(user = user)
    serializer = UserSerializer(user)
    return Response({'message': 'Successful Login', 'token': token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(["POST"])
@authentication_classes([TokenAuthentication])  # Require the token to be sent
@permission_classes([IsAuthenticated])  # Only authenticated users can logout
def logout(request):
    try:
        # Get the user's token
        token = Token.objects.get(user=request.user)
        # Delete the token, effectively logging out the user
        token.delete()
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({"error": "Token not found"}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def list_wallets(request, format = None):
#     if request.method == 'GET':
#         wallets = Wallet.objects.all()
#         serializer = WalletSerializer(wallets, many=True)
#         return Response(serializer.data)
