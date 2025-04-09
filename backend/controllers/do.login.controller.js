// controllers/authController.js
import { DoLogin } from '../models/doLogin.js';
import { generateToken } from '../config/jwtUtils.js';

const doLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const user = await DoLogin(email, password);

    const token = generateToken(user);

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    // Just return the error.message exactly as it is
    if (
      error.message === 'User not found' ||
      error.message === 'Incorrect password'
    ) {
      return res.status(401).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};

export { doLogin };
