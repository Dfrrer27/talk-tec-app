from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from .serializers import *

# Create your views here.

class RegistrarView(APIView):
    def post(self, request):
        data = request.data

        serializer = CrearUsuarioSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)
        user = UsuarioSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)

class RecuperarUsuarioView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user = UsuarioSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)
