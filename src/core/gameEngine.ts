import { generateSpin } from './math';
import { SpinResult } from '../types/gameTypes';

export class GameEngine {
  private freeSpins = 0;
  private neuralWilds: { reel: number; row: number }[] = [];
  private consecutiveWins = 0;

  spin(bet: number): SpinResult {
    let result = generateSpin(bet);

    // Neural Wild Logic: Expand wilds after 2+ wins
    if (result.winAmount > 0) {
      this.consecutiveWins++;
      if (this.consecutiveWins >= 2) {
        this.neuralWilds = this.expandNeuralWilds(result.reels);
        result.neuralWilds = this.neuralWilds;
      }
    } else {
      this.consecutiveWins = 0;
      this.neuralWilds = [];
    }

    // Free Spins
    const scatterCount = result.reels.flat().filter(s => s === 'DataCore').length;
    if (scatterCount >= 3 && this.freeSpins === 0) {
      this.freeSpins = 10 + (scatterCount - 3) * 2; // 10-14 FS
    }

    if (this.freeSpins > 0) {
      this.freeSpins--;
      result.isFreeSpin = true;
      result.freeSpinsRemaining = this.freeSpins;
    }

    return result;
  }

  private expandNeuralWilds(reels: string[][]): { reel: number; row: number }[] {
    const newWilds: { reel: number; row: number }[] = [];
    reels.forEach((reel, rIdx) => {
      reel.forEach((sym, row) => {
        if (sym === 'NeuralWild') {
          // Expand to adjacent rows
          if (row > 0) newWilds.push({ reel: rIdx, row: row - 1 });
          if (row < 2) newWilds.push({ reel: rIdx, row: row + 1 });
        }
      });
    });
    return newWilds;
  }
}
