import express from 'express';
import { createSpendController } from '../controllers/spendsController.js';

const router = express.Router();

router.post('/create-spend', createSpendController);

export default router;
