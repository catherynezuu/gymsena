from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.forms import modelformset_factory
from django.db import IntegrityError
from .forms import *
from .models import *
from django.http import JsonResponse


# Create your views here.
def home(request):
    inventario_info = Inventario.objects.all()
    return render(request, 'home.html', {'formPrestamos': PrestamosForm, 'formDevoluciones': DevolucionesForm, 'formRegistroUsuario': RegistroForm, 'inventario': inventario_info})


def signup(request):
    if request.method == 'GET':
        return render(request, 'signup.html', {'form': UserCreationForm
                                               })
    else:
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.create_user(
                    username=request.POST['username'], password=request.POST['password1'])
                user.save()
                login(request, user)
                return redirect('tasks')
            except IntegrityError:
                return render(request, 'signup.html', {
                    'form': UserCreationForm, "error": 'el usuario ya existe'
                })

          # register user

    return render(request, 'signup.html', {'form': UserCreationForm, "error": 'contraseña incorrecta'
                                           })

# cerrar sesion


def signout(request):
    logout(request)
    return redirect('')

# iniciar sesion


def signin(request):
    if request.method == 'GET':
        return render(request, 'signin.html', {'form': AuthenticationForm})
    else:
        user = authenticate(
            request, username=request.POST['username'], password=request.POST['password'])
        if user is None:
            return render(request, 'signin.html', {'form': AuthenticationForm, 'error': 'usuario o contraseña incorrectos'})

        else:
            login(request, user)
            return redirect('home')


def categorias(request):
    form_agregar = AgregarCategoriaForm()
    form_actualizar = ActualizarCategoriaForm()
    list_items = Categoria.objects.all()

    return render(request, 'categorias.html', {'form_agregar': form_agregar, 'form_actualizar': form_actualizar, 'items': list_items})


def agregar_categoria(request):
    if not request.method == 'POST':
        messages.error(request, 'Método inválido')
        return redirect('categorias')

    form = AgregarCategoriaForm(request.POST)

    if not form.is_valid():
        for field, errors in form.errors.items():
            for error in errors:
                messages.error(request, f'{field}: {error}')
        return redirect('categorias')

    nombre_categoria = form.cleaned_data['nombre'].lower()

    if any(map(str.isdigit, nombre_categoria)):
        messages.error(request, 'Nombre inválido, no se permiten números')
        return redirect('categorias')

    if Categoria.objects.filter(nombre__iexact=nombre_categoria).exists():
        messages.error(request, 'No se puede agregar, categoría ya existente')
        return redirect('categorias')
    else:
        form.save()
        messages.success(request, 'Categoria agregada correctamnete')
        return redirect('categorias')


def actualizar_categoria(request):
    if not request.method == 'POST':
        messages.error(request, 'Método inválido')
        return redirect('categorias')

    form = ActualizarCategoriaForm(request.POST)

    if not form.is_valid():
        for field, errors in form.errors.items():
            for error in errors:
                messages.error(request, f'{field}: {error}')
        return redirect('categorias')

    id_categoria = form.cleaned_data['id']
    nombre_categoria = form.cleaned_data['nombre'].lower()

    if any(map(str.isdigit, nombre_categoria)):
        messages.error(request, 'Nombre inválido, no se permiten números')
        return redirect('categorias')

    try:
        Categoria.objects.get(id=id_categoria)
    except Categoria.DoesNotExist:
        messages.error(request, 'Error, no se encontró la categoría')
        return redirect('categorias')

    try:
        registro = Categoria.objects.get(id=id_categoria)
        registro.nombre = nombre_categoria
        registro.save()
        messages.success(request, 'Categoria actualizada correctamnete')
        return redirect('categorias')
    except:
        messages.error(request, 'Ha ocurrido un error inesperado')
        return redirect('categorias')


