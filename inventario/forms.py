from django import forms
from django.forms import ModelChoiceField, IntegerField, CharField, HiddenInput
from .models import Inventario, Categoria, Usuarios

class PrestamosForm(forms.Form):
    cedula_usuario = IntegerField(
        label='Cedula del usuario', widget=forms.NumberInput(attrs={'list': 'cedulas', 'autocomplete': 'off'}), min_value=1000000)
    nombre_elemento = ModelChoiceField(
        queryset=Inventario.objects.all(), label="Nombre elemento", empty_label="")
    cantidad = IntegerField(label="Cantidad", min_value=1, widget=forms.NumberInput(attrs={'min': '1'}))

class DevolucionesForm(forms.Form):
    cedula_usuario = IntegerField(
        label='Cedula del usuario', widget=forms.NumberInput(attrs={'list': 'cedulas', 'autocomplete': 'off'}), min_value=1000000)
    codigo_inventario = ModelChoiceField(
        queryset=Inventario.objects.all(), label="Nombre elemento", empty_label="")
    observaciones = CharField(label='Observaciones', max_length=200, required=False)

class AgregarInventarioForm(forms.ModelForm):
    class Meta:
        model = Inventario
        fields = ['codigo', 'nombre', 'categoria', 'stock']

class ActualizarInventarioForm(forms.Form):
    id = IntegerField(min_value=1, widget=HiddenInput())
    codigo = IntegerField(label='Codigo', min_value=1)
    nombre = CharField(label='Nombre', max_length=100, min_length=2)
    categoria = ModelChoiceField(queryset=Categoria.objects.all(), label='Categoría')
    stock = IntegerField(label="Stock", min_value=0)

class AgregarCategoriaForm(forms.ModelForm):
    class Meta:
        model = Categoria
        fields = ['nombre']

class ActualizarCategoriaForm(forms.Form):
    id = IntegerField(min_value=1, widget=HiddenInput())
    nombre = CharField(label='Nombre', max_length=100, min_length=2)

class RegistroForm(forms.ModelForm):
    class Meta:
        model = Usuarios
        fields = ['cedula', 'nombre']
