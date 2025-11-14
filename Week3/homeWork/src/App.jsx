import React, { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Container from "./components/Container/Container.jsx";
import Game from "./components/Game/Game.jsx";
import Ranking from "./components/Ranking/Ranking.jsx";

const App = () => {
  const [activeTab, setActiveTab] = useState("Game");
  const renderContent = () => {
    if (activeTab === "Game") {
      return (
        <div className="p-6 border rounded-large bg-primary-100 min-h-[700px] w-full">
          {/* <h2 className="text-xl font-semibold">게임 탭</h2> */}
          <Game />
        </div>
      );
    }
    if (activeTab === "Ranking") {
      return (
        <div className="p-6 border rounded-large bg-primary-100 min-h-[700px] w-full">
          <Ranking />
        </div>
      );
    }
    return null;
  };

  return (
    <Container>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </Container>
  );
};

export default App;
