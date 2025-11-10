import React, { useCallback } from "react";
import GameHistory from "../GameHistory/GameHistory";

const LEVEL_OPTIONS = [
  { value: 1, label: "Level 1" },
  { value: 2, label: "Level 2" },
  { value: 3, label: "Level 3" },
];

const GameStatus = ({
  time,
  challenge,
  matchedPairs,
  totalPairs,
  // level,
  // setLevel,
  isGameStarted,
  isGameOver,
  infoMessage,
  history, 
}) => {
  const getMessage = useCallback(() => {
    if (isGameOver) {
      if (matchedPairs === totalPairs) {
        return "게임 종료: 승리!";
      }
      return "게임 종료: 패배!";
    }
    if (!isGameStarted) {
      return "카드를 눌러 게임을 시작";
    }
    return infoMessage;
  }, [isGameOver, isGameStarted, matchedPairs, totalPairs, infoMessage]);

  const handleLevelChange = () => {
    // const newLevel = parseInt(e.target.value, 10);
    // TODO: 레벨 드롭다운을 클릭했을 때 변경되는 로직 구현
  };

  return (
    <div className="w-full p-6 border shadow-inner rounded-large bg-primary-300">
      {/* 1. 레벨 선택 드롭다운 */}
      <div className="flex justify-end mb-4">
        <select
          onChange={handleLevelChange}
          className="w-full p-2 text-sm font-semibold border cursor-pointer rounded-large bg-primary-100"
        >
          {LEVEL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 2. 주요 상태 정보 Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6 text-center">
        <StatusBox title="남은 시간" value={time.toFixed(1)} unit="s" />
        <StatusBox title="성공한 짝" value={`${matchedPairs}/${totalPairs}`} />
        <StatusBox title="시도" value={challenge} />
      </div>

      {/* 3. 안내 메시지 */}
      <p className="mb-1 text-white text-h4 text-bold">안내 메시지</p>
      <div className="px-2 py-6 mb-6 border border-gray-300 shadow-sm bg-primary-100 rounded-large">
        <p className="text-base font-medium text-gray-700">{getMessage()}</p>
        {/* TODO: GameStatus 모달 리팩토링 시 여기에 카운트다운 표시 로직 추가 */}
      </div>

      {/* 4. 최근 히스토리 (임시) */}
      <div className="mb-4">
        <p className="mb-2 text-white text-h4 text-bold">최근 히스토리</p>
        {/* <div className="p-3 bg-primary-300 min-h-[100px]">
          <p className="flex items-center justify-center text-sm text-white">아직 뒤집은 카드가 없어요</p>
        </div> */}
        <GameHistory history={history} />
      </div>
    </div>
  );
};

const StatusBox = ({ title, value, unit = "" }) => (
  <div className="p-2 border rounded-large bg-primary-100">
    <p className="mb-1 text-base font-medium text-gray-600">{title}</p>
    <p className="text-gray-800 text-h3">
      {value}
      {unit && <span className="ml-1 text-sm font-normal">{unit}</span>}
    </p>
  </div>
);

export default GameStatus;
