from django.db import models
  
  
class Departamento(models.Model):
    nombre = models.CharField(max_length=100)
    
    def __str__(self):
	    return self.nombre
 
 
class Usuario(models.Model):
    codigo = models.CharField(max_length=10)
    gmail = models.EmailField()
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    contraseña = models.CharField(max_length=100)
    carrera = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
	    return f" {self.nombre} {self.apellido}"
 
 
class Publicacion(models.Model):
    titulo = models.CharField(max_length=100)
    contenido = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True) 
    carrera = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo
