import React, { useState } from 'react';
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

  const setSymbol = (previousGrid, row, col, player) => {
    if (previousGrid[row][col]) {
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

  return (
    <div className="app">
      <div className="container">
        {renderGrid(grid)}
      </div>
    </div>
  );
}

export default App;
