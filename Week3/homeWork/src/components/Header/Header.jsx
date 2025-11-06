import React from "react";

const Header = ({ activeTab, onTabChange }) => {
  const getTabClass = (tabName) => {
    const baseClasses =
      "py-1 px-4 rounded-full cursor-pointer transition-colors duration-200 text-base whitespace-nowrap";

    if (activeTab === tabName) {
      return `${baseClasses} bg-primary-400 text-white font-bold`;
    } else {
      return `${baseClasses} bg-white text-gray-500`;
    }
  };

  return (
    <header className="flex justify-between items-center w-full p-5 mb-6 rounded-large bg-primary-100">
      {/* 1. 제목 */}
      <h2 className="text-3xl font-bold text-gray-800">숫자 카드 짝 맞추기</h2>

      {/* 2. 탭 컨테이너 */}
      <div className="flex space-x-1 p-1 rounded-full ">
        {/* 게임 */}
        <button className={getTabClass("Game")} onClick={() => onTabChange("Game")}>
          게임
        </button>

        {/* 랭킹 */}
        <button className={getTabClass("Ranking")} onClick={() => onTabChange("Ranking")}>
          랭킹
        </button>
      </div>
    </header>
  );
};

export default Header;
