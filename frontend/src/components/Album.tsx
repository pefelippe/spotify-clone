interface AlbumProps {
  name: string;
  imageUrl?: string;
  artistName?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Album = ({ name, imageUrl, artistName, size = 'md' }: AlbumProps) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  const defaultImage = 'https://via.placeholder.com/300x300/1DB954/FFFFFF?text=Album';

  return (
    <div className="flex flex-col items-center space-y-3 cursor-pointer hover:scale-105 transition-transform duration-200">
      <div className={`${sizeClasses[size]} rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center`}>
        <img
          src={imageUrl || defaultImage}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
        />
      </div>
      <div className="text-center">
        <h3 className="text-white-text font-semibold text-sm truncate max-w-[120px]">
          {name}
        </h3>
        {artistName && (
          <p className="text-gray-400 text-xs truncate max-w-[120px]">
            {artistName}
          </p>
        )}
      </div>
    </div>
  );
};

export default Album;
