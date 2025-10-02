export interface Symbol {
  id: string;
  name: string;
  value: number;
  isWild?: boolean;
  isScatter?: boolean;
}

export interface ReelStrip {
  symbols: string[];
}

export interface SpinResult {
  reels: string[][];
  winAmount: number;
  isFreeSpin: boolean;
  freeSpinsRemaining?: number;
  neuralWilds?: { reel: number; row: number }[];
}
