import mysql from 'mysql2/promise'; // Usar mysql2/promise para trabajar con promesas
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear conexión usando las variables de entorno
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log('Conectado a MySQL');

export default connection;
