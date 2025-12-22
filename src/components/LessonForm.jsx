// src/components/LessonForm.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const LessonForm = ({ initialData = {}, onSubmit, isPremiumUser = false }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [emotionalTone, setEmotionalTone] = useState(initialData.emotionalTone || "");
  const [accessLevel, setAccessLevel] = useState(initialData.accessLevel || "free");
  const [visibility, setVisibility] = useState(initialData.visibility || "public");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // pre-fill form if initialData changes
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setCategory(initialData.category || "");
      setEmotionalTone(initialData.emotionalTone || "");
      setAccessLevel(initialData.accessLevel || "free");
      setVisibility(initialData.visibility || "public");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !emotionalTone) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        title,
        description,
        category,
        emotionalTone,
        accessLevel: isPremiumUser ? accessLevel : "free",
        visibility,
        image
      });

      toast.success(`Lesson ${initialData.title ? "updated" : "added"} successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
        {initialData.title ? "Update Lesson" : "Add New Lesson"}
      </h2>

      {/* Title */}
      <input
        type="text"
        placeholder="Lesson Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        required
      />

      {/* Description */}
      <textarea
        placeholder="Lesson Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        required
      />

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        required
      >
        <option value="">Select Category</option>
        <option value="Personal Growth">Personal Growth</option>
        <option value="Career">Career</option>
        <option value="Relationships">Relationships</option>
        <option value="Mindset">Mindset</option>
        <option value="Mistakes Learned">Mistakes Learned</option>
      </select>

      {/* Emotional Tone */}
      <select
        value={emotionalTone}
        onChange={(e) => setEmotionalTone(e.target.value)}
        className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        required
      >
        <option value="">Select Emotional Tone</option>
        <option value="Motivational">Motivational</option>
        <option value="Sad">Sad</option>
        <option value="Realization">Realization</option>
        <option value="Gratitude">Gratitude</option>
      </select>

      {/* Access Level */}
      <select
        value={accessLevel}
        onChange={(e) => setAccessLevel(e.target.value)}
        className={`w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
          !isPremiumUser ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!isPremiumUser}
      >
        <option value="free">Free</option>
        <option value="premium">Premium</option>
      </select>
      {!isPremiumUser && (
        <p className="text-xs text-gray-500">Upgrade to Premium to create premium lessons</p>
      )}

      {/* Visibility */}
      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
        className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        required
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white rounded-2xl font-bold shadow-xl hover:scale-105 transform transition-all"
      >
        {loading ? "Saving..." : initialData.title ? "Update Lesson" : "Add Lesson"}
      </button>
    </form>
  );
};

export default LessonForm;
