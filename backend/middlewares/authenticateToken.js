import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del header Authorization

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Acceso no autorizado. No se encontró el token.' });
  }

  const secretKey = 'your_secret_key';

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }

    // Verificar que el decoded contenga el ID
    if (!decoded.id) {
      return res
        .status(403)
        .json({ message: 'El token no contiene un ID válido.' });
    }

    console.log(decoded); // Verifica el contenido del token decodificado
    req.userId = decoded.id; // Asignar el userId al objeto `req`

    next(); // Continuar al siguiente middleware o controlador
  });
};
