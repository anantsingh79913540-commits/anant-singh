
import React from 'react';

const CONFETTI_COUNT = 100;
const COLORS = ['#f4a261', '#e76f51', '#2a9d8f', '#e9c46a', '#f4f1de', '#fec5bb'];

const ConfettiPiece: React.FC<{ index: number }> = ({ index }) => {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const style: React.CSSProperties = {
    left: `${Math.random() * 100}vw`,
    width: `${Math.random() * 10 + 5}px`,
    height: `${Math.random() * 8 + 5}px`,
    backgroundColor: color,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${5 + Math.random() * 10}s`,
  };

  return <div className="absolute top-0 animate-fall" style={style}></div>;
};

const Confetti: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </div>
  );
};

export default Confetti;
