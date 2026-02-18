'use client';

import { motion } from 'framer-motion';
import type { StoryThread } from '@/lib/types/content.types';
import { fade_in_up, scale_in, viewport_config, stagger_container } from '@/lib/animations/config';

interface StoryThreadsSectionProps {
  threads: StoryThread[];
}

export function StoryThreadsSection({ threads }: StoryThreadsSectionProps) {
  const centralThread = threads.find((t) => t.id === 'grace-vs-predation');
  const connectedThreads = threads.filter((t) => t.id !== 'grace-vs-predation');

  return (
    <section
      className="py-24 px-6 bg-gots-body"
      aria-label="Story threads and narrative connections section"
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
            The Narrative Tapestry
          </h2>
          <p className="text-lg text-gots-secondary max-w-2xl mx-auto">
            Explore how themes interweave to create the story&apos;s meaning
          </p>
        </motion.header>

        {centralThread && (
          <motion.div
            className="mb-24 flex justify-center"
            initial="initial"
            whileInView="animate"
            viewport={viewport_config}
            variants={scale_in}
          >
            <article
              className="relative w-full max-w-sm p-12 rounded-lg border-2 border-gots-accent bg-gradient-to-br from-gots-accent/10 to-gots-charred text-center shadow-lg group hover:shadow-gots-accent/20 transition-all"
              role="article"
              aria-label="Central theme"
            >
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gots-accent/50 group-hover:border-gots-accent transition-colors" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gots-accent/50 group-hover:border-gots-accent transition-colors" />
              <h3 className="text-3xl md:text-4xl font-bold text-gots-accent mb-4 group-hover:text-gots-accent-light transition-colors">
                {centralThread.title}
              </h3>
              <p className="text-gots-secondary text-lg">
                {centralThread.description}
              </p>
            </article>
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={stagger_container}
        >
          {connectedThreads.map((thread) => (
            <motion.article
              key={thread.id}
              variants={scale_in}
              className="relative p-6 rounded-lg border-2 border-gots-accent/50 bg-gots-charred hover:border-gots-accent hover:bg-gots-charred/80 transition-all duration-300 group"
              role="article"
              aria-label={`Story thread: ${thread.title}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-gots-accent to-transparent rounded-lg transition-opacity" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gots-accent mb-2 group-hover:text-gots-accent-light transition-colors">
                  {thread.title}
                </h3>
                <p className="text-sm text-gots-secondary mb-4">
                  {thread.description}
                </p>
                {thread.connections.length > 0 && (
                  <details className="text-xs text-gots-medium-gray group/details">
                    <summary className="cursor-pointer text-gots-accent hover:text-gots-accent-light transition-colors font-semibold">
                      Connected to ({thread.connections.length})
                    </summary>
                    <ul className="mt-3 space-y-2 pl-6 border-l-2 border-gots-accent/30">
                      {thread.connections.map((connId) => (
                        <li key={connId} className="text-gots-medium-gray text-xs">
                          <span className="text-gots-accent">◆</span>{' '}
                          {threads.find((t) => t.id === connId)?.title}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
