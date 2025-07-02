// config/database.js
import { Sequelize } from 'sequelize'; // Importa Sequelize
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crea una instancia de Sequelize para conectar con la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME, // El nombre de la base de datos
  process.env.DB_USER, // El usuario de la base de datos
  process.env.DB_PASSWORD, // La contraseña del usuario
  {
    host: process.env.DB_HOST, // La dirección del servidor (por defecto localhost)
    dialect: 'mysql', // Usamos MySQL como base de datos
    logging: false, // Desactiva los logs de SQL para no verlos en la consola
  }
);

// Verificación de la conexión
const verifyConnection = async () => {
  try {
    // Usamos `sequelize.authenticate()` para probar si la conexión es exitosa
    await sequelize.authenticate();
    console.log('Conexión a MySQL con Sequelize exitosa');
  } catch (error) {
    // Si no se puede conectar, capturamos el error
    console.error('Error de conexión:', error);
  }
};

// Sincronización de los modelos con la base de datovs
const syncDatabase = async () => {
  try {
    // Sincroniza los modelos con la base de datos
    await sequelize.sync({ alter: false }); // Cambia a `force: true` si quieres reiniciar la base de datos
    console.log('Base de datos sincronizada');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

// Llamamos a las funciones
verifyConnection(); // Verifica la conexión
syncDatabase(); // Sincroniza los modelos con la base de datos

// Exportamos la instancia de Sequelize para usarla en otras partes de la aplicación
export default sequelize;
