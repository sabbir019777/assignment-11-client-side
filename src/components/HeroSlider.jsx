import React from "react";
import SlickSlider from "react-slick";
import { FaChevronLeft, FaChevronRight, FaRocket, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

// Slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = SlickSlider.default || SlickSlider;

// Futuristic Arrow Component
const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === "next" ? "right-6" : "left-6"} top-1/2 -translate-y-1/2 z-30 group transition-all duration-500`}
  >
    <div className="relative p-4 rounded-lg bg-black/40 border border-[#40E0D0]/20 backdrop-blur-xl group-hover:border-[#40E0D0] group-hover:shadow-[0_0_20px_#40E0D0] group-active:scale-90 transition-all">
      {/* Scanner light effect on arrow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#40E0D0]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
      {direction === "next" ? (
        <FaChevronRight className="text-[#40E0D0] text-2xl" />
      ) : (
        <FaChevronLeft className="text-[#FF00FF] text-2xl" />
      )}
    </div>
  </button>
);

const HeroSlider = ({ slides = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    fade: true,
    pauseOnHover: false,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full group overflow-hidden rounded-[2rem] border-4 border-[#0A102D] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      {/* Background Animated Grid Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative outline-none">
            {/* Image Section with Ken Burns Effect */}
            <div className="relative h-[550px] md:h-[700px] overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover animate-[kenburns_20s_ease_infinite]"
              />
              {/* Dark Cyber Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A102D] via-transparent to-[#0A102D]/80"></div>
            </div>

            {/* Content UI */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
              
              {/* Tech Badge */}
              <div className="mb-6 flex items-center gap-2 px-4 py-1 rounded-full bg-[#40E0D0]/10 border border-[#40E0D0]/30 text-[#40E0D0] text-xs font-mono tracking-widest animate-pulse">
                <FaShieldAlt /> SYSTEM_LOADED: SLIDE_0{index + 1}
              </div>

              {/* Title with Glitchy Look */}
              <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 relative">
                <span className="relative z-10">
                  {slide.title.split(" ").map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#FF00FF]" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </span>
                {/* Background Shadow Text */}
                <span className="absolute inset-0 text-white/5 -translate-y-2 translate-x-2 select-none">{slide.title}</span>
              </h2>

              {/* Description box with Glassmorphism */}
              <div className="max-w-2xl p-6 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 mb-10 transform transition-all duration-500 hover:border-[#40E0D0]/50">
                <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide">
                  {slide.description}
                </p>
              </div>

              {/* Action Button */}
              <Link
                to={slide.link}
                className="group relative px-12 py-5 bg-transparent border-2 border-[#40E0D0] text-[#40E0D0] font-bold text-lg uppercase tracking-widest rounded-none overflow-hidden hover:text-black transition-colors duration-300"
              >
                <div className="absolute inset-0 w-0 bg-[#40E0D0] transition-all duration-500 group-hover:w-full"></div>
                <span className="relative z-10 flex items-center gap-3">
                  <FaRocket className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                  {slide.button}
                </span>
                
                {/* Decorative corners for button */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FF00FF]"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#FF00FF]"></div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>

      {/* Futuristic Keyframe Animations */}
     <style dangerouslySetInnerHTML={{ __html: `
  .swiper-pagination-bullet { background: #40E0D0 !important; }
  .swiper-pagination-bullet-active { box-shadow: 0 0 10px #40E0D0; }
` }} />
    </div>
  );
};

export default HeroSlider;