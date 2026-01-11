// src/components/Stats.jsx
import React from "react";

const Stats = () => {
  const statsData = [
    { label: "Wisdom Seekers", value: "12K+", color: "from-[#40E0D0] to-[#22d3ee]" },
    { label: "Shared Journeys", value: "8.5K+", color: "from-[#FF00FF] to-[#d946ef]" },
    { label: "Daily Insights", value: "450+", color: "from-[#40E0D0] to-[#22d3ee]" },
    { label: "Global Rank", value: "Top 1%", color: "from-[#FF00FF] to-[#d946ef]" },
  ];

  return (
    <section className="mb-24 relative">
      
      {/* --- CSS Animation Logic (Extra Slow) --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseWave {
          0% { 
            transform: scale(1); 
            opacity: 0.4; 
            filter: grayscale(100%);
            border-color: rgba(255, 255, 255, 0.05);
            box-shadow: none;
          }
         
          5% {
            transform: scale(1.05); 
            opacity: 1; 
            filter: grayscale(0%);
            border-color: #40E0D0;
            box-shadow: 0 0 30px rgba(64, 224, 208, 0.25);
            background: rgba(255, 255, 255, 0.08);
          }
          20% { 
            transform: scale(1.05); 
            opacity: 1; 
            filter: grayscale(0%);
            border-color: #40E0D0;
            box-shadow: 0 0 30px rgba(64, 224, 208, 0.25);
            background: rgba(255, 255, 255, 0.08);
          }
       
          25%, 100% {
            transform: scale(1); 
            opacity: 0.4; 
            filter: grayscale(100%);
            border-color: rgba(255, 255, 255, 0.05);
            box-shadow: none;
          }
        }

        .infinite-card {
          /* Total cycle duration: 12 seconds for 4 items */
          animation: pulseWave 12s ease-in-out infinite; 
        }
      `}} />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#40E0D0]/5 to-[#FF00FF]/5 blur-[60px] rounded-[3rem] pointer-events-none"></div>

      <div className="relative z-10 bg-[#0A0F1E]/60 border border-white/10 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-2xl">
        
        {/* --- Header / Title Section --- */}
        <div className="text-center mb-12 relative">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-2.5 h-2.5 bg-[#FF00FF] rounded-full animate-ping"></div>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] text-white">
              Live System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#FF00FF]">Metrics</span>
            </h3>
          </div>
          <div className="h-[2px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#40E0D0] to-transparent opacity-50"></div>
          <p className="text-gray-400 font-mono text-[10px] md:text-xs mt-3 uppercase tracking-widest">
            Real-time Community Growth Data
          </p>
        </div>

        {/* --- Stats Grid with Extra Slow Animation --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, i) => (
            <div 
              key={i} 
              className="infinite-card group relative p-6 rounded-2xl bg-white/5 border border-white/5 transition-all"
              // Animation Delay: 3s gap between each card (12s / 4 items = 3s)
              style={{ animationDelay: `${i * 3}s` }} 
            >
              <div className="relative z-10 text-center space-y-2">
                <h4 
                  className={`text-3xl md:text-5xl font-black bg-gradient-to-br ${stat.color} text-transparent bg-clip-text drop-shadow-sm`}
                >
                  {stat.value}
                </h4>
                <div className="h-[1px] w-8 mx-auto bg-white/20 group-hover:w-16 transition-all duration-1000"></div>
                <p className="text-gray-400 uppercase tracking-[0.15em] text-[10px] md:text-xs font-bold transition-colors">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Cyberpunk Decor (Corners) --- */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#40E0D0]/20 rounded-tl-[2rem]"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#FF00FF]/20 rounded-br-[2rem]"></div>
      </div>
    </section>
  );
};

export default Stats;