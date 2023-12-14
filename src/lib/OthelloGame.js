export const Players = {
  BLACK: "black",
  WHITE: "white",
};
const MAX_ROWS = 8;
const MAX_COLS = 8;
class Cell {
  constructor() {
    this.taken = false;
    this.takenBy = null;
  }
  acquire(player) {
    if (this.taken) {
      throw new Error("This cell is already taken by ", this.takenBy);
    }
    this.taken = true;
    this.takenBy = player;
  }
  flipTo(player) {
    if (!this.taken) {
      throw new Error("This cell is not taken, so cannot flip to ", player);
    }
    this.takenBy = player;
  }
}

export class OthelloGame {
  constructor() {
    this.currentTurn = Players.WHITE;
    this.board = Array.from({ length: MAX_ROWS }, () => {
      return Array.from({ length: MAX_COLS }, () => {
        return new Cell();
      });
    });
    this.board[3][3].acquire(Players.BLACK);
    this.board[3][4].acquire(Players.WHITE);
    this.board[4][3].acquire(Players.WHITE);
    this.board[4][4].acquire(Players.BLACK);
    this.history = [];
  }
  flipPlayer() {
    this.currentTurn = this.otherPlayer();
  }
  otherPlayer() {
    return this.currentTurn === Players.BLACK ? Players.WHITE : Players.BLACK;
  }
  playCell(i, j) {
    const cell = this.board[i][j];
    const currentPlayer = this.currentTurn;
    if (cell.taken) {
      throw new Error("This cell is already taken by ", cell.takenBy);
    }

    const cellsToFlip = this.initiateFlipsFrom(i, j);
    console.log(cellsToFlip)
    if (cellsToFlip.length === 0) {
      return;
    }
    cell.acquire(currentPlayer);
    cellsToFlip.forEach((cell) => {
      cell.flipTo(currentPlayer);
    });
    this.flipPlayer();
  }

  initiateFlipsFrom(startI, startJ) {
    const player = this.currentTurn;
    const otherPlayer = this.otherPlayer();
    let cellsToFlip = [];
    let toFlip = [];
    // Left
    toFlip = [];
    for (let j = startJ - 1; j >= 0; j--) {
      const cell = this.board[startI][j];
      console.log(startI, j, player, cell.takenBy)
      if (cell.taken && cell.takenBy === otherPlayer) {
        toFlip.push(cell);
      } else if (cell.taken && cell.takenBy === player) {
        cellsToFlip = cellsToFlip.concat(toFlip);
        break;
      } else {
        break;
      }
    }
    // Right
    toFlip = [];
    for (let j = startJ + 1; j < MAX_COLS; j++) {
      const cell = this.board[startI][j];
      if (cell.taken && cell.takenBy === otherPlayer) {
        toFlip.push(cell);
      } else if (cell.taken && cell.takenBy === player) {
        cellsToFlip = cellsToFlip.concat(toFlip);
        break;
      } else {
        break;
      }
    }
    // Up
    toFlip = [];
    for (let i = startI - 1; i >= 0; i--) {
      const cell = this.board[i][startJ];
      if (cell.taken && cell.takenBy === otherPlayer) {
        toFlip.push(cell);
      } else if (cell.taken && cell.takenBy === player) {
        cellsToFlip = cellsToFlip.concat(toFlip);
        break;
      } else {
        break;
      }
    }
    // Down
    toFlip = [];
    for (let i = startI + 1; i < MAX_ROWS; i++) {
      const cell = this.board[i][startJ];
      if (cell.taken && cell.takenBy === otherPlayer) {
        toFlip.push(cell);
      } else if (cell.taken && cell.takenBy === player) {
        cellsToFlip = cellsToFlip.concat(toFlip);
        break;
      } else {
        break;
      }
    }
    // TopLeft
    toFlip = [];
    for (let i = startI - 1, j = startJ - 1; i >= 0 && j >= 0; i--, j--) {
      const cell = this.board[i][j];
      if (cell.taken && cell.takenBy === otherPlayer) {
        toFlip.push(cell);
      } else if (cell.taken && cell.takenBy === player) {
        cellsToFlip = cellsToFlip.concat(toFlip);
        break;
      } else {
        break;
      }
    }
    // TopRight
    toFlip = [];
    for (let i = startI - 1, j = startJ + 1; i >= 0 && j < MAX_COLS; i--, j++) {
      const cell = this.board[i][j];
      if (cell.taken && cell.takenBy === otherPlayer) {
        toFlip.push(cell);
      } else if (cell.taken && cell.takenBy === player) {
        cellsToFlip = cellsToFlip.concat(toFlip);
        break;
      } else {
        break;
      }
    }
    // BottomLeft
    toFlip = [];
    for (let i = startI + 1, j = startJ - 1; i < MAX_ROWS && j >= 0; i++, j--) {
      const cell = this.board[i][j];
      if (cell.taken && cell.takenBy === otherPlayer) {
        toFlip.push(cell);
      } else if (cell.taken && cell.takenBy === player) {
        cellsToFlip = cellsToFlip.concat(toFlip);
        break;
      } else {
        break;
      }
    }
    // BottomRight
    toFlip = [];
    for (
      let i = startI + 1, j = startJ + 1;
      i < MAX_ROWS && j < MAX_COLS;
      i++, j++
    ) {
      const cell = this.board[i][j];
      if (cell.taken && cell.takenBy === otherPlayer) {
        toFlip.push(cell);
      } else if (cell.taken && cell.takenBy === player) {
        cellsToFlip = cellsToFlip.concat(toFlip);
        break;
      } else {
        break;
      }
    }

    return cellsToFlip;
  }
}
