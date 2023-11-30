# Shortener

## Tabla de contenido
   * [Sobre el proyecto](#sobre-el-proyecto)
   * [Paso a pasao de creación del proyecto](#paso-a-pasao-de-creación-del-proyecto)
   * [Instalación](#instalación)
   * [Proximos pasos](#proximos-pasos)
   * [Como probar](#como-probar)

## Sobre el proyecto
Este proyecto es un acortador de enlaces, que permite a los usuarios crear enlaces cortos para compartirlos con otras personas. El proyecto ha sido desarrollado utilizando el framework NestJS, y se ha implementado un sistema de autenticación basado en JSON Web Tokens (JWT). El proyecto ha sido desplegado en un entorno de producción, y se ha implementado un sistema de cacheo utilizando Redis. El proyecto ha sido desarrollado como parte de una practica didáctica.

## Paso a pasao de creación del proyecto

- **Contabilizar las visitas a los enlaces**: Se ha implementado un sistema para contabilizar las visitas a los enlaces, para permitir a los usuarios obtener estadísticas sobre sus enlaces.

- **Publicación en producción**: El proyecto ha sido desplegado en un entorno de producción, como tambien las bases de datos SQL Lite + Redis.

- **Pruebas en producción**: Se han realizado pruebas exhaustivas en el entorno de producción para garantizar la funcionalidad y estabilidad del proyecto.

- **Personalización de slugs**: Se ha implementado la funcionalidad para personalizar slugs, permitiendo una mayor flexibilidad en la creación de URLs para los usuarios.

- **Creación de usuarios**: Se ha implementado un sistema para la creación de usuarios, permitiendo a los visitantes registrarse y tener su propio perfil.

- **Autenticación - JWT**: Se ha implementado la autenticación mediante JSON Web Tokens (JWT), proporcionando una forma segura de manejar la autenticación de usuarios.

- **Obtención de enlaces por parte de los usuarios**: Los usuarios registrados pueden obtener todos sus enlaces, permitiendo un fácil acceso y gestión de sus recursos.

- **Creación de un decorador personalizado para obtener el usuario**: Se ha creado un decorador personalizado para obtener el usuario actualmente autenticado, facilitando la gestión de usuarios en diferentes partes del código.

- **Implementación de cache Redis**: Se ha implementado un sistema de cacheo utilizando Redis, mejorando la eficiencia y velocidad de las operaciones de lectura.

- **Creación de enlaces temporales para usuarios no registrados**: Se ha implementado la funcionalidad para que los usuarios no registrados puedan crear enlaces temporales con una duración de 1 semana.

- **Creación de enlaces temporales con límite personalizado por parte de los usuarios**: Los usuarios pueden crear enlaces temporales con un límite de tiempo personalizado, proporcionando una mayor flexibilidad en la gestión de recursos.


## Instalación

1. Clonar el repositorio

   ```bash
    # Clonar el repositorio
    $ git clone git@github.com:rsbmk/shortener.git

    # Entrar en el directorio
    $ cd shortener
   
    # Instalar las dependencias
    $ npm install
    ```

2. Correr el servidor
   
   A. Usando Docker: Es la mejor forma puesto que te levantara los servicios necesarios como la base de datos en redis.
   ```bash
    # Correr el servidor
    $ docker-compose up
   ```
   El servidor estara corriendo en el **puerto 3000**.

   B. Sin usar Docker: Debes tener instalado redis en tu maquina.

   ```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev
   ```


## Proximos pasos
- [ ] Crear una UI para el proyecto

## Como probar
En el proyecto esta incluido el archivo `insomnia_endpoints.json` que contiene todos los endpoints para probar el proyecto.
Solo tienes que importar el archivo en el cliente de insomnia y probar los endpoints.