import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del header Authorization

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Acceso no autorizado. No se encontró el token.' });
  }

  // Obtener la clave secreta desde las variables de entorno
  const secretKey = process.env.JWT_SECRET_KEY;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }

    if (!decoded.id) {
      return res
        .status(403)
        .json({ message: 'El token no contiene un ID válido.' });
    }

    req.userId = decoded.id; // Asignar el userId al objeto `req`

    next();
  });
};
