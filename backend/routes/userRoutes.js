import express from 'express';
import {
  registerUser,
  //   getAllUsers,
  //   getUserById,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
// router.get('/users', getAllUsers);
// router.get('/users/:id', getUserById);

export default router;
