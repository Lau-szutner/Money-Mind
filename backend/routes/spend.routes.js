import express from 'express';
import {
  createSpend,
  getSpend,
  deleteSpend,
  getSpends,
  updateSpend,
} from '../controllers/spends.controller.js';

const router = express.Router();
router.get('/', getSpends);
router.get('/:id', getSpend);
router.post('/', createSpend);
router.put('/:id', updateSpend);
router.delete('/:id_spend', deleteSpend);

export default router;
