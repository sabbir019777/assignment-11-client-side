// src/pages/PublicLessons.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaLock, FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { axiosInstance } from "../utils/api";

const PublicLessons = ({ user }) => {
  const [lessons, setLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [toneDropdownOpen, setToneDropdownOpen] = useState(false);

  const categoryOptions = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"];
  const toneOptions = ["Motivational", "Sad", "Realization", "Gratitude"];

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/lessons/public");
        
        // ফিউচারিস্টিক ভাইব দেওয়ার জন্য ২ সেকেন্ড ডিলে
        await new Promise(resolve => setTimeout(resolve, 2000));

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
  }, [categoryFilter, toneFilter, searchTerm, lessons]);

  const handleCategorySelect = (category) => {
    setCategoryFilter(category);
    setCategoryDropdownOpen(false);
  };

  const handleToneSelect = (tone) => {
    setToneFilter(tone);
    setToneDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#02040A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(0,255,255,0.03),rgba(255,0,255,0.01),rgba(0,255,255,0.03))] bg-[size:100%_4px,4px_100%] pointer-events-none"></div>
        <div className="relative flex flex-col items-center">
          <div className="relative w-28 h-28 mb-12">
            <div className="absolute inset-0 border-2 border-cyan-500/30 rotate-[30deg] animate-[spin_4s_linear_infinite]"></div>
            <div className="absolute inset-0 border-2 border-fuchsia-500/30 -rotate-[60deg] animate-[spin_6s_linear_infinite]"></div>
            <div className="absolute w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_#00F6FF] top-1/2 -translate-y-1/2 animate-scan-line"></div>
            <div className="absolute inset-6 bg-gradient-to-br from-cyan-400 to-fuchsia-600 blur-md rounded-full animate-pulse opacity-60"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-mono font-black tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white animate-pulse">
              Loading_PubicLessons...
            </h2>
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-1.5 h-6 bg-cyan-500/40 animate-[bounce_1s_infinite_0ms]"></div>
              <div className="w-1.5 h-6 bg-cyan-500/60 animate-[bounce_1s_infinite_200ms]"></div>
              <div className="w-1.5 h-6 bg-fuchsia-500 animate-[bounce_1s_infinite_400ms]"></div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes scan-line {
            0%, 100% { top: 10%; opacity: 0; }
            50% { top: 90%; opacity: 1; }
          }
          .animate-scan-line {
            animation: scan-line 2.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="px-6 py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 min-h-screen text-white">
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

      {/* Filters */}
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
            <span className="text-fuchsia-300 font-semibold">{toneFilter || "All Emotional Tones"}</span>
            {toneDropdownOpen ? <FaChevronUp className="w-4 h-4 text-fuchsia-400" /> : <FaChevronDown className="w-4 h-4 text-fuchsia-400" />}
          </button>
          {toneDropdownOpen && (
            <div className="absolute top-full mt-2 w-full bg-[#05070F]/95 rounded-xl border border-fuchsia-400/50 shadow-[0_0_20px_#F600FF55] backdrop-blur-md overflow-hidden">
              <button className="block w-full text-left px-4 py-2 text-slate-300 hover:bg-fuchsia-400/20 hover:text-fuchsia-200" onClick={() => handleToneSelect("")}>All Emotional Tones</button>
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
            className="w-full border border-cyan-400 bg-gray-900/40 backdrop-blur-md rounded-xl p-3 pl-10 shadow-lg focus:ring-2 focus:ring-cyan-400 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {Array.isArray(filteredLessons) && filteredLessons.length > 0 ? (
          filteredLessons.map((lesson) => {
            const isPremiumLocked = (lesson.accessLevel === "Premium" || lesson.accessLevel === "premium") && (!user || !user.isPremium);
            return (
              <div
                key={lesson._id}
                className={`relative p-6 rounded-3xl border-2 border-cyan-500/50 bg-gray-900/30 backdrop-blur-lg shadow-lg transform transition-all duration-500 hover:scale-105 ${isPremiumLocked ? "opacity-70" : "opacity-100"}`}
              >
                {isPremiumLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 rounded-3xl backdrop-blur-md z-30">
                    <div className="text-center p-4">
                      <FaLock className="mx-auto text-4xl mb-3 text-yellow-400" />
                      <p className="font-bold text-lg mb-2 text-yellow-400">Premium Lesson</p>
                      <Link to="/pricing" className="inline-block bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black px-5 py-2 rounded-full font-semibold">Upgrade</Link>
                    </div>
                  </div>
                )}
                <img src={lesson.image || "/default-lesson.jpg"} alt={lesson.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-cyan-300">{lesson.title}</h3>
                <p className="text-gray-300 mb-3">{lesson.description?.slice(0, 100)}...</p>
                <div className="text-sm text-gray-400 mb-3"><span className="text-fuchsia-400 font-bold uppercase tracking-tighter mr-2">{lesson.emotionalTone}</span> • {lesson.category}</div>
                
                <div className="flex items-center mb-5">
                  <img src={lesson.creatorPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${lesson.creatorName}`} alt="" className="w-10 h-10 rounded-full mr-3 border border-cyan-400" />
                  <p className="text-xs font-mono text-gray-400">{lesson.creatorName || "Agent_Unknown"}</p>
                </div>

                {!isPremiumLocked && (
                  
                  <Link to={`/lessons/${lesson._id}`} className="block text-center bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all">
                    See Details
                  </Link>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-400 col-span-full text-xl mt-10 font-mono tracking-widest uppercase animate-pulse">
            No_data_found_sync_error
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;