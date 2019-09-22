from rest_framework import viewsets
from api.serializers.user import UserSerializer
from api.models.user import User
from rest_framework.response import Response
from django.http import HttpResponse
import bcrypt
import os.path
from django.conf import settings
from api.models.user import User


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def profile(self, request, pk=None):
        user = User.objects.get(id=request.userId)
        serializer = UserSerializer(user)
        return Response(data={'data': serializer.data, 'code': 200}, status=200)

    def updateProfile(self, request):
        user = User.objects.get(id=request.userId)
        user.firstName = request.data['firstName']
        user.lastName = request.data['lastName']
        user.phone = request.data['phone']

        try:
            user.save()
        except Exception as e:
            return Response(data={'message': 'Internal Error: Profile cannot be updated.'}, status=400)

        return Response(data={'code': 200, 'message': "Profile is updated successfully."}, status=200)

    def changePassword(self, request):
        user = User.objects.get(id=request.userId)

        if bcrypt.checkpw(request.data['oldpassword'].encode('utf-8'), user.password.encode('utf-8')) != True:
            return Response(data={'message': 'Password does not match.'}, status=400)

        hashed = bcrypt.hashpw(
            request.data['password'].encode('utf-8'), bcrypt.gensalt(12))

        user.password = hashed.decode('utf-8')

        try:
            user.save()
        except Exception as e:
            return Response(data={'message': 'Internal Error: Password cannot be changed.'}, status=400)

        return Response(data={'code': 200, 'message': "Password changed successfully."}, status=200)

    def getPicture(self, request):
        try:
            user = User.objects.get(id=request.userId)
        except User.DoesNotExist:
            return Response(data={'message': 'User record not found.'}, status=400)

        if (user.picture == None):
            return Response(data={'message': 'User photo is not set.'}, status=400)

        if (os.path.isfile(settings.BASE_DIR + '/uploads/' + str(user.picture))):
            with open(settings.BASE_DIR + '/uploads/' + str(user.picture), "rb") as f:
                return HttpResponse(f.read(), content_type="image/jpeg")
        else:
            return Response(data={'message': 'User photo does not exist.'}, status=400)

    def uploadPicture(self, request):
        try:
            user = User.objects.get(id=request.userId)
        except User.DoesNotExist:
            return Response(data={'message': 'User record not found.'}, status=400)

        if 'files' not in request.data:
            return Response(data={'message': 'There is no file to be uploaded'}, status=400)

        photo = request.data['files']
        try:
            user.picture.save(photo.name, photo, save=True)
        except Exception:
            return Response(data={'message': 'Error while occuring saving profile picture.'}, status=400)

        return Response(data={'message': 'Profile picture uploaded successfully.'})

    def signup(self, request):
        try:
            user = User.objects.get(email=request.data['email'])
            if (user != None):
                return Response(data={'message': 'A user with this email is already registered.'}, status=400)
        except User.DoesNotExist:
            pass

        hashed = bcrypt.hashpw(
            request.data['password'].encode('utf-8'), bcrypt.gensalt(12))
        request.data['password'] = hashed.decode('utf-8')
        request.data['isVerified'] = 1
        request.data['isActive'] = 1

        serializer = UserSerializer(data=request.data)
        if (serializer.is_valid() == False):
            print(serializer.errors)

        print(serializer)
        serializer.save()
        return Response(data={'code': 200, 'message': "You are signed up successfully."}, status=200)
