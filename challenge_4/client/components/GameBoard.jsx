import React from 'react';
import GameRow from './GameRow.jsx';

const GameBoard = (props) => (
  <div>
    {props.matrix.map(row => <GameRow array={row} click={props.click}/>)}
  </div>
);

export default GameBoard;