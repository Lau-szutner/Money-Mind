import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import postRoutes from './routes/post.routes.js'; // ✅ Nueva ruta importada
import courseRoutes from './routes/course.routes.js';
// import createUserRoute from './routes/createUserRoute.js';
import cors from 'cors'; // Importar el módulo CORS
// Cargar variables de entorno
import categoryRoutes from './routes/categories.routes.js';
import jwt from 'jsonwebtoken';
import YAML from 'yamljs';

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

app.use('/api-docs', swaggerUi.serve, (req, res) => {
  const swaggerDocument = YAML.load('./docs/swagger.yaml');
  swaggerUi.setup(swaggerDocument)(req, res);
});

app.use('/auth', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/posts', postRoutes);
app.use('/courses', courseRoutes);
app.use('/categories', categoryRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
