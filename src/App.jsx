import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

/* Components & Pages */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminSidebar from "./components/AdminSidebar";

import ManagerSidebar from "./components/ManagerSidebar"; 
import UserLayout from "./layouts/layouts"; 
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
import About from "./pages/About";
import Contact from "./pages/Contact"; 
import Blog from "./pages/Blog";
import Support from "./pages/Support";
import AdminLayout from "./components/AdminLayout"; 
import AdminHouse from "./Dashboard/AdminHouse"; 
import AdminUsers from "./pages/AdminUsers"; 
import AdminProfile from "./pages/AdminProfile";
import ReportedLessonsPage from "./pages/ReportedLessonsPage";
import ManageLessons from "./pages/ManageLessons"; 
import ManagerHome from "./pages/ManagerHome";

// --- NEW IMPORTS for Manager Pages ---
import TeamManagement from "./pages/TeamManagement";
import ManagerReports from "./pages/ManagerReports";

function AppRoutes() {
  const { user, loading, logout } = useAuth();

  if (loading) return <LoadingPage message="Authenticating user..." />;

  const masterAdminEmail = "admins@gmail.com";

  const isAdmin = user && (user.role === "admin" || user.email === masterAdminEmail);

  return (
    <HashRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar user={user} logout={logout} />

   
      {isAdmin && <AdminSidebar />}

     
      <div className={isAdmin ? "md:ml-16 transition-all duration-300" : ""}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/public-lessons" element={<PublicLessons user={user} />} />
          <Route path="/lessons/:id" element={<LessonDetails user={user} />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/blog" element={<Blog />} /> 
          <Route path="/support" element={<Support />} /> 


          <Route path="/dashboard" element={<PrivateRoute user={user}><UserLayout /></PrivateRoute>}>
            <Route index element={<DashboardHome />} /> 
            <Route path="dashboardhome" element={<DashboardHome />} />
            

            <Route path="manager" element={<ManagerHome />} />
            <Route path="manager/team" element={<TeamManagement />} />     
            <Route path="manager/reports" element={<ManagerReports />} /> 
            
            <Route path="add-lesson" element={<AddLesson />} />
            <Route path="my-lessons" element={<MyLessons user={user} />} />
            <Route path="profile" element={<Profile user={user} />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="favourites" element={<div className="min-h-screen bg-[#02040A]"><FavoriteLessonRow user={user} /></div>} />
            <Route path="update-lesson/:id" element={<UpdateLesson />} />
          </Route>

          <Route path="/pricing" element={<PrivateRoute user={user}><Pricing /></PrivateRoute>} />

          {/* Admin Routes [cite: 2025-12-24] */}
          <Route path="/dashboard/admin" element={<AdminLayout />}>
              <Route index element={<AdminHouse />} /> 
              <Route path="users" element={<AdminUsers />} /> 
              <Route path="lessons" element={<ManageLessons />} /> 
              <Route path="reports" element={<ReportedLessonsPage />} /> 
              <Route path="profile" element={<AdminProfile />} /> 
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
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