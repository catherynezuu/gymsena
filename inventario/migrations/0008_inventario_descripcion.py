# Generated by Django 5.0.2 on 2024-02-26 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventario', '0007_inventario_disponibles_transacciones_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventario',
            name='descripcion',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
