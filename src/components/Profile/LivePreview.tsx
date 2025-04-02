import React from 'react';

interface LivePreviewProps {
  url: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ url }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-gray-50 px-4 py-2 flex justify-between items-center border-b">
        <span className="text-sm text-gray-600">Live Preview</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 text-sm"
        >
          Open in new tab <i className="fas fa-external-link-alt ml-1"></i>
        </a>
      </div>
      <div className="aspect-video">
        <iframe
          src={url}
          className="w-full h-full"
          title="Live Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};