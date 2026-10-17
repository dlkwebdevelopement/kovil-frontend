import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const formatCardTiming = (timeStr, isEnglish) => {
  if (!timeStr) return '';
  if (!isEnglish) return timeStr;
  if (timeStr === 'முழு நாள்') return 'Full Day';
  if (/காலை/i.test(timeStr)) {
    const m = timeStr.match(/\d{1,2}:\d{2}/);
    return m ? `${m[0]} AM` : timeStr;
  }
  if (/மாலை|இரவு/i.test(timeStr)) {
    const m = timeStr.match(/\d{1,2}:\d{2}/);
    return m ? `${m[0]} PM` : timeStr;
  }
  return timeStr;
};

const EventCard = ({ day, month, image, title, subtitle, time }) => {
  const { isTamil, isEnglish } = useLanguage();
  const displayTime = formatCardTiming(time, isEnglish);

  return (
    <div className={`card relative border-[1.5px] border-[#d4af37]/40 shadow-lg rounded-2xl overflow-hidden h-full flex flex-col bg-[#FFFDF5] transition-transform hover:-translate-y-2 duration-300 group ${isTamil ? 'font-tamil' : ''}`}>
      
      {/* Background watermark */}
      <div className="absolute -bottom-6 -right-6 text-8xl text-[#d4af37] opacity-5 pointer-events-none z-0">
        <i className="fas fa-vihara"></i>
      </div>

      <div className="relative h-36 sm:h-44 shrink-0">
        {/* Main Image */}
        <img src={image} alt={title} className="w-full h-full object-cover" />
        
        {/* Date Badge */}
        <div className="absolute top-0 left-2.5 sm:left-4 text-center overflow-hidden rounded-b-xl shadow-md w-10 sm:w-12 z-10 border-b border-x border-[#8B0000]/20">
          <div className="font-bold py-1 sm:py-1.5 text-white bg-[#8B0000] text-sm sm:text-lg leading-none">{day}</div>
          <div className="font-bold py-0.5 sm:py-1 bg-[#d4af37] text-[#4B2E15] text-[10px] sm:text-xs leading-none">{month}</div>
        </div>

        {/* Wavy Scalloped SVG Overlay (Creates the curved bottom edge of the image) */}
        <svg className="absolute -bottom-[1px] left-0 w-full h-7 sm:h-8 text-[#FFFDF5] z-10" viewBox="0 0 100 24" preserveAspectRatio="none">
          {/* Fill matches the card background */}
          <path d="M0,24 L0,12 C20,12 30,24 50,24 C70,24 80,12 100,12 L100,24 Z" fill="currentColor" />
          {/* Gold stroke along the curve */}
          <path d="M0,12 C20,12 30,24 50,24 C70,24 80,12 100,12" fill="none" stroke="#d4af37" strokeWidth="0.5" />
        </svg>

        {/* Center Logo overlapping the curve (No background circle) */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-[30%] z-20 drop-shadow-md">
          <img src="/images/event-card-icon.png" alt="Event Icon" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain" />
        </div>
      </div>
      
      {/* Content Area */}
      <div className="px-2 sm:px-3 pt-6 sm:pt-8 pb-4 sm:pb-5 text-center flex flex-col items-center justify-between flex-grow relative z-10">
        <div className="w-full mb-1.5 sm:mb-2">
          <h6 className="font-bold mb-1 text-[#8B0000] text-xs sm:text-sm md:text-[15px] leading-snug drop-shadow-sm line-clamp-2">{title}</h6>
          <div className="text-gray-500 text-[10px] sm:text-[11px] md:text-xs italic line-clamp-1">{subtitle}</div>
        </div>
        
        {/* Decorative Separator */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 w-full">
          <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-l from-[#d4af37] to-transparent"></div>
          <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rotate-45 bg-[#d4af37]"></div>
          <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-[#d4af37] to-transparent"></div>
        </div>

        {/* Time Pill */}
        <div className="inline-flex items-center justify-center bg-[#8B0000] text-white rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[11px] md:text-xs font-bold shadow-md transform transition-transform group-hover:scale-105 max-w-full">
          <i className="far fa-clock mr-1 sm:mr-1.5 text-[#d4af37] shrink-0"></i> <span className="truncate">{displayTime}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
