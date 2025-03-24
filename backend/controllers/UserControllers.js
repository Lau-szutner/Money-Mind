import UserModel from '../models/userModel.js'; // Importa el modelo de Sequelize para 'User'
import bcrypt from 'bcrypt';

const createUserController = async (req, res) => {
  const { email, name, password } = req.body;

  // Validación de campos
  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    // Verificar si ya existe un usuario con el mismo correo
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Genera un hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const newUser = await UserModel.create({
      email,
      name,
      password: hashedPassword, // Usamos la contraseña hasheada
    });

    res
      .status(201)
      .json({ message: 'Usuario creado', userId: newUser.id_users });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al crear usuario', message: error.message });
  }
};

const getUserByIdController = async (req, res) => {
  const { id } = req.params; // Obtén el ID de los parámetros de la URL

  try {
    // Buscar el usuario por su ID
    const user = await UserModel.findByPk(id);

    if (!user) {
      // Si no se encuentra el usuario, responde con un error
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Si se encuentra el usuario, lo retornamos
    res.status(200).json(user);
  } catch (error) {
    // Manejo de errores
    res
      .status(500)
      .json({ error: 'Error al obtener usuario', message: error.message });
  }
};

export { createUserController, getUserByIdController };
