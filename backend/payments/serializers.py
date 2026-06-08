from rest_framework.serializers import ModelSerializer


class PaymentSerializer(ModelSerializer):
    class Meta:
        model = None  # Replace with your Payment model
        fields = '__all__'