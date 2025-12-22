// src/components/SearchFilterBar.jsx
import React, { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";

const SearchFilterBar = ({
  onSearch,
  onFilterChange,
  onSortChange,
  filters,
  sortOptions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(
    filters[0]?.value || ""
  );
  const [selectedSort, setSelectedSort] = useState(
    sortOptions[0]?.value || ""
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    onFilterChange(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    onSortChange(e.target.value);
  };

  return (
    <div
      className="
        relative w-full
        flex flex-col md:flex-row items-center gap-4 md:gap-6
        p-5 rounded-3xl
        bg-gradient-to-r from-purple-900/70 via-indigo-900/70 to-pink-900/70
        border border-white/20
        backdrop-blur-xl
        shadow-[0_0_35px_rgba(168,85,247,0.45)]
      "
    >
      {/* Neon Glow */}
      <div className="absolute -inset-1 rounded-3xl blur-xl opacity-30 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 -z-10" />

      {/*  Search */}
      <div
        className="
          flex items-center flex-1 gap-3
          px-5 py-3 rounded-full
          bg-black/40
          border border-white/20
          focus-within:border-cyan-400
          focus-within:shadow-[0_0_15px_rgba(34,211,238,0.6)]
          transition
        "
      >
        <FaSearch className="text-cyan-400 text-lg" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search lessons..."
          className="
            flex-1 bg-transparent outline-none
            text-white placeholder-gray-400
          "
        />
      </div>

      {/* 🎯 Filter */}
      <div
        className="
          flex items-center gap-3
          px-5 py-3 rounded-full
          bg-black/40
          border border-white/20
          hover:border-purple-400
          transition
        "
      >
        <FaFilter className="text-purple-400" />
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="
            bg-transparent outline-none
            text-white cursor-pointer
          "
        >
          {filters.map((filter) => (
            <option
              key={filter.value}
              value={filter.value}
              className="text-black"
            >
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      {/*  Sort */}
      <div
        className="
          flex items-center gap-3
          px-5 py-3 rounded-full
          bg-black/40
          border border-white/20
          hover:border-pink-400
          transition
        "
      >
        {selectedSort === "asc" ? (
          <FaSortAmountUp className="text-pink-400" />
        ) : (
          <FaSortAmountDown className="text-pink-400" />
        )}

        <select
          value={selectedSort}
          onChange={handleSortChange}
          className="
            bg-transparent outline-none
            text-white cursor-pointer
          "
        >
          {sortOptions.map((sort) => (
            <option
              key={sort.value}
              value={sort.value}
              className="text-black"
            >
              {sort.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilterBar;
