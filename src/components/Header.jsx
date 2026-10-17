import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isTamil } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#home', label: t('navHome'), icon: '/images/menu-icons/home.png' },
    { href: '/temple', label: t('navTemple'), icon: '/images/menu-icons/kovil.png' },
    { href: '/pooja', label: t('navPooja'), icon: '/images/menu-icons/poojai.png' },
    { href: '/events', label: t('navEvents'), icon: '/images/menu-icons/nigalvu.png' },
    { href: '/gallery', label: t('navGallery'), icon: '/images/menu-icons/gallery.png' },
    { href: '/donors', label: t('navDonors'), icon: '/images/menu-icons/annathanam.png' },
    { href: '/contact', label: t('navContact'), icon: '/images/menu-icons/contact.png' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md py-1.5 sm:py-2 transition-all duration-300">
      
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center mb-1 sm:mb-2 md:mb-3">
        <div className={`text-[#8B0000] font-black text-xs sm:text-sm md:text-lg drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] truncate pr-2 ${isTamil ? 'font-tamil' : ''}`}>
          {t('templeTitle')}
        </div>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <span className={`text-[#8B0000] font-black text-sm md:text-lg hidden lg:block drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] ${isTamil ? 'font-tamil' : ''}`}>
            {t('templeTimingsTopBar')}
          </span>

          {/* Social Media Links */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <a href="#" aria-label="Facebook" className="bg-[#1877F2] text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[10px] sm:text-[12px] hover:opacity-80 shadow-md transition-opacity">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram" className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[10px] sm:text-[12px] hover:opacity-80 shadow-md transition-opacity">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="YouTube" className="bg-[#FF0000] text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[10px] sm:text-[12px] hover:opacity-80 shadow-md transition-opacity">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" aria-label="WhatsApp" className="bg-[#25D366] text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[10px] sm:text-[12px] hover:opacity-80 shadow-md transition-opacity">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between lg:justify-end items-center relative">
        {/* Mobile Brand (Logo + Temple Name) */}
        <a href="/#home" className="flex items-center gap-2 sm:gap-2.5 lg:hidden py-0.5">
          <img 
            src="/images/logo_new.png" 
            alt="Temple Logo" 
            className="w-7 h-9 object-contain drop-shadow" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          />
          <div className={`flex flex-col leading-tight ${isTamil ? 'font-tamil' : ''}`}>
            <span className="text-[10px] font-bold text-[#a05a2c]">{t('templePrefix')}</span>
            <span className="text-xs sm:text-sm font-black text-[#8B0000]">{t('templeName')}</span>
          </div>
        </a>

        {/* Mobile Right Controls: Single Language Toggle & Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle variant="compact" />
          <button
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            className="text-[#8B0000] p-1.5 sm:p-2 focus:outline-none border border-[#8B0000]/25 rounded-lg bg-[#fff9e6]/80 hover:bg-[#fff9e6] transition shadow-xs cursor-pointer"
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times text-base sm:text-lg' : 'fa-bars text-base sm:text-lg'}`}></i>
          </button>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 top-[88px] bg-black/40 backdrop-blur-xs z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute right-4 top-full mt-2 flex w-64 max-w-[calc(100vw-2rem)] flex-col gap-1 rounded-2xl border-2 border-[#d4af37]/60 bg-[#fffdf5] p-3 shadow-2xl backdrop-blur-md z-50 lg:hidden">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 font-bold text-[#8B0000] hover:bg-[#f6c026]/20 transition-colors ${isTamil ? 'font-tamil' : ''}`}
                  href={link.href}
                >
                  <img src={link.icon} alt={link.label} className="w-6 h-6 object-contain" />
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </div>
          </>
        )}

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6 lg:space-x-8 pr-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={`text-[#8B0000] hover:text-[#a67c00] font-black text-lg transition-all flex items-center group drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] ${isTamil ? 'font-tamil' : ''}`}
              href={link.href}
            >
              <img src={link.icon} alt={link.label} className="w-8 h-8 md:w-10 md:h-10 mr-2 object-contain transition-transform group-hover:scale-110 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]" />
              {link.label}
            </a>
          ))}
          <div className="pl-2 border-l border-[#d4af37]/40">
            <LanguageToggle variant="compact" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
