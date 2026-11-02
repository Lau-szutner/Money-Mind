export interface CommunityBasic {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string | null;
  is_private?: boolean;
}

export type CommunityMembershipStatus = 'active' | 'pending' | 'banned';

export interface CommunityMembershipBasic {
  community_id: number;
  status: CommunityMembershipStatus;
}

export interface CommunityPostResponse {
  id: number;
  User: { id: number; name: string };
  Community: CommunityBasic;
  title: string;
  body: string;
  createdAt: string;
}

export interface Community {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image_url?: string;
  owner_id: number;
  is_private: boolean;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
  membershipStatus: CommunityMembershipStatus | null;
}

export interface UserCommunity {
  id: number;
  user_id: number;
  community_id: number;
  role: 'admin' | 'moderator' | 'member';
  status: CommunityMembershipStatus;
  joined_at: string;
  User?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CommunityCreate {
  name: string;
  slug?: string;
  description?: string;
  image_url?: string;
  is_private: boolean;
}

export interface CommunityUpdate {
  name?: string;
  slug?: string;
  description?: string;
  image_url?: string;
  is_private?: boolean;
}

export interface PostType {
  id: number;
  user: string;
  title: string;
  body: string;
  createdAt: string;
  community: CommunityBasic;
}
