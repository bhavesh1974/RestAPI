from rest_framework.serializers import ModelSerializer
from api.models.sales import Sales


class SalesSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Sales
