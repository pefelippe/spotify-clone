import { useMemo } from 'react';
import { InfiniteScrollList } from './InfiniteScrollList';

interface Track {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  duration_ms: number;
  track_number?: number;
  explicit?: boolean;
}

interface TrackListProps {
  data: any;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  isPlaylist?: boolean;
}

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const TrackList = ({
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  isPlaylist = false,
}: TrackListProps) => {
  const allTracks = useMemo(() => {
    if (isPlaylist) {
      return data?.pages.flatMap(page => 
        page.items.map((item: any) => item.track).filter(Boolean)
      ) || [];
    }
    return data?.pages.flatMap(page => page.items) || [];
  }, [data, isPlaylist]);

  const renderTrackItem = (track: Track, index: number) => (
    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 group">
      <div className="w-8 text-center">
        <span className="text-gray-400 text-sm group-hover:hidden">
          {track.track_number || index + 1}
        </span>
        <button className="hidden group-hover:block text-white-text hover:text-green-spotify">
          ▶️
        </button>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="text-white-text font-medium truncate">
            {track.name}
          </h3>
          {track.explicit && (
            <span className="text-xs bg-gray-600 text-white px-1 rounded">E</span>
          )}
        </div>
        <p className="text-gray-400 text-sm truncate">
          {track.artists?.map(artist => artist.name).join(', ')}
        </p>
      </div>

      <div className="text-gray-400 text-sm">
        {formatDuration(track.duration_ms)}
      </div>
    </div>
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4 p-3 border-b border-gray-800 text-gray-400 text-sm font-medium">
        <div className="w-8 text-center">#</div>
        <div className="flex-1">Título</div>
        <div>Duração</div>
      </div>

      <InfiniteScrollList
        items={allTracks}
        renderItem={renderTrackItem}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        className="space-y-1"
        emptyComponent={
          <div className="text-center py-12 text-gray-400">
            Nenhuma música encontrada.
          </div>
        }
      />
    </div>
  );
};