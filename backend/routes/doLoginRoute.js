import express from 'express';
import { doLoginController } from '../controllers/doLoginController.js';

const router = express.Router();

router.post('/doLogin', doLoginController);

export default router;
