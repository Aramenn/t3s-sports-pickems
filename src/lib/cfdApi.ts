const CFD_API_KEY = process.env.CFD_API_KEY;
const BASE_URL = 'https://api.collegefootballdata.com';

async function fetchCFD(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${CFD_API_KEY}` },
  });
  if (!response.ok) throw new Error('API error');
  return response.json();
}

interface Rank {
  rank: number;
  school: string;
  conference: string;
  firstPlaceVotes: number;
  points: number;
}

interface Poll {
  poll: string;
  ranks: Rank[];
}

interface RankingWeek {
  season: number;
  seasonType: string;
  week: number;
  polls: Poll[];
}

export async function getCurrentWeekGames(year: number, week: number) {
  return fetchCFD('/games', { year: year.toString(), week: week.toString(), division: 'fbs' });
}

export async function getRankings(year: number, week: number) {
  const rankings: RankingWeek[] = await fetchCFD('/rankings', { year: year.toString(), week: week.toString() });
  return rankings[0]?.polls.find((p: Poll) => p.poll === 'AP Top 25')?.ranks || [];
}

export async function getTeams() {
  return fetchCFD('/teams/fbs');
}