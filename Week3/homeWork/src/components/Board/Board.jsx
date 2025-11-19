import Card from "../Card/Card"

const LEVEL_TO_GRID = { 1: [4, 4], 2: [4, 6], 3: [6, 6] };

const Board = ({ cards, onCardClick, level }) => {
  const [rows, cols] = LEVEL_TO_GRID[level] ?? [4,4];

  const gridStyle = {
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
  };

  return (
    <div
      style={gridStyle}
      className='grid gap-3 p-4 bg-primary-300 shadow-md rounded-medium w-full max-w-xl mx-auto'
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick}
        />
      ))}
      
    </div>
  )
}

export default Board
