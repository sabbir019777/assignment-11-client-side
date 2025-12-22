// src/components/EmotionalToneDropdown.jsx
import React from "react";
import { FaChevronDown } from "react-icons/fa";

const tones = [
  "Neutral",
  "Happy",
  "Motivational",
  "Inspirational",
  "Sad",
  "Serious",
  "Funny",
  "Excited",
];

const EmotionalToneDropdown = ({ value, onChange }) => {
  return (
    <div className="w-full space-y-2">
      {/* Label */}
      <label className="text-xs uppercase tracking-widest text-cyan-300">
        Emotional Tone
      </label>

      {/* Wrapper */}
      <div className="relative group">
        {/* Select */}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full px-4 py-3 rounded-2xl
            bg-gradient-to-br from-[#05070F] via-[#0B1230] to-[#02030A]
            text-white
            border border-cyan-400/20
            focus:border-cyan-400
            outline-none
            transition-all duration-300
            shadow-[0_0_25px_#00E5FF22]
            hover:shadow-[0_0_35px_#00E5FF55]
            appearance-none
            backdrop-blur-xl
          "
        >
          <option value="" disabled className="bg-[#05070F] text-gray-400">
            Select emotional tone…
          </option>

          {tones.map((tone) => (
            <option
              key={tone}
              value={tone}
              className="bg-[#05070F] text-white"
            >
              {tone}
            </option>
          ))}
        </select>

        {/* Neon Glow Border */}
        <div
          className="absolute inset-0 rounded-2xl
          pointer-events-none
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          shadow-[0_0_30px_#00E5FF55]"
        />

        {/* Custom Arrow */}
        <FaChevronDown
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-cyan-300
            group-hover:text-fuchsia-400
            pointer-events-none
            transition-all duration-300
          "
        />
      </div>
    </div>
  );
};

export default EmotionalToneDropdown;
