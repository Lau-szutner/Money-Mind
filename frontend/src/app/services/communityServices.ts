const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import Cookies from 'js-cookie';

export const fetchCommunities = async () => {
  try {
    const token = Cookies.get('authToken');

    const res = await fetch(`${apiUrl}/communities/byUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!Array.isArray(data)) return [];

    return data.map((item: any) => item.Community ?? item);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createCommunity = async (communityData: {
  name: string;
  slug?: string;
  description?: string;
  image_url?: string;
  is_private: boolean;
}) => {
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
  communityData: {
    name?: string;
    slug?: string;
    description?: string;
    image_url?: string;
    is_private?: boolean;
  },
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
      const data = await res.json();
      throw new Error(data.error || 'Error al unirse a la comunidad');
    }

    return { message: 'Solicitud enviada' };
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
      const data = await res.json();
      throw new Error(data.error || 'Error al salir de la comunidad');
    }

    return { message: 'Has salido de la comunidad' };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCommunityBySlug = async (slug: string) => {
  try {
    const token = Cookies.get('authToken');

    const res = await fetch(`${apiUrl}/communities/bySlug/${slug}`, {
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
