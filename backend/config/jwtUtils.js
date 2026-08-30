import jwt from 'jsonwebtoken';

// Función para generar el JWT
export const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET_KEY || 'moneymind-dev-secret';

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: '10h' });

  return token;
};
