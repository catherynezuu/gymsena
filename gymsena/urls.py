"""
URL configuration for gymsena project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from inventario import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('logout/', views.signout, name='logout'),
    path('signin/', views.signin, name='signin'),

    path('', views.home, name='home'),
    path('prestamo/', views.prestamo, name="prestamo"),
    path('devolucion/',views.devolucion, name='devolucion'),
    path('agregar_usuario/', views.agregar_usuario, name='agregar_usuario'),

    path('inventario/', views.inventario, name='inventario'),
    path('agregar_inventario', views.agregar_inventario, name='agregar_inventario'),
    path('actualizar_inventario', views.actualizar_inventario, name='actualizar_inventario'),
    path('eliminar_inventario', views.eliminar_inventario, name='eliminar_inventario'),

    path('categorias/', views.categorias, name='categorias'),
    path('agregar_categoria/', views.agregar_categoria, name='agregar_categoria'),
    path('eliminar_categoria/', views.eliminar_categoria, name='eliminar_categoria'),
    path('actualizar_categoria/', views.actualizar_categoria, name='actualizar_categoria'),

    path('historial/',views.historial, name='historial'),
]