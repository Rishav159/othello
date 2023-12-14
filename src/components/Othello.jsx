import OthelloGame from "../lib/OthelloGame";
import "./othello.css";

export const Othello = () => {

  const othello = new OthelloGame()

  console.log(othello);
  return (
    <div>
      <h1>Othello</h1>
      <div style={{ width: '100%'}}>
      <div className="grid-container">
        {Array.from(othello.board).map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="grid-cell">
                {rowIndex} {colIndex}
                {/* You can render content or components inside each cell if needed */}
              </div>
            ))}
          </div>
        ))}
      </div>
      </div>
      <div className="player-container">
        <div className="player-row">
            <div className="player-cell">
        <div>Player 1</div>
            </div>
            <div className="player-cell">
        <div>Player 2</div>
            </div>
        </div>
      </div>
    </div>
  );
};
