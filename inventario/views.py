from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.db import IntegrityError
from django.utils import timezone
from .forms import *
from .models import *


# pagina principal y prestamos
@login_required
def home(request):
    transacciones_abiertas = Transacciones.objects.filter(fecha_devolucion=None)

    for transaccion in transacciones_abiertas:
        transaccion.retrasado = transaccion.fecha_estimada < timezone.localtime().date()

    cedulas = Usuarios.objects.all()
    return render(request, 'home.html', {'formPrestamos': PrestamosForm, 'formDevoluciones': DevolucionesForm, 'formRegistroUsuario': AgregarUsuarioForm, 'transacciones': transacciones_abiertas, 'cedulas': cedulas})

@login_required
def prestamo(request):
    if request.method != 'POST':
        messages.error(request, 'Método inválido')
        return redirect('home')

    form = PrestamosForm(request.POST)
    
    if not form.is_valid():
        for field, errors in form.errors.items():
            for error in errors:
                messages.error(request, f'{field}: {error}')
        return redirect('home')

    nombre_elemento = form.cleaned_data["nombre_elemento"]
    cedula_usuario = form.cleaned_data['cedula_usuario']
    cantidad_form = form.cleaned_data['cantidad']
    fecha_estimada = form.cleaned_data['fecha_estimada']

    try:
        objecto_inventario = Inventario.objects.get(nombre=nombre_elemento)
    except Inventario.DoesNotExist:
        messages.error(request, 'Elemento no encontrado en el inventario')
        return redirect('home')

    if cantidad_form > objecto_inventario.disponibles:
        messages.error(request, 'No hay suficientes elementos disponibles')
        return redirect('home')

    try:
        usuario = Usuarios.objects.get(cedula=cedula_usuario)
    except Usuarios.DoesNotExist:
        messages.error(request, 'Cédula de usuario no encontrada')
        return redirect('home')

    try:
        prestado = Transacciones.objects.get(
            id_inventario=objecto_inventario, id_usuario=usuario, fecha_devolucion=None)
        messages.error(request, f"No se puede prestar el elemento '{
                       objecto_inventario}' hasta que devuelva los prestados anteriormente")
        return redirect('home')
    except Transacciones.DoesNotExist:
        pass

    objeto_transaccion = Transacciones(
        id_inventario=objecto_inventario, id_usuario=usuario, cantidad=cantidad_form, fecha_estimada=fecha_estimada)

    try:
        objeto_transaccion.save()
        objecto_inventario.disponibles -= cantidad_form
        objecto_inventario.save()
        messages.success(request, "Elemento prestado correctamente")
    except Exception as e:
        messages.error(
            request, f'Ha ocurrido un error registrando la transacción: {str(e)}')

    return redirect('home')

@login_required
def devolucion(request):
    if request.method != 'POST':
        messages.error(request, 'Método inválido')
        return redirect('inventario')

    form = DevolucionesForm(request.POST)
    if not form.is_valid():
        for field, errors in form.errors.items():
            for error in errors:
                messages.error(request, f'{field}: {error}')
        return redirect('home')

    try:
        usuario = Usuarios.objects.get(
            cedula=form.cleaned_data['cedula_usuario'])
    except Usuarios.DoesNotExist:
        messages.error(request, 'Cédula de usuario no encontrada')
        return redirect('home')

    objeto_id = form.cleaned_data['codigo_inventario'].id

    try:
        transaccion = Transacciones.objects.get(
            fecha_devolucion=None, id_inventario=objeto_id, id_usuario=usuario)
    except Transacciones.DoesNotExist:
        messages.error(request, 'No hay préstamos abiertos de esta persona')
        return redirect('home')

    try:
        transaccion.fecha_devolucion = timezone.now()
        transaccion.observaciones = form.cleaned_data["observaciones"]
        transaccion.save()

        objecto_inventario = Inventario.objects.get(id=objeto_id)
        objecto_inventario.disponibles += transaccion.cantidad
        objecto_inventario.save()

        messages.success(request, 'Elemento devuelto correctamente')
    except Exception as e:
        messages.error(request, f'Ha ocurrido un error inesperado: {str(e)}')

    return redirect('home')


# cerrar sesion
def signout(request):
    logout(request)
    return redirect('signin')


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


# categorias
@login_required
def categorias(request):
    form_agregar = AgregarCategoriaForm()
    form_actualizar = ActualizarCategoriaForm()
    items = Categoria.objects.all()

    context = {
        'form_agregar': form_agregar,
        'form_actualizar': form_actualizar,
        'items': items
    }

    return render(request, 'categorias.html', context)

@login_required
def agregar_categoria(request):
    if request.method != 'POST':
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
    else:
        form.save()
        messages.success(request, 'Categoría agregada correctamente')
    return redirect('categorias')

@login_required
def actualizar_categoria(request):
    if request.method != 'POST':
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
    
    if Categoria.objects.exclude(id=id_categoria).filter(nombre=nombre_categoria).exists():
        messages.error(request, 'Error, nombre ya existente, intente con otro')
        return redirect('categorias')

    try:
        registro = Categoria.objects.get(id=id_categoria)
        registro.nombre = nombre_categoria
        registro.save()
        messages.success(request, 'Categoría actualizada correctamente')
    except Categoria.DoesNotExist:
        messages.error(request, 'Error, no se encontró la categoría')
    except:
        messages.error(request, 'Ha ocurrido un error inesperado')
    return redirect('categorias')

