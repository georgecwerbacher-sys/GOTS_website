import { prisma } from '@/lib/prisma';

// Character ID (from JSON) to narrative scene mapping - Scene 1 features these characters
const CHARACTER_SCENE_MAP: Record<string, string[]> = {
  longinus: ['scene_1_1'],
  brutus: ['scene_1_1'],
  corvus: ['scene_1_1'],
  horatius: ['scene_1_1'],
  maximus: ['scene_1_1'],
  aquilus: ['scene_1_1'],
  victor: ['scene_1_1'],
  cestius_gallus: [],
  margaret: [],
  salome: [],
  malchus: [],
};

export async function get_scenes_for_character(character_id: string) {
  const scene_ids = CHARACTER_SCENE_MAP[character_id] || [];
  if (scene_ids.length === 0) return [];

  const scenes = await prisma.narrativeScene.findMany({
    where: { id: { in: scene_ids }, status: 'published' },
    orderBy: [{ partNumber: 'asc' }, { sceneNumber: 'asc' }],
    include: {
      sceneContents: {
        where: { status: 'published' },
        take: 1,
      },
    },
  });
  return scenes;
}

export async function get_scene_by_id(scene_id: string) {
  const scene = await prisma.narrativeScene.findUnique({
    where: { id: scene_id, status: 'published' },
    include: {
      sceneContents: {
        where: { status: 'published' },
      },
    },
  });
  return scene;
}

export async function get_scene_content(scene_id: string) {
  const content = await prisma.sceneContent.findFirst({
    where: { sceneId: scene_id, status: 'published' },
  });
  return content;
}
