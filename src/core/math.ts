import { MathEngine, Paytable, SymbolSet, ReelStrip } from '@stake-engine/math-sdk';

const SYMBOLS: SymbolSet = {
  low: ['A', 'K', 'Q', 'J', '10'],
  high: ['NeonCat', 'CyberDog', 'Hacker', 'AI'],
  wild: ['NeuralWild'],
  scatter: ['DataCore']
};

const PAYTABLE: Paytable = {
  // Example: 5x NeonCat = 50x bet
  NeonCat: [0, 0, 5, 15, 50],
  CyberDog: [0, 0, 4, 12, 40],
  Hacker: [0, 0, 3, 10, 30],
  AI: [0, 0, 2, 8, 25],
  A: [0, 0, 1, 3, 10],
  K: [0, 0, 1, 2.5, 8],
  // ... others
};

const REEL_STRIPS: ReelStrip[] = [
  ['A', 'K', 'NeonCat', '10', 'NeuralWild', 'J', 'CyberDog', 'Q', 'DataCore'],
  // ... define 5 strips with weighted distribution
  // Ensure hit frequency ~22%, RTP = 96.2% per math-sdk guidelines
];

export const mathEngine = new MathEngine({
  symbols: SYMBOLS,
  paytable: PAYTABLE,
  reelStrips: REEL_STRIPS,
  rtp: 0.962,
  volatility: 'high'
});

export function generateSpin(bet: number): SpinResult {
  return mathEngine.spin({ bet });
}
