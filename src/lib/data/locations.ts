export interface location_profile {
  id: string;
  name: string;
  region: string;
  description: string;
  significance?: string;
  image?: string;
}

// Key locations from the Guardians of the Spear narrative
const LOCATIONS: location_profile[] = [
  {
    id: 'jerusalem',
    name: 'Jerusalem',
    region: 'Judea',
    description: 'The heart of 1st century Judea—a city of pilgrimage, power, and profound tension under Roman occupation.',
    significance: 'Central setting for the crucifixion, resurrection, and the clash between Roman authority and divine truth.',
  },
  {
    id: 'golgotha',
    name: 'Golgotha',
    region: 'Jerusalem',
    description: 'The place of the skull—an execution ground outside Jerusalem\'s walls where the crucifixion unfolds.',
    significance: 'Where Longinus pierces Christ\'s side and receives his sight; where divine light meets state violence.',
    image: '/images/Locations/Golgotha.jpg',
  },
  {
    id: 'praetorium',
    name: 'The Praetorium',
    region: 'Jerusalem',
    description: 'The Roman governor\'s residence and military headquarters in Jerusalem.',
    significance: 'Site of the scourging and judgment; where Roman authority confronts the accused.',
  },
  {
    id: 'temple',
    name: 'The Temple',
    region: 'Jerusalem',
    description: 'The heart of Jewish religious life—where Malchus serves and where authority and faith intersect.',
    significance: 'Center of religious power; base for secret believers who protect resurrection witnesses.',
  },
  {
    id: 'judean-desert',
    name: 'Judean Desert',
    region: 'Judea',
    description: 'Harsh wilderness where Roman cohorts march—a landscape of merciless sun and hidden danger.',
    significance: 'Where the Death Squad\'s march begins; backdrop for Longinus\'s journey into the story.',
  },
  {
    id: 'beth-horon',
    name: 'Beth-Horon Pass',
    region: 'Judea',
    description: 'A narrow mountain pass where Roman forces faced catastrophic ambush.',
    significance: 'Where Cestius Gallus\'s army was destroyed; a turning point in the occupation.',
  },
  {
    id: 'mount-gerizim',
    name: 'Mount Gerizim',
    region: 'Samaria',
    description: 'Sacred mountain in Samaria—site of the massacre where Margaret rescued Hannah and Menahem.',
    significance: 'Origin of Margaret\'s calling; where divine intervention saved two children.',
  },
];

export async function get_all_locations(): Promise<location_profile[]> {
  return LOCATIONS;
}

export async function get_locations_by_region(): Promise<Record<string, location_profile[]>> {
  const locations = await get_all_locations();
  const by_region: Record<string, location_profile[]> = {};
  for (const loc of locations) {
    if (!by_region[loc.region]) by_region[loc.region] = [];
    by_region[loc.region].push(loc);
  }
  return by_region;
}

export async function get_location_by_id(location_id: string): Promise<location_profile | null> {
  const locations = await get_all_locations();
  return locations.find((l) => l.id === location_id) ?? null;
}

// Extended location profile (from LOCATION_PROFILE markdown files)
export interface location_extended_profile {
  id: string;
  name: string;
  image?: string;
  alternative_names?: string[];
  type?: string;
  time_period?: string;
  region: string;
  coordinates?: string;
  historical_status?: string;
  narrative_significance: string;
  story_arcs?: string;
  one_line_description?: string;
  sections?: Record<string, unknown>;
}

export async function get_location_extended_profile(
  location_id: string
): Promise<location_extended_profile | null> {
  try {
    const mod = await import(`@/content/locations/${location_id}.json`);
    return (mod.default ?? mod) as location_extended_profile;
  } catch {
    return null;
  }
}
