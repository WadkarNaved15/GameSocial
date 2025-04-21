import { Link } from 'react-router-dom';
import { Bell, Moon, Search, Sun, Upload ,Home,UserRound,BriefcaseBusiness,LogOut,LogIn} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import axios from 'axios';
import {useUser} from "../context/user.js";

export function Header() {
  const { isDark, toggleTheme } = useTheme();
  const {user,logout} = useUser();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/Logout", {
        method: "POST",
        credentials: "include",
      });// Replace with your actual backend URL
      if(response.ok){
        logout();
        console.log('Logout successful');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center w-[50%]">
          <div className="flex-shrink-0">
            <Link
          to="/" 
                className="text-3xl dark:text-purple-600 tracking-wide" 
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: '0.05em'
                }}
              >
                HESTER
              </Link>

          </div>
          
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400  h-5 w-5" />
              <input
                type="text"
                placeholder="Search posts, games, or users..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 dark:text-white border-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Upload className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button> */}
            <button className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Home className="h-5 w-5 text-gray-600 dark:text-purple-600" />
              <p className="text-base font-semibold text-gray-600 dark:text-purple-600">Home</p>
            </button>
            <button className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <UserRound className="h-5 w-5 text-gray-600 dark:text-purple-600" />
              <p className="text-base font-semibold text-gray-600 dark:text-purple-600">Profile</p>
            </button>
            <button className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <BriefcaseBusiness className="h-5 w-5 text-gray-600 dark:text-purple-600" />
              <p className="text-base font-semibold text-gray-600 dark:text-purple-600">Jobs</p>
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-purple-600" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-purple-600" />
              )}
            </button>
            <button onClick={user?handleLogout:()=>{window.location.href="/auth"}} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              {user?(
              <LogOut className="h-5 w-5 text-gray-600 dark:text-purple-600" />
              ):(
                <LogIn className="h-5 w-5 text-gray-600 dark:text-purple-600" />
              )
              }
            </button>
            {/* <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="h-8 w-8 rounded-full cursor-pointer"
            /> */}
          </div>
        </div>
      </div>
    </header>
  );
}