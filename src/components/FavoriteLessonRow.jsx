// src/components/FavoriteLessonRow.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../utils/api";
import { 
  FaTrash, FaEye, FaSearch, FaCogs, 
  FaDatabase, FaShieldAlt, FaMicrochip, FaTerminal 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FavoriteLessonRow = ({ user }) => {
  const [lessons, setLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user?.uid) {
        try {
          setLoading(true);
          const res = await axiosInstance.get(`/api/lessons/favorites/${user.uid}`);
          setLessons(res.data || []);
          setFilteredLessons(res.data || []);
        } catch (err) {
          toast.error("SYSTEM_SYNC_ERROR: Link Interrupted");
        } finally {
          
          setTimeout(() => setLoading(false), 1500);
        }
      }
    };
    fetchFavorites();
  }, [user]);

  useEffect(() => {
    let result = lessons;
    if (categoryFilter !== "All") result = result.filter((l) => l.category === categoryFilter);
    if (searchTerm) {
      result = result.filter((l) => l.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredLessons(result);
  }, [searchTerm, categoryFilter, lessons]);

  const handleRemoveFavorite = (lessonId) => {
    axiosInstance
      .patch(`/api/lessons/${lessonId}/toggle-favorite`, { userId: user.uid })
      .then(() => {
        setLessons(lessons.filter((l) => l._id !== lessonId));
        toast.success("SECTOR_DELETED: Unit removed");
      })
      .catch(() => toast.error("ACCESS_DENIED: Protocol failure"));
  };

  // --- PREMIUM CYBER LOADING STATE ---
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] bg-[#0F172A] font-mono overflow-hidden">
        <div className="relative">
          {/* Outer Rotating HUD Ring */}
          <div className="w-32 h-32 border-2 border-indigo-500/20 rounded-full border-t-cyan-400 animate-spin"></div>
          
          {/* Middle HUD Ring (Reverse Spin) */}
          <div className="absolute inset-2 border-2 border-cyan-500/10 rounded-full border-b-indigo-500 animate-[spin_1.5s_linear_infinite_reverse]"></div>
          
          {/* Inner Core Icon */}
          <div className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center">
            <FaMicrochip className="text-cyan-400 text-3xl animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
          </div>
        </div>

        {/* Text and Progress Bar Section */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex items-center gap-3 justify-center">
            <span className="w-1.5 h-1.5 bg-cyan-500 animate-ping"></span>
            <p className="text-cyan-400 tracking-[0.5em] text-[10px] font-black uppercase">
             Loading...Favourites
            </p>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="w-64 h-[3px] bg-white/5 rounded-full overflow-hidden relative border border-white/5">
             <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 via-cyan-400 to-indigo-600 animate-[loading-bar_2s_ease-in-out_infinite] w-full"></div>
          </div>
          
          <div className="flex justify-between w-64 mx-auto text-[7px] text-slate-500 tracking-[0.2em] uppercase font-bold">
            <span className="animate-pulse">Auth_Level: ROOT</span>
            <span className="animate-pulse">Link: SECURE</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-4 md:p-10 font-mono text-slate-300">
      
      {/* --- CYBER HUD HEADER --- */}
      <div className="relative mb-16 p-8 border border-white/5 bg-slate-900/40 backdrop-blur-3xl rounded-[2rem] overflow-hidden group shadow-2xl">
        <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 relative z-10">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
              <span className="text-[10px] text-indigo-400 tracking-[0.3em] font-bold uppercase">Archive_Sector: 7G-Vault</span>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-white via-indigo-300 to-cyan-400 bg-clip-text text-transparent italic tracking-tighter uppercase leading-none">
              Favorite_Modules
            </h1>
          </div>

          {/* --- SEARCH & FILTER CONTROLS --- */}
          <div className="flex flex-col md:flex-row gap-5 w-full lg:w-auto">
            <div className="relative group/search flex-1">
              <FaTerminal className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500/50 group-focus-within/search:text-cyan-400 transition-all text-[10px]" />
              <input
                type="text"
                placeholder="root@user:~/ search_db"
                className="w-full md:w-72 bg-black/40 border border-indigo-500/20 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all text-[11px] text-cyan-50 placeholder:text-slate-700"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative group/select min-w-[240px]">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-indigo-400 group-hover/select:text-cyan-400 transition-colors pointer-events-none">
                <FaMicrochip size={12} className="animate-pulse" />
              </div>
              <select
                className="w-full bg-slate-900/90 border border-indigo-500/20 rounded-xl pl-10 pr-10 py-3.5 outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all cursor-pointer text-[10px] uppercase tracking-[0.2em] font-black text-blue-400 appearance-none backdrop-blur-xl group-hover/select:border-indigo-500/40"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">:: ACCESS_ALL_NODES</option>
                <option value="Personal Growth">:: GROWTH_UNITS</option>
                <option value="Career">:: CAREER_CYCLES</option>
                <option value="Relationships">:: SOCIAL_NODES</option>
                <option value="Mindset">:: CORE_MINDSET</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col gap-0.5 opacity-30 group-hover/select:opacity-100 transition-opacity">
                <div className="w-3 h-[2px] bg-cyan-400"></div>
                <div className="w-2 h-[2px] bg-indigo-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredLessons.length === 0 ? (
          <div className="col-span-full py-32 text-center border-2 border-dashed border-indigo-500/10 rounded-[3rem] bg-slate-900/20">
            <FaDatabase className="mx-auto text-5xl text-slate-800 mb-6 animate-pulse" />
            <p className="text-slate-600 tracking-[0.5em] text-[10px] uppercase font-bold">
              No_Signatures_Detected_In_Range
            </p>
          </div>
        ) : (
          filteredLessons.map((lesson, idx) => (
            <div 
              key={lesson._id}
              className="group relative bg-[#131C31] border border-white/5 p-8 rounded-[2.5rem] transition-all duration-700 hover:bg-indigo-950/20 hover:border-indigo-500/30 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="w-8 h-8 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-xl"></div>
              </div>

              <div className="absolute bottom-6 right-8 font-black text-7xl text-white/[0.02] group-hover:text-cyan-500/[0.05] transition-all pointer-events-none italic">
                {String(idx + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-indigo-500 text-[10px]" />
                    <span className="text-[9px] text-indigo-400 font-bold tracking-[0.2em] uppercase bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
                      ENCRYPTED_DATA
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-cyan-400/60 group-hover:text-cyan-400 transition-colors uppercase tracking-widest bg-cyan-500/5 px-2 py-1 rounded">
                    {lesson.category?.split(' ')[0]}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-3 leading-tight group-hover:text-cyan-300 transition-all uppercase tracking-tighter h-14 line-clamp-2">
                  {lesson.title}
                </h3>
                
                <p className="text-[9px] text-slate-500 mb-10 flex items-center gap-2 font-bold tracking-widest">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_indigo]"></span>
                  CID: {lesson._id.slice(-12).toUpperCase()}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/lessons/${lesson._id}`)}
                    className="flex-[2.5] py-4 bg-indigo-600 hover:bg-cyan-500 text-white rounded-2xl font-black text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_10px_25px_rgba(79,70,229,0.3)] hover:shadow-cyan-500/40 uppercase"
                  >
                    <FaEye size={14} /> Access_Unit
                  </button>
                  <button
                    onClick={() => handleRemoveFavorite(lesson._id)}
                    className="flex-1 py-4 bg-slate-900/50 hover:bg-rose-500/20 text-slate-600 hover:text-rose-500 rounded-2xl border border-white/5 hover:border-rose-500/40 transition-all active:scale-90 flex items-center justify-center"
                    title="Purge Module"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>

              <div className="absolute left-0 top-0 w-[3px] h-0 bg-gradient-to-b from-indigo-500 via-cyan-400 to-transparent group-hover:h-full transition-all duration-1000"></div>
            </div>
          ))
        )}
      </div>

      {/* --- HUD FOOTER STATUS --- */}
      <div className="mt-20 flex flex-col md:flex-row justify-between items-center px-10 py-8 border border-white/5 bg-slate-900/30 backdrop-blur-md rounded-[2.5rem] gap-6">
        <div className="flex items-center gap-10">
           <div className="flex items-center gap-4">
              <div className="flex gap-1.5 items-end h-5">
                 <div className="w-1 bg-indigo-500/60 animate-[bounce_1s_infinite] h-3"></div>
                 <div className="w-1 bg-cyan-400 animate-[bounce_1.4s_infinite] h-5"></div>
                 <div className="w-1 bg-indigo-500/60 animate-[bounce_0.8s_infinite] h-4"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Connection_Link</span>
                <span className="text-[11px] text-cyan-400 font-black uppercase">Established_Secure</span>
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-8">
           <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-600 uppercase tracking-widest">Active_Nodes</span>
              <span className="text-xs text-indigo-400 font-black">{filteredLessons.length} UNITS_LOADED</span>
           </div>
           <div className="w-10 h-10 rounded-xl border border-white/5 flex items-center justify-center bg-black/20">
              <FaCogs className="text-slate-600 animate-spin-slow" />
           </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: #0F172A;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default FavoriteLessonRow;