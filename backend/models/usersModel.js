import connection from '../config/database.js';
// Importa la conexión a la base de datos desde el archivo de configuración.

const createUser = (name, email, password, callback) => {
  // Define una función para insertar un usuario en la base de datos.

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  // Consulta SQL con placeholders (?) para prevenir inyecciones SQL.

  connection.query(sql, [name, email, password], callback);
  // Ejecuta la consulta SQL pasando los valores en un array y un callback para manejar el resultado.
};
export { createUser };
