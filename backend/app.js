import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import postRoutes from './routes/post.routes.js';
import courseRoutes from './routes/course.routes.js';
import communityRoutes from './routes/communities.routes.js';
import cors from 'cors';
import categoryRoutes from './routes/categories.routes.js';
import jwt from 'jsonwebtoken';
import YAML from 'yamljs';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:3000', process.env.FRONTEND_URL];

const corsOptions = {
  origin: (origin, callback) => {
    // Permite peticiones sin 'origin' (como llamadas desde Postman, Thunder Client o servidor a servidor)
    // o peticiones que provengan de la lista de orígenes permitidos.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Acceso no permitido por la política de CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Importante si manejas cookies o tokens de autenticación
};

app.use(cors(corsOptions));
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
app.use('/communities', communityRoutes);

const startServer = (port) => {
  const server = app.listen(port, () => {
    // Detectamos si estamos en desarrollo o en producción
    const isProduction = process.env.NODE_ENV === 'production';

    // Definimos la URL base según el entorno
    const baseUrl = isProduction
      ? process.env.RENDER_EXTERNAL_URL || `Puerto ${port}`
      : `http://localhost:${port}`;

    console.log(
      `Server running [${isProduction ? 'PRODUCTION' : 'DEVELOPING'}]: ${baseUrl}`,
    );
    console.log(`Documentation: ${baseUrl}/api-docs/`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Puerto ${port} en uso, intentando puerto ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Error al iniciar el servidor:', err);
    }
  });
};

startServer(port);
