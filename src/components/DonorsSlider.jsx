import React, { useState, useEffect, useRef } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { defaultDonors } from '../data/donorsData';
import { useLanguage } from '../context/LanguageContext';

const DonorsSlider = () => {
  const { t, isTamil, isEnglish } = useLanguage();
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Mouse drag & animation refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const scrollPosRef = useRef(0);
  const animFrameRef = useRef(null);

  // Duplicated list of donors for seamless non-stop infinite loop
  const displayDonors = [...defaultDonors, ...defaultDonors];

  // Non-stop continuous moving scroll animation
  useEffect(() => {
    let lastTime = performance.now();
    const speed = 45; // 45px per second for smooth, readable continuous scrolling

    const step = (currentTime) => {
      const container = containerRef.current;
      if (!container) return;

      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isPaused && !isDragging.current) {
        const halfWidth = container.scrollWidth / 2;

        if (halfWidth > 0) {
          scrollPosRef.current += speed * delta;

          // Seamless loop: when reaching halfway, wrap back smoothly
          if (scrollPosRef.current >= halfWidth) {
            scrollPosRef.current -= halfWidth;
          }

          container.scrollLeft = scrollPosRef.current;
        }
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPaused]);

  // Sync scroll position on user drag / scroll
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    if (isDragging.current) {
      scrollPosRef.current = container.scrollLeft;
    }
  };

  // Drag-to-scroll handlers for desktop mouse
  const handleMouseDown = (e) => {
    isDragging.current = true;
    setIsPaused(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftStart.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeftStart.current - walk;
    scrollPosRef.current = containerRef.current.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      if (containerRef.current) {
        scrollPosRef.current = containerRef.current.scrollLeft;
      }
    }
    setIsPaused(false);
  };

  return (
    <section id="donors" className="py-14 bg-[#FFF9E6] relative overflow-hidden">
      {/* Subtle temple background mandala accents */}
      <div className="absolute -top-20 -left-20 w-72 h-72 opacity-5 pointer-events-none">
        <img src="/images/mandala-bg.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 opacity-5 pointer-events-none">
        <img src="/images/mandala-bg.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <AnimatedSection className="relative flex items-center justify-center mb-10 mt-2">
          {/* Decorative horizontal gold line */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/60 to-[#d4af37]/10 z-0"></div>
          
          {/* Centered Title */}
          <div className="relative z-10 px-4 sm:px-6 flex items-center bg-[#FFF9E6]">
            <h2 className={`text-xl sm:text-3xl md:text-4xl font-bold text-[#8B0000] flex items-center justify-center tracking-wide text-center ${isTamil ? 'font-tamil' : ''}`}>
              <img src="/images/info-icons/om.png" alt="Ornament" className="h-5 sm:h-8 md:h-10 w-auto mr-1.5 sm:mr-4 object-contain shrink-0" />
              {t('donorsTitle')}
              <img src="/images/info-icons/om.png" alt="Ornament" className="h-5 sm:h-8 md:h-10 w-auto ml-1.5 sm:mr-4 object-contain -scale-x-100 shrink-0" />
            </h2>
          </div>
        </AnimatedSection>

        {/* Continuous Non-Stop Moving Slider Wrapper */}
        <div 
          className="relative w-full mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            setIsPaused(false);
            if (containerRef.current) {
              scrollPosRef.current = containerRef.current.scrollLeft;
            }
          }}
        >
          {/* Cards Horizontal Scrolling Row */}
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto py-4 px-2 select-none cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {displayDonors.map((item, index) => {
              const donorName = isEnglish && item.name_en ? item.name_en : item.name;
              const donorLocation = isEnglish && item.location_en ? item.location_en : item.location;
              const donorPurpose = isEnglish && item.purpose_en ? item.purpose_en : item.purpose;
              const donorBlessing = isEnglish && item.blessing_en ? item.blessing_en : item.blessing;
              const donorDate = isEnglish && item.date_en ? item.date_en : item.date;

              return (
                <div 
                  key={`donor-${item.id}-${index}`}
                  data-donor-card
                  className="w-[260px] sm:w-[310px] md:w-[330px] flex-shrink-0 bg-[#FFFDF5] rounded-3xl border border-[#d4af37]/35 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col group relative"
                >
                    {/* Card Header with Sacred Crimson Gradient */}
                    <div className="bg-gradient-to-r from-[#8B0000] via-[#9E0B0B] to-[#7A0000] p-5 text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full -ml-4 -mb-4 pointer-events-none"></div>

                      {/* Sacred Avatar Ring */}
                      <div className="w-16 h-16 bg-gradient-to-br from-[#FFF5D5] to-[#f6c026] rounded-full mx-auto flex items-center justify-center mb-2.5 shadow-md border-2 border-white/80 group-hover:scale-105 transition-transform duration-300">
                        <i className={`fas ${item.icon || 'fa-praying-hands'} text-[#8B0000] text-2xl`}></i>
                      </div>

                      {/* Donor Name */}
                      <h3 className={`text-white font-bold text-lg line-clamp-1 drop-shadow-sm px-1 ${isTamil ? 'font-tamil' : ''}`}>
                        {donorName}
                      </h3>

                      {/* Location Tag */}
                      <div className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-0.5 rounded-full mt-1.5 border border-white/15">
                        <i className="fas fa-map-marker-alt text-[#FFD700] text-xs"></i>
                        <span className={`text-[#FFF0C2] text-xs font-medium ${isTamil ? 'font-tamil' : ''}`}>{donorLocation}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between text-center relative bg-gradient-to-b from-[#FFFDF5] to-[#FFF9E6]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFFDF5] border border-[#d4af37]/40 w-6 h-6 rounded-full flex items-center justify-center text-[#d4af37] shadow-sm">
                        <i className="fas fa-star text-[10px]"></i>
                      </div>

                      {/* Donation Amount */}
                      <div className="mt-1 mb-4 bg-gradient-to-r from-[#FFF5D5] via-[#FFF9E6] to-[#FFF5D5] border border-[#d4af37]/30 rounded-2xl py-2.5 px-3 shadow-inner">
                        <p className={`text-[#7A4B1F] text-xs font-semibold uppercase tracking-wider mb-0.5 ${isTamil ? 'font-tamil' : ''}`}>
                          {t('donationAmountLabel')}
                        </p>
                        <p className="text-2xl md:text-3xl font-black text-[#8B0000] tracking-tight font-sans flex items-center justify-center gap-1">
                          <span>{item.amount}</span>
                        </p>
                      </div>

                      {/* Purpose Box */}
                      <div className="bg-white/80 rounded-xl p-3 mb-3 border border-[#d4af37]/20 shadow-sm flex items-center justify-between px-4">
                        <span className={`text-gray-500 text-xs ${isTamil ? 'font-tamil' : ''}`}>{t('purposeLabel')}</span>
                        <span className={`text-[#8B0000] font-bold text-sm flex items-center gap-1.5 ${isTamil ? 'font-tamil' : ''}`}>
                          <i className="fas fa-hand-holding-heart text-[#d4af37] text-xs"></i>
                          {donorPurpose}
                        </span>
                      </div>

                      {/* Date & Blessing Footer */}
                      <div className="pt-2 border-t border-[#d4af37]/20 flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <i className="far fa-calendar-alt text-[#B8860B]"></i>
                          <span className={isTamil ? 'font-tamil' : ''}>{donorDate}</span>
                        </div>
                        <span className={`text-[#B8860B] font-semibold text-[11px] bg-[#FFF0C2] px-2 py-0.5 rounded-md ${isTamil ? 'font-tamil' : ''}`}>
                          {donorBlessing}
                        </span>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/donors"
            className={`inline-flex items-center gap-2 bg-[#FFFDF5] border border-[#d4af37] text-[#8B0000] hover:bg-[#8B0000] hover:text-white font-bold text-sm md:text-base py-2.5 px-6 rounded-full shadow-sm hover:shadow-md transition-all duration-300 ${isTamil ? 'font-tamil' : ''}`}
          >
            <i className="fas fa-users text-xs text-[#d4af37]"></i>
            <span>{t('allDonorsList')}</span>
            <i className="fas fa-angle-right text-xs"></i>
          </a>

          <a
            href="/#donation"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('donation')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] hover:from-[#aa8c2c] hover:to-[#d4af37] text-white font-bold text-sm md:text-base py-2.5 px-6 rounded-full shadow-sm hover:shadow-md transition-all duration-300 ${isTamil ? 'font-tamil' : ''}`}
          >
            <i className="fas fa-heart text-xs text-[#FFF0C2]"></i>
            <span>{t('donateNow')}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default DonorsSlider;
