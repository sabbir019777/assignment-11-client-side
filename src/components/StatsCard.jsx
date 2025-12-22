// src/components/StatsCard.jsx
import React from "react";
import { FaHeart, FaBookmark, FaEye } from "react-icons/fa";


const StatsCard = ({ likes = 0, favorites = 0, views = 0, size = "md" }) => {

  const sizeConfig = {
    sm: {
      wrapper: "px-3 py-2 gap-3 text-xs",
      icon: 14,
    },
    md: {
      wrapper: "px-5 py-3 gap-4 text-sm",
      icon: 18,
    },
    lg: {
      wrapper: "px-7 py-4 gap-5 text-lg",
      icon: 22,
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  return (
    <div className="relative group w-full">
      {/* Neon Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 blur-xl opacity-40 group-hover:opacity-70 transition duration-500"></div>

      {/* Card */}
      <div
        className={`
          relative flex justify-between items-center
          rounded-3xl
          bg-[#0B0F1A]/90
          backdrop-blur-xl
          border border-white/10
          shadow-[0_0_30px_rgba(139,92,246,0.35)]
          transition-all duration-500
          hover:scale-[1.03]
          hover:shadow-[0_0_55px_rgba(217,70,239,0.55)]
          ${currentSize.wrapper}
        `}
      >
        {/* Likes */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-red-500/10 border border-red-400/20">
            <FaHeart
              size={currentSize.icon}
              className="text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.8)]"
            />
          </div>
          <span className="font-bold text-white">{likes}</span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-white/10"></div>

        {/* Favorites */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-yellow-500/10 border border-yellow-400/20">
            <FaBookmark
              size={currentSize.icon}
              className="text-yellow-300 drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]"
            />
          </div>
          <span className="font-bold text-white">{favorites}</span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-white/10"></div>

        {/* Views */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-emerald-500/10 border border-emerald-400/20">
            <FaEye
              size={currentSize.icon}
              className="text-emerald-300 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]"
            />
          </div>
          <span className="font-bold text-white">{views}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
