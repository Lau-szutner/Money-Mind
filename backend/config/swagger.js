import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Backend',
      version: '1.0.0',
      description: 'Documentación de tu backend',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./routes/*.js'], // 🔥 coincide con tu estructura actual
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
