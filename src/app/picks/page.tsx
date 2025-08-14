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
    .gte('date', new Date().toISOString()) as unknown as { data: Game[] | null; error: any | null };

  if (error) {
    console.error('Error fetching games:', error.message);
    return <div>Error loading picks: {error.message}. Try refreshing or check console.</div>;
  }

  const enrichedGames: EnrichedGame[] = (games ?? []).map((game: Game) => ({
    ...game,
    formattedDate: new Date(game.date).toLocaleDateString(),
  }));

  return <PicksClient games={enrichedGames} />;
}