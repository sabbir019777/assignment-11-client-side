
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const categories = [
  "Personal Growth",
  "Reflection",
  "Community Wisdom",
  "Track Progress",
  "Motivation",
  "Life Skills",
];

const CategoryDropdown = ({ selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-72">
      
      {/* BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full px-5 py-3 rounded-2xl
        bg-gradient-to-r from-[#6A5CFF] via-[#00E5FF] to-[#9D4EDD]
        text-white font-bold tracking-wide
        shadow-[0_0_30px_#00E5FF55]
        hover:shadow-[0_0_45px_#00E5FF99]
        transition-all duration-500
        flex justify-between items-center group"
      >
        <span className="relative z-10">
          {selectedCategory || "Select Category"}
        </span>

        <FaChevronDown
          className={`relative z-10 transition-transform duration-300
          ${isOpen ? "rotate-180" : ""}`}
        />

        {/* Glow overlay */}

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr
          from-cyan-400/20 via-transparent to-fuchsia-500/20
          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </button>

      {/* DROPDOWN  */}

      {isOpen && (
        <ul
          className="absolute z-30 w-full mt-3 rounded-2xl overflow-hidden
          bg-[#05070F]/95 backdrop-blur-xl
          border border-cyan-400/20
          shadow-[0_0_40px_#00E5FF44]
          animate-[fadeIn_0.25s_ease-out]"
        >
          {categories.map((category, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(category)}
              className="relative px-5 py-3 cursor-pointer
              text-slate-200 font-medium
              hover:text-white
              transition-all duration-300 group/item"
            >
              <span className="relative z-10">
                {category}
              </span>

              {/* Hover neon bg */}

              <div className="absolute inset-0 bg-gradient-to-r
                from-cyan-400/20 via-indigo-500/20 to-fuchsia-500/20
                opacity-0 group-hover/item:opacity-100
                transition-opacity duration-300" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;
