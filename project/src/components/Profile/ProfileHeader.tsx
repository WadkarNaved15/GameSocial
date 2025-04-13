import React from 'react';
import { DeveloperStatus } from './DeveloperStatus';

export const ProfileHeader = () => {
  return (
    <div className="w-full h-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <img
              src="https://placehold.co/200x200"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            <DeveloperStatus status="indie" className="absolute -right-2 -bottom-2" />
          </div>
        </div>
      </div>
      <div className="pt-20 pb-6 px-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sarah Johnson</h1>
            <p className="text-lg text-gray-600">Independent Game Developer</p>
          </div>
          <div className="mt-4 h-10 flex justify-between sm:mt-0">
                <button 
                  onClick={() => window.location.href = '/editprofile'}
                  className="text-base px-2 py-2 mr-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Edit Profile
                </button>
                <button className="text-base px-2 py-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                  Follow
                </button>
              </div>
          
        </div>
        <p className="mt-4 text-base font-basic text-gray-600 max-w-2xl">
          Creating indie games with a focus on narrative-driven experiences. 
          Passionate about pixel art and retro-style gaming.
        </p>
      </div>
    </div>
  );
}