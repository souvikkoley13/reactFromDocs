import { useState } from 'react'
import './App.css'
import { use } from 'react';

function Box({key, className, value, onSquareClick}){
  return(
    <button key = {key} className={`box ${className}`} onClick={onSquareClick}>{value}</button>
  )
}

function Board({isX, square, onMove}){
  
  const winInfo = findWinner(square);
  const winner = winInfo? winInfo.win : null;
  const lines = winInfo? winInfo.line : [];

  function handleClick(i){

    if(square[i] || findWinner(square)){
      return;
    }

    const nextSquares = square.slice();
    
    nextSquares[i] = isX? "X": "O";
    onMove(nextSquares);
  }

  const rows = []
  for (let i = 0; i < 3; i++) {
    let boxes = [];
    for (let j = 0; j < 3; j++) {

      let index = i * 3 + j 

      const winBox = lines.includes(index)
      boxes.push(<Box key = {index} className = {`box${index} ${winBox ? "winner-glow" : ""}`} value = {square[index]} onSquareClick={() => handleClick(index)}/>)
    }
    rows.push(
      <div key = {i} className='boardRow'>
      {boxes}
      </div>
    ) 
  }
  
  
  let status;
    
  if (winner) {
    status = "Winner is " + winner;
  } else {
    status = "Move: " + (isX? "X": "O");
  }

  return (
    <>
      <div>
        {status}
      </div>
      {rows}
    </>
  )
}

function Game() {
  
  const [isX, setX] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  let tempMove;

  function handleMove(nextSquares){
    const nextHistory = [...history.slice(0,currentMove+1),nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1)
    setX(!isX);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setX(nextMove % 2 === 0);
  }

  let moveCount;
  const [ascending, setAscending] = useState(true)

  function toggle() {
    
    if(ascending){
      history.reverse();
    } else if (!ascending) {
      history.reverse();
    } 
    setAscending(!ascending);
    
  }
  
  tempMove = history.length - 1;
  const moves = history.map((square,move) => {
    let description;
    let move2;
    moveCount = move
    if (!ascending) {
      move2 = Math.abs(tempMove-move)
    } else {
      move2 = move
    }

    if(move2 > 0){
      description = "jump to move #" + move2;
    } else {
      description = "Jump to start";
    }
    return(
        <div key = {move} >
          <button onClick={() => jumpTo(move)}>{description}</button>
        </div>
    )
  }) 

  return(
    <>
      <div className='board'>
        <Board isX = {isX} square = {currentSquare} onMove = {handleMove}/>
      </div>
      <div>
        <h4>past</h4>
        <button onClick={toggle}>toggle</button>
        {moves}
        You are at move #{moveCount+1}
      </div>
    </>
  )
}

function findWinner(square) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return {win: square[a], line : [a, b, c]};
    }
  }
  return null;
}

function App() {
  
  return (
    <>
      <div className='game'>
        <Game />
      </div>
    </>
  )
}

export default App
