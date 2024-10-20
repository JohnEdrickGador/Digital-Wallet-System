from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Wallet
from .serializers import WalletSerializer

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