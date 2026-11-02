import {
  Post,
  User,
  Community,
  UserCommunity,
  PostVote,
  PostComment,
  sequelize,
} from '../models/index.js';
import { Op } from 'sequelize';
import slugify from 'slugify'; // Opcional: npm install slugify

const addUserVoteState = async (posts, userId) => {
  const postData = posts.map((post) => post.toJSON());
  if (postData.length === 0) return postData;

  const votes = await PostVote.findAll({
    where: {
      fk_user_id: userId,
      fk_post_id: { [Op.in]: postData.map((post) => post.id) },
    },
    attributes: ['fk_post_id', 'vote_type'],
  });
  const userVotes = new Map(
    votes.map((vote) => [vote.fk_post_id, vote.vote_type]),
  );

  return postData.map((post) => ({
    ...post,
    voteScore: post.vote_score ?? 0,
    commentCount: post.comment_count ?? 0,
    userVote: userVotes.get(post.id) ?? null,
  }));
};

const findAccessiblePost = async (postId, userId, transaction) => {
  const post = await Post.findByPk(postId, {
    include: [{ model: Community, attributes: ['id', 'is_private'] }],
    transaction,
  });

  if (!post) return { post: null, forbidden: false };

  if (post.Community.is_private) {
    const membership = await UserCommunity.findOne({
      where: {
        user_id: userId,
        community_id: post.Community.id,
        status: 'active',
      },
      attributes: ['id'],
      transaction,
    });

    if (!membership) return { post, forbidden: true };
  }

  return { post, forbidden: false };
};

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
        { model: Community, attributes: ['id', 'name', 'slug'] },
      ],
      order: [['createdAt', 'DESC']],
      limit: 20,
    });

    res.status(200).json(await addUserVoteState(posts, userId));
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener el feed', error: error.message });
  }
};

export const getCommunityPosts = async (req, res) => {
  try {
    const community = await Community.findOne({
      where: { slug: req.params.slug },
      attributes: ['id', 'is_private'],
    });

    if (!community) {
      return res.status(404).json({ message: 'Comunidad no encontrada' });
    }

    if (community.is_private) {
      const membership = await UserCommunity.findOne({
        where: {
          user_id: req.userId,
          community_id: community.id,
          status: 'active',
        },
        attributes: ['id'],
      });

      if (!membership) {
        return res.status(403).json({ message: 'Acceso denegado a comunidad privada' });
      }
    }

    const posts = await Post.findAll({
      where: { fk_community_id: community.id },
      include: [
        { model: User, attributes: ['id', 'name'] },
        { model: Community, attributes: ['id', 'name', 'slug'] },
      ],
      order: [['createdAt', 'DESC']],
      limit: 20,
    });

    res.status(200).json(await addUserVoteState(posts, req.userId));
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener las publicaciones de la comunidad',
      error: error.message,
    });
  }
};

export const togglePostUpvote = async (req, res) => {
  const postId = Number(req.params.id);
  const userId = req.userId;

  if (!Number.isInteger(postId) || postId < 1) {
    return res.status(400).json({ message: 'ID de publicación inválido' });
  }

  try {
    const result = await sequelize.transaction(async (transaction) => {
      const { post, forbidden } = await findAccessiblePost(
        postId,
        userId,
        transaction,
      );

      if (!post) return { notFound: true };
      if (forbidden) return { forbidden: true };

      await post.reload({
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      const currentScore = post.vote_score ?? 0;
      const existingVote = await PostVote.findOne({
        where: { fk_post_id: postId, fk_user_id: userId },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (existingVote?.vote_type === 'up') {
        await existingVote.destroy({ transaction });
        const voteScore = currentScore - 1;
        await post.update({ vote_score: voteScore }, { transaction });
        return { voteScore, userVote: null };
      }

      if (existingVote) {
        await existingVote.update({ vote_type: 'up' }, { transaction });
        const voteScore = currentScore + 2;
        await post.update({ vote_score: voteScore }, { transaction });
        return { voteScore, userVote: 'up' };
      }

      await PostVote.create(
        { fk_post_id: postId, fk_user_id: userId, vote_type: 'up' },
        { transaction },
      );
      const voteScore = currentScore + 1;
      await post.update({ vote_score: voteScore }, { transaction });
      return { voteScore, userVote: 'up' };
    });

    if (result.notFound) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    if (result.forbidden) {
      return res.status(403).json({ message: 'No tienes acceso a esta publicación' });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al registrar el upvote',
      error: error.message,
    });
  }
};

export const getPostComments = async (req, res) => {
  const postId = Number(req.params.id);

  if (!Number.isInteger(postId) || postId < 1) {
    return res.status(400).json({ message: 'ID de publicación inválido' });
  }

  try {
    const { post, forbidden } = await findAccessiblePost(postId, req.userId);
    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    if (forbidden) {
      return res.status(403).json({ message: 'No tienes acceso a esta publicación' });
    }

    const comments = await PostComment.findAll({
      where: { fk_post_id: postId },
      include: [{ model: User, attributes: ['id', 'name'] }],
      order: [['createdAt', 'ASC']],
    });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al cargar los comentarios',
      error: error.message,
    });
  }
};

export const createPostComment = async (req, res) => {
  const postId = Number(req.params.id);
  const body = typeof req.body.body === 'string' ? req.body.body.trim() : '';
  const parentCommentId =
    req.body.parentCommentId == null ? null : Number(req.body.parentCommentId);

  if (!Number.isInteger(postId) || postId < 1) {
    return res.status(400).json({ message: 'ID de publicación inválido' });
  }
  if (
    parentCommentId !== null &&
    (!Number.isInteger(parentCommentId) || parentCommentId < 1)
  ) {
    return res.status(400).json({ message: 'ID de comentario padre inválido' });
  }
  if (!body || body.length > 2000) {
    return res.status(400).json({
      message: 'El comentario debe tener entre 1 y 2000 caracteres',
    });
  }

  try {
    const comment = await sequelize.transaction(async (transaction) => {
      const { post, forbidden } = await findAccessiblePost(
        postId,
        req.userId,
        transaction,
      );
      if (!post) return { notFound: true };
      if (forbidden) return { forbidden: true };

      if (parentCommentId !== null) {
        const parentComment = await PostComment.findOne({
          where: { id: parentCommentId, fk_post_id: postId },
          attributes: ['id'],
          transaction,
          lock: transaction.LOCK.UPDATE,
        });

        if (!parentComment) return { invalidParent: true };
      }

      const createdComment = await PostComment.create(
        {
          fk_post_id: postId,
          fk_user_id: req.userId,
          parent_comment_id: parentCommentId,
          body,
        },
        { transaction },
      );
      await post.increment('comment_count', { by: 1, transaction });
      return createdComment;
    });

    if (comment.notFound) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    if (comment.forbidden) {
      return res.status(403).json({ message: 'No tienes acceso a esta publicación' });
    }
    if (comment.invalidParent) {
      return res.status(400).json({
        message: 'El comentario al que respondes no pertenece a esta publicación',
      });
    }

    const commentWithAuthor = await PostComment.findByPk(comment.id, {
      include: [{ model: User, attributes: ['id', 'name'] }],
    });
    return res.status(201).json(commentWithAuthor);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear el comentario',
      error: error.message,
    });
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
    const membership = await UserCommunity.findOne({
      where: {
        user_id: userId,
        community_id: fk_community_id,
        status: 'active',
      },
    });

    if (!membership) {
      return res
        .status(403)
        .json({ error: 'Debes seguir la comunidad para publicar' });
    }

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
