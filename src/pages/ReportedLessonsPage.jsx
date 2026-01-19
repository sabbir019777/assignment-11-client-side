// src/pages/admin/ReportedLessonsPage.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getReportedLessons } from "../utils/api"; 
import LoadingPage from "./LoadingPage";

const ReportedLessonsPage = () => {
  const [reportedLessons, setReportedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReported = async () => {
    try {
      setLoading(true);
      const data = await getReportedLessons();
      const lessonsArray = Array.isArray(data) ? data : data?.data || [];
      setReportedLessons(lessonsArray);
    } catch (err) {
      console.error("Fetch Error:", err);
   
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReported();
  }, []);


  const handleDummyAction = (id) => {
   
    setReportedLessons((prev) => prev.filter((lesson) => lesson._id !== id));
    
   
    toast.success("Action Successful!");
  };

  if (loading) return <LoadingPage message="Scanning for reported content..." />;

  return (
    <div className="p-8 md:p-12 bg-gray-50 dark:bg-[#0B1120] min-h-screen text-gray-800 dark:text-gray-200 selection:bg-red-500/30 font-sans relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full hidden dark:block" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full hidden dark:block" />

      <div className="max-w-[1700px] mx-auto relative z-10">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-red-500 pl-6 py-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
               <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-600 dark:text-red-500/80">Security Protocol Alpha</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 dark:text-white drop-shadow-sm">
              Reported <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 italic">Content</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-500 text-sm mt-2 font-medium tracking-wide">Review and take action on lessons reported by users.</p>
          </div>
          
          <div className="relative px-6 py-4 bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-white/10 rounded-2xl backdrop-blur-xl shadow-lg">
             <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Total Active Issues</p>
             <p className="text-3xl font-mono font-black text-gray-900 dark:text-white">{reportedLessons.length.toString().padStart(2, '0')}</p>
          </div>
        </header>

        {reportedLessons.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-gray-900/20 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-white/5 backdrop-blur-sm">
             <div className="text-6xl mb-6 grayscale opacity-50">🛡️</div>
            <p className="text-gray-500 dark:text-gray-400 text-xl font-light tracking-widest uppercase">System Integrity: <span className="text-green-600 font-bold">100% Clean</span></p>
            <button 
              onClick={fetchReported}
              className="mt-8 px-8 py-3 rounded-full border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-[0.3em] hover:bg-cyan-50 transition-all duration-500"
            >
              Force System Rescan
            </button>
          </div>
        ) : (
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-gray-200 dark:border-white/5 bg-white dark:bg-gray-900/20 backdrop-blur-2xl shadow-xl">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50 hidden dark:block" />
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="text-gray-500 dark:text-gray-400 uppercase text-[11px] font-black tracking-[0.2em] bg-gray-50 dark:bg-white/[0.02]">
                    <th className="px-10 py-8 border-b border-gray-200 dark:border-white/5">Lesson Archive</th>
                    <th className="px-6 py-8 border-b border-gray-200 dark:border-white/5">Classification</th>
                    <th className="px-6 py-8 border-b border-gray-200 dark:border-white/5">Reported By</th>
                    <th className="px-6 py-8 border-b border-gray-200 dark:border-white/5 text-center">Details</th>
                    <th className="px-6 py-8 border-b border-gray-200 dark:border-white/5">Visibility</th>
                    <th className="px-6 py-8 border-b border-gray-200 dark:border-white/5">Date</th>
                    <th className="px-10 py-8 border-b border-gray-200 dark:border-white/5 text-right">System Override</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/[0.03]">
                  {reportedLessons.map((lesson) => (
                    <tr key={lesson._id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors duration-300">
                      
                      {/* 1. Lesson Name & Image */}
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 overflow-hidden shadow-inner">
                             {/* Optional Image handling */}
                             {lesson.thumbnail || lesson.image ? (
                               <img src={lesson.thumbnail || lesson.image} alt="" className="w-full h-full object-cover" />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center text-xs">IMG</div>
                             )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white text-sm">{lesson.title || "Untitled Lesson"}</p>
                            <p className="text-[10px] text-gray-500 font-mono mt-1">ID: {lesson._id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>

                      {/* 2. Category */}
                      <td className="px-6 py-6">
                        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wide">
                          {lesson.category || "General"}
                        </span>
                      </td>

                      {/* 3. Reported By */}
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-400 to-red-500" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{lesson.reportedBy || "Anonymous"}</span>
                        </div>
                      </td>

                      {/* 4. Details / Reason */}
                      <td className="px-6 py-6 text-center">
                         <span className="text-xs font-mono text-red-500 bg-red-50 dark:bg-red-900/10 px-2 py-1 rounded border border-red-100 dark:border-red-900/30">
                           {lesson.reason || "Policy Violation"}
                         </span>
                      </td>

                      {/* 5. Visibility */}
                      <td className="px-6 py-6">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          {lesson.visibility || "Public"}
                        </span>
                      </td>

                      {/* 6. Date */}
                      <td className="px-6 py-6">
                        <span className="text-xs font-mono text-gray-500">
                          {new Date().toLocaleDateString()}
                        </span>
                      </td>

               
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {/* RESOLVED BUTTON */}
                          <button
                            onClick={() => handleDummyAction(lesson._id)}
                            className="group relative px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 overflow-hidden"
                          >
                            <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">Resolved</span>
                          </button>

                          {/* DELETE BUTTON */}
                          <button
                            onClick={() => handleDummyAction(lesson._id)}
                            className="group relative px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 overflow-hidden"
                          >
                            <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">Delete</span>
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div className="mt-8 text-center">
            <p className="text-[10px] font-mono text-gray-500 dark:text-gray-700 uppercase tracking-[0.5em]">Terminal ID: OS_v1.0.4_REPORT_NODE</p>
        </div>
      </div>
    </div>
  );
};

export default ReportedLessonsPage;