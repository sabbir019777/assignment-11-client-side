// src/pages/LoadingPage.jsx
import React from "react";

const LoadingPage = ({ message = "Loading..." }) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient-x">
      {/* Futuristic spinning loader */}
      <div className="w-24 h-24 border-8 border-t-8 border-white rounded-full animate-spin shadow-lg mb-6"></div>
      
      {/* Loading message */}
      <p className="text-white text-xl font-semibold tracking-wider drop-shadow-lg animate-pulse">
        {message}
      </p>

      {/* Optional futuristic stripes */}
      <div className="mt-8 w-1/2 h-1 bg-white rounded-full opacity-50 animate-pulse"></div>

      {/* Extra background animation (optional) */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-pink-400 via-purple-600 to-blue-500 opacity-20 animate-pulse-slow pointer-events-none"></div>
    </div>
  );
};

export default LoadingPage;


