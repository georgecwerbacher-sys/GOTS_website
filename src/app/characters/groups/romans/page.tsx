import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { get_characters_by_group } from '@/lib/data/characters';
import { asset_image_path } from '@/lib/asset-paths';
import type { character_profile } from '@/lib/types/character';

function character_card(character: character_profile): ReactNode {
  const image_src = asset_image_path(character.image || '/images/characters/placeholder.png');
  return (
    <Link href={`/characters/${character.id}`} key={character.id}>
      <div className="bg-gots-charred hover:bg-gots-charred/80 rounded-lg overflow-hidden transition-all border border-gots-accent/20 hover:border-gots-accent/40 cursor-pointer group">
        <div className="relative h-64 bg-gots-dark flex items-center justify-center">
          <Image
            src={image_src}
            alt={character.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gots-accent mb-2">{character.name}</h3>
          <p className="text-gots-content text-sm line-clamp-2">
            {character.brief_description || character.full_description || 'No description available.'}
          </p>
          <span className="text-gots-accent font-semibold text-sm mt-2 block">View Profile →</span>
        </div>
      </div>
    </Link>
  );
}

export default async function romans_group_page(): Promise<ReactNode> {
  const groups = await get_characters_by_group();
  const characters = groups['Romans'] || [];

  return (
    <main className="min-h-screen bg-gots-body">
      <header className="bg-gradient-to-b from-gots-charred to-gots-dark py-16 px-6 text-center border-b-2 border-dashed border-gots-accent">
        <h1 className="text-5xl md:text-6xl font-bold text-gots-accent mb-4">Romans</h1>
        <p className="text-xl text-white max-w-2xl mx-auto">
          The forces of Rome—soldiers, commanders, and officials whose paths intersect with the divine.
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((c) => character_card(c))}
        </div>
      </section>

      <div className="mt-12 pt-8 border-t border-dashed border-gots-accent/30 text-center space-x-4">
        <Link href="/characters" className="inline-block px-4 py-2 rounded font-semibold bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black">
          ← All Characters
        </Link>
        <Link href="/" className="inline-block px-4 py-2 rounded font-semibold bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
