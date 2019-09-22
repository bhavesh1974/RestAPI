from django.db import models
import uuid


class User(models.Model):
    id = models.CharField(max_length=32, primary_key=True, default=uuid.uuid4)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField(max_length=200)
    password = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    picture = models.ImageField(blank=True)
    isVerified = models.IntegerField(max_length=1)
    isActive = models.IntegerField(max_length=1)
    verificationToken = models.CharField(max_length=50, blank=True)

    class Meta:
        db_table = "users"
