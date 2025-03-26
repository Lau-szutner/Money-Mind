import express from 'express';
import {
  createUser,
  getUser,
  getUsers,
} from '../controllers/users.controller.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUser);
router.get('/', getUsers);

export default router;
