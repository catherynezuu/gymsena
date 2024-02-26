from django.contrib import admin
from inventario.models import *

# Register your models here.

admin.site.register(Categoria)
admin.site.register(Inventario)
admin.site.register(Usuarios)
admin.site.register(Transacciones)