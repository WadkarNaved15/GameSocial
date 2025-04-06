import { useState } from 'react';
import { Heart, MessageCircle, Share2, Play, MoreHorizontal } from 'lucide-react';

interface PostProps {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  description: string;
  media: string[]; // array of URLs
  createdAt: string;
  updatedAt: string;
  likes?: number;
  comments?: number;
}

export function Post({
  _id,
  user,
  description,
  media,
  createdAt,
  updatedAt,
  likes = 0,
  comments = 0,
}: PostProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const mediaUrl = media[0]; // assuming one media item
  const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);
  const timestamp = new Date(createdAt).toLocaleString();

  return (
    <article className="bg-white border-b-2 w-full border-gray-200 dark:border-gray-600 dark:bg-gray-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-4">
        {/* Header */}
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
          <div className="relative">
            <button
              className="dark:text-gray-400 hover:text-black dark:hover:text-white"
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

        {/* Media */}
        <div className="relative rounded-xl overflow-hidden">
          {isVideo ? (
            <video
              controls
              src={mediaUrl}
              className="w-full rounded-xl"
            />
          ) : (
            <img
              src={mediaUrl}
              alt="Post content"
              className="w-full rounded-xl"
            />
          )}
        </div>

        {/* Description */}
        <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>

        {/* Actions */}
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
