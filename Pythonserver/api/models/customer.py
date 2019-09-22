from django.db import models
import uuid
# Create your models here.


class Customer(models.Model):
    id = models.CharField(max_length=50, primary_key=True,
                          default=uuid.uuid4, editable=False)
    customerCode = models.CharField(max_length=50)
    customerName = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)

    def __str__(self):
        return self.id

    class Meta:
        db_table = "customers"
