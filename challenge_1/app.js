let playerOneMoves = [0, 0, 0];
let playerTwoMoves = [0, 0, 0];

let hasWon = (playerMoves) => {
  for (let i = 0; i < playerMoves.length; i++) {
    if (playerMoves[i] === 2 ** playerMoves.length - 1) {
      return true;
    }
  }
  if (playerMoves.reduce((acc, curRow) => acc & curRow)) {
    return true;
  }
  if (playerMoves.reduce((acc, curRow) => acc << 1 & curRow)) {
    return true;
  }
  if (playerMoves.reduce((acc, curRow) => acc >> 1 & curRow)) {
    return true;
  }
  return false;
};

let movesRemain = (playerOneMoves, playerTwoMoves) => {
  let boardSize = playerOneMoves.length;
  
  let allRowsOccupied = playerOneMoves.every((curRow, idx) => (curRow | playerTwoMoves[idx] > curRow));
 
  let occColumnsOne = playerOneMoves.reduce((acc, curRow) => acc | curRow);
  let occColumnsTwo = playerTwoMoves.reduce((acc, curRow) => acc | curRow);
  
  let allColsOccupied = (occColumnsOne & occColumnsTwo === 2 ** boardSize - 1);
  
  let leftShiftDiagOne  = playerOneMoves.reduce((acc, curRow) => acc << 1 | curRow);
  let leftShiftDiagTwo = playerTwoMoves.reduce((acc, curRow) => acc << 1 | curRow);
  
  let leftShiftDiagOccupied = (leftShiftDiagOne & leftShiftDiagTwo & (2 ** (boardSize - 1))) > 0;
  
  let rightShiftDiagOne = playerOneMoves.reduce((acc, curRow) => acc >> 1 | curRow);
  let rightShiftDiagTwo = playerTwoMoves.reduce((acc, curRow) => acc >> 1 | curRow);
  
  let rightShiftDiagOccupied = (rightShiftDiagOne & rightShiftDiagTwo & 1) > 0;
  
  if (allRowsOccupied && allColsOccupied && leftShiftDiagOccupied && rightShiftDiagOccupied) {
    return false;
  }
  
  return true;
  
};

let isLegalMove = (row, col) => {
  if (playerOneMoves[row] & (2 ** col)) {
    return false;
  }
  if (playerTwoMoves[row] & (2 ** col)) {
    return false;
  }
  return true;
}

let makeMove = (playerMoves, row, col) => {
  playerMoves[row] = playerMoves[row] | (2 ** col);
}



