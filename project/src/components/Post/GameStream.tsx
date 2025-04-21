import React, { useEffect, KeyboardEvent } from 'react';

interface GameStreamProps {
  gameUrl?: string;
  videoRef?: React.RefObject<HTMLVideoElement>;
  onExit: () => void;
  isStreaming: boolean;
  onKeyPress?: (key: string) => void;
  onMouseMove?: (x: number, y: number) => void;
  type: 'game_post' | 'exe_post';
}

const GameStream: React.FC<GameStreamProps> = ({
  gameUrl,
  videoRef,
  onExit,
  isStreaming,
  onKeyPress,
  onMouseMove,
  type
}) => {
  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
    };

    window.addEventListener('keydown', handleEscKey as unknown as EventListener);
    return () => window.removeEventListener('keydown', handleEscKey as unknown as EventListener);
  }, [onExit]);

  // Set up game input event handlers
  useEffect(() => {
    if (!isStreaming) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (onKeyPress) {
        onKeyPress(e.key);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (onMouseMove) {
        onMouseMove(e.clientX, e.clientY);
      }
    };

    document.addEventListener('keydown', handleKeyDown as unknown as EventListener);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('keydown', handleKeyDown as unknown as EventListener);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isStreaming, onKeyPress, onMouseMove]);

  // Unified handler for keyboard input in the container
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (onKeyPress) {
      onKeyPress(event.key);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-white dark:bg-gray-800 h-full"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className="h-full w-full relative">
        {type === 'game_post' && gameUrl ? (
          <iframe
            src={gameUrl}
            title="Game Preview"
            className="w-full h-full"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : type === 'exe_post' && videoRef ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: '100%',
              height: `${window.innerHeight * 0.7}px`, // 70% of screen
              objectFit: 'contain',
            }}
          />
        ) : null}
        
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
          Press Escape to exit
        </div>
      </div>
    </div>
  );
};

export default GameStream;