def eliminar_categoria(request):
    if request.method == 'POST':
        registro_id = request.POST.get('id')

        try:
            registro = Categoria.objects.get(id=registro_id)
            registro.delete()
            messages.success(request, 'Categoria eliminada correctamnete')
            return redirect('categorias')

        except:
            messages.error(request, 'Ha ocurrido un error inesperado')
            return redirect('categorias')

    return redirect('categorias')


def registro_usuario(request):
    if request.method == 'GET':
        return render(request, 'usuarios.html', {'form': RegistroForm})

    else:
        print(request.POST)
        form = RegistroForm(request.POST)
        if form.is_valid():
            cedula_usuario = form.cleaned_data['cedula']

            if Usuarios.objects.filter(cedula=cedula_usuario).exists():
                data = {'success': False, 'message': 'el usuario ya existe'}
                return JsonResponse(data, status=400)
            else:
                usuario = form.save()
                data = {'success': True,
                        'message': 'usuario agregado correctamente'}
                return JsonResponse(data)
        else:
            data = {'success': False, 'errors': form.errors}
            return JsonResponse(data, status=400)


def inventario(request):
    inventario_info = Inventario.objects.all()
    return render(request, 'inventario.html',
                  {'form_agregar': AgregarInventarioForm, 'form_actualizar': ActualizarInventarioForm,
                   'inventario': inventario_info})


def agregar_inventario(request):
    if not request.method == 'POST':
        messages.error(request, 'Método inválido')
        return redirect('inventario')

    form = AgregarInventarioForm(request.POST)

    if not form.is_valid():
        for field, errors in form.errors.items():
            for error in errors:
                messages.error(request, f'{field}: {error}')
        return redirect('inventario')

    nombre_inventario = form.cleaned_data['nombre'].lower()
    codigo_inventario = form.cleaned_data['codigo']   

    if nombre_inventario.isnumeric():
        messages.error(
            request, 'Nombre inválido, no se permiten solamente números')
        return redirect('inventario')

    if Inventario.objects.filter(nombre__iexact=nombre_inventario).exists():
        messages.error(request, 'No se puede agregar, elemento ya existente')
        return redirect('inventario')

    if Inventario.objects.filter(codigo=codigo_inventario).exists():
        messages.error(request, 'No se puede agregar, código ya existente')
        return redirect('inventario')

    form.save()
    messages.success(request, 'Elemento agregado correctamente')
    return redirect('inventario')


def actualizar_inventario(request):
    if not request.method == 'POST':
        messages.error(request, 'Método inválido')
        return redirect('inventario')
    
    form = ActualizarInventarioForm(request.POST)

    if not form.is_valid():
        for field, errors in form.errors.items():
            for error in errors:
                messages.error(request, f'{field}: {error}')
        return redirect('inventario')
    
    id_inventario = form.cleaned_data["id"]
    nombre_inventario = form.cleaned_data["nombre"].lower()
    codigo_inventario = form.cleaned_data["codigo"]
    categoria = form.cleaned_data["categoria"]

    if nombre_inventario.isnumeric():
        messages.error(
            request, 'Nombre inválido, no se permiten solamente números')
        return redirect('inventario')
    
    try:
        Inventario.objects.get(id=id_inventario)
    except:
        messages.error(request, 'Error, no se encontró el elemento')
        return redirect('inventario')

    try:
        registro = Inventario.objects.get(id=id_inventario)
        registro.nombre = nombre_inventario
        registro.codigo = codigo_inventario
        registro.categoria = categoria
        registro.save()
        messages.success(request, 'Elemento actualizado correctamnete')
        return redirect('inventario')
    except:
        messages.error(request, 'Ha ocurrido un error inesperado')
        return redirect('inventario')


def eliminar_inventario(request):
    if request.method == 'POST':
        registro_id = request.POST.get('id')

        try:
            registro = Inventario.objects.get(id=registro_id)
            registro.delete()
            messages.success(request, 'Elemento eliminado correctamnete')
            return redirect('inventario')

        except:
            messages.error(request, 'Ha ocurrido un error inesperado')
            return redirect('inventario')

    return redirect('inventario')
