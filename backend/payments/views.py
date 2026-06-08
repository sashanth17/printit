from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import razorpay

from orders.models import Order
from .models import Payments
class CreatePaymentView(APIView):
    def post(self,request):
        # Logic to create a payment
        if(request.data.get('OrderId') is None):
            return Response({"error": "OrderId is required"}, status=400)
        client=razorpay.Client(auth=(settings.RAZORPAY_KEY_ID,settings.RAZORPAY_KEY_SECRET))
        order=Order.objects.get(OrderId=request.data.get('OrderId'))
        payment = client.order.create({
    "amount": int(order.Fare * 100),
    "currency": "INR",
    "receipt": f"order_{order.OrderId}"
})

        payment_entry=Payments.objects.create(
            OrderId=order,
            Amount=order.Fare,
            RazorpayOrderId=payment["id"],
            PaymentStatus='created'
        )
        payment_entry.save()

        return Response({'razorpayOrderId':payment["id"],"key": settings.RAZORPAY_KEY_ID}, status=201)
    
class VerifyPaymentView(APIView):
    def get(self,request):
        # Logic to create a payment
        return Response({"message": "Payment verified successfully"}, status=201)
    def post(self, request):

        client = razorpay.Client(
            auth=(
                settings.RAZORPAY_KEY_ID,
                settings.RAZORPAY_KEY_SECRET
            )
        )

        razorpay_order_id = request.data.get(
            "razorpay_order_id"
        )

        razorpay_payment_id = request.data.get(
            "razorpay_payment_id"
        )

        razorpay_signature = request.data.get(
            "razorpay_signature"
        )

        params_dict = {
            "razorpay_order_id": razorpay_order_id,
            "razorpay_payment_id": razorpay_payment_id,
            "razorpay_signature": razorpay_signature
        }

        try:

            client.utility.verify_payment_signature(
                params_dict
            )

            # Update DB here
            # Payment.status = SUCCESS
            # Order.status = PAID
            payment_entry=Payments.objects.get(RazorpayOrderId=razorpay_order_id)
            payment_entry.RazorpayPaymentId=razorpay_payment_id
            payment_entry.RazorpaySignature=razorpay_signature
            payment_entry.PaymentStatus='Completed'
            payment_entry.save()

            return Response({
                "success": True,
                "message": "Payment verified successfully"
            },status=200)

        except Exception as e:
            print("Verification Error:", str(e))
            return Response({
        "success": False,
        "message": str(e)
    }, status=400)