import React, { useState, useEffect } from 'react';
import { CodeSnippet } from './CodeSnippet';
import { GamePreview } from './GamePreview';
import { EngagementPanel } from './EngagementPanel';
import { ReviewNotes } from './ReviewNotes';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Screenshot {
  id: string;
  url: string;
  caption: string;
}

interface TimelinePost {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  previewUrl?: string;
  timestamp: string;
  tags: string[];
  thumbnail?: string;
  author?: TeamMember;
  component?: React.ReactNode;
  isInteractive?: boolean;
  gameplayVideo?: string;
  screenshots?: Screenshot[];
}

interface TimelineProps {
  posts: TimelinePost[];
}

export const Timeline: React.FC<TimelineProps> = ({ posts }) => {
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});
  const [interactivePosts, setInteractivePosts] = useState<Record<string, boolean>>({});
  const [fullscreenPostId, setFullscreenPostId] = useState<string | null>(null);
  const [escapePressed, setEscapePressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEscapePressed(true);
      } else if (e.key === '1' && escapePressed && fullscreenPostId) {
        setFullscreenPostId(null);
        setInteractivePosts(prev => ({
          ...prev,
          [fullscreenPostId]: false
        }));
      } else {
        setEscapePressed(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEscapePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [fullscreenPostId, escapePressed]);

  const toggleCode = (postId: string) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    if (!expandedPosts[postId]) {
      setInteractivePosts(prev => ({
        ...prev,
        [postId]: false
      }));
      setFullscreenPostId(null);
    }
  };

  const toggleInteraction = (postId: string) => {
    setInteractivePosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    if (!interactivePosts[postId]) {
      setExpandedPosts(prev => ({
        ...prev,
        [postId]: false
      }));
      setFullscreenPostId(postId);
    } else {
      setFullscreenPostId(null);
    }
  };

  return (
    <div className="space-y-8">
      {posts.map((post, index) => (
        <div 
          key={post.id} 
          className={`bg-white rounded-lg shadow-md ${
            fullscreenPostId === post.id 
              ? 'fixed inset-0 z-50 flex flex-col bg-gray-900'
              : ''
          }`}
        >
          <div className={`p-6 border-b border-gray-200 ${
            fullscreenPostId === post.id ? 'bg-gray-800 text-white' : ''
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3">
                  {post.author && (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className={`text-xl font-semibold ${
                      fullscreenPostId === post.id ? 'text-white' : 'text-gray-900'
                    }`}>{post.title}</h3>
                    {post.author && (
                      <p className={`text-sm ${
                        fullscreenPostId === post.id ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {post.author.name} · {post.author.role}
                      </p>
                    )}
                  </div>
                </div>
                <p className={`mt-2 ${
                  fullscreenPostId === post.id ? 'text-gray-300' : 'text-gray-600'
                }`}>{post.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        fullscreenPostId === post.id
                          ? 'bg-blue-900 text-blue-200'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                {post.isInteractive && (
                  <button
                    onClick={() => toggleInteraction(post.id)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      interactivePosts[post.id]
                        ? 'bg-green-100 text-green-700'
                        : fullscreenPostId === post.id
                          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <i className="fas fa-gamepad mr-1"></i>
                    {interactivePosts[post.id] ? 'Playing' : 'Interact'}
                  </button>
                )}
                <button
                  onClick={() => toggleCode(post.id)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    expandedPosts[post.id]
                      ? 'bg-blue-100 text-blue-700'
                      : fullscreenPostId === post.id
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <i className="far fa-code text-lg mr-1"></i>
                  {expandedPosts[post.id] ? 'Hide Code' : 'View Code'}
                </button>
              </div>
            </div>
          </div>
          
          {!expandedPosts[post.id] && !interactivePosts[post.id] && (
            <div className="p-6 border-b border-gray-200">
              {post.gameplayVideo ? (
                <GamePreview
                  videoUrl={post.gameplayVideo}
                  screenshots={post.screenshots || []}
                />
              ) : post.thumbnail ? (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : null}
            </div>
          )}
          
          <div className={`p-6 ${fullscreenPostId === post.id ? 'flex-1 flex flex-col' : ''}`}>
            {expandedPosts[post.id] ? (
              <CodeSnippet code={post.code} language={post.language} />
            ) : interactivePosts[post.id] && post.component ? (
              <div className="flex-1 flex flex-col">
               <div className={fullscreenPostId === post.id ? 'flex-1 flex items-center justify-center' : ''}>
                  <div className={fullscreenPostId === post.id ? 'transform scale-150' : ''}>
                    {post.component}
                  </div>
                </div>
                {fullscreenPostId === post.id && (
                  <>
                    <div className="fixed top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg">
                      Press Escape + 1 to exit fullscreen
                    </div>
                    <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                      <ReviewNotes postId={post.id} />
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </div>

          <div className="px-6">
            <EngagementPanel 
              postId={post.id}
              initialLikes={Math.floor(Math.random() * 100)}
              initialComments={[
                {
                  id: '1',
                  author: {
                    name: 'John Doe',
                    avatar: 'https://placehold.co/32x32'
                  },
                  content: 'Great implementation! Love the smooth animations.',
                  timestamp: new Date(Date.now() - 3600000).toISOString()
                }
              ]}
            />
          </div>
        </div>
      ))}
    </div>
  );
};