'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { asset_image_path } from '@/lib/asset-paths';
import { fade_in_up, scale_in, viewport_config, stagger_container } from '@/lib/animations/config';

interface CharacterTeaser {
  id: string;
  name: string;
  role: string;
  quote?: string;
  description?: string;
  imageUrl?: string;
  path: string;
}

interface CharacterTeaserSectionProps {
  characters: CharacterTeaser[];
}

export function CharacterTeaserSection({ characters }: CharacterTeaserSectionProps) {

  return (
    <section
      className="py-24 px-6 bg-gots-charred"
      aria-label="Character introduction section"
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
            Character Profiles by Group or Name
          </h2>
          <p className="text-lg text-gots-content max-w-2xl mx-auto">
            Follow the journeys of those who discover grace in the darkest moments —{' '}
            <Link href="/characters/groups/romans" className="text-gots-accent hover:text-gots-accent-light underline transition-colors">Romans</Link>
            {', '}
            <Link href="/characters/groups/followers" className="text-gots-accent hover:text-gots-accent-light underline transition-colors">Followers</Link>
            {', '}
            <Link href="/characters/groups/sanhedrin" className="text-gots-accent hover:text-gots-accent-light underline transition-colors">Sanhedrin</Link>
            , and more
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={stagger_container}
        >
          {characters.map((character) => (
            <Link key={character.id} href={character.path}>
            <motion.article
              variants={scale_in}
              className="relative overflow-hidden rounded-lg border-2 border-gots-accent/50 bg-gots-charred hover:border-gots-accent transition-colors cursor-pointer group"
              role="article"
              aria-label={`Character card for ${character.name}`}
            >
              <div className="relative w-full h-96 overflow-hidden bg-gots-dark">
                  <img
                    src={asset_image_path(character.imageUrl)}
                    alt={`${character.name}, ${character.role}`}
                    className="w-full h-full object-cover object-top transition-all duration-300 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-gots-charred opacity-95 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-gots-accent mb-1 group-hover:text-gots-accent-light transition-colors">
                      {character.name}
                    </h3>
                    <p className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider">
                      {character.role}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                  {character.quote && (
                    <p className="text-sm italic text-gots-content mb-2 line-clamp-2">
                      &quot;{character.quote}&quot;
                    </p>
                  )}
                  {character.description && (
                    <p className="text-xs text-gots-medium-gray mb-4 leading-relaxed">
                      {character.description}
                    </p>
                  )}
                  <span className="inline-flex items-center text-gots-accent hover:text-gots-accent-light transition-colors duration-200 text-sm font-semibold">
                    Follow Their Journey
                    <span className="ml-2" aria-hidden="true">→</span>
                  </span>
                  </div>
                </div>

              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gots-accent/30 group-hover:border-gots-accent transition-colors" />
            </motion.article>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
