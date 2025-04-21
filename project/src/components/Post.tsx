import React from 'react';
import NormalPost from './Post/NormalPost';
import GamePost from './Post/GamePost';
import ExePost from './Post/ExePost';

interface PostProps {
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

/**
 * Post component that renders the appropriate post type based on the 'type' prop
 */
export function Post(props: PostProps) {
  const { type } = props;
  
  // Render the appropriate component based on post type
  if (type === 'game_post') {
    return <GamePost {...props} />;
  } else if (type === 'exe_post') {
    return <ExePost {...props} />;
  } else {
    return <NormalPost {...props} />;
  }
}

export default Post;