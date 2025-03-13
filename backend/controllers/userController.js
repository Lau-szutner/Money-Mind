import { createUser } from '../models/usersModel.js';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await createUser(name, email, password); // Usamos await
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
