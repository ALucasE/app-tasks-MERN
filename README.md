# Task Manager App - MERN Stack

Este es el repositorio de la aplicación de gestión de tareas desarrollada utilizando la pila MERN (MongoDB, Express.js, React.js, Node.js). La aplicación se divide en dos carpetas: `cliente` para el frontend y `servidor` para el backend.

## Instalación

### Cliente (Frontend)

1. Navega a la carpeta del cliente:

```bash
cd cliente
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia la aplicación:

```bash
npm run dev
```

La aplicación estará disponible en con Vite

### Servidor (Backend)

1. Navega a la carpeta del servidor:

```bash
cd servidor
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor:

```bash
npm start
```

El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

## Configuración

### Cliente (Frontend)

En el archivo `cliente/src/api/axios.js`, puedes configurar la URL del servidor backend:

```javascript
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default instance;
```

Asegúrate de que la URL sea la correcta según la configuración de tu servidor.

### Servidor (Backend)

En el archivo `servidor/src/db.js`, puedes configurar la conexión a la base de datos MongoDB y otros ajustes:

```javascript
module.exports = {
  mongoURI: "mongodb://localhost:27017/taskmanager",
  // Otros ajustes...
};
```

Asegúrate de que la URI de MongoDB sea la correcta según tu configuración.

## Características

- **Gestión de Tareas:** Agregar, editar, eliminar y marcar como completadas las tareas.
- **Autenticación de Usuario:** Registro, inicio de sesión y cierre de sesión de usuarios.
- **Interfaz de Usuario Intuitiva:** Diseño limpio y fácil de usar.

## Tecnologías Utilizadas

- **MongoDB:** Base de datos NoSQL para almacenar datos.
- **Express.js:** Framework de backend para Node.js.
- **React.js:** Biblioteca de JavaScript para construir interfaces de usuario.
- **Node.js:** Entorno de ejecución para ejecutar el servidor backend.

## Contribuciones

¡Contribuciones son bienvenidas! Si encuentras errores o mejoras potenciales, por favor, abre un problema o envía una solicitud de extracción.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
