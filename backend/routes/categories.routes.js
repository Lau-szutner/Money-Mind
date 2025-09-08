import express from 'express';
import { getAllCategories } from '../controllers/categories.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

// Get all categories Route
router.get('/', authenticateToken, getAllCategories);

export default router;
