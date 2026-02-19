'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { CallToActionPath } from '@/lib/types/content.types';
import { fade_in_up, scale_in, viewport_config, stagger_container } from '@/lib/animations/config';

interface CallToActionSectionProps {
  paths: CallToActionPath[];
}

function BuyBookModal({
  isOpen,
  onClose,
  buyUrl,
  buttonText,
}: {
  isOpen: boolean;
  onClose: () => void;
  buyUrl: string;
  buttonText: string;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Buy Book 1 on Kindle"
    >
      <div
        className="relative bg-gots-charred border-2 border-gots-accent rounded-lg p-8 max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gots-content hover:text-gots-accent text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-2xl font-bold text-gots-accent mb-4">Read the Story</h3>
        <p className="text-gots-content mb-6">
          Get the full experience with Book 1: Guardians of the Spear: The Awakening.
        </p>
        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center px-8 py-4 bg-gots-accent hover:bg-gots-accent-light !text-black font-semibold tracking-widest uppercase transition-colors duration-300 rounded"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export function CallToActionSection({ paths }: CallToActionSectionProps) {
  const [buyModalPath, setBuyModalPath] = useState<CallToActionPath | null>(null);

  return (
    <section
      className="py-24 px-6 bg-gots-charred"
      aria-label="Call to action section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.header
          className="mb-20 text-center"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={fade_in_up}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gots-accent mb-4">
            Enhance Your Journey by Becoming a Member
          </h2>
          <p className="text-lg text-gots-content max-w-2xl mx-auto">
            How would you like to enter the world of Guardians of the Spear?
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={stagger_container}
        >
          {paths.map((path) => (
            <motion.div key={path.id} variants={scale_in}>
              {path.buyUrl && path.buyButtonText ? (
                <button
                  type="button"
                  onClick={() => setBuyModalPath(path)}
                  className="block w-full group relative p-8 rounded-lg border-2 border-gots-accent bg-gots-charred hover:bg-gots-accent text-gots-accent hover:text-gots-black font-bold transition-all duration-300 overflow-hidden text-left"
                  aria-label={`${path.label}: ${path.description}`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gots-accent transition-opacity" />
                  <div className="relative flex flex-col items-center">
                    {path.icon && (
                      <span className="text-4xl mb-3">{path.icon}</span>
                    )}
                    <span className="text-xl font-bold">{path.label}</span>
                    <span className="text-sm font-normal mt-2 text-gots-content group-hover:text-gots-black/70 transition-colors">
                      {path.description}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gots-accent-light" />
                </button>
              ) : (
                <Link
                  href={path.href}
                  className="block w-full group relative p-8 rounded-lg border-2 border-gots-accent bg-gots-charred hover:bg-gots-accent text-gots-accent hover:text-gots-black font-bold transition-all duration-300 overflow-hidden"
                  aria-label={`${path.label}: ${path.description}`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gots-accent transition-opacity" />
                  <div className="relative flex flex-col items-center">
                    {path.icon && (
                      <span className="text-4xl mb-3">{path.icon}</span>
                    )}
                    <span className="text-xl font-bold">{path.label}</span>
                    <span className="text-sm font-normal mt-2 text-gots-content group-hover:text-gots-black/70 transition-colors">
                      {path.description}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gots-accent-light" />
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        {buyModalPath?.buyUrl && buyModalPath?.buyButtonText && (
          <BuyBookModal
            isOpen={!!buyModalPath}
            onClose={() => setBuyModalPath(null)}
            buyUrl={buyModalPath.buyUrl}
            buttonText={buyModalPath.buyButtonText}
          />
        )}

        <motion.p
          className="text-center text-gots-medium-gray text-sm italic"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={fade_in_up}
        >
          Not sure where to start? Each path offers a unique perspective on the story.
        </motion.p>
      </div>
    </section>
  );
}
