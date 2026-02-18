import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { get_character_data } from '@/lib/data/characters';
import { get_scenes_for_character } from '@/lib/data/scenes';
import { asset_image_path } from '@/lib/asset-paths';

interface page_props {
  params: Promise<{ id: string }>;
}

export default async function character_detail_page({ params }: page_props) {
  const { id } = await params;
  const [character, scenes] = await Promise.all([
    get_character_data(id),
    get_scenes_for_character(id),
  ]);

  if (!character) notFound();

  const image_src = asset_image_path(character.image || '/images/characters/placeholder.png');

  return (
    <main className="min-h-screen bg-gots-body">
      <header className="bg-gradient-to-b from-gots-charred to-gots-dark py-16 px-6 text-center border-b-2 border-dashed border-gots-accent">
        <h1 className="text-5xl md:text-6xl font-bold text-gots-accent mb-4">{character.name}</h1>
        {character.alternative_names?.length ? (
          <p className="text-gots-secondary text-lg">
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
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex-grow">
            <p className="text-gots-secondary text-lg mb-6">
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

        {/* Scenes & Read Story */}
        <div className="mt-12 pt-8 border-t border-dashed border-gots-accent/30">
          <h2 className="text-2xl font-bold text-gots-accent mb-4">Scenes in the Story</h2>
          {scenes.length > 0 ? (
            <>
              <div className="space-y-3 mb-6">
                {scenes.map((scene) => (
                  <Link
                    key={scene.id}
                    href={`/story/${id}/${scene.id}`}
                    className="block p-4 bg-gots-charred rounded-lg border border-gots-accent/20 hover:border-gots-accent/40 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-gots-accent">{scene.title}</h3>
                        <p className="text-gots-medium-gray text-sm">{scene.preview}</p>
                      </div>
                      <span className="text-gots-accent font-semibold">Read →</span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={`/story/${id}`}
                className="inline-block px-6 py-3 rounded font-bold text-lg bg-gots-accent text-gots-black hover:bg-gots-accent-light transition-colors"
              >
                Start Reading {character.name}&apos;s Story →
              </Link>
            </>
          ) : (
            <p className="text-gots-secondary mb-4">
              Scene content for this character is coming soon.
            </p>
          )}
        </div>
      </section>

      <div className="mt-12 pt-8 border-t border-dashed border-gots-accent/30 text-center space-x-4">
        <Link
          href="/characters"
          className="inline-block px-4 py-2 rounded font-semibold transition-colors bg-gots-accent text-gots-black hover:bg-gots-accent-light"
        >
          ← All Characters
        </Link>
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded font-semibold transition-colors border border-gots-accent text-gots-accent hover:bg-gots-accent/20"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
