import { createUserModel } from '../models/createUserModel.js';
import bcrypt from 'bcrypt';

const createUserController = async (req, res) => {
  const { email, name, password } = req.body;

  // Validación de campos
  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    // Genera un hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Llamada al modelo para crear el usuario con la contraseña hasheada
    const result = await createUserModel(email, name, hashedPassword);

    res
      .status(201)
      .json({ message: 'Usuario creado', userId: result.insertId });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al crear usuario', message: error.message });
  }
};

export { createUserController };
