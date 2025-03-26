import jwt from 'jsonwebtoken';

// Función para generar el JWT
export const generateToken = (user) => {
  // Obtener la clave secreta desde las variables de entorno
  const secretKey = process.env.JWT_SECRET_KEY;

  // El payload contiene el ID del usuario y, opcionalmente, otra información que quieras incluir
  const payload = {
    id: user.id, // Aquí incluimos el ID del usuario
    email: user.email, // También puedes incluir otros campos si lo necesitas
  };
  console.log(payload.id);

  // Firma el token usando la clave secreta y define el tiempo de expiración
  const token = jwt.sign(payload, secretKey, { expiresIn: '10h' });

  return token;
};
