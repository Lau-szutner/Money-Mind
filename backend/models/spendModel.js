import connection from '../config/database.js';

export async function createSpendModel(title, description, category, amount) {
  try {
    const [result] = await connection.query(
      'INSERT INTO spends (title, description, category, amount) VALUES (?, ?, ?, ?)',
      [title, description, category, amount]
    );
    return result;
  } catch (error) {
    throw new Error('Error al crear el gasto: ' + error.message);
  }
}
