from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *

User = get_user_model()

# Define los serializadores que transforman objetos Django en formato JSON

# Serializador para crear un nuevo usuario
class CrearUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('codigo', 'email', 'nombre', 'apellido', 'carrera', 'password')

    def validate(self, data):
        user = User(**data)
        password = data.get('password')

        try:
            # Valida la contraseña del usuario según las políticas de seguridad
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            
            # Retorna un error de validación en caso de una contraseña no válida
            raise exceptions.ValidationError(
                {'password': serializer_errors['non_field_errors']}
            )

        return data

    def create(self, validated_data):
        # Crea un nuevo usuario en la base de datos con los datos validados
        user = User.objects.create_user(
            codigo = validated_data['codigo'],
            email = validated_data['email'],
            nombre = validated_data['nombre'],
            apellido = validated_data['apellido'],
            carrera = validated_data['carrera'],
            password = validated_data['password'],
        )

        return user
    
# Serializador para los datos del usuario
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('codigo', 'email', 'nombre', 'apellido', 'carrera')

class PublicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicacion
        fields = '__all__'

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = '__all__'

class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = '__all__'