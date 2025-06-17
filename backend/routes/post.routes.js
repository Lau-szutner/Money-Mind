// routes/postRoutes.js
import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller.js';

const router = express.Router();

// Ruta pública: obtener todos los posts
router.get('/', getAllPosts);

// Ruta pública: obtener un post por ID
router.get('/:id', getPostById);

// Ruta protegida: crear un post (requiere autenticación)
router.post('/', authenticateToken, createPost);

// Ruta protegida: actualizar un post por ID (requiere autenticación)
router.put('/:id', authenticateToken, updatePost);

// Ruta protegida: eliminar un post por ID (requiere autenticación)
router.delete('/:id', authenticateToken, deletePost);

export default router;
