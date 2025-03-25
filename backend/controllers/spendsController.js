import jwt from 'jsonwebtoken';
import Spend from '../models/Spend.js'; // Asegúrate de tener el modelo Spend importado correctamente

const createSpendController = async (req, res) => {
  const { title, description, category, amount } = req.body;

  if (!title || !description || !category || !amount) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  // // Obtener el token desde el encabezado Authorization
  // const token = req.headers['authorization']?.split(' ')[1]; // El token debe ser enviado en el formato "Bearer <token>"

  // if (!token) {
  //   return res.status(403).json({ error: 'Token no proporcionado' });
  // }

  try {
    // Decodificar el token para obtener el id del usuario
    // const decodedToken = jwt.verify(token, 'your_secret_key'); // Usa la misma clave secreta que usaste para firmar el token

    // // Obtener el id del usuario desde el token decodificado
    // const userId = decodedToken.id;

    // Crear el gasto con Sequelize, asociando el gasto con el id del usuario
    const result = await Spend.create({
      title,
      description,
      category,
      amount,
    });

    res.status(201).json({ message: 'Gasto creado', spendId: result.id });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al crear gasto', message: error.message });
  }
};

export { createSpendController };
