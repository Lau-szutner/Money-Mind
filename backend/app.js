import express from 'express';
import connection from './db.js'; // Importamos la conexión de MySQL

const app = express();
const port = 3000;

// Ruta de prueba para ver si la conexión a MySQL funciona
app.get('/test', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      console.error('Error realizando la consulta:', err);
      return res.status(500).send('Error en la consulta');
    }
    res.send(`Resultado de la consulta: ${results[0].solution}`); // Debe devolver 2
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
