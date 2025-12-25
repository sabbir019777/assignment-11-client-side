import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

/* Components */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminSidebar from "./components/AdminSidebar"; // ১. সাইডবার ইমপোর্ট নিশ্চিত করুন

/* Pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicLessons from "./pages/PublicLessons";
import AddLesson from "./pages/AddLesson";
import MyLessons from "./pages/MyLessons";
import Pricing from "./pages/Pricing";
import LessonDetails from "./pages/LessonDetails";
import UpdateLesson from "./pages/UpdateLesson";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile"; 
import LoadingPage from "./pages/LoadingPage";
import DashboardHome from "./pages/DashboardHome";
import UpdateProfile from "./components/UpdateProfile";
import FavoriteLessonRow from "./components/FavoriteLessonRow";

/* Admin Pages & Layouts */
import AdminLayout from "./components/AdminLayout"; 
import AdminHouse from "./Dashboard/AdminHouse"; 
import AdminUsers from "./pages/AdminUsers"; 
import AdminProfile from "./pages/AdminProfile";
import ReportedLessonsPage from "./pages/ReportedLessonsPage";
import ManageLessons from "./pages/ManageLessons"; 

function AppRoutes() {
  const { user, loading, logout } = useAuth();

  if (loading) return <LoadingPage message="Authenticating user..." />;

  // অ্যাডমিন চেক লজিক
  const masterAdminEmail = "admins@gmail.com";
  const isAdmin = user && (user.role === "admin" || user.email === masterAdminEmail);

  return (
    <HashRouter>
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* ২. Navbar যেমন ছিল তেমনই থাকবে */}
      <Navbar user={user} logout={logout} />

      {/* ৩. ম্যাজিক এখানে: অ্যাডমিন লগইন থাকলে সাইডবার পারমানেন্টলি দেখা যাবে */}
      {isAdmin && <AdminSidebar />}

      {/* ৪. কন্টেন্ট এরিয়া: অ্যাডমিন হলে মেইন বডি একটু সরে যাবে যাতে সাইডবারের নিচে না পড়ে */}
      <div className={isAdmin ? "md:ml-16 transition-all duration-300" : ""}>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/public-lessons" element={<PublicLessons user={user} />} />
          <Route path="/lessons/:id" element={<LessonDetails user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* --- Private User Routes --- */}
          <Route path="/dashboard/dashboardhome" element={<PrivateRoute user={user}><DashboardHome /></PrivateRoute>} />
          <Route path="/dashboard/add-lesson" element={<PrivateRoute user={user}><AddLesson /></PrivateRoute>} />
          <Route path="/dashboard/my-lessons" element={<PrivateRoute user={user}><MyLessons user={user} /></PrivateRoute>} />
          <Route path="/dashboard/favourites" element={<PrivateRoute user={user}><div className="min-h-screen bg-[#02040A]"><FavoriteLessonRow user={user} /></div></PrivateRoute>} />
          <Route path="/dashboard/update-lesson/:id" element={<PrivateRoute user={user}><UpdateLesson /></PrivateRoute>} />
          <Route path="/dashboard/profile" element={<PrivateRoute user={user}><Profile user={user} /></PrivateRoute>} />
          <Route path="/dashboard/update-profile" element={<PrivateRoute user={user}><UpdateProfile /></PrivateRoute>} />
          <Route path="/pricing" element={<PrivateRoute user={user}><Pricing /></PrivateRoute>} />

          {/* --- Admin Routes --- */}
          <Route path="/dashboard/admin" element={<AdminLayout />}>
              <Route index element={<AdminHouse />} /> 
              <Route path="users" element={<AdminUsers />} /> 
              <Route path="lessons" element={<ManageLessons />} /> 
              <Route path="reports" element={<ReportedLessonsPage />} /> 
              <Route path="profile" element={<AdminProfile />} /> 
          </Route>

          <Route path="/loading" element={<LoadingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* ৫. Footer যেমন ছিল তেমনই থাকবে */}
      <Footer />
    </HashRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;