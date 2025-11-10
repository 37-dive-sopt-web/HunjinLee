import { useState, useEffect } from "react"
import { getRankings, deleteRankings } from "../../utils/rankingUtils"

const Ranking = () => {
  const [rankings, setRankings] = useState([]);

  const loadRankings = () => {
    const records = getRankings();
    setRankings(records);
  }

  useEffect(() => {
    loadRankings();
  }, []);

  const handleDelete = () => {
    if(window.confirm("모든 랭킹 기록을 초기화하시겠습니까?")) {
      deleteRankings();
      loadRankings();
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-small">
        <h2 className="font-medium text-h3">랭킹 보드</h2>
        <button onClick={handleDelete} className="px-4 py-2 text-white bg-red-400 rounded-large">
          기록 초기화
        </button>
      </div>
      {rankings.length === 0 ? (
        <p className="py-10 text-center text-gray-500">아직 저장된 기록이 없습니다.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50">
                <th className="px-6 py-3">순위</th>
                <th className="px-6 py-3">레벨</th>
                <th className="px-6 py-3">클리어 시간(초)</th>
                <th className="px-6 py-3">기록 시각</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rankings.map((record, index) => (
                <tr key={index} className={index < 3 ? "bg-primary-200 font-semibold" : ""}>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">Level {record.level}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{record.clearTime.toFixed(1)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{record.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Ranking
