import Cookies from 'js-cookie';
import {
  Community,
  CommunityBasic,
  CommunityCreate,
  CommunityJoinResponse,
  CommunityMembershipBasic,
  CommunityMembershipResponse,
  CommunityUpdate,
} from '@/app/types/communities';

const apiUrl = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/+$/, '');

const getErrorMessage = async (
  response: Response,
  fallback: string,
): Promise<string> => {
  if (response.headers.get('content-type')?.includes('application/json')) {
    const data = await response.json();
    return data.error || data.message || fallback;
  }

  return `${fallback} (HTTP ${response.status})`;
};

export const fetchAllCommunities = async (): Promise<CommunityBasic[]> => {
  const res = await fetch(`${apiUrl}/communities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Error al cargar las comunidades');
  }

  const data: CommunityBasic[] = await res.json();
  if (!Array.isArray(data)) {
    throw new Error('El servidor devolvió una lista de comunidades inválida');
  }

  return data;
};

export const fetchCommunities = async (): Promise<CommunityBasic[]> => {
  const token = Cookies.get('authToken');

  const res = await fetch(`${apiUrl}/communities/byUser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al cargar tus comunidades seguidas');
  }

  const data: CommunityMembershipResponse[] = await res.json();
  if (!Array.isArray(data)) {
    throw new Error('El servidor devolvió una lista de membresías inválida');
  }

  return data.map((item) => item.Community);
};

export const fetchCommunityMemberships =
  async (): Promise<CommunityMembershipBasic[]> => {
    const token = Cookies.get('authToken');
    const res = await fetch(`${apiUrl}/communities/memberships/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Error al cargar tus membresías de comunidades');
    }

    const data: CommunityMembershipBasic[] = await res.json();
    if (!Array.isArray(data)) {
      throw new Error('El servidor devolvió una lista de membresías inválida');
    }

    return data;
  };

export const createCommunity = async (communityData: CommunityCreate) => {
  try {
    const token = Cookies.get('authToken');

    const res = await fetch(`${apiUrl}/communities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(communityData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error al crear comunidad');
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCommunityById = async (id: number) => {
  try {
    const token = Cookies.get('authToken');

    const res = await fetch(`${apiUrl}/communities/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error al obtener comunidad');
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCommunity = async (
  id: number,
  communityData: CommunityUpdate,
) => {
  try {
    const token = Cookies.get('authToken');

    const res = await fetch(`${apiUrl}/communities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(communityData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error al actualizar comunidad');
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCommunity = async (id: number) => {
  try {
    const token = Cookies.get('authToken');

    const res = await fetch(`${apiUrl}/communities/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Error al eliminar comunidad');
    }

    return { message: 'Comunidad eliminada' };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const joinCommunity = async (id: number) => {
  try {
    const token = Cookies.get('authToken');

    const res = await fetch(`${apiUrl}/communities/${id}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        await getErrorMessage(res, 'Error al unirse a la comunidad'),
      );
    }

    const data: CommunityJoinResponse = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const leaveCommunity = async (id: number) => {
  try {
    const token = Cookies.get('authToken');

    const res = await fetch(`${apiUrl}/communities/${id}/leave`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        await getErrorMessage(res, 'Error al salir de la comunidad'),
      );
    }

    return { message: 'Has salido de la comunidad' };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCommunityBySlug = async (slug: string): Promise<Community> => {
  try {
    const token = Cookies.get('authToken');

    const res = await fetch(
      `${apiUrl}/communities/bySlug/${encodeURIComponent(slug)}`,
      {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.error || data.message || 'Error al obtener comunidad',
      );
    }

    return data as Community;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
