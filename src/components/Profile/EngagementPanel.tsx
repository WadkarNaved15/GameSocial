import React, { useState } from 'react';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface EngagementPanelProps {
  postId: string;
  initialLikes?: number;
  initialComments?: Comment[];
}

export const EngagementPanel: React.FC<EngagementPanelProps> = ({
  postId,
  initialLikes = 0,
  initialComments = []
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'https://placehold.co/32x32'
      },
      content: newComment,
      timestamp: new Date().toISOString()
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center space-x-6">
        <button
          onClick={handleLike}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <i className={`${isLiked ? 'fas' : 'far'} fa-heart ${isLiked ? 'text-red-500' : ''}`}></i>
          <span className="text-gray-600">{likes}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <i className="far fa-comment"></i>
          <span className="text-gray-600">{comments.length}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
          <i className="far fa-share-square"></i>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-4">
          <form onSubmit={handleComment} className="flex space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post
            </button>
          </form>

          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <p className="font-medium text-sm">{comment.author.name}</p>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(comment.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};