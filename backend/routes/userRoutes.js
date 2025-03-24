import express from 'express';
import {
  createUserController,
  //   getAllUsers,
  //   getUserById,
} from '../controllers/UserController.js';

const router = express.Router();

router.post('/register', createUserController);
// router.get('/users', getAllUsers);
// router.get('/users/:id', getUserById);

export default router;
