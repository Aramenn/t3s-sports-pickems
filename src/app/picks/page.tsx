import { getCurrentWeekGames, getRankings, getTeams } from '@/lib/cfdApi';
import PicksClient from '@/components/PicksClient';  // Import the client component

const CURRENT_YEAR = 2025;
const CURRENT_WEEK = 1;

export default async function Picks() {
  const games = await getCurrentWeekGames(CURRENT_YEAR, CURRENT_WEEK);
  const rankings = await getRankings(CURRENT_YEAR, CURRENT_WEEK);
  const teams = await getTeams();

  const top25Teams = new Set(rankings.map((r: any) => r.school));
  const top25Games = games.filter((g: any) => top25Teams.has(g.home_team) || top25Teams.has(g.away_team));

  const enrichedGames = top25Games.map((game: any) => {
    const homeRank = rankings.find((r: any) => r.school === game.home_team)?.rank;
    const awayRank = rankings.find((r: any) => r.school === game.away_team)?.rank;
    const homeTeam = teams.find((t: any) => t.school === game.home_team);
    const awayTeam = teams.find((t: any) => t.school === game.away_team);
    return {
      ...game,
      home_rank: homeRank,
      away_rank: awayRank,
      home_logo: homeTeam?.logos[0] || '',
      away_logo: awayTeam?.logos[0] || '',
      location: game.venue,
      stadium: game.venue,
    };
  });

  return <PicksClient games={enrichedGames} />;
}