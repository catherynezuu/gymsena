from django.db import models
from django.contrib.auth.models import User
from django.db import models

class Categoria(models.Model):
    nombre=models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Inventario(models.Model):
    codigo=models.BigIntegerField()
    nombre=models.CharField(max_length=100)
    categoria=models.ForeignKey(Categoria, on_delete=models.RESTRICT)
    stock=models.IntegerField()
    disponibles=models.BigIntegerField()
    descripcion= models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.nombre

class Usuarios(models.Model): 
    cedula=models.IntegerField()
    nombre=models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
class Transacciones(models.Model):
    id_inventario=models.ForeignKey(Inventario,on_delete=models.CASCADE)
    id_usuario=models.ForeignKey(Usuarios,on_delete=models.CASCADE)
    fecha_prestamo=models.DateTimeField(auto_now_add=True)
    fecha_devolucion=models.DateTimeField(null=True, blank=True)
    observaciones=models.CharField(max_length=200, null=True, blank=True)
    cantidad=models.IntegerField()

    def __str__(self) -> str:
        return str(self.id_inventario)