import React, { useEffect } from 'react';
import { usePlayer } from '../providers/player-provider';

export const PremiumWarning: React.FC = () => {
  const { isPremiumRequired, resetPremiumWarning } = usePlayer();

  useEffect(() => {
    if (isPremiumRequired) {
      const timer = setTimeout(() => {
        resetPremiumWarning();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isPremiumRequired, resetPremiumWarning]);

  if (!isPremiumRequired) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
        <p className="text-sm font-medium">
          Spotify Premium é necessário para reproduzir músicas
        </p>
      </div>
    </div>
  );
};
