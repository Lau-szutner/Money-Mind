import { DoLogin } from '../models/doLogin.js';
import { generateToken } from '../config/jwtUtils.js'; // Importamos la función para generar el token

const doLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const user = await DoLogin(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken(user);

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al hacer el login', message: error.message });
  }
};
export { doLogin };
