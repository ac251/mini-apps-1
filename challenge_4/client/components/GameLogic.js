class Game {

  constructor() {
    this.red = {
      moves: [0,0,0,0,0,0],
      name: "Red"
    };
    this.black = {
      moves: [0,0,0,0,0,0],
      name: "Black"
    };
  }
  
  toMatrix() {
    let matrix = []
    for (let row = 0; row < 6; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        matrix[row][col] = 'X';
      }
    }
    
    let matrixFiller = (moves, symbol) => {
      debugger;
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
          if (moves[row] & (2 ** col)) {
            matrix[row][col] = symbol;
          }
        }
      }
    };
    
    matrixFiller(this.red.moves, 'R');
    matrixFiller(this.black.moves, 'B');
    
    return matrix;
  }
  
  makeMove(player, column) {
    let rowMask = 2 ** column;
    let otherPlayer = player === this.red ? this.black : this.red;
    let row = -1;
    while ((row < 5) && ((rowMask & player.moves[row + 1]) === 0) && ((rowMask & otherPlayer.moves[row + 1]) === 0)) {
      row++;
    }
    if (row === -1) {
      throw new Error('Invalid move, column is full');
    } else {
      player.moves[row] = player.moves[row] | rowMask;
    }
    
    return[row, column];
    
  }
  
  hasWon(player, [row, col]) {
    
    let checkDown = (rowToCheck = row + 1, toCheck = 3) => {
      if (toCheck === 0) {
        return true;
      }
      if (!(player.moves[rowToCheck] & (2 ** col))) {
        return false;
      }
      return checkDown(rowToCheck + 1, toCheck - 1);
    };
    
    let countLeft = () => {
      let count = 0;
      while (player.moves[row] & (2 ** (col + count + 1))) {
        count++;
      }
      return count;
    };
    
    let countRight = () => {
      let count = 0;
      while (player.moves[row] & (2 ** (col - count - 1))) {
        count++;
      }
      return count;
      
    };
    
    let countLeftShiftUp = (rowToCheck = row - 1) => {
      let count = 0;
      let flag = true;
      let mask = 2 ** col;
      while (flag) {
        mask = mask << 1;
        if (player.moves[rowToCheck] & mask) {
          count++;
          rowToCheck--;
        } else {
          flag = false;
        }
      }
      return count;
    };
    
    let countRightShiftUp = (rowToCheck = row - 1) => {
      let count = 0;
      let flag = true;
      let mask = 2 ** col;
      while (flag) {
        mask = mask >> 1;
        if (player.moves[rowToCheck] & mask) {
          count++;
          rowToCheck--;
        } else {
          flag = false;
        }
      }
      return count;
    };
    
    let countLeftShiftDown = (rowToCheck = row + 1) => {
      let count = 0;
      let flag = true;
      let mask = 2 ** col;
      while (flag) {
        mask = mask << 1;
        if (player.moves[rowToCheck] & mask) {
          count++;
          rowToCheck++;
        } else {
          flag = false;
        }
      }
      return count;
    };
    
    let countRightShiftDown = (rowToCheck = row + 1) => {
      let count = 0;
      let flag = true;
      let mask = 2 ** col;
      while (flag) {
        mask = mask >> 1;
        if (player.moves[rowToCheck] & mask) {
          count++;
          rowToCheck++;
        } else {
          flag = false;
        }
      }
      return count;
    };
    
    if (checkDown()) {
      return true;
    }
    
    if (countLeft() + countRight() >= 3) {
      return true;
    }
    
    if (countLeftShiftUp() + countRightShiftDown() >= 3) {
      return true;
    }
    
    if (countRightShiftUp() + countLeftShiftDown() >= 3) {
      return true;
    }
    
    return false;
    
  }
  
  isTied() {
    for (let i = 0; i < 6; i++) {
      if ((this.red.moves[i] | this.black.moves[i]) !== (2 ** 7 - 1)) {
        return false;
      }
    }
    return true;
  }

}

export default Game;