import React, { useState, useEffect, useRef } from 'react';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const RightSidebarSections: React.FC = () => {
  const [activeSection, setActiveSection] = useState('newsletter');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sections: Section[] = [
    {
      id: 'newsletter',
      title: 'Newsletter',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Stay updated with my latest game dev insights and tutorials.</p>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      title: 'Analytics',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2.4K</div>
              <div className="text-sm text-gray-600">Monthly Views</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">87%</div>
              <div className="text-sm text-gray-600">Engagement</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'hot-topics',
      title: 'Hot Topics',
      content: (
        <div className="space-y-3">
          {['Game Physics', 'AI in Games', 'Shader Programming'].map((topic, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer">
              <i className="fas fa-fire text-orange-500"></i>
              <span>{topic}</span>
            </div>
          ))}
        </div>
      )
    }
  ];

  // Create a circular array for smooth infinite scroll
  const displaySections = [...sections, ...sections, ...sections];

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    // Set initial scroll position to show the middle set of items
    scroll.scrollLeft = scroll.scrollWidth / 3;

    const handleScroll = () => {
      if (!scroll) return;
      
      // If we reach the end of the middle set, jump back to the start of it
      if (scroll.scrollLeft >= (scroll.scrollWidth * 2) / 3) {
        scroll.scrollLeft = scroll.scrollWidth / 3;
      }
      // If we reach the start of the middle set, jump to the end of it
      else if (scroll.scrollLeft <= scroll.scrollWidth / 3 - 50) {
        scroll.scrollLeft = (scroll.scrollWidth * 2) / 3 - 50;
      }
    };

    scroll.addEventListener('scroll', handleScroll);
    return () => scroll.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent, section: Section) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    setActiveSection(section.id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div 
        className="relative overflow-hidden mb-6 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden"
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {displaySections.map((section, index) => (
            <button
            key={`${section.id}-${index}`}
              onClick={(e) => handleClick(e, section)}
              className={`flex-shrink-0 px-4 py-2 rounded-full whitespace-nowrap transition-colors mr-4 ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-[200px] transition-opacity duration-300">
        {sections.find(section => section.id === activeSection)?.content}
      </div>
    </div>
  );
};