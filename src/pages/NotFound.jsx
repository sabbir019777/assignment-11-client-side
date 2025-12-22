// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();


  const VOID_VIOLET = "#3A0077";
  const RIFT_BLUE = "#001F4D";
  const EMERALD_GREEN = "#00FF7F";

 
  const TemporalVortexBackground = () => (
    <div className="absolute inset-0 z-0 bg-gray-900 overflow-hidden">
      {/* Deep Space Background */}
      <div
        className="w-full h-full"
        style={{
          background: `radial-gradient(circle at center, ${RIFT_BLUE} 0%, rgba(0,0,0,1) 75%)`,
        }}
      ></div>

      {/* Rotating Vortex Effect - SPEED INCREASED HERE */}
      <div
        className="absolute inset-0 opacity-50 z-10 animate-spin-medium-reverse"
        style={{
          backgroundImage: `
            repeating-radial-gradient(
              circle at 50% 50%,
              ${VOID_VIOLET} 0%,
              transparent 10%,
              ${RIFT_BLUE} 15%,
              transparent 20%
            )
          `,
          backgroundSize: "300px 300px",
          mixBlendMode: "lighten",
        }}
      ></div>

      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 z-20 opacity-5 pointer-events-none bg-repeat" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}></div>
    </div>
  );

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden px-4 font-mono bg-black">
      <TemporalVortexBackground />

      {/* Main Console / Data Beacon */}
      <div
        className="relative z-30 p-12 rounded-full flex flex-col items-center justify-center transition-all duration-700 max-w-lg text-center data-beacon"
        style={{
            // No box shadow, using a glow effect
            boxShadow: `0 0 50px ${EMERALD_GREEN}AA, 0 0 100px ${VOID_VIOLET}66`,
            background: `radial-gradient(circle, ${VOID_VIOLET}77 0%, ${RIFT_BLUE}44 70%)`,
            border: `2px solid ${EMERALD_GREEN}66`,
            minHeight: '400px' // Slightly reduced height/aspect ratio
        }}
      >

        {/* Status Text: Data Erosion */}
        <p
          className="text-xl md:text-2xl font-bold mb-2 tracking-widest uppercase text-emerald-400 data-scan"
          style={{ textShadow: `0 0 10px ${EMERALD_GREEN}` }}
        >
          [STATUS]: DATA EROSION COMPLETE
        </p>

        {/* 404 Glitch Text - Data Fragmentation Style */}
        <h1 className="relative z-40 text-[8rem] md:text-[12rem] font-black uppercase data-fragmentation">
          404
        </h1>

        {/* Subtitle: EXISTENCE TERMINATED */}
        <h2
          className="relative z-40 text-2xl md:text-4xl font-extrabold mb-6 uppercase text-white tracking-widest"
          style={{ textShadow: `0 0 20px ${VOID_VIOLET}, 0 0 40px ${EMERALD_GREEN}` }}
        >
          EXISTENCE TERMINATED
        </h2>

        {/* Description */}
        <p className="relative z-40 text-gray-400 mb-8 text-center max-w-sm leading-snug text-sm md:text-base">
          **Singularity Event Detected**. The requested resource has collapsed out of the temporal flow. Use the emergency beacon to attempt a return.
        </p>

        {/* Emergency Beacon Button */}
        <button
          onClick={() => navigate("/")}
          className="relative z-40 px-10 py-3 font-bold text-lg tracking-wider uppercase
            bg-emerald-600 text-black rounded-sm
            shadow-[0_0_30px_#00FF7F] hover:shadow-[0_0_60px_#00FF7F] hover:scale-[1.03] transition-all duration-300
            transform hover:bg-emerald-400 animate-pulse-slow
          "
        >
          !! Back Home !!
        </button>
      </div>

      {/* Custom Styles and Keyframes */}
      <style>{`
        /* Custom medium rotation for vortex */
        @keyframes spin-medium-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        /* CHANGED FROM 120s TO 30s FOR FASTER ROTATION */
        .animate-spin-medium-reverse { animation: spin-medium-reverse 30s linear infinite; } 

        /* Slow pulse for the beacon button */
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow { animation: pulse-slow 3s infinite; }

        /* Data Scanline Effect for text */
        .data-scan {
            position: relative;
            overflow: hidden;
        }
        .data-scan::after {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: linear-gradient(
                to bottom, 
                transparent 0%, 
                ${EMERALD_GREEN}44 50%, 
                transparent 100%
            );
            transform: translateY(-100%);
            animation: scanline 4s infinite linear;
        }
        @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }

        /* Data Fragmentation Glitch for 404 */
        .data-fragmentation {
          position: relative;
          color: white;
          text-shadow: 0 0 10px ${EMERALD_GREEN};
          animation: fragmentShake 0.5s infinite;
        }
        .data-fragmentation::before,
        .data-fragmentation::after {
          content: '404';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
        }
        .data-fragmentation::before {
          left: 5px;
          text-shadow: -5px 0 ${VOID_VIOLET};
          clip: rect(30px, 9999px, 80px, 0);
          animation: fragmentClipTop 2s infinite linear alternate-reverse;
        }
        .data-fragmentation::after {
          left: -5px;
          text-shadow: -5px 0 ${EMERALD_GREEN};
          clip: rect(100px, 9999px, 150px, 0);
          animation: fragmentClipBottom 2s infinite linear alternate-reverse;
        }
        
        /* Shaking effect */
        @keyframes fragmentShake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(2px, -2px) rotate(0.5deg); }
          75% { transform: translate(-2px, 2px) rotate(-0.5deg); }
        }
        @keyframes fragmentClipTop {
          0%,100% { clip: rect(30px, 9999px, 80px, 0); }
          50% { clip: rect(50px, 9999px, 100px, 0); }
        }
        @keyframes fragmentClipBottom {
          0%,100% { clip: rect(100px, 9999px, 150px, 0); }
          50% { clip: rect(80px, 9999px, 130px, 0); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;