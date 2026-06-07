from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from django.shortcuts import get_object_or_404

from .serializers import CreateOrderSerializer, ViewOrderSerializer
from .models import Order

from accounts.models import User

import uuid


class OrderView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):

        serializer = CreateOrderSerializer(data=request.data)

        if not serializer.is_valid():

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        data = serializer.validated_data

        page_start = data["PageStart"]
        page_end = data["PageEnd"]
        copies = data["Copies"]
        is_colour = data["IsColour"]

        # ----------------------------------
        # Calculate pages
        # ----------------------------------

        total_pages = page_end - page_start + 1

        if total_pages <= 0:
            return Response(
                {
                    "error": "Invalid page range"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # ----------------------------------
        # Calculate Fare
        # ----------------------------------

        BW_PRICE = 2
        COLOUR_PRICE = 10

        price_per_page = (
            COLOUR_PRICE
            if is_colour
            else BW_PRICE
        )

        fare = (
            total_pages
            * copies
            * price_per_page
        )

        # ----------------------------------
        # Generate Token
        # ----------------------------------

        token = str(uuid.uuid4())

        # ----------------------------------
        # Temporary User
        # ----------------------------------

        test_user = User.objects.first()

        # ----------------------------------
        # Create Order
        # ----------------------------------

        order = Order.objects.create(
            User=test_user,
            PageStart=page_start,
            PageEnd=page_end,
            IsColour=is_colour,
            Copies=copies,
            File=data["File"],
            Fare=fare,
            token=token
        )

        return Response(
            {
                "orderId": order.OrderId,
                "paymentAmount": fare,
                "status": order.Status
            },
            status=status.HTTP_201_CREATED
        )


class OrderDetailView(APIView):
    def get(self, request, id):
        order = get_object_or_404(Order, OrderId=id)

        serializer = ViewOrderSerializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class MyOrdersView(APIView):
    def get(self, request, id):

        orders = Order.objects.filter(User=id)

        serializer = ViewOrderSerializer(
            orders,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )