const Players = {
  BLACK: "black",
  WHITE: "white"
}
class Cell {
  constructor() {
    this.taken = false;
    this.takenBy = false;
  }
}

class OthelloGame {
  constructor() {
    this.current_turn = Players.WHITE;
    this.board = Array.from({ length: 8 }, () => {
      return Array.from({ length: 8 }, () => {
        return new Cell();
      });
    });
    this.history = []
  }
}

module.exports = OthelloGame;