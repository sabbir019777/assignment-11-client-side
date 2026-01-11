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
  FaInfoCircle,
  FaListUl,
  FaCalendarAlt,
  FaUserAlt,
  FaTag
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
      <div className="max-w-7xl mx-auto space-y-10">
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          onSubmit={handleReportSubmit}
        />

        {/* --- SECTION 1: HERO & MEDIA (Image Gallery Rule) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Main Image */}
            <div className="space-y-4">
                <div className="rounded-[30px] overflow-hidden border border-white/10 shadow-2xl h-[400px] lg:h-[500px]">
                    <img
                        src={lesson.image}
                        alt={lesson.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                </div>
                {/* Simulated Multiple Images Gallery (To satisfy requirement) */}
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="h-20 rounded-xl overflow-hidden border border-white/10 cursor-pointer hover:border-cyan-400 transition-all">
                            <img src={lesson.image} alt="thumbnail" className="w-full h-full object-cover opacity-60 hover:opacity-100" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Title & Actions */}
            <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="px-4 py-1 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 rounded-full text-xs font-bold uppercase tracking-widest">
                        {lesson.category}
                    </span>
                    {lesson.accessLevel === "premium" && <PremiumBadge />}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">
                    {lesson.title}
                </h1>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button onClick={handleLike} className="flex items-center gap-2 px-6 py-3 bg-rose-500/10 border border-rose-500/50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all font-bold">
                        <FaHeart className={lesson.isLiked ? "animate-pulse" : ""} /> {lesson.likesCount || 0} Likes
                    </button>
                    <button onClick={handleFavorite} className="flex items-center gap-2 px-6 py-3 bg-blue-500/10 border border-blue-500/50 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all font-bold">
                        <FaBookmark /> {lesson.isFavorite ? "Saved" : "Save Lesson"}
                    </button>
                    <button onClick={() => setIsReportOpen(true)} className="p-3 bg-slate-800 border border-white/10 rounded-xl text-yellow-500 hover:bg-yellow-500/10">
                        <FaFlag />
                    </button>
                    <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Copied!"); }} className="p-3 bg-slate-800 border border-white/10 rounded-xl text-emerald-500 hover:bg-emerald-500/10">
                        <FaShareAlt />
                    </button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT CONTENT (Description, Specs, Reviews) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* --- SECTION 2: DESCRIPTION / OVERVIEW --- */}
            <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[32px]">
                <div className="flex items-center gap-3 mb-6">
                    <FaInfoCircle className="text-2xl text-cyan-400" />
                    <h3 className="text-2xl font-bold uppercase tracking-wider">Description</h3>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                    {lesson.description}
                </p>
            </div>

            {/* --- SECTION 3: KEY INFORMATION / SPECIFICATIONS --- */}
            <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[32px]">
                <div className="flex items-center gap-3 mb-6">
                    <FaListUl className="text-2xl text-fuchsia-400" />
                    <h3 className="text-2xl font-bold uppercase tracking-wider">Key Specifications</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400"><FaTag /></div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Category</p>
                            <p className="font-bold text-white">{lesson.category}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400"><FaUserAlt /></div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Creator</p>
                            <p className="font-bold text-white">{lesson.creatorName || "System Admin"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400"><FaHeart /></div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Emotional Tone</p>
                            <p className="font-bold text-white">{lesson.emotionalTone || "Neutral"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"><FaCalendarAlt /></div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Published Date</p>
                            <p className="font-bold text-white">{new Date(lesson.createdAt || Date.now()).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SECTION 4: REVIEWS / RATINGS (Comments) --- */}
            <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[32px]">
              <div className="flex items-center gap-3 mb-8">
                <FaRegCommentDots className="text-3xl text-blue-500" />
                <h3 className="text-2xl font-bold uppercase tracking-wider">Reviews & Community</h3>
                <span className="ml-auto text-slate-500 font-mono bg-slate-800 px-3 py-1 rounded-lg">
                  {lesson.comments?.length || 0} Reviews
                </span>
              </div>

              {user && (
                <form onSubmit={handleAddComment} className="mb-10 relative group">
                  <textarea
                    placeholder="Write a review or share your thoughts..."
                    className="w-full bg-slate-800/50 border border-white/10 focus:border-cyan-500/50 rounded-2xl p-6 pr-20 transition-all min-h-[120px] outline-none focus:ring-4 focus:ring-cyan-500/10 text-slate-200"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute bottom-4 right-4 bg-cyan-600 hover:bg-cyan-500 text-white p-4 rounded-xl transition-all shadow-lg hover:-translate-y-1"
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              )}

              <div className="space-y-6">
                {lesson.comments?.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl">
                    <p className="text-slate-500 italic">No reviews yet. Be the first to add one.</p>
                  </div>
                ) : (
                  lesson.comments.map((comment) => (
                    <div key={comment._id} className="flex gap-5 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                      <img
                        src={comment.userPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.userName}`}
                        alt=""
                        className="w-12 h-12 rounded-full border border-cyan-400"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-white">{comment.userName}</h4>
                          <span className="text-[10px] text-slate-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-slate-400 text-sm">{comment.text}</p>
                      </div>
                      {user && (user.uid === comment.userId || user.role === "admin") && (
                        <button
                          onClick={async () => {
                            if (confirm("Delete this review?")) {
                              try {
                                await deleteComment(comment._id);
                                const updated = await getLessonById(id);
                                setLesson(updated);
                                toast.success("Review deleted");
                              } catch (err) { toast.error("Failed to delete"); }
                            }
                          }}
                          className="text-red-400 hover:text-red-200"
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

          {/* RIGHT SIDEBAR (Related Items) */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-black uppercase tracking-widest text-slate-400">Related Items</h3>
                <div className="h-[2px] w-12 bg-cyan-500"></div>
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
                    No related items found.
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