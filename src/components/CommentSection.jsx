
import React, { useState } from "react";
import { FaUserCircle, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-hot-toast";

const CommentSection = ({ comments = [], onAddComment, currentUser }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    if (!currentUser || !currentUser.uid) {
      toast.error("You must be logged in to comment!");
      return;
    }

    // Prepare comment object matching backend

    const commentData = {
      lessonId: currentUser.lessonId, 
      text: newComment,
      userId: currentUser.uid,
      userName: currentUser.name || "Anonymous",
      userPhoto: currentUser.photoURL || "",
    };

    onAddComment(commentData); 
    setNewComment("");
  };

  return (
    <div
      className="relative w-full rounded-3xl p-6 md:p-8
      bg-gradient-to-br from-[#0A0F1F] via-[#111B3C] to-[#05070F]
      border border-cyan-400/20
      shadow-[0_0_50px_#00E5FF33]
      text-white overflow-hidden"
    >
      {/* Neon Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-tr
        from-cyan-400/10 via-transparent to-fuchsia-500/10
        blur-3xl pointer-events-none" />

      {/*TITLE  */}
      <h3 className="relative text-2xl md:text-3xl font-extrabold mb-6
        bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-400
        bg-clip-text text-transparent">
        💬 Community Comments
      </h3>

      {/*COMMENTS LIST */}
      <div className="relative flex flex-col gap-4 max-h-96 overflow-y-auto mb-6 pr-1">
        {comments.length > 0 ? (
          comments.map((comment, idx) => (
            <div
              key={idx}
              className="group relative flex gap-3 items-start
              rounded-2xl p-4
              bg-white/5 backdrop-blur-md
              border border-white/10
              hover:border-cyan-400/30
              hover:shadow-[0_0_25px_#00E5FF55]
              transition-all duration-300"
            >
              {/* Avatar */}
              {comment.userPhoto ? (
                <img
                  src={comment.userPhoto}
                  alt={comment.userName || "User"}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 object-cover"
                />
              ) : (
                <FaUserCircle className="text-3xl md:text-4xl text-cyan-300 flex-shrink-0" />
              )}

              {/* Text */}
              <div className="flex-1">
                <p className="font-semibold text-white">
                  {comment.userName || "Anonymous"}
                </p>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed line-clamp-3">
                  {comment.text}
                </p>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl
                bg-gradient-to-r from-cyan-400/10 via-transparent to-fuchsia-500/10
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))
        ) : (
          <p className="text-slate-400 italic">
            No comments yet. Be the first to comments ✨
          </p>
        )}
      </div>

      {/* ADD COMMENT  */}
      <form onSubmit={handleSubmit} className="relative flex gap-3">
        <input
          type="text"
          placeholder="Write your futuristic thought..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 px-4 py-3 rounded-2xl
          bg-white/5 backdrop-blur-md
          border border-white/10
          text-white placeholder-slate-400
          focus:outline-none focus:border-cyan-400/40
          focus:shadow-[0_0_20px_#00E5FF55]
          transition-all duration-300"
        />

        <button
          type="submit"
          className="relative px-4 py-3 rounded-2xl
          bg-gradient-to-r from-cyan-400 to-indigo-500
          text-black font-bold
          shadow-[0_0_25px_#00E5FF77]
          hover:scale-105 hover:shadow-[0_0_35px_#00E5FFAA]
          transition-all duration-300 flex items-center justify-center"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
