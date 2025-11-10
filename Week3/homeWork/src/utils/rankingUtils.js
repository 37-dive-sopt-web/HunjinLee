const RANKING_KEY = 'memoryGameRanking';

export const getRankings = () => {
  try {
    const json = localStorage.getItem(RANKING_KEY);
    const rankings = json ? JSON.parse(json) : [];

    rankings.sort((a, b) => a.clearTime - b.clearTime);
    return rankings;
  } catch(err) {
    console.error("error", err);
    return [];
  }
}