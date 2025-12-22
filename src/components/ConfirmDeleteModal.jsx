import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message,
  loading = false, 
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center
      bg-black/80 backdrop-blur-md transition-all duration-300"
    >
      {/* Modal Box */}
      <div
        className="relative w-[95%] max-w-md p-8 md:p-10
        rounded-[2rem] overflow-hidden
        bg-gradient-to-br from-[#0A0F1F] via-[#111B3C] to-[#05070F]
        border border-red-500/40
        shadow-[0_0_80px_rgba(255,23,68,0.3)]
        animate-in fade-in zoom-in duration-300"
      >
        {/* Glow Layer */}
        <div
          className="absolute inset-0
          bg-gradient-to-tr from-red-500/10 via-transparent to-fuchsia-500/10
          blur-3xl pointer-events-none"
        />

        {/* Icon */}
        <div className="relative mb-6">
          <FaExclamationTriangle
            className="text-red-500 text-6xl mx-auto
            drop-shadow-[0_0_20px_rgba(255,23,68,0.8)]"
          />
        </div>

        {/* Title */}
        <h2
          className="relative text-2xl font-black text-center mb-3 tracking-tight
          bg-gradient-to-r from-red-400 via-orange-300 to-pink-400
          bg-clip-text text-transparent uppercase"
        >
          {title}
        </h2>

        {/* Message */}
        <p className="relative text-slate-400 text-center mb-10 leading-relaxed font-medium">
          {message ||
            "This action is irreversible. The data will be permanently wiped from our secure servers."}
        </p>

        {/* Actions */}
        <div className="relative flex flex-col sm:flex-row justify-center gap-4">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            disabled={loading}
            className="order-2 sm:order-1 px-8 py-3.5 rounded-2xl font-bold
            bg-white/5 border border-white/10
            text-slate-300 hover:text-white
            hover:bg-white/10 hover:border-white/20
            transition-all duration-300 disabled:opacity-50"
          >
            Go Back
          </button>

          {/* Delete Button */}
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`
              order-1 sm:order-2 px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest
              text-white shadow-2xl transition-all duration-500
              ${
                loading
                  ? "bg-red-900/50 cursor-not-allowed opacity-70"
                  : "bg-gradient-to-r from-red-600 to-pink-600 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,23,68,0.6)] active:scale-95"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Processing......
              </span>
            ) : (
              "Confirm Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;