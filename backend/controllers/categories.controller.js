//contollers/categories.controller.js
import Category from '../models/Category.js';

const getAllCategories = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: 'no hay id' });
  }

  try {
    const categories = await Category.findAll({
      where: {
        fk_user_id: userId,
      },
    });

    if (categories.length === 0) {
      return res.status(404).json({
        error: `No se encontraron categorias para este usuario ${userId}`,
      });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las categorias' });
  }
};

// const createCategory = async (req, res) => {
//   const userId = req.userId;

//   const { title } = req.body;

//   if (!userId) {
//     return res.status(400).json({ error: 'no hay id' });
//   }

//   if (!title) {
//     return res.status(400).json({ error: 'Faltan campos requeridos' });
//   }

//   try {
//     const newCategory = await Category.create({
//       title: title,
//       fk_user_id: userId,
//     });

//     if (newCategory.length === 0) {
//       return res.status(404).json({
//         error: `Falta title ${userId}`,
//       });
//     }

//     res.status(200).json(newCategory);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener las categorias' });
//   }
// };
export { getAllCategories };
