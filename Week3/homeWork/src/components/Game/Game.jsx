import { useState, useCallback, useRef, useEffect } from "react";
import { buildDeck } from "../../utils/deckUtils"
import Board from "../Board/Board";

// 제한 시간 
const TIME_LIMIT = 45.00;

const Game = () => {
  // ------------------- 게임 상태 관리 -------------------
  //-------------------------------------------------------
  const [level, setLevel] = useState(1); // 게임 레벨
  const [cards, setCards] = useState(() => buildDeck(1)); // 초기 카드 생성
  const [flippedIds, setFlippedIds] = useState([]); // 뒤집힌 카드 ID
  // 배열의 길이가 2가 되면 매치 판정 시작

  const [time, setTime] = useState(TIME_LIMIT);
  const [challenge, setChallenge] = useState(0); // 시도 횟수

  const [isGameLocked, setIsGameLocked] = useState(false); // 카드 클릭 Lock
  const [isGameStarted, setIsGameStarted] = useState(false);
  // 게임 시작 상태 유효 -> true 변경 되어야 게임 시작
  const [isGameOver, setIsGameOver] = useState(false);
  // 게임 종료 상태 저장, 종료 후 true

  // 타이머 관리
  const timerRef = useRef(null);
  const timeoutRef = useRef(null);

  const totalPairs = cards.length / 2; // 카드 짝의 개수 계산
  const matchedPairs = cards.filter((card) => card.isMatched).length / 2;
  // 배열을 순회해서 정답인 카드의 수를 세고 짝을 위해 /2 계산
  const allMatched = matchedPairs === totalPairs;

  // ------------------- 게임 시작 / 리셋 -------------------
  //---------------------------------------------------------
  const resetGame = useCallback(
    (currentlevel = level) => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setCards(buildDeck(currentlevel));
      setFlippedIds([]);
      setTime(TIME_LIMIT);
      setChallenge(0);
      setIsGameLocked(false);
      setIsGameStarted(false);
      setIsGameOver(false);
    },
    [level]
  );

  const startGame = useCallback(() => {
    if (isGameStarted) return;
    setIsGameStarted(true); // 게임 시작 상태 변경(true)
    setIsGameOver(false);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 0.01;
        if (newTime <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return Math.max(0, parseFloat(newTime.toFixed(2)));
      });
    }, 10);
  }, [isGameStarted]);

  // ------------------- 카드 클릭 핸들러 -------------------
  //---------------------------------------------------------
  const handleCardClick = useCallback(
    (id) => {
      if (!isGameStarted) {
        startGame();
      }
      if (isGameLocked || flippedIds.length === 2) return;

      setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card)));
      setFlippedIds((pervIds) => [...pervIds, id]);
    },
    [isGameStarted, isGameLocked, flippedIds, startGame]
  );

  // ------------------- 매치 판정 -------------------
  //--------------------------------------------------
  useEffect(() => {
    // 두장이 뒤집혔을때 매치 판정
    if (flippedIds.length === 2) {
      setIsGameLocked(true);
      const [id1, id2] = flippedIds;
      const card1 = cards.find((c) => c.id === id1);
      const card2 = cards.find((c) => c.id === id2);

      setChallenge((prevChallenge) => prevChallenge + 1);

      if (card1.value === card2.value) {
        // 성공
        setCards((prevCards) =>
          prevCards.map((card) => (card.id === id1 || card.id === id2 ? { ...card, isMatched: true } : card))
        );
        setFlippedIds([]);
        setIsGameLocked(false);
      } else {
        // 실패
        timeoutRef.current = setTimeout(() => {
          setCards((prevCards) => 
            prevCards.map((card) => (card.id === id1 || card.id === id2 ? {...card, isFlipped: false}: card))
          );
          setFlippedIds([]);
          setIsGameLocked(false);
        }, 700);
      }
    }
    // 승리 / 패배 판정 및 리셋
    const isGameLost = time <= 0 && !allMatched;

    if (allMatched || isGameLost) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsGameOver(true);

      setTimeout(resetGame, 3000);
      // TODO : 승리 시 ranking 로직에 클리어 기록 저장 로직 추가 예정
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [flippedIds, cards, time, allMatched, resetGame]);


  const currentLevel = 1;
  return (
    <div className="flex flex-col items-start justify-between w-full p-4 md:flex-row">
      {/* 1. 게임 보드 (Board 컴포넌트 자리) */}
      <div className="w-full md:w-3/5 lg:w-3/4 min-w-[300px]">
        <Board
          cards={cards}
          onCardClick={handleCardClick}
          level={currentLevel} // 레벨 정보 전달
        />
      </div>

      {/* 2. 상태 패널 (임시) */}
      <div className="w-full p-4 mt-6 bg-gray-100 rounded-lg shadow-inner md:w-64 md:ml-8 md:mt-0">
        <h3 className="mb-4 text-xl font-bold">게임 진행 상태 (임시)</h3>
        <p>시간: {time.toFixed(2)}s</p>
        <p>시도: {challenge}</p>
        <p>
          맞춘 짝: {matchedPairs}/{totalPairs}
        </p>
        
        <p className="mt-2 font-semibold">
          {allMatched
            ? "승리! (3초 후 리셋)"
            : time <= 0 && !allMatched
              ? "패배! (3초 후 리셋)"
              : "카드를 눌러 게임을 시작"}
        </p>
      </div>
    </div>
  );
}

export default Game
