# Instrucciones para iniciar la aplicación localmente

Estas instrucciones te permitirán ejecutar la aplicación de gestión de tareas localmente sin necesidad de configurar Supabase.

## Requisitos previos

- Node.js instalado (versión 14 o superior)
- npm o yarn

## Pasos para iniciar la aplicación

### 1. Iniciar el backend

Abre una terminal en el directorio del proyecto y ejecuta:

```bash
cd backend
npm install
npm run dev
```

El servidor backend se iniciará en http://localhost:5000

### 2. Iniciar el frontend

Abre otra terminal en el directorio del proyecto y ejecuta:

```bash
cd frontend
npm install
npm start
```

La aplicación frontend se iniciará en http://localhost:3000

## Notas importantes

- Esta configuración utiliza un array en memoria para almacenar las tareas, por lo que los datos se perderán al reiniciar el servidor.
- Se han incluido dos tareas de ejemplo para que puedas probar la aplicación inmediatamente.
- Todas las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) funcionan correctamente con esta configuración temporal.

## Volver a la configuración con Supabase

Cuando estés listo para usar Supabase, sigue las instrucciones en el archivo README.md principal para configurar las variables de entorno y restaurar la funcionalidad completa de la aplicación.