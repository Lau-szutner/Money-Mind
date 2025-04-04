import express from 'express';
import {
  createTransaction,
  getTransactions,
  getTransactionsByUser,
  getTransactionById,
  deleteTransactionById,
  updateTransactionById,
  getTransactionsByMonth,
} from '../controllers/transactions.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

// Ruta protegida: crear un gasto (requiere autenticación)
router.post('/', authenticateToken, createTransaction);

// Ruta pública: obtener todos los gastos
router.get('/', getTransactions);

// Ruta protegia: obtener todos los gastos por usuario
router.get('/complete/', authenticateToken, getTransactionsByUser);

// Ruta privada: obtener un gasto específico por usuario
router.get('/:id', authenticateToken, getTransactionById);

// Ruta protegida: eliminar un gasto (requiere autenticación)
router.delete('/:id', authenticateToken, deleteTransactionById);

// Ruta protegida: actualizar un gasto (requiere autenticación)
router.put('/:id', authenticateToken, updateTransactionById);

//Ruta protegida: obtener todos los gastos en un periodo de tiempo
router.get('/filter/by-month', authenticateToken, getTransactionsByMonth);

export default router;
