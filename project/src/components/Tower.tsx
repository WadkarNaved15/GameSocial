import React, { useState, useEffect, useRef } from "react";
import { Users, MessageSquare, BookOpen, RotateCw,PlusCircle } from "lucide-react";

type Face = "follow" | "posts" | "reading";

const Tower: React.FC<{ activeFace: Face }> = ({ activeFace }) => {
    const cubeRef = useRef<HTMLDivElement>(null);
    const [translateZ, setTranslateZ] = useState(150); // Default value, will update
  
    useEffect(() => {
      if (cubeRef.current) {
        const width = cubeRef.current.offsetWidth; // Get dynamic width
        setTranslateZ(width / 2); // Set translateZ to half of width
      }
    }, []);
  
  const getRotation = () => {
    switch (activeFace) {
      case "follow":
        return "rotateY(0deg)";
      case "posts":
        return "rotateY(-90deg)";
      case "reading":
        return "rotateY(-180deg)";
      default:
        return "rotateY(0deg)";
    }
  };

  return (
    <div className="flex-1 dark:bg-gray-700 h-full w-full overflow-hidden flex items-center justify-center perspective-1000">
     <div
        ref={cubeRef}
        className="relative w-full h-full flex justify-center preserve-3d transition-transform duration-700"
        style={{ transform: `${getRotation()}` }}
      >
        <style>
          {`
            .hidden-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hidden-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .
          `}
        </style>
        
      {/* Front Face - Follow */}
      <div
          className="face face-front dark:text-white overflow-y-auto"
          style={{ transform: `translateZ(${translateZ}px)` }}
        >
        <div className="h-full space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex  items-center justify-between gap-4">
              <img
                src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                alt={`User ${i}`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">User Name {i}</h3>
                <p className="text-sm text-gray-500">@username{i}</p>
              </div>
              {/* <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600">
                <PlusCircle className="w-4 h-4" />
              </button> */}
              <PlusCircle className="w-6 h-6"/>
            </div>
          ))}
        </div>
      </div>

      {/* Right Face - Posts */}
      <div
          className="face face-right dark:text-white overflow-y-auto"
          style={{ transform: `rotateY(90deg) translateZ(${translateZ}px)` }}
        >
        {/* <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageSquare />
          Latest Posts
        </h2> */}
        <div className="h-full space-y-4 ">
          {[1, 2, 3,4].map((i) => (
            <div key={i} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                  alt={`Author ${i}`}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold mb-2">Author {i}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2 dark:text-gray-200">
                This is a sample post content that demonstrates how the posts will look
                like in the interface.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Back Face - Reading */}
      <div
          className="face face-back dark:text-white overflow-y-auto"
          style={{ transform: `rotateY(180deg) translateZ(${translateZ}px)` }}
        >
        {/* <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen />
          Reading List
        </h2> */}
        <div className="h-full space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b pb-4">
              <h3 className="font-semibold mb-2">Article Title {i}</h3>
              <p className="text-sm text-gray-600 mb-2 dark:text-gray-200">
                A brief description of the article that gives readers an idea of what to
                expect.
              </p>
              {/* <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">5 min read</span>
                <button className="text-blue-500 hover:text-blue-600">
                  <RotateCw size={16} />
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Tower;
