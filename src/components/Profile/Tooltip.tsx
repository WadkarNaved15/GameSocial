import React, { useState, useEffect, useCallback } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({
      x: e.clientX,
      y: e.clientY + 20 // Position below cursor
    });
  }, []);

  const handleMouseEnter = () => {
    setIsVisible(true);
    document.addEventListener('mousemove', handleMouseMove);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      {React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
      {isVisible && (
        <div
          className="tooltip"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translateX(-50%)',
          }}
        >
          {text}
        </div>
      )}
    </>
  );
};