import { CardListType } from '@/shared';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { pokemon } = await req.json();

  if (!pokemon || !Array.isArray(pokemon) || pokemon.length === 0) {
    return NextResponse.json({ error: 'No pokemon data' }, { status: 400 });
  }

  const headers = Object.keys(pokemon[0]);
  const rows = pokemon.map((p: CardListType) =>
    headers.map((h) => JSON.stringify(p[h] ?? '')).join(',')
  );
  const csvContent = [headers.join(','), ...rows].join('\n');

  return new Response(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${pokemon.length}_pokemon.csv"`,
    },
  });
}
