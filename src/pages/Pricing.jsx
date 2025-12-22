import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import paymentAnimation from "../assets/lottie/payment-success.json";
import { axiosInstance, getUserStatus, registerOrSyncUser } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import {
  FaCheckCircle,
  FaCrown,
  FaLock,
  FaRocket,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

const Pricing = () => {
  const { user, refreshUserPlan, setUser } = useAuth();
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error("ACCESS DENIED: Please login first.");
      navigate("/login");
      return;
    }

    const checkPlan = async () => {
      try {
        setLoading(true);
        const timerPromise = new Promise((resolve) => setTimeout(resolve, 2500));

        let status = null;
        const fetchStatus = async () => {
          try {
            status = await getUserStatus(user.email);
          } catch {
            status = null;
          }

          if (!status) {
            try {
              await registerOrSyncUser({
                uid: user.uid,
                email: user.email,
                name: user.displayName || user.email,
                photoURL: user.photoURL || "",
              });
              status = await getUserStatus(user.email);
            } catch {}
          }
        };

        await Promise.all([fetchStatus(), timerPromise]);

        setIsPremium(Boolean(status?.isPremium));
        setIsAdmin(Boolean(status?.role === "admin"));
        setLoading(false);
      } catch {
        toast.error("ERROR: Failed to retrieve subscription data.");
        setLoading(false);
      }
    };

    checkPlan();
  }, [user, navigate]);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to proceed with payment.");
      navigate("/login");
      return;
    }

    if (isPremium || isAdmin) {
      toast("You already have premium access", { icon: "✅" });
      return;
    }

    setProcessing(true);
    try {
      toast.loading("🚀 Processing upgrade...", { id: "payment" });

      const apiPromise = axiosInstance.post("/users/upgrade");
      const timer = new Promise((res) => setTimeout(res, 2500)); 

      const [res] = await Promise.all([apiPromise, timer]);

      if (res?.data?.user) {
        setIsPremium(true);
        setIsAdmin(Boolean(res?.data?.user?.role === "admin"));

        if (setUser) {
          setUser((prev) => ({
            ...(prev || user || {}),
            isPremium: true,
            role: res?.data?.user?.role,
          }));
        }

        if (refreshUserPlan) {
          await refreshUserPlan();
        }

        toast.success("🎉 Upgrade Successful!", { id: "payment", duration: 4000 });
      }
    } catch (err) {
      toast.error("⚠️ Upgrade failed.", { id: "payment" });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#01020C] overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,246,255,0.05)_50%)] bg-[size:100%_4px] animate-scan-move"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="absolute inset-0 border-[1px] border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 border-[3px] border-dashed border-cyan-400/40 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
            <div className="absolute inset-8 border-t-2 border-fuchsia-500 rounded-full animate-[spin_1s_linear_infinite]"></div>
            <div className="relative bg-black/40 p-5 rounded-full backdrop-blur-sm border border-cyan-500/30">
              <FaShieldAlt className="text-4xl text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div className="mt-10 font-mono text-center text-white">
            <p className="text-cyan-500/80 text-xs tracking-[0.4em] uppercase mb-1">Decrypting Access</p>
            <h2 className="text-2xl font-black tracking-widest flex items-center gap-1">
              ACCESSING_UPGRADE <span className="w-2 h-6 bg-fuchsia-500 animate-pulse ml-1"></span>
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto py-16 px-6 relative">
        <div className="relative mb-16 text-center">
          <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500">
            FUTURE PRICING
          </h1>
          <p className="mt-3 text-cyan-400 font-mono uppercase tracking-widest text-sm">Choose your grid level</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          {/* Free Plan */}
          <div className="border border-gray-700/50 rounded-3xl p-10 bg-gray-900/50 backdrop-blur-xl group">
            <h2 className="text-3xl font-bold mb-6 text-gray-400 flex items-center">
              <FaLock className="mr-3 text-xl" /> FREE TIER
            </h2>
            <p className="text-gray-300 mb-8 text-3xl font-mono">
              <span className="font-black text-white text-5xl">0</span> CREDITS
            </p>
            <ul className="space-y-6 text-gray-400 text-lg mb-12">
              <li className="flex items-center"><FaCheckCircle className="text-cyan-500 mr-3" /> Standard Lessons Access</li>
              <li className="flex items-center opacity-50"><FaLock className="text-red-500 mr-3" /> Premium Locked</li>
              <li className="flex items-center"><FaCheckCircle className="text-cyan-500 mr-3" /> Basic Lesson Management</li>
            </ul>
            <div className="w-full px-6 py-4 bg-gray-800/50 text-gray-500 font-bold rounded-2xl text-center border border-gray-700 uppercase tracking-widest">
              CURRENT VERSION
            </div>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-yellow-400/50 rounded-3xl p-10 bg-gray-800/50 backdrop-blur-xl relative overflow-hidden shadow-[0_0_60px_rgba(250,204,21,0.15)]">
            <div className="absolute top-0 right-0 bg-yellow-400 text-black px-6 py-1 font-black text-[10px] tracking-widest">LIFETIME LICENSE</div>
            <h2 className="text-3xl font-bold mb-6 text-yellow-400 flex items-center">
              <FaCrown className="mr-3" /> PREMIUM TIER
            </h2>

            {/* Price Section */}
            <div className="mb-8 font-mono">
              {isPremium || isAdmin ? (
                <div className="flex flex-col">
                   <span className="text-xs text-cyan-400 uppercase font-bold tracking-widest mb-1">Current Status: Active</span>
                   <span className="font-black text-yellow-400 text-4xl uppercase">Lifetime Access</span>
                </div>
              ) : (
                <p className="text-gray-200 text-2xl">
                  EST: <span className="font-black text-yellow-400 text-4xl">৳1500</span> <span className="text-xs text-gray-500 uppercase font-bold">One-Time</span>
                </p>
              )}
            </div>

            <ul className="space-y-5 text-gray-200 text-lg mb-12">
              {["All Free Features", "Full Lesson Access", "Priority Listing", "Ad-Free Experience", "Advanced Analytics"].map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <FaCheckCircle className="text-yellow-400 mr-3 shadow-[0_0_10px_#EAB308]" /> {item}
                </li>
              ))}
            </ul>

            {/* Conditional Button */}
            {!isPremium && !isAdmin ? (
              processing ? (
                <button disabled className="w-full px-6 py-4 bg-gray-700 text-gray-400 font-black rounded-2xl flex items-center justify-center gap-3">
                   <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div> PROCESSING...
                </button>
              ) : (
                <button onClick={handleCheckout} className="w-full px-6 py-4 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] text-black font-black rounded-2xl shadow-xl hover:scale-[1.02] transition-all uppercase tracking-widest">
                  <FaRocket className="inline mr-2" /> UPGRADE TO PREMIUM
                </button>
              )
            ) : (
              <button 
                onClick={() => navigate("/dashboard/dashboardhome")}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-black rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-[1.02] transition-all uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <FaCheckCircle className="text-xl" /> ALREADY PREMIUM — DASHBOARD
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes scan-move { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        .animate-scan-move { animation: scan-move 4s linear infinite; }
      `}</style>
    </div>
  );
};

export default Pricing;