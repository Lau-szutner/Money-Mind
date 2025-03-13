import express from 'express';
import {
  createSpend,
  //   getAllUsers,
  //   getUserById,
} from '../controllers/spe.js';

const router = express.Router();

router.post('/register', registerUser);
// router.get('/users', getAllUsers);
// router.get('/users/:id', getUserById);

export default router;
