import React, { useState, useRef } from 'react';
import { CodeSnippet } from './CodeSnippet';
import { LivePreview } from './LivePreview';
import { Timeline } from './Timeline';
import { ProjectCard } from './ProjectCard';
import { PongGame } from '../Games/PongGame';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  component?: React.ReactNode;
  timeline?: TimelinePost[];
  team?: TeamMember[];
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
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

interface Screenshot {
  id: string;
  url: string;
  caption: string;
}

export const CodePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'featured'>('timeline');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showCode, setShowCode] = useState<Record<string, boolean>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const previewPosts: TimelinePost[] = [
    {
      id: 'pong-1',
      title: 'Interactive Pong Game',
      description: 'A classic Pong game implementation with modern features and smooth gameplay.',
      gameplayVideo: '/assets/pong-gameplay.mp4',
      screenshots: [
        {
          id: 'screenshot-1',
          url: 'https://stackblitz.com/files/entertainment-hub/github/stackblitz/entertainment-hub/main/public/assets/we-live-in-time.jpg',
          caption: 'Game Screenshot 1'
        },
        {
          id: 'screenshot-2',
          url: 'https://stackblitz.com/files/entertainment-hub/github/stackblitz/entertainment-hub/main/public/assets/jigra.jpg',
          caption: 'Game Screenshot 2'
        },
        {
          id: 'screenshot-3',
          url: 'https://stackblitz.com/files/entertainment-hub/github/stackblitz/entertainment-hub/main/public/assets/boxing-1.jpg',
          caption: 'Game Screenshot 3'
        },
        {
          id: 'screenshot-4',
          url: 'https://stackblitz.com/files/entertainment-hub/github/stackblitz/entertainment-hub/main/public/assets/boxing-2.jpg',
          caption: 'Game Screenshot 4'
        }
      ],
      code: `// Ball collision with paddles
if (
  (ball.x <= paddle1.x + PADDLE_WIDTH &&
    ball.y >= paddle1.y &&
    ball.y <= paddle1.y + PADDLE_HEIGHT) ||
  (ball.x >= paddle2.x - BALL_SIZE &&
    ball.y >= paddle2.y &&
    ball.y <= paddle2.y + PADDLE_HEIGHT)
) {
  ballSpeed.x = -ballSpeed.x;
  // Add spin based on paddle movement
  ballSpeed.y += paddleMovement * 0.2;
}`,
      language: 'typescript',
      timestamp: '2024-02-12T10:00:00Z',
      tags: ['gamedev', 'typescript', 'canvas', 'interactive'],
      component: <PongGame />,
      isInteractive: true,
      author: {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Lead Developer',
        avatar: '/assets/avatars/sarah.jpg'
      }
    }
  ];

  const projects: Project[] = [
    {
      id: '1',
      title: 'Pong Game',
      description: 'A classic Pong game implementation with modern features',
      thumbnail: 'https://placehold.co/600x400/2563eb/FFFFFF/png?text=Pong+Game',
      technologies: ['TypeScript', 'Canvas API', 'React'],
      component: <PongGame />,
      team: [
        {
          id: '1',
          name: 'Sarah Johnson',
          role: 'Lead Developer',
          avatar: 'https://placehold.co/100x100'
        },
        {
          id: '2',
          name: 'Mike Chen',
          role: 'Game Designer',
          avatar: 'https://placehold.co/100x100'
        },
        {
          id: '3',
          name: 'Emma Wilson',
          role: 'UI Developer',
          avatar: 'https://placehold.co/100x100'
        }
      ],
      timeline: [
        {
          id: 'pong-init',
          title: 'Initial Setup',
          description: 'Basic game structure and canvas setup',
          thumbnail: 'https://placehold.co/600x400/2563eb/FFFFFF/png?text=Initial+Setup',
          code: `const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 320;
const PADDLE_HEIGHT = 60;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 8;`,
          language: 'typescript',
          timestamp: '2024-02-10T10:00:00Z',
          tags: ['setup', 'canvas']
        },
        {
          id: 'pong-movement',
          title: 'Paddle Movement',
          description: 'Implemented paddle controls and movement logic',
          thumbnail: 'https://placehold.co/600x400/2563eb/FFFFFF/png?text=Paddle+Movement',
          code: `const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'w': paddle1.y -= PADDLE_SPEED; break;
    case 's': paddle1.y += PADDLE_SPEED; break;
    case 'ArrowUp': paddle2.y -= PADDLE_SPEED; break;
    case 'ArrowDown': paddle2.y += PADDLE_SPEED; break;
  }
};`,
          language: 'typescript',
          timestamp: '2024-02-11T14:30:00Z',
          tags: ['controls', 'gameplay']
        }
      ]
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'timeline'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Development Timeline
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'featured'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Featured Work
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'timeline' ? (
          <div className="space-y-8">
            <Timeline posts={previewPosts} />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="relative">
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2"
              >
                <i className="fas fa-chevron-left text-gray-600"></i>
              </button>
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2"
              >
                <i className="fas fa-chevron-right text-gray-600"></i>
              </button>
              <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {projects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </div>

            {selectedProject && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Development Timeline</h2>
                {selectedProject.timeline && (
                  <Timeline posts={selectedProject.timeline} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};