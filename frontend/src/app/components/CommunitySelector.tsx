import React, { useEffect, useState } from 'react';
import { fetchCommunities } from '../services/communityServices';
import { CommunityBasic } from '../types/types';

interface Props {
  onSelectCommunity?: (community: CommunityBasic) => void;
}

const CommunitySelector: React.FC<Props> = ({ onSelectCommunity }) => {
  const [communities, setCommunities] = useState<CommunityBasic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const data = await fetchCommunities();
        setCommunities(data);
      } catch (error) {
        console.error('Error loading communities:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCommunities();
  }, []);

  if (loading) {
    return (
      <div className="w-3/12 bg-bgComponents p-5 text-3xl">
        <h2>Communities</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-3/12 bg-bgComponents p-5 text-3xl">
      <h2>Communities</h2>
      <ul className="text-xl">
        {communities.map((community) => (
          <li
            key={community.id}
            className="cursor-pointer hover:bg-gray-200 p-2"
            onClick={() => onSelectCommunity?.(community)}
          >
            {community.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunitySelector;
