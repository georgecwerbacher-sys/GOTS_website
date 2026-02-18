'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { CallToActionPath } from '@/lib/types/content.types';
import { fade_in_up, scale_in, viewport_config, stagger_container } from '@/lib/animations/config';

interface CallToActionSectionProps {
  paths: CallToActionPath[];
}

export function CallToActionSection({ paths }: CallToActionSectionProps) {
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
            Choose Your Perspective
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
            </motion.div>
          ))}
        </motion.div>

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
