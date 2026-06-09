from django.db import models

# Create your models here.

class Payments(models.Model):
    PaymentId = models.AutoField(primary_key=True)
    OrderId = models.ForeignKey(
        'orders.Order',
        on_delete=models.CASCADE)
    Amount = models.IntegerField()
    RazorpayPaymentId = models.CharField(max_length=255, unique=True)
    RazorpayOrderId = models.CharField(max_length=255, unique=True)
    RazorpaySignature = models.CharField(max_length=255)
    PaymentStatus = models.CharField(max_length=255)
    PaidAt = models.DateTimeField(auto_now_add=True)
