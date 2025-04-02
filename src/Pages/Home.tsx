import React, { useState, useEffect, useRef } from 'react';
import { Twitter, Search, Home, Bell, Mail, Bookmark, User, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

interface TrendingItem {
  id: number;
  title: string;
  category: string;
  mentions: number;
}

interface Profile {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface AnalyticsData {
  x: number;
  y: number;
}

interface Tweet {
  id: number;
  user: string;
  handle: string;
  content: string;
  time: string;
  likes: number;
  retweets: number;
  replies: number;
}

const trendingItems: TrendingItem[] = [
  { id: 1, title: "Unreal Engine 5", category: "Game Engine", mentions: 12500 },
  { id: 2, title: "Ray Tracing", category: "Graphics", mentions: 8300 },
  { id: 3, title: "Procedural Gen", category: "Development", mentions: 6200 },
];

const profiles: Profile[] = [
  { id: 1, name: "Sarah Chen", role: "Technical Artist", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { id: 2, name: "Alex Rivera", role: "Game Director", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { id: 3, name: "Maria Kim", role: "Lead Developer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
  { id: 4, name: "James Wilson", role: "3D Artist", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
];

const analyticsData: AnalyticsData[] = [
  { x: 10, y: 40 }, { x: 30, y: 70 }, { x: 50, y: 50 },
  { x: 70, y: 80 }, { x: 90, y: 60 }
];

const tweets: Tweet[] = [
  {
    id: 1,
    user: "John Doe",
    handle: "@johndoe",
    content: "Just deployed my latest project using the new CardStack framework! The 3D animations are incredible 🚀",
    time: "2h",
    likes: 142,
    retweets: 23,
    replies: 12
  },
  {
    id: 2,
    user: "Sarah Smith",
    handle: "@sarahcodes",
    content: "The future of web development is here. Check out these amazing 3D card transitions! #webdev #frontend",
    time: "4h",
    likes: 89,
    retweets: 15,
    replies: 8
  }
];

const navItems = [
  { icon: <Home className="w-6 h-6" />, label: "Home" },
  { icon: <Search className="w-6 h-6" />, label: "Explore" },
  { icon: <Bell className="w-6 h-6" />, label: "Notifications" },
  { icon: <Mail className="w-6 h-6" />, label: "Messages" },
  { icon: <Bookmark className="w-6 h-6" />, label: "Bookmarks" },
  { icon: <User className="w-6 h-6" />, label: "Profile" },
  { icon: <MoreHorizontal className="w-6 h-6" />, label: "More" }
];

function GameDevTower() {
  const [currentFace, setCurrentFace] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateTower = (direction: 'left' | 'right') => {
    setCurrentFace(prev => {
      const next = direction === 'right' ? 
        (prev + 1) % 4 : 
        (prev - 1 + 4) % 4;
      return next;
    });
  };

  useEffect(() => {
    const createParticle = () => {
      if (!containerRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 3 + 1;
      const startX = Math.random() * containerRef.current.offsetWidth;
      const startY = containerRef.current.offsetHeight;
      const duration = Math.random() * 10 + 10;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.animation = `float ${duration}s linear infinite`;
      
      const particles = containerRef.current.querySelector('.particles');
      if (particles) {
        particles.appendChild(particle);
        
        setTimeout(() => {
          if (particles.contains(particle)) {
            particles.removeChild(particle);
          }
        }, duration * 1000);
      }
    };

    const particleInterval = setInterval(createParticle, 1000);
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <div className="game-container" ref={containerRef}>
      <div className="particles" />
      <div className="cityscape" />
      <button 
        className="nav-arrow left"
        onClick={() => rotateTower('left')}
        aria-label="Previous face"
      />
      <button 
        className="nav-arrow right"
        onClick={() => rotateTower('right')}
        aria-label="Next face"
      />
     <div
        className="tower-container"
        style={{
          transform: `translate(-50%, -50%) rotateY(${currentFace * -90}deg)`,
        }}
      >
        {/* Trending Face */}
        <div className={`tower-face face-front ${currentFace === 0 ? "active" : ""}`}>
          <div className="tower-content">
            <h3 className="text-xl font-bold mb-4">Trending in Game Dev</h3>
            {trendingItems.map(item => (
              <div key={item.id} className="trending-item">
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.category}</p>
                  <span className="text-sm text-blue-400">{item.mentions.toLocaleString()} mentions</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who to Follow Face */}
        <div className={`tower-face face-right ${currentFace === 1 ? "active" : ""}`}>
          <div className="tower-content">
            <h3 className="text-xl font-bold mb-4">Who to Follow</h3>
            <div className="profile-grid">
              {profiles.map(profile => (
                <div key={profile.id} className="profile-item">
                  <img 
                    src={profile.avatar} 
                    alt={profile.name}
                    className="w-12 h-12 rounded-full mb-2"
                  />
                  <h4 className="font-bold text-sm">{profile.name}</h4>
                  <p className="text-xs text-gray-400">{profile.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Face */}
        <div className={`tower-face face-back ${currentFace === 2 ? "active" : ""}`}>
          <div className="tower-content">
            <h3 className="text-xl font-bold mb-4">Developer Analytics</h3>
            <div className="analytics-chart">
              {analyticsData.map((point, index) => (
                <div
                key={index}
                className="chart-point"
                style={{
                  left: `${point.x}%`,
                  bottom: `${point.y}%`,
                }}
              />
              ))}
            </div>
          </div>
        </div>

        {/* Marketing Face */}
        <div className={`tower-face face-left ${currentFace === 3 ? "active" : ""}`}>
          <div className="tower-content marketing-content">
            <h3 className="text-2xl font-bold mb-6">Launch Your Game</h3>
            <p className="text-center mb-8">
              Join the fastest growing game developer community
            </p>
            <button className="cta-button">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function App() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <div className="w-64 p-4 border-r border-gray-800">
        <div className="mb-8">
          <Twitter className="w-8 h-8 text-white" />
        </div>
        <nav>
          {navItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center space-x-4 p-3 hover:bg-gray-900 rounded-full w-full text-left mb-2"
            >
              {item.icon}
              <span className="text-xl">{item.label}</span>
            </button>
          ))}
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-8 w-full mt-4 font-bold">
            Post
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 border-r border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Home</h1>
        </div>
        <div className="divide-y divide-gray-800">
          {tweets.map(tweet => (
            <div key={tweet.id} className="p-4 hover:bg-gray-900/50">
              <div className="flex space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-800"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{tweet.user}</span>
                    <span className="text-gray-500">{tweet.handle}</span>
                    <span className="text-gray-500">· {tweet.time}</span>
                  </div>
                  <p className="mt-2 text-gray-100">{tweet.content}</p>
                  <div className="flex justify-between mt-3 text-gray-500 max-w-md">
                    <button className="hover:text-blue-500">
                      <span>{tweet.replies}</span>
                    </button>
                    <button className="hover:text-green-500">
                      <span>{tweet.retweets}</span>
                    </button>
                    <button className="hover:text-red-500">
                      <span>{tweet.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Game Dev Tower */}
      <div className="w-[400px] p-4 border-l border-gray-800">
        <div className="sticky top-4">
          <h2 className="text-xl font-bold mb-4">Featured Content</h2>
          <GameDevTower />
        </div>
      </div>
    </div>
  );
}

export default App;