import React from "react";
import { 
  FaSeedling, FaLightbulb, FaUsers, FaChartLine, 
  FaBrain, FaHourglassHalf, FaGem, FaTools 
} from "react-icons/fa";

const benefitIcons = {
  growth: <FaSeedling />,
  reflection: <FaLightbulb />,
  community: <FaUsers />,
  progress: <FaChartLine />,
  mindset: <FaBrain />,
  time: <FaHourglassHalf />,
  wisdom: <FaGem />,      
  correction: <FaTools />  
};

const BenefitCard = ({ title, description, type }) => {
  return (
    <div className="group relative h-full min-w-[280px] md:min-w-[320px] p-[1px] rounded-2xl bg-gradient-to-br from-white/20 to-transparent mx-4">
      <div className="relative h-full w-full bg-[#0A101E]/60 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center text-center border border-white/5 transition-all duration-500 group-hover:bg-[#0A101E]/80 group-hover:border-[#40E0D0]/50 overflow-hidden">
        
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#40E0D0]/10 blur-[50px] group-hover:bg-[#40E0D0]/20 transition-all duration-700 rounded-full"></div>
        
        <div className="relative z-10 mb-6">
          <div className="relative flex justify-center items-center w-16 h-16 bg-[#0E1638] rounded-2xl text-[#40E0D0] text-3xl border border-[#40E0D0]/20 group-hover:shadow-[0_0_25px_#40E0D060] group-hover:rotate-[360deg] transition-all duration-1000">
            {benefitIcons[type] || <FaLightbulb />}
          </div>
        </div>

        <h4 className="relative z-10 text-white text-lg font-black mb-3 uppercase tracking-tighter group-hover:text-[#40E0D0]">
          {title}
        </h4>

        <p className="relative z-10 text-gray-400 text-sm leading-relaxed whitespace-normal">
          {description}
        </p>

        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#40E0D0] group-hover:w-full transition-all duration-700"></div>
      </div>
    </div>
  );
};



export default BenefitCard;