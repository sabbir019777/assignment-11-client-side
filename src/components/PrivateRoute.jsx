// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
        <LoadingSpinner
          fullScreen={true}
          label="Authenticating..."
          className="text-[#40E0D0] drop-shadow-[0_0_20px_#40E0D0] animate-pulse"
        />
      </div>
    );
  }


  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }


  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard/dashboardhome" replace />;
  }

  return children;
};

export default PrivateRoute;