import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  get_location_by_id,
  get_location_extended_profile,
  type location_extended_profile,
} from '@/lib/data/locations';
import { asset_image_path } from '@/lib/asset-paths';

interface page_props {
  params: Promise<{ id: string }>;
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gots-accent mb-4">{title}</h2>
      {children}
    </div>
  );
}

function render_extended_profile(profile: location_extended_profile) {
  const sections = profile.sections as Record<string, { title: string; [key: string]: unknown }> | undefined;
  if (!sections) return null;

  return (
    <div className="space-y-6">
      {/* Identification */}
      <SectionBlock title="Location Identification">
        <div className="space-y-6">
          {profile.alternative_names?.length ? (
            <div>
              <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                Also Known As
              </h3>
              <p className="text-gots-content mb-4">
                {profile.alternative_names.join(' • ')}
              </p>
            </div>
          ) : null}
          {profile.type && (
            <div>
              <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                Type
              </h3>
              <p className="text-gots-content">{profile.type}</p>
            </div>
          )}
          {profile.time_period && (
            <div>
              <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                Time Period
              </h3>
              <p className="text-gots-content">{profile.time_period}</p>
            </div>
          )}
          {profile.coordinates && (
            <div>
              <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                Location
              </h3>
              <p className="text-gots-content">{profile.coordinates}</p>
            </div>
          )}
          {profile.historical_status && (
            <div>
              <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                Historical Status
              </h3>
              <p className="text-gots-content">{profile.historical_status}</p>
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
              Narrative Significance
            </h3>
            <p className="text-gots-content text-lg">
              {profile.narrative_significance}
            </p>
          </div>
          {profile.story_arcs && (
            <div>
              <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                Story Arc
              </h3>
              <p className="text-gots-content">{profile.story_arcs}</p>
            </div>
          )}
          {profile.one_line_description && (
            <p className="text-gots-accent italic font-medium border-l-2 border-gots-accent pl-4 py-2">
              {profile.one_line_description}
            </p>
          )}
        </div>
      </SectionBlock>

      {/* Physical Description */}
      {sections.physical_description && (
        <SectionBlock title="Physical Description & Layout">
          <div className="space-y-6">
            {(sections.physical_description as { geographic_setting?: string }).geographic_setting && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Geographic Setting
                </h3>
                <p className="text-gots-content">
                  {(sections.physical_description as { geographic_setting: string }).geographic_setting}
                </p>
              </div>
            )}
            {(sections.physical_description as { scale?: string }).scale && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Scale
                </h3>
                <p className="text-gots-content">
                  {(sections.physical_description as { scale: string }).scale}
                </p>
              </div>
            )}
            {(sections.physical_description as { natural_features?: string }).natural_features && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Natural Features
                </h3>
                <p className="text-gots-content">
                  {(sections.physical_description as { natural_features: string }).natural_features}
                </p>
              </div>
            )}
            {(sections.physical_description as { primary_structures?: string }).primary_structures && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Primary Structures
                </h3>
                <p className="text-gots-content">
                  {(sections.physical_description as { primary_structures: string }).primary_structures}
                </p>
              </div>
            )}
          </div>
        </SectionBlock>
      )}

      {/* Sensory Details */}
      {sections.sensory_details && (
        <SectionBlock title="Sensory Details & Atmosphere">
          <div className="space-y-6">
            {(sections.sensory_details as { overall_impression?: string }).overall_impression && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Overall Impression
                </h3>
                <p className="text-gots-content">
                  {(sections.sensory_details as { overall_impression: string }).overall_impression}
                </p>
              </div>
            )}
            {(sections.sensory_details as { dominant_colors?: string }).dominant_colors && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Dominant Colors
                </h3>
                <p className="text-gots-content">
                  {(sections.sensory_details as { dominant_colors: string }).dominant_colors}
                </p>
              </div>
            )}
            {(sections.sensory_details as { signature_visual?: string }).signature_visual && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Signature Visual
                </h3>
                <p className="text-gots-content">
                  {(sections.sensory_details as { signature_visual: string }).signature_visual}
                </p>
              </div>
            )}
            {(sections.sensory_details as { lighting?: string }).lighting && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Lighting
                </h3>
                <p className="text-gots-content">
                  {(sections.sensory_details as { lighting: string }).lighting}
                </p>
              </div>
            )}
            {(sections.sensory_details as { essential_atmosphere?: string }).essential_atmosphere && (
              <p className="text-gots-accent font-medium italic">
                {(sections.sensory_details as { essential_atmosphere: string }).essential_atmosphere}
              </p>
            )}
          </div>
        </SectionBlock>
      )}

      {/* Historical Context */}
      {sections.historical_context && (
        <SectionBlock title="Historical & Cultural Context">
          <div className="space-y-6">
            {(sections.historical_context as { historical_significance?: string }).historical_significance && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Historical Significance
                </h3>
                <p className="text-gots-content">
                  {(sections.historical_context as { historical_significance: string }).historical_significance}
                </p>
              </div>
            )}
            {(sections.historical_context as { cultural_importance?: string }).cultural_importance && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Cultural Importance
                </h3>
                <p className="text-gots-content">
                  {(sections.historical_context as { cultural_importance: string }).cultural_importance}
                </p>
              </div>
            )}
            {(sections.historical_context as { symbolic_meaning?: string }).symbolic_meaning && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Symbolic Meaning
                </h3>
                <p className="text-gots-content">
                  {(sections.historical_context as { symbolic_meaning: string }).symbolic_meaning}
                </p>
              </div>
            )}
          </div>
        </SectionBlock>
      )}

      {/* Character Connections */}
      {sections.character_connections && (
        <SectionBlock title={(sections.character_connections as { title?: string }).title ?? 'Character Connections'}>
          <div className="space-y-6">
            {((sections.character_connections as { primary?: { name: string; role: string }[] }).primary ?? []).map(
              (char) => (
                <div key={char.name} className="bg-gots-charred rounded-lg p-4 border border-gots-accent/20">
                  <h3 className="font-bold text-gots-accent mb-2">{char.name}</h3>
                  <p className="text-gots-content text-sm">{char.role}</p>
                </div>
              )
            )}
          </div>
        </SectionBlock>
      )}

      {/* Key Scenes */}
      {sections.key_scenes && (
        <SectionBlock title="Key Scenes & Events">
          <ul className="space-y-3">
            {((sections.key_scenes as { events?: string[] }).events ?? []).map((event, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-gots-accent font-bold">•</span>
                <span className="text-gots-content">{event}</span>
              </li>
            ))}
          </ul>
        </SectionBlock>
      )}
    </div>
  );
}

