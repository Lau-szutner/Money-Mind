// config/database.js
import { Sequelize } from 'sequelize'; // Importa Sequelize
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crea una instancia de Sequelize para conectar con la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME || 'money_mind_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  },
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
    // 1. Desactivar revisiones de llaves foráneas
    // await sequelize.queryInterface.dropAllTables();
    // Opcionalmente: await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // 2. Sincronizar (esto creará las tablas de nuevo)
    await sequelize.sync({ force: false });

    // console.log('Tablas sincronizadas con éxito.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

// Llamamos a las funciones
verifyConnection(); // Verifica la conexión
syncDatabase(); // Sincroniza los modelos con la base de datos

// Exportamos la instancia de Sequelize para usarla en otras partes de la aplicación
export default sequelize;
