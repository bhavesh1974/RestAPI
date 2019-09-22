from django.urls import path
from rest_framework.routers import DefaultRouter
from api.views.customer import CustomerViewSet
from api.views.auth import AuthViewSet
from api.views.user import UserViewSet
from api.views.sales import SalesViewSet

router = DefaultRouter()
router.register('customers', CustomerViewSet, base_name='customers')
router.register('sales', SalesViewSet, base_name='sales')

urlpatterns = [
    path('auth/signin', AuthViewSet.as_view({'post': 'signin'})),
    path('auth/forgotpassword',
         AuthViewSet.as_view({'post': 'forgotpassword'})),
    path('auth/confirmation', AuthViewSet.as_view({'post': 'confirmation'})),
    path('user/profile',
         UserViewSet.as_view({'get': 'profile'})),
    path('user/updateProfile',
         UserViewSet.as_view({'put': 'updateProfile'})),
    path('user/changePassword',
         UserViewSet.as_view({'post': 'changePassword'})),
    path('user/getPicture', UserViewSet.as_view({'get': 'getPicture'})),
    path('user/uploadPicture', UserViewSet.as_view({'post': 'uploadPicture'})),
    path('user/signup', UserViewSet.as_view({'post': 'signup'})),
]

urlpatterns += router.urls
