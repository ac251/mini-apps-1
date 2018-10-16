// let playerOne = {
//   name: 'player one',
//   symbol: 'X',
//   moves: [0, 0, 0],
//   gamesWon: 0
// };
// let playerTwo = {
//   name: 'player two',
//   symbol: 'O',
//   moves: [0, 0, 0],
//   gamesWon: 0
// };

// let gamePlayers = {
//   yourMove: playerOne,
//   onDeck: playerTwo,
// };

let gameState = {
  
  playerOne: {
  name: 'player one',
  symbol: 'X',
  moves: [0, 0, 0],
  gamesWon: 0
  },
  
  playerTwo: {
    name: 'player two',
    symbol: 'O',
    moves: [0, 0, 0],
    gamesWon: 0
  },
  
  
  // yourMove: this.playerOne,
  // onDeck: this.playerTwo,
  
  
  lastWinner: undefined
  
};

gameState.yourMove = gameState.playerOne;
gameState.onDeck = gameState.playerTwo;

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

let isLegalMove = (playerOne, playerTwo, row, col) => {
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

let swapTurns = (players) => {
  let justPlayed = players.yourMove;
  players.yourMove = players.onDeck;
  players.onDeck = justPlayed;
};

let boardDisplay = (n) => {
  let board = '';
  for (let row = 0; row < n; row ++) {
    board += '<div class="row">'
    for (let col = 0; col < n; col++) {
      board += `<div class="square row${row} col${col}">&#9744;</div>`;
    }
    board += '</div>';    
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
  
  if (!isLegalMove(gameState.playerOne, gameState.playerTwo, row, col)) {
    return;
  }
  
  makeMove(gameState.yourMove.moves, row, col);
  
  event.target.textContent = gameState.yourMove.symbol;
  
  if (hasWon(gameState.yourMove)) {
    gameState.yourMove.gamesWon++;
    gameState.lastWinner = gameState.yourMove;
    victory(gameState.yourMove);
    gameOver = true;
    gameState.lastWinner = gameState.yourMove;
    whoseMove(gameState);
    return;
  } 
  
  if (!movesRemain(gameState.yourMove, gameState.onDeck)) {
    itsATie();
    gameOver = true;
    whoseMove(gameState);
    return;
  }
  
  swapTurns(gameState);
  whoseMove(gameState);
    
}

let victory = (player) => {
  alert(`${player.name} is the victor.`)
  displayWins();
}

let itsATie = () => {
  alert(`It's a tie. Try again.`)
}



let drawBoard = (n) => {
  document.getElementById('board').innerHTML = boardDisplay(n);
  addSquareClickHandlers();
  gameState.playerOne.moves = Array(n);
  gameState.playerTwo.moves = Array(n);
  for (let i = 0; i < n; i++) {
    gameState.playerOne.moves[i] = 0;
    gameState.playerTwo.moves[i] = 0;
  }
  gameOver = false;
  if (gameState.lastWinner === gameState.playerTwo) {
    gameState.yourMove = gameState.playerTwo;
    gameState.onDeck = gameState.playerOne;
  } else {
    gameState.yourMove = gameState.playerOne;
    gameState.onDeck = gameState.playerTwo;
  }
  gameState.yourMove.symbol = 'X';
  gameState.onDeck.symbol = 'O';
  whoseMove(gameState);
};

let submitHandler = (e) => {
  e.preventDefault();
  let input = document.getElementById('number').value;
  let n = input === '' ? 3 : Number(input);
  if (!n) {
    alert('Please input a number!');
    return;
  }
  if (n > 25) {
    alert('That\'s a little too big!');
    return;
  }
  drawBoard(n);  
};

let initialize = () => {
  let form = document.getElementById('start');
  form.addEventListener('submit', (e) => submitHandler(e));
  drawBoard(3);
  gameState.playerOne.name = promptForName('Player One');
  gameState.playerTwo.name = promptForName('Player Two');
  whoseMove(gameState);
}

let promptForName =(str) => {
  return prompt(`${str}, what is your name?`, str);
};

let whoseMove = ({yourMove}) => {
  let indicator = document.getElementById('whoseMove');
  if (gameOver) {
    indicator.textContent = 'GAME OVER'
  } else {
    indicator.textContent = `Your move, ${yourMove.name}`;
  }
}

let displayWins = () => {
  document.getElementById('playerOneScore').textContent = `${gameState.playerOne.name} has won ${gameState.playerOne.gamesWon}`;
  document.getElementById('playerTwoScore').textContent = `${gameState.playerTwo.name} has won ${gameState.playerTwo.gamesWon}`;
};



initialize();


