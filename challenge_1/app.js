let playerOne = {
  name: 'player one',
  symbol: 'X',
  moves: [0, 0, 0]
};
let playerTwo = {
  name: 'player two',
  symbol: 'O',
  moves: [0, 0, 0]
};

let gamePlayers = {
  yourMove: playerOne,
  onDeck: playerTwo,
};

let hasWon = (player) => {
  let playerMoves = player.moves;
  
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

let gameOver = false;

let movesRemain = (playerOne, playerTwo) => {
  // checks whether there are possible moves left.
  // doesn't check whether a player has won,
  // so should be invoked only after checking whether the player who just moved has won.
  
  let playerOneMoves = playerOne.moves;
  let playerTwoMoves = playerTwo.moves;
  
  let boardSize = playerOneMoves.length;
  
  let allRowsOccupied = playerOneMoves.every((curRow, idx) => ((curRow | playerTwoMoves[idx]) > curRow));
 
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
  if (playerOne.moves[row] & (2 ** col)) {
    return false;
  }
  if (playerTwo.moves[row] & (2 ** col)) {
    return false;
  }
  return true;
};

let makeMove = (playerMoves, row, col) => {
  playerMoves[row] = playerMoves[row] | (2 ** col);
};

let boardDisplay = (n) => {
  let board = ''
  for (let row = 0; row < n; row ++) {
    board += '<div class="row">'
    for (let col = 0; col < n; col++) {
      board += `<span class="square row${row} col${col}">&#9744;</span>`
    }
    board += '</div>'    
  }
  return board;
};

let addSquareClickHandlers = () => {
  let squares = document.getElementsByClassName('square');
  for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = (event) => squareOnClick(event);
  }
}

let squareOnClick = (event) => {
  debugger;
  let classes = event.target.classList;
  let row;
  let col;
  
  if (gameOver) { return; } //stops invocation if game is over
  
  classes.forEach(className => {
    if (className.slice(0, 3) === 'row') {
      row = Number(className.slice(3));
    }
    if (className.slice(0, 3) === 'col') {
      col = Number(className.slice(3));
    }
  });
  
  if (!isLegalMove(row, col)) {
    return;
  }
  
  makeMove(gamePlayers.yourMove.moves, row, col);
  
  event.target.textContent = gamePlayers.yourMove.symbol;
  
  if (hasWon(gamePlayers.yourMove)) {
    victory(gamePlayers.yourMove);
    gameOver = true;
    whoseMove(gamePlayers);
    return;
  } 
  
  if (!movesRemain(gamePlayers.yourMove, gamePlayers.onDeck)) {
    itsATie();
    gameOver = true;
    whoseMove(gamePlayers)
    return;
  }
  
  swapTurns(gamePlayers);
  whoseMove(gamePlayers);
    
}

let victory = (player) => {
  alert(`${player.name} is the victor.`)
}

let itsATie = () => {
  alert(`It's a tie. Try again.`)
}

let swapTurns = (players) => {
  let justPlayed = players.yourMove;
  players.yourMove = players.onDeck;
  players.onDeck = justPlayed;
}

let drawBoard = (n) => {
  document.getElementById('board').innerHTML = boardDisplay(n);
  addSquareClickHandlers();
  playerOne.moves = Array(n);
  playerTwo.moves = Array(n);
  for (let i = 0; i < n; i++) {
    playerOne.moves[i] = 0;
    playerTwo.moves[i] = 0;
  }
  gameOver = false;
};

let submitHandler = (e) => {
  debugger;
  e.preventDefault();
  let n = document.getElementById('number').value;
  console.log(n);
  if (!(Number(n))) {
    alert('Please input a number!');
  }
  drawBoard(n);  
};

let initialize = () => {
  let form = document.getElementById('start');
  form.addEventListener('submit', (e) => submitHandler(e));
  drawBoard(3);
  whoseMove(gamePlayers);
}

let whoseMove = ({yourMove}) => {
  let indicator = document.getElementById('whoseMove');
  if (gameOver) {
    indicator.textContent = 'GAME OVER'
  } else {
    indicator.textContent = `Your move, ${yourMove.name}`;
  }
}

initialize();


