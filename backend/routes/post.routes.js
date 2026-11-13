import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import {
  getAllPosts,
  getFeedPosts,
  getCommunityPosts,
  togglePostUpvote,
  getPostComments,
  createPostComment,
  getCommunityPostById,
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
router.get('/feed', authenticateToken, getFeedPosts);
router.get(
  '/community/:slug/post/:postId',
  authenticateToken,
  getCommunityPostById,
);

router.get('/community/:slug', authenticateToken, getCommunityPosts);
router.post('/:id/upvote', authenticateToken, togglePostUpvote);
router.get('/:id/comments', authenticateToken, getPostComments);
router.post('/:id/comments', authenticateToken, createPostComment);

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
