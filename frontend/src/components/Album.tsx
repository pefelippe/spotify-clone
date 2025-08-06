interface AlbumProps {
  name: string;
  imageUrl?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  albumId?: string;
  onClick?: () => void;
}
const sizeClasses = {
  xs: 'w-16 h-16',
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
};

const defaultImage = 'https://via.placeholder.com/300x300/1DB954/FFFFFF?text=Album';

const Album = ({ name, imageUrl, size = 'md', onClick }: AlbumProps) => {
  return (
    <div 
      className="flex flex-col items-center space-y-3 cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={onClick}
    >
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-800 flex items-center justify-center`}>
        <img
          src={imageUrl || defaultImage}
          alt={name}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
        />
      </div>
    </div>
  );
};

export default Album;
