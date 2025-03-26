import express from 'express';
import { doLogin } from '../controllers/do.login.controller.js';

const router = express.Router();

router.post('/', doLogin);

export default router;
