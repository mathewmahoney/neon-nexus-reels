import React from 'react';
import { createRoot } from 'react-dom/client';
import NeonNexusGame from './ui/NeonNexusGame';
import '@stake-engine/web-sdk/styles.css';

const container = document.getElementById('game-root');
const root = createRoot(container!);
root.render(<NeonNexusGame />);
