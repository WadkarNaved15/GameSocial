import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

interface PostHeaderProps {
  username: string;
  timestamp: string;
  avatarUrl?: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ 
  username, 
  timestamp, 
  avatarUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-between">
      <div className="flex rounded-xl items-center mb-4">
        <img
          src={avatarUrl}
          alt={username}
          className="h-10 w-10 rounded-full"
        />
        <div className="ml-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">{username}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{timestamp}</p>
        </div>
      </div>

      <div className="relative">
        <button
          className="dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="More options"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
        
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
            <div className="py-1">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Report
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Copy link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHeader;