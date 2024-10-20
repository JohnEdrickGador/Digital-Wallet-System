from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Wallet
from .serializers import WalletSerializer, TransactionSerializer

@api_view(['POST'])
def create_wallet(request, format = None):
    #create a digital wallet
    if request.method == 'POST':
        serializer = WalletSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"error message": serializer.errors.get("email")[0]},status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def check_balance(request, id, format = None):
    #check the balance of wallet
    try:
        wallet = Wallet.objects.get(pk = id)
        serializer = WalletSerializer(wallet)
        return Response({'balance':serializer.data.get('balance')}, status=status.HTTP_200_OK)
    except Wallet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
# @api_view(['GET'])
# def list_wallets(request, format = None):
#     if request.method == 'GET':
#         wallets = Wallet.objects.all()
#         serializer = WalletSerializer(wallets, many=True)
#         return Response(serializer.data)

@api_view(["PUT"])
def deposit(request, id, format = None):
    #cash in function
    try:
        wallet = Wallet.objects.get(pk = id)
        transaction_serializer = TransactionSerializer(data = request.data)

        if transaction_serializer.is_valid():
            print('valid')
            amount = transaction_serializer.validated_data['amount']
            print(amount)
            wallet.balance += amount
            wallet.save()

            serializer = WalletSerializer(wallet)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(transaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Wallet.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
def debit(request, id, format = None):
    #debit function
    try:
        wallet = Wallet.objects.get(pk = id)
        transaction_serializer = TransactionSerializer(data = request.data)

        if transaction_serializer.is_valid():
            amount = transaction_serializer.validated_data['amount']
            if wallet.balance < amount: 
                return Response({'error message': "Insufficient Balance"}, status=status.HTTP_400_BAD_REQUEST)
            wallet.balance -= amount
            wallet.save()

            serializer = WalletSerializer(wallet)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(transaction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Wallet.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)

