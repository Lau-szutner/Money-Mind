import { PropsWithChildren } from 'react';
import CommunityLayoutShell from '@/app/user/community/CommunityLayoutShell';

export const metadata = {
  title: 'Money Mind - Community',
  description: '...',
};

export default function CommunityLayout({ children }: PropsWithChildren) {
  return <CommunityLayoutShell>{children}</CommunityLayoutShell>;
}
