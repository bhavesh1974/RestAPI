from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from api.serializers.auth import AuthSerialier
from api.models.user import User
import bcrypt
import jwt
import datetime


class AuthViewSet(viewsets.ModelViewSet):
    serializer_class = AuthSerialier

    def signin(self, request, pk=None):
        try:
            user = User.objects.get(email=request.data['email'])
        except User.DoesNotExist:
            return Response(data={'message': 'A user with this email could not be found.'}, status=400)

        if (user.isVerified == 0):
            return Response(data={'message': 'Account is not verified.'}, status=400)

        if (user.isActive == 0):
            return Response(data={'message': 'Your account is deactivated. Please contact support for more information.'}, status=400)

        if bcrypt.checkpw(request.data['password'].encode('utf-8'), user.password.encode('utf-8')) != True:
            return Response(data={'message': 'Password does not match.'}, status=400)

        payload = {
            'email': user.email,
            'userId': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }
        token = jwt.encode(payload, 'speakSuperJWTSecret', algorithm='HS256')

        return Response(data={'code': 200, 'token': token, 'userName': user.firstName + ' ' + user.lastName}, status=200)

    def forgotpassword(self, request, pk=None):
        return Response(status=200)
