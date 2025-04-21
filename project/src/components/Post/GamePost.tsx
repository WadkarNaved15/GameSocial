import React, { useState } from 'react';
import PostHeader from './PostHeader';
import PostInteractions from './PostInteractions';
import GameStream from './GameStream';
import { useSocket } from '../../context/socket';

interface GamePostProps {
  _id: string;
  type: 'normal_post' | 'game_post' | 'exe_post';
  user: {
    _id: string;
    username: string;
    email: string;
  };
  description: string;
  media: string[];
  gameUrl: string;
  createdAt: string;
  updatedAt: string;
  likes?: number;
  comments?: number;
}

const GamePost: React.FC<GamePostProps> = ({
  type,
  user,
  description,
  media,
  gameUrl,
  createdAt,
  likes = 0,
  comments = 0,
}) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  
  const socket = useSocket();
  const timestamp = new Date(createdAt).toLocaleString();

  // Handle game start
  const handleGameStart = () => {
    setIsGameStarted(true);
    setIsStreaming(true);
  };

  // Handle game exit
  const handleGameExit = () => {
    setIsGameStarted(false);
    setIsStreaming(false);
  };

  // Handle key press
  const handleKeyPress = (key: string) => {
    if (socket && isStreaming) {
      socket.emit('game_input', key);
    }
  };

  // Handle mouse move
  const handleMouseMove = (x: number, y: number) => {
    if (socket && isStreaming) {
      socket.emit('mouse', { x, y });
    }
  };

  return (
    <>
      <article className="bg-white border-b-2 w-full border-gray-200 dark:border-gray-600 dark:bg-gray-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="p-4">
          <PostHeader 
            username={user.username} 
            timestamp={timestamp} 
          />

          {description && (
            <div className="mb-4">
              <p className="text-gray-800 dark:text-gray-200">{description}</p>
            </div>
          )}

          <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 h-[400px] rounded-xl">
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <button
                onClick={handleGameStart}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <span>Start Game</span>
              </button>
            </div>
          </div>

          <PostInteractions likes={likes} comments={comments} />
        </div>
      </article>

      {isGameStarted && (
        <GameStream 
          gameUrl={gameUrl}
          onExit={handleGameExit}
          isStreaming={isStreaming}
          onKeyPress={handleKeyPress}
          onMouseMove={handleMouseMove}
          type={type}
        />
      )}
    </>
  );
};

export default GamePost;