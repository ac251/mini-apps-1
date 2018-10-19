import React from 'react';

const GameStatus = (props) => {
  if (props.gameTied) {
    return (<div className="status">It's a tie.</div>);
  }
  if (props.gameOver) {
    return (<div className="status">Game Over. {props.player} wins.</div>);
    
  }
  return (<div className="status">{props.player}, your turn.</div>);
  
}
export default GameStatus;
