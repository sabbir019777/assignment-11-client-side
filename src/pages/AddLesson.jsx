// src/pages/AddLesson.jsx
import React, { useState, useEffect } from "react";
import { createLesson, uploadImage } from "../utils/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import ImageUploader from "../components/ImageUploader";
import Lottie from "lottie-react";
import successAnimationData from "../assets/lottie/payment-success.json";

const LottieComponent =
  typeof Lottie === "object" && Lottie.default ? Lottie.default : Lottie;


// Success Modal Component

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 z-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-[0_0_50px_#f43f5eaa] border border-fuchsia-500/50 max-w-sm w-full text-center transform transition-all duration-300 scale-100">
        <div className="mx-auto w-32 h-32">
          {successAnimationData && (
            <LottieComponent animationData={successAnimationData} loop={false} autoplay={true} />
          )}
        </div>
        <h3 className="text-xl font-bold mt-4 text-fuchsia-400">
          Lesson Committed!
        </h3>
        <p className="text-gray-400 mt-2">
          Your wisdom has been successfully uploaded to the Digital Life Grid.
        </p>
        <button
          onClick={onClose}
          className="mt-6 py-2 px-6 bg-cyan-500 text-gray-900 font-bold rounded-xl hover:bg-cyan-400 transition"
        >
          View My Lessons
        </button>
      </div>
    </div>
  );
};

const AddLesson = () => {
  const navigate = useNavigate();
  const { user, isPremium } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [emotionalTone, setEmotionalTone] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [visibility, setVisibility] = useState("");
  const [accessLevel, setAccessLevel] = useState("Free");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  

  const [initialLoading, setInitialLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.uid) {
      toast.error("User authentication is required to submit a lesson. Please log in.");
      return;
    }

    if (!title || !description || !category || !emotionalTone || !visibility) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await uploadImage(formData);
        imageUrl = (res && (res.url || res.data?.url)) || "";
      }

 const lessonData = {
  title,
  description,
  category,
  emotionalTone,
  image: imageUrl,
  visibility,
  accessLevel: isPremium ? accessLevel : "Free",
  creatorId: user.uid,
  creatorName: user.displayName || "Unknown Creator",
  creatorPhoto: user.photoURL || "default_photo_url",
  isReviewed: true,
  createdAt: new Date(),
};
      const createPromise = createLesson(lessonData);
      const waitThreeSeconds = new Promise((resolve) => setTimeout(resolve, 3000));
      await Promise.all([createPromise, waitThreeSeconds]);

      setShowSuccessModal(true);
    } catch (error) {
      console.error("AddLesson error:", error);
      toast.error("Lesson creation failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/dashboard/my-lessons");
  };

  
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-48 h-48 mb-8">
          <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-t-4 border-fuchsia-500 rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-b-4 border-cyan-400 rounded-full animate-reverse-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-cyan-400 font-mono text-xl animate-pulse">SYNCING...</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent animate-pulse tracking-[0.2em]">
          INITIALIZING AddLesson
        </h2>
        <div className="mt-4 w-64 h-1 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/30">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 animate-progress"></div>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner label="Encoding Lesson to Grid..." />;

  return (
    <div className="min-h-screen bg-gray-950 p-4 pb-20">
      <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} />

      {/* Futuristic Title Design */}
      <div className="relative mb-12 mt-8">
        <h1 className="text-5xl md:text-7xl font-black text-center uppercase tracking-tighter italic">
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-300 to-cyan-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            ADD LESSON
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"></span>
          </span>
        </h1>
      
      </div>

      <div className="max-w-4xl mx-auto p-8 bg-gray-900/50 border border-cyan-500/20 rounded-3xl shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)] backdrop-blur-md animate-fadeIn">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-cyan-400 tracking-wider text-xs flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
              LESSON TITLE
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master Your Morning Routine"
              className="w-full bg-gray-800/50 border border-cyan-500/30 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all duration-300 placeholder-gray-600 shadow-inner"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-cyan-400 tracking-wider text-xs flex items-center gap-2">
               <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
               CORE INSIGHTS
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              placeholder="Break down the wisdom..."
              className="w-full bg-gray-800/50 border border-cyan-500/30 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all duration-300 placeholder-gray-600 shadow-inner"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2 text-cyan-400 tracking-wider text-xs italic">CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full bg-gray-800/50 border border-cyan-500/30 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none"
              >
                <option value="" disabled hidden>Select Category</option>
                <option>Personal Growth</option>
                <option>Career</option>
                <option>Relationships</option>
                <option>Mindset</option>
                <option>Mistakes Learned</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-2 text-cyan-400 tracking-wider text-xs italic">EMOTIONAL TONE</label>
              <select
                value={emotionalTone}
                onChange={(e) => setEmotionalTone(e.target.value)}
                required
                className="w-full bg-gray-800/50 border border-cyan-500/30 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none"
              >
                <option value="" disabled hidden>Select Tone</option>
                <option>Motivational</option>
                <option>Sad</option>
                <option>Realization</option>
                <option>Gratitude</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2 text-cyan-400 tracking-wider text-xs italic">VISIBILITY</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                required
                className="w-full bg-gray-800/50 border border-cyan-500/30 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none"
              >
                <option value="" disabled hidden>Set Visibility</option>
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-2 text-cyan-400 tracking-wider text-xs italic">ACCESS LEVEL</label>
              <select
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value)}
                disabled={!isPremium}
                className={`w-full border px-4 py-3 rounded-xl focus:ring-2 outline-none transition-all duration-300 ${
                  isPremium
                    ? "bg-gray-800/50 border-fuchsia-500/50 text-fuchsia-400 shadow-[0_0_15px_-5px_#f43f5e] focus:ring-cyan-500"
                    : "bg-gray-700/50 border-gray-600 text-gray-500 cursor-not-allowed"
                }`}
              >
                <option>Free</option>
                <option disabled={!isPremium}>Premium</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-cyan-400 tracking-wider text-xs italic">VISUAL DATA</label>
            <div className="border border-dashed border-fuchsia-500/30 bg-gray-800/30 rounded-xl p-4 hover:border-fuchsia-400/60 transition-all shadow-inner">
              <ImageUploader onUpload={setImageFile} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || showSuccessModal}
            className="group relative w-full py-4 overflow-hidden rounded-xl bg-cyan-600 text-gray-900 font-black uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] active:scale-95 disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
               COMMIT LESSON TO GRID
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
          </button>
        </form>
      </div>
      
      {/* Styles for Animations */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes reverse-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-progress {
          animation: progress 3s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AddLesson;