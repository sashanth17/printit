from rest_framework.serializers import ModelSerializer
from .models import Order  # Replace with your actual Order model import

class OrderSerializer(ModelSerializer):
    class Meta:
        model =  Order
        fields = ['User','File','IsColour','PageStart','PageEnd','Copies']  # Adjust fields as necessary