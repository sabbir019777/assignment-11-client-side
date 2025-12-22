import React from "react";
import { FaStar, FaBookmark, FaLock, FaUserCircle, FaBolt, FaArrowRight } from "react-icons/fa";
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
      {/* ১. হোভার গ্লো কন্টেইনার (Hover Effect Box) */}
      
      <div className="relative h-full w-full bg-[#050B18] rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col transition-all duration-700 ease-out group-hover:rotate-x-2 group-hover:rotate-y-[-2deg] group-hover:shadow-[0_0_50px_rgba(64,224,208,0.25)] group-hover:border-[#40E0D0]/50">
        
        {/* এনিমেটেড স্ক্যানার লাইন */}

        <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#40E0D0] to-transparent shadow-[0_0_15px_#40E0D0] animate-scan" />
        </div>

        {/* --- ২. FEATURED টাইটেল --- */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-full py-4 overflow-hidden border-y border-[#40E0D0]/0 group-hover:border-[#40E0D0]/20 group-hover:bg-[#40E0D0]/5 transition-all duration-700 transform -rotate-12 scale-150">
             <h2 className="text-center text-white font-[1000] text-5xl tracking-[0.5em] opacity-[0.02] group-hover:opacity-10 group-hover:tracking-[1em] transition-all duration-1000 italic uppercase">
                FEATURED
             </h2>
          </div>
        </div>

        {/* ৩. ইমেজ সেকশন */}

        <div className="relative h-56 shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] to-transparent z-10" />
          <img
            src={lesson.image || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600"}
            alt={lesson.title}
            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125 ${isLocked ? "blur-md opacity-30 grayscale" : "opacity-70 group-hover:opacity-100"}`}
          />
          
          <div className="absolute top-6 left-6 z-20">
            <span className={`px-4 py-1.5 rounded-br-2xl rounded-tl-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${isPremiumLesson ? "bg-orange-600/20 border-orange-500 text-orange-400" : "bg-[#40E0D0]/20 border-[#40E0D0] text-[#40E0D0]"}`}>
              {lesson.accessLevel}
            </span>
          </div>
        </div>

        {/* ৪. কার্ড কন্টেন্ট */}

        <div className="relative p-8 flex flex-col flex-grow z-20">
          <div className="flex gap-3 mb-5 translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
            <span className="text-[9px] text-[#40E0D0] border border-[#40E0D050] px-3 py-1 rounded-md uppercase font-black bg-[#40E0D010] tracking-widest shadow-[0_0_10px_rgba(64,224,208,0.1)]">
              {lesson.category || "TECH"}
            </span>
            <span className="text-[9px] text-[#FF00FF] border border-[#FF00FF50] px-3 py-1 rounded-md uppercase font-black bg-[#FF00FF10] tracking-widest shadow-[0_0_10px_rgba(255,0,255,0.1)]">
              {lesson.emotionalTone || "NEURAL"}
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-white text-2xl font-black leading-none tracking-tighter group-hover:text-[#40E0D0] transition-colors uppercase italic duration-300">
              {lesson.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed font-medium group-hover:text-gray-200 transition-colors">
              {lesson.description}
            </p>
          </div>

          {/* Bottom Footer */}

          <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#40E0D040] p-0.5 group-hover:border-[#40E0D0] transition-colors duration-500">
                 <img src={lesson.creatorPhoto || "https://i.pravatar.cc/150"} className="w-full h-full object-cover rounded-[10px]" alt="creator" />
              </div>
              <div className="flex flex-col">
                  <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Authorized By</span>
                  <span className="text-xs text-white font-bold group-hover:text-[#40E0D0] transition-colors">{lesson.creatorName || "Anonymous"}</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 text-[#FF00FF] font-black text-xl drop-shadow-[0_0_8px_#FF00FF]">
                <FaBolt className="text-xs animate-pulse" />
                <span>{lesson.points || 0}</span>
              </div>
              <span className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">Units</span>
            </div>
          </div>
        </div>
      </div>

      {/* ৫. (Premium Lock) */}

      {isLocked && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#01040D]/95 backdrop-blur-2xl rounded-[2.5rem] border border-red-500/20">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-red-600 blur-3xl opacity-20 animate-pulse" />
            <div className="relative border-2 border-red-600 p-7 rounded-[2rem] shadow-[0_0_40px_rgba(220,38,38,0.2)]">
              <FaLock className="text-5xl text-red-600 animate-glow-red" />
            </div>
          </div>
          <h4 className="text-white font-black uppercase tracking-[0.4em] text-lg mb-2">ACCESS DENIED</h4>
          <p className="text-red-500/60 text-[9px] mb-8 font-mono uppercase text-center px-10">Neural link failed. Upgrade required to decrypt this lesson.</p>
          
          <button 
            onClick={(e) => { e.stopPropagation(); navigate("/pricing"); }}
            className="group/btn relative overflow-hidden bg-white text-black text-[11px] font-black px-12 py-4 rounded-full uppercase transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">Initialize Bypass <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" /></span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#40E0D0] to-[#FF00FF] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      )}

    
      {!isLocked && (
        <button className="absolute top-[210px] right-8 z-40 p-3.5 text-white hover:text-[#40E0D0] transition-all bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-[#40E0D0]/50 group-hover:translate-y-[-5px] shadow-xl">
           <FaBookmark className="text-sm" />
        </button>
      )}

      {/* Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .rotate-x-2 { transform: rotateX(4deg); }
        .rotate-y-\\[-2deg\\] { transform: rotateY(-4deg); }
        
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes glow-red {
          0%, 100% { filter: drop-shadow(0 0 5px #dc2626); transform: scale(1); }
          50% { filter: drop-shadow(0 0 20px #dc2626); transform: scale(1.05); }
        }
        .animate-scan {
          animation: scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-glow-red {
          animation: glow-red 2.5s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default FeaturedLessonCard;