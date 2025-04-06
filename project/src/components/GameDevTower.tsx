import { useState, useEffect, useRef } from 'react';

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


export default GameDevTower