from rest_framework import viewsets
from api.models.sales import Sales
from api.serializers.sales import SalesSerializer
from rest_framework.response import Response
import datetime


class SalesViewSet(viewsets.ModelViewSet):
    serialier_class = SalesSerializer

    def list(self, request):
        serializer = SalesSerializer(Sales.objects.all(), many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = SalesSerializer(data=request.data)
        if (serializer.is_valid() == False):
            print(serializer.errors)
            return Response(data={'code': 400, 'message': 'Error occured while saving sales '}, status=400)

        if len(request.data['id']) > 0:
            sales = Sales.objects.get(id=request.data['id'])
            serializer.update(
                validated_data=serializer.validated_data, instance=sales)
        else:
            serializer.create(validated_data=serializer.validated_data)

        return Response(data={'code': 200, 'message': 'Successfully saved.'}, status=201)

    def destroy(self, request, *args, **kwargs):
        salesId = kwargs['pk']
        sales = Sales.objects.get(id=salesId)

        try:
            sales.delete()
        except Exception as e:
            return Response(data={'code': 400, 'message': 'Error occured while deleting sales'}, status=400)

        return Response(data={'code': 200, 'message': 'Successfully Deleted.'}, status=200)
