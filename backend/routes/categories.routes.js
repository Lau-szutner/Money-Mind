import express from 'express';
import {
  getAllCategories,
  createCategory,
} from '../controllers/categories.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

// Get all categories Route
router.get('/', authenticateToken, getAllCategories);

router.post('/create-category', authenticateToken, createCategory);

export default router;
