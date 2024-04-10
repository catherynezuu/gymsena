# Generated by Django 5.0.2 on 2024-04-10 17:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('inventario', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cedula', models.IntegerField()),
                ('nombre', models.CharField(max_length=100)),
                ('formacion', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Inventario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.BigIntegerField()),
                ('nombre', models.CharField(max_length=100)),
                ('stock', models.IntegerField()),
                ('disponibles', models.BigIntegerField()),
                ('descripcion', models.CharField(blank=True, max_length=200, null=True)),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='inventario.categoria')),
            ],
        ),
        migrations.CreateModel(
            name='Transacciones',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_prestamo', models.DateTimeField(auto_now_add=True)),
                ('fecha_devolucion', models.DateTimeField(blank=True, null=True)),
                ('observaciones', models.CharField(blank=True, max_length=200, null=True)),
                ('cantidad', models.IntegerField()),
                ('id_inventario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventario.inventario')),
                ('id_usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventario.usuarios')),
            ],
        ),
    ]