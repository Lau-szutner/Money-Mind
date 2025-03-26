import jwt from 'jsonwebtoken';
import Spend from '../models/Spend.js'; // Asegúrate de tener el modelo Spend importado correctamente

const createSpend = async (req, res) => {
  const { title, description, category, amount } = req.body;

  // Verificar si falta algún campo requerido
  if (!title || !description || !category || !amount) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const userId = req.userId; // Aquí accedes al ID del usuario que viene del token
  console.log(userId);

  try {
    // Crear el gasto asociándolo al usuario (usando el userId)
    const result = await Spend.create({
      title,
      description,
      category,
      amount,
      user_id: userId, // Usamos el userId aquí
    });

    res.status(201).json({ message: 'Gasto creado', spendId: result.id });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al crear gasto', message: error.message });
  }
};

const getSpends = async (req, res) => {
  try {
    const spends = await Spend.findAll();

    if (spends.length === 0) {
      return res.status(404).json({ error: 'No expenses found' });
    }

    res.status(200).json(spends);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching expenses' });
  }
};

const getSpend = async (req, res) => {
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

const deleteSpend = async (req, res) => {
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

const updateSpend = async (req, res) => {
  // Obtener el ID desde los parámetros de la URL
  const { id } = req.params;
  const { title, description, category, amount } = req.body;

  try {
    const spend = await Spend.findByPk(id);
    spend.title = title;
    spend.description = description;
    spend.category = category;
    spend.amount = amount;
    await spend.save();
    res.status(200).json(spend);
  } catch (error) {
    res.status(404).json({ error: message });
  }
};

export { createSpend, getSpends, deleteSpend, getSpend, updateSpend };
