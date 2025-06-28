// routes/courses.routes.js
import express from 'express';
// import { authenticateToken } from '../middlewares/authenticateToken.js';

import {
  getAllCourses,
  getCourseById,
} from '../controllers/courses.controller.js';

const router = express.Router();

// Ruta pública: obtener todos los posts
router.get('/', getAllCourses);

// Ruta pública: obtener todos los posts
router.get('/:id', getCourseById);

export default router;
