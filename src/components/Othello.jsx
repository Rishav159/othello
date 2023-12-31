import { useState } from "react";
import { OthelloGame, Players } from "../lib/OthelloGame";
import "./othello.css";
import { deepClone } from "../helpers";
import { MdRefresh } from "react-icons/md";
import { DialogBox } from "./Dialog";

export const Othello = () => {
  const [othelloGame, setOthelloGame] = useState(new OthelloGame());
  const [hoveredCell, setHoveredCell] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMouseEnter = (rowIndex, colIndex) => {
    setHoveredCell({ rowIndex, colIndex });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const restartGame = () => {
    setOthelloGame(new OthelloGame());
  };

  const getCellStyle = (player, i, j) => {
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
    return {
      backgroundColor:
        hoveredCell?.rowIndex === i && hoveredCell?.colIndex === j
          ? othelloGame.currentTurn.toLowerCase()
          : "transparent",
      opacity:
        othelloGame.playableCells[i + "_" + j] &&
        hoveredCell?.rowIndex === i &&
        hoveredCell?.colIndex === j
          ? 0.5
          : 0,
    };
  };

  const getPlayerStyle = (player) => {
    if (player === Players.BLACK)
      return {
        backgroundColor: "white",
        color: "black",
      };
    if (player === Players.WHITE)
      return {
        backgroundColor: "white",
        color: "black",
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
    return !othelloGame.playableCells[row + "_" + col] ||
      othelloGame.board[row][col].takenBy
      ? "auto"
      : "pointer";
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const isEnded = othelloGame.status === "ENDED";
  const isDraw = isEnded && !othelloGame.winner;
  return (
    <div>
      <div className="header-container">
        <h1>Othello</h1>
        <h2>
          Player Turn{" "}
          <span style={getPlayerStyle(othelloGame.currentTurn)}>
            {othelloGame.currentTurn.toUpperCase()}
          </span>
        </h2>
        <div>
          <MdRefresh className="restart-button" onClick={handleOpenDialog} />
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div className="grid-container">
          {Array.from(othelloGame.board).map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className="grid-cell"
                  style={{
                    cursor: cursorType(rowIndex, colIndex),
                  }}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className="circle"
                    style={getCellStyle(cell.takenBy, rowIndex, colIndex)}
                  ></div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="game-status">
          {isEnded && isDraw && <div className="draw-block">Game is Drawn</div>}
          {isEnded && !isDraw && (
            <div className="winner-block">{`${othelloGame.winner} is the winner`}</div>
          )}
        </div>
      </div>
      <DialogBox
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title="Restart"
        content="Are you sure?"
        onConfirm={() => {
          restartGame()
          handleCloseDialog()
        }}
      />
    </div>
  );
};
