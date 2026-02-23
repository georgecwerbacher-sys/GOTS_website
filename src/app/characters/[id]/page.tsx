// @ts-nocheck - conditional render types from Record<string, unknown>
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  get_character_data,
  get_detailed_character_data,
  CHARACTER_IDS,
  BOOK_2_ONLY_IDS,
} from '@/lib/data/characters';
import { asset_image_path } from '@/lib/asset-paths';
import { CharacterRelationshipLink } from '@/components/characters/CharacterRelationshipLink';
import { Book2MembershipCTA } from '@/components/characters/Book2MembershipCTA';

interface page_props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return CHARACTER_IDS.map((id) => ({ id }));
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

function render_extended_character_profile(detailed: Record<string, unknown>) {
  const id = detailed.identification as Record<string, string | undefined> | undefined;
  const physical = detailed.physical_description as Record<string, string | Record<string, string> | undefined> | undefined;
  const background = detailed.background_history as Record<string, string | undefined> | undefined;
  const relationships = detailed.relationships as Record<string, string | unknown[] | undefined> | undefined;
  const motivations = detailed.motivations as Record<string, string | undefined> | undefined;
  const storyArc = detailed.story_arc as Record<string, string | Record<string, string> | string[] | undefined> | undefined;
  const conflicts = detailed.internal_conflicts as Record<string, string | undefined> | undefined;
  const skills = detailed.skills_knowledge as Record<string, string | undefined> | undefined;
  const historical = detailed.historical_context as Record<string, string | undefined> | undefined;
  const integration = detailed.story_integration as Record<string, string | undefined> | undefined;

  return (
    <div className="space-y-6 mt-12">
      {/* Character Identification */}
      {id ? (
        <SectionBlock title="Character Identification">
          <div className="space-y-4">
            {id.time_period_active ? (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Time Period Active
                </h3>
                <p className="text-gots-content">{String(id.time_period_active)}</p>
              </div>
            ) : null}
            {id.primary_narrative_function ? (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Narrative Function
                </h3>
                <p className="text-gots-content">{String(id.primary_narrative_function)}</p>
              </div>
            ) : null}
          </div>
        </SectionBlock>
      ) : null}

      {/* Physical Description */}
      {physical ? (
        <SectionBlock title="Physical Description & Identifying Marks">
          <div className="space-y-4">
            {physical.build && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Build
                </h3>
                <p className="text-gots-content">{String(physical.build)}</p>
              </div>
            )}
            {physical.distinctive_features && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Distinctive Features
                </h3>
                <div className="text-gots-content space-y-2">
                  {Object.entries(physical.distinctive_features as Record<string, unknown>).map(
                    ([key, val]) =>
                      val ? (
                        <p key={key}>
                          <span className="text-gots-accent/80 capitalize">
                            {key.replace(/_/g, ' ')}:
                          </span>{' '}
                          {String(val)}
                        </p>
                      ) : null
                  )}
                </div>
              </div>
            )}
            {physical.typical_dress && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Typical Dress
                </h3>
                <p className="text-gots-content">{String(physical.typical_dress)}</p>
              </div>
            )}
            {physical.bearing && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Bearing & Presence
                </h3>
                <p className="text-gots-content">{String(physical.bearing)}</p>
              </div>
            )}
            {physical.voice && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Voice & Speech
                </h3>
                <p className="text-gots-content">{String(physical.voice)}</p>
              </div>
            )}
          </div>
        </SectionBlock>
      ) : null}

      {/* Background & History */}
      {background ? (
        <SectionBlock title="Background & History">
          <div className="space-y-4">
            {background.family_background && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Family Background
                </h3>
                <p className="text-gots-content">{String(background.family_background)}</p>
              </div>
            )}
            {background.defining_childhood && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Defining Childhood
                </h3>
                <p className="text-gots-content">{String(background.defining_childhood)}</p>
              </div>
            )}
            {background.key_life_events && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Key Life Events
                </h3>
                <p className="text-gots-content">{String(background.key_life_events)}</p>
              </div>
            )}
            {background.turning_points && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Turning Points
                </h3>
                <p className="text-gots-content">{String(background.turning_points)}</p>
              </div>
            )}
            {background.current_circumstances && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Current Circumstances
                </h3>
                <p className="text-gots-content">{String(background.current_circumstances)}</p>
              </div>
            )}
          </div>
        </SectionBlock>
      ) : null}

      {/* Relationships */}
      {relationships ? (
        <SectionBlock title="Relationships & Connections">
          <div className="space-y-4">
            {Array.isArray(relationships.primary) && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Primary Relationships
                </h3>
                <ul className="space-y-3">
                  {(relationships.primary as { name: string; dynamic: string; character_id?: string }[]).map((r) => (
                    <CharacterRelationshipLink key={r.name} relationship={r} />
                  ))}
                </ul>
              </div>
            )}
            {Array.isArray(relationships.secondary) && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Secondary Relationships
                </h3>
                <ul className="space-y-3">
                  {(relationships.secondary as { name: string; dynamic: string; character_id?: string }[]).map((r) => (
                    <CharacterRelationshipLink key={r.name} relationship={r} />
                  ))}
                </ul>
              </div>
            )}
            {relationships.how_they_connect && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  How They Connect
                </h3>
                <p className="text-gots-content">{String(relationships.how_they_connect)}</p>
              </div>
            )}
            {relationships.loyalty && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Loyalty
                </h3>
                <p className="text-gots-content">{String(relationships.loyalty)}</p>
              </div>
            )}
          </div>
        </SectionBlock>
      ) : null}

      {/* Motivations */}
      {motivations ? (
        <SectionBlock title="Motivations & Desires">
          <div className="space-y-4">
            {motivations.what_drives_them && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  What Drives Them
                </h3>
                <p className="text-gots-content">{String(motivations.what_drives_them)}</p>
              </div>
            )}
            {motivations.what_they_want_most && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  What They Want Most
                </h3>
                <p className="text-gots-content">{String(motivations.what_they_want_most)}</p>
              </div>
            )}
            {motivations.short_term_goals && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Short-term Goals
                </h3>
                <p className="text-gots-content">{String(motivations.short_term_goals)}</p>
              </div>
            )}
          </div>
        </SectionBlock>
      ) : null}

      {/* Story Arc */}
      {storyArc ? (
        <SectionBlock title="Story Arc & Character Development">
          <div className="space-y-4">
            {storyArc.entry_state && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Entry State
                </h3>
                <p className="text-gots-content">{String(storyArc.entry_state)}</p>
              </div>
            )}
            {storyArc.main_problem && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Main Problem
                </h3>
                <p className="text-gots-content">{String(storyArc.main_problem)}</p>
              </div>
            )}
            {storyArc.character_journey && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Character Journey
                </h3>
                <ul className="space-y-2">
                  {Object.entries(storyArc.character_journey as Record<string, string>).map(
                    ([act, desc]) => (
                      <li key={act}>
                        <span className="text-gots-accent font-semibold capitalize">
                          {act.replace(/_/g, ' ')}:
                        </span>{' '}
                        <span className="text-gots-content">{desc}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            {Array.isArray(storyArc.key_scenes) && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Key Scenes
                </h3>
                <ul className="space-y-2">
                  {(storyArc.key_scenes as string[]).map((scene, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-gots-accent">•</span>
                      <span className="text-gots-content">{scene}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SectionBlock>
      ) : null}

      {/* Internal Conflicts */}
      {conflicts ? (
        <SectionBlock title="Internal Conflicts & Paradoxes">
          <div className="space-y-4">
            {conflicts.central_paradox && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Central Paradox
                </h3>
                <p className="text-gots-content">{String(conflicts.central_paradox)}</p>
              </div>
            )}
            {conflicts.why_it_matters && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Why It Matters
                </h3>
                <p className="text-gots-content">{String(conflicts.why_it_matters)}</p>
              </div>
            )}
          </div>
        </SectionBlock>
      ) : null}

      {/* Skills & Knowledge */}
      {skills && (
        <SectionBlock title="Skills, Knowledge & Abilities">
          <div className="space-y-4">
            {skills.primary_skills && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Primary Skills
                </h3>
                <p className="text-gots-content">{String(skills.primary_skills)}</p>
              </div>
            )}
            {skills.limitations && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Limitations
                </h3>
                <p className="text-gots-content">{String(skills.limitations)}</p>
              </div>
            )}
          </div>
        </SectionBlock>
      )}

      {/* Historical Context */}
      {historical && (
        <SectionBlock title="Historical & Cultural Context">
          <div className="space-y-4">
            {historical.relevant_events && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Relevant Historical Events
                </h3>
                <p className="text-gots-content">{String(historical.relevant_events)}</p>
              </div>
            )}
            {historical.religious_framework && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Religious Framework
                </h3>
                <p className="text-gots-content">{String(historical.religious_framework)}</p>
              </div>
            )}
          </div>
        </SectionBlock>
      )}

      {/* Story Integration */}
      {integration && (
        <SectionBlock title="Story Integration Reference">
          <div className="space-y-4">
            {integration.first_appearance && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  First Appearance
                </h3>
                <p className="text-gots-content">{String(integration.first_appearance)}</p>
              </div>
            )}
            {integration.plot_function && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Plot Function
                </h3>
                <p className="text-gots-content">{String(integration.plot_function)}</p>
              </div>
            )}
            {integration.theme_connection && (
              <div>
                <h3 className="text-sm font-semibold text-gots-accent/80 uppercase tracking-wider mb-2">
                  Theme Connection
                </h3>
                <p className="text-gots-content">{String(integration.theme_connection)}</p>
              </div>
            )}
          </div>
        </SectionBlock>
      )}

      {/* Why Readers Care */}
      {detailed.why_readers_care && (
        <SectionBlock title="Why Readers Care">
          <p className="text-gots-content text-lg leading-relaxed">
            {String(detailed.why_readers_care)}
          </p>
        </SectionBlock>
      )}

      {/* Character Questions */}
      {Array.isArray(detailed.character_questions_for_readers) &&
        detailed.character_questions_for_readers.length > 0 && (
          <SectionBlock title="Questions for Readers">
            <ul className="space-y-2">
              {(detailed.character_questions_for_readers as string[]).map((q, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-gots-accent">•</span>
                  <span className="text-gots-content italic">{q}</span>
                </li>
              ))}
            </ul>
          </SectionBlock>
        )}
    </div>
  );
}

