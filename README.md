# Instalación del Proyecto Django en Windows

Este documento describe los pasos para instalar y configurar un proyecto de Django en un entorno Windows.

## Paso 1: Clonar el Repositorio

Clona el repositorio del proyecto desde GitHub:

`git clone https://github.com/catherynezuu/gymsena.git`

## Paso 2: Crear un Entorno Virtual

Dentro de la raíz del proyecto, crea un entorno virtual utilizando venv. Abre la línea de comandos y ejecuta:

`python -m venv venv`

## Paso 3: Activar el Entorno Virtual

Activa el entorno virtual recién creado. Desde la línea de comandos, ejecuta:

`venv\Scripts\activate`

## Paso 4: Instalar Dependencias

Instala las dependencias del proyecto que se encuentran en el archivo requirements.txt. Asegúrate de estar dentro del entorno virtual y en la raíz del proyecto, luego ejecuta:

`pip install -r requirements.txt`

## Paso 5: Realizar Migraciones

Aplica las migraciones del proyecto. Desde la línea de comandos y dentro del entorno virtual, ejecuta:

`python manage.py migrate`

