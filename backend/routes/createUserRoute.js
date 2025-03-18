import express from 'express';
import { createUserController } from '../controllers/createUserController.js';

const router = express.Router();

router.post('/createUser', createUserController);

export default router;
