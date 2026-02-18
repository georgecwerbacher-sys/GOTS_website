'use client';

import { motion } from 'framer-motion';
import type { AtmosphereLayer } from '@/lib/types/content.types';
import { fade_in_up, viewport_config } from '@/lib/animations/config';

interface AtmosphereSectionProps {
  layers: AtmosphereLayer[];
}

export function AtmosphereSection({ layers }: AtmosphereSectionProps) {
  return (
    <section
      className="relative py-24 px-6 bg-gots-body"
      aria-label="Atmospheric context section"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="sr-only">Story Context</h2>

        {layers.map((layer, index) => (
          <motion.article
            key={layer.id}
            className="mb-20 last:mb-0"
            initial="initial"
            whileInView="animate"
            viewport={viewport_config}
            variants={fade_in_up}
            transition={{ delay: index * 0.1 }}
          >
            {layer.imageUrl && (
              <div
                className="mb-8 rounded-lg overflow-hidden aspect-video bg-gots-charred border-2 border-gots-accent/30"
                style={{
                  backgroundImage: `url(${layer.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                role="img"
                aria-label={`Background imagery for: ${layer.text.substring(0, 50)}`}
              />
            )}

            <div className="relative">
              <div
                className="absolute -left-6 top-0 bottom-0 w-1 bg-gots-accent/30"
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl leading-relaxed text-gots-secondary pl-4 italic font-light">
                {layer.text}
              </p>
            </div>

            {index < layers.length - 1 && (
              <div
                className="mt-12 flex items-center gap-4"
                aria-hidden="true"
              >
                <div className="flex-1 h-px bg-gradient-to-r from-gots-accent/50 via-gots-accent/20 to-transparent" />
                <div className="text-gots-accent text-xs font-semibold opacity-50">◆</div>
                <div className="flex-1 h-px bg-gradient-to-l from-gots-accent/50 via-gots-accent/20 to-transparent" />
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
