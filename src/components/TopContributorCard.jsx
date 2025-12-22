import React from "react";
import { FaStar, FaTrophy } from "react-icons/fa";

const TopContributorCard = ({ contributor, index }) => {

  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";


  const getSafeImage = () => {
    const rawImage = contributor?.photoURL || contributor?.photo;
    
    if (!rawImage || 
        rawImage === "" || 
        rawImage === "null" || 
        rawImage === "undefined") {
      return defaultAvatar;
    }
    return rawImage;
  };

  
  const rawName = contributor?.name || contributor?.displayName;
  const displayName = (rawName && rawName !== "null" && rawName !== "undefined" && rawName !== "") 
    ? rawName 
    : "New Learner";

  return (
    <div className="relative group rounded-3xl overflow-hidden p-6 flex flex-col items-center text-center cursor-pointer bg-[#0A102D] border border-cyan-400/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(64,224,208,0.3)] hover:bg-[#0D163F] hover:border-cyan-400/50 transform hover:-translate-y-3">
      
      {/* Rank Badge */}
      <div className={`absolute top-4 right-5 flex items-center gap-1 font-[1000] text-sm
        ${index === 0 ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" : 
          index === 1 ? "text-slate-300" : 
          index === 2 ? "text-orange-500" : "text-cyan-400"}`}>
        <FaTrophy className={index === 0 ? "animate-bounce" : ""} />
        <span className="tracking-tighter italic">#{index + 1}</span>
      </div>

      {/* Profile Image with Neon Ring */}
      <div className="relative mb-6">
        {/* Glow behind image */}
        <div className="absolute inset-0 rounded-full bg-[#FF00FF] blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
        
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#40E0D0] to-[#FF00FF]">
          <img
            src={getSafeImage()}
            alt={displayName}
            className="w-24 h-24 rounded-full border-2 border-[#0A102D] object-cover relative z-10 bg-[#0A102D]"
            onError={(e) => {
              
              if (e.target.src !== defaultAvatar) {
                e.target.src = defaultAvatar;
              }
            }}
          />
        </div>
      </div>

      {/* Name Section */}
      <div className="w-full mb-4 px-2">
        <h4 className="text-white text-lg font-black tracking-tight uppercase truncate">
          {displayName}
        </h4>
        <div className="h-[2px] w-8 bg-cyan-400/30 mx-auto mt-2 group-hover:w-20 transition-all duration-500 shadow-[0_0_8px_#00FFFF]"></div>
      </div>

      {/* Contribution Stats */}
      <div className="space-y-0.5">
        <p className="text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase opacity-70">Activity</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-white text-4xl font-[1000] italic drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            {contributor?.weeklyLessons || 0}
          </span>
          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">Lessons</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-5 flex items-center gap-2 bg-[#FF00FF]/5 px-5 py-2 rounded-xl border border-[#FF00FF]/20 group-hover:bg-[#FF00FF]/10 transition-all">
        <FaStar className="text-[#FF00FF] text-[10px] animate-pulse" />
        <span className="text-[#FF00FF] text-[10px] font-black uppercase tracking-widest">Master Contributor</span>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
    </div>
  );
};

export default TopContributorCard;