from rest_framework.serializers import ModelSerializer
from api.models.user import User


class UserSerializer(ModelSerializer):
    class Meta:
        fields = ['id', 'firstName', 'lastName', 'email',
                  'phone', 'picture', 'isVerified', 'isActive', 'password']
        model = User
