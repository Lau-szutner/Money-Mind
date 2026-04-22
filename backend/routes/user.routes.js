import express from 'express';
import {
  createUser,
  getUser,
  getUsers,
  doLogin,
} from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.post('/login', doLogin);

export default router;
