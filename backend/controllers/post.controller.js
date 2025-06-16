import { Post, User } from '../models/index.js';

// Obtener todos los posts con su autor
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'name', 'email'], // mostrar datos del autor
      },
      order: [['created_at', 'DESC']],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los posts', error });
  }
};

// Obtener un solo post por ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['id', 'name'],
      },
    });
    if (!post) return res.status(404).json({ message: 'Post no encontrado' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el post', error });
  }
};

// Crear un nuevo post (requiere que el ID de usuario venga del body o del token)

export const createPost = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const userId = req.userId;

  console.log('UserID from token:', userId);
  try {
    const result = await Post.create({
      user_id: userId,
      title,
      body,
    });

    res.status(201).json({ message: 'Post creado', postId: result.id });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al crear el post', message: error.message });
  }
};

// Actualizar un post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post no encontrado' });

    post.title = title || post.title;
    post.body = body || post.body;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el post', error });
  }
};

// Eliminar un post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post no encontrado' });

    await post.destroy();
    res.status(200).json({ message: 'Post eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el post', error });
  }
};
