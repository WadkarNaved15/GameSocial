import React, { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface GameState {
  paddle1: Position;
  paddle2: Position;
  ball: Position;
  ballSpeed: Position;
  score1: number;
  score2: number;
  gameStarted: boolean;
}

export const PongGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    paddle1: { x: 20, y: 150 },
    paddle2: { x: 460, y: 150 },
    ball: { x: 240, y: 160 },
    ballSpeed: { x: 0, y: 0 },
    score1: 0,
    score2: 0,
    gameStarted: false
  });

  const CANVAS_WIDTH = 480;
  const CANVAS_HEIGHT = 320;
  const PADDLE_HEIGHT = 60;
  const PADDLE_WIDTH = 10;
  const BALL_SIZE = 8;
  const BALL_SPEED = 4;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw paddles
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(gameState.paddle1.x, gameState.paddle1.y, PADDLE_WIDTH, PADDLE_HEIGHT);
      ctx.fillRect(gameState.paddle2.x, gameState.paddle2.y, PADDLE_WIDTH, PADDLE_HEIGHT);

      // Draw ball
      ctx.beginPath();
      ctx.arc(gameState.ball.x, gameState.ball.y, BALL_SIZE, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.closePath();

      // Draw scores
      ctx.font = '24px Arial';
      ctx.fillText(gameState.score1.toString(), CANVAS_WIDTH / 4, 30);
      ctx.fillText(gameState.score2.toString(), (CANVAS_WIDTH * 3) / 4, 30);

      // Draw center line
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      if (!gameState.gameStarted) {
        ctx.font = '20px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Click to Start', CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT / 2);
        ctx.font = '14px Arial';
        ctx.fillText('Use W/S and Up/Down to move paddles', CANVAS_WIDTH / 2 - 100, CANVAS_HEIGHT / 2 + 30);
      }
    };

    draw();
  }, [gameState]);

  useEffect(() => {
    if (!gameState.gameStarted) return;

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        const newState = { ...prev };
        
        // Move ball
        newState.ball.x += newState.ballSpeed.x;
        newState.ball.y += newState.ballSpeed.y;

        // Ball collision with top and bottom
        if (newState.ball.y <= 0 || newState.ball.y >= CANVAS_HEIGHT) {
          newState.ballSpeed.y = -newState.ballSpeed.y;
        }

        // Ball collision with paddles
        if (
          (newState.ball.x <= gameState.paddle1.x + PADDLE_WIDTH &&
            newState.ball.y >= gameState.paddle1.y &&
            newState.ball.y <= gameState.paddle1.y + PADDLE_HEIGHT) ||
          (newState.ball.x >= gameState.paddle2.x - BALL_SIZE &&
            newState.ball.y >= gameState.paddle2.y &&
            newState.ball.y <= gameState.paddle2.y + PADDLE_HEIGHT)
        ) {
          newState.ballSpeed.x = -newState.ballSpeed.x;
        }

        // Score points
        if (newState.ball.x <= 0) {
          newState.score2 += 1;
          newState.ball = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 };
          newState.ballSpeed = { x: BALL_SPEED, y: BALL_SPEED };
        } else if (newState.ball.x >= CANVAS_WIDTH) {
          newState.score1 += 1;
          newState.ball = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 };
          newState.ballSpeed = { x: -BALL_SPEED, y: -BALL_SPEED };
        }

        return newState;
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameState.gameStarted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setGameState(prev => {
        const newState = { ...prev };
        const PADDLE_SPEED = 5;

        switch (e.key) {
          case 'w':
            if (newState.paddle1.y > 0) {
              newState.paddle1.y -= PADDLE_SPEED;
            }
            break;
          case 's':
            if (newState.paddle1.y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
              newState.paddle1.y += PADDLE_SPEED;
            }
            break;
          case 'ArrowUp':
            if (newState.paddle2.y > 0) {
              newState.paddle2.y -= PADDLE_SPEED;
            }
            break;
          case 'ArrowDown':
            if (newState.paddle2.y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
              newState.paddle2.y += PADDLE_SPEED;
            }
            break;
        }

        return newState;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const startGame = () => {
    if (!gameState.gameStarted) {
      setGameState(prev => ({
        ...prev,
        gameStarted: true,
        ballSpeed: { x: BALL_SPEED, y: BALL_SPEED }
      }));
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-2 border-gray-300 rounded-lg cursor-pointer"
        onClick={startGame}
      />
      <div className="text-sm text-gray-600">
        Player 1: W/S keys | Player 2: Up/Down arrows
      </div>
    </div>
  );
};