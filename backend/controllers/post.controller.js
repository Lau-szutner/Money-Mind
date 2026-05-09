import { Post, User, Community, UserCommunity } from '../models/index.js';
import { Op } from 'sequelize';
import slugify from 'slugify'; // Opcional: npm install slugify

// 1. Obtener el FEED PERSONALIZADO (Comunidades seguidas)
export const getFeedPosts = async (req, res) => {
  const userId = req.userId; // Viene del middleware de auth

  try {
    // Buscar IDs de comunidades donde el usuario es miembro activo
    const userCommunities = await UserCommunity.findAll({
      where: { user_id: userId, status: 'active' },
      attributes: ['community_id'],
    });

    const communityIds = userCommunities.map((uc) => uc.community_id);

    const posts = await Post.findAll({
      where: { fk_community_id: { [Op.in]: communityIds } },
      include: [
        { model: User, attributes: ['name', 'name'] },
        { model: Community, attributes: ['name', 'slug'] },
      ],
      order: [['createdAt', 'DESC']],
      limit: 20,
    });

    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener el feed', error: error.message });
  }
};

// 2. Obtener todos los posts (Global)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'name'] },
        { model: Community, attributes: ['name', 'slug'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los posts', error });
  }
};

// 3. Obtener un solo post por Slug (mejor para Reddit) o ID
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: User, attributes: ['id', 'name'] },
        { model: Community, attributes: ['id', 'name', 'slug'] },
      ],
    });
    if (!post) return res.status(404).json({ message: 'Post no encontrado' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el post', error });
  }
};

// 4. Crear un nuevo post
export const createPost = async (req, res) => {
  const { title, body, post_type, url, fk_community_id } = req.body;
  const userId = req.userId;

  if (!title || !fk_community_id) {
    return res
      .status(400)
      .json({ error: 'Título y Comunidad son obligatorios' });
  }

  try {
    // Generar slug básico si no usas Hooks en el modelo
    const generatedSlug = `${slugify(title, { lower: true })}-${Date.now()}`;

    const result = await Post.create({
      fk_user_id: userId,
      fk_community_id,
      title,
      body,
      slug: generatedSlug,
      post_type: post_type || 'text',
      url: post_type === 'link' ? url : null,
    });

    res.status(201).json({ message: 'Post creado', post: result });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al crear el post', message: error.message });
  }
};

// 5. Actualizar un post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post no encontrado' });

    // Verificar que el usuario sea el dueño
    if (post.fk_user_id !== req.userId) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para editar esto' });
    }

    if (title) post.title = title;
    if (body) post.body = body;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el post', error });
  }
};

// 6. Eliminar un post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post no encontrado' });

    // Borrado lógico (paranoid: true en el modelo hará el resto)
    await post.destroy();
    res.status(200).json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el post', error });
  }
};
