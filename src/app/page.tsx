import { ReactNode } from 'react';
import { get_all_characters } from '@/lib/data/characters';
import {
  book_1,
  book_2,
  atmosphere_layers,
  story_threads,
  cta_paths,
  testimonials,
} from '@/lib/content/immersive-data';
import { HeroSection } from '@/components/sections/immersive/HeroSection';
import { BooksSection } from '@/components/sections/immersive/BooksSection';
import { AtmosphereSection } from '@/components/sections/immersive/AtmosphereSection';
import { OptInSection } from '@/components/sections/immersive/OptInSection';
import { CharacterTeaserSection } from '@/components/sections/immersive/CharacterTeaserSection';
import { StoryThreadsSection } from '@/components/sections/immersive/StoryThreadsSection';
import { CallToActionSection } from '@/components/sections/immersive/CallToActionSection';
import { SocialProofSection } from '@/components/sections/immersive/SocialProofSection';
import { FooterSection } from '@/components/sections/immersive/FooterSection';

export default async function homepage(): Promise<ReactNode> {
  let featured_characters = [];
  
  try {
    const all_characters = await get_all_characters();
    featured_characters = all_characters.slice(0, 6).map((c) => ({
    id: c.id,
    name: c.name,
    role: (c as { occupation?: string }).occupation || c.role || 'Character',
    quote: (c as { key_themes?: string[] }).key_themes?.[0] || c.brief_description?.slice(0, 80),
    description: c.brief_description,
    imageUrl: c.image,
    path: `/characters/${c.id}`,
  }));
  } catch (error) {
    console.error('Error loading characters:', error);
    // Continue with empty array if characters fail to load
  }

  return (
    <main className="min-h-screen bg-gots-body">
      <HeroSection
        videoPath="/assets/video/headers/Home_Page/Home_Header"
        posterPath="/images/Hero_images/Followers_1_.jpg"
        altText="Guardians of the Spear home page header video"
        title="Guardians of the Spear"
        subtitle="Across every age, men and women have died for one thing — your right to choose your own fate."
        description="Go deeper than the book — discover the people, the places, and the price they paid."
      />

      <BooksSection book1={book_1} book2={book_2} />

      <AtmosphereSection layers={atmosphere_layers} />

      <OptInSection />

      <CharacterTeaserSection characters={featured_characters} />

      <StoryThreadsSection threads={story_threads} />

      <CallToActionSection paths={cta_paths} />

      <SocialProofSection testimonials={testimonials} />

      <FooterSection />
    </main>
  );
}
