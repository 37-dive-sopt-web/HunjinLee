const RANKING_KEY = 'memoryGameRanking';


/*
 * localStroage에서 랭킹 데이터를 가져와 오름차순으로 정렬
*/

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

/*
 * 새로운 기록을 저장하고 랭킹을 다시 정렬
*/

export const saveRanking = (record) => {
  const rankings = getRankings();

  const now = new Date();
  const timestamp = now
    .toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24시간 표기
    })
    .replace(/\. /g, ".")
    .replace(":", ":");

    const newRecord = {
      ...record,
      timestamp: timestamp,
    }

    rankings.push(newRecord);

    rankings.sort((a, b) => a.clearTime - b.clearTime);

    try {
      localStorage.setItem(RANKING_KEY, JSON.stringify(rankings));
    } catch (err) {
      console.error("error", err);
    }
}

/*
 * 랭킹을 초기화하고 기록 삭제
*/

export const deleteRankings = () => {
  try {
    localStorage.removeItem(RANKING_KEY);
  } catch (err) {
    console.error("error", err);
  }

}