// src/components/LoadingSpinner.jsx
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-24 h-24">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-purple-500 animate-spin"></div>
        {/* Inner glowing sphere */}
        <div className="absolute inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full shadow-lg animate-pulse"></div>
        {/* Center core */}
        <div className="absolute inset-8 bg-white rounded-full"></div>
      </div>
      <p className="absolute bottom-10 text-white text-lg font-semibold animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;
