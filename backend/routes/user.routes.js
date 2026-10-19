import express from 'express';
import {
  createUser,
  getUser,
  getCurrentUser,
  getUsers,
  doLogin,
} from '../controllers/users.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/me', authenticateToken, getCurrentUser);
router.get('/:id', getUser);
router.post('/', createUser);
router.post('/login', doLogin);

export default router;
