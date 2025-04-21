import React, { useState, useRef, useEffect } from 'react';
import PostHeader from './PostHeader';
import PostInteractions from './PostInteractions';
import GameStream from './GameStream';
import { useSocket } from '../../context/socket';
import axios from 'axios';

interface ExePostProps {
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

const ExePost: React.FC<ExePostProps> = ({
  type,
  user,
  description,
  media,
  createdAt,
  likes = 0,
  comments = 0,
}) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaSourceRef = useRef<MediaSource | null>(null);
  const sourceBufferRef = useRef<SourceBuffer | null>(null);
  const videoHandlerRef = useRef<any>(null);
  const queueRef = useRef<Uint8Array[]>([]);

  const socket = useSocket();

  const timestamp = new Date(createdAt).toLocaleString();

  useEffect(() => {
    if (socket) {
      socket.binaryType = 'arraybuffer';
    }
  }, [socket]);

  useEffect(() => {
    if (!isStreaming || !videoRef.current || !socket) return;

    const video = videoRef.current;
    const mediaSource = new MediaSource();
    mediaSourceRef.current = mediaSource;

    video.src = URL.createObjectURL(mediaSource);

    const mimeCodecs = [
      'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
      'video/webm; codecs="vp8, opus"',
    ];

    let selectedMimeCodec = '';

    const onSourceOpen = () => {
      for (const mimeCodec of mimeCodecs) {
        if (MediaSource.isTypeSupported(mimeCodec)) {
            console.log("yes")
          selectedMimeCodec = mimeCodec;
          break;
        }
      }

      if (!selectedMimeCodec) {
        console.error('No supported video codec found');
        return;
      }

      try {
        const sourceBuffer = mediaSource.addSourceBuffer(selectedMimeCodec);
        sourceBuffer.mode = 'segments';
        sourceBufferRef.current = sourceBuffer;

        const handleVideoData = (data: ArrayBuffer) => {
          const chunk = new Uint8Array(data);

          if (sourceBuffer.updating || mediaSource.readyState !== 'open') {
            queueRef.current.push(chunk);
            return;
          }

          try {
            sourceBuffer.appendBuffer(chunk);
          } catch (err) {
            console.error('Failed to append buffer:', err);
          }
        };

        sourceBuffer.addEventListener('updateend', () => {
          if (queueRef.current.length > 0 && !sourceBuffer.updating) {
            const nextChunk = queueRef.current.shift();
            if (nextChunk) {
              sourceBuffer.appendBuffer(nextChunk);
            }
          }
        });

        if (videoHandlerRef.current) {
          socket.off('video', videoHandlerRef.current);
        }

        videoHandlerRef.current = handleVideoData;
        socket.on('video', handleVideoData);

        video.play().catch(err => {
          console.error('Failed to autoplay video:', err);
        });
      } catch (err) {
        console.error('Error setting up MediaSource:', err);
      }
    };

    mediaSource.addEventListener('sourceopen', onSourceOpen);

    return () => {
      mediaSource.removeEventListener('sourceopen', onSourceOpen);
      if (videoHandlerRef.current) {
        socket.off('video', videoHandlerRef.current);
      }
    };
  }, [isStreaming, socket]);

  const handleGameStart = async () => {
    setIsGameStarted(true);
    try {
      const apiBaseUrl = 'http://localhost:5000';
      const folderId = '85bc49d5-ac39-4960-a9e4-2d0298d7bd60';

      await axios.post(
        `${apiBaseUrl}/api/games/start/${folderId}`,
        {},
        { withCredentials: true }
      );
      setIsStreaming(true);
    } catch (err) {
      console.error('Failed to start game:', err);
      setIsGameStarted(false);
    }
  };

  const stopGameStreaming = async () => {
    if (socket) {
      try {
        socket.emit('stop_game');

        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.src = '';
        }

        if (
          mediaSourceRef.current &&
          mediaSourceRef.current.readyState === 'open'
        ) {
          mediaSourceRef.current.endOfStream();
        }

        sourceBufferRef.current = null;
        queueRef.current = [];
      } catch (err) {
        console.error('Error stopping game stream:', err);
      }
    }
  };

  const handleGameExit = () => {
    stopGameStreaming();
    setIsGameStarted(false);
    setIsStreaming(false);
  };

  const handleKeyPress = (key: string) => {
    if (socket && isStreaming) {
      socket.emit('key', key);
    }
  };

  const handleMouseMove = (x: number, y: number) => {
    if (socket && isStreaming) {
      socket.emit('mouse', { x, y });
    }
  };

  return (
    <>
      <article className="bg-white border-b-2 w-full border-gray-200 dark:border-gray-600 dark:bg-gray-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="p-4">
          <PostHeader username={user.username} timestamp={timestamp} />

          {description && (
            <div className="mb-4">
              <p className="text-gray-800 dark:text-gray-200">{description}</p>
            </div>
          )}

          <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 h-[400px] rounded-xl">
            {isStreaming ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <button
                  onClick={handleGameStart}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>Start Game</span>
                </button>
                {isGameStarted && !isStreaming && (
                  <p className="text-gray-500">Starting game stream...</p>
                )}
              </div>
            )}
          </div>

          <PostInteractions likes={likes} comments={comments} />
        </div>
      </article>

      {isGameStarted && (
        <GameStream
          videoRef={videoRef}
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

export default ExePost;
