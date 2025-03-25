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

const getSpendController = async (req, res) => {
  // Obtener el ID desde los parámetros de la URL
  const { id } = req.params;

  // Validación básica
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    // Buscar el gasto por ID
    const spend = await Spend.findByPk(id);

    if (!spend) {
      return res.status(404).json({ error: 'Gasto no encontrado' });
    }

    // Enviar el gasto encontrado
    res.status(200).json(spend);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener el gasto',
      message: error.message,
    });
  }
};

const deleteSpendController = async (req, res) => {
  const { id_spend } = req.params; // Asegúrate de que el parámetro en la ruta sea 'id_spend'

  // Validación básica del ID
  if (!id_spend || isNaN(Number(id_spend))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    // Buscar el gasto por ID (opcional si solo quieres borrar)
    const spend = await Spend.findByPk(id_spend);

    if (!spend) {
      return res.status(404).json({ error: 'Gasto no encontrado' });
    }

    // Eliminar el gasto usando el campo correcto
    const result = await Spend.destroy({
      where: { id_spend }, // Aquí usas el campo correcto
    });

    // Confirmar la eliminación
    if (result === 1) {
      res.status(200).json({ message: 'Gasto eliminado correctamente' });
    } else {
      res.status(500).json({ error: 'No se pudo eliminar el gasto' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar el gasto',
      message: error.message,
    });
  }
};

export { createSpendController, getSpendController, deleteSpendController };
