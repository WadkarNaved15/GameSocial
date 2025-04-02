import { useState } from 'react';
import { Heart, MessageCircle, Share2, Play ,MoreHorizontal} from 'lucide-react';

interface PostProps {
  type: 'image' | 'video' | 'game';
  content: {
    url: string;
    title: string;
    requirements?: {
      cpu: string;
      memory: string;
      storage: string;
    };
  };
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
}

export function Post({ type, content, author, timestamp, likes, comments }: PostProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <article className="bg-white border-b-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-4">
        <div className="flex justify-between">
        <div className="flex rounded-xl items-center mb-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">{author.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{timestamp}</p>
          </div>
          </div>
          <div className="relative">
            <button
              className=" dark:text-gray-400 hover:text-black dark:hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>

            {/* Dropdown Menu */}
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

        <div className="relative rounded-xl">
          <img
            src={content.url}
            alt={content.title}
            className="w-full rounded-xl"
          />
          {type === 'game' && (
            <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 group hover:bg-opacity-40 transition-all duration-300 rounded-xl">
              <div className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-full transform transition-transform group-hover:scale-105">
                <Play className="h-5 w-5" />
                <span className="font-semibold">Play Now</span>
              </div>
            </button>
          )}
        </div>

        {type === 'game' && content.requirements && (
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">CPU</p>
              <p className="font-medium text-gray-900 dark:text-white">{content.requirements.cpu}</p>
            </div>
            <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">Memory</p>
              <p className="font-medium text-gray-900 dark:text-white">{content.requirements.memory}</p>
            </div>
            <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">Storage</p>
              <p className="font-medium text-gray-900 dark:text-white">{content.requirements.storage}</p>
            </div>
          </div>
        )}

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
      </div>
    </article>
  );
}