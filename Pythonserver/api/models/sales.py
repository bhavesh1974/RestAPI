from django.db import models
import uuid


class Sales(models.Model):
    id = models.CharField(max_length=50, default=uuid.uuid4, editable=True)
    salesDate = models.DateField()
    customer = models.CharField(max_length=50)
    item = models.CharField(max_length=50)
    qty = models.DecimalField(decimal_places=2, max_digits=10)
    rate = models.DecimalField(decimal_places=2, max_digits=10)
    taxPercent = models.DecimalField(decimal_places=2, max_digits=10)

    def __str__(self):
        return self.id

    class Meta:
        db_table = 'sales'
