from django.conf import settings
import requests 
url=settings.PRINT_SERVICE_URL+"/print/document"
from orders.models import Order
def pushToPrintService(order_id):
    order=Order.objects.get(OrderId=order_id)
    data={
        "orderId": order.OrderId,
        "filePath": order.File.url,
    }
    response=requests.post(url,json=data)
    print("PRINT JOB SUCESSFULLY PUSHED TO PRINT SERVICE: ",response.status_code)


