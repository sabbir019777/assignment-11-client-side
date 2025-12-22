import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import successAnimation from "../assets/lottie/success.json";
import { useAuth } from "../contexts/AuthContext";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user, refreshUserPlan } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const updatePremiumStatus = async () => {
      try {
        await refreshUserPlan();
        toast.success("Payment successful! Your account is now Premium ⭐");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    updatePremiumStatus();
  }, [user, navigate, refreshUserPlan]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#0A102D]">
        <div className="text-center">
          <p className="text-lg font-semibold mb-4 text-cyan-400 glow-cyan">
            Processing Payment...
          </p>
          <div className="loader border-t-4 border-b-4 border-pink-500 w-12 h-12 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0A102D] to-[#151B42] px-4">
      <div className="max-w-md w-full bg-[#0F1333]/80 backdrop-blur-md shadow-neon rounded-2xl p-6 text-center border border-cyan-400/20">
        <Lottie
          animationData={successAnimation}
          loop={false}
          className="w-40 h-40 mx-auto"
        />
        <h1 className="text-3xl font-bold mt-4 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 glow-text">
          Payment Successful!
        </h1>
        <p className="text-cyan-200 mb-6">
          Thank you for upgrading to{" "}
          <span className="font-semibold">Premium ⭐</span>. You now have full
          access to all Premium Life Lessons.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/dashboard/dashboardhome")}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-cyan-500 hover:to-pink-600 text-black rounded-xl font-bold shadow-glow transition transform hover:scale-105"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#1A1F3D]/80 hover:bg-[#1A1F3D]/60 text-cyan-400 rounded-xl font-semibold shadow-inner transition transform hover:scale-105"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
