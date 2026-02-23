'use client';

import { useState } from 'react';

const HERO_PLACEHOLDER = '/images/hero-placeholder.svg';

interface header_video_props {
  video_path: string;
  poster_path: string;
  alt_text?: string;
  full_screen?: boolean;
  end_with_poster?: boolean;
  object_fit?: 'contain' | 'cover';
}

function header_video_client({
  video_path,
  poster_path,
  alt_text = 'Header video',
  full_screen = false,
  end_with_poster = false,
  object_fit = 'contain'
}: header_video_props) {
  const [video_loaded, set_video_loaded] = useState(false);
  const [video_ended, set_video_ended] = useState(false);
  const [poster_error, set_poster_error] = useState(false);

  const height_class = full_screen ? 'min-h-screen' : 'h-[600px] min-h-[400px]';

  const show_poster = !video_loaded || (end_with_poster && video_ended);

  return (
    <div className={`relative w-full ${height_class} overflow-hidden bg-gots-dark flex items-center justify-center`}>
      {/* Placeholder only if poster fails to load */}
      <img
        src={HERO_PLACEHOLDER}
        alt={alt_text}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          poster_error ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden={!poster_error}
      />
      {/* Poster image: show first, when video ends (if end_with_poster), or when video not loaded */}
        <img
        src={poster_path}
        alt={alt_text}
        className={`absolute inset-0 w-full h-full ${object_fit === 'cover' ? 'object-cover' : 'object-contain'} transition-opacity duration-500 ${
          poster_error ? 'opacity-0' : show_poster ? 'opacity-100' : 'opacity-0'
        }`}
        onError={() => set_poster_error(true)}
      />
      {!poster_error && (!end_with_poster || !video_ended) && (
        <video
          autoPlay
          muted
          loop={!end_with_poster}
          playsInline
          onLoadedData={() => set_video_loaded(true)}
          onEnded={() => end_with_poster && set_video_ended(true)}
          onError={() => {}}
          poster={poster_path}
          className={`absolute inset-0 w-full h-full ${object_fit === 'cover' ? 'object-cover' : 'object-contain'}`}
          aria-label={alt_text}
        >
          <source src={`${video_path}.mp4`} type="video/mp4" />
          <source src={`${video_path}.webm`} type="video/webm" />
        </video>
      )}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

// Export with uppercase for JSX usage
export { header_video_client as HeaderVideo };

// Export function wrapper for consistency with project naming
export function header_video(props: header_video_props) {
  return header_video_client(props);
}
