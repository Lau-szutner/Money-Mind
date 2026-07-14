// routes/courses.routes.js
import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';

import {
  getAllCourses,
  getCourseById,
  getMyCourses,
  createCourse,
  updateCourse,
  deleteCourseById,
} from '../controllers/courses.controller.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/my', authenticateToken, getMyCourses);
router.get('/:id', getCourseById);
router.post('/', authenticateToken, createCourse);
router.put('/:id', authenticateToken, updateCourse);
router.delete('/:id', authenticateToken, deleteCourseById);

export default router;
