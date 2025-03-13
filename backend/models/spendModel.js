import connection from '../config/database';

export async function createSpend(amount, description) {
  try {
    const [result] = await connection.query(
      'INSERT INTO spends (amount, description) VALUES (?, ?)',
      [amount, description]
    );
    return result;
  } catch (error) {
    throw new Error('Error al crear el gasto: ' + error.message);
  }
}
