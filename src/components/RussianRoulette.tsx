'use client';

import { useState } from 'react';

type GameState = 'idle' | 'spinning' | 'safe' | 'dead' | 'won';

const createNewGame = () => {
  const bulletPosition = Math.floor(Math.random() * 6);
  const chambers = Array(6).fill(false);
  chambers[bulletPosition] = true;
  return chambers;
};

export default function RussianRoulette() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [chambers, setChambers] = useState<boolean[]>(() => createNewGame());
  const [currentChamber, setCurrentChamber] = useState(0);
  const [shotsLeft, setShotsLeft] = useState(6);
  const [score, setScore] = useState(0);
  const [rotation, setRotation] = useState(0);

  const initializeGame = () => {
    const newChambers = createNewGame();
    setChambers(newChambers);
    setCurrentChamber(0);
    setShotsLeft(6);
    setGameState('idle');
  };

  const spinCylinder = () => {
    if (gameState !== 'idle' && gameState !== 'safe') return;
    
    // Reset the gun with new bullet position
    initializeGame();
    
    // Spin animation
    const newRotation = rotation + 360 + Math.random() * 720;
    setRotation(newRotation);
  };

  const pullTrigger = () => {
    if (gameState !== 'idle' && gameState !== 'safe') return;

    // Check current chamber immediately (no delay, no spin)
    const isBullet = chambers[currentChamber];
    
    // Always advance to next chamber to show the color
    setCurrentChamber(currentChamber + 1);
    
    if (isBullet) {
      setGameState('dead');
    } else {
      const newScore = score + 1;
      setScore(newScore);
      const newShotsLeft = shotsLeft - 1;
      setShotsLeft(newShotsLeft);
      
      if (newShotsLeft === 0) {
        setGameState('won');
      } else {
        setGameState('safe');
      }
    }
  };

  const resetGame = () => {
    initializeGame();
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black text-white p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          Russian Roulette
        </h1>

        {/* Revolver */}
        <div className="relative w-48 h-48 mx-auto">
          <div 
            className="absolute inset-0 transition-transform duration-1500 ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Cylinder */}
            <div className="w-full h-full rounded-full border-4 border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800 shadow-2xl relative">
              {chambers.map((_, index) => {
                const angle = (360 / 6) * index;
                const radian = (angle * Math.PI) / 180;
                const x = 50 + 35 * Math.cos(radian);
                const y = 50 + 35 * Math.sin(radian);
                
                return (
                  <div
                    key={index}
                    className={`absolute w-6 h-6 rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      index < currentChamber 
                        ? chambers[index]
                          ? 'bg-red-600 border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.8)]'
                          : 'bg-green-600 border-green-500 shadow-[0_0_10px_rgba(22,163,74,0.8)]'
                        : 'bg-gray-600 border-gray-500'
                    }`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                  />
                );
              })}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Probability */}
        <div className="text-xl text-gray-400">
          Probability of Death: <span className="text-red-400 font-bold">{((1 / shotsLeft) * 100).toFixed(1)}%</span>
        </div>

        {/* Game Over Messages */}
        {gameState === 'dead' && (
          <div className="space-y-4">
            <p className="text-4xl font-bold text-red-600 animate-pulse">
              💀 BANG! Game Over!
            </p>
            <p className="text-xl text-gray-300">
              You survived {score} shot{score !== 1 ? 's' : ''}
            </p>
          </div>
        )}
        
        {gameState === 'won' && (
          <div className="space-y-4">
            <p className="text-4xl font-bold text-yellow-400 animate-bounce">
              🎉 You Won! You survived all 6 shots!
            </p>
            <p className="text-xl text-gray-300">
              Incredible luck or incredible courage?
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 justify-center">
          {(gameState === 'idle' || gameState === 'safe') && (
            <>
              <button
                onClick={pullTrigger}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xl rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pull Trigger
              </button>
              
              {gameState === 'safe' && (
                <p className="text-2xl font-bold text-green-400 animate-bounce py-6">
                  ✓ Click! You&apos;re safe... for now.
                </p>
              )}
              
              {gameState === 'idle' ? (
                <button
                  onClick={spinCylinder}
                  className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-xl rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95"
                >
                  Spin Cylinder
                </button>
              ) : (
                <button
                  onClick={spinCylinder}
                  className="text-sm text-gray-500 hover:text-gray-400 transition-colors underline"
                >
                  Spin Cylinder
                </button>
              )}
            </>
          )}
          
          {(gameState === 'dead' || gameState === 'won') && (
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-lg shadow-lg transform transition hover:scale-105 active:scale-95"
            >
              Play Again
            </button>
          )}
        </div>

        {/* Status Messages Below Buttons */}
        {gameState === 'spinning' && (
          <p className="text-2xl font-bold text-yellow-400 animate-pulse">
            Spinning the cylinder...
          </p>
        )}

        {/* Warning */}
        <div className="mt-12 p-4 bg-yellow-900/30 border border-yellow-600/50 rounded-lg">
          <p className="text-sm text-yellow-400">
            ⚠️ This is a game. Never play with real weapons. Stay safe!
          </p>
        </div>
      </div>
    </div>
  );
}
