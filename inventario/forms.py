from django.forms import *
from .models import*


class PrestamosForm(forms.Form):
    cedula_usuario = CharField(label='Cedula del usuario', max_length=100)
    codigo_inventario = CharField(label='Codigo del inventario', max_length = 100)
  
class DevolucionesForm(forms.Form):
    codigo_inventario = CharField(label='Codigo del inventario', max_length = 100)

class reg_inventarioForm(ModelForm):
    class Meta:
        model=Inventario
        fields=['codigo', 'nombre', 'categoria']

class AgregarCategoriaForm(ModelForm):
    class Meta:
        model = Categoria
        fields = ['nombre']

class ActualizarCategoriaForm(forms.Form):
    id = IntegerField(min_value= 1, widget = HiddenInput())
    nombre = CharField(label='Nombre', max_length=100, min_length=2)

class RegistroForm(ModelForm):
    class Meta:
        model= Usuarios
        fields=['cedula','nombre']
