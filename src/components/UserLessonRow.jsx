// src/components/UserLessonRow.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import PremiumBadge from "../components/PremiumBadge";

const UserLessonRow = ({ lesson, onDelete }) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      setDeleting(true);
      await onDelete(lesson._id);
      toast.success("Lesson deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete lesson");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative mb-5">
      {/* Neon Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 blur-lg opacity-30"></div>

      {/* Card */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A0F24]/90 backdrop-blur-xl border border-white/10 shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_40px_rgba(217,70,239,0.45)] transition-all">
        
        {/* Lesson Info */}
        <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-3">
          <h2
            onClick={() => navigate(`/lesson/${lesson._id}`)}
            className="text-lg font-bold text-white cursor-pointer hover:text-cyan-400 transition"
          >
            {lesson.title}
          </h2>

          {lesson.accessLevel === "Premium" && <PremiumBadge size="sm" />}

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
            {lesson.category}
          </span>

          <span className="text-xs text-gray-400">
            {new Date(lesson.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/update-lesson/${lesson._id}`)}
            className="flex items-center gap-1 px-4 py-2 rounded-xl font-semibold
                       bg-gradient-to-r from-blue-500 to-indigo-600
                       hover:from-blue-600 hover:to-indigo-700
                       shadow-md transition-all"
          >
            <FaEdit /> Edit
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1 px-4 py-2 rounded-xl font-semibold
                       bg-gradient-to-r from-red-500 to-pink-600
                       hover:from-red-600 hover:to-pink-700
                       shadow-md transition-all disabled:opacity-50"
          >
            <FaTrash /> {deleting ? "Deleting..." : "Delete"}
          </button>

          <button
            onClick={() => navigate(`/lesson/${lesson._id}`)}
            className="flex items-center gap-1 px-4 py-2 rounded-xl font-semibold
                       bg-gradient-to-r from-green-500 to-emerald-600
                       hover:from-green-600 hover:to-emerald-700
                       shadow-md transition-all"
          >
            <FaEye /> View
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLessonRow;
