from rest_framework.serializers import ModelSerializer
from .models import Order  # Replace with your actual Order model import

class CreateOrderSerializer(ModelSerializer):
    class Meta:
        model =  Order
        fields = ['User','File','IsColour','PageStart','PageEnd','Copies']  # Adjust fields as necessary

class ViewOrderSerializer(ModelSerializer):
    class Meta:
        model =  Order
        fields = ['User','OrderId','PageStart','PageEnd','IsColour','Copies','Status','CreatedAt','QueuedAt','PrintedAt','File','Fare',] # Adjust fields as necessary