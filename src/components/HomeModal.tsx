import React from 'react';
import backgroundImage from '../assets/bg.png'
const HomeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black/50 h-full  flex items-center justify-center z-50">

        <div className="bg-black h-[350px] shadow-lg w-[100%] sm:w-[600px] relative ">
        <div
  className="w-full h-full "
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat'
  }}
>
        <div className='p-4'>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white "
          >
            ✕
          </button>
  
          {/* Modal Content */}
          <h2 className="text-3xl text-white font-semibold text-left leading-tight">
            WELCOME <br />
            TO <br />
            OUR <br /><br />
            FAMILY<br/>
            SON
          </h2>

          {/* <p className="text-white text-center mb-4">
            Please log in or sign up to continue.
          </p>
   */}
          {/* Login & Signup Buttons */}
          {/* <div className="flex flex-col space-y-3">
            <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Log In
            </button>
            <button className="bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400">
              Sign Up
            </button>
          </div> */}
          </div>
        </div>
        </div>
      </div>
    );
  };
  
  export default HomeModal;