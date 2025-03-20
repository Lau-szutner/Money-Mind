import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import spendRoutes from './routes/spendRoutes.js';
import doLoginRoute from './routes/doLoginRoute.js';
import createUserRoute from './routes/createUserRoute.js';
import cors from 'cors'; // Importar el módulo CORS
// Cargar variables de entorno
import jwt from 'jsonwebtoken';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'http://localhost:3001', // Frontend
  methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
  allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
};

app.use(cors(corsOptions));
// Middleware para procesar JSON
app.use(express.json());

// Usar las rutas
app.use('/routes', userRoutes);
app.use('/routes', spendRoutes);
app.use('/routes', createUserRoute);
app.use('/routes', doLoginRoute);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
