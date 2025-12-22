// src/components/LessonCard.jsx
import React from "react";
import { FaLock, FaStar, FaHeart, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

const LessonCard = ({
  lesson,
  onSeeDetails,
  onLikeToggle,
  onFavoriteToggle,
  currentUser,
}) => {
  const {
    title,
    description,
    category,
    emotionalTone,
    creator,
    accessLevel,
    isPremium,
    likesCount,
    favoritesCount,
    createdAt,
    image,
  } = lesson;

  const handleLike = () => {
    if (!currentUser) {
      toast.error("Please log in to like this lesson!");
      return;
    }
    onLikeToggle && onLikeToggle(lesson._id);
  };

  const handleFavorite = () => {
    if (!currentUser) {
      toast.error("Please log in to favorite this lesson!");
      return;
    }
    onFavoriteToggle && onFavoriteToggle(lesson._id);
  };

  return (
    <div
      className="relative bg-[#0A0F1F] text-white rounded-3xl shadow-[0_0_20px_#40E0D022]
        overflow-hidden hover:scale-[1.03] transition-transform duration-500 w-full max-w-sm
        border border-cyan-400/20 hover:shadow-[0_0_25px_#40E0D055]"
    >
      {/* Premium Overlay */}
      {isPremium && accessLevel === "Premium" && (!currentUser || !currentUser.isPremium) && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center 
          bg-black/70 backdrop-blur-sm p-4 rounded-3xl">
          <FaLock size={36} className="mb-2 text-yellow-400 drop-shadow-[0_0_8px_#FFD700]" />
          <p className="font-bold text-lg text-white drop-shadow-lg">Premium Lesson</p>
          <p className="text-sm text-gray-300">Upgrades to view</p>
        </div>
      )}

      {/* Lesson Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-44 object-cover rounded-t-3xl opacity-80 hover:opacity-100 transition-opacity duration-500"
        />
      )}

      <div className="p-5 relative z-10">
        {/* Category & Emotional Tone */}
        <div className="flex justify-between items-center mb-3">
          <span className="bg-cyan-400/20 text-cyan-300 text-xs px-2 py-1 rounded-full font-semibold">
            {category}
          </span>
          <span className="bg-pink-400/20 text-pink-300 text-xs px-2 py-1 rounded-full font-semibold">
            {emotionalTone}
          </span>
        </div>

        {/* Lesson Title */}
        <h3 className="text-xl font-extrabold mb-2 line-clamp-2 text-[#40E0D0] drop-shadow-[0_0_6px_#40E0D0]">
          {title}
        </h3>

        {/* Short Description */}
        <p className="text-gray-300 text-sm line-clamp-3 mb-4">{description}</p>

        {/* Creator Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {creator?.photoURL && (
              <img
                src={creator.photoURL}
                alt={creator.name}
                className="w-9 h-9 rounded-full border-2 border-cyan-400 shadow-[0_0_10px_#40E0D033]"
              />
            )}
            <span className="text-sm font-medium text-gray-200">{creator?.name}</span>
          </div>
          <span className="text-xs text-gray-400">{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        {/* Interaction Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 bg-[#111B3C]/70 text-[#FF00FF] px-3 py-1 rounded-xl font-semibold 
                hover:bg-[#FF00FF]/20 hover:text-white transition-colors shadow-[0_0_10px_#FF00FF33]"
            >
              <FaHeart /> {likesCount || 0}
            </button>

            <button
              onClick={handleFavorite}
              className="flex items-center gap-1 bg-[#111B3C]/70 text-[#40E0D0] px-3 py-1 rounded-xl font-semibold
                hover:bg-[#40E0D0]/20 hover:text-white transition-colors shadow-[0_0_10px_#40E0D033]"
            >
              <FaStar /> {favoritesCount || 0}
            </button>
          </div>

          <button
            onClick={() => onSeeDetails && onSeeDetails(lesson._id)}
            className="flex items-center gap-2 text-white bg-black/30 px-3 py-1 rounded-xl font-medium
              hover:bg-black/50 transition-colors shadow-[0_0_10px_#FFFFFF22]"
          >
            <FaEye /> See Details
          </button>
        </div>
      </div>

      {/* Neon Glow Accent */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none 
        rounded-3xl border border-cyan-400/10 animate-pulse opacity-20" />
    </div>
  );
};

export default LessonCard;
