from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import *
from .serializers import *

# Las vistas estan definidas utilizando la API de Django REST Framework

# Vista para registrar un nuevo usuario
class RegistrarView(APIView):
    def post(self, request):
        data = request.data

        # Objeto serializador para los datos del usuario
        serializer = CrearUsuarioSerializer(data=data)
        
        # Verifica si los datos del usuario son válidos
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Crea un nuevo usuario en la base de datos a partir de los datos validados
        user = serializer.create(serializer.validated_data)
        user = UsuarioSerializer(user)

        # Retorna la información del usuario registrado con un código de respuesta 201
        return Response(user.data, status=status.HTTP_201_CREATED)

# Vista para recuperar los datos de un usuario autenticado
class RecuperarUsuarioView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        access_token = request.META.get('HTTP_AUTHORIZATION')
        print('Token JWT recibido:', access_token)  # Agregar este registro de consola
        user = request.user
        user = UsuarioSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)

# Vista para obtener la lista de carreras tecnológicas
class CarrerasTecnologicasView(APIView):
    def get(self, request):
        carreras = Departamento.objects.all()
        serializer = DepartamentoSerializer(carreras, many=True)
        
        return Response(serializer.data)
