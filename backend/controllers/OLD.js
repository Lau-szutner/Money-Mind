import { createUser } from '../models/usersModel.js';

const registerUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const result = await createUser(name, email);
    res
      .status(201)
      .json({ message: 'Usuario registrado', userId: result.insertId });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al crear usuario', message: error.message });
  }
};

export { registerUser };
