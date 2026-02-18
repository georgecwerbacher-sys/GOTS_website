'use client';

import { useState, useEffect } from 'react';

const HERO_PLACEHOLDER = '/images/hero-placeholder.svg';

interface header_video_props {
  video_path: string;
  poster_path: string;
  alt_text?: string;
  full_screen?: boolean;
}

function header_video_client({
  video_path,
  poster_path,
  alt_text = 'Header video',
  full_screen = false
}: header_video_props) {
  const [video_loaded, set_video_loaded] = useState(false);
  const [use_placeholder, set_use_placeholder] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => set_use_placeholder(false);
    img.onerror = () => set_use_placeholder(true);
    img.src = poster_path;
  }, [poster_path]);

  const height_class = full_screen ? 'min-h-screen' : 'h-[600px] min-h-[400px]';

  return (
    <div className={`relative w-full ${height_class} overflow-hidden bg-gots-dark flex items-center justify-center`}>
      <img
        src={HERO_PLACEHOLDER}
        alt={alt_text}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          use_placeholder ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {!use_placeholder && (
        <>
          <img
            src={poster_path}
            alt={alt_text}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
              video_loaded ? 'opacity-0' : 'opacity-100'
            }`}
            onError={() => set_use_placeholder(true)}
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => set_video_loaded(true)}
            onError={() => {}}
            poster={poster_path}
            className="absolute inset-0 w-full h-full object-contain"
            aria-label={alt_text}
          >
            <source src={`${video_path}.webm`} type="video/webm" />
            <source src={`${video_path}.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
        </>
      )}
    </div>
  );
}

// Export with uppercase for JSX usage
export { header_video_client as HeaderVideo };

// Export function wrapper for consistency with project naming
export function header_video(props: header_video_props) {
  return header_video_client(props);
}
