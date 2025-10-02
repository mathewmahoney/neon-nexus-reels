import { mathEngine } from '../src/core/math';

test('RTP is approximately 96.2%', () => {
  const spins = 100000;
  let totalBet = 0;
  let totalWin = 0;
  
  for (let i = 0; i < spins; i++) {
    const bet = 1;
    totalBet += bet;
    const result = mathEngine.spin({ bet });
    totalWin += result.winAmount;
  }
  
  const rtp = totalWin / totalBet;
  expect(rtp).toBeCloseTo(0.962, 1); // ±1%
});
