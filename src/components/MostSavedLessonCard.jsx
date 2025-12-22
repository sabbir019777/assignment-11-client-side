import React, { useState } from "react";
import { FaStar, FaBookmark, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { toggleFavorite } from "../utils/api";

const MostSavedLessonCard = ({ lesson, user, onSaveLesson }) => {
  const navigate = useNavigate();
  const [savingInProgress, setSavingInProgress] = useState(false);

  const isPremiumLesson = lesson.accessLevel === "premium";
  const isUserPremium = user?.isPremium;
  const isLocked = isPremiumLesson && !isUserPremium;

  const handleSave = async (e) => {
    e.stopPropagation();

  
    if (!user) {
      toast.error("Please log in to save lessons");
      return navigate("/login");
    }

    setSavingInProgress(true);
    try {
      const res = await toggleFavorite(lesson._id);
      if (res?.isFavourited) {
        toast.success("Lesson saved successfully!");
        if (onSaveLesson) {
          onSaveLesson(lesson);
        }
      } else {
        toast.success("Lesson removed from saved");
      }
    } catch (error) {
      toast.error("Failed to save lesson. Please try again.");
      console.error("Save error:", error);
    } finally {
      setSavingInProgress(false);
    }
  };

  return (
    <div
      onClick={() => navigate(`/lessons/${lesson._id}`)}
      className="relative group cursor-pointer overflow-hidden rounded-3xl
      bg-gradient-to-br from-[#05070F] via-[#0B1533] to-[#02030A]
      border border-cyan-400/10
      shadow-[0_0_40px_#00E5FF22]
      hover:shadow-[0_0_70px_#00E5FF55]
      transition-all duration-500"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={lesson.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600"}
          alt={lesson.title}
          className={`w-full h-full object-cover transition-all duration-700
          ${isLocked ? "blur-lg scale-110" : "group-hover:scale-125"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {isLocked && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm
            flex flex-col items-center justify-center gap-4 text-center z-20">
            <FaLock className="text-yellow-400 text-5xl drop-shadow-[0_0_15px_#FFD700]" />
            <p className="text-white text-lg font-bold tracking-wider">PREMIUM CONTENT</p>
            <Link
              to="/pricing"
              onClick={(e) => e.stopPropagation()}
              className="px-6 py-2 rounded-full font-bold
              bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500
              text-black shadow-[0_0_25px_#FFD70088] hover:scale-110 transition"
            >
              Upgrades to Unlock
            </Link>
          </div>
        )}
      </div>

      <div className="relative z-10 p-6 space-y-4">
        <h3 className="text-xl font-extrabold text-white tracking-wide line-clamp-1">
          {lesson.title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
          {lesson.description}
        </p>

        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
            {lesson.category}
          </span>
          <span className={`px-3 py-1 rounded-full border ${
            lesson.accessLevel === "premium"
              ? "bg-yellow-400/10 text-yellow-300 border-yellow-400/30"
              : "bg-green-400/10 text-green-300 border-green-400/30"
          }`}>
            {lesson.accessLevel?.toUpperCase()}
          </span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold">
            <FaStar className="drop-shadow-[0_0_6px_#FFD700]" />
            <span>{lesson.rating || 5}.0</span>
          </div>

          <button
            onClick={handleSave}
            disabled={savingInProgress}
            className="flex items-center gap-2 text-slate-300
            hover:text-cyan-400 transition group/save disabled:opacity-50"
          >
            <FaBookmark className="group-hover/save:scale-110 transition" />
            <span className="text-sm font-semibold">
             
              {lesson.favoritesCount || 0}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MostSavedLessonCard;