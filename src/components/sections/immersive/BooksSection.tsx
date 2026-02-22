'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fade_in_up, viewport_config } from '@/lib/animations/config';

interface BookData {
  videoPath?: string;
  imagePath: string;
  imageAlt: string;
  title: string;
  description: string;
  buyUrl?: string;
  buttonText?: string;
  priceLabel?: string;
  releaseDate?: string;
}

interface BooksSectionProps {
  book1: BookData;
  book2?: BookData;
}

function BookMedia({
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

export function BooksSection({ book1, book2 }: BooksSectionProps) {
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
              <BookMedia
                videoPath={book1.videoPath}
                imagePath={book1.imagePath}
                imageAlt={book1.imageAlt}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gots-accent mb-2">
                {book1.title}
              </h3>
              <p className="text-base md:text-lg text-gots-medium-gray drop-shadow-sm mb-4">
                {book1.description}
              </p>
              <p className="text-gots-medium-gray text-sm mb-4">
                $5.99 ebook · $14.99 soft cover
              </p>
            </div>
          </article>

          {/* Book 2 */}
          {book2 && (
            <article
              className="flex flex-col md:flex-row gap-6 p-6 rounded-lg border-2 border-gots-accent/30 bg-gots-charred relative"
              aria-label={`${book2.title} - ${book2.description}`}
            >
              {book2.releaseDate && (
                <div className="absolute top-0 left-0 z-20 overflow-visible">
                  <div className="bg-gots-accent text-gots-black px-6 py-1.5 text-sm font-bold tracking-wider uppercase rotate-12 -translate-x-2 -translate-y-1 shadow-lg">
                    {book2.releaseDate}
                  </div>
                </div>
              )}
              <div className="flex-shrink-0 relative w-full md:w-48 aspect-[3/4] rounded-md overflow-hidden bg-gots-dark">
                <BookMedia
                  videoPath={book2.videoPath}
                  imagePath={book2.imagePath}
                  imageAlt={book2.imageAlt}
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gots-accent mb-2">
                  {book2.title}
                </h3>
                <p className="text-base md:text-lg text-gots-medium-gray drop-shadow-sm mb-4">
                  {book2.description}
                </p>
                <p className="text-gots-medium-gray text-sm mb-4">
                  {book2.priceLabel ? `${book2.priceLabel} — $5.99 ebook · $14.99 soft cover` : '$5.99 ebook · $14.99 soft cover'}
                </p>
              </div>
            </article>
          )}
        </motion.div>

        {/* Combined CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={fade_in_up}
        >
          {book1.buyUrl && (
            <a
              href={book1.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-amber-700 hover:bg-amber-600 !text-black font-semibold tracking-widest uppercase transition-colors duration-300"
            >
              {book1.buttonText || 'Buy Book 1 on Kindle'}
            </a>
          )}
          {book2?.buyUrl && (
            <a
              href={book2.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border-2 border-amber-700 hover:bg-amber-700 text-amber-700 hover:text-white font-semibold tracking-widest uppercase transition-colors duration-300"
            >
              {book2.buttonText || 'Pre-Order Book 2'}
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
