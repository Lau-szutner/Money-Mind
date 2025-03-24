import express from 'express';
import {
  createUserController,
  getUserByIdController,
} from '../controllers/UserControllers.js';

const router = express.Router();

router.post('/register', createUserController);
router.get('/user/:id', getUserByIdController);

export default router;
