'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fade_in_up, viewport_config } from '@/lib/animations/config';

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-gots-black border-t-2 border-dashed border-gots-accent"
      role="contentinfo"
      initial="initial"
      whileInView="animate"
      viewport={viewport_config}
      variants={fade_in_up}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <section aria-labelledby="footer-about-heading">
            <h3
              id="footer-about-heading"
              className="font-bold text-gots-accent mb-4 text-lg"
            >
              About GOTS
            </h3>
            <p className="text-gots-content text-sm leading-relaxed">
              A novel of spiritual transformation in occupied Judaea, exploring grace,
              faith, and the power of human connection.
            </p>
          </section>

          <section aria-labelledby="footer-copyright-heading">
            <h3
              id="footer-copyright-heading"
              className="font-bold text-gots-accent mb-4 text-lg"
            >
              Copyright
            </h3>
            <p className="text-gots-content text-sm leading-relaxed">
              All images, text, and audio on this site are protected by copyright and may not be reproduced, distributed, or used without permission.
            </p>
          </section>

          <section aria-labelledby="footer-nav-heading">
            <h3
              id="footer-nav-heading"
              className="font-bold text-gots-accent mb-4 text-lg"
            >
              Explore
            </h3>
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gots-content hover:text-gots-accent transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/author" className="text-gots-content hover:text-gots-accent transition-colors">
                    Author
                  </Link>
                </li>
                <li>
                  <Link href="/characters" className="text-gots-content hover:text-gots-accent transition-colors">
                    Characters
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="text-gots-content hover:text-gots-accent transition-colors">
                    Locations
                  </Link>
                </li>
                <li>
                  <Link href="/timeline" className="text-gots-content hover:text-gots-accent transition-colors">
                    Timeline
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        </div>

        <div className="pt-8 border-t border-gots-accent/30 text-center">
          <p className="text-gots-medium-gray text-sm">
            © {currentYear} Guardians of the Spear. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
