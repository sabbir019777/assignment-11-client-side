// src/components/ReactionButtons.jsx
import React, { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaShareAlt,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const ReactionButtons = ({ lesson, currentUser, onToggleLike, onToggleSave }) => {
  const [isLiked, setIsLiked] = useState(
    lesson.likes?.includes(currentUser?._id) || false
  );
  const [isSaved, setIsSaved] = useState(
    lesson.savedBy?.includes(currentUser?._id) || false
  );

  const navigate = useNavigate();
  const shareUrl = window.location.href;

  const handleLike = () => {
    if (!currentUser) {
      toast.error("Please log in to like this lesson");
      navigate("/login");
      return;
    }
    setIsLiked(!isLiked);
    onToggleLike(lesson._id);
  };

  const handleSave = () => {
    if (!currentUser) {
      toast.error("Please log in to save this lesson");
      navigate("/login");
      return;
    }
    setIsSaved(!isSaved);
    onToggleSave(lesson._id);
  };

  const likeCount =
    lesson.likes?.length +
    (isLiked && !lesson.likes?.includes(currentUser?._id) ? 1 : 0);

  const saveCount =
    lesson.savedBy?.length +
    (isSaved && !lesson.savedBy?.includes(currentUser?._id) ? 1 : 0);

  return (
    <div className="relative mt-6">
      {/* Neon glow background */}
      <div className="absolute inset-0 rounded-2xl blur-xl opacity-40 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400" />

      <div className="relative flex items-center gap-6 px-6 py-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.35)] text-white">
        
        {/*  Like */}
        <button
          onClick={handleLike}
          className="flex items-center gap-2 group transition-transform hover:scale-110"
        >
          <span className="text-xl group-hover:drop-shadow-[0_0_10px_#ff4d6d]">
            {isLiked ? (
              <FaHeart className="text-red-500 animate-pulse" />
            ) : (
              <FaRegHeart />
            )}
          </span>
          <span className="text-sm font-semibold">{likeCount}</span>
        </button>

        {/*  Save */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 group transition-transform hover:scale-110"
        >
          <span className="text-xl group-hover:drop-shadow-[0_0_10px_#facc15]">
            {isSaved ? (
              <FaBookmark className="text-yellow-400 animate-pulse" />
            ) : (
              <FaRegBookmark />
            )}
          </span>
          <span className="text-sm font-semibold">{saveCount}</span>
        </button>

        {/* 🔗 Share */}
        <div className="flex items-center gap-3 ml-auto">
          <FaShareAlt className="text-lg text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]" />

          <FacebookShareButton url={shareUrl}>
            <span className="text-xs px-2 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-400/30 transition">
              FB
            </span>
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl}>
            <span className="text-xs px-2 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/40 border border-sky-400/30 transition">
              TW
            </span>
          </TwitterShareButton>

          <LinkedinShareButton url={shareUrl}>
            <span className="text-xs px-2 py-1 rounded-lg bg-blue-700/20 hover:bg-blue-700/40 border border-blue-500/30 transition">
              LN
            </span>
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
};

export default ReactionButtons;
