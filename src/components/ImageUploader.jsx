// src/components/ImageUploader.jsx
import React, { useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

const ImageUploader = ({ onUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should not exceed 5MB.");
      return;
    }

    setSelectedImage(file);
    setPreviewURL(URL.createObjectURL(file));

    if (onUpload) onUpload(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewURL("");
    if (onUpload) onUpload(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-6 rounded-2xl 
      bg-gradient-to-br from-[#0A0F1F] via-[#111B3C] to-[#05070F] 
      border-2 border-cyan-400/20 
      shadow-[0_0_20px_#00E5FF33] 
      hover:shadow-[0_0_30px_#00E5FF66] 
      transition-all duration-500">

      {!selectedImage ? (
        <label className="flex flex-col items-center justify-center cursor-pointer text-gray-400 
          hover:text-cyan-400 transition-colors duration-300">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-cyan-400/10 
            hover:bg-cyan-400/20 transition-all duration-300 shadow-[0_0_10px_#00E5FF22] 
            hover:shadow-[0_0_20px_#00E5FF44]">
            <FaCloudUploadAlt size={50} />
          </div>
          <span className="mt-3 text-sm text-gray-300 hover:text-cyan-300">
            Click or Drag & Drop to upload image
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      ) : (
        <div className="relative w-full group">
          <img
            src={previewURL}
            alt="preview"
            className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-600/90 text-white rounded-full p-2 
              shadow-[0_0_10px_#FF0000AA] hover:shadow-[0_0_15px_#FF0000CC] transition-all duration-300"
          >
            <FaTimes />
          </button>

          {/* Neon Glow Overlay */}
          <div className="absolute inset-0 rounded-xl border-2 border-cyan-400/20 pointer-events-none 
            animate-pulse opacity-20 group-hover:opacity-50 transition-opacity duration-500" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
