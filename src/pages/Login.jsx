import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaSpinner, FaUserShield } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import AuthCard from "../components/AuthCard";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const masterAdminEmail = "admins@gmail.com";

  // --- 1. Normal User Login Logic ---

  const handleUserLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      await login(email, password);
      
      const isAdmin = email.toLowerCase() === masterAdminEmail.toLowerCase();

      Swal.fire({
        title: "Success!",
        text: "User Logged in successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        if (isAdmin) {
          navigate("/dashboard/admin", { replace: true });
        } else {
          navigate(from === "/" ? "/dashboard/dashboardhome" : from, { replace: true });
        }
      });
    } catch (err) {
      toast.error(err.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. Google Login Logic ---

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await signInWithGoogle(); 
      navigate(from === "/" ? "/dashboard/dashboardhome" : from, { replace: true });
      toast.success("Google Login Successful");
    } catch (err) {
      toast.error("Google login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. SPECIAL ADMIN LOGIN LOGIC (Right Side Panel) ---
  const handleAdminDirectLogin = async (e) => {
    e.preventDefault();
    if (adminLoading) return;
    setAdminLoading(true);

    try {
     
      await login(adminEmail, adminPass);

      if (adminEmail.toLowerCase() !== masterAdminEmail.toLowerCase()) {
        throw new Error("This is not the Master Admin Email!");
      }

      
      Swal.fire({
        title: "Admin Access Granted",
        text: "Redirecting to Command Center...",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/dashboard/admin", { replace: true });
      });

    } catch (err) {
      toast.error("Admin Access Denied! Check Credentials.");
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 md:p-10">

      {/* -------------------- LEFT SIDE: USER LOGIN -------------------- */}
      <AuthCard title="Secure Login" className="bg-[#1e1b2c] shadow-[0_0_40px_#00ffff55] border border-cyan-500/40 w-full max-w-md">
        <form onSubmit={handleUserLogin} className="space-y-6">
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
            className={`w-full py-3 font-bold rounded-2xl text-white transition-all duration-300 ${isLoading
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

      {/* -------------------- RIGHT SIDE: ADMIN LOGIN (EXAMINER SPECIAL) -------------------- */}
      <div className="w-full max-w-md bg-gradient-to-br from-red-900/40 to-black border-2 border-red-500/50 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(239,68,68,0.3)] relative overflow-hidden group">

        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-pulse"></div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/50 mb-3 shadow-[0_0_20px_#ef4444]">
            <FaUserShield className="text-3xl text-red-500" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Admin Panel</h2>
          <p className="text-red-400 text-xs font-mono tracking-widest mt-1">RESTRICTED ACCESS ONLY</p>
        </div>

        <form onSubmit={handleAdminDirectLogin} className="space-y-5 relative z-10">
          <div>
            <label className="text-xs text-red-300 font-bold ml-2">ADMIN EMAIL</label>
            <input
              type="email"
              value={adminEmail}
              placeholder="Enter Admin Email"
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full mt-1 p-3 bg-black/50 border border-red-500/30 rounded-xl text-red-100 placeholder-red-900/50 focus:border-red-500 focus:outline-none focus:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            />
          </div>
          <div className="relative">
            <label className="text-xs text-red-300 font-bold ml-2">SECRET KEY</label>
            <input
              type={showAdminPass ? "text" : "password"}
              value={adminPass}
              placeholder="Enter Secret Key"
              onChange={(e) => setAdminPass(e.target.value)}
              className="w-full mt-1 p-3 bg-black/50 border border-red-500/30 rounded-xl text-red-100 placeholder-red-900/50 focus:border-red-500 focus:outline-none focus:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            />
            {/* পরিবর্তন ২: পাসওয়ার্ড শো/হাইড বাটন */}
            <span
              className="absolute right-4 top-[38px] cursor-pointer text-red-500 hover:text-red-300 transition"
              onClick={() => setShowAdminPass(!showAdminPass)}
            >
              {showAdminPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={adminLoading}
            className="w-full py-4 mt-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-black uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all active:scale-95"
          >
            {adminLoading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>

        <p className="mt-6 text-[10px] text-center text-gray-500 font-mono">
          *Credentials require Master Admin Authorization.
        </p>
      </div>

    </div>
  );
};

export default Login;