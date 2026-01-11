import React from "react";
import { FaLock, FaArrowRight, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaStar, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const FeaturedLessonCard = ({ lesson, user }) => {
  const navigate = useNavigate();

  const isPremiumLesson = lesson.accessLevel?.toLowerCase() === "premium";
  const isUserPremium = user?.isPremium === true;
  const isCreator = user?.email === lesson.creatorEmail;
  const isLocked = isPremiumLesson && !isUserPremium && !isCreator;

  const handleDetails = (e) => {
    e.stopPropagation();

   
    if (isLocked) {
      navigate("/pricing");
    } else {
      
      navigate(`/lessons/${lesson._id}`);
    }
  };

  return (
    <div
      onClick={handleDetails}
      className="relative group h-[520px] w-full perspective-1000 cursor-pointer"
    >
      <div className="relative h-full w-full bg-[#050B18] rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col transition-all duration-700 ease-out group-hover:shadow-[0_0_40px_rgba(64,224,208,0.15)] group-hover:border-[#40E0D0]/30">
        

        <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-full h-[2px] bg-[#40E0D0] shadow-[0_0_15px_#40E0D0] animate-scan" />
        </div>

      
        <div className="relative h-44 shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-transparent to-transparent z-10" />
          <img
            src={lesson.image || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600"}
            alt={lesson.title}
            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isLocked ? "blur-xl opacity-20" : "opacity-60 group-hover:opacity-100"}`}
          />
          <div className="absolute bottom-4 left-6 z-20">
             <span className="text-[8px] font-mono text-[#40E0D0] uppercase tracking-[0.3em] bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-[#40E0D0]/30">
                {lesson.category || "Intelligence"}
             </span>
          </div>
        </div>


        <div className="relative p-7 flex flex-col flex-grow z-20">
          
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-white text-xl font-black uppercase italic leading-none tracking-tighter group-hover:text-[#40E0D0] transition-all duration-300">
              {lesson.title}
            </h3>
            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
               <FaStar className="text-yellow-500 text-[10px]" />
               <span className="text-[10px] text-white font-bold">{lesson.rating || "5.0"}</span>
            </div>
          </div>

          <p className="text-slate-500 text-[11px] leading-relaxed mb-6 line-clamp-2 group-hover:text-slate-300 transition-colors">
            {lesson.description || "No description available for this neural node."}
          </p>

          {/* Meta Info - Chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-xl">
              <FaDollarSign className="text-[#40E0D0] text-[10px]" />
              <span className="text-[9px] font-mono uppercase text-slate-400">{lesson.price > 0 ? `$${lesson.price}` : "Free"}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-xl">
              <FaCalendarAlt className="text-[#FF00FF] text-[10px]" />
              <span className="text-[9px] font-mono uppercase text-slate-400">{new Date(lesson.createdAt || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-xl max-w-[110px]">
              <FaMapMarkerAlt className="text-[#40E0D0] text-[10px]" />
              <span className="text-[9px] font-mono uppercase text-slate-400 truncate">{lesson.location || "Archive"}</span>
            </div>
          </div>

          {/* View Details Button */}
          <button 
            onClick={handleDetails}
            className="mt-auto w-full group/btn relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#40E0D0]/10 to-[#FF00FF]/10 border border-white/10 py-4 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#40E0D0]/50 hover:shadow-[0_0_20px_rgba(64,224,208,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#40E0D0] to-[#FF00FF] opacity-0 group-hover/btn:opacity-10 transition-opacity duration-500"></div>
            <FaEye className="text-[#40E0D0] group-hover/btn:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white group-hover/btn:text-[#40E0D0]">
              {isLocked ? "Unlock Details" : "View Details"}
            </span>
            <FaArrowRight className="text-[10px] text-white/50 group-hover/btn:translate-x-1 group-hover/btn:text-[#40E0D0] transition-all" />
          </button>
        </div>
      </div>

      {/* Premium Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#01040D]/60 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 text-center animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-red-600/10 border border-red-600/20 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
            <FaLock className="text-2xl text-red-600 animate-pulse" />
          </div>
          <h4 className="text-white font-black uppercase tracking-[0.3em] text-xs mb-2">Neural Link Failed</h4>
          <p className="text-slate-500 text-[9px] uppercase tracking-widest leading-loose mb-8">Unauthorized access attempt. Upgrade your clearance tier.</p>
          <button 
            onClick={(e) => { e.stopPropagation(); navigate("/pricing"); }}
            className="w-full py-4 bg-gradient-to-r from-[#40E0D0] to-[#FF00FF] text-black text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] hover:scale-[1.02] transition-all duration-500 shadow-xl shadow-cyan-500/10"
          >
            Initiate Upgrade
          </button>
        </div>
      )}

      {/* Custom Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { top: 0%; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan { animation: scan 2s linear infinite; }
      `}} />
    </div>
  );
};

export default FeaturedLessonCard;