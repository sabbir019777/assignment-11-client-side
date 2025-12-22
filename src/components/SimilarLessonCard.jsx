// src/components/SimilarLessonCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const SimilarLessonCard = ({ lesson }) => {
 
  if (!lesson || !lesson._id) return null;

  return (
    <Link
      to={`/lessons/${lesson._id}`}
      className="group relative block w-full transition-transform duration-500 hover:-translate-y-2"
    >
      {/* Neon Border Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 blur-xl opacity-40 group-hover:opacity-80 transition duration-500"></div>

      {/* Card Body */}
      <div
        className="
          relative h-full
          rounded-3xl overflow-hidden
          bg-[#0B0F1A]
          border border-white/10
          backdrop-blur-xl
          shadow-[0_0_25px_rgba(56,189,248,0.25)]
          transition-all duration-500
          group-hover:shadow-[0_0_45px_rgba(217,70,239,0.55)]
        "
      >
        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden bg-slate-800">
          {lesson.image ? (
            <img
              src={lesson.image}
              alt={lesson.title}
              className="
                w-full h-full object-cover
                scale-100 group-hover:scale-110
                transition-transform duration-700
              "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500 text-xs tracking-widest uppercase">No Intel</span>
            </div>
          )}
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col gap-3">
          {/* Title */}
          <h3
            className="
              text-lg font-bold
              text-transparent bg-clip-text
              bg-gradient-to-r from-cyan-400 to-fuchsia-400
              line-clamp-2 min-h-[3.5rem]
            "
          >
            {lesson.title || "Untitled Lesson"}
          </h3>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 uppercase">
              {lesson.category || "General"}
            </span>
            <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-400/20 uppercase">
              {lesson.emotionalTone || "Neutral"}
            </span>
          </div>

          {/* Footer Metadata */}
          <div className="mt-2 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-mono">
            <span className="tracking-tighter uppercase">
              Access: <span className={lesson.accessLevel === 'premium' ? 'text-yellow-500' : 'text-emerald-500'}>
                {lesson.accessLevel || "Free"}
              </span>
            </span>
            <span className="uppercase">{lesson.privacy || "Public"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SimilarLessonCard;