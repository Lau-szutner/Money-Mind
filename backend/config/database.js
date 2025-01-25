const mongoose = require('mongoose');

// Reemplaza con tu cadena de conexión
const connectionString = 'mongodb://localhost:27017/cash-flow';

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conectado a la base de datos MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
