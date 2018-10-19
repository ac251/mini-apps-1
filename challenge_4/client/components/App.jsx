import React from 'react';
import GameBoard from './GameBoard.jsx';
import GameStatus from './GameStatus.jsx';
import Game from './GameLogic.js';


class App extends React.Component {
  constructor() {
    super();
    this.currentGame = new Game();
    this.initialState = {
      board: this.currentGame.toMatrix(),
      playerUp: this.currentGame.red,
      playerNext: this.currentGame.black,
      gameOver: false,
      gameTied: false
    };
    this.state = Object.assign({}, this.initialState);
  }
  
  makeMove(col) {
    if(this.state.gameOver) {
      return;
    }
    
    let moveCoordinates;
    try {
      moveCoordinates = this.currentGame.makeMove(this.state.playerUp, col);
    } catch(err) {
      alert(err);
    }
    
    let won = this.currentGame.hasWon(this.state.playerUp, moveCoordinates);
    let tied = this.currentGame.isTied();
    
    if (won) {
      this.setState({board: this.currentGame.toMatrix()});
      return this.gameOver();
    }
    
    if (tied) {
      this.setState({board: this.currentGame.toMatrix(), gameTied: true});
      return this.gameOver();
    }
    
    this.setState({
      board: this.currentGame.toMatrix(),
      playerUp: this.state.playerNext,
      playerNext: this.state.playerUp
    });
  }
  
  gameOver() {
    this.setState({gameOver: true});
  }
  
  newGame() {
    this.currentGame = new Game();
    this.setState({
      board: this.currentGame.toMatrix(),
      playerUp: this.currentGame.red,
      playerNext: this.currentGame.black,
      gameOver: false,
      gameTied:false
    });
  }
  
  render() {
    return (
      <div>
        <header>Connect Four! <button onClick={() => this.newGame()}>new game</button></header>
        <GameBoard matrix={this.state.board} click={col => this.makeMove(col)} />
        <GameStatus gameTied={this.state.gameTied} gameOver={this.state.gameOver} player={this.state.playerUp.name} />
      </div>
    );
  }
}
export default App;
  



