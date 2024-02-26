from django.forms import *
from .models import*


class PrestamosForm(forms.Form):
    cedula_usuario = CharField(label='Cedula del usuario', max_length=100)
    nombre_elemento = ModelChoiceField(queryset=Inventario.objects.all(), label="Elemento")
    cantidad = IntegerField(label="cantidad", min_value=1)

  
class DevolucionesForm(forms.Form):
    codigo_inventario = CharField(label='Codigo del inventario', max_length = 100)

class AgregarInventarioForm(ModelForm):
    class Meta:
        model=Inventario
        fields=['codigo', 'nombre', 'categoria', 'stock']

class ActualizarInventarioForm(forms.Form):
    id = IntegerField(min_value=1, widget=HiddenInput())
    codigo = IntegerField(label='Codigo', min_value=1)
    nombre = CharField(label='Nombre', max_length=100, min_length=2)
    categoria = ModelChoiceField(queryset=Categoria.objects.all(), label='Categoría')
    stock = IntegerField(label="stock", min_value=1)
    disponibilidad=IntegerField(label='disponibilidad', min_value=0)

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
