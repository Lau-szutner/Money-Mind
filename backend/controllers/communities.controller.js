import { Community, Course, UserCommunity, User } from '../models/index.js';

export const getAllCommunities = async (req, response) => {
  try {
    const communities = await Community.findAll();
    response.status(200).json(communities);
  } catch (error) {
    response.status(500).json(
      {
        message: 'error al obtenes las comunidades',
      },
      error,
    );
  }
};

export const getCommunitiesByUser = async (req, response) => {
  const userId = req.userId;

  try {
    const communities = await UserCommunity.findAll({
      where: { user_id: userId },
      include: [Community],
    });

    if (communities.length === 0) {
      return response
        .status(404)
        .json({ error: 'No se encontraron comunidades para este usuario' });
    }
    response.status(200).json(communities);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al obtener las comunidades' });
  }
};

export const createCommunity = async (req, response) => {
  const { name, slug, description, image_url, is_private } = req.body;
  const owner_id = req.userId;

  try {
    const newCommunity = await Community.create({
      name,
      slug,
      description,
      image_url,
      owner_id,
      is_private: is_private || false,
    });

    // Asignar al creador como admin
    await UserCommunity.create({
      user_id: owner_id,
      community_id: newCommunity.id,
      role: 'admin',
      status: 'active',
    });

    response.status(201).json(newCommunity);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al crear la comunidad' });
  }
};

export const getCommunityById = async (req, response) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const community = await Community.findByPk(id, {
      include: [
        {
          model: UserCommunity,
          include: [User],
        },
      ],
    });

    if (!community) {
      return response.status(404).json({ error: 'Comunidad no encontrada' });
    }

    // Si es privada y el usuario no es miembro, no mostrar detalles
    if (community.is_private) {
      const membership = await UserCommunity.findOne({
        where: { user_id: userId, community_id: id },
      });
      if (!membership) {
        return response
          .status(403)
          .json({ error: 'Acceso denegado a comunidad privada' });
      }
    }

    response.status(200).json(community);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al obtener la comunidad' });
  }
};

export const updateCommunity = async (req, response) => {
  const { id } = req.params;
  const { name, slug, description, image_url, is_private } = req.body;
  const userId = req.userId;

  try {
    const community = await Community.findByPk(id);
    if (!community) {
      return response.status(404).json({ error: 'Comunidad no encontrada' });
    }

    // Verificar permisos: owner o admin
    const membership = await UserCommunity.findOne({
      where: { user_id: userId, community_id: id },
    });
    if (
      community.owner_id !== userId &&
      (!membership || membership.role !== 'admin')
    ) {
      return response
        .status(403)
        .json({ error: 'No tienes permisos para editar esta comunidad' });
    }

    await community.update({
      name,
      slug,
      description,
      image_url,
      is_private,
    });

    response.status(200).json(community);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al actualizar la comunidad' });
  }
};

export const deleteCommunity = async (req, response) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const community = await Community.findByPk(id);
    if (!community) {
      return response.status(404).json({ error: 'Comunidad no encontrada' });
    }

    // Solo owner puede eliminar
    if (community.owner_id !== userId) {
      return response
        .status(403)
        .json({ error: 'Solo el propietario puede eliminar la comunidad' });
    }

    await community.destroy();
    response.status(200).json({ message: 'Comunidad eliminada' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al eliminar la comunidad' });
  }
};

export const joinCommunity = async (req, response) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const community = await Community.findByPk(id);
    if (!community) {
      return response.status(404).json({ error: 'Comunidad no encontrada' });
    }

    // Verificar si ya es miembro
    const existingMembership = await UserCommunity.findOne({
      where: { user_id: userId, community_id: id },
    });
    if (existingMembership) {
      return response
        .status(400)
        .json({ error: 'Ya eres miembro de esta comunidad' });
    }

    const status = community.is_private ? 'pending' : 'active';

    await UserCommunity.create({
      user_id: userId,
      community_id: id,
      role: 'member',
      status,
    });

    response.status(201).json({ message: 'Solicitud enviada' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al unirse a la comunidad' });
  }
};

export const leaveCommunity = async (req, response) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const membership = await UserCommunity.findOne({
      where: { user_id: userId, community_id: id },
    });
    if (!membership) {
      return response
        .status(404)
        .json({ error: 'No eres miembro de esta comunidad' });
    }

    await membership.destroy();
    response.status(200).json({ message: 'Has salido de la comunidad' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al salir de la comunidad' });
  }
};

export const getCommunityBySlug = async (req, response) => {
  const { slug } = req.params;
  const userId = req.userId;

  console.log('inicio busqueda de comunidad');

  try {
    const community = await Community.findOne({
      where: { slug },
      include: [
        {
          model: UserCommunity,
          include: [User],
        },
      ],
    });

    if (!community) {
      return response.status(404).json({ error: 'Comunidad no encontrada' });
    }

    // Si es privada y el usuario no es miembro, no mostrar detalles
    if (community.is_private) {
      const membership = await UserCommunity.findOne({
        where: { user_id: userId, community_id: community.id },
      });
      if (!membership) {
        return response
          .status(403)
          .json({ error: 'Acceso denegado a comunidad privada' });
      }
    }

    response.status(200).json(community);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al obtener la comunidad' });
  }
};

export const getCommunityMembers = async (req, response) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const community = await Community.findByPk(id);
    if (!community) {
      return response.status(404).json({ error: 'Comunidad no encontrada' });
    }

    // Si es privada, verificar membresía
    if (community.is_private) {
      const membership = await UserCommunity.findOne({
        where: { user_id: userId, community_id: id },
      });
      if (!membership) {
        return response.status(403).json({ error: 'Acceso denegado' });
      }
    }

    const members = await UserCommunity.findAll({
      where: { community_id: id },
      include: [User],
    });

    response.status(200).json(members);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al obtener los miembros' });
  }
};
