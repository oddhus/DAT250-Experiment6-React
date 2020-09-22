import React, { useState, useEffect } from "react";
import { calculateWinner } from "../util/calculateWinner";
import Board from "./Board";
import "../index.css";

const Game = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill("") as string[] },
  ]);
  const [isNext, setIsNext] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("Next player: X");
  const [step, setStep] = useState(0);

  function handleClick(i: number) {
    const historyCopy = history.slice(0, step + 1);
    const current = historyCopy[historyCopy.length - 1].squares.slice();
    console.log(current);
    if (calculateWinner(current) || current[i]) {
      return;
    }
    current[i] = isNext ? "X" : "O";
    setHistory([...historyCopy, { squares: current }]);
    setIsNext(!isNext);
    setStep(historyCopy.length);
  }

  function jumpTo(step: number) {
    setStep(step);
    setIsNext(step % 2 === 0);
  }

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  useEffect(() => {
    const winner = calculateWinner(history[history.length - 1].squares);
    if (winner) {
      setStatus("Winner: " + winner);
    } else {
      setStatus("Next player: " + (isNext ? "X" : "O"));
    }
  }, [history, isNext, status]);

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={handleClick} squares={history[step].squares} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
