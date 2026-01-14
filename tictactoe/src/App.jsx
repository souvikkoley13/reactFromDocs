import { useState } from 'react'
import './App.css'

function Box({value, onSquareClick}){
  return(
    <button className='box' onClick={onSquareClick}>{value}</button>
  )
}

function Board({isX, square, onMove}){
 
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
      boxes.push(<Box value = {square[index]} onSquareClick={() => handleClick(index)}/>)
    }
    rows.push(
      <div key = {i} className='boardRow'>
      {boxes}
      </div>
    ) 
  }
  
  const winner = findWinner(square);
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

  const moves = history.map((square,move) => {
    let description;
    moveCount = move
    if(move > 0){
      description = "jump to move #" + move;
    } else {
      description = "Jump to start";
    }
    return(
        <li key = {move} >
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
    )
  }) 

  return(
    <>
      <div className='board'>
        <Board isX = {isX} square = {currentSquare} onMove = {handleMove}/>
      </div>
      <div>
        <h4>past</h4>
        <ul>{moves}</ul>
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
      return square[a];
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
