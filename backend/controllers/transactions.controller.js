import jwt from 'jsonwebtoken';
import Transaction from '../models/Transaction.js'; // Cambio de Spend a Transaction
import { where } from 'sequelize';
import { Op } from 'sequelize';

const createTransaction = async (req, res) => {
  const { title, description, category, photo, date, type, amount } = req.body;

  if (!title || !description || !category || !date || !type || !amount) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const userId = req.userId;

  try {
    const result = await Transaction.create({
      fk_user_id: userId,
      title,
      description,
      category,
      photo,
      date,
      type,
      amount,
    });

    res
      .status(201)
      .json({ message: 'Transacción creada', transactionId: result.id });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al crear transacción', message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();

    if (transactions.length === 0) {
      return res.status(404).json({ error: 'No se encontraron transacciones' });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener transacciones' });
  }
};

const getTransactionsByUser = async (req, res) => {
  const userId = req.userId;

  try {
    const transactions = await Transaction.findAll({
      where: { fk_user_id: userId },
    });

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ error: 'No se encontraron transacciones para este usuario' });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las transacciones' });
  }
};

const getTransactionById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    // Busca la transacción por su id y también verifica que sea del usuario autenticado
    const transaction = await Transaction.findOne({
      where: {
        id, // ID de la transacción
        fk_user_id: userId, // Asegura que la transacción pertenece al usuario
      },
    });

    // Si no se encuentra la transacción, se devuelve un error 404
    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    // Si la transacción pertenece al usuario, devuelve los datos
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener la transacción',
      message: error.message,
    });
  }
};

const deleteTransactionById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId; // id del usuario autenticado (debe estar en req.user después de la autenticación)

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    const result = await Transaction.destroy({
      where: {
        id,
        fk_user_id: userId,
      },
    });

    if (result === 1) {
      res.status(200).json({ message: 'Transacción eliminada correctamente' });
    } else {
      res.status(500).json({ error: 'No se pudo eliminar la transacción' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar la transacción',
      message: error.message,
    });
  }
};

const updateTransactionById = async (req, res) => {
  const { id } = req.params; // id del gasto por parámetro
  const { title, description, category, photo, date, type, amount } = req.body; // Datos del gasto a actualizar
  const userId = req.userId; // id del usuario autenticado (debe estar en req.user después de la autenticación)

  try {
    // Busca la transacción por su id y también verifica que sea del usuario autenticado
    const transaction = await Transaction.findOne({
      where: {
        id, // ID de la transacción
        fk_user_id: userId, // Verifica que la transacción pertenece al usuario autenticado
      },
    });

    // Si no se encuentra la transacción o no pertenece al usuario, devuelve un error 404
    if (!transaction) {
      return res.status(404).json({
        error: 'Transacción no encontrada o no pertenece a este usuario',
      });
    }

    // Actualiza los campos de la transacción
    transaction.title = title;
    transaction.description = description;
    transaction.category = category;
    transaction.amount = amount;
    transaction.photo = photo;
    transaction.date = date;
    transaction.type = type;

    // Guarda los cambios en la base de datos
    await transaction.save();

    // Responde con la transacción actualizada
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar la transacción',
      message: error.message,
    });
  }
};

const getTransactionsByMonth = async (req, res) => {
  const userId = req.userId;
  const { year, month } = req.query; // Cambiado de req.body a req.query

  try {
    if (!year || !month) {
      return res.status(400).json({
        message:
          'Debe especificar año y mes en los parámetros de consulta (year, month).',
      });
    }

    // Asegurar que el mes tenga 2 dígitos
    const monthPadded = String(month).padStart(2, '0');

    // Fecha de inicio: primer día del mes
    const startDate = new Date(`${year}-${monthPadded}-01T00:00:00`);

    // Fecha de fin: primer día del mes siguiente menos 1 segundo
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(1);
    endDate.setSeconds(-1); // Esto lo convierte en "último segundo del mes anterior"

    const formattedStart = startDate
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const formattedEnd = endDate.toISOString().slice(0, 19).replace('T', ' ');

    console.log('🔍 Consulta de transacciones mensuales:');
    console.log({
      userId,
      startDate: formattedStart,
      endDate: formattedEnd,
    });

    const gastos = await Transaction.findAll({
      where: {
        fk_user_id: userId,
        date: {
          [Op.between]: [formattedStart, formattedEnd],
        },
      },
    });

    res.status(200).json(gastos);
  } catch (error) {
    console.error('❌ Error al obtener transacciones por mes:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export {
  createTransaction,
  getTransactions,
  getTransactionsByUser,
  getTransactionById,
  deleteTransactionById,
  updateTransactionById,
  getTransactionsByMonth,
};
