import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { get_all_characters } from '@/lib/data/characters';
import { get_all_locations } from '@/lib/data/locations';
import {
  book_1,
  book_2,
  atmosphere_layers,
  testimonials,
} from '@/lib/content/immersive-data';
import { HeroSection } from '@/components/sections/immersive/HeroSection';
import { BooksSection } from '@/components/sections/immersive/BooksSection';
import { AtmosphereSection } from '@/components/sections/immersive/AtmosphereSection';
import { GoDeeperSection } from '@/components/sections/immersive/GoDeeperSection';
import { CharacterTeaserSection } from '@/components/sections/immersive/CharacterTeaserSection';
import { LocationTeaserSection } from '@/components/sections/immersive/LocationTeaserSection';
import { StoryThreadsSection } from '@/components/sections/immersive/StoryThreadsSection';
import { SocialProofSection } from '@/components/sections/immersive/SocialProofSection';
import { FooterSection } from '@/components/sections/immersive/FooterSection';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const homepageUrl = `${siteUrl}/`;

export const metadata: Metadata = {
  title: {
    absolute: 'Guardians of the Spear',
  },
  description:
    'An epic historical fiction novel set in first-century Jerusalem. Follow the Roman soldier Longinus and the servant Malchus as they become guardians of the Spear of Destiny.',
  alternates: {
    canonical: homepageUrl,
  },
  openGraph: {
    url: homepageUrl,
    title: 'Guardians of the Spear',
    description:
      'An epic historical fiction novel set in first-century Jerusalem. Follow the Roman soldier Longinus and the servant Malchus as they become guardians of the Spear of Destiny.',
  },
};

// Force server rendering so Vercel serves the route correctly (avoids 404 on static export)
export const dynamic = 'force-dynamic';

export default async function homepage(): Promise<ReactNode> {
  let featured_characters: Array<{
    id: string;
    name: string;
    role: string;
    quote?: string;
    description?: string;
    imageUrl?: string;
    path: string;
  }> = [];

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

  let featured_locations: Array<{
    id: string;
    name: string;
    region: string;
    description: string;
    significance?: string;
    imageUrl?: string;
    path: string;
  }> = [];

  try {
    const all_locations = await get_all_locations();
    featured_locations = all_locations.slice(0, 6).map((loc) => ({
      id: loc.id,
      name: loc.name,
      region: loc.region,
      description: loc.description,
      significance: loc.significance,
      imageUrl: loc.image,
      path: `/locations/${loc.id}`,
    }));
  } catch (error) {
    console.error('Error loading locations:', error);
  }

  return (
    <main className="min-h-screen bg-gots-body">
      <HeroSection
        videoPath="/assets/video/headers/followers/followers"
        posterPath="/images/Hero_images/Followers_1_.jpg"
        altText="Guardians of the Spear home page header video"
        title="Guardians of the Spear"
        subtitle="Across every age, men and women have died for one thing — your right to choose your own fate."
        description="Go deeper than the book — discover the people, the places, and the price they paid."
        endWithPoster
      />

      <BooksSection book1={book_1} book2={book_2} />

      <AtmosphereSection layers={atmosphere_layers} />

      <GoDeeperSection />

      <CharacterTeaserSection characters={featured_characters} />

      <LocationTeaserSection locations={featured_locations} />

      <StoryThreadsSection />

      <SocialProofSection testimonials={testimonials} />

      <FooterSection />
    </main>
  );
}
