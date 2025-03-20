import jwt from 'jsonwebtoken';

// Función para generar el JWT
export const generateToken = (user) => {
  const secretKey = 'your_secret_key';

  // El payload contiene el ID del usuario y, opcionalmente, otra información que quieras incluir
  const payload = {
    id: user.id, // Aquí incluimos el ID del usuario
    email: user.email, // También puedes incluir otros campos si lo necesitas
  };

  // Firma el token usando una clave secreta y define el tiempo de expiración
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
};
