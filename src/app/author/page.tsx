import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Author',
  description:
    'George Charles Werbacher — Senior Engineer, artist, and author of Guardians of the Spear. Historical fiction that resurrects first-century Jerusalem.',
  alternates: {
    canonical: `${siteUrl}/author`,
  },
};

export default function author_page(): ReactNode {
  return (
    <main className="min-h-screen bg-gots-body">
      <header className="relative border-b-2 border-dashed border-gots-accent overflow-hidden min-h-[280px] md:min-h-[360px]">
        <div className="absolute inset-0">
          <Image
            src="/images/Hero_images/author_header.png"
            alt=""
            fill
            className="object-cover object-[center_25%]"
            priority
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gots-charred via-gots-charred/60 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end min-h-[280px] md:min-h-[360px] px-6 py-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gots-accent mb-4 drop-shadow-lg">
            George Charles Werbacher
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto italic drop-shadow-sm">
            doesn&apos;t write history — he resurrects it.
          </p>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-6 text-gots-content text-lg leading-relaxed">
          <p>
            Born in Perth Amboy, New Jersey in 1968, Werbacher is a Senior Engineer with the Department of Defense and an artist who teaches the techniques of the Old Masters. Two disciplines. One obsession: the details others overlook.
          </p>
          <p>
            That obsession drives his fiction.
          </p>
          <p>
            <em>Guardians of the Spear</em> grew from a lifelong hunger to understand not just what happened in history, but how people actually lived it — the weight of a Roman soldier&apos;s armor, the politics of a Jerusalem marketplace, the fear of a servant who witnessed the impossible. He digs into the historical record, then asks the question no record can answer: <em>what if?</em>
          </p>
          <p>
            Beneath every choice he makes as a writer runs a single current — free will. How do the people we meet, the places we inhabit, and the moments we cannot escape reshape the paths we thought were our own? In first-century Jerusalem, that question cuts to the bone.
          </p>
          <p>
            <em>Guardians of the Spear</em> is his debut novel.
          </p>
          <div className="pt-8 border-t border-gots-accent/30">
            <p className="font-semibold text-gots-accent mb-2">Contact George at:</p>
            <a
              href="mailto:GeorgecWerbacher@gmail.com"
              className="text-gots-accent hover:text-gots-accent-light transition-colors underline underline-offset-2"
            >
              GeorgecWerbacher@gmail.com
            </a>
          </div>
        </div>
      </section>

      <div className="mt-12 pt-8 border-t border-dashed border-gots-accent/30 text-center">
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded font-semibold transition-colors bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
