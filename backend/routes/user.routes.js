import express from 'express';
import {
  createUserController,
  getUserByIdController,
} from '../controllers/UsersController.js';

const router = express.Router();

router.post('/', createUserController);
router.get('/user/:id', getUserByIdController);

export default router;
