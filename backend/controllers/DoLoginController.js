import { doLoginModel } from '../models/doLoginModel.js';

const doLoginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const result = await doLoginModel(email, password);
    res.status(201).json({ message: 'Login echo' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al hacer el login', message: error.message });
  }
};

export { doLoginController };