@login_required
def eliminar_categoria(request):
    if request.method == 'POST':
        registro_id = request.POST.get('id')
        try:
            registro = Categoria.objects.get(id=registro_id)
            registro.delete()
            messages.success(request, 'Categoría eliminada correctamente')
        except Categoria.DoesNotExist:
            messages.error(request, 'No se encontró la categoría')
        except IntegrityError:
            messages.error(
                request, 'No se puede eliminar la categoría, debido a que tiene elementos relacionados')
        except:
            messages.error(request, 'Ha ocurrido un error inesperado')
    return redirect('categorias')


# agregar usuario
@login_required
def agregar_usuario(request):
    if request.method != 'POST':
        messages.error(request, "Método inválido")
        return redirect('home')

    form = AgregarUsuarioForm(request.POST)
    if not form.is_valid():
        for field, errors in form.errors.items():
            for error in errors:
                messages.error(request, f'{field}: {error}')
        return redirect('home')

    cedula_usuario = form.cleaned_data['cedula']
    if Usuarios.objects.filter(cedula=cedula_usuario).exists():
        messages.error(request, "Cédula ya registrada")
        return redirect('home')

    nombre_usuario = form.cleaned_data['nombre'].lower()
    if nombre_usuario.isnumeric():
        messages.error(request, "No se permiten solo números en el nombre")
        return redirect('home')
    formacion_usuario = form.cleaned_data['formacion']
    if formacion_usuario.isnumeric():
        messages.error(request, "No se permiten solo números en la titularidad")
        return redirect('home')

    usuario = Usuarios(cedula=cedula_usuario, nombre=nombre_usuario, formacion=formacion_usuario)
    usuario.save()
    messages.success(request, 'Usuario registrado correctamente')
    return redirect('home')


# inventario
@login_required
def inventario(request):
    inventario_info = Inventario.objects.all()
    context = {
        'form_agregar': AgregarInventarioForm(),
        'form_actualizar': ActualizarInventarioForm(),
        'inventario': inventario_info
    }
    return render(request, 'inventario.html', context)

@login_required
def agregar_inventario(request):
    if request.method != 'POST':
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

    objeto_inventario = form.save(commit=False)
    objeto_inventario.nombre = nombre_inventario
    objeto_inventario.disponibles = objeto_inventario.stock
    objeto_inventario.save()

    messages.success(request, 'Elemento agregado correctamente')
    return redirect('inventario')

@login_required
def actualizar_inventario(request):
    if request.method != 'POST':
        messages.error(request, 'Método inválido')
        return redirect('inventario')

    form = ActualizarInventarioForm(request.POST)
    if not form.is_valid():
        for field, errors in form.errors.items():
            for error in errors:
                messages.error(request, f'{field}: {error}')
        return redirect('inventario')

    id_inventario = form.cleaned_data['id']
    nombre_inventario = form.cleaned_data['nombre'].lower()
    codigo_inventario = form.cleaned_data['codigo']
    stock = form.cleaned_data['stock']

    if nombre_inventario.isnumeric():
        messages.error(
            request, 'Nombre inválido, no se permiten solamente números')
        return redirect('inventario')

    try:
        elemento = Inventario.objects.get(id=id_inventario)
    except Inventario.DoesNotExist:
        messages.error(request, 'Error, no se encontró el elemento')
        return redirect('inventario')

    if Inventario.objects.exclude(id=id_inventario).filter(codigo=codigo_inventario).exists():
        messages.error(request, 'Error, código ya existente, intente con otro')
        return redirect('inventario')

    if Inventario.objects.exclude(id=id_inventario).filter(nombre__iexact=nombre_inventario).exists():
        messages.error(request, 'Error, nombre ya existente, intente con otro')
        return redirect('inventario')

    prestados = elemento.stock - elemento.disponibles
    if stock < prestados:
        messages.error(
            request, 'Error, el nuevo stock no puede ser menor a la cantidad prestada')
        return redirect('inventario')

    elemento.nombre = nombre_inventario
    elemento.codigo = codigo_inventario
    elemento.stock = stock
    elemento.disponibles = stock - prestados
    elemento.save()

    messages.success(request, 'Elemento actualizado correctamente')
    return redirect('inventario')

@login_required
def eliminar_inventario(request):
    if request.method == 'POST':
        registro_id = request.POST.get('id')
        try:
            registro = Inventario.objects.get(id=registro_id)
            registro.delete()
            messages.success(request, 'Elemento eliminado correctamente')
        except Inventario.DoesNotExist:
            messages.error(request, 'No se encontró el elemento')
        except:
            messages.error(request, 'Ha ocurrido un error inesperado')
    return redirect('inventario')

@login_required
def historial(request):
    transacciones_info = Transacciones.objects.all()
    return render(request, 'historial.html', {'transacciones': transacciones_info})
