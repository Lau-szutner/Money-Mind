import express from 'express';
import {
  createSpendController,
  getSpendController,
  deleteSpendController,
} from '../controllers/spendsController.js';

const router = express.Router();

router.post('/create-spend', createSpendController);
router.get('/:id', getSpendController);
// router.put('/create-spend', createSpendController);
router.delete('/delete-spend/:id_spend', deleteSpendController);

export default router;
