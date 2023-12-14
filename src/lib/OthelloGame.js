export const Players = {
  BLACK: "black",
  WHITE: "white",
};
const MAX_ROWS = 8;
const MAX_COLS = 8;
class Cell {
  constructor(i, j) {
    this.taken = false;
    this.takenBy = null;
    this.i = i;
    this.j = j;
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
    this.board = [];
    for(let i = 0; i < MAX_ROWS; i++) {
      let row = [];
      for(let j = 0; j < MAX_COLS; j++) {
        row.push(new Cell(i, j));
      }
      this.board.push(row)
    }
    this.board[3][3].acquire(Players.BLACK);
    this.board[3][4].acquire(Players.WHITE);
    this.board[4][3].acquire(Players.WHITE);
    this.board[4][4].acquire(Players.BLACK);
    this.history = [];
    this.playableCells = {};
    this.calculatePlayableCells(this.currentTurn);
    this.status = "ACTIVE";
  }
  flipPlayer() {
    this.currentTurn = this.otherPlayer();
  }
  otherPlayer() {
    return this.currentTurn === Players.BLACK ? Players.WHITE : Players.BLACK;
  }
  calculatePlayableCells(player) {
    this.playableCells = {};
    for(let i = 0; i < MAX_ROWS; i++) {
      for(let j = 0; j < MAX_COLS; j++) {
        let cell = this.board[i][j];
        if(!cell.taken) {
          const cellsToFlip = this.initiateFlipsFrom(i, j, player);
          if(cellsToFlip.length) {
            this.playableCells[i+"_"+j] = true;
          }
        }
      }
    }
  }
  checkEndGame() {
    let cellsRemaining = 0;
    let blackCount = 0;
    let whiteCount = 0;
    for(let i = 0; i < MAX_ROWS; i++) {
      for(let j = 0; j < MAX_COLS; j++) {
        let cell = this.board[i][j];
        if(!cell.taken) {
          cellsRemaining += 1;
        } else {
          if(cell.takenBy === Players.BLACK) {
            blackCount += 1;
          } else {
            whiteCount += 1;
          }
        }
      }
    }
    if(cellsRemaining === 0) {
      this.status = "ENDED";
      if(blackCount > whiteCount) {
        this.winner = Players.BLACK
      } else if(whiteCount > blackCount) {
        this.winner = Players.WHITE;
      } else {
        this.winner = null;
      }
    }
  }
  playCell(i, j) {
    const cell = this.board[i][j];
    const currentPlayer = this.currentTurn;
    if (cell.taken) {
      throw new Error("This cell is already taken by ", cell.takenBy);
    }
    if(this.status !== "ACTIVE") {
      throw new Error("This game is not active anymore");
    }
    if(!this.playableCells[i+"_"+j]) {
      return;
    }
    const cellsToFlip = this.initiateFlipsFrom(i, j, currentPlayer);
    cell.acquire(currentPlayer);
    cellsToFlip.forEach((cell) => {
      cell.flipTo(currentPlayer);
    });
    this.calculatePlayableCells(this.otherPlayer());
    if(Object.keys(this.playableCells).length > 0) {
      this.flipPlayer();
    } else {
      this.calculatePlayableCells(currentPlayer);
    }
    this.checkEndGame();
  }

  initiateFlipsFrom(startI, startJ, player) {
    const otherPlayer = player === Players.BLACK ? Players.WHITE : Players.BLACK;
    let cellsToFlip = [];
    let toFlip = [];
    // Left
    toFlip = [];
    for (let j = startJ - 1; j >= 0; j--) {
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