export default async function character_detail_page({ params }: page_props) {
  const { id } = await params;
  const character = await get_character_data(id);
  const detailed = await get_detailed_character_data(id);

  if (!character) notFound();

  const image_src = asset_image_path(character.image || '/images/characters/placeholder.png');
  const hasExtendedProfile =
    detailed &&
    (detailed.physical_description ||
      detailed.background_history ||
      detailed.relationships ||
      detailed.motivations ||
      detailed.story_arc ||
      detailed.internal_conflicts);

  const headerImage = (character as { header_image?: string }).header_image;
  const isBook2Only = BOOK_2_ONLY_IDS.includes(id);

  return (
    <main className={`min-h-screen bg-gots-body ${isBook2Only ? 'relative' : ''}`}>
      <header
        className={`relative border-b-2 border-dashed border-gots-accent overflow-hidden ${
          headerImage ? 'min-h-[280px] md:min-h-[360px]' : 'bg-gradient-to-b from-gots-charred to-gots-dark py-16 px-6'
        }`}
      >
        {headerImage ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={headerImage}
                alt=""
                fill
                className="object-cover object-top"
                priority
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gots-charred via-gots-charred/60 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end min-h-[280px] md:min-h-[360px] px-6 py-12 text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gots-accent mb-4 drop-shadow-lg">
                {character.name}
              </h1>
              {character.alternative_names?.length ? (
                <p className="text-gots-content text-lg drop-shadow-sm">
                  Also known as: {character.alternative_names.join(', ')}
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl font-bold text-gots-accent mb-4">{character.name}</h1>
            {character.alternative_names?.length ? (
              <p className="text-gots-content text-lg">
                Also known as: {character.alternative_names.join(', ')}
              </p>
            ) : null}
          </>
        )}
      </header>

      <section className={`max-w-4xl mx-auto px-6 py-12 relative ${isBook2Only ? 'min-h-[400px]' : ''}`}>
        {isBook2Only ? (
          <>
            <div className="blur-md select-none pointer-events-none">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative w-full md:w-80 h-96 bg-gots-charred rounded-lg overflow-hidden flex-shrink-0 mx-auto">
                  <Image
                    src={image_src}
                    alt={character.name}
                    fill
                    className="object-contain object-center"
                    unoptimized
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-gots-medium-gray text-lg mb-6">
                    {character.full_description || character.brief_description || 'No description available.'}
                  </p>
                  {character.occupation ? (
                    <p className="text-gots-medium-gray mb-2">
                      <span className="text-gots-accent font-semibold">Occupation:</span>{' '}
                      {character.occupation}
                    </p>
                  ) : null}
                  {character.origin ? (
                    <p className="text-gots-medium-gray mb-2">
                      <span className="text-gots-accent font-semibold">Origin:</span> {character.origin}
                    </p>
                  ) : null}
                </div>
              </div>
              {hasExtendedProfile && detailed && render_extended_character_profile(detailed)}
            </div>
            <Book2MembershipCTA variant="overlay" />
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative w-full md:w-80 h-96 bg-gots-charred rounded-lg overflow-hidden flex-shrink-0 mx-auto">
                <Image
                  src={image_src}
                  alt={character.name}
                  fill
                  className="object-contain object-center"
                  unoptimized
                />
              </div>
              <div className="flex-grow">
                <p className="text-gots-medium-gray text-lg mb-6">
                  {character.full_description || character.brief_description || 'No description available.'}
                </p>
                {character.occupation ? (
                  <p className="text-gots-medium-gray mb-2">
                    <span className="text-gots-accent font-semibold">Occupation:</span>{' '}
                    {character.occupation}
                  </p>
                ) : null}
                {character.origin ? (
                  <p className="text-gots-medium-gray mb-2">
                    <span className="text-gots-accent font-semibold">Origin:</span> {character.origin}
                  </p>
                ) : null}
              </div>
            </div>
            {hasExtendedProfile && detailed && render_extended_character_profile(detailed)}
          </>
        )}
      </section>

      <div className="mt-12 pt-8 border-t border-dashed border-gots-accent/30 text-center space-x-4">
        <Link
          href="/characters"
          className="inline-block px-4 py-2 rounded font-semibold transition-colors bg-gots-accent !text-black hover:bg-gots-accent-light hover:!text-black"
        >
          ← All Character profiles
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
