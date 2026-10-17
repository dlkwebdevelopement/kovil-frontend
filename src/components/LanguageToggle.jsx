import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = ({ variant = 'default', className = '' }) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <div 
        className={`inline-flex items-center p-0.5 rounded-full border border-[#d4af37]/60 bg-[#fff9e6]/90 shadow-xs transition-all ${className}`}
        role="group" 
        aria-label="Language selector"
      >
        <button
          type="button"
          onClick={() => setLanguage('ta')}
          className={`px-2 py-0.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
            language === 'ta'
              ? 'bg-[#8B0000] text-white shadow-xs font-tamil scale-100'
              : 'text-[#8B0000] hover:text-[#a05a2c] opacity-80 hover:opacity-100'
          }`}
          title="தமிழ்"
        >
          தமிழ்
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2 py-0.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
            language === 'en'
              ? 'bg-[#8B0000] text-white shadow-xs scale-100'
              : 'text-[#8B0000] hover:text-[#a05a2c] opacity-80 hover:opacity-100'
          }`}
          title="English"
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`inline-flex items-center p-1 rounded-full border border-[#d4af37]/70 bg-gradient-to-r from-[#fffdf5] via-[#fff9e6] to-[#fffdf5] shadow-sm ${className}`}
      role="group" 
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLanguage('ta')}
        className={`px-3 py-1 text-xs md:text-sm font-bold rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
          language === 'ta'
            ? 'bg-[#8B0000] text-[#FFF9E6] shadow-sm font-tamil ring-1 ring-[#d4af37]/50'
            : 'text-[#8B0000] hover:bg-[#d4af37]/15 hover:text-[#520a0a]'
        }`}
      >
        <i className="fas fa-globe text-[11px] text-[#F6C026]"></i>
        <span>தமிழ்</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-xs md:text-sm font-bold rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
          language === 'en'
            ? 'bg-[#8B0000] text-[#FFF9E6] shadow-sm ring-1 ring-[#d4af37]/50'
            : 'text-[#8B0000] hover:bg-[#d4af37]/15 hover:text-[#520a0a]'
        }`}
      >
        <span>English</span>
      </button>
    </div>
  );
};

export default LanguageToggle;
