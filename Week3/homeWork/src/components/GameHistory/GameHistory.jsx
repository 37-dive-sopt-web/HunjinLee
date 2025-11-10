const GameHistory = ({history}) => {
  return (
    <div className="w-full p-0 m-0">
      {history.length === 0 ? (
        <p className="flex items-center justify-center h-full p-3 text-sm text-white">아직 뒤집은 카드가 없어요</p>
      ) : (
        <ul className="p-0 m-0 space-y-1 text-sm list-none">
          {history.map((item, index) => { 
            const [cardValues, result] = item.message.split(' : ');
            
            return ( 
              <li
                key={index}
                className={`
                  flex justify-between items-center p-3 text-base font-bold gap-1 rounded-medium bg-primary-200 shadow-sm
                `}
              >
                {/* 1. 카드 값 */}
                <span
                  className={item.message.includes("성공") ? "text-green-700 font-medium" : "text-red-500 font-medium"}
                >
                  {cardValues.replace(/[()]/g, "")}
                </span>

                {/* 2. 결과 (성공/실패) */}
                <span className={result.includes("성공") ? "text-green-700" : "text-red-500"}>{result}</span>
              </li>
            ); 
          })} 
        </ul>
      )}
    </div>
  );
}

export default GameHistory