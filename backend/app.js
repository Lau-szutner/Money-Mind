import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import spendRoutes from './routes/spend.routes.js';
import doLoginRoute from './routes/doLoginRoute.js';
// import createUserRoute from './routes/createUserRoute.js';
import cors from 'cors'; // Importar el módulo CORS
// Cargar variables de entorno
import jwt from 'jsonwebtoken';
import Spend from './models/Spend.js';
import User from './models/User.js';
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
app.use('/spends', spendRoutes); // Rutas para gastos
app.use('/auth', doLoginRoute); // Rutas para login
// app.use('/create-user', createUserRoute); // Ruta para crear usuario

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
