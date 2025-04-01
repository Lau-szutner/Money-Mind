# Money Mind API

Money Mind es una aplicación para la gestión financiera que permite a los usuarios administrar sus ingresos, gastos, presupuestos, logros de ahorro (gastos estimados mensuales) y gastos compartidos con otros usuarios. Además, ofrece la posibilidad de gestionar un portafolio de acciones y CEDEARs.

El proyecto está desarrollado con Next.js para el frontend y Express.js con MySQL para el backend, siguiendo el patrón MVC para una arquitectura organizada y escalable.

---

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Lau-szutner/Money-Mind.git
cd Money-Mind
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura el archivo `.env`:

```env
PORT=4000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=money_mind_db
```

4. La base de datos se crea y sincroniza automáticamente usando Sequelize una vez que fuerces la sincronización. Solo debes asegurarte de que las credenciales en el archivo .env sean correctas.

La conexión y sincronización de la base de datos están configuradas en el archivo backend/config/database.js. Sequelize se encarga de crear las tablas automáticamente cuando el servidor se inicia. La sincronización se realiza con el siguiente fragmento de código en database.js:

```
// Sincronización de los modelos con la base de datos
const syncDatabase = async () => {
  try {
    // Sincroniza los modelos con la base de datos
    await sequelize.sync({ force: false }); // Cambia a `force: true` si quieres reiniciar la base de datos
    console.log('Base de datos sincronizada');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

```

5. Ejecuta el proyecto:

```bash
npm run dev
```

El servidor correrá en `http://localhost:4000`.
El frontend correrá en `http://localhost:3000`.

---

## Endpoints

### 1. Registro y autenticación

#### 1.1 Registro de Usuario

**POST** `http://localhost:4000/users/`

**Request Body:**

```json
{
  "name": "root",
  "email": "root@example.com",
  "password": "root"
}
```

**Response:**

```json
{
  "message": "Usuario registrado",
  "userId": 1
}
```

#### 1.2 Login de Usuario

**POST** `http://localhost:4000/login/`

**Request Body:**

```json
{
  "email": "root@example.com",
  "password": "root"
}
```

**Response:**

```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Gestión de Gastos

#### 2.1 Creación de Gasto

**POST** `http://localhost:4000/spends/`

**Request Body:**

```json
{
  "title": "Nuevo gasto",
  "description": "Compra de libros",
  "category": "Libros",
  "amount": 12312
}
```

**Response:**

```json
{
  "message": "Gasto creado",
  "spendId": 1
}
```

#### 2.2 Obtener Todos los Gastos

**GET** `http://localhost:4000/spends/`

**Response:**

```json
[
  {
    "id": 1,
    "title": "Compra de libros",
    "description": "Libros de programación",
    "category": "Libros",
    "amount": 12312
  }
]
```

#### 2.3 Obtener Gasto por ID

**GET** `http://localhost:4000/spends/:id`

**Response:**

```json
{
  "id": 1,
  "title": "Compra de libros",
  "description": "Libros de programación",
  "category": "Libros",
  "amount": 12312
}
```

#### 2.4 Obtener Gastos por Usuario

**GET** `http://localhost:4000/spends/user/:id`

**Response:**

```json
[
  {
    "id": 1,
    "title": "Cena con amigos",
    "description": "Restaurante italiano",
    "category": "Alimentos",
    "amount": 2000
  }
]
```

#### 2.5 Actualizar Gasto

**PUT** `http://localhost:4000/spends/:id`

**Request Body:**

```json
{
  "title": "Cena con amigos",
  "description": "Cena en restaurante",
  "category": "Comida",
  "amount": 2500
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Cena con amigos",
  "description": "Cena en restaurante",
  "category": "Comida",
  "amount": 2500
}
```

#### 2.6 Eliminar Gasto

**DELETE** `http://localhost:4000/spends/:id`

**Response:**

```json
{
  "message": "Gasto eliminado correctamente"
}
```

---

## Base de Datos

La base de datos `money_mind_db` tiene las siguientes tablas principales:

### **1. users**
Almacena información de los usuarios registrados.

- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `name` (VARCHAR)
- `email` (VARCHAR, UNIQUE)
- `password` (VARCHAR)

### **2. spends**
Registra los gastos de cada usuario.

- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `title` (VARCHAR)
- `description` (TEXT)
- `category` (VARCHAR)
- `amount` (DECIMAL)
- `user_id` (INT, FOREIGN KEY -> users.id)

---

## Autenticación con JWT

- Para acceder a los endpoints de gastos, el usuario debe estar autenticado.
- Debe enviarse un token JWT en el `Authorization Header`.
- Ejemplo de autenticación:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Contribución
Si deseas contribuir al proyecto, haz un fork del repositorio y envía un Pull Request con tus mejoras.

---

© 2025 Money Mind

