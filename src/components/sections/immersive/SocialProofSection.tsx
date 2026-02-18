'use client';

import { motion } from 'framer-motion';
import type { Testimonial } from '@/lib/types/testimonial.types';
import { fade_in_up, scale_in, viewport_config, stagger_container } from '@/lib/animations/config';

interface SocialProofSectionProps {
  testimonials: Testimonial[];
}

export function SocialProofSection({ testimonials }: SocialProofSectionProps) {
  return (
    <section
      className="py-24 px-6 bg-gots-body"
      aria-label="Reader testimonials and social proof section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.header
          className="mb-16 text-center"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={fade_in_up}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gots-accent mb-4">
            Readers Are Discovering
          </h2>
          <p className="text-lg text-gots-secondary max-w-2xl mx-auto">
            What early readers are saying about their experience
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={stagger_container}
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.id}
              variants={scale_in}
              className="relative p-6 rounded-lg border-2 border-gots-accent/50 bg-gots-charred hover:border-gots-accent hover:bg-gots-charred/80 transition-all duration-300 group"
              role="article"
              aria-label={`Testimonial from ${testimonial.author}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-gots-accent to-transparent rounded-lg transition-opacity" />
              <div className="relative z-10">
                {testimonial.rating && (
                  <div
                    className="flex mb-4 gap-1"
                    aria-label={`Rating: ${testimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg transition-colors ${
                          i < testimonial.rating!
                            ? 'text-gots-accent'
                            : 'text-gots-accent/30'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
                <blockquote className="mb-4">
                  <p className="text-gots-secondary italic text-base leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </blockquote>
                {testimonial.highlight && (
                  <div className="mb-4 p-3 rounded bg-gots-accent/10 border-l-2 border-gots-accent">
                    <p className="text-xs text-gots-accent font-semibold">
                      Favorite moment
                    </p>
                    <p className="text-xs text-gots-secondary mt-1">
                      {testimonial.highlight}
                    </p>
                  </div>
                )}
                <footer className="border-t border-gots-accent/20 pt-4 mt-4">
                  <p className="font-semibold text-gots-accent group-hover:text-gots-accent-light transition-colors">
                    {testimonial.author}
                  </p>
                  {testimonial.role && (
                    <p className="text-xs text-gots-medium-gray mt-1">
                      {testimonial.role}
                    </p>
                  )}
                </footer>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
