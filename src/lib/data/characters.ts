import type { character_profile } from '@/lib/types/character';

// Static imports for all character files (helps Next.js with dynamic imports)
import longinus_data from '@/content/characters/longinus.json';
import brutus_data from '@/content/characters/brutus.json';
import maximus_data from '@/content/characters/maximus.json';
import corvus_data from '@/content/characters/corvus.json';
import horatius_data from '@/content/characters/horatius.json';
import margaret_data from '@/content/characters/margaret.json';
import salome_data from '@/content/characters/salome.json';
import aquilus_data from '@/content/characters/aquilus.json';
import cestius_gallus_data from '@/content/characters/cestius_gallus.json';
import victor_data from '@/content/characters/victor.json';
import malchus_data from '@/content/characters/malchus.json';
// Import other characters as needed

// Character data map for quick lookup
const character_data_map: Record<string, any> = {
  longinus: longinus_data,
  brutus: brutus_data,
  maximus: maximus_data,
  corvus: corvus_data,
  horatius: horatius_data,
  margaret: margaret_data,
  salome: salome_data,
  aquilus: aquilus_data,
  cestius_gallus: cestius_gallus_data,
  victor: victor_data,
  malchus: malchus_data,
};

// Get all characters for homepage
export async function get_all_characters(): Promise<character_profile[]> {
  const character_ids = [
    'longinus',
    'brutus',
    'corvus',
    'margaret',
    'malchus',
    'hannah',
    'horatius',
    'maximus',
    'salome',
    'aquilus',
    'cestius_gallus',
    'victor',
    'jesus'
  ];
  
  const characters: character_profile[] = [];
  
  // Load each character file individually to handle missing files gracefully
  for (const id of character_ids) {
    try {
      // Try static map first, then fall back to dynamic import
      let response;
      if (character_data_map[id]) {
        response = character_data_map[id];
      } else {
        response = await import(`@/content/characters/${id}.json`);
        response = response.default || response;
      }
      
      if (response?.character) {
        characters.push(response.character);
      } else {
        console.warn(`Character ${id} loaded but missing character property:`, response);
      }
    } catch (error) {
      // Skip missing character files - they'll be added later
      console.warn(`Character file not found: ${id}.json`, error);
    }
  }
  
  return characters;
}

// Get single character
export async function get_character_data(character_id: string): Promise<character_profile | null> {
  try {
    const response = await import(`@/content/characters/${character_id}.json`);
    return response.default.character;
  } catch (error) {
    console.error(`Error loading character ${character_id}:`, error);
    return null;
  }
}

// Get single character by ID (alias for get_character_data)
export async function get_character_by_id(id: string): Promise<character_profile | null> {
  return get_character_data(id);
}

// Get detailed character data (from *_detailed.json files)
export async function get_detailed_character_data(character_id: string): Promise<any | null> {
  try {
    const response = await import(`@/content/characters/${character_id}_detailed.json`);
    return response.default.character;
  } catch (error) {
    console.error(`Error loading detailed character ${character_id}:`, error);
    return null;
  }
}

// Get characters grouped by main category
export async function get_characters_by_group(): Promise<Record<string, character_profile[]>> {
  const characters = await get_all_characters();
  const groups: Record<string, character_profile[]> = {
    'Romans': [],
    'Followers': [],
    'Other': []
  };
  
  for (const character of characters) {
    // Try to get category from detailed data
    let category = 'Other';
    try {
      const detailed = await get_detailed_character_data(character.id);
      if (detailed?.identification?.category) {
        const full_category = detailed.identification.category;
        if (full_category.startsWith('Romans')) {
          category = 'Romans';
        } else if (full_category.startsWith('Followers')) {
          category = 'Followers';
        }
      }
    } catch (error) {
      // If no detailed data, try to infer from role or other fields
      if (character.role === 'antagonist' && (character.origin?.includes('Rome') || character.origin?.includes('Roman'))) {
        category = 'Romans';
      } else if (character.role === 'protagonist' || character.role === 'supporting') {
        // Most protagonists/supporting are Followers, but check origin
        if (character.origin && !character.origin.includes('Rome') && !character.origin.includes('Roman')) {
          category = 'Followers';
        }
      }
    }
    
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(character);
  }
  
  return groups;
}

// Get all scenes featuring a character
export async function get_character_scenes(character_id: string) {
  try {
    // Load all scenes from all acts
    const all_scenes: any[] = [];
    
    // In real implementation, you'd iterate through acts/sequences
    // For now, this is a placeholder
    const response = await import(`@/content/character-scenes/${character_id}.json`);
    return response.default;
  } catch (error) {
    console.error(`Error loading scenes for ${character_id}:`, error);
    return [];
  }
}
