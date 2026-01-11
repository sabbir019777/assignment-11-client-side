// src/pages/PublicLessons.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { 
  FaLock, FaSearch, FaChevronDown, FaChevronUp, 
  FaMapMarkerAlt, FaCalendarAlt, FaStar, FaDollarSign, FaArrowDown 
} from "react-icons/fa";
import { axiosInstance } from "../utils/api";


const ProfessionalLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02040A] backdrop-blur-xl">
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
      <div className="absolute inset-2 border-b-2 border-fuchsia-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
      <div className="w-16 h-16 bg-gradient-to-tr from-cyan-400 to-fuchsia-600 rounded-full blur-xl animate-pulse opacity-50"></div>
      <div className="absolute w-12 h-12 bg-[#02040A] rounded-full z-10"></div>
    </div>
    <h2 className="mt-8 text-xl font-mono font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 animate-pulse">
      INITIALIZING_SYSTEM...
    </h2>
    <div className="mt-4 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 animate-[progress_1.5s_ease-in-out_infinite]"></div>
    </div>
    <style>{`
      @keyframes progress {
        0% { width: 0%; transform: translateX(-100%); }
        50% { width: 50%; transform: translateX(0%); }
        100% { width: 100%; transform: translateX(100%); }
      }
    `}</style>
  </div>
);

