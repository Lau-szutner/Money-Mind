export interface CommunityBasic {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string | null;
}

export interface PostType {
  id: number;
  user: string;
  title: string;
  body: string;
  createdAt: string;
  community: CommunityBasic;
}
