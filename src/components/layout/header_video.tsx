'use client';

import { useState } from 'react';
import Image from 'next/image';

interface header_video_props {
  video_path: string;
  poster_path: string;
  alt_text?: string;
}

function header_video_client({
  video_path,
  poster_path,
  alt_text = 'Header video'
}: header_video_props) {
  const [video_loaded, set_video_loaded] = useState(false);

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gots-dark flex items-center justify-center">
      {/* Poster Image (loads first) */}
      <Image
        src={poster_path}
        alt={alt_text}
        fill
        priority
        className={`absolute inset-0 object-contain transition-opacity duration-500 ${
          video_loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Video Container */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => set_video_loaded(true)}
        poster={poster_path}
        className="w-full h-full object-contain"
        aria-label={alt_text}
      >
        <source src={`${video_path}.webm`} type="video/webm" />
        <source src={`${video_path}.mp4`} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Optional Overlay (adjust opacity for text readability) */}
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
