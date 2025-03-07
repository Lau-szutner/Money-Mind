import { createUser } from '../models/usersModel.js';

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  createUser(name, email, password, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear usuario' });
    } else {
      res
        .status(201)
        .json({ message: 'Usuario registrado', userId: result.insertId });
    }
  });
};

export { registerUser };
