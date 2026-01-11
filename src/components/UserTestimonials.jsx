// src/components/UserTestimonials.jsx
import React from "react";
import { FaFingerprint, FaCheckCircle } from "react-icons/fa";

const UserTestimonials = () => {
  const feedbacks = [
    {
      name: "Alex Rivera",
      text: "System transformation successful. The mental frameworks provided are lightyears ahead of traditional learning.",
      color: "from-[#40E0D0] to-blue-500",
      role: "Neural Architect"
    },
    {
      name: "Sarah Chen",
      text: "A flawless integration of technology and human potential. Career trajectory shifted exponentially.",
      color: "from-[#FF00FF] to-purple-600",
      role: "Vision Director"
    },
    {
      name: "Jordan Smith",
      text: "The resilience protocols are unmatched. Achieved a level of focus I never thought possible.",
      color: "from-[#40E0D0] to-emerald-500",
      role: "Growth Engineer"
    },
    {
      name: "Elena Vogt",
      text: "The community and content are top-tier. Like having a mentor in my pocket 24/7.",
      color: "from-[#FF00FF] to-pink-500",
      role: "Product Strategist"
    },
    {
      name: "Marcus Thorne",
      text: "Efficiency increased by 300%. The protocols are highly logical and easy to sync.",
      color: "from-[#40E0D0] to-cyan-600",
      role: "Data Scientist"
    },
    {
      name: "Aria Sterling",
      text: "A profound impact on my leadership style. The depth of the insights is truly world-class.",
      color: "from-[#FF00FF] to-fuchsia-600",
      role: "CEO, NexaCorp"
    },
    {
      name: "Kaelen Voss",
      text: "The mental clarity gained through this system is priceless. Highly recommended for pros.",
      color: "from-[#40E0D0] to-teal-500",
      role: "Security Analyst"
    },
    {
      name: "Lydia Grant",
      text: "Finally a system that bridges the gap between science and personal evolution.",
      color: "from-[#FF00FF] to-violet-500",
      role: "Strategic Lead"
    }
  ];

  return (
    <section className="mb-32 py-24 relative overflow-hidden">
      
      {/* Super Slow & Readable Sequential Zoom Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ultraSlowZoom {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.4; 
            filter: blur(1px) grayscale(60%);
          }
          
          20%, 70% { 
            transform: scale(1.08); 
            opacity: 1; 
            filter: blur(0px) grayscale(0%);
            box-shadow: 0 0 50px rgba(64, 224, 208, 0.2);
          }
          90% {
            transform: scale(1); 
            opacity: 0.4;
            filter: blur(1px);
          }
        }
        .zoom-card {
          /* Duration set to 14s for maximum readability */
          animation: ultraSlowZoom 14s ease-in-out infinite;
        }
      `}} />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Centered Small Title */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-[1px] w-10 bg-[#40E0D0]"></div>
            <span className="text-[#40E0D0] font-mono text-[10px] uppercase tracking-[0.5em]">User Experience Logs</span>
            <div className="h-[1px] w-10 bg-[#FF00FF]"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#FF00FF]">Feedback</span>
          </h2>
        </div>

        {/* Grid with Larger & Slower Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {feedbacks.map((fb, i) => (
            <div 
              key={i}
              className="zoom-card group relative h-[400px]" 
              style={{ animationDelay: `${i * 1.8}s` }} 
            >
              {/* Glass Card Container */}
              <div className="h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] relative z-10 flex flex-col justify-between transition-all duration-500">
                
                <div className="absolute top-8 right-8 text-white/5">
                  <FaFingerprint size={40} />
                </div>

                <div className="relative">
                   <div className={`w-14 h-1.5 bg-gradient-to-r ${fb.color} rounded-full mb-8 shadow-lg`}></div>
                   <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed italic">
                     "{fb.text}"
                   </p>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${fb.color} p-[1.5px] shadow-lg`}>
                     <div className="w-full h-full bg-[#050505] rounded-2xl flex items-center justify-center text-white font-black text-xl">
                       {fb.name.charAt(0)}
                     </div>
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                      {fb.name} <FaCheckCircle className="text-[#40E0D0] text-[10px]" />
                    </h4>
                    <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">{fb.role}</p>
                  </div>
                </div>
              </div>

              {/* Background Glow on Active State */}
              <div className={`absolute inset-8 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-r ${fb.color}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;