import { notFound } from 'next/navigation';
import Link from 'next/link';
import { get_character_data } from '@/lib/data/characters';
import { get_scenes_for_character } from '@/lib/data/scenes';
import { asset_image_path } from '@/lib/asset-paths';

interface page_props {
  params: Promise<{ characterId: string }>;
}

export default async function story_character_page({ params }: page_props) {
  const { characterId } = await params;
  const [character, scenes] = await Promise.all([
    get_character_data(characterId),
    get_scenes_for_character(characterId),
  ]);

  if (!character) notFound();
  if (scenes.length === 0) {
    return (
      <main className="min-h-screen bg-gots-body">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-gots-accent mb-4">
            {character.name}&apos;s Story
          </h1>
          <p className="text-gots-secondary mb-8">
            Scene content for this character is not yet available. Check back soon.
          </p>
          <Link
            href={`/characters/${characterId}`}
            className="inline-block px-4 py-2 rounded font-semibold bg-gots-accent text-gots-black hover:bg-gots-accent-light"
          >
            ← Back to Character
          </Link>
        </div>
      </main>
    );
  }

  const first_scene = scenes[0];
  return (
    <main className="min-h-screen bg-gots-body">
      <header className="bg-gradient-to-b from-gots-charred to-gots-dark py-12 px-6 text-center border-b-2 border-dashed border-gots-accent">
        <h1 className="text-4xl font-bold text-gots-accent mb-2">{character.name}&apos;s Journey</h1>
        <p className="text-gots-secondary">
          {scenes.length} scene{scenes.length !== 1 ? 's' : ''} in the story
        </p>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {scenes.map((scene, idx) => (
            <Link
              key={scene.id}
              href={`/story/${characterId}/${scene.id}`}
              className="block p-6 bg-gots-charred rounded-lg border border-gots-accent/20 hover:border-gots-accent/40 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gots-accent mb-2">{scene.title}</h2>
                  <p className="text-gots-secondary text-sm mb-2">{scene.preview}</p>
                  <p className="text-gots-medium-gray text-xs">
                    Part {scene.partNumber}, Scene {scene.sceneNumber} • {scene.readingTimeMinutesTotal} min read
                  </p>
                </div>
                <span className="text-gots-accent font-semibold">Read →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/characters/${characterId}`}
            className="inline-block px-4 py-2 rounded font-semibold border border-gots-accent text-gots-accent hover:bg-gots-accent/20"
          >
            ← Back to {character.name}
          </Link>
        </div>
      </section>
    </main>
  );
}
