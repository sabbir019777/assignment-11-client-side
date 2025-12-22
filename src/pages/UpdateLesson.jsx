// src/pages/UpdateLesson.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { getLessonById, updateLesson } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";
import EmotionalToneDropdown from "../components/EmotionalToneDropdown";

const UpdateLesson = () => {
  const { user, isPremium } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    emotionalTone: "",
    visibility: "Public",
    accessLevel: "Free",
    image: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchLesson = async () => {
      try {
        const data = await getLessonById(id);
        if (data.creatorId !== user.uid) {
          toast.error("You are not authorized to edit this lesson");
          navigate("/dashboard/my-lessons");
          return;
        }
        setLesson(data);
        setFormData({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          emotionalTone: data.emotionalTone || "",
          visibility: data.visibility || "Public",
          accessLevel: data.accessLevel || "Free",
          image: data.image || "",
        });
      } catch (err) {
        toast.error("Failed to fetch lesson data");
        navigate("/dashboard/my-lessons");
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Title and Description are required");
      return;
    }
    if (formData.accessLevel === "Premium" && !isPremium) {
      toast.error("Upgrade to Premium to create Premium lessons");
      navigate("/pricing");
      return;
    }

    setSubmitting(true);
    try {
      await updateLesson(id, formData);
      toast.success("Lesson updated successfully");
      navigate("/dashboard/my-lessons");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update lesson");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading Lesson..." />;

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-black via-[#050505] to-[#0f0f0f] flex justify-center items-start py-16 px-4 overflow-hidden">
      {/* Futuristic Glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-cyan-500/20 rounded-full blur-[220px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-600/20 rounded-full blur-[240px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),transparent_70%)] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Glass Card */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(0,255,255,0.2)] rounded-[3rem] overflow-hidden relative">
          
          {/* Neon Top Line */}
          <div className="h-2 w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x"></div>

          {/* Image Section */}
          <AnimatePresence mode="wait">
            {formData.image && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full h-80 overflow-hidden relative group"
              >
                <img
                  src={formData.image}
                  alt="Lesson"
                  className="w-full h-full object-cover rounded-b-[2rem] transition-transform duration-700 group-hover:scale-105 shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-10 md:p-12">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-purple-400 uppercase tracking-tight italic">
                Update Lesson
              </h2>
              <div className="h-1 w-28 bg-gradient-to-r from-cyan-400 to-purple-500 mt-3 rounded-full animate-pulse"></div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
              
              {/* Title */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-cyan-400">Lesson Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a futuristic title..."
                  className="w-full bg-white/5 border border-white/20 p-4 rounded-2xl text-white focus:ring-2 focus:ring-cyan-400/40 outline-none transition-all duration-300 placeholder-gray-400"
                  required
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-purple-400">Mission Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the knowledge..."
                  rows="5"
                  className="w-full bg-white/5 border border-white/20 p-4 rounded-2xl text-white focus:ring-2 focus:ring-purple-400/40 outline-none transition-all duration-300"
                  required
                />
              </div>

              {/* Category - Futuristic with option glow */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-cyan-300">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-gradient-to-r from-cyan-800/30 via-purple-900/30 to-pink-800/30 border border-white/20 p-4 rounded-2xl text-white outline-none cursor-pointer transition-all shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,0,255,0.3)] focus:shadow-[0_0_80px_rgba(0,255,255,0.4)]"
                  required
                >
                  <option value="" className="bg-[#111] text-white/80">Select Category</option>
                  <option value="Personal Growth" className="bg-[#111] text-cyan-400">Personal Growth</option>
                  <option value="Career" className="bg-[#111] text-purple-400">Career</option>
                  <option value="Relationships" className="bg-[#111] text-pink-400">Relationships</option>
                  <option value="Mindset" className="bg-[#111] text-blue-400">Mindset</option>
                  <option value="Mistakes Learned" className="bg-[#111] text-yellow-400">Mistakes Learned</option>
                </select>
              </div>

              {/* Emotional Tone */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Emotional Frequency</label>
                <EmotionalToneDropdown
                  value={formData.emotionalTone}
                  onChange={(tone) => setFormData((prev) => ({ ...prev, emotionalTone: tone }))}
                />
              </div>

              {/* Signal Visibility - Futuristic with option glow */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-purple-300">Signal Visibility</label>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleChange}
                  className="w-full bg-gradient-to-r from-purple-800/30 via-blue-900/30 to-cyan-800/30 border border-white/20 p-4 rounded-2xl text-white outline-none cursor-pointer transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(0,255,255,0.3)] focus:shadow-[0_0_80px_rgba(0,255,255,255,0.4)]"
                  required
                >
                  <option value="Public" className="bg-[#111] text-green-400">Public</option>
                  <option value="Private" className="bg-[#111] text-red-400">Private</option>
                </select>
              </div>

              {/* Access Level */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-yellow-400">Access Protocol</label>
                <select
                  name="accessLevel"
                  value={formData.accessLevel}
                  onChange={handleChange}
                  disabled={!isPremium}
                  className={`w-full p-4 rounded-2xl bg-white/5 border transition-all ${
                    !isPremium ? "border-red-500/20 opacity-50 cursor-not-allowed" : "border-white/20 focus:border-yellow-400"
                  }`}
                  required
                >
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              {/* Submit */}
              <div className="md:col-span-2 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 rounded-2xl font-extrabold text-white uppercase tracking-widest bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_60px_rgba(0,255,255,0.4)] hover:shadow-cyan-500/50 flex justify-center items-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    "Update This Lesson"
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateLesson;
