import { Community, Course, UserCommunity } from '../models/index.js';

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
  console.log(userId);

  try {
    const communities = await UserCommunity.findAll({
      where: { user_id: userId },
    });

    if (communities.length === 0) {
      return ressponse
        .status(404)
        .json({ error: 'No se encontraron comunidades para este usuario' });
    }
    response.status(200).json(communities);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Error al obtener las comunidades' });
  }
};
