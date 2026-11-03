export type CommunityMembershipStatus = 'active' | 'pending' | 'banned';

export type CommunityRole = 'admin' | 'moderator' | 'member';

export interface CommunityBasic {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string | null;
  is_private?: boolean;
}

export interface Community extends CommunityBasic {
  owner_id: number;
  is_private: boolean;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
  membershipStatus: CommunityMembershipStatus | null;
}

export interface CommunityMembershipBasic {
  community_id: number;
  status: CommunityMembershipStatus;
}

export interface CommunitySideBarProps {
  communities: CommunityBasic[];
  memberships: CommunityMembershipBasic[];
  loading: boolean;
  onMembershipChange: (
    communityId: number,
    status: CommunityMembershipStatus | null,
  ) => void;
}

export interface UserCommunity extends CommunityMembershipBasic {
  id: number;
  user_id: number;
  role: CommunityRole;
  joined_at: string;
  createdAt?: string;
  updatedAt?: string;
  Community?: CommunityBasic;
  User?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CommunityMembershipResponse {
  Community: CommunityBasic;
}

export interface CommunityJoinResponse {
  message: string;
  status: 'active' | 'pending';
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

export interface CommunityPostResponse {
  id: number;
  User: { id: number; name: string };
  Community: CommunityBasic;
  title: string;
  body: string;
  createdAt: string;
  vote_score: number;
  comment_count: number;
  voteScore: number;
  commentCount: number;
  userVote: 'up' | 'down' | null;
}

export interface PostCommentType {
  id: number;
  body: string;
  createdAt: string;
  parent_comment_id: number | null;
  User: {
    id: number;
    name: string;
  };
}

export interface PostType {
  id: number;
  authorId: number;
  user: string;
  title: string;
  body: string;
  createdAt: string;
  community: CommunityBasic;
  voteScore?: number;
  commentCount?: number;
  userVote?: 'up' | 'down' | null;
}
