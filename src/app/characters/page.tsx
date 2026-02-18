import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { get_characters_by_group } from '@/lib/data/characters';

interface character_group_card_props {
  group_name: string;
  character_count: number;
  description: string;
  link: string;
  image_path?: string;
}

function character_group_card({
  group_name,
  character_count,
  description,
  link,
  image_path
}: character_group_card_props): ReactNode {
  if (image_path) {
    return (
      <Link href={link}>
        <div className="relative bg-gots-charred hover:bg-gots-charred/80 rounded-lg overflow-hidden transition-all border border-gots-accent/20 hover:border-gots-accent/40 cursor-pointer group h-96">
          {/* Poster Image */}
          <Image
            src={image_path}
            alt={`${group_name} characters`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
            unoptimized
          />
          
          {/* Overlay with content */}
          <div className="absolute inset-0 bg-gradient-to-t from-gots-charred via-gots-charred/60 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-3xl font-bold text-gots-accent mb-3">{group_name}</h2>
            <p className="text-gots-primary mb-4">{description}</p>
            <div className="mt-auto">
              <p className="text-sm text-gots-light-gold mb-2">
                {character_count} {character_count === 1 ? 'character' : 'characters'}
              </p>
              <span className="text-gots-accent hover:text-gots-accent-light font-semibold text-sm">
                View {group_name} →
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={link}>
      <div className="bg-gots-charred hover:bg-gots-charred/80 rounded-lg p-8 transition-all border border-gots-accent/20 hover:border-gots-accent/40 flex flex-col h-full cursor-pointer">
        <h2 className="text-3xl font-bold text-gots-accent mb-3">{group_name}</h2>
        <p className="text-gots-content mb-4 flex-grow">{description}</p>
        <div className="mt-auto">
          <p className="text-sm text-gots-light-gold mb-2">
            {character_count} {character_count === 1 ? 'character' : 'characters'}
          </p>
          <span className="text-gots-accent hover:text-gots-accent-light font-semibold text-sm">
            View {group_name} →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function characters_page(): Promise<ReactNode> {
  const character_groups = await get_characters_by_group();

  const group_descriptions: Record<string, string> = {
    'Romans': 'The forces of Rome—soldiers, commanders, and officials whose paths intersect with the divine.',
    'Followers': 'Those who follow the truth, building networks of protection and preserving witness.',
    'Other': 'Other characters in the story.'
  };

  const groups = [
    {
      name: 'Romans',
      count: character_groups['Romans']?.length || 0,
      description: group_descriptions['Romans'],
      link: '/characters/groups/romans',
      image_path: '/assets/video/headers/romans/Romans_Header_Poster.png'
    },
    {
      name: 'Followers',
      count: character_groups['Followers']?.length || 0,
      description: group_descriptions['Followers'],
      link: '/characters/groups/followers',
      image_path: '/assets/video/headers/followers/Followers_Header_Poster.png'
    }
  ].filter(group => group.count > 0);

  return (
    <main className="min-h-screen bg-gots-body">
      <header className="bg-gradient-to-b from-gots-charred to-gots-dark py-16 px-6 text-center border-b-2 border-dashed border-gots-accent">
        <h1 className="text-5xl md:text-6xl font-bold text-gots-accent mb-4">All Characters</h1>
        <p className="text-xl text-white max-w-2xl mx-auto">
          Explore the diverse perspectives that weave the tapestry of the Guardians of the Spear.
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.map((group) => (
            <div key={group.name}>
              {character_group_card({
                group_name: group.name,
                character_count: group.count,
                description: group.description,
                link: group.link,
                image_path: group.image_path
              })}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 pt-8 border-t border-dashed border-gots-accent/30 text-center">
        <Link href="/" className="inline-block px-4 py-2 rounded font-semibold transition-colors bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
