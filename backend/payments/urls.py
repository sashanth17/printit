from django.urls import path
from .views import CreatePaymentView,VerifyPaymentView

urlpatterns=[
    path('CreatePayment/',CreatePaymentView.as_view(), name='create-payment'),
    path('VerifyPayment/',VerifyPaymentView.as_view(), name='verify-payment'),
    ]