const PublicLessons = ({ user }) => {
  const [lessons, setLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [toneDropdownOpen, setToneDropdownOpen] = useState(false);

  //  Pagination: Start with 8 items (2 Rows)
  const [visibleCount, setVisibleCount] = useState(8); 

  const categoryOptions = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"];
  const toneOptions = ["Motivational", "Sad", "Realization", "Gratitude"];

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/lessons/public");
        
        await new Promise(resolve => setTimeout(resolve, 700));

        
        if (Array.isArray(res.data)) {
          setLessons(res.data);
          setFilteredLessons(res.data);
        } else {
          setLessons([]);
          setFilteredLessons([]);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load lessons");
        setLessons([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  useEffect(() => {
    if (!Array.isArray(lessons)) return;
    let tempLessons = [...lessons];
    if (categoryFilter) tempLessons = tempLessons.filter(l => l.category === categoryFilter);
    if (toneFilter) tempLessons = tempLessons.filter(l => l.emotionalTone === toneFilter);
    if (searchTerm) tempLessons = tempLessons.filter(l => l.title?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    setFilteredLessons(tempLessons);
    setVisibleCount(8); 
  }, [categoryFilter, toneFilter, searchTerm, lessons]);

  const handleCategorySelect = (category) => {
    setCategoryFilter(category);
    setCategoryDropdownOpen(false);
  };

  const handleToneSelect = (tone) => {
    setToneFilter(tone);
    setToneDropdownOpen(false);
  };


  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (loading) {
    return <ProfessionalLoader />;
  }

  return (
    <div className="px-6 py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 min-h-screen text-white">
      
      {/* Title Section */}
      <div className="relative mb-20 text-center">
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 flex flex-col items-center">
           <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-cyan-400"></div>
           <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00F6FF]"></div>
        </div>
        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-cyan-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            Public
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-white drop-shadow-[0_0_20px_rgba(217,70,239,0.4)]">
            Lessons
          </span>
        </h2>
        <div className="flex justify-center items-center gap-4 mt-6">
           <div className="h-[1px] w-16 bg-gray-700"></div>
           <p className="font-mono text-[10px] md:text-xs tracking-[0.5em] text-cyan-400/70 uppercase">
             Decentralized Wisdom Collective
           </p>
           <div className="h-[1px] w-16 bg-gray-700"></div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 mb-12 justify-center items-center">
        <div className="relative z-20">
          <button
            className="flex items-center justify-between w-52 border border-cyan-400 bg-gray-900/40 backdrop-blur-md rounded-xl p-3 shadow-lg hover:border-cyan-200 transition-all duration-300"
            onClick={() => {
              setCategoryDropdownOpen(!categoryDropdownOpen);
              setToneDropdownOpen(false);
            }}
          >
            <span className="text-cyan-300 font-semibold">{categoryFilter || "All Categories"}</span>
            {categoryDropdownOpen ? <FaChevronUp className="w-4 h-4 text-cyan-400" /> : <FaChevronDown className="w-4 h-4 text-cyan-400" />}
          </button>
          {categoryDropdownOpen && (
            <div className="absolute top-full mt-2 w-full bg-[#05070F]/95 rounded-xl border border-cyan-400/50 shadow-[0_0_20px_#00F6FF55] backdrop-blur-md overflow-hidden">
              <button className="block w-full text-left px-4 py-2 text-slate-300 hover:bg-cyan-400/20 hover:text-cyan-200" onClick={() => handleCategorySelect("")}>All Categories</button>
              {categoryOptions.map((cat, idx) => (
                <button key={idx} className="block w-full text-left px-4 py-2 text-slate-300 hover:bg-cyan-400/20 hover:text-cyan-200" onClick={() => handleCategorySelect(cat)}>{cat}</button>
              ))}
            </div>
          )}
        </div>

        <div className="relative z-10">
          <button
            className="flex items-center justify-between w-52 border border-fuchsia-400 bg-gray-900/40 backdrop-blur-md rounded-xl p-3 shadow-lg hover:border-fuchsia-200 transition-all duration-300"
            onClick={() => {
              setToneDropdownOpen(!toneDropdownOpen);
              setCategoryDropdownOpen(false);
            }}
          >
            <span className="text-fuchsia-300 font-semibold">{toneFilter || "All Tones"}</span>
            {toneDropdownOpen ? <FaChevronUp className="w-4 h-4 text-fuchsia-400" /> : <FaChevronDown className="w-4 h-4 text-fuchsia-400" />}
          </button>
          {toneDropdownOpen && (
            <div className="absolute top-full mt-2 w-full bg-[#05070F]/95 rounded-xl border border-fuchsia-400/50 shadow-[0_0_20px_#F600FF55] backdrop-blur-md overflow-hidden">
              <button className="block w-full text-left px-4 py-2 text-slate-300 hover:bg-fuchsia-400/20 hover:text-fuchsia-200" onClick={() => handleToneSelect("")}>All Tones</button>
              {toneOptions.map((tone, idx) => (
                <button key={idx} className="block w-full text-left px-4 py-2 text-slate-300 hover:bg-fuchsia-400/20 hover:text-fuchsia-200" onClick={() => handleToneSelect(tone)}>{tone}</button>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full border border-cyan-400 bg-gray-900/40 backdrop-blur-md rounded-xl p-3 pl-10 shadow-lg focus:ring-2 focus:ring-cyan-400 outline-none text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {Array.isArray(filteredLessons) && filteredLessons.length > 0 ? (
           
            filteredLessons.slice(0, visibleCount).map((lesson, idx) => {
              const isPremiumLocked = (lesson.accessLevel === "Premium" || lesson.accessLevel === "premium") && (!user || !user.isPremium);
              
              return (
                <div
                  key={lesson._id}
                  className={`group relative flex flex-col h-[500px] w-full p-5 rounded-[2rem] border border-cyan-500/20 bg-[#0A0F1F] backdrop-blur-lg shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:border-cyan-400/50 transition-all duration-500 ${isPremiumLocked ? "opacity-80" : "opacity-100"}`}
                >
                  {isPremiumLocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#05070F]/80 rounded-[2rem] backdrop-blur-sm z-30 border border-yellow-500/20">
                      <FaLock className="text-4xl mb-3 text-yellow-400 animate-pulse" />
                      <p className="font-bold text-sm mb-4 text-yellow-400 uppercase tracking-widest">Premium Locked</p>
                      <Link to="/pricing" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">Unlock Now</Link>
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-40 w-full mb-4 overflow-hidden rounded-2xl">
                    <img 
                      src={lesson.image || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600"} 
                      alt={lesson.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                      <p className="text-[10px] font-mono text-cyan-300 uppercase">{lesson.category}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-white leading-tight line-clamp-1 group-hover:text-cyan-400 transition-colors">
                      {lesson.title}
                    </h3>
                    
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
                      {lesson.description || "Unlock the potential within. This lesson contains vital data for your growth protocol."}
                    </p>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-2 mb-4 mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 p-2 rounded-lg border border-white/5">
                        <FaDollarSign className="text-cyan-400" />
                        <span>{lesson.price > 0 ? `$${lesson.price}` : "Free"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 p-2 rounded-lg border border-white/5">
                        <FaStar className="text-yellow-400" />
                        <span>{lesson.rating || "5.0"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 p-2 rounded-lg border border-white/5">
                        <FaCalendarAlt className="text-fuchsia-400" />
                        <span>{new Date(lesson.createdAt || Date.now()).toLocaleDateString('en-GB', {day: '2-digit', month: 'short'})}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 p-2 rounded-lg border border-white/5">
                        <FaMapMarkerAlt className="text-green-400" />
                        <span className="truncate">{lesson.location || "Global"}</span>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  {!isPremiumLocked && (
                    <Link 
                      to={`/lessons/${lesson._id}`} 
                      className="block w-full text-center bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 border border-cyan-500/30 text-cyan-300 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all duration-300"
                    >
                      View Details
                    </Link>
                  )}
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center border border-white/10 rounded-[3rem] bg-white/5 backdrop-blur-md">
              <p className="text-gray-400 font-mono italic tracking-[0.3em] text-sm uppercase animate-pulse">
                No_Data_Found_In_Sector
              </p>
            </div>
          )
        }
      </div>

     
      {filteredLessons.length > visibleCount && (
        <div className="flex justify-center mt-16">
          <button 
            onClick={handleLoadMore}
            className="group relative px-8 py-3 bg-slate-900 border border-cyan-500/30 rounded-full overflow-hidden hover:border-cyan-400 transition-all"
          >
            <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center gap-3 text-cyan-400 font-bold tracking-widest text-xs uppercase">
              Load More Data
              <FaArrowDown className="group-hover:translate-y-1 transition-transform" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicLessons;