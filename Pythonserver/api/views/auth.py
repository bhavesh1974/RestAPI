from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import NotAuthenticated
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
            raise NotAuthenticated(
                'A user with this email could not be found.')

        if (user.isVerified == 0):
            # return Response(data={'code': 403, 'message': 'Account is not verified.'}, status=403)
            raise NotAuthenticated('Account is not verified.')

        if (user.isActive == 0):
            raise NotAuthenticated(
                'Account is inactive. Please contact support for more information.')

        if bcrypt.checkpw(request.data['password'].encode('utf-8'), user.password.encode('utf-8')) != True:
            raise NotAuthenticated(
                'Invalid Password')

        payload = {
            'email': user.email,
            'userId': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }
        token = jwt.encode(payload, 'speakSuperJWTSecret', algorithm='HS256')

        return Response(data={'code': 200, 'token': token, 'userName': user.firstName + ' ' + user.lastName}, status=200)

    def forgotpassword(self, request, pk=None):
        return Response(status=200)
