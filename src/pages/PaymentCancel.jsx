import React from "react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A102D] to-[#151B42] text-white">

      {/* Navbar */}
      <nav className="bg-[#0F1333]/80 backdrop-blur-md text-white p-4 flex justify-between items-center shadow-neon">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-cyan-400 transition glow-text">
          Digital Life Lessons
        </Link>
        <div className="space-x-2">
          <Link className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-lg hover:from-cyan-500 hover:to-pink-600 shadow-glow transition transform hover:scale-105" to="/login">
            Login
          </Link>
          <Link className="px-4 py-2 bg-gradient-to-r from-green-400 to-lime-500 rounded-lg hover:from-green-500 hover:to-lime-600 shadow-glow transition transform hover:scale-105" to="/register">
            Signup
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-[#0F1333]/80 backdrop-blur-md shadow-neon rounded-2xl p-10 max-w-md w-full text-center border border-cyan-400/20">
          <h1 className="text-4xl font-extrabold text-red-500 mb-4 glow-red">
            Payment Cancelled ❌
          </h1>
          <p className="text-cyan-200 mb-6 text-lg">
            Your payment process was cancelled. No charges were made. Please try again if you wish to upgrade to Premium.
          </p>
          <Link
            to="/pricing"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-bold rounded-xl shadow-glow hover:from-cyan-500 hover:to-pink-600 transition transform hover:scale-105"
          >
            Try Again / Go to Pricing
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0F1333]/80 text-white p-6 text-center mt-auto border-t border-cyan-400/20 shadow-inner">
        <p className="mb-2 text-gray-400">&copy; {new Date().getFullYear()} Digital Life Lessons. All rights reserved.</p>
        <p className="text-sm">
          <Link to="/terms" className="underline hover:text-cyan-400 transition glow-text">Terms & Conditions</Link> |{" "}
          <Link to="/contact" className="underline hover:text-cyan-400 transition glow-text">Contact</Link>
        </p>
      </footer>

    </div>
  );
};

export default PaymentCancel;