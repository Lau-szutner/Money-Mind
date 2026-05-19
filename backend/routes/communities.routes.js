// routes/communities.routes.js
import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import {
  getAllCommunities,
  getCommunitiesByUser,
  createCommunity,
  getCommunityById,
  updateCommunity,
  deleteCommunity,
  joinCommunity,
  leaveCommunity,
  getCommunityMembers,
  getCommunityBySlug,
} from '../controllers/communities.controller.js';

const router = express.Router();

// Ruta pública: obtener todos los posts
router.get('/', getAllCommunities);

router.get('/byUser', authenticateToken, getCommunitiesByUser);

router.post('/', authenticateToken, createCommunity);

router.get('/bySlug/:slug', authenticateToken, getCommunityBySlug);

router.put('/:id', authenticateToken, updateCommunity);

router.delete('/:id', authenticateToken, deleteCommunity);

router.post('/:id/join', authenticateToken, joinCommunity);

router.delete('/:id/leave', authenticateToken, leaveCommunity);

router.get('/:id/members', authenticateToken, getCommunityMembers);

export default router;
