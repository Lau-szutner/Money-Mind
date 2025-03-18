import { createUserModel } from '../models/createUserModel.js';

const createUserController = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const result = await createUserModel(email, name);
    res.status(201).json({ message: 'User created', userId: result.insertId });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al crear gasto', message: error.message });
  }
};

export { createUserController };
