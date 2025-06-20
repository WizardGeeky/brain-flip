"use client";

import { useState, useEffect } from "react";

const images: string[] = [
  "🍎",
  "🍌",
  "🍇",
  "🍉",
  "🍓",
  "🍒",
  "🥑",
  "🥕",
  "🍎",
  "🍌",
  "🍇",
  "🍉",
  "🍓",
  "🍒",
  "🥑",
  "🥕",
];

const totalPairs = images.length / 2;

const shuffleArray = (array: string[]): string[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function MindGame() {
  const [grid, setGrid] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    setGrid(shuffleArray(images));
  }, []);

  const handleScratch = (index: number) => {
    if (
      selected.length < 2 &&
      !selected.includes(index) &&
      !matched.includes(grid[index])
    ) {
      setSelected([...selected, index]);
      setGameStarted(true);
    }
  };

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (grid[first] === grid[second]) {
        setMatched([...matched, grid[first]]);
      } else {
        setTimeout(() => {
          let newGrid = [...grid];
          [newGrid[first], newGrid[second]] = [newGrid[second], newGrid[first]];
          setGrid(newGrid);
        }, 1000);
      }
      setTimeout(() => setSelected([]), 1000);
    }
  }, [selected]);

  const resetGame = () => {
    setGrid(shuffleArray(images));
    setSelected([]);
    setMatched([]);
    setGameStarted(false);
  };

  const progress = (matched.length / totalPairs) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-violet-600">
      <p className="text-center py-8 font-bold text-5xl text-white">
        Brain Flip
      </p>

      {/* Progress Bar */}
      {gameStarted && (
        <div className="w-full max-w-lg bg-white rounded-full h-6 mb-6 relative">
          <div
            className="h-6 rounded-full bg-violet-900 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
          <span className="absolute inset-0 flex items-center justify-center text-violet-600 font-bold">
            {Math.round(progress)}%
          </span>
        </div>
      )}

      <div className="grid grid-cols-4 gap-6 p-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        {grid.map((item, index) => (
          <div
            key={index}
            className="w-full aspect-square bg-white flex items-center justify-center cursor-pointer border-0 border-black transition-transform transform hover:scale-110"
            onClick={() => handleScratch(index)}
          >
            <span className="text-4xl sm:text-5xl md:text-6xl">
              {selected.includes(index) || matched.includes(item) ? item : "❓"}
            </span>
          </div>
        ))}
        {matched.length === totalPairs && (
          <div className="col-span-4 text-white text-2xl sm:text-3xl font-bold mt-4">
            You Win!
          </div>
        )}
      </div>

      {/* Reset Button */}
      {gameStarted && (
        <button
          onClick={resetGame}
          className="mt-6 bg-white text-violet-600 px-6 py-2 rounded-md text-lg font-semibold hover:bg-white transition"
        >
          Reset Game
        </button>
      )}
    </div>
  );
}
