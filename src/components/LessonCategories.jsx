// src/components/LessonCategories.jsx
import React from "react";
import { 
  FaBrain, FaHeart, FaBriefcase, FaUserAstronaut, 
  FaLightbulb, FaShieldAlt, FaBalanceScale, FaLeaf 
} from "react-icons/fa";

const LessonCategories = () => {
  const categories = [
    { 
      name: "Mindset", 
      subtitle: "Rewire Your Brain",
      desc: "Master your internal dialogue to break limiting beliefs. Develop a growth-oriented mindset that transforms challenges into stepping stones for success.",
      icon: <FaBrain />, 
      color: "#40E0D0", 
      borderColor: "border-[#40E0D0]"
    },
    { 
      name: "Relationships", 
      subtitle: "Connect Deeply",
      desc: "Explore the art of meaningful communication and emotional intelligence. Learn to build lasting bonds and navigate complex social dynamics with grace.",
      icon: <FaHeart />, 
      color: "#FF00FF",
      borderColor: "border-[#FF00FF]"
    },
    { 
      name: "Career", 
      subtitle: "Scale Up",
      desc: "Strategic frameworks for professional dominance. Master leadership skills, productivity hacks, and the mindset needed to excel in the modern corporate world.",
      icon: <FaBriefcase />, 
      color: "#40E0D0",
      borderColor: "border-[#40E0D0]"
    },
    { 
      name: "Growth", 
      subtitle: "Evolve Daily",
      desc: "A systematic approach to self-actualization. Implement daily protocols and habits that ensure continuous improvement in every aspect of your life.",
      icon: <FaUserAstronaut />, 
      color: "#FF00FF",
      borderColor: "border-[#FF00FF]"
    },
    { 
      name: "Innovation", 
      subtitle: "Create Future",
      desc: "Unlock your creative potential by thinking outside the box. Learn to solve complex problems using design thinking and futuristic innovation strategies.",
      icon: <FaLightbulb />, 
      color: "#40E0D0",
      borderColor: "border-[#40E0D0]"
    },
    { 
      name: "Resilience", 
      subtitle: "Stay Strong",
      desc: "Build an unbreakable spirit. Learn proven mental frameworks to bounce back from failures and maintain composure during life's most difficult crises.",
      icon: <FaShieldAlt />, 
      color: "#FF00FF",
      borderColor: "border-[#FF00FF]"
    },
    { 
      name: "Balance", 
      subtitle: "Work & Life",
      desc: "Achieve the ultimate equilibrium. Discover how to pursue ambitious professional goals without sacrificing your mental peace or personal well-being.",
      icon: <FaBalanceScale />, 
      color: "#40E0D0",
      borderColor: "border-[#40E0D0]"
    },
    { 
      name: "Wellness", 
      subtitle: "Health First",
      desc: "Holistic strategies for a sustainable lifestyle. Focus on optimizing physical vitality and mental clarity through science-backed wellness protocols.",
      icon: <FaLeaf />, 
      color: "#FF00FF",
      borderColor: "border-[#FF00FF]"
    },
  ];

  return (
    <section className="mb-32 px-4">
      
      {/* --- Title Section --- */}
      <div className="text-center mb-16 relative z-10">
        <h3 className="text-4xl md:text-6xl font-black uppercase italic text-white tracking-tighter mb-4">
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#FF00FF]">Realms</span>
        </h3>
        <div className="flex items-center justify-center gap-2">
           <div className="h-[1px] w-12 bg-[#40E0D0]"></div>
           <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.3em]">System Categories</p>
           <div className="h-[1px] w-12 bg-[#FF00FF]"></div>
        </div>
      </div>

      {/* --- Cards Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div 
            key={i} 
            className={`
              group relative h-[350px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500
              bg-[#0A0F1E] border-2 ${cat.borderColor}/20 hover:border-opacity-100 hover:-translate-y-2
            `}
          >
            {/* Top Glowing Line */}
            <div 
              className="absolute top-0 left-0 w-full h-1 shadow-[0_0_15px_currentColor]"
              style={{ backgroundColor: cat.color, color: cat.color }}
            ></div>

            {/* Background Tint */}
            <div 
              className="absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20"
              style={{ background: `linear-gradient(to bottom right, ${cat.color}, transparent)` }}
            ></div>

            {/* Tech Pattern Overlay */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Inner Content */}
            <div className="absolute inset-0 p-8 flex flex-col z-10">
              
              {/* Header: Icon & Number */}
              <div className="flex justify-between items-start mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 shadow-lg border border-white/10"
                  style={{ 
                    color: cat.color, 
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    boxShadow: `0 0 15px ${cat.color}20` 
                  }}
                >
                  {cat.icon}
                </div>
                <span className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors">0{i+1}</span>
              </div>

              {/* Text Info */}
              <div className="mt-auto transition-all duration-500 group-hover:-translate-y-2">
                <h4 className="text-2xl font-black text-white uppercase tracking-wide mb-1 drop-shadow-md">
                  {cat.name}
                </h4>
                <p 
                  className="text-xs font-mono uppercase tracking-widest mb-4"
                  style={{ color: cat.color }}
                >
                  {cat.subtitle}
                </p>
                
                {/* Expanded Description (Reveals on hover) */}
                <div className="relative overflow-hidden h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <p className="text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-4 font-light italic">
                    {cat.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LessonCategories;