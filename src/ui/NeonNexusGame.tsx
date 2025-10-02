import React, { useState, useEffect } from 'react';
import { GameClient } from '@stake-engine/ts-client';
import { GameEngine } from '../core/gameEngine';
import Reel from './components/Reel';
import './NeonNexusGame.css';

const NeonNexusGame: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const gameEngine = new GameEngine();
  const client = new GameClient();

  useEffect(() => {
    client.on('balanceUpdate', (newBalance) => setBalance(newBalance));
    client.initialize();
  }, []);

  const handleSpin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    try {
      const result = gameEngine.spin(bet);
      setLastResult(result);
      
      // Send result to Stake Engine
      await client.submitSpin({
        betAmount: bet,
        winAmount: result.winAmount,
        metadata: { reels: result.reels, freeSpins: result.freeSpinsRemaining }
      });
    } catch (err) {
      console.error('Spin failed', err);
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="neon-nexus-game">
      <div className="header">
        <h1>NEON NEXUS REELS</h1>
        <div className="balance">Balance: ${balance.toFixed(2)}</div>
      </div>
      
      <Reel reels={lastResult?.reels || [['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']]} />
      
      <div className="controls">
        <button onClick={() => setBet(Math.max(0.1, bet - 0.1))}>-</button>
        <span>Bet: ${bet}</span>
        <button onClick={() => setBet(Math.min(100, bet + 0.1))}>+</button>
        <button 
          className="spin-btn" 
          onClick={handleSpin} 
          disabled={isSpinning}
        >
          {isSpinning ? 'SPINNING...' : 'SPIN'}
        </button>
      </div>
    </div>
  );
};

export default NeonNexusGame;
