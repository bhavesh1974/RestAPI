from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
import jwt
from api.models.user import User
import datetime


class RequestMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if (request.path.find('forgotpassword') == -1 and request.path.find('signin') == -1 and request.path.find('signup') == -1):
            authHeader = request.META.get('HTTP_AUTHORIZATION')
            if (authHeader == None):
                return self.unauthorized_response(request)

            if authHeader.find('Bearer') > -1:
                token = authHeader.split(" ")[1]
            else:
                return self.unauthorized_response(request)

            payload = jwt.decode(token, 'speakSuperJWTSecret')
            userId = payload.get('userId')

            try:
                user = User.objects.get(id=userId)
            except User.DoesNotExist:
                return Response(data="A user with this email could not be found.", status=400)

            request.userId = userId

        return self.get_response(request)

    def unauthorized_response(self, request):
        response = Response(
            {"data": "Not Authorized."},
            content_type="application/json",
            status=401,
        )
        response.accepted_renderer = JSONRenderer()
        response.accepted_media_type = "application/json"
        response.renderer_context = {}

        return response
