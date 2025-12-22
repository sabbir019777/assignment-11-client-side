// src/utils/api.js
import axios from "axios";
import { auth } from "../Firebase/Firebase.config";

// --------------------
// Base URL
// --------------------
const BASE_URL = (
  import.meta.env.VITE_APP_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

// --------------------
// Axios instance
// --------------------
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// --------------------
// JWT Interceptor
// --------------------
axiosInstance.interceptors.request.use(
  async (config) => {
    const current = auth?.currentUser;
    if (current) {
      const token = await current.getIdToken(); 
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      const localToken = localStorage.getItem("token");
      if (localToken) config.headers.Authorization = `Bearer ${localToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// --------------------
// Error Handler
// --------------------
const handleError = (error, apiName) => {
  try {
    if (error?.response) {
      console.error(
        `${apiName} API error:`,
        error.response.data ?? error.response
      );
    } else if (error?.request) {
      console.error(
        `${apiName} API error: No response from server`,
        error.request
      );
    } else {
      console.error(`${apiName} API error:`, error?.message ?? error);
    }
  } catch (e) {
    console.error(`${apiName} API error (logging failed):`, String(e));
  }
};

// --------------------
// USER API
// --------------------
export const registerOrSyncUser = async (userData) => {
  try {
    const res = await axiosInstance.post("/users", userData);
    return res.data || {};
  } catch (error) {
    handleError(error, "registerOrSyncUser");
    throw error;
  }
};
export const getUserStatus = async (email) => {
  if (!email) return null; 
  try {
  
    const res = await axiosInstance.get(`/users/status?email=${email}`);
    return res.data || {};
  } catch (error) {
    handleError(error, "getUserStatus");
    return null;
  }
};

export const getTopContributors = async () => {
  try {
    const res = await axiosInstance.get("/users/top-contributors");
    return res.data || [];
  } catch (error) {
    handleError(error, "getTopContributors");
    return [];
  }
};

// --------------------
// LESSONS API
// --------------------
export const fetchPublicLessons = async () => {
  try {
    const res = await axiosInstance.get("/lessons/public");
    return res.data || [];
  } catch (error) {
    handleError(error, "fetchPublicLessons");
    throw error;
  }
};

export const getLessonById = async (lessonId) => {
  if (!lessonId) {
    console.error("getLessonById API error: lessonId is required");
    return null;
  }
  try {
    const [lessonRes, commentsRes] = await Promise.all([
      axiosInstance.get(`/lessons/${lessonId}`),
      axiosInstance.get(`/comments/${lessonId}`).catch(() => ({ data: [] })),
    ]);

    return { ...(lessonRes.data || {}), comments: commentsRes.data || [] };
  } catch (error) {
    handleError(error, "getLessonById");
    throw error;
  }
};

export const createLesson = async (lessonData) => {
  try {
    const res = await axiosInstance.post("/lessons", lessonData);
    return res.data || {};
  } catch (error) {
    handleError(error, "createLesson");
    throw error;
  }
};

export const updateLesson = async (lessonId, lessonData) => {
  try {
    const res = await axiosInstance.patch(`/lessons/${lessonId}`, lessonData);
    return res.data || {};
  } catch (error) {
    handleError(error, "updateLesson");
    throw error;
  }
};

export const deleteLesson = async (lessonId) => {
  try {
    const res = await axiosInstance.delete(`/lessons/${lessonId}`);
    return res.data || {};
  } catch (error) {
    handleError(error, "deleteLesson");
    throw error;
  }
};

export const getFeaturedLessons = async () => {
  try {
    const res = await axiosInstance.get("/lessons/featured");
    return res.data || [];
  } catch (error) {
    handleError(error, "getFeaturedLessons");
    return [];
  }
};

export const getMostSavedLessons = async () => {
  try {
    const res = await axiosInstance.get("/lessons/most-saved");
    return res.data || [];
  } catch (error) {
    handleError(error, "getMostSavedLessons");
    return [];
  }
};

// --------------------
// SIMILAR LESSONS
// --------------------
export const getSimilarLessons = async (lessonId, category) => {
  if (!lessonId) return [];

  const params = {};
  if (category && typeof category === "string" && category.trim() !== "") {
    params.category = category.trim();
  }

  try {
    const res = await axiosInstance.get(`/lessons/${lessonId}/similar`, {
      params,
    });
    return res.data || [];
  } catch (error) {
    handleError(error, "getSimilarLessons");
    return [];
  }
};

// --------------------
// COMMENTS API
// --------------------
export const getComments = async (lessonId) => {
  if (!lessonId) return [];
  try {
    const res = await axiosInstance.get(`/comments/${lessonId}`);
    return res.data || [];
  } catch (error) {
    handleError(error, "getComments");
    return [];
  }
};

export const addComment = async (lessonId, commentData) => {
  if (!lessonId) throw new Error("addComment API error: lessonId is required");
  try {
    const res = await axiosInstance.post("/comments", {
      lessonId,
      ...commentData,
    });
    return res.data || {};
  } catch (error) {
    handleError(error, "addComment");
    throw error;
  }
};

// --------------------
// FAVOURITES API (FIXED: removed /api)
// --------------------
export const toggleFavorite = async (lessonId, userId) => {
  if (!lessonId) throw new Error("lessonId is required");
  try {
    const res = await axiosInstance.patch(`/lessons/${lessonId}/toggle-favorite`, { 
      userId 
    });
    return res.data || {};
  } catch (error) {
    handleError(error, "toggleFavorite");
    throw error;
  }
};

export const getMyFavourites = async (userId) => {
  if (!userId) return [];
  try {
    const res = await axiosInstance.get(`/lessons/favorites/${userId}`);
    return res.data || [];
  } catch (error) {
    handleError(error, "getMyFavourites");
    return [];
  }
};

// --------------------
// LIKES API
// --------------------
export const toggleLike = async (lessonId) => {
  if (!lessonId) throw new Error("toggleLike API error: lessonId is required");
  try {
    const res = await axiosInstance.post(`/lessons/${lessonId}/like`);
    return res.data || {};
  } catch (error) {
    handleError(error, "toggleLike");
    throw error;
  }
};

// --------------------
// REPORT LESSON
// --------------------
export const reportLesson = async (lessonId, reportData) => {
  if (!lessonId) throw new Error("reportLesson API error: lessonId is required");
  try {
    const res = await axiosInstance.post(
      `/lessons/${lessonId}/report`,
      reportData
    );
    return res.data || {};
  } catch (error) {
    handleError(error, "reportLesson");
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  if (!commentId) throw new Error("deleteComment API error: commentId is required");
  try {
    const res = await axiosInstance.delete(`/comments/${commentId}`);
    return res.data || {};
  } catch (error) {
    handleError(error, "deleteComment");
    throw error;
  }
};

// --------------------
// IMAGE UPLOAD (Slightly improved for reliability)
// --------------------
export const uploadImage = async (formData) => {
  try {
    const res = await axiosInstance.post("/upload/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data || {};
  } catch (error) {
    handleError(error, "uploadImage");
    throw error;
  }
};

// --------------------------------------------------------
// ADMIN DASHBOARD API (Fixed routes to match your server.js)
// --------------------------------------------------------


export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get("/users/all"); 
    return res.data || [];
  } catch (error) {
    handleError(error, "getAllUsers");
    throw error;
  }
};


export const updateUserRole = async (userId, newRole) => {
  try {
    const res = await axiosInstance.put(`/users/${userId}/role`, { role: newRole });
    return res.data || {};
  } catch (error) {
    handleError(error, "updateUserRole");
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await axiosInstance.delete(`/users/${userId}`);
    return res.data || {};
  } catch (error) {
    handleError(error, "deleteUser");
    throw error;
  }
};

export const toggleFeatured = async (lessonId, isFeatured) => {
  try {
    const res = await axiosInstance.patch(`/admin/lessons/featured/${lessonId}`, { isFeatured });
    return res.data || {};
  } catch (error) {
    handleError(error, "toggleFeatured");
    throw error;
  }
};


export const getReportedLessons = async () => {
  try {
    const res = await axiosInstance.get("/admin/lessons?status=reported"); 
    return res.data || [];
  } catch (error) {
    handleError(error, "getReportedLessons");
    return [];
  }
};

export const resolveReport = async (lessonId) => {
  try {
    const res = await axiosInstance.patch(`/admin/lessons/resolve-report/${lessonId}`);
    return res.data || {};
  } catch (error) {
    handleError(error, "resolveReport");
    throw error;
  }
};




export const getAdminLessons = async () => {
  try {
    const res = await axiosInstance.get("/admin/lessons"); 
    return res.data || [];
  } catch (error) {
    handleError(error, "getAdminLessons");
    return [];
  }
};



// --------------------------------------------------------
// ADMIN DASHBOARD STATS 
// --------------------------------------------------------

export const getAdminStats = async () => {
  try {
 
    const [users, lessons, reports, today] = await Promise.all([
      axiosInstance.get("/admin/total-users"),
      axiosInstance.get("/admin/total-lessons"),
      axiosInstance.get("/admin/reported-lessons-count"),
      axiosInstance.get("/admin/todays-lessons")
    ]);
    
    return {
      totalUsers: users.data?.total || 0,
      totalLessons: lessons.data?.total || 0,
      totalReported: reports.data?.total || 0,
      todaysLessons: today.data?.total || 0,
      last7DaysUsers: users.data?.last7Days || [],
      last7DaysLessons: lessons.data?.last7Days || []
    };
  } catch (error) {
    handleError(error, "getAdminStats");
    return null;
  }
};



export const adminDeleteLesson = async (lessonId) => {
  try {
    const res = await axiosInstance.delete(`/admin/lessons/${lessonId}`);
    return res.data || {};
  } catch (error) {
    handleError(error, "adminDeleteLesson");
    throw error;
  }
};


export { axiosInstance };