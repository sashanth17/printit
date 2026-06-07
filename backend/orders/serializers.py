from rest_framework.serializers import ModelSerializer
from .models import Order

class CreateOrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'File',
            'IsColour',
            'PageStart',
            'PageEnd',
            'Copies'
        ]


class ViewOrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'User',
            'OrderId',
            'PageStart',
            'PageEnd',
            'IsColour',
            'Copies',
            'Status',
            'CreatedAt',
            'QueuedAt',
            'PrintedAt',
            'File',
            'Fare',
        ]