'use client';

import { useState } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient'; // Adjust path

interface Game {
  id: string;
  home_team: string;
  away_team: string;
  date: string;
  formattedDate?: string; // If enriching
  // Add other fields
}

interface PicksClientProps {
  games: Game[]; // Or Game[] | null if preferred
}

export default function PicksClient({ games = [] }: PicksClientProps) { // Default to empty array
  const [userPicks, setUserPicks] = useState<{ [gameId: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handlePickChange = (gameId: string, pick: string) => {
    setUserPicks((prev) => ({ ...prev, [gameId]: pick }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const supabase = getSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Sign in required.');
      setLoading(false);
      return;
    }

    const picksToSubmit = Object.entries(userPicks).map(([gameId, winner]) => ({
      user_id: user.id,
      game_id: gameId,
      selected_winner: winner,
    }));

    const { error } = await supabase.from('user_picks').insert(picksToSubmit);
    if (error) {
      console.error('Submit error:', error);
      alert('Submit failed.');
    } else {
      alert('Picks submitted!');
    }
    setLoading(false);
  };

  if (!games?.length) { // Safe check with optional chaining
    return <div>No picks available yet. Check back soon!</div>;
  }

  return (
    <div>
      <h2>Available Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.away_team} @ {game.home_team} on {game.formattedDate || new Date(game.date).toLocaleDateString()}
            <div>
              Pick winner:
              <label>
                <input
                  type="radio"
                  name={`pick-${game.id}`}
                  value={game.home_team}
                  onChange={() => handlePickChange(game.id, game.home_team)}
                />
                {game.home_team}
              </label>
              <label>
                <input
                  type="radio"
                  name={`pick-${game.id}`}
                  value={game.away_team}
                  onChange={() => handlePickChange(game.id, game.away_team)}
                />
                {game.away_team}
              </label>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} disabled={loading || !Object.keys(userPicks).length}>
        {loading ? 'Submitting...' : 'Submit Picks'}
      </button>
    </div>
  );
}