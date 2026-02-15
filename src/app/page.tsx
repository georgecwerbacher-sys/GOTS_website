import { ReactNode } from 'react';
import Link from 'next/link';
import { HeaderVideo } from '@/components/layout/header_video';

export default async function homepage(): Promise<ReactNode> {
  return (
    <main className="min-h-screen bg-gots-body">
      {/* Hero Section with Header Video */}
      <HeaderVideo
        video_path="/video/headers/Home_Page/Home_Header"
        poster_path="/video/headers/Home_Page/Home_Header_Poster.png"
        alt_text="Guardians of the Spear home page header video"
      />
      <header className="bg-gradient-to-b from-gots-charred to-gots-dark py-16 px-6 text-center border-b-2 border-dashed border-gots-accent">
        <h1 className="text-5xl md:text-6xl font-bold text-gots-accent mb-4">
          Guardians of the Spear
        </h1>
        <p className="text-xl text-gots-secondary max-w-2xl mx-auto mb-2">
          A story of grace defeating predation
        </p>
        <p className="text-gots-medium-gray">
          Discover the characters and follow their journeys through the narrative
        </p>
      </header>

      {/* Navigation buttons */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <Link href="/characters">
            <button className="w-full bg-gots-accent hover:bg-gots-accent-light text-gots-black py-4 px-8 rounded-lg font-bold text-xl transition-colors">
              Characters →
            </button>
          </Link>
          <Link href="/groups">
            <button className="w-full bg-gots-accent hover:bg-gots-accent-light text-gots-black py-4 px-8 rounded-lg font-bold text-xl transition-colors">
              Groups →
            </button>
          </Link>
          <Link href="/locations">
            <button className="w-full bg-gots-accent hover:bg-gots-accent-light text-gots-black py-4 px-8 rounded-lg font-bold text-xl transition-colors">
              Locations →
            </button>
          </Link>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-dashed border-gots-accent/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gots-medium-gray text-sm">
          <div>
            <h3 className="font-bold text-gots-accent mb-2">About</h3>
            <p className="text-gots-secondary">A novel of spiritual transformation in occupied Judaea.</p>
          </div>
          <div>
            <h3 className="font-bold text-gots-accent mb-2">Structure</h3>
            <p className="text-gots-secondary">Part 1: The Hidden Witness (Chapters 1-12)</p>
            <p className="text-xs mt-1 text-gots-medium-gray">Parts 2-3 coming soon</p>
          </div>
          <div>
            <h3 className="font-bold text-gots-accent mb-2">How to Read</h3>
            <p className="text-gots-secondary">Select a character above to follow their journey through the story.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
