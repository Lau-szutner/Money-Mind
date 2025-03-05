import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost', // O el host donde está MySQL
  user: 'root', // Tu usuario de MySQL
  password: 'parkcity', // Tu contraseña
  database: 'moneymind',
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Exportar la conexión para poder usarla en otros archivos
export default connection;
