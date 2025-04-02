import React, { useState } from 'react';
import {
  Image,
  Gift,
  Sparkles,
  ListFilter,
  Smile,
  Calendar,
  MapPin,
  Bold,
  Italic,
} from 'lucide-react';

function AddPost() {
  const [postText, setPostText] = useState('');

  return (
    <div className="w-full rounded-xl mb-3 dark:bg-gray-800 bg-white text-white flex items-start justify-center p-4">
      <div className="w-full max-w-xl h-[150px] dark:bg-gray-800 bg-white">
        {/* Header */}
    
        {/* Text Input */}
        <div className="min-h-[50px]">
          <textarea
            placeholder="What's happening?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full bg-transparent text-xl outline-none resize-none text-black dark:text-white placeholder-gray-600"
            rows={2}
          />
        </div>

        {/* Everyone can reply */}
        <div className="mb-3">
          <button className="text-black dark:text-purple-600 text-sm font-semibold hover:bg-[#1D9BF0]/10 px-3 py-1 rounded-full inline-flex items-center border dark:border-purple-800 border-[#2F3336]">
            <Globe className="w-4 h-4 mr-1" /> Everyone can reply
          </button>
        </div>

        {/* Action Bar */}
        <div className="border-t border-[#2F3336] pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-black dark:text-purple-600">
            <button className="p-2 hover:bg-purple-600/10 rounded-full">
              <Image className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-purple-600/10 rounded-full">
              <Gift className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-purple-600/10 rounded-full">
              <ListFilter className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-[#1D9BF0]/10 rounded-full">
              <Smile className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-purple-600/10 rounded-full">
              <Calendar className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-purple-600/10 rounded-full">
              <MapPin className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-purple-600/10 rounded-full">
              <Bold className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-purple-600/10 rounded-full">
              <Italic className="w-5 h-5" />
            </button>
            <div className="flex-grow">
            <button className="px-4 py-1 rounded-full border border-[#2F3336] text-black dark:text-purple-600 text-sm font-semibold dark:border-purple-800 hover:bg-[#1D9BF0]/10 transition-colors">
              Everyone ▼
            </button>
          </div>
          </div>
          <button
            className="bg-purple-600 text-black dark:text-white px-4 py-1.5 rounded-full font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!postText.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

// Globe icon component
function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default AddPost;