import React, { useState } from "react";
import "./App.css";

import NumberCard from "./components/number-card";
import DigitInput from "./components/digit-input";
import GameButton from "./components/game-button";
import TitleCard from "./components/title-card";

export default function App() {
  const [digitCount, setDigitCount] = useState("");
  const [targetNumber, setTargetNumber] = useState("");
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameRestart, setGameRestart] = useState(false);

  const generateRandomNumber = (digits) => {
    let num = "";
    for (let i = 0; i < digits; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  };

  const startGame = () => {
    if (!digitCount || digitCount <= 0) {
      alert("Enter a valid digit count!");
      return;
    }
    const num = generateRandomNumber(Number(digitCount));
    setTargetNumber(num);
    setHistory([]);
    setMessage("");
    setGameStarted(true);
    setGuess("");
  };

  const checkGuess = () => {
    if (guess.length !== Number(digitCount)) {
      alert(`Enter a ${digitCount}-digit number!`);
      return;
    }

    let correctDigits = 0;
    let correctPositions = 0;

    const targetArr = targetNumber.split("");
    const guessArr = guess.split("");

    // Count correct positions
    guessArr.forEach((d, i) => {
      if (d === targetArr[i]) correctPositions++;
    });

    // Count correct digits (regardless of position)
    const targetCount = {};
    const guessCount = {};

    targetArr.forEach((d) => (targetCount[d] = (targetCount[d] || 0) + 1));
    guessArr.forEach((d) => (guessCount[d] = (guessCount[d] || 0) + 1));

    for (let d in guessCount) {
      if (targetCount[d]) {
        correctDigits += Math.min(targetCount[d], guessCount[d]);
      }
    }

    const entry = {
      guess,
      correctDigits,
      correctPositions,
    };
    setHistory((prev) => [entry, ...prev]);

    if (guess === targetNumber) {
      setMessage(`🎉 You got it right! \n The number was ${targetNumber}!`);
      setGameStarted(false);
      setGameRestart(true);
    }

    setGuess("");
  };

  return (
    <div className="game-container">
      <div className="title-card-container"><TitleCard title={"Crack+Number"} subtitle={`Crack the mystery number!`} promptLabel={"Crackr"}/></div>
      
      {history.length > 0 ? (
        <div className="guess-history-container">
          <h2 className="game-banner">Previous Guesses</h2>
          {history.map((h, i) => (
            <div
              key={i}
              style={{ margin: "10px" }}
            >
              <NumberCard
                guessedNumber={h.guess}
                digits={h.correctDigits}
                positions={h.correctPositions}
              />
            </div>
          ))}
        </div>
      ): (
        <div style={{ flex: "1 1 auto" }}></div>
      )}

      {!gameStarted ? (
        gameRestart ? (
          <div className="game-section">
            <div className="game-banner" style={{whiteSpace: "pre-line"}}><p>{message}</p></div>
            <GameButton title="Play Again" onClick={() => {
              setGameRestart(false);
              setMessage("");
              setDigitCount("");
              setHistory([]);
            }} />
          </div>
        ) : (
          <div className="game-start-section">
            <DigitInput
              value={digitCount}
              onChange={setDigitCount}
              onEnter={startGame}
              placeholder="Enter number of digits"
            />
            <GameButton title="Start" onClick={startGame} />
          </div>
        )
      ) : (
        <div className="game-section">
          <div className="game-banner"><p>Guess the {digitCount}-digit number!</p></div>
            <div className="game-check-section">
            <DigitInput
              value={guess}
              onChange={setGuess}
              onEnter={checkGuess}
              placeholder="Enter your guess"
              maxDigits={digitCount}
            />
            <GameButton title={"Check"} onClick={checkGuess} />
            </div>
        </div>
      )}

    </div>
  );
}
