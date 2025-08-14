import type { PostgrestError } from '@supabase/supabase-js';
import PicksClient from '@/components/PicksClient'; // Adjust path if needed
import { getSupabaseServer } from '@/lib/supabaseServer';

interface Game {
  id: string;
  date: string;
  home_team: string;
  away_team: string;
  spread: number;
  // Add any other fields from your Supabase 'games' table schema here
}

interface EnrichedGame extends Game {
  formattedDate: string;
}

export default async function PicksPage() {
  const supabase = await getSupabaseServer();

  const { data: games, error } = await supabase
    .from('games')
    .select('*')
    .order('date', { ascending: true })
    .gte('date', new Date().toISOString()) as unknown as { data: Game[] | null; error: PostgrestError | null };

  if (error) {
    console.error('Error fetching games:', error.message);
    return <div className="text-red-600 font-bold">Error loading picks: {error.message}. Try refreshing or check console.</div>;
  }

  const enrichedGames: EnrichedGame[] = (games ?? []).map((game: Game) => ({
    ...game,
    formattedDate: new Date(game.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">Upcoming Games</h2>
      <PicksClient games={enrichedGames} />
    </div>
  );
}