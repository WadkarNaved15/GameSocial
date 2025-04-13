import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Play, Pause, MoreHorizontal } from 'lucide-react';

interface PostProps {
  _id: string;
  type: 'normal_post' | 'game_post';
  user: {
    _id: string;
    username: string;
    email: string;
  };
  description: string;
  media: string[]; // array of URLs
  gameUrl?: string;
  createdAt: string;
  updatedAt: string;
  likes?: number;
  comments?: number;
}

export function Post({
  _id,
  type,
  user,
  description,
  media,
  gameUrl,
  createdAt,
  updatedAt,
  likes = 0,
  comments = 0,
}: PostProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let awaitingSecondKey = false;
  
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!awaitingSecondKey && event.key === 'Escape') {
        awaitingSecondKey = true;
        console.log("Escape pressed, waiting for 1");
  
        timer = setTimeout(() => {
          awaitingSecondKey = false;
        }, 500);
      }
  
      if (awaitingSecondKey && event.key === '1') {
        setIsGameStarted(false);
        setIsFullscreen(false);
        awaitingSecondKey = false;
  
        if (timer) clearTimeout(timer);
      }
    };
  
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyPress);
    }
  
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (timer) clearTimeout(timer);
    };
  }, [isFullscreen]);
  
  

  const mediaUrl = media[0]; // assuming one media item
  const isVideo = mediaUrl?.match(/\.(mp4|webm|ogg)$/i);
  const timestamp = new Date(createdAt).toLocaleString();

  const handleGameStart = () => {
    setIsGameStarted(true);
    setIsFullscreen(true);
  };

  return (
    <article className={`bg-white border-b-2 ${isFullscreen ? 'fixed inset-0 z-50' : 'w-full'} border-gray-200 dark:border-gray-600 dark:bg-gray-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md`}>
      <div className={`${isFullscreen ? 'h-full' : 'p-4'}`}>
        {/* Header - Only show when not fullscreen */}
        {!isFullscreen && (
          <div className="flex justify-between">
            <div className="flex rounded-xl items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt={user.username}
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">{user.username}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{timestamp}</p>
              </div>
            </div>

            <div className="relative flex justify-center align-center">
              {/* {type === 'game_post' && !isGameStarted && (
                <button
                  className="dark:text-gray-400 mr-4 hover:text-black dark:hover:text-white"
                  onClick={handleGameStart}
                >
                  <Play className="h-7 w-7" />
                </button>
              )} */}

              <button
                className="dark:text-gray-400 hover:text-black dark:hover:text-white"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
              
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden z-50">
                  <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    Edit Post
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    Delete Post
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    Report Post
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                    Share Post
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Media or Game Content */}
        <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-700 ${isFullscreen ? 'h-full w-full' : 'h-[400px] rounded-xl'}`}>
          {type === 'game_post' ? (
            isGameStarted ? (
              <>
                <iframe
                  src={gameUrl}
                  title="Game Preview"
                  className="w-full h-full"
                  sandbox="allow-scripts allow-same-origin"
                />
                {isFullscreen && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                    Press Esc + 1 to exit
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <button
                  onClick={handleGameStart}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>Start Game</span>
                </button>
              </div>
            )
          ) : mediaUrl && (
            isVideo ? (
              <video
                controls
                src={mediaUrl}
                className="w-full h-full object-fill"
              />
            ) : (
              <img
                src={mediaUrl}
                alt="Post content"
                className="w-full h-full object-fill"
              />
            )
          )}
        </div>

        {/* Description and Actions - Only show when not fullscreen */}
        {!isFullscreen && (
          <>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                  <span>{likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors duration-200">
                  <MessageCircle className="h-5 w-5" />
                  <span>{comments}</span>
                </button>
              </div>
              <button className="text-gray-500 hover:text-purple-600 transition-colors duration-200">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
