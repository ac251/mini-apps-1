class Game {

  constructor() {
    this.red = [0,0,0,0,0,0];
    this.black = [0,0,0,0,0,0];
  }
  
  toMatrix() {
    let matrix = []
    for (let row = 0; row < 6; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        matrix[row][col] = 0;
      }
    }
    
    let matrixFiller = (player, symbol) => {
      debugger;
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
          if (player[row] & (2 ** col)) {
            matrix[row][col] = symbol;
          }
        }
      }
    };
    
    matrixFiller(this.red, 'R');
    matrixFiller(this.black, 'B');
    
    return matrix;
  }
  
  makeMove(player, column) {
    let rowMask = 2 ** column;
    otherPlayer = player === this.red ? this.black : this.red;
    let row = -1;
    while ((row < 5) && ((rowMask & player[row + 1]) === 0) && ((rowMask & otherPlayer[row + 1]) === 0)) {
      row++;
    }
    if (row === -1) {
      throw new Error('Invalid move, column is full');
    } else {
      player[row] = player[row] | rowMask;
    }
    
    return[row, column];
    
  }
  
  hasWon(player, row, col) {
    
    let checkDown = (rowToCheck = row + 1, toCheck = 3) => {
      if (toCheck === 0) {
        return true;
      }
      if (!(player[rowToCheck] & (2 ** col))) {
        return false;
      }
      return checkDown(rowToCheck + 1, toCheck - 1);
    };
    
    let countLeft = () => {
      let count = 0;
      while (player[row] & (2 ** (col + count + 1))) {
        count++;
      }
      return count;
    };
    
    let countRight = () => {
      let count = 0;
      while (player[row] & (2 ** (col - count - 1))) {
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
        if (player[rowToCheck] & mask) {
          count++;
          rowToCheck--;
        } else {
          flag = false;
        }
      }
    };
    
    let countRightShiftUp = (rowToCheck = row - 1) => {
      let count = 0;
      let flag = true;
      let mask = 2 ** col;
      while (flag) {
        mask = mask >> 1;
        if (player[rowToCheck] & mask) {
          count++;
          rowToCheck--;
        } else {
          flag = false;
        }
      }
    };
    
    let countLeftShiftDown = (rowToCheck = row + 1) => {
      let count = 0;
      let flag = true;
      let mask = 2 ** col;
      while (flag) {
        mask = mask << 1;
        if (player[rowToCheck] & mask) {
          count++;
          rowToCheck++;
        } else {
          flag = false;
        }
      }
    };
    
    let countRightShiftDown = (rowToCheck = row + 1) => {
      let count = 0;
      let flag = true;
      let mask = 2 ** col;
      while (flag) {
        mask = mask >> 1;
        if (player[rowToCheck] & mask) {
          count++;
          rowToCheck++;
        } else {
          flag = false;
        }
      }
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

}

export default Game;