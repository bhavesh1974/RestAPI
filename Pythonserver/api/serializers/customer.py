from rest_framework.serializers import ModelSerializer
from api.models.customer import Customer


class CustomerSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Customer
