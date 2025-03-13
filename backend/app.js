import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());

// Usar las rutas
app.use('/routes', userRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
