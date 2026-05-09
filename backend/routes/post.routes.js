import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import {
  getAllPosts,
  getFeedPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller.js';

const router = express.Router();

/**
 * RUTAS DE OBTENCIÓN (GET)
 */

// 1. Obtener todos los posts (Global/All)
router.get('/', getAllPosts);

// 2. Obtener el feed personalizado (Posts de comunidades seguidas)
// IMPORTANTE: Debe ir antes que /:slug para que no confunda "feed" con un slug
router.get('/feed', authenticateToken, getFeedPosts);

// 3. Obtener un post específico por su Slug (estilo Reddit)
router.get('/:slug', getPostBySlug);

/**
 * RUTAS DE ACCIÓN (POST, PUT, DELETE)
 */

// 4. Crear un nuevo post (Protegida)
router.post('/', authenticateToken, createPost);

// 5. Actualizar un post por ID (Protegida)
router.put('/:id', authenticateToken, updatePost);

// 6. Eliminar un post por ID (Protegida)
router.delete('/:id', authenticateToken, deletePost);

export default router;
