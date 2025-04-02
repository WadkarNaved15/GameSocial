import React, { useState } from 'react';

interface Screenshot {
  id: string;
  url: string;
  caption: string;
}

interface GamePreviewProps {
  videoUrl: string;
  screenshots: Screenshot[];
}

export const GamePreview: React.FC<GamePreviewProps> = ({ videoUrl, screenshots }) => {
  const [selectedImage, setSelectedImage] = useState<string>(videoUrl);
  const [isVideoActive, setIsVideoActive] = useState(true);

  const handleThumbnailClick = (url: string) => {
    setSelectedImage(url);
    setIsVideoActive(url === videoUrl);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
        {isVideoActive ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={selectedImage}
            alt="Game preview"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        <div
          className={`flex-shrink-0 relative cursor-pointer ${
            isVideoActive ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => handleThumbnailClick(videoUrl)}
        >
          <video
            className="w-24 h-16 object-cover rounded"
            muted
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <i className="fas fa-play text-white"></i>
          </div>
        </div>
        
        {screenshots.map((screenshot) => (
          <div
            key={screenshot.id}
            className={`flex-shrink-0 cursor-pointer ${
              selectedImage === screenshot.url ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleThumbnailClick(screenshot.url)}
          >
            <img
              src={screenshot.url}
              alt={screenshot.caption}
              className="w-24 h-16 object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};