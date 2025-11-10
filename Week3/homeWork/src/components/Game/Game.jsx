import { useState, useCallback, useRef, useEffect } from "react";
import { buildDeck } from "../../utils/deckUtils"
import Board from "../Board/Board";
import GameStatus from "../GameStatus/GameStatus";

// 제한 시간 상수 정의
const TIME_LIMIT = 3.00;

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
  const [infoMessage, setInfoMessage] = useState("카드를 눌러 게임을 시작");

  // 타이머 관리
  const timerRef = useRef(null);
  // useRef를 통해 setInterval이 반환하는 타이머 ID 저장
  const timeoutRef = useRef(null);
  // 매치 실패 시 setTimeout이 반환

  const totalPairs = cards.length / 2; // 카드 짝의 개수 계산
  const matchedPairs = cards.filter((card) => card.isMatched).length / 2;
  // 배열을 순회해서 정답인 카드의 수를 세고 짝을 위해 /2 계산
  const allMatched = matchedPairs === totalPairs;

  // ------------------- 게임 시작 / 리셋 -------------------
  //---------------------------------------------------------
  const resetGame = useCallback(
    (currentlevel = level) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setCards(buildDeck(currentlevel));
      setFlippedIds([]);
      setTime(TIME_LIMIT);
      setChallenge(0);
      setIsGameLocked(false);
      setIsGameStarted(false);
      setIsGameOver(false);

      setInfoMessage("카드를 눌러 게임을 시작");
    },
    [level]
  );

  const startGame = useCallback(() => {
    console.log("DEBUG: startGame 호출됨. isGameStarted:", isGameStarted);
    if (isGameStarted) return;
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      // 게임 카운트다운 로직
      setTime((prevTime) => {
        const newTime = Math.round(prevTime * 10 - 1) / 10;
        if (newTime <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return newTime;
      });
    }, 100);
    setIsGameStarted(true); // 게임 시작 상태 변경(true)
    setIsGameOver(false);
    console.log("DEBUG: 타이머 ID 설정 완료:", timerRef.current);
    console.log("DEBUG: 타이머 설정 완료 및 실행");
  }, []);

  // ------------------- 카드 클릭 핸들러 -------------------
  //---------------------------------------------------------
  const handleCardClick = useCallback(
    (id) => {
      // 1. 이미 클릭된 카드인지 확인 (flippedIds에 포함되어 있다면)
      if (flippedIds.includes(id)) {
        setInfoMessage("이미 뒤집은 카드입니다.");
        return;
      }
      if (!timerRef.current) {
        console.log("DEBUG: 첫 클릭 감지. startGame() 호출.");
        startGame();
      }
      if (isGameLocked || flippedIds.length === 2) return;

      if (flippedIds.length === 0) {
        setInfoMessage("짝을 맞춰주세요.");
      }

      // 카드 상태 업데이트
      /*
       * map 메소드를 사용하여 클릭된 카드만 isFlipped: true로 변경하여 상태 불변성 유지\
       * 배열에 현재 클릭한 카드 id 추가, 스프레드 연산자를 통해 새 배열 생성하고 업데이트 진행
       */
      setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card)));
      setFlippedIds((pervIds) => [...pervIds, id]);
    },
    [isGameLocked, flippedIds, startGame]
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

      // 시도 횟수 증가
      setChallenge((prevChallenge) => prevChallenge + 1);

      if (card1.value === card2.value) {
        // 성공
        setCards((prevCards) =>
          prevCards.map((card) => (card.id === id1 || card.id === id2 ? { ...card, isMatched: true } : card))
        );
        setFlippedIds([]);
        setIsGameLocked(false);
        setInfoMessage("성공!");
      } else {
        // 실패
        setInfoMessage("실패!");

        timeoutRef.current = setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) => (card.id === id1 || card.id === id2 ? { ...card, isFlipped: false } : card))
          );
          setFlippedIds([]);
          setIsGameLocked(false);
          // setInfoMessage("잠시만 기다려주세요");
        }, 700);
      }
    }
    // 승리 / 패배 판정 및 리셋
    const isGameLost = time <= 0 && !allMatched;
    const isGameWon = allMatched;

    if (isGameWon || isGameLost) {
      // if (timerRef.current) clearInterval(timerRef.current);
      setIsGameOver(true);

      const elapsedTime = TIME_LIMIT - time; // 경과 시간 계산
      const message = isGameWon
        ? `승리! Level ${level}을 ${elapsedTime.toFixed(2)}초에 클리어했어요.`
        : `패배! 제한 시간 ${TIME_LIMIT}초 초과했어요.`;

      alert(message);
      // TODO: 모달창 리팩토링: alert() 대신 GameOverModal 컴포넌트 렌더링 로직으로 교체 예정

      setTimeout(resetGame, 3000);
      // TODO : 승리 시 ranking 로직에 클리어 기록 저장 로직 추가 예정
    }
    return () => {
      if (timerRef.current) clearTimeout(timeoutRef.current);
    };
  }, [flippedIds, cards]);

  useEffect(() => {
    console.log("TIME CHANGE DEBUG:", time);
    // time 상태가 45.0에서 변화하고 있는지 확인합니다.
  }, [time]);


  useEffect(() => {
    // time 상태와 allMatched 상태 변화를 감지하여 게임 종료를 처리합니다.
    const isGameLost = time <= 0 && !allMatched;
    const isGameWon = allMatched;

    if (isGameWon || isGameLost) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsGameOver(true);

      const elapsedTime = TIME_LIMIT - time;
      const message = isGameWon
        ? `승리! Level ${level}을 ${elapsedTime.toFixed(1)}초에 클리어했어요.`
        : `패배! 제한 시간 ${TIME_LIMIT}초 초과했어요.`;

      alert(message);
      setTimeout(resetGame, 3000);
    }

    // 이 useEffect는 time, allMatched, resetGame에 의존
    return () => {};
  }, [time, allMatched, resetGame, isGameStarted]);

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
      <div className="w-full mt-6 md:w-2/5 lg:w-2/4 md:ml-6 md:mt-0">
        <GameStatus
          time={time}
          challenge={challenge}
          matchedPairs={matchedPairs}
          totalPairs={totalPairs}
          level={level}
          setLevel={setLevel}
          isGameStarted={isGameStarted}
          isGameOver={isGameOver}
          infoMessage={infoMessage}
        />
      </div>
    </div>
  );
}

export default Game
