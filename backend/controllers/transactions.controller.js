import jwt from 'jsonwebtoken';
import Transaction from '../models/Transaction.js'; // Cambio de Spend a Transaction
import { where } from 'sequelize';

const createTransaction = async (req, res) => {
  const { title, description, category, photo, date, type, amount } = req.body;

  if (!title || !description || !category || !date || !type || !amount) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const userId = req.userId;
  console.log(userId);

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

const getTransaction = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener la transacción',
      message: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    const result = await Transaction.destroy({
      where: { id },
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

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, amount } = req.body;

  try {
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }

    transaction.title = title;
    transaction.description = description;
    transaction.category = category;
    transaction.amount = amount;
    await transaction.save();

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar la transacción',
      message: error.message,
    });
  }
};

const getTransactionsByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const transactions = await Transaction.findAll({
      where: { user_id: id },
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

export {
  createTransaction,
  getTransactions,
  deleteTransaction,
  getTransaction,
  updateTransaction,
  getTransactionsByUser,
};
