import express from 'express';
import { createSpend } from '../controllers/spendController.js';

const router = express.Router();

router.post('/createSpend', createSpend);

export default router;
