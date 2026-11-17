'use client';

import { createContext, useContext } from 'react';
import { CommunityMembershipBasic, PostType } from '@/app/types/communities';

interface CommunityLayoutContextValue {
  memberships: CommunityMembershipBasic[];
  membershipsLoaded: boolean;
  createdPost: PostType | null;
  onCreatedPostHandled: () => void;
  onMembershipChange: (
    communityId: number,
    status: CommunityMembershipBasic['status'] | null,
  ) => void;
}

const CommunityLayoutContext =
  createContext<CommunityLayoutContextValue | null>(null);

export const CommunityLayoutProvider = CommunityLayoutContext.Provider;

export const useCommunityLayout = () => {
  const context = useContext(CommunityLayoutContext);
  if (!context) {
    throw new Error(
      'useCommunityLayout debe usarse dentro del layout community',
    );
  }
  return context;
};
