from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class Departamento(models.Model):
    nombre = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre

class UsuarioManager(BaseUserManager):
    def create_user(self, codigo, email, nombre, apellido, carrera, password=None, **extra_fields):
        if not email:
            raise ValueError('Los usuarios deben tener una dirección de correo electrónico.')

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            codigo=codigo,
            email=email,
            nombre=nombre,
            apellido=apellido,
            carrera=carrera,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, codigo, email, nombre, apellido, carrera, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(codigo, email, nombre, apellido, carrera, password, **extra_fields)
 
class Usuario(AbstractBaseUser, PermissionsMixin):
    codigo = models.CharField(max_length=10, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    carrera = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Cambiado a False para usuarios regulares

    objects = UsuarioManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['codigo', 'nombre', 'apellido', 'carrera']

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class Publicacion(models.Model):
    titulo = models.CharField(max_length=100)
    contenido = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True) 
    carrera = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo

class Comentario(models.Model):
    contenido = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE)
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.contenido