import React, { useState } from "react";

export default function App() {
  const [digitCount, setDigitCount] = useState("");
  const [targetNumber, setTargetNumber] = useState("");
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

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
    console.log("Target number:", num); // For debugging
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
      setMessage(`🎉 You got it right! The number was ${targetNumber}.`);
      setGameStarted(false);
    } else {
      setMessage(
        `Digits correct: ${correctDigits}, Positions correct: ${correctPositions}`
      );
    }

    setGuess("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🔢 Number Guessing Game</h1>

      {!gameStarted ? (
        <div className="flex flex-col items-center gap-3">
          <input
            type="number"
            value={digitCount}
            onChange={(e) => setDigitCount(e.target.value)}
            placeholder="Enter number of digits"
            className="border p-2 rounded w-48 text-center"
          />
          <button
            onClick={startGame}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <p className="text-gray-700">Guess the {digitCount}-digit number!</p>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="border p-2 rounded w-48 text-center"
            placeholder="Enter your guess"
          />
          <button
            onClick={checkGuess}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Check Guess
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-lg">{message}</p>}

      {history.length > 0 && (
        <div className="mt-6 w-full max-w-md bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2 text-center">Previous Guesses</h2>
          <ul className="space-y-1">
            {history.map((h, i) => (
              <li
                key={i}
                className="border-b border-gray-200 py-1 text-center text-gray-700"
              >
                {h.guess} → Digits: {h.correctDigits}, Positions:{" "}
                {h.correctPositions}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}