## AmiGuas



### Descripción

La aplicación es una plataforma de chat y publicación de mensajes. Está construida con React y utiliza Firebase para la autenticación y la gestión de datos en tiempo real. Los usuarios pueden autenticarse, crear mensajes y participar en conversaciones privadas.

### Funcionalidades

#### 1. **Manejo de Autenticación**
   - Utiliza `onAuthStateChanged` de Firebase para mantener al tanto del estado de autenticación del usuario.
   - Redirige a la página de inicio de sesión si el usuario no está autenticado.

#### 2. **Páginas y Rutas**
   - Utiliza `react-router-dom` para la gestión de rutas y navegación entre páginas.
   - Contiene rutas para la página de inicio de sesión, la página principal y la página de inicio.
   - Implementa una ruta protegida para la página principal que redirige a la página de inicio de sesión si el usuario no está autenticado.

#### 3. **Selección de Usuario**
   - Importa y utiliza el componente `SelectUser` para permitir a los usuarios seleccionar con quién quieren chatear.
   - Mantiene el estado del usuario seleccionado a través de `useState`.

#### 4. **Chat**
   - Importa y utiliza el componente `Chat` para mostrar y gestionar las conversaciones.
   - Utiliza el estado para manejar el usuario seleccionado y pasar la información relevante al componente `Chat`.

#### 5. **Protección de Rutas**
   - Implementa un componente `ProtectedRoute` que redirige a la página de inicio de sesión si el usuario no está autenticado.
   - Utiliza este componente para proteger la ruta hacia la página principal.

#### 6. **Manejo de Estados**
   - Utiliza `useState` para gestionar los estados, como el usuario actual y el usuario seleccionado.

#### 7. **Uso de Contexto**
   - Utiliza el contexto de autenticación (`AuthContext`) para acceder al estado del usuario actual en diferentes partes de la aplicación.

#### 8. **Hooks de Ciclo de Vida**
   - Utiliza `useEffect` para suscribirse al cambio en el estado de autenticación y realizar tareas de limpieza cuando el componente se desmonta.

### Instalación y Ejecución

1. Clona el repositorio: `git clone https://github.com`
2. Entra al directorio: `cd`
3. Instala las dependencias: `npm install`
4. Inicia la aplicación: `npm start`

### Tecnologías Utilizadas

- React
- Firebase (Autenticación, Firestore)
- React Router
- Styled Components (para estilos)

### Contribución

¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes mejoras que sugerir, por favor, crea un _issue_ o envía un _pull request_.

### Licencia

Este proyecto está bajo la licencia [MIT]().