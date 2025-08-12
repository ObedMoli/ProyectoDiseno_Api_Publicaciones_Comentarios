# API de Publicaciones y Comentarios – Blog Personal
# Integrantes

  - Obed Esau Molina Sandoval  20151023801	
  - Saubdy Lucia Ramirez Ochoa 20172400114
  - Jorge Luis Reyes Cruz      20182001662
## 📌 Descripción

Esta API RESTful permite gestionar publicaciones tipo blog y comentarios asociados. Está desarrollada con **Node.js** y **Express**, usa **MySQL** como base de datos y sigue el patrón **MVC**.  
Incluye autenticación JWT, control de permisos por autor, validaciones y protección contra XSS.

- Para que el archivo api_blog.http funcione, debes tener instalada la extension REST Client

---

## 🛠 Dependencias

- express
- mysql2
- jsonwebtoken
- bcrypt
- cors
- zod (validaciones)
- dotenv
- uuid
- sanitize-html

---

## 🚀 Instalación y Ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd ProyectoDiseno_Api_Publicaciones
```

### 2️⃣ Configurar variables de entorno

Copia el archivo .env.Examples y renómbralo como .env.

Edita el .env con los valores correctos para tu entorno.
Ejemplo:

```bash
BD_PORT= XXXX
DB_HOST=localhost
DB_PORT= XXXX
DB_NAME= nombre de tu BD
DB_USER= tu usuario
DB_PASSWORD= tu contraseña
JWT_SECRET=mi_clave_secreta
```

### 3️⃣ Levantar la base de datos con Docker

Asegúrate de tener Docker instalado en tu computadora.

```bash
cd bd_docker

docker-compose up -d
```

- Esto creará y levantará el contenedor MySQL con la base de datos inicial.

### 4️⃣ Instalar dependencias

```bash
npm install
```

### 5️⃣ Iniciar el servidor en modo desarrollo

```bash
npm run dev
```

---

## 📂 Estructura del Proyecto

```
ProyectoDiseno_Api_Publicaciones/
│
├── bd_docker/                                # Configuración de la base de datos en Docker
│ ├── docker-compose.yml                      # Definición de servicios Docker
│ └── init.sql                                # Script inicial de base de datos
│
├── config/                                   # Configuraciones de conexión y entorno
│ └── db.js                                   # Configuración de conexión a la base de datos
│
├── controllers/                              # Controladores de la API
│ ├── auth_controller.js                      # Lógica de autenticación
│ ├── comentarioController.js                 # Lógica para comentarios
│ └── publicacionController.js                # Lógica para publicaciones
│
├── middlewares/                              # Middlewares para validaciones y manejo de errores
│ ├── errorHandler.js                         # Manejo global de errores
│ ├── validarComentarios.js                   # Validación de datos de comentarios
│ └── verify_token.js                         # Middleware para verificar JWT
│
├── models/                                   # Modelos de datos
│ ├── comentarioModel.js                      # Modelo de comentarios
│ ├── publicacionModel.js                     # Modelo de publicaciones
│ └── user_model.js                           # Modelo de usuarios
│
├── routes/                                   # Definición de rutas de la API
│ ├── auth_routes.js                          # Rutas de autenticación
│ ├── comentarioRoutes.js                     # Rutas para comentarios
│ └── publicacionRoutes.js                    # Rutas para publicaciones
│
├── schemas/                                  # Esquemas y validaciones
│ ├── comentariValidacion.js                  # Validaciones para comentarios
│ ├── validators_user.js                      # Validaciones para usuarios
│ └── validatorsPublicacion.js                # Validaciones para publicaciones
│
├── utils/
| └── utils.js                                # Funciones auxiliares
│
├── .env                                      # Variables de entorno (archivo que creara a partir de .env.Examples)
├── .env.Examples                             # Ejemplo de variables de entorno
├── .gitattributes                            # Configuración de Git
├── .gitignore                                # Archivos y carpetas a ignorar en Git
├── api_blog.http                             # Archivo para probar endpoints HTTP
├── package.json                              # Dependencias y scripts del proyecto
├── package-lock.json                         # Bloqueo de versiones de dependencias
├── README.md                                 # Documentación del proyecto
└── server.js                                 # Punto de entrada de la aplicación
```

## 🔐 Autenticación

- **Método:** JWT (Bearer Token)
- **Obtención del token:** Iniciando sesión con `/api/auth/login`.
- **Envío del token:** En el encabezado de las solicitudes protegidas:

```http
Authorization: Bearer <tu_token>
```

---

## 👤 Endpoints de Autenticación

### 1️⃣ Registro de usuario

**POST** `/auth/register`  
**Descripción:** Crea un nuevo usuario con rol asignado.  
**Body:**

```json
{
  "name": "juanperez",
  "email": "juan@example.com",
  "password": "12345678",
  "telefono": "96657889",
  "about": "Amante de la tecnología",
  "role_name": "usuario"
}
```

**Respuestas:**

- `201 Created` → Usuario creado exitosamente.
- `400 Bad Request` → Datos inválidos o usuario existente.

---

### 2️⃣ Inicio de sesión

**POST** `/auth/login`  
**Descripción:** Autentica un usuario y devuelve un token JWT.  
**Body:**

```json
{
  "email": "juan@example.com",
  "password": "12345678"
}
```

**Respuesta exitosa:**

```json
{
  "status": 200,
  "success": true,
  "message": "Inicio de sesión exitoso",
  "data": {
    "token": "<token>"
  }
}
```

---

## 📝 Endpoints de Publicaciones

### 1️⃣ Listar publicaciones

**GET** `/publicaciones`  
**Parámetros opcionales (query):**

- `page` (número de página, por defecto 1)
- `pageSize` (cantidad por página, por defecto 10, máximo 50)
- `q` (búsqueda por palabra clave)
- `category` (nombre de la categoría)

**Ejemplo:**

```
GET /publicaciones?page=1&pageSize=5&category=Tecnologia
```

**Respuesta:**

```json
{
  "status": 200,
  "success": true,
  "message": "Lista de publicaciones",
  "data": {
    "items": [...],
    "page": 1,
    "pageSize": 5,
    "total": 15,
    "totalPages": 3
  }
}
```

---

### 2️⃣ Ver publicación por ID

**GET** `/publicaciones/:id`  
Incluye los comentarios asociados.

---

### 3️⃣ Crear publicación

**POST** `/publicaciones`  
**Protegido:** Sí (requiere token).  
**Body:**

```json
{
  "title": "Nuevo post",
  "content_line1": "Texto principal",
  "content_line2": "Texto adicional",
  "image": "https://via.placeholder.com/150",
  "category_title": "Educacion"
}
```

**Respuestas:**

- `201 Created` → Publicación creada.
- `400 Bad Request` → Datos inválidos.

---

### 4️⃣ Actualizar publicación

**PUT** `/publicaciones/:id`  
**Protegido:** Sí (solo el autor puede).

---

### 5️⃣ Eliminar publicación

**DELETE** `/publicaciones/:id`  
**Protegido:** Sí (solo el autor puede).

---

## 💬 Endpoints de Comentarios

### 1️⃣ Ver todos los comentarios

**GET** `/comentarios` (público)

---

### 2️⃣ Ver comentarios de una publicación

**GET** `/publicaciones/:id/comentarios` (público)

---

### 3️⃣ Publicar comentario

**POST** `/publicaciones/:id/comentarios`  
**Protegido:** Sí (requiere token).  
**Body:**

```json
{
  "content": "Este es un comentario"
}
```

---

## 📂 Modelos de Datos

### Usuario

```json
{
  "user_id": "uuid",
  "name": "string",
  "email": "string",
  "password_hash": "string",
  "telefono": "string",
  "about": "string",
  "created_at": "timestamp"
}
```

### Publicación

```json
{
  "post_id": "int",
  "title": "string",
  "content_line1": "string",
  "content_line2": "string",
  "image": "string",
  "category_title": "string",
  "autor": "string",
  "date": "timestamp"
}
```

### Comentario

```json
{
  "comment_id": "int",
  "comment_by_user_name": "string",
  "content": "string",
  "date": "timestamp",
  "post_post_id": "int"
}
```

---

## ⚠️ Códigos de Estado

- `200 OK` → Operación exitosa.
- `201 Created` → Recurso creado.
- `400 Bad Request` → Error de validación o parámetros inválidos.
- `401 Unauthorized` → Token no enviado o inválido.
- `403 Forbidden` → No tienes permisos.
- `404 Not Found` → Recurso no encontrado.
- `500 Internal Server Error` → Error del servidor.

---

---

## 🛡️ Protección contra XSS

La API implementa protección contra ataques **Cross-Site Scripting (XSS)** en los comentarios mediante:

- **Sanitización de entradas** usando funciones que reemplazan caracteres HTML peligrosos (`<`, `>`, `&`, comillas, etc.) por entidades seguras.
- Validación estricta de campos con la librería **zod**, evitando que se envíen datos vacíos o con formato incorrecto.
- Ejemplo: el contenido de un comentario `<script>alert("hack")</script>` se almacena como texto seguro:

```html
&lt;script&gt;alert("hack")&lt;/script&gt;
```

Esto garantiza que, aunque el texto sea mostrado en un navegador, no se ejecutará como código JavaScript.

---

_Autores: Lucia Ramirez, Obed Molina, Jorge Reyes (2025)_
