import express from 'express';
import { getAllCategories } from '../controllers/categories.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

// Ruta protegida: crear un gasto (requiere autenticación)
router.get('/', getAllCategories);

export default router;
