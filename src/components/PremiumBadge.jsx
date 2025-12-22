// src/components/PremiumBadge.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

const PremiumBadge = ({ size = "md", text = "Premium" }) => {

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <div
      className={`
        relative inline-flex items-center gap-1 
        font-semibold rounded-full 
        ${sizeClasses[size]}
        text-white
        bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500
        shadow-[0_0_10px_#FFD700,0_0_20px_#FFAA00] 
        hover:shadow-[0_0_20px_#FFD700,0_0_30px_#FFAA00]
        transition-all duration-500
        before:absolute before:-inset-1 before:rounded-full before:bg-gradient-to-r before:from-yellow-400 before:via-orange-500 before:to-yellow-400 before:opacity-30 before:blur-xl before:animate-pulse
        after:absolute after:inset-0 after:rounded-full after:border-2 after:border-yellow-500 after:opacity-20 after:animate-ping
      `}
    >
      <FaStar className="relative text-white drop-shadow-[0_0_6px_#FFD700]" />
      <span className="relative">{text}</span>
    </div>
  );
};

export default PremiumBadge;
