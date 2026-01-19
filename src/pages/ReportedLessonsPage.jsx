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

  const handleSafeRemove = (id) => {
    try {

      setReportedLessons((currentLessons) => 
        currentLessons.filter((lesson) => lesson._id !== id)
      );
     
      toast.success("Action Successful!");
    } catch (error) {
      console.error("Remove Error:", error);
    }
  };

  if (loading) return <LoadingPage message="Scanning for reported content..." />;

  return (
    <div className="p-8 md:p-12 bg-gray-50 dark:bg-[#0B1120] min-h-screen text-gray-800 dark:text-gray-200 font-sans relative overflow-hidden">
      
      <div className="max-w-[1700px] mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-red-500 pl-6 py-2">
          <div>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">
              Reported <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 italic">Content</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-500 text-sm mt-2">Manage reported lessons securely.</p>
          </div>
          <div className="px-6 py-4 bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg">
             <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Total Issues</p>
             <p className="text-3xl font-mono font-black text-gray-900 dark:text-white">{reportedLessons.length}</p>
          </div>
        </header>

        {/* Table Section */}
        {reportedLessons.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-gray-900/20 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-white/5">
            <p className="text-gray-500 text-xl font-bold uppercase">All Clean! No Reports.</p>
            <button onClick={fetchReported} className="mt-4 text-blue-500 underline">Refresh</button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-xl bg-white dark:bg-gray-900/20 border border-gray-200 dark:border-white/5">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 uppercase text-xs font-bold tracking-wider">
                  <th className="px-8 py-6">Lesson Info</th>
                  <th className="px-6 py-6">Category</th>
                  <th className="px-6 py-6">Reported By</th>
                  <th className="px-6 py-6 text-center">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                {reportedLessons.map((lesson) => (
                  <tr key={lesson._id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    
                    {/* Lesson Info */}
                    <td className="px-8 py-6">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{lesson.title || "Untitled"}</p>
                        <p className="text-xs text-gray-500 mt-1 font-mono">ID: {lesson._id}</p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-6">
                      <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">
                        {lesson.category || "General"}
                      </span>
                    </td>

                    {/* Reported By */}
                    <td className="px-6 py-6">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {lesson.reportedBy || "Anonymous"}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-6 text-center">
                       <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-xs font-bold">
                         {lesson.reportCount || 1} Reports
                       </span>
                    </td>

                    {/* Actions Buttons */}
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        
                        {/*  RESOLVED BUTTON */}
                        <button
                          onClick={() => handleSafeRemove(lesson._id)}
                          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                        >
                          Resolved
                        </button>

                        {/*  DELETE BUTTON */}
                        <button
                          onClick={() => handleSafeRemove(lesson._id)}
                          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportedLessonsPage;