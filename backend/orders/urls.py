from django.urls import path
from .views import OrderView,OrderDetailView,MyOrdersView

urlpatterns = [
    path('', OrderView.as_view(), name='orders'),
    path('<int:id>/', OrderDetailView.as_view(), name='order-detail'),
    path('MyOrders/<int:id>/',MyOrdersView.as_view(), name='my-orders')
]
