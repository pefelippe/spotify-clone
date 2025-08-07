import React, { useState } from 'react';

interface UserAvatarProps {
  imageUrl?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  imageUrl,
  name = 'User',
  size = 'md',
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (imageUrl && !imageError) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-gray-700 flex items-center justify-center text-white font-medium ${sizeClasses[size]} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};
