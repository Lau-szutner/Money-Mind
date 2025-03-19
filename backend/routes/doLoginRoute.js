import express from 'express';
import { DoLoginController } from '../controllers/DoLoginController.js';

const router = express.Router();

router.post('/doLogin', DoLoginController);

export default router;
