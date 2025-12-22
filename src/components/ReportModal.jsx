// src/components/ReportModal.jsx
import React, { useState } from "react";
import { FaFlag, FaTimes, FaExclamationTriangle } from "react-icons/fa";

const reasonsList = [
  "Inappropriate",
  "Hate Speech",
  "Spam",
  "Misleading",
  "Harassment",
  "Violence",
  "Copyright Violation",
  "Other",
];

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!reason.trim()) {
      alert("Please select a report reason!");
      return;
    }

    onSubmit({
      reason,
      details: details.trim(),
    });

    setReason("");
    setDetails("");
    onClose();
  };

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/70 backdrop-blur-xl
      "
    >
      {/* Modal */}
      <div
        className="
          relative w-full max-w-lg p-6 rounded-3xl
          bg-gradient-to-br from-purple-900/80 via-indigo-900/80 to-pink-900/80
          border border-white/20
          shadow-[0_0_40px_rgba(168,85,247,0.45)]
          animate-[fadeIn_0.25s_ease-out]
        "
      >
        {/* Glow ring */}
        <div className="absolute -inset-1 rounded-3xl blur-xl opacity-30 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 -z-10" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-3 text-2xl font-extrabold text-white tracking-wide">
            <FaFlag className="text-pink-400 drop-shadow-[0_0_8px_#ec4899]" />
            Report Lesson
          </h2>

          <button
            onClick={onClose}
            className="
              text-gray-300 hover:text-red-400
              transition text-xl
            "
          >
            <FaTimes />
          </button>
        </div>

        {/* Warning */}
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-400/30 p-3 text-sm text-red-300">
          <FaExclamationTriangle />
          Reports are reviewed by admins. False reports may lead to action.
        </div>

        {/* Reason */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-200">
            Select Reason
          </label>

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="
              w-full px-4 py-3 rounded-xl
              bg-black/40 text-white
              border border-white/20
              focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40
              outline-none transition
            "
          >
            <option value="">-- Select a reason --</option>
            {reasonsList.map((r, idx) => (
              <option key={idx} value={r} className="text-black">
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Details */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-200">
            Additional Details (Optional)
          </label>

          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Explain the issue in detail..."
            className="
              w-full h-28 px-4 py-3 rounded-xl
              bg-black/40 text-white
              border border-white/20
              focus:border-pink-400 focus:ring-2 focus:ring-pink-400/40
              outline-none transition
              placeholder-gray-400
            "
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-5 py-2 rounded-xl
              bg-white/10 text-gray-200 font-semibold
              hover:bg-white/20 transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              px-6 py-2 rounded-xl
              bg-gradient-to-r from-pink-500 to-purple-600
              text-white font-bold tracking-wide
              shadow-[0_0_20px_rgba(236,72,153,0.6)]
              hover:scale-105 transition-transform
            "
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
