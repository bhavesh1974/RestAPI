from rest_framework.serializers import ModelSerializer
from api.models.auth import Auth


class AuthSerialier(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Auth
