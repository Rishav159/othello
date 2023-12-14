import { useState } from "react";
import { OthelloGame, Players } from "../lib/OthelloGame";
import "./othello.css";
import { deepClone } from "../helpers";

export const Othello = () => {
  const [othelloGame, setOthelloGame] = useState(new OthelloGame());

  const getCellStyle = (player) => {
    if (player === Players.BLACK)
      return {
        backgroundColor: "black",
        boxShadow: "0 0 10px white",
      };
    if (player === Players.WHITE)
      return {
        backgroundColor: "white",
        boxShadow: "0 0 10px black",
      };
    return {};
  };

  const getPlayerStyle = (player) => {
    if (player === Players.BLACK)
      return {
        backgroundColor: "white",
        color: "black",
      };
    if (player === Players.WHITE)
      return {
        backgroundColor: "black",
        color: "white",
      };
    return {};
  };

  const handleClick = (i, j) => {
    if (othelloGame.board[i][j].takenBy) {
      return;
    }
    othelloGame.playCell(i, j);
    const newInstance = deepClone(othelloGame);
    setOthelloGame(newInstance);
  };

  const cursorType = (row, col) => {
    return othelloGame.board[row][col].takenBy ? "auto" : "pointer";
  };
  
  return (
    <div>
      <h1>Othello</h1>
      <h2>
        Player Turn{" "}
        <span style={getPlayerStyle(othelloGame.currentTurn)}>
          {othelloGame.currentTurn.toUpperCase()}
        </span>
      </h2>
      <div style={{ width: "100%" }}>
        <div className="grid-container">
          {Array.from(othelloGame.board).map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className="grid-cell"
                  style={{ cursor: cursorType(rowIndex, colIndex) }}
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  <div className="circle" style={getCellStyle(cell.takenBy)}>
                    {/* {rowIndex} {colIndex} */}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
