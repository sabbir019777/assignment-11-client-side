// src/components/UpdateLessonForm.jsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const UpdateLessonForm = ({ lesson, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: lesson.title || "",
    description: lesson.description || "",
    category: lesson.category || "",
    emotionalTone: lesson.emotionalTone || "",
    privacy: lesson.privacy || "Public",
    accessLevel: lesson.accessLevel || "Free",
    image: lesson.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      return toast.error("Title and Description are required");
    }

    if (formData.accessLevel === "Premium" && !user.isPremium) {
      return toast.error("Upgrade to Premium to set Premium access");
    }

    onUpdate(formData);
  };

  return (
    <div className="relative max-w-3xl mx-auto mt-10">
      {/* Neon Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 blur-xl opacity-30"></div>

      {/* Card */}
      <div className="relative p-8 rounded-3xl bg-[#0A0F24]/90 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.35)]">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-500">
          ✨ Update Lesson
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-cyan-300">
              Lesson Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter lesson title"
              className="w-full p-3 rounded-xl bg-black/40 text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-cyan-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the lesson..."
              rows="4"
              className="w-full p-3 rounded-xl bg-black/40 text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none transition"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-cyan-300">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black/40 text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none transition"
            >
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>
            </select>
          </div>

          {/* Emotional Tone */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-cyan-300">
              Emotional Tone
            </label>
            <select
              name="emotionalTone"
              value={formData.emotionalTone}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black/40 text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none transition"
            >
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>
          </div>

          {/* Privacy */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-cyan-300">
              Privacy
            </label>
            <select
              name="privacy"
              value={formData.privacy}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black/40 text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none transition"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Access Level */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-cyan-300">
              Access Level
            </label>
            <select
              name="accessLevel"
              value={formData.accessLevel}
              onChange={handleChange}
              disabled={!user.isPremium}
              className="w-full p-3 rounded-xl bg-black/40 text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none transition disabled:opacity-50"
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>

            {!user.isPremium && (
              <p className="mt-1 text-xs text-gray-400">
                🔒 Upgrade to Premium to enable Premium lessons
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-cyan-300">
              Featured Image URL (Optional)
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://image-url.com"
              className="w-full p-3 rounded-xl bg-black/40 text-white border border-cyan-400/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-extrabold text-black bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-500 hover:from-cyan-500 hover:to-fuchsia-600 shadow-[0_0_25px_rgba(217,70,239,0.6)] transition-all"
          >
            🚀 Update Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateLessonForm;
