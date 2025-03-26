import express from 'express';
import {
  createSpend,
  getSpend,
  deleteSpend,
  getSpends,
  updateSpend,
} from '../controllers/spends.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

// Ruta pública: obtener todos los gastos
router.get('/', getSpends);

// Ruta pública: obtener un gasto específico (si no es sensible)
router.get('/:id', getSpend);

// Ruta protegida: crear un gasto (requiere autenticación)
router.post('/', authenticateToken, createSpend);

// Ruta protegida: actualizar un gasto (requiere autenticación)
router.put('/:id', authenticateToken, updateSpend);

// Ruta protegida: eliminar un gasto (requiere autenticación)
router.delete('/:id_spend', authenticateToken, deleteSpend);

export default router;
