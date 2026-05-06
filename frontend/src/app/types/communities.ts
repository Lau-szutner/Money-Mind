interface Community {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
}

// Tipo del objeto de la tabla pivote con la comunidad incluida
interface UserCommunity {
  id: number;
  user_id: number;
  community_id: number;
  role: string;
  status: string;
  joined_at: string;
  createdAt: string;
  updatedAt: string;
  Community: Community; // <-- el objeto de la comunidad
}

interface Props {
  communities: UserCommunity[]; // <- acá cambia
}

export type { Community, UserCommunity, Props };