export default async function location_detail_page({ params }: page_props) {
  const { id } = await params;
  const location = await get_location_by_id(id);
  const extendedProfile = await get_location_extended_profile(id);

  if (!location) notFound();

  const heroImage = extendedProfile?.image;

  return (
    <main className="min-h-screen bg-gots-body">
      <header className="relative w-full h-64 md:h-96 min-h-[16rem] border-b-2 border-dashed border-gots-accent overflow-hidden">
        {heroImage ? (
          <>
            <Image
              src={asset_image_path(heroImage)}
              alt={location.name}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gots-charred via-gots-charred/60 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-gots-charred to-gots-dark" />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-6 text-center">
          <p className="text-sm font-semibold text-gots-accent/90 uppercase tracking-wider mb-2">
            {location.region}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-gots-accent">{location.name}</h1>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-12">
        {extendedProfile ? (
          render_extended_profile(extendedProfile)
        ) : (
          <>
            <p className="text-gots-medium-gray text-lg mb-6">{location.description}</p>
            {location.significance && (
              <div className="bg-gots-charred rounded-lg p-6 border border-gots-accent/20">
                <h2 className="text-xl font-bold text-gots-accent mb-3">Story Significance</h2>
                <p className="text-gots-content">{location.significance}</p>
              </div>
            )}
          </>
        )}
      </section>

      <div className="mt-12 pt-8 border-t border-dashed border-gots-accent/30 text-center space-x-4">
        <Link
          href="/locations"
          className="inline-block px-4 py-2 rounded font-semibold transition-colors bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black"
        >
          ← All Locations
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
