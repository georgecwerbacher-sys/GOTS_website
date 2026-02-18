import { notFound } from 'next/navigation';
import Link from 'next/link';
import { get_character_data } from '@/lib/data/characters';
import { get_scene_by_id } from '@/lib/data/scenes';

interface page_props {
  params: Promise<{ characterId: string; sceneId: string }>;
}

export default async function scene_reader_page({ params }: page_props) {
  const { characterId, sceneId } = await params;
  const [character, scene] = await Promise.all([
    get_character_data(characterId),
    get_scene_by_id(sceneId),
  ]);

  if (!character || !scene) notFound();

  const content = scene.sceneContents[0];
  if (!content) notFound();

  return (
    <main className="min-h-screen bg-gots-body">
      <header className="border-b border-gots-accent/30 py-6 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-gots-medium-gray text-sm mb-1">
            Part {scene.partNumber}, Scene {scene.sceneNumber} • {scene.themes}
          </p>
          <h1 className="text-3xl font-bold text-gots-accent mb-2">{scene.title}</h1>
          <p className="text-gots-secondary">{scene.preview}</p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-12">
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-gots-accent prose-p:text-gots-secondary
            prose-p:leading-relaxed prose-p:mb-6
            [&_p]:whitespace-pre-wrap"
        >
          {content.content.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <nav className="max-w-3xl mx-auto px-6 py-8 border-t border-gots-accent/30 flex justify-between items-center">
        <Link
          href={`/story/${characterId}`}
          className="px-4 py-2 rounded font-semibold bg-gots-accent text-gots-black hover:bg-gots-accent-light"
        >
          ← All Scenes
        </Link>
        <Link
          href={`/characters/${characterId}`}
          className="px-4 py-2 rounded font-semibold border border-gots-accent text-gots-accent hover:bg-gots-accent/20"
        >
          {character.name} Profile
        </Link>
      </nav>
    </main>
  );
}
