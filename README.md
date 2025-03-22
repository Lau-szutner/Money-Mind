# Money Mind API

Money Mind es una aplicación que gestiona usuarios y gastos, utilizando Next.js, Express y MySQL, el el backend esta echo con el patron MVC, usando mysql y express,

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Lau-szutner/Money-Mind.git
cd Money-Mind
```

2. Instala las dependencias:

```bash
npm run install-dependencies
```

3. Configura el archivo `.env`:

```
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=money_mind_db
```

4. Inicializa la base de datos con el script `money_mind_db.sql`.
   `USE money_mind_db;`
   `SOURCE /ruta/completa/a/money_mind_db.sql;`

5. Ejecuta el proyecto:

```bash
npm run dev
```

El servidor correrá en `http://localhost:4000`.

## Endpoints

### 1. Registro de Usuario

**POST** `/routes/register`

**Request Body:**

```json
{
  "name": "Juan Perez",
  "email": "juan@example.com"
}
```

**Response:**

```json
{
  "message": "Usuario registrado",
  "userId": 1
}
```

### 2. Creación de Gasto

**POST** `/routes/createSpend`

**Request Body:**

````json
{
  "title": "Nuevo gasto",
  "description": "Compra de libros",
  "category": "libros",
  "amount": "12312"
}



**Response:**

```json
{
  "message": "Gasto creado",
  "spendId": 1
}
````

## Base de Datos

La base de datos `money_mind_db` tiene dos tablas principales:

- **users**: Almacena información de los usuarios.
- **spends**: Registra los gastos de cada usuario.

---

© 2025 Money Mind
