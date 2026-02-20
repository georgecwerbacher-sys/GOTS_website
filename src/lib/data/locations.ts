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
    image: '/images/Locations/Praetorium.jpg',
  },
  {
    id: 'temple',
    name: 'The Temple',
    region: 'Jerusalem',
    description: 'The heart of Jewish religious life—where Malchus serves and where authority and faith intersect.',
    significance: 'Center of religious power; base for secret believers who protect resurrection witnesses.',
    image: '/images/Locations/the-temple.jpg',
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
  {
    id: 'masada',
    name: 'Masada',
    region: 'Judea',
    description: 'Mountain fortress in the Judean desert—last stronghold of organized Jewish resistance against Rome.',
    significance: 'Climactic location of the Fall of Masada; symbolic end of Temple-era Jewish independence.',
  },
  {
    id: 'jerusalem-marketplace',
    name: 'Jerusalem Marketplace (Summer 66 CE)',
    region: 'Jerusalem',
    description: 'The commercial heart of Jerusalem—where common people gather and economic grievances crystallize.',
    significance: 'Where Florus\'s treasury theft becomes public knowledge and the Jewish-Roman relationship reaches breaking point.',
  },
  {
    id: 'nahal-bezek',
    name: 'Nahal Bezek (Wadi el-Beir)',
    region: 'Judea-Samaria Border',
    description: 'A limestone wadi north of Jerusalem where Ein Bezek spring draws travelers into a narrow, ambush-vulnerable passage.',
    significance: 'Critical waypoint on the military route—water as both survival and trap; 90+ minutes of vulnerability for a full cohort.',
  },
  {
    id: 'qumran',
    name: 'Qumran (Khirbet Qumran)',
    region: 'Judean Desert',
    description: 'An austere desert sanctuary where the Essenes preserved sacred texts and lived in ritual purity.',
    significance: 'Potential refuge for the Guardians; source of wisdom and preservation; destroyed by Romans in 68 CE.',
  },
  {
    id: 'fortress-antonia',
    name: 'The Fortress of Antonia',
    region: 'Jerusalem',
    description: 'The Roman military command center overlooking the Temple Mount—garrison, trials, and occupation.',
    significance: 'Where Longinus serves; where Jesus was tried and scourged; central to crucifixion and Roman control.',
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
    const mod = await import(`@/content/Locations/${location_id}.json`);
    return (mod.default ?? mod) as location_extended_profile;
  } catch {
    return null;
  }
}
