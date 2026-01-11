
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

  // --- Fetch Favorites ---
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user?.uid) {
        try {
          setLoading(true);

          const res = await axiosInstance.get(`/api/lessons/favorites/${user.uid}`);
          setLessons(res.data || []);
          setFilteredLessons(res.data || []);
        } catch (err) {
          console.error("Fetch Error:", err);
          toast.error("SYSTEM_SYNC_ERROR: Link Interrupted");
        } finally {
          setTimeout(() => setLoading(false), 500);
        }
      }
    };
    fetchFavorites();
  }, [user]);

  // --- Filtering Logic ---
  useEffect(() => {
    let result = lessons;
    if (categoryFilter !== "All") result = result.filter((l) => l.category === categoryFilter);
    if (searchTerm) {
      result = result.filter((l) => l.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredLessons(result);
  }, [searchTerm, categoryFilter, lessons]);

  // ---  FIXED DELETE HANDLER ---
  const handleRemoveFavorite = async (lessonId) => {
    try {
        
        await axiosInstance.patch(`/lessons/${lessonId}/toggle-favorite`, { userId: user.uid });
        

        const updatedList = lessons.filter((l) => l._id !== lessonId);
        setLessons(updatedList);
        

        toast.success("SECTOR_DELETED: Unit removed from favorites");

    } catch (error) {
        console.error("Remove Error:", error); 
        toast.error("ACCESS_DENIED: Protocol failure");
    }
  };

  // --- PREMIUM CYBER LOADING STATE ---
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] w-full bg-[#02040A] font-mono overflow-hidden rounded-3xl border border-cyan-500/20 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="relative z-10">
          <div className="w-24 h-24 border-2 border-cyan-500/20 rounded-full border-t-cyan-400 animate-spin shadow-[0_0_15px_rgba(34,211,238,0.2)]"></div>
          <div className="absolute inset-2 border-2 border-fuchsia-500/20 rounded-full border-b-fuchsia-500 animate-[spin_1.5s_linear_infinite_reverse]"></div>
          <div className="absolute inset-0 m-auto w-10 h-10 flex items-center justify-center">
            <FaMicrochip className="text-cyan-300 text-2xl animate-pulse" />
          </div>
        </div>
        <div className="mt-8 text-center space-y-3 relative z-10">
          <div className="flex items-center gap-2 justify-center">
            <span className="w-1.5 h-1.5 bg-cyan-400 animate-ping"></span>
            <p className="text-cyan-300 tracking-[0.3em] text-[10px] font-black uppercase">Loading.....Favourites</p>
          </div>
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative mx-auto">
             <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-cyan-500 animate-[loading-bar_1.5s_ease-in-out_infinite] w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full font-mono text-slate-300">
      
      {/* --- CYBER HUD HEADER --- */}
      <div className="relative mb-10 p-6 md:p-8 border border-cyan-500/20 bg-[#0A0F1F]/80 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.05)]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        
        <div className="flex flex-col xl:flex-row justify-between items-center gap-6 relative z-10">
          <div className="space-y-2 text-center xl:text-left">
            <div className="flex items-center gap-2 justify-center xl:justify-start">
              <span className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-pulse shadow-[0_0_10px_#d946ef]"></span>
              <span className="text-[10px] text-cyan-400 tracking-[0.3em] font-bold uppercase">Archive_Sector: 7G-Vault</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase drop-shadow-lg">
              Favorite_<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Modules</span>
            </h1>
          </div>

          {/* --- SEARCH & FILTER CONTROLS --- */}
          <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
            <div className="relative group/search flex-1">
              <FaTerminal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/search:text-cyan-400 transition-colors text-xs" />
              <input
                type="text"
                placeholder="root@user:~/ search_db"
                className="w-full md:w-64 bg-[#05070B] border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all text-xs text-cyan-100 placeholder:text-slate-600 font-bold tracking-wide"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative group/select min-w-[220px]">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-slate-500 group-hover/select:text-fuchsia-400 transition-colors pointer-events-none">
                <FaMicrochip size={12} />
              </div>
              <select
                className="w-full bg-[#05070B] border border-white/10 rounded-xl pl-10 pr-10 py-3 outline-none focus:border-fuchsia-500/50 focus:shadow-[0_0_15px_rgba(217,70,239,0.2)] transition-all cursor-pointer text-[10px] uppercase tracking-[0.1em] font-bold text-slate-300 appearance-none group-hover/select:border-white/20"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">:: ACCESS_ALL_NODES</option>
                <option value="Personal Growth">:: GROWTH_UNITS</option>
                <option value="Career">:: CAREER_CYCLES</option>
                <option value="Relationships">:: SOCIAL_NODES</option>
                <option value="Mindset">:: CORE_MINDSET</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLessons.length === 0 ? (
          <div className="col-span-full py-24 text-center border border-dashed border-white/10 rounded-[2rem] bg-[#0A0F1F]/50 backdrop-blur-sm">
            <FaDatabase className="mx-auto text-4xl text-slate-700 mb-4" />
            <p className="text-slate-500 tracking-[0.2em] text-xs uppercase font-bold">
              No_Signatures_Detected_In_Range
            </p>
          </div>
        ) : (
          filteredLessons.map((lesson, idx) => (
            <div 
              key={lesson._id}
              className="group relative bg-[#0A0F1F] border border-white/5 p-6 rounded-[2rem] transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 border-t-2 border-r-2 border-cyan-500 rounded-tr-lg"></div>
              </div>
              <div className="absolute bottom-2 right-4 font-black text-6xl text-white/[0.03] group-hover:text-cyan-500/[0.05] transition-all pointer-events-none italic select-none">
                {String(idx + 1).padStart(2, '0')}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-fuchsia-500 text-[10px]" />
                    <span className="text-[9px] text-fuchsia-300 font-bold tracking-widest uppercase bg-fuchsia-500/10 px-2 py-0.5 rounded border border-fuchsia-500/20">
                      ENCRYPTED
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {lesson.category?.split(' ')[0]}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors uppercase tracking-tight line-clamp-2 min-h-[3.5rem]">
                  {lesson.title}
                </h3>
                
                <p className="text-[9px] text-slate-500 mb-6 flex items-center gap-2 font-mono font-bold tracking-wider">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></span>
                  CID: <span className="text-slate-400">{lesson._id.slice(-8).toUpperCase()}</span>
                </p>

                <div className="mt-auto flex gap-3">
                  <button
                    onClick={() => navigate(`/lessons/${lesson._id}`)}
                    className="flex-[3] py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-black text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-cyan-900/20 uppercase"
                  >
                    <FaEye size={12} /> Access_Unit
                  </button>
                  <button
                    onClick={() => handleRemoveFavorite(lesson._id)}
                    className="flex-1 py-3 bg-slate-800/50 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-xl border border-white/10 hover:border-rose-500/40 transition-all active:scale-95 flex items-center justify-center"
                    title="Purge Module"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- HUD FOOTER STATUS --- */}
      <div className="mt-16 flex flex-col md:flex-row justify-between items-center px-8 py-6 border-t border-white/5 bg-[#0A0F1F]/50 backdrop-blur-md rounded-3xl gap-4">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3">
              <div className="flex gap-1 items-end h-4">
                 <div className="w-0.5 bg-fuchsia-500/60 animate-[bounce_1s_infinite] h-2"></div>
                 <div className="w-0.5 bg-cyan-400 animate-[bounce_1.4s_infinite] h-4"></div>
                 <div className="w-0.5 bg-fuchsia-500/60 animate-[bounce_0.8s_infinite] h-3"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Link_Status</span>
                <span className="text-[10px] text-cyan-400 font-black uppercase">Secure_Grid</span>
              </div>
           </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end">
             <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Total_Nodes</span>
             <span className="text-[10px] text-white font-black">{filteredLessons.length} UNITS</span>
           </div>
           <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center bg-black/20">
             <FaCogs className="text-slate-500 animate-[spin_8s_linear_infinite] text-xs" />
           </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default FavoriteLessonRow;