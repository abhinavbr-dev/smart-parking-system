import { useState } from "react";

function TicTacToeGame({ darkMode }) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [vikiTurn, setVikiTurn] = useState(false);
  
    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(Boolean);
  
    const handleClick = (i) => {
      if (board[i] || winner || vikiTurn) return;
  
      const next = [...board];
      next[i] = "X";
      setBoard(next);
      setVikiTurn(true);
  
      setTimeout(() => {
        setBoard((prev) => {
          if (calculateWinner(prev) || prev.every(Boolean)) return prev;
          const move = getSmartMove(prev);
          if (move === -1) return prev;
          const updated = [...prev];
          updated[move] = "O";
          return updated;
        });
        setVikiTurn(false);
      }, 400);
    };
  
    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setVikiTurn(false);
    };
  
    const status = winner
      ? `Winner: ${winner === "X" ? "You" : "VIKI"}`
      : isDraw
      ? "It's a draw"
      : vikiTurn
      ? "VIKI is thinking..."
      : "Your turn: X";
  
    return (
      <div>
        <div className={`mb-4 font-semibold ${darkMode ? "text-white" : "text-gray-700"}`}>
          {status}
        </div>
  
        <div className="grid grid-cols-3 gap-3">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`h-24 rounded-2xl text-3xl font-bold border transition-all ${
                darkMode
                  ? "bg-white/5 border-[#F0A055]/20 text-[#F0A055] hover:bg-white/10"
                  : "bg-gray-50 border-gray-200 text-[#4A6666] hover:bg-gray-100"
              }`}
            >
              {cell}
            </button>
          ))}
        </div>
  
        <button
          onClick={resetGame}
          className={`mt-5 w-full py-3 rounded-2xl font-semibold ${
            darkMode ? "bg-[#F0A055] text-black" : "bg-[#4A6666] text-white"
          }`}
        >
          Restart Game
        </button>
      </div>
    );
  }
  
  function getSmartMove(board) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
  
    for (const [a, b, c] of lines) {
      const line = [board[a], board[b], board[c]];
      if (line.filter((v) => v === "O").length === 2 && line.includes(null)) {
        return [a, b, c][line.indexOf(null)];
      }
    }
  
    for (const [a, b, c] of lines) {
      const line = [board[a], board[b], board[c]];
      if (line.filter((v) => v === "X").length === 2 && line.includes(null)) {
        return [a, b, c][line.indexOf(null)];
      }
    }
  
    if (!board[4]) return 4;
  
    const corners = [0, 2, 6, 8].filter((i) => !board[i]);
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  
    const sides = [1, 3, 5, 7].filter((i) => !board[i]);
    if (sides.length) return sides[Math.floor(Math.random() * sides.length)];
  
    return -1;
  }
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  export default TicTacToeGame;