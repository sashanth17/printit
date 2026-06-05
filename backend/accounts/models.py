from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    regno = models.CharField(max_length=20, unique=True)
