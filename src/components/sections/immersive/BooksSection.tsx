'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fade_in_up, viewport_config } from '@/lib/animations/config';

interface BooksSectionProps {
  book1: {
    videoPath?: string;
    imagePath: string;
    imageAlt: string;
    title: string;
    description: string;
  };
}

function Book1Media({
  videoPath,
  imagePath,
  imageAlt,
}: {
  videoPath?: string;
  imagePath: string;
  imageAlt: string;
}) {
  const [showImage, setShowImage] = useState(!videoPath);

  const mediaClasses = 'w-full h-full object-cover rounded-md';

  if (!videoPath) {
    return (
      <img
        src={imagePath}
        alt={imageAlt}
        className={`absolute inset-0 ${mediaClasses}`}
      />
    );
  }

  return (
    <>
      <img
        src={imagePath}
        alt={imageAlt}
        className={`absolute inset-0 ${mediaClasses} transition-opacity duration-500 ${
          showImage ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <video
        src={videoPath}
        autoPlay
        muted
        playsInline
        loop={false}
        onEnded={() => setShowImage(true)}
        className={`absolute inset-0 ${mediaClasses} transition-opacity duration-500 ${
          showImage ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label={imageAlt}
      />
    </>
  );
}

export function BooksSection({ book1 }: BooksSectionProps) {
  return (
    <section
      className="relative py-16 px-6 bg-gots-body"
      aria-label="Books section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={fade_in_up}
        >
          {/* Book 1 */}
          <article
            className="flex flex-col md:flex-row gap-6 p-6 rounded-lg border-2 border-gots-accent/30 bg-gots-charred overflow-hidden"
            aria-label={`${book1.title} - ${book1.description}`}
          >
            <div className="flex-shrink-0 relative w-full md:w-48 aspect-[3/4] rounded-md overflow-hidden bg-gots-dark">
              <Book1Media
                videoPath={book1.videoPath}
                imagePath={book1.imagePath}
                imageAlt={book1.imageAlt}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gots-accent mb-2">
                {book1.title}
              </h3>
              <p className="text-base md:text-lg text-gots-medium-gray drop-shadow-sm">
                {book1.description}
              </p>
            </div>
          </article>

          {/* Book 2 - Coming Soon */}
          <article
            className="flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed border-gots-accent/30 bg-gots-charred/50"
            aria-label="Book 2 coming soon"
          >
            <div className="aspect-[3/4] w-full max-w-[192px] rounded-md bg-gots-dark/80 flex items-center justify-center mb-4">
              <span className="text-6xl text-gots-accent/30">◆</span>
            </div>
            <h3 className="text-xl font-bold text-gots-accent/70 mb-2">
              Book 2
            </h3>
            <p className="text-base md:text-lg text-white drop-shadow-sm italic">
              Coming Soon
            </p>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
