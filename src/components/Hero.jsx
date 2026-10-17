import React from 'react';
import { StaggerContainer, StaggerItem } from './AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t, isTamil } = useLanguage();

  return (
    <section id="home" className="relative w-full pt-[76px] sm:pt-[84px] md:pt-[96px] lg:pt-[104px] overflow-hidden bg-[#fff9e6]">
      {/* Proportional Reduced Height Hero Banner */}
      <div className="relative w-full aspect-[1672/780] min-h-[320px] sm:min-h-[380px] md:min-h-[440px] max-h-[580px] flex items-center overflow-hidden">
        
        {/* Full View Background Image */}
        <img 
          src="/images/hero-bg-latest.png" 
          alt="Temple Background" 
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none" 
        />

        {/* Content Overlay strictly aligned with the site-wide max-w-7xl grid */}
        <div className="w-full h-full relative z-10 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <StaggerContainer 
              className="w-full flex items-center"
              delayChildren={0.2}
              staggerChildren={0.15}
            >
              <div className="w-[65%] sm:w-[62%] md:w-[58%] lg:w-[55%] max-w-2xl xl:max-w-4xl flex flex-col items-start my-auto translate-x-[35px] -translate-y-3 sm:-translate-y-5 md:-translate-y-7 lg:-translate-y-9">
                
                {/* Logo and Temple Titles */}
                <StaggerItem className="flex items-center sm:items-start gap-3 sm:gap-4 md:gap-5 mb-2 sm:mb-3">
                  <img 
                    src="/images/logo_new.png" 
                    alt="Temple Logo" 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-36 xl:h-36 object-contain drop-shadow-xl shrink-0 mt-0.5 sm:mt-1" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="flex flex-col">
                    <h4 
                      className={`text-[#222222] font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wider uppercase mb-0.5 sm:mb-1 ${isTamil ? 'font-tamil' : ''}`} 
                      style={{ fontFamily: isTamil ? undefined : "'Secular One', sans-serif" }}
                    >
                      {t('templePrefix')}
                    </h4>
                    <h1 
                      className={`font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] mb-0.5 sm:mb-1.5 text-[#990000] tracking-wide uppercase ${isTamil ? 'font-tamil' : ''}`}
                      style={{ 
                        textShadow: '2.5px 2.5px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 4px 4px 0 #d4af37, 6px 6px 12px rgba(0,0,0,0.35)',
                        fontWeight: 900,
                        fontFamily: isTamil ? undefined : "'Secular One', sans-serif"
                      }}
                    >
                      {t('templeName')}
                    </h1>
                    <h2 
                      className={`font-extrabold text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#111] tracking-wide leading-tight uppercase ${isTamil ? 'font-tamil' : ''}`}
                      style={{
                        textShadow: '2px 2px 0 #fff, -1.5px -1.5px 0 #fff, 2.5px 2.5px 0 #d4af37, 4px 4px 8px rgba(0,0,0,0.25)',
                        fontWeight: 800,
                        fontFamily: isTamil ? undefined : "'Secular One', sans-serif"
                      }}
                    >
                      {t('templeSuffix')}
                    </h2>
                  </div>
                </StaggerItem>
                
                {/* Location */}
                <StaggerItem className="flex items-center mt-1.5 sm:mt-2 mb-1.5 sm:mb-2">
                  <i className="fas fa-map-marker-alt text-[#8B0000] text-sm sm:text-base md:text-lg lg:text-xl mr-2.5 shrink-0"></i>
                  <span className={`text-gray-800 font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-tight ${isTamil ? 'font-tamil' : ''}`}>
                    {t('heroLocation')}
                  </span>
                </StaggerItem>

                {/* Blessing */}
                <StaggerItem className="flex items-center w-full max-w-2xl mb-2.5 sm:mb-4">
                  <span className={`text-[#855e00] font-semibold text-xs sm:text-sm md:text-base lg:text-lg flex items-center gap-2 opacity-95 leading-normal ${isTamil ? 'font-tamil' : ''}`}>
                    <span className="text-[#d4af37] font-bold text-sm sm:text-base">✦</span>
                    <span>{t('heroBlessing')}</span>
                    <span className="text-[#d4af37] font-bold text-sm sm:text-base">✦</span>
                  </span>
                </StaggerItem>
                
                {/* Call-to-action buttons */}
                <StaggerItem className="flex flex-row items-center gap-3 sm:gap-4 md:gap-5 mt-1.5 sm:mt-2">
                  <a 
                    href="/pooja" 
                    className={`bg-[#8B0000] text-white px-4 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-xl font-bold hover:bg-[#690000] transition-all shadow-md hover:shadow-xl flex items-center justify-center text-sm sm:text-base md:text-lg whitespace-nowrap shrink-0 ${isTamil ? 'font-tamil' : ''}`}
                  >
                    <img src="/images/info-icons/om.png" alt="Ornament" className="h-4 sm:h-5 md:h-6 w-auto mr-2 sm:mr-2.5 object-contain drop-shadow" />
                    <span>{t('bookArchana')}</span>
                  </a>
                  <a 
                    href="#donation" 
                    className={`bg-[#facc15] text-[#8B0000] px-4 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-xl font-bold hover:bg-[#eab308] transition-all shadow-md hover:shadow-xl flex items-center justify-center text-sm sm:text-base md:text-lg whitespace-nowrap shrink-0 ${isTamil ? 'font-tamil' : ''}`}
                  >
                    <i className="fas fa-heart text-[#8B0000] mr-2 sm:mr-2.5 text-sm sm:text-base md:text-lg"></i>
                    <span>{t('makeDonation')}</span>
                  </a>
                </StaggerItem>

              </div>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
