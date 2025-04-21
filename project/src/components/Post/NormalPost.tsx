import React from 'react';
import PostHeader from './PostHeader';
import PostInteractions from './PostInteractions';

interface NormalPostProps {
  _id: string;
  type: 'normal_post' | 'game_post' | 'exe_post';
  user: {
    _id: string;
    username: string;
    email: string;
  };
  description: string;
  media: string[];
  createdAt: string;
  updatedAt: string;
  likes?: number;
  comments?: number;
  gameUrl?: string;
}

const NormalPost: React.FC<NormalPostProps> = ({
  user,
  description,
  media,
  createdAt,
  likes = 0,
  comments = 0,
}) => {
  const timestamp = new Date(createdAt).toLocaleString();
  const mediaUrl = media && media.length > 0 ? media[0] : '';
  const isVideo = mediaUrl?.match(/\.(mp4|webm|ogg)$/i);

  return (
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
          {isVideo ? (
            <video controls className="w-full h-full object-contain" src={mediaUrl} />
          ) : mediaUrl ? (
            <img src={mediaUrl} alt="Post content" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">No media available</p>
            </div>
          )}
        </div>

        <PostInteractions likes={likes} comments={comments} />
      </div>
    </article>
  );
};

export default NormalPost;