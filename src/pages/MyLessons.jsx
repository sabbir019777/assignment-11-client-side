// src/pages/MyLessons.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/api";

const MyLessons = () => {
  const { user, isPremium } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      if (!user?.uid) {
        setLessons([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axiosInstance.get(`/lessons/my-lessons/${user.uid}`);
        
        
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const lessonsData = Array.isArray(res.data)
          ? res.data
          : res.data?.lessons || [];

       
        const activeLessons = lessonsData.filter(lesson => !lesson.isDeletedByUser);

        const lessonsWithImage = activeLessons.map((lesson) => {
          let imageUrl = null;
          if (lesson.image) {
            if (lesson.image.startsWith("http")) {
              imageUrl = lesson.image;
            } else if (lesson.image.trim()) {
              imageUrl = `${import.meta.env.VITE_APP_API_URL}/${lesson.image}`;
            }
          }
          return { ...lesson, image: imageUrl };
        });

        setLessons(lessonsWithImage);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your lessons");
        setLessons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [user]);

  
  const handleDelete = async (lessonId) => {
    if (!window.confirm("Remove this lesson from your list? It will stay in Public Grid.")) return;
    try {
      
      await axiosInstance.patch(`/lessons/delete-my-lesson/${lessonId}`);
      
      
      setLessons(lessons.filter((lesson) => lesson._id !== lessonId));
      toast.success("Lesson archived from your profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove lesson");
    }
  };

  const toggleVisibility = async (lesson) => {
    const newVisibility = lesson.visibility === "Public" ? "Private" : "Public";
    try {
      await axiosInstance.patch(`/lessons/${lesson._id}`, { visibility: newVisibility });
      setLessons(lessons.map((l) => l._id === lesson._id ? { ...l, visibility: newVisibility } : l));
      toast.success("Visibility updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update visibility");
    }
  };

  const toggleAccessLevel = async (lesson) => {
    if (!isPremium) {
      toast.error("Upgrade to Premium to change access level");
      navigate("/pricing");
      return;
    }
    const newAccess = lesson.accessLevel === "Free" ? "Premium" : "Free";
    try {
      await axiosInstance.patch(`/lessons/${lesson._id}`, { accessLevel: newAccess });
      setLessons(lessons.map((l) => l._id === lesson._id ? { ...l, accessLevel: newAccess } : l));
      toast.success("Access level updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update access level");
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[180px] bottom-0 right-0 animate-pulse delay-700"></div>

        <div className="relative flex flex-col items-center">
          <div className="relative w-24 h-24 mb-10">
            <div className="absolute inset-0 border-4 border-cyan-500/10 rounded-full"></div>
            <div className="absolute inset-0 border-t-4 border-cyan-400 rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-r-4 border-fuchsia-500 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-mono tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 animate-pulse">
            LOADING_MyLesson.....
          </h2>
          <div className="w-48 h-1 bg-gray-800 mt-4 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 animate-progress-load"></div>
          </div>
        </div>

        <style jsx>{`
          @keyframes progress-load { 0% { width: 0%; } 100% { width: 100%; } }
          .animate-progress-load { animation: progress-load 3s ease-in-out infinite; }
          .animate-spin-slow { animation: spin 3s linear infinite; }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 font-mono">
        <h2 className="text-2xl text-red-500 font-bold tracking-widest uppercase">
          [Error] Unauthorized Access: Please Login
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* --- টাইটেল এবং কার্ড সেকশন আপনার অরিজিনাল কোড অনুযায়ী --- */}
      <div className="relative mb-16 mt-4 text-center">
        <div className="absolute inset-0 -top-4 flex justify-center opacity-10 pointer-events-none">
          <span className="text-7xl md:text-9xl font-black text-cyan-500 tracking-tighter">ARCHIVE</span>
        </div>
        <h2 className="relative text-4xl md:text-7xl font-black uppercase italic tracking-tighter drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-300 to-cyan-600">
            My Lessons
          </span>
        </h2>
        <div className="flex justify-center items-center gap-4 mt-2">
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-cyan-500"></div>
          <span className="text-[10px] md:text-xs font-mono tracking-[0.5em] text-fuchsia-500 uppercase font-bold animate-pulse">
            Neural Storage System
          </span>
          <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-cyan-500"></div>
        </div>
      </div>

      {lessons.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-3xl font-extrabold text-white mb-3 animate-pulse">
            No lessons found
          </h2>
          <p className="text-gray-400 text-lg">
            Create your first lesson to see it here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="relative bg-gradient-to-br from-black/30 via-purple-900/30 to-cyan-900/30 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_0_60px_rgba(0,255,255,0.2)] p-5 flex flex-col hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400/50 pointer-events-none animate-pulse-slow"></div>

              <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-5 shadow-xl">
                {lesson.image ? (
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white font-semibold text-lg rounded-2xl">📸 No Image</div>
                )}
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2">{lesson.title}</h3>
              <p className="text-gray-300 mb-1">
                Category: <span className="text-cyan-400">{lesson.category}</span>
              </p>
              <p className="text-gray-300 mb-4">
                Tone: <span className="text-purple-400">{lesson.emotionalTone}</span>
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => toggleVisibility(lesson)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-700 to-blue-700 text-white text-xs font-bold hover:scale-105 transition-transform shadow-md"
                >
                  {lesson.visibility}
                </button>

                <button
                  onClick={() => toggleAccessLevel(lesson)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-transform hover:scale-105 shadow-md ${
                    lesson.accessLevel === "Premium" ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"
                  }`}
                >
                  {lesson.accessLevel}
                </button>
              </div>

              <p className="text-gray-400 text-[10px] mb-4 font-mono">
                DATA_LOG: {new Date(lesson.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => navigate(`/dashboard/update-lesson/${lesson._id}`)}
                  className="flex-1 bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 text-black py-2 rounded-xl hover:scale-105 transition-transform font-bold text-sm"
                >
                  UPDATE
                </button>
                <button
                  onClick={() => handleDelete(lesson._id)}
                  className="flex-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white py-2 rounded-xl hover:scale-105 transition-transform font-bold text-sm"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLessons;