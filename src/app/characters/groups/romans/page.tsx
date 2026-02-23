import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { get_characters_by_group, BOOK_2_ONLY_IDS } from '@/lib/data/characters';
import { asset_image_path } from '@/lib/asset-paths';
import type { character_profile } from '@/lib/types/character';
import { Book2MembershipCTA } from '@/components/characters/Book2MembershipCTA';

function character_card(character: character_profile): ReactNode {
  const image_src = asset_image_path(character.image || '/images/characters/placeholder.png');
  const description = character.brief_description || character.full_description || 'No description available.';
  const isBook2Only = BOOK_2_ONLY_IDS.includes(character.id);

  if (isBook2Only) {
    return (
      <div key={character.id} className="relative rounded-lg overflow-hidden border border-gots-accent/20 h-96">
        <Image
          src={image_src}
          alt={character.name}
          fill
          className="object-contain object-center blur-md scale-110"
          unoptimized
        />
        <Book2MembershipCTA variant="card" characterName={character.name} />
      </div>
    );
  }

  const isZoomed = character.id === 'aquilus' || character.id === 'victor';

  return (
    <Link href={`/characters/${character.id}`} key={character.id}>
      <div className="relative bg-gots-charred hover:bg-gots-charred/80 rounded-lg overflow-hidden transition-all border border-gots-accent/20 hover:border-gots-accent/40 cursor-pointer group h-96">
        <Image
          src={image_src}
          alt={character.name}
          fill
          className={`transition-transform duration-300 group-hover:scale-105 ${
            isZoomed ? 'object-cover object-[50%_-30%] scale-[1.35]' : 'object-contain object-center'
          }`}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gots-charred/80 via-transparent to-gots-charred flex flex-col justify-between p-8">
          <h3 className="text-3xl font-bold text-gots-accent">{character.name}</h3>
          <div>
            <p className="text-gots-primary mb-4 line-clamp-2">{description}</p>
            <span className="text-gots-accent hover:text-gots-accent-light font-semibold text-sm">
              View Profile →
            </span>
          </div>
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
      <header className="relative border-b-2 border-dashed border-gots-accent overflow-hidden min-h-[280px] md:min-h-[360px]">
        <div className="absolute inset-0">
          <Image
            src="/images/Hero_images/Romans_header.png"
            alt=""
            fill
            className="object-cover object-[center_25%]"
            priority
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gots-charred via-gots-charred/60 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end min-h-[280px] md:min-h-[360px] px-6 py-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gots-accent mb-4 drop-shadow-lg">Romans</h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-sm">
            The forces of Rome—soldiers, commanders, and officials whose paths intersect with the divine.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {characters.map((c) => character_card(c))}
        </div>
      </section>

      <div className="mt-12 pt-8 border-t border-dashed border-gots-accent/30 text-center space-x-4">
        <Link href="/characters" className="inline-block px-4 py-2 rounded font-semibold bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black">
          ← All Character Profiles
        </Link>
        <Link href="/" className="inline-block px-4 py-2 rounded font-semibold bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
