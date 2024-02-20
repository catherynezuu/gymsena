from django.shortcuts import render, redirect,get_object_or_404
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django. contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.forms import modelformset_factory
from django.db import IntegrityError
from .forms import *
from .models import *
from django.http import JsonResponse


# Create your views here.
def home(request):
    if request.method == 'POST':
        """ try:
            usuario=Usuario.objects.get(cedula=request.POST['cedula_usuario'])
        except:
            error="usuario no encontrado"
            return render(request,'home.html',{'form': PrestamosForm, 'error':error})

        try:
            codigo_inventario = Inventario.objects.get(codigo=request.POST["codigo_inventario"])
        except:
            error = "Objeto no encontrado en el inventario"
            return render(request,'home.html',{'form': PrestamosForm, 'error':error}) """
        
    inventario_info = Inventario.objects.all(); 

    return render(request,'home.html',{'formPrestamos': PrestamosForm, 'formDevoluciones': DevolucionesForm, 'formRegistroUsuario': RegistroForm, 'inventario': inventario_info})

def signup(request):

    if request.method == 'GET':
        return render(request,'signup.html',{'form': UserCreationForm
    })
    else:
        if request.POST['password1']== request.POST['password2']:
            try:
                user = User.objects.create_user(username=request.POST['username'],password=request.POST['password1'])
                user.save()
                login(request, user)
                return redirect('tasks')
            except IntegrityError:
                return render (request,'signup.html',{
                    'form': UserCreationForm,"error": 'el usuario ya existe'
                })
         
          #register user  
            
    return render(request,'signup.html',{'form': UserCreationForm, "error": 'contraseña incorrecta'
    })

""" def task(request):
    
    if request.method == 'GET':
        Task=tasks.objects.filter(User=request.user)     
        return render(request,'tasks.html', {
            'tasks':Task, 'form':TaskForm
        })

def create_task(request):

    if request.method =='GET':
        return render(request,'create_tasks.html',{
           'form':TaskForm
    })
    else:
        form=TaskForm(request.POST)
        N_tarea=form.save(commit=False)
        N_tarea.user= request.user
        N_tarea.save()
        print(N_tarea)
        return redirect('home') """
    
# cerrar sesion     

def signout(request):
    logout(request)
    return redirect('')

# iniciar sesion

def signin(request):
    if request.method == 'GET':
        return render(request,'signin.html', {'form':AuthenticationForm})
    else:
        user= authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user is None:
            return render(request,'signin.html', {'form':AuthenticationForm,'error':'usuario o contraseña incorrectos'})
        
        else:
            login(request, user)
            return redirect('home')
        
#registrar inventario
        
def inventario(request):
    if request.method =='POST':
        form = reg_inventarioForm(request.POST)
        form.save()
        return render(request, 'inventario.html', {'formreg_inventario': reg_inventarioForm })

    return render(request, 'inventario.html', {'formreg_inventario': reg_inventarioForm })

def categorias(request):
    form = CategoriaForm()
    list_items = Categoria.objects.all()

    return render(request, 'categorias.html', {'form': form, 'items': list_items})

def add_categoria(request):
    if request.method == 'POST':
        form = CategoriaForm(request.POST)
        if form.is_valid():
            nombre_categoria = form.cleaned_data['nombre']
            
            if Categoria.objects.filter(nombre__iexact=nombre_categoria).exists():
                data = {'success': False, 'message': 'La categoría ya existe'}
                return JsonResponse(data, status=400)
            else:
                categoria = form.save()
                data = {'success': True, 'message': 'Categoría agregada correctamente'}
                return JsonResponse(data)
        else:
            data = {'success': False, 'errors': form.errors}
            return JsonResponse(data, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
        
def registro(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')  # Redirige al usuario a la página de inicio de sesión
    else:
        form = UserCreationForm()
    return render(request, 'registro/home.html', {'form': form})

def registro(request):
    if request.method == 'POST':
        print(request.POST)
        form = RegistroForm(request.POST)
        
        
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)


def registro_usuario(request):
    if request.method == 'GET':
        return render(request, 'usuarios.html', {'form': RegistroUsuarioForm})
    
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
                data = {'success': True, 'message': 'usuario agregado correctamente'}
                return JsonResponse(data)
        else:
            data = {'success': False, 'errors': form.errors}
            return JsonResponse(data, status=400)


        
        
    

