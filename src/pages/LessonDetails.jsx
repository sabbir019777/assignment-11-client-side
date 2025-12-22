// src/pages/LessonDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getLessonById,
  toggleLike,
  toggleFavorite,
  reportLesson,
  getSimilarLessons,
  addComment,
  deleteComment,
} from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";
import SimilarLessonCard from "../components/SimilarLessonCard";
import PremiumBadge from "../components/PremiumBadge";
import ReportModal from "../components/ReportModal";
import { toast } from "react-hot-toast";
import {
  FaHeart,
  FaBookmark,
  FaFlag,
  FaShareAlt,
  FaPaperPlane,
  FaRegCommentDots,
  FaTrash,
} from "react-icons/fa";

const LessonDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [similarLessons, setSimilarLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0); 
        
        const data = await getLessonById(id);

        if (data.accessLevel === "premium" && (!user || !user.isPremium)) {
          toast.error("Upgrade to Premium to view this lesson");
          navigate("/pricing");
          return;
        }

        setLesson(data);
        const similar = await getSimilarLessons(id, data.category);
        setSimilarLessons(similar || []);
      } catch (err) {
        toast.error("Failed to load lesson");
        console.error("Lesson fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id, user, navigate]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const text = commentText.trim();
    if (!user) return toast.error("Please log in to comment");
    if (!text) return toast.error("Comment cannot be empty");

    try {
      const commentData = {
        text,
        userId: user._id || user.uid,
        userName: user.displayName || user.name,
        userPhoto: user.photoURL,
      };
      await addComment(id, commentData);
      const updatedLesson = await getLessonById(id);
      setLesson(updatedLesson);
      setCommentText("");
      toast.success("Comment added");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  const handleLike = async () => {
    if (!user) return toast.error("Please log in to like");
    try {
      await toggleLike(id);
      const updated = await getLessonById(id);
      setLesson(updated);
    } catch (err) {
      toast.error("Failed to update like");
    }
  };

  
  const handleFavorite = async () => {
    if (!user) return toast.error("Please log in to save");
    
    try {

      const res = await toggleFavorite(id, user.uid); 
     
      const updated = await getLessonById(id);
      setLesson(updated);

      if (res?.isFavorite) {
        toast.success("Added to favorites");
      } else {
        toast.success("Removed from favorites");
      }
    } catch (err) {
      console.error("Favorite toggle error:", err);
      toast.error("Failed to update favorite");
    }
  };

  const handleReportSubmit = async (reportData) => {
    if (!user) return toast.error("Please log in to report");
    try {
      await reportLesson(id, {
        reason: reportData.reason,
        details: reportData.details,
      });
      const updated = await getLessonById(id);
      setLesson(updated);
      toast.success("Report submitted");
      setIsReportOpen(false);
    } catch (err) {
      toast.error("Failed to report");
    }
  };

  if (loading || !lesson) return <LoadingSpinner label="Loading Lesson..." />;

  
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          onSubmit={handleReportSubmit}
        />

        {/* HERO SECTION */}
        <div className="relative group rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] bg-slate-900">
          {lesson.image && (
            <div className="relative h-[500px] w-full">
              <img
                src={lesson.image}
                alt={lesson.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />

              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-4 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/50 text-blue-400 rounded-full text-sm font-bold tracking-widest uppercase">
                    {lesson.category || "Lesson"}
                  </span>
                  {lesson.accessLevel === "premium" && <PremiumBadge />}
                </div>
                <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent leading-tight">
                  {lesson.title}
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                  {lesson.description}
                </p>
              </div>
            </div>
          )}

          {/* INTERACTION BAR */}
          <div className="p-8 bg-slate-900/80 backdrop-blur-2xl flex flex-wrap justify-between items-center gap-6 border-t border-white/5">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-rose-500 to-pink-600 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] text-white rounded-2xl transition-all active:scale-95 font-bold"
              >
                <FaHeart className={lesson.isLiked ? "animate-pulse" : ""} />
                <span>{lesson.likesCount || 0}</span>
              </button>

              <button
                onClick={handleFavorite}
                className="flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white rounded-2xl transition-all active:scale-95 font-bold"
              >
                {/* ব্যাকএন্ডের ফিল্ড নেম isFavorite হতে পারে, তাই নিচের চেকটি আপডেট করা হলো */}
                <FaBookmark className={lesson.isFavorite ? "text-blue-400" : ""} />
                <span>{lesson.isFavorite ? "Saved" : "Save"}</span>
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsReportOpen(true)}
                className="p-4 bg-slate-800/50 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/20 rounded-2xl transition-all"
                title="Report"
              >
                <FaFlag />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied!");
                }}
                className="p-4 bg-slate-800/50 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 rounded-2xl transition-all"
                title="Share"
              >
                <FaShareAlt />
              </button>
            </div>
          </div>
        </div>

        {/* নিচের কমেন্ট এবং সাইডবার অংশ আগের মতোই থাকবে */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-8">
                <FaRegCommentDots className="text-3xl text-blue-500" />
                <h3 className="text-2xl font-bold">Community Intel</h3>
                <span className="ml-auto text-slate-500 font-mono bg-slate-800 px-3 py-1 rounded-lg">
                  {lesson.comments?.length || 0} Comments
                </span>
              </div>

              {user && (
                <form onSubmit={handleAddComment} className="mb-10 relative group">
                  <textarea
                    placeholder="Contribute to the lesson..."
                    className="w-full bg-slate-800/50 border border-white/10 focus:border-blue-500/50 rounded-2xl p-6 pr-20 transition-all min-h-[120px] outline-none focus:ring-4 focus:ring-blue-500/10 text-slate-200"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-1"
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              )}

              <div className="space-y-6">
                {lesson.comments?.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl">
                    <p className="text-slate-500 italic">No transmissions yet. Be the first to comment.</p>
                  </div>
                ) : (
                  lesson.comments.map((comment) => (
                    <div key={comment._id} className="group flex gap-5 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-300">
                      <img
                        src={comment.userPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.userName}`}
                        alt=""
                        className="w-14 h-14 rounded-2xl border-2 border-white/10"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-white text-lg">{comment.userName}</h4>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">{comment.text}</p>
                      </div>
                      {user && (user.uid === comment.userId || user.role === "admin") && (
                        <button
                          onClick={async () => {
                            if (confirm("Delete this comment?")) {
                              try {
                                await deleteComment(comment._id);
                                const updated = await getLessonById(id);
                                setLesson(updated);
                                toast.success("Comment deleted");
                              } catch (err) { toast.error("Failed to delete"); }
                            }
                          }}
                          className="text-red-400 hover:text-red-200 p-2"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-10 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-black uppercase tracking-widest text-slate-400">Related Data</h3>
                <div className="h-[2px] w-20 bg-gradient-to-r from-blue-500 to-transparent"></div>
              </div>
              <div className="space-y-4">
                {similarLessons.length > 0 ? (
                  similarLessons.map((l) => (
                    <div key={l._id} className="hover:scale-[1.02] transition-transform duration-300">
                      <SimilarLessonCard lesson={l} />
                    </div>
                  ))
                ) : (
                  <div className="p-8 rounded-3xl border border-white/5 bg-slate-900/30 text-center text-slate-600 italic">
                    No related content available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;