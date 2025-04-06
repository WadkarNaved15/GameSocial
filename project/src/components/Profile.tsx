// import React from 'react';
// import { Settings, Grid, Trophy } from 'lucide-react';
import { UserRound,CircleUser,Bookmark,Gamepad2} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const navigate = useNavigate();
  return (
    <div className=" max-w-3xl mx-auto">
      <div className="relative ">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Cover"
          className="w-full h-20 object-cover rounded-xl"
        />
        <div className="absolute -bottom-10 left-5">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="cursor-pointer w-20 h-20 rounded-full border-4 border-white dark:border-gray-900"
            onClick={() => navigate('/profile')}
          />
        </div>
      </div>

      <div className=" mt-10 px-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">John Developer</h4>
            <p className="text-gray-500 dark:text-gray-400">Game Developer</p>
          </div>
          {/* <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Edit Profile</span>
          </button> */}
        </div>
        
        {/* <p className="mt-4 text-gray-700 dark:text-gray-300">
          Game developer and creative coder. Building interactive experiences and pushing the boundaries of web gaming.
        </p>

        <div className="mt-6 flex space-x-4">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white">245</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white">14.3k</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white">892</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
          </div>
        </div> */}

        {/* <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Trophy, title: 'Top Creator', desc: 'Reached 10k followers' },
              { icon: Grid, title: 'Game Master', desc: '50 games published' },
            ].map((achievement, i) => (
              <div key={i} className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                <achievement.icon className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">{achievement.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      <div className="flex mt-4 items-center justify-center space-x-2">
            {/* <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Upload className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button> */}
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-purple-600/10">
              {/* <img src='./src/assets/profile-circle-svgrepo-com.svg' className="h-6 w-6" /> */}
              <CircleUser className="h-6 w-6 text-gray-600 dark:text-purple-600 " />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-purple-600/10">
              {/* <img src='./src/assets/game-svgrepo-com.svg' className="h-6 w-6 text-gray-600 dark:text-gray-300" /> */}
              <Gamepad2 className="h-6 w-6 text-gray-600 dark:text-purple-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-purple-600/10">
              {/* <img src='./src/assets/users-svgrepo-com.svg' className="h-6 w-6 text-gray-600 dark:text-gray-300" /> */}
              <UserRound className="h-6 w-6 text-gray-600 dark:text-purple-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-purple-600/10">
              {/* <img src='./src/assets/bookmark-svgrepo-com.svg' className="h-6 w-6 text-gray-600 dark:text-gray-300" /> */}
              <Bookmark className="h-6 w-6 text-gray-600 dark:text-purple-600 " />
            </button>
            </div>
    </div>
  );
}