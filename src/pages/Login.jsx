import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import AuthCard from "../components/AuthCard";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  
  const masterAdminEmail = "your-new-email@gmail.com"; 

  const handleSuccess = (userEmail) => {
    const isAdmin = userEmail?.toLowerCase() === masterAdminEmail.toLowerCase();
    
    Swal.fire({
      title: "Success!",
      text: isAdmin ? "Welcome back, Admin!" : "Logged in successfully!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      if (isAdmin) {
        navigate("/dashboard/admin", { replace: true });
      } else {
        const destination = from === "/" ? "/dashboard/dashboardhome" : from;
        navigate(destination, { replace: true });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      await login(email, password);
      handleSuccess(email); 
    } catch (err) {
      toast.error(err.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      handleSuccess(result?.user?.email);
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error("Google login failed!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <AuthCard title="Secure Login" className="bg-[#1e1b2c] shadow-[0_0_40px_#00ffff55] border border-cyan-500/40">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 text-white bg-[#2b273f] border border-cyan-400/50 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full p-4 text-white bg-[#2b273f] border border-cyan-400/50 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-cyan-400 hover:text-cyan-200 transition"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-bold rounded-2xl text-white transition-all duration-300 ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-600 shadow-lg shadow-cyan-400/50"
            }`}
          >
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                <FaSpinner className="animate-spin" /> Logging in.....
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="my-6 flex items-center text-gray-400">
          <div className="flex-1 h-px bg-gray-600" />
          <span className="px-3 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-3 rounded-2xl bg-[#4285F4] hover:bg-[#357ae8] text-white flex items-center justify-center gap-3 shadow-lg shadow-blue-500/50 transition-all duration-300"
        >
          <FaGoogle /> Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          No account?{" "}
          <Link to="/register" className="text-red-400 font-bold hover:text-cyan-400 transition">
            Register
          </Link>
        </p>
      </AuthCard>
    </div>
  );
};

export default Login;