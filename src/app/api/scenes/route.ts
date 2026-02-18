import { NextResponse } from 'next/server';
import { get_scenes_for_character, get_scene_by_id } from '@/lib/data/scenes';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const character_id = searchParams.get('characterId');
  const scene_id = searchParams.get('sceneId');

  try {
    if (scene_id) {
      const scene = await get_scene_by_id(scene_id);
      if (!scene) return NextResponse.json({ error: 'Scene not found' }, { status: 404 });
      return NextResponse.json({ success: true, data: scene });
    }

    if (character_id) {
      const scenes = await get_scenes_for_character(character_id);
      return NextResponse.json({ success: true, data: scenes });
    }

    return NextResponse.json({ error: 'Provide characterId or sceneId' }, { status: 400 });
  } catch (error) {
    console.error('Scenes API error:', error);
    return NextResponse.json({ error: 'Failed to fetch scenes' }, { status: 500 });
  }
}
