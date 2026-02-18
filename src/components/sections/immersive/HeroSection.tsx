'use client';

import { motion } from 'framer-motion';
import { fade_in_up, stagger_container } from '@/lib/animations/config';
import { HeaderVideo } from '../../layout';

interface HeroSectionProps {
  videoPath: string;
  posterPath: string;
  altText: string;
  title: string;
  subtitle: string;
  description: string;
}

export function HeroSection({
  videoPath,
  posterPath,
  altText,
  title,
  subtitle,
  description,
}: HeroSectionProps) {
  return (
    <section
      className="relative min-h-screen bg-gots-body overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 z-0">
        <HeaderVideo
          video_path={videoPath}
          poster_path={posterPath}
          alt_text={altText}
          full_screen
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 z-10 pointer-events-none" />

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6 py-20">
        <motion.header
          className="text-center max-w-4xl"
          initial="initial"
          animate="animate"
          variants={stagger_container}
        >
          <motion.h1
            variants={fade_in_up}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gots-accent mb-6 drop-shadow-lg"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fade_in_up}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gots-medium-gray max-w-2xl mx-auto mb-4 drop-shadow-sm"
          >
            {subtitle}
          </motion.p>
          <motion.p
            variants={fade_in_up}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-gots-medium-gray max-w-2xl mx-auto drop-shadow-sm"
          >
            {description}
          </motion.p>
        </motion.header>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-12 z-30 text-gots-accent text-sm font-semibold"
          aria-hidden="true"
        >
          <span className="block">Scroll to explore</span>
          <div className="text-center mt-2">↓</div>
        </motion.div>
      </div>
    </section>
  );
}
