import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { get_locations_by_region, BOOK_2_ONLY_LOCATION_IDS } from '@/lib/data/locations';
import { asset_image_path } from '@/lib/asset-paths';
import { Book2MembershipCTA } from '@/components/characters/Book2MembershipCTA';

function location_card(location: {
  id: string;
  name: string;
  region: string;
  description: string;
  significance?: string;
  image?: string;
}): ReactNode {
  const isBook2Only = BOOK_2_ONLY_LOCATION_IDS.includes(location.id);

  if (isBook2Only && location.image) {
    return (
      <div key={location.id} className="relative h-64 md:h-80 rounded-lg overflow-hidden border border-gots-accent/20">
        <Image
          src={asset_image_path(location.image)}
          alt={location.name}
          fill
          className="object-cover blur-md scale-110"
          unoptimized
        />
        <Book2MembershipCTA variant="card" characterName={location.name} />
      </div>
    );
  }

  if (location.image) {
    return (
      <Link href={`/locations/${location.id}`} key={location.id}>
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden transition-all border border-gots-accent/20 hover:border-gots-accent/40 cursor-pointer group">
          <Image
            src={asset_image_path(location.image)}
            alt={location.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gots-charred via-gots-charred/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <p className="text-xs font-semibold text-gots-accent/90 uppercase tracking-wider mb-2">
              {location.region}
            </p>
            <h3 className="text-xl font-bold text-gots-accent mb-2 group-hover:text-gots-accent-light transition-colors">
              {location.name}
            </h3>
            <p className="text-gots-content text-sm line-clamp-2">
              {location.description}
            </p>
            <span className="text-gots-accent font-semibold text-sm mt-2">Explore Location →</span>
          </div>
        </div>
      </Link>
    );
  }

  if (isBook2Only) {
    return (
      <div key={location.id} className="relative h-64 md:h-80 rounded-lg overflow-hidden border border-gots-accent/20">
        <div className="absolute inset-0 p-6 bg-gots-charred/80 blur-md">
          <p className="text-xs font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
            {location.region}
          </p>
          <h3 className="text-xl font-bold text-gots-accent/80 mb-2">{location.name}</h3>
          <p className="text-gots-content/80 text-sm line-clamp-2">{location.description}</p>
        </div>
        <Book2MembershipCTA variant="overlay" />
      </div>
    );
  }

  return (
    <Link href={`/locations/${location.id}`} key={location.id}>
      <div className="bg-gots-charred hover:bg-gots-charred/80 rounded-lg overflow-hidden transition-all border border-gots-accent/20 hover:border-gots-accent/40 cursor-pointer group">
        <div className="p-6">
          <p className="text-xs font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
            {location.region}
          </p>
          <h3 className="text-xl font-bold text-gots-accent mb-2 group-hover:text-gots-accent-light transition-colors">
            {location.name}
          </h3>
          <p className="text-gots-content text-sm line-clamp-2">
            {location.description}
          </p>
          <span className="text-gots-accent font-semibold text-sm mt-2 block">Explore Location →</span>
        </div>
      </div>
    </Link>
  );
}

export default async function locations_page(): Promise<ReactNode> {
  const locations_by_region = await get_locations_by_region();
  const region_order = ['Jerusalem', 'Judea', 'Samaria'];

  return (
    <main className="min-h-screen bg-gots-body">
      <header className="bg-gradient-to-b from-gots-charred to-gots-dark py-16 px-6 text-center border-b-2 border-dashed border-gots-accent">
        <h1 className="text-5xl md:text-6xl font-bold text-gots-accent mb-4">Locations</h1>
        <p className="text-xl text-white max-w-2xl mx-auto">
          Discover the places where the story unfolds—from the Judean desert to the streets of Jerusalem.
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {region_order.map((region) => {
          const locations = locations_by_region[region];
          if (!locations?.length) return null;
          return (
            <div key={region} className="mb-12">
              <h2 className="text-2xl font-bold text-gots-accent mb-6">{region}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((loc) => location_card(loc))}
              </div>
            </div>
          );
        })}
      </section>

      <div className="mt-12 pt-8 border-t border-dashed border-gots-accent/30 text-center">
        <Link href="/" className="inline-block px-4 py-2 rounded font-semibold transition-colors bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
