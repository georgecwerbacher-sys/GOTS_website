import { NextResponse } from 'next/server';
import { get_character_data } from '@/lib/data/characters';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const character = await get_character_data(id);
  if (!character) {
    return NextResponse.json({ error: 'Character not found' }, { status: 404 });
  }
  return NextResponse.json(character);
}
