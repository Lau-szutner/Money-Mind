import express from 'express';

const app = express();
const port = 3000;
// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
