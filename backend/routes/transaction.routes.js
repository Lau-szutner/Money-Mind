import express from 'express';
import {
  createTransaction,
  // getSpend,
  // deleteSpend,
  getTransactions,
  // updateSpend,
  // getSpendsByUser,
} from '../controllers/transactions.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

// Ruta pública: obtener todos los gastos
router.get('/', getTransactions);

// // Ruta pública: obtener un gasto específico (si no es sensible)
// router.get('/:id', getSpend);

// Ruta protegia: obtener todos los gastos por usuario
// router.get('/user/:id', getSpendsByUser);

// Ruta protegida: crear un gasto (requiere autenticación)
router.post('/', authenticateToken, createTransaction);

// // Ruta protegida: actualizar un gasto (requiere autenticación)
// router.put('/:id', authenticateToken, updateSpend);

// // Ruta protegida: eliminar un gasto (requiere autenticación)
// router.delete('/:id_spend', authenticateToken, deleteSpend);

export default router;
