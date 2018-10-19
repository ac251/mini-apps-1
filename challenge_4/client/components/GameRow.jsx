import React from 'react';

const GameRow = (props) => {
  let row = props.array.map((spot, idx) => {
    let classMap = {
      'R': 'red',
      'B': 'black',
      'X': 'empty'
    }
      return <div className={classMap[spot]} onClick={() => props.click(idx)}></div>
  });
  
  return <div>{row}</div>
};



export default GameRow;