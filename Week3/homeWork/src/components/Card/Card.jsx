const Card = ({ card, onClick }) => {
  const { id, value, isFlipped, isMatched } = card;

  const cardClasses = [
    "relative",
    "transition-transform",
    "duration-300",
    "transform",
    "cursor-pointer",
    "shadow-md",
    "rounded-medium", 
    "text-3xl",
    "flex items-center justify-center",
    "aspect-square", // 카드를 정사각형으로 유지
  ];

  // 1. 매치된 카드 스타일
  if (isMatched) {
    cardClasses.push("bg-green-300", "shadow-none", "opacity-70");
  }
  // 2. 뒤집힌 카드 스타일
  else if (isFlipped) {
    cardClasses.push("bg-white", "shadow-xl");
  }
  // 3. 뒷면 카드 스타일
  else {
    cardClasses.push("bg-primary-500", "hover:bg-primary-400"); 
  }

  const handleClick = () => {
    // 이미 뒤집혔거나 이미 맞춰진 카드는 무시
    if (isFlipped || isMatched) return;
    onClick(id); 
  };

  return (
    <div className={cardClasses.join(" ")} onClick={handleClick}>
      {/* 뒤집혔을 때만 숫자 표시 */}
      <span className={isFlipped ? "text-gray-800" : "text-white"}>{isFlipped || isMatched ? value : "?"}</span>
    </div>
  );
};

export default Card;
