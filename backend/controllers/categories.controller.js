//contollers/categories.controller.js
import Category, { categories } from '../models/Category.js';
import { generateToken } from '../config/jwtUtils.js';

const getAllCategories = async (req, res) => {
  const userId = req.userId;
  try {
    const categories = await Category.findAll({
      where: {
        fk_user_id: userId,
      },
    });

    if (categories.length === 0) {
      return res
        .status(404)
        .json({ error: 'No se encontraron categorias para este usuario' });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las categorias' });
  }
};
export { getAllCategories };
