'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { asset_image_path } from '@/lib/asset-paths';
import { fade_in_up, scale_in, viewport_config, stagger_container } from '@/lib/animations/config';

interface LocationTeaser {
  id: string;
  name: string;
  region: string;
  description: string;
  significance?: string;
  imageUrl?: string;
  path: string;
}

interface LocationTeaserSectionProps {
  locations: LocationTeaser[];
}

export function LocationTeaserSection({ locations }: LocationTeaserSectionProps) {
  return (
    <section
      className="py-24 px-6 bg-gots-charred"
      aria-label="Locations introduction section"
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
            Visit the Locations
          </h2>
          <p className="text-lg text-gots-content max-w-2xl mx-auto">
            Explore the places where the story unfolds—from the Judean desert to the streets of Jerusalem
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={viewport_config}
          variants={stagger_container}
        >
          {locations.map((location) => (
            <Link key={location.id} href={location.path}>
            <motion.article
              variants={scale_in}
              className="relative overflow-hidden rounded-lg border-2 border-gots-accent/50 bg-gots-charred hover:border-gots-accent transition-colors cursor-pointer group"
              role="article"
              aria-label={`Location card for ${location.name}`}
            >
                <div className="relative w-full h-96 overflow-hidden bg-gots-dark">
                  {location.imageUrl ? (
                    <Image
                      src={asset_image_path(location.imageUrl)}
                      alt={`${location.name}, ${location.region}`}
                      fill
                      className="object-cover object-center transition-all duration-300 group-hover:brightness-110"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gots-dark" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-gots-charred opacity-95 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-0 left-0 right-0 p-6">
                    <p className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-1">
                      {location.region}
                    </p>
                    <h3 className="text-2xl font-bold text-gots-accent group-hover:text-gots-accent-light transition-colors">
                      {location.name}
                    </h3>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs text-gots-medium-gray mb-4 leading-relaxed line-clamp-3">
                      {location.description}
                    </p>
                    <span className="inline-flex items-center text-gots-accent group-hover:text-gots-accent-light transition-colors duration-200 text-sm font-semibold">
                      Explore Location
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
