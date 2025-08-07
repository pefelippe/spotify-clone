export const PlayIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.287V1.713z"/>
  </svg>
);

export const PauseIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
  </svg>
);

export const SkipNextIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 3.606A.7.7 0 0 0 1 4.212v7.576a.7.7 0 0 0 1.05.606L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"/>
  </svg>
);

export const SkipPrevIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-3.249a.7.7 0 0 1 1.05.606v7.576a.7.7 0 0 1-1.05.606L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"/>
  </svg>
);

export const ShuffleIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.151.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"/>
    <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"/>
  </svg>
);

export const RepeatIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5a.75.75 0 0 1 0 1.5h-8.5A2.25 2.25 0 0 0 1.5 4.75v5.5A2.25 2.25 0 0 0 3.75 12.5h6.5a.75.75 0 0 1 0 1.5h-6.5A3.75 3.75 0 0 1 0 10.25v-5.5z"/>
    <path d="m7.25 12.25-.47.47a.75.75 0 0 0 1.06 1.06l1.25-1.25a.75.75 0 0 0 0-1.06L7.84 10.22a.75.75 0 0 0-1.06 1.06l.47.47z"/>
    <path d="M16 10.25v.75a.75.75 0 0 1-.75.75H9.704a.75.75 0 0 1 0-1.5h4.796v-.25A2.25 2.25 0 0 0 12.25 8h-2.5a.75.75 0 0 1 0-1.5h2.5A3.75 3.75 0 0 1 16 10.25z"/>
    <path d="m8.75 3.75.47-.47a.75.75 0 0 0-1.06-1.06L6.91 3.47a.75.75 0 0 0 0 1.06l1.25 1.25a.75.75 0 0 0 1.06-1.06L8.75 4.25z"/>
  </svg>
);

export const VolumeIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M9.741.85a.8.8 0 0 1 .375.65v13a.8.8 0 0 1-1.125.73L6.354 14.3H1.5A1.5 1.5 0 0 1 0 12.8V3.2A1.5 1.5 0 0 1 1.5 1.7h4.854L9.366.15a.8.8 0 0 1 .375.7z"/>
  </svg>
);

export const VolumeMuteIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"/>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-2.727.815a.75.75 0 0 0-.266 1.378L8.25 4.42v7.16L5.998 13.04a.75.75 0 0 0 .266 1.378l2.727.815a.75.75 0 0 0 1.125-.65v-13z"/>
  </svg>
);

export const HeartIcon = ({ size = 16, className = '', filled = false }: { size?: number; className?: string; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.464L1.348 8.309A4.582 4.582 0 0 1 1.689 2z"/>
  </svg>
);

export const PlusIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"/>
  </svg>
);

export const MoreIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
  </svg>
);

export const PlayingIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M11.196 8 6 5v6l5.196-3z"/>
    <path d="M15.002 1.75A1.75 1.75 0 0 0 13.252 0h-10.5A1.75 1.75 0 0 0 1.002 1.75v12.5c0 .966.783 1.75 1.75 1.75h10.5a1.75 1.75 0 0 0 1.75-1.75V1.75zm-1.75-.25a.25.25 0 0 1 .25.25v12.5a.25.25 0 0 1-.25.25h-10.5a.25.25 0 0 1-.25-.25V1.75a.25.25 0 0 1 .25-.25h10.5z"/>
  </svg>
);

export const UserIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
  </svg>
);

export const ClockIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M8 1.75a6.25 6.25 0 1 0 0 12.5 6.25 6.25 0 0 0 0-12.5zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-3.5a.75.75 0 0 1 .75.75v2.5h1.75a.75.75 0 0 1 0 1.5H8.75V11a.75.75 0 0 1-1.5 0V8.5H5.5a.75.75 0 0 1 0-1.5h1.75V5.5A.75.75 0 0 1 8 4.5z"/>
  </svg>
);

export const TimeIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.75.75 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0z"/>
  </svg>
);

export const HomeIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.5 7.7a1 1 0 0 0-1 0L1 12.25a1 1 0 0 0 1 1.748h1.25V21a1 1 0 0 0 1 1h6.5a1 1 0 0 0 1-1v-5h2v5a1 1 0 0 0 1 1h6.5a1 1 0 0 0 1-1v-7.002h1.25a1 1 0 0 0 1-1.748L12.5 7.7z"/>
  </svg>
);

export const SearchIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l6.353 6.353 1.471-1.471-6.409-6.409A9.249 9.249 0 0 0 20 10.558c0-5.14-4.226-9.279-9.467-9.279zm0 1.643c4.234 0 7.679 3.445 7.679 7.636 0 4.196-3.445 7.636-7.679 7.636-4.234 0-7.679-3.44-7.679-7.636 0-4.191 3.445-7.636 7.679-7.636z"/>
  </svg>
);

export const LibraryIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12l2.29 2.29 1.42-1.42a1 1 0 0 1 1.41 0l4 4a1 1 0 0 1 .29.7V21a1 1 0 0 1-1 1H3zm7-2h9V9.83L19.17 6H4v13h6z"/>
  </svg>
);

export const ArtistIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
  </svg>
);

export const PlaylistIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18C16.69 14.07 16.35 14 16 14c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V6h-2z"/>
  </svg>
);

export const DownloadIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
);

export const ChevronDownIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
);

export const QueueIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
  </svg>
);

export const SpotifyIcons = ({ name, size = 16, className = '' }: { name: string; size?: number; className?: string }) => {
  const icons: { [key: string]: React.ComponentType<any> } = {
    play: PlayIcon,
    pause: PauseIcon,
    next: SkipNextIcon,
    previous: SkipPrevIcon,
    shuffle: ShuffleIcon,
    repeat: RepeatIcon,
    'repeat-one': RepeatIcon,
    volume: VolumeIcon,
    'volume-mute': VolumeMuteIcon,
    heart: HeartIcon,
    plus: PlusIcon,
    more: MoreIcon,
    playing: PlayingIcon,
    user: UserIcon,
    clock: ClockIcon,
    time: TimeIcon,
    home: HomeIcon,
    search: SearchIcon,
    library: LibraryIcon,
    artist: ArtistIcon,
    playlist: PlaylistIcon,
    download: DownloadIcon,
    'chevron-down': ChevronDownIcon,
    queue: QueueIcon,
  };

  const IconComponent = icons[name];
  return IconComponent ? <IconComponent size={size} className={className} /> : null;
};
