import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

import { auth, googleProvider } from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";

import { useAuth } from "../contexts/AuthContext";
import AuthCard from "../components/AuthCard";

const Register = () => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name, photoURL });
      const token = await res.user.getIdToken();

      setUser({
        uid: res.user.uid,
        email: res.user.email,
        displayName: name,
        photoURL,
        token,
      });

      localStorage.setItem("token", token);

      Swal.fire({
        title: "Success!",
        text: "Registered successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate(from, { replace: true });
      });
    } catch (err) {
      toast.error(err.message || "Registration failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();

      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        token,
      });

      localStorage.setItem("token", token);

      Swal.fire({
        title: "Success!",
        text: "Google signup successful!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate(from, { replace: true });
      });
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error("Google signup failed!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <AuthCard title="Register" className="bg-[#1e1b2c] shadow-[0_0_40px_#00ffff55] border border-cyan-500/40">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 text-white bg-[#2b273f] border border-cyan-400/50 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
            placeholder="Full Name"
            required
          />

          <input
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full p-4 text-white bg-[#2b273f] border border-cyan-400/50 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
            placeholder="Photo URL"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 text-white bg-[#2b273f] border border-cyan-400/50 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
            placeholder="Email"
            required
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 text-white bg-[#2b273f] border border-cyan-400/50 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
              placeholder="Password"
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
                <FaSpinner className="animate-spin" /> Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="my-6 flex items-center text-gray-400">
          <div className="flex-1 h-px bg-gray-600" />
          <span className="px-3 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        <button
          onClick={handleGoogleRegister}
          disabled={isLoading}
          className="w-full py-3 rounded-2xl bg-[#4285F4] hover:bg-[#357ae8] text-white flex items-center justify-center gap-3 shadow-lg shadow-blue-500/50 transition-all duration-300 hover:bg-amber-600"
        >
          <FaGoogle /> Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 font-bold hover:text-purple-400 transition">
            Login
          </Link>
        </p>
      </AuthCard>
    </div>
  );
};

export default Register;
