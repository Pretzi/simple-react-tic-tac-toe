import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialGrid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  const player1 = "X";
  const player2 = "O";

  const [grid, setGrid] = useState(initialGrid);
  const [playerSymbol, setPlayerSymbol] = useState(player1);
  const [winner, setWinner] = useState();

  useEffect(() => {
    gridStatus(grid)
  }, [grid])

  const renderGrid = grid => {
    const result = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        result.push(
          <div
            onClick={() => setSymbol(grid, row, col, playerSymbol)}
            className="square"
            key={`${row}-${col}`}
          >
            {grid[row][col]}
          </div>
        )
      }
    }
    return result;
  }

  const setSymbol = (previousGrid, row, col, player) => {
    if (previousGrid[row][col] || winner) {
      return;
    }

    const newGrid = [...previousGrid];
    newGrid[row][col] = player;

    if (player === player1) {
      setPlayerSymbol(player2);

    } else {
      setPlayerSymbol(player1)
    }

    setGrid(newGrid);
  }

  const gridStatus = (grid) => {
    let winner;

    const lineChecker = line => {
      const P1 = line.every(val => val === player1);
      const P2 = line.every(val => val === player2);

      if (P1) {
        winner = 'Player 1'
      }

      if (P2) {
        winner = 'Player 2'
      }

      return P1 || P2
    }

    const verticalGrid = [...initialGrid];
    const diagonalGrid = [
      ['', '', ''],
      ['', '', '']
    ]

    // Checking Horizontal Lines
    for (let row = 0; row < grid.length; row++) {
      if (lineChecker(grid[row])) {
        setWinner(winner)
        return;
      }

      for (let col = 0; col < grid[row].length; col++) {
        const value = grid[row][col];

        //Converting vertical lines to rows
        verticalGrid[col][row] = value

        //Converting diagonla lines to rows
        if (row === col) {
          diagonalGrid[0][col] = grid[row][col];
          diagonalGrid[1][col] = [...grid[row]].reverse()[col]
        }
      }
    }

    // Checking Vertical lines
    for (let row = 0; row < verticalGrid.length; row++) {
      if (lineChecker(verticalGrid[row])) {
        setWinner(winner)
        return;
      }
    }

    for (let row = 0; row < diagonalGrid.length; row++) {
      if (lineChecker(diagonalGrid[row])) {
        setWinner(winner)
        return;
      }
    }
  }

  const renderResults = () => {
    if (winner) {
      return (
        <div className="results">
          <div className="results-title">{winner} wins!</div>
        </div>
      )
    }
    return;
  }

  const playAgain = () => {
    setGrid(initialGrid);
    setWinner(null);
    setPlayerSymbol(player1)
  }


  return (
    <div className="app">
      {renderResults()}
      <div className="grid">
        {renderGrid(grid)}
      </div>
      <div className="play-btn" onClick={playAgain}>
        Play Again
      </div>

    </div>
  );
}

export default App;
