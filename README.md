# Gestor de Tareas

Una aplicación simple de gestión de tareas con operaciones CRUD, desarrollada con React para el frontend y Node.js/Express para el backend, utilizando Supabase como servicio de base de datos.

## Requisitos previos

- Node.js (versión 14 o superior)
- NPM (viene con Node.js)
- Una cuenta en [Supabase](https://supabase.io/)

## Configuración de Supabase

1. Crea una cuenta en [Supabase](https://supabase.io/) si aún no tienes una.
2. Crea un nuevo proyecto en Supabase.
3. En el panel de control de tu proyecto, crea una nueva tabla llamada `tasks` con los siguientes campos:
   - `id`: integer (primary key, auto-increment)
   - `title`: text (not null)
   - `status`: text (default: 'pending')
4. Ve a la sección "Settings" > "API" y copia la URL y la API Key (anon, public).

## Configuración del proyecto

### Backend

1. Navega a la carpeta del backend:
   ```
   cd backend
   ```

2. Edita el archivo `.env` y reemplaza los valores de `SUPABASE_URL` y `SUPABASE_KEY` con los que copiaste de Supabase:
   ```
   SUPABASE_URL=tu_supabase_url
   SUPABASE_KEY=tu_supabase_api_key
   PORT=5000
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

4. Inicia el servidor en modo desarrollo:
   ```
   npm run dev
   ```
   El servidor estará disponible en `http://localhost:5000`.

### Frontend

1. Abre una nueva terminal y navega a la carpeta del frontend:
   ```
   cd frontend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Inicia la aplicación React:
   ```
   npm start
   ```
   La aplicación estará disponible en `http://localhost:3000`.

## Uso de la aplicación

- **Ver tareas**: Las tareas se muestran en la página principal.
- **Crear tarea**: Haz clic en "Crear Nueva Tarea", completa el formulario y haz clic en "Crear".
- **Editar tarea**: Haz clic en el botón "Editar" de una tarea, modifica los campos y haz clic en "Actualizar".
- **Eliminar tarea**: Haz clic en el botón "Eliminar" de una tarea y confirma la eliminación.
- **Cambiar estado**: Haz clic en el checkbox junto a una tarea para cambiar su estado entre "Pendiente" y "Completada".

## Estructura del proyecto

### Backend

- `index.js`: Punto de entrada de la aplicación Express.
- `config/supabase.js`: Configuración de la conexión a Supabase.
- `routes/tasks.js`: Definición de las rutas para las operaciones CRUD de tareas.

### Frontend

- `src/components/`: Componentes React (TaskForm, TaskItem, TaskList).
- `src/services/`: Servicios para interactuar con la API del backend.
- `src/types/`: Definiciones de tipos TypeScript.
- `src/App.tsx`: Componente principal que integra todos los demás componentes.
- `src/App.css`: Estilos CSS para la aplicación.