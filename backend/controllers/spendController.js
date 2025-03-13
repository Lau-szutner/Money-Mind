import { createSpendModel } from '../models/spendModel.js';

const createSpend = async (req, res) => {
  const { amount, description } = req.body;

  if (!amount || !description) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const result = await createSpendModel(amount, description);
    res.status(201).json({ message: 'Gasto creado', spendId: result.insertId });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al crear gasto', message: error.message });
  }
};

export { createSpend };
