import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { get_character_data } from '@/lib/data/characters';
import { asset_image_path } from '@/lib/asset-paths';

interface page_props {
  params: Promise<{ id: string }>;
}

export default async function character_detail_page({ params }: page_props) {
  const { id } = await params;
  const character = await get_character_data(id);

  if (!character) notFound();

  const image_src = asset_image_path(character.image || '/images/characters/placeholder.png');

  return (
    <main className="min-h-screen bg-gots-body">
      <header className="bg-gradient-to-b from-gots-charred to-gots-dark py-16 px-6 text-center border-b-2 border-dashed border-gots-accent">
        <h1 className="text-5xl md:text-6xl font-bold text-gots-accent mb-4">{character.name}</h1>
        {character.alternative_names?.length ? (
          <p className="text-gots-content text-lg">
            Also known as: {character.alternative_names.join(', ')}
          </p>
        ) : null}
      </header>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-full md:w-80 h-96 bg-gots-charred rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={image_src}
              alt={character.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-grow">
            <p className="text-gots-medium-gray text-lg mb-6">
              {character.full_description || character.brief_description || 'No description available.'}
            </p>
            {character.occupation ? (
              <p className="text-gots-medium-gray mb-2">
                <span className="text-gots-accent font-semibold">Occupation:</span> {character.occupation}
              </p>
            ) : null}
            {character.origin ? (
              <p className="text-gots-medium-gray mb-2">
                <span className="text-gots-accent font-semibold">Origin:</span> {character.origin}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mt-12 pt-8 border-t border-dashed border-gots-accent/30 text-center space-x-4">
        <Link
          href="/characters"
          className="inline-block px-4 py-2 rounded font-semibold transition-colors bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black"
        >
          ← All Characters
        </Link>
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
