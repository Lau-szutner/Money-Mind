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

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', authenticateToken, createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
