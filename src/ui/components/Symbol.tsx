import React from 'react';
import { Sprite, Texture } from 'pixi.js';

interface SymbolProps {
  symbolId: string;
  isNeuralWild?: boolean;
}

const Symbol: React.FC<SymbolProps> = ({ symbolId, isNeuralWild }) => {
  const texture = Texture.from(`/assets/symbols/${symbolId}.png`);
  
  return (
    <div className="symbol-container">
      <canvas ref={(el) => {
        if (el) {
          const app = new PIXI.Application({ view: el, width: 120, height: 120, transparent: true });
          const sprite = new Sprite(texture);
          if (isNeuralWild) {
            sprite.tint = 0x00ffff; // Cyan glow
            // Add pulsing animation via GSAP
          }
          app.stage.addChild(sprite);
        }
      }} />
    </div>
  );
};

export default Symbol;
