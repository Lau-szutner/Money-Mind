import { DoLogin } from '../models/doLogin.js';
import { generateToken } from '../config/jwtUtils.js'; // Importamos la función para generar el token

const doLogin = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si los campos email y password están presentes
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    // Intentamos obtener el usuario desde el modelo de login
    const user = await DoLogin(email, password);

    // Si el usuario no existe o las credenciales son incorrectas
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar el JWT con el ID del usuario y otros datos si es necesario
    const token = generateToken(user);

    // Devolver el token generado al cliente
    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    // Si ocurre un error en el proceso de login
    res
      .status(500)
      .json({ error: 'Error al hacer el login', message: error.message });
  }
};

export { doLogin };
