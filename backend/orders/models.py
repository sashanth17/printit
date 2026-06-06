from django.db import models
from django.core.validators import FileExtensionValidator
# Create your models here.

class Order(models.Model):
    User = models.ForeignKey('accounts.User', on_delete=models.CASCADE)  
    OrderId = models.AutoField(primary_key=True)
    PageStart=models.IntegerField()
    PageEnd=models.IntegerField()
    IsColour=models.BooleanField(default=False)
    Copies=models.IntegerField()
    Status = models.CharField(
    max_length=20,
    choices=[
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed')
    ],
    default='pending')
    CreatedAt=models.DateTimeField(auto_now_add=True)
    QueuedAt=models.DateTimeField(null=True, blank=True)
    PrintedAt=models.DateTimeField(null=True, blank=True)
    File=models.FileField(upload_to='orders/',
                validators=[FileExtensionValidator(allowed_extensions=['pdf'])] )
    Fare=models.IntegerField()
    token=models.CharField(max_length=255, unique=True)