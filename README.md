# Money Mind API

Money Mind es una aplicación que gestiona usuarios y gastos, utilizando Next.js, Express y MySQL.

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

```
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=money_mind_db
```

4. Inicializa la base de datos con el script `money_mind_db.sql`.

5. Ejecuta el servidor:

```bash
npm start
```

El servidor correrá en `http://localhost:3000`.

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

```json
{
  "amount": 500,
  "description": "Compra de libros",
  "userId": 1
}
```

**Response:**

```json
{
  "message": "Gasto creado",
  "spendId": 1
}
```

## Base de Datos

La base de datos `money_mind_db` tiene dos tablas principales:

- **users**: Almacena información de los usuarios.
- **spends**: Registra los gastos de cada usuario.

## Licencia

Este proyecto está bajo la licencia MIT.

---

© 2025 Money Mind
