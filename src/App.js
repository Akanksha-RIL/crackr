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
    setHistory((prev) => [...prev, entry]);

    if (guess === targetNumber) {
      setMessage(`🎉 You got it right! The number was ${targetNumber}!`);
      setGameStarted(false);
      setGameRestart(true);
    }

    setGuess("");
  };

  return (
    <div className="game-container">
      <TitleCard title={"Crackr"} subtitle={`Crack the mystery number!`} promptLabel={"Crack+Number"}/>

      {!gameStarted ? (
        gameRestart ? (
          <GameButton title="Play Again" onClick={() => {
            setGameRestart(false);
            setMessage("");
            setDigitCount("");
            setHistory([]);
          }} />
        ) : (
          <div className="game-start-section">
            <DigitInput
              value={digitCount}
              onChange={setDigitCount}
              placeholder="Enter number of digits"
            />
            <GameButton title="Start Game" onClick={startGame} />
          </div>
        )
      ) : (
        <div className="game-section">
          <div className="game-banner"><p>Guess the {digitCount}-digit number!</p></div>
            <div className="game-check-section">
            <DigitInput
              value={guess}
              onChange={setGuess}
              placeholder="Enter your guess"
              maxDigits={digitCount}
            />
            <GameButton title={"Check Guess"} onClick={checkGuess} />
            </div>
        </div>
      )}

      {message && <p className="game-banner">{message}</p>}

      {history.length > 0 && (
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
      )}
    </div>
  );
}
