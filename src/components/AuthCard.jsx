import React from "react";


const NEON_COLOR = "#00FFFF"; 
const NEON_GLOW_SHADOW = "0 0 40px rgba(0, 255, 255, 0.5)";

const AuthCard = ({ title, children }) => {
  return (
    <div 
      className="w-full flex justify-center items-center py-10 px-4 min-h-screen"

    >
      <div
        className="
          w-full max-w-md
          
          /* Hyper-Futuristic Glassmorphism Base */
          bg-[#0F1C3F] /* Dark Navy Base */
          backdrop-blur-sm 
          border border-[#00FFFF60] /* Translucent Cyan Border */
          rounded-[20px] 
          p-8 md:p-10
          transition-all duration-300
          
          /* Initial Soft Neon Shadow */
          shadow-[0_0_20px_#00FFFF30] 
          
          /* Hover effect to increase glow slightly (Optional) */
          hover:shadow-[0_0_30px_#00FFFF50]
        "
        style={{ animation: 'fadeIn 0.8s ease-out' }} 
      >
        
        {/* Title with Stronger Neon Glow */}

        <h2 
          className="
            text-3xl md:text-4xl font-extrabold text-center mb-6 tracking-widest uppercase
            text-[#00FFFF] 
            drop-shadow-[0_0_15px_#00FFFF80] /* Stronger Neon Text Glow */
          "
        >
          {title}
        </h2>

        {/* Divider Neon Bars */}

        <div 
          className="
            w-28 h-0.5 mx-auto mb-8 
            bg-[#00FFFF] 
            rounded-full 
            shadow-[0_0_10px_#00FFFF, 0_0_20px_#00FFFF] /* Double Glow Effect */
 " ></div>
 {/* Content (Forms / UI passed from parent) */}

<div className="space-y-6">{children}</div>
 </div>
 </div>
 );
};

export default AuthCard;