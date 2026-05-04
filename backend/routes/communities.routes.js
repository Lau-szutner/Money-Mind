// routes/courses.routes.js
import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import {
  getAllCommunities,
  getCommunitiesByUser,
} from '../controllers/communities.controller.js';

const router = express.Router();

// Ruta pública: obtener todos los posts
router.get('/', getAllCommunities);

router.get('/byUser', authenticateToken, getCommunitiesByUser);

export default router;
