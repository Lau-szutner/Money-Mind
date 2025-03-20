import jwt from 'jsonwebtoken';
import { createSpendModel } from '../models/spendModel.js';

const createSpend = async (req, res) => {
  const { amount, description } = req.body;

  if (!amount || !description) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  // Obtener el token desde el encabezado Authorization
  const token = req.headers['authorization']?.split(' ')[1]; // El token debe ser enviado en el formato "Bearer <token>"

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    // Decodificar el token para obtener el id del usuario
    const decodedToken = jwt.verify(token, 'your_secret_key'); // Usa la misma clave secreta que usaste para firmar el token

    // Obtener el id del usuario desde el token decodificado
    const userId = decodedToken.id;

    // Crear el gasto, asociando el gasto con el id del usuario
    const result = await createSpendModel(userId, amount, description);

    res.status(201).json({ message: 'Gasto creado', spendId: result.insertId });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al crear gasto', message: error.message });
  }
};

export { createSpend };
