import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import doLoginRoute from './routes/doLogin.routes.js';
// import createUserRoute from './routes/createUserRoute.js';
import cors from 'cors'; // Importar el módulo CORS
// Cargar variables de entorno
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'http://localhost:3000', // Frontend
  methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
  allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
};

app.use(cors(corsOptions));
// Middleware para procesar JSON
app.use(express.json());

// Usar las rutas con prefijos más específicos
app.use('/users', userRoutes); // Rutas para los usuarios
app.use('/transactions', transactionRoutes); // Rutas para gastos
app.use('/login', doLoginRoute); // Rutas para login
// // app.use('/create-user', createUserRoute); // Ruta para crear usuario

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
