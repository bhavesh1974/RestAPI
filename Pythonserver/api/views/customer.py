from rest_framework import viewsets
from rest_framework.response import Response
from api.models.customer import Customer
from api.serializers.customer import CustomerSerializer
from django.forms import model_to_dict


class CustomerViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer

    def list(self, request):
        serializer = CustomerSerializer(Customer.objects.all(), many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = CustomerSerializer(data=request.data)
        if (serializer.is_valid() == False):
            print(serializer.errors)
            return Response(data={'code': 400, 'message': 'Error occured while saving customer '}, status=400)

        if len(request.data['id']) > 0:
            customer = Customer.objects.get(id=request.data['id'])
            serializer.update(
                validated_data=serializer.validated_data, instance=customer)
        else:
            serializer.create(validated_data=serializer.validated_data)

        return Response(data={'code': 200, 'message': 'Successfully saved.'}, status=201)

    def destroy(self, request, *args, **kwargs):
        userId = kwargs['pk']
        customer = Customer.objects.get(id=userId)

        try:
            customer.delete()
        except Exception as e:
            return Response(data={'code': 400, 'message': 'Error occured while deleting customer'}, status=400)

        return Response(data={'code': 200, 'message': 'Successfully Deleted.'}, status=200)
