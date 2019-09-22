from django.db import models


class Auth(models.Model):
    token = models.CharField(max_length=1000)
    userName = models.CharField(max_length=1000)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.token = kwargs['token']
        self.userName = kwargs['userName']
