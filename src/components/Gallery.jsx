import React, { useState, useEffect, useRef } from 'react';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';
import { fallbackGalleryItems, formatDisplayDate } from './GalleryPage';
import { useLanguage } from '../context/LanguageContext';

const defaultDarshanData = {
  title: 'தரிசன காணொளி',
  title_en: 'Darshan Videos',
  description: 'அம்மனின் சிறப்பு அலங்காரங்கள் மற்றும் திருவிழா நிகழ்வுகளைக் கண்டு தரிசனம் செய்யுங்கள்.',
  description_en: 'Witness divine alankaram and festival celebrations of Amman.',
  videos: []
};

const formatLocalizedDate = (dateStr, lang) => {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split('-');
    if (lang === 'en') {
      const monthsEn = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return `${parseInt(d, 10)} ${monthsEn[parseInt(m, 10) - 1] || m} ${y}`;
    }
    const monthsTamil = [
      'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்',
      'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'
    ];
    const monthName = monthsTamil[parseInt(m, 10) - 1] || m;
    return `${parseInt(d, 10)} ${monthName} ${y}`;
  }
  return dateStr;
};

const Gallery = () => {
  const { t, language, isTamil, isEnglish } = useLanguage();

  const getSpecialImages = (items) => {
    const special = items.filter(item => item.category === 'சிறப்பு பூஜை' || item.category === 'Special Pooja');
    return special.length > 0 ? special.slice(0, 6) : items.slice(0, 6);
  };

  const [galleryItems, setGalleryItems] = useState(getSpecialImages(fallbackGalleryItems));
  const [darshanVideosData, setDarshanVideosData] = useState(defaultDarshanData);
  const videoScrollRef = useRef(null);

  const scrollVideos = (direction) => {
    if (videoScrollRef.current) {
      const scrollAmount = direction === 'left' ? -460 : 460;
      videoScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setGalleryItems(getSpecialImages(data.data));
        }
      })
      .catch(err => console.error("Failed to load gallery:", err));

    fetch('/api/darshan-videos')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && Array.isArray(data.data.videos) && data.data.videos.length > 0) {
          setDarshanVideosData(data.data);
        }
      })
      .catch(err => console.warn("Failed to load darshan videos:", err));
  }, []);

  const videoSectionTitle = isEnglish
    ? (darshanVideosData.title_en || t('darshanVideoTitle'))
    : (darshanVideosData.title || t('darshanVideoTitle'));

  const videoSectionDesc = isEnglish
    ? (darshanVideosData.description_en || t('darshanVideoDesc'))
    : (darshanVideosData.description || t('darshanVideoDesc'));

  return (
    <section id="gallery" className="py-12 bg-[#FFF9E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <AnimatedSection className="relative flex items-center justify-center mb-10 mt-4">
          {/* Decorative horizontal line */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/60 to-[#d4af37]/10 z-0"></div>
          
          {/* Centered Title */}
          <div className="relative z-10 px-4 sm:px-6 flex items-center bg-[#FFF9E6]">
            <img src="/images/info-icons/om.png" alt="Ornament" className="h-5 sm:h-8 md:h-10 w-auto mr-1.5 sm:mr-4 object-contain shrink-0" />
            <h3 className={`font-bold m-0 text-[#8B0000] text-xl sm:text-2xl md:text-3xl tracking-wide text-center ${isTamil ? 'font-tamil' : ''}`}>{t('galleryTitle')}</h3>
            <img src="/images/info-icons/om.png" alt="Ornament" className="h-5 sm:h-8 md:h-10 w-auto ml-1.5 sm:mr-4 object-contain -scale-x-100 shrink-0" />
          </div>
          
          {/* Right aligned 'View All' link */}
          <div className="absolute right-0 z-10 pl-4 bg-[#FFF9E6] hidden md:block">
            <a href="/gallery" className={`no-underline font-bold flex items-center text-[#a05a2c] hover:text-[#8B0000] transition-colors text-sm md:text-base ${isTamil ? 'font-tamil' : ''}`}>
              {t('viewAll')} <i className="fas fa-chevron-right ml-2 text-xs"></i>
            </a>
          </div>
        </AnimatedSection>

        {/* Mobile 'View All' link (centered) */}
        <div className="flex justify-center mb-6 md:hidden">
            <a href="/gallery" className={`no-underline font-bold flex items-center text-[#a05a2c] hover:text-[#8B0000] transition-colors text-xs sm:text-sm ${isTamil ? 'font-tamil' : ''}`}>
              {t('viewAll')} <i className="fas fa-chevron-right ml-1.5 text-xs"></i>
            </a>
        </div>

        {/* Image Grid / Centered Cards */}
        <StaggerContainer
          key={galleryItems[0]?.image}
          className={
            galleryItems.length >= 6
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 justify-items-center"
              : "flex flex-wrap justify-center gap-4 sm:gap-6"
          }
          delayChildren={0.2}
          staggerChildren={0.1}
        >
          {galleryItems.map((item, index) => {
            const coverImg = (Array.isArray(item.images) && item.images.length > 0) ? item.images[0] : item.image;
            const photoCount = Array.isArray(item.images) ? item.images.length : (item.image ? 1 : 0);
            const displayDate = formatDisplayDate(item.date);
            const itemTitle = isEnglish && item.title_en ? item.title_en : item.title;

            return (
              <StaggerItem
                key={item.id || item.image || index}
                className={
                  galleryItems.length >= 6
                    ? "w-full"
                    : "w-[calc(50%-0.625rem)] sm:w-56 md:w-64 max-w-[280px]"
                }
              >
                <a href={`/gallery?image=${index}`} className="relative rounded-2xl overflow-hidden shadow-lg border border-[#d4af37]/30 group aspect-[4/5] cursor-pointer h-full block hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <img 
                    src={coverImg} 
                    alt={itemTitle || `Temple Gallery ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />

                  {/* Multi-photo badge */}
                  {photoCount > 1 && (
                    <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow z-10">
                      <i className="fas fa-images text-[9px] text-[#f6c026]" />
                      <span>{photoCount}</span>
                    </div>
                  )}

                  {/* Overlay with title & date (always visible, no hover needed) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3 text-white pointer-events-none">
                    <span className={`text-xs font-bold line-clamp-1 drop-shadow-sm ${isTamil ? 'font-tamil' : ''}`}>{itemTitle}</span>
                    {displayDate && (
                      <span className={`text-[10px] text-[#f6c026] flex items-center gap-1 mt-0.5 font-medium ${isTamil ? 'font-tamil' : ''}`}>
                        <i className="far fa-calendar-alt text-[9px]" /> {displayDate}
                      </span>
                    )}
                  </div>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Video Section at the Bottom */}
        <div className="mt-14 sm:mt-20 text-center relative w-full mx-auto">
          <AnimatedSection className="relative flex items-center justify-center mb-3 sm:mb-4">
            {/* Decorative horizontal line */}
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/60 to-[#d4af37]/10 z-0"></div>

            {/* Centered Title with matching ornaments */}
            <div className="relative z-10 px-4 sm:px-6 flex items-center bg-[#FFF9E6]">
              <img src="/images/info-icons/om.png" alt="Ornament" className="h-5 sm:h-8 md:h-10 w-auto mr-1.5 sm:mr-4 object-contain shrink-0" />
              <h2 className={`font-bold m-0 text-[#8B0000] text-xl sm:text-2xl md:text-3xl tracking-wide text-center ${isTamil ? 'font-tamil' : ''}`}>
                {videoSectionTitle}
              </h2>
              <img src="/images/info-icons/om.png" alt="Ornament" className="h-5 sm:h-8 md:h-10 w-auto ml-1.5 sm:mr-4 object-contain -scale-x-100 shrink-0" />
            </div>
          </AnimatedSection>

          <p className={`text-[#a05a2c] text-xs sm:text-sm md:text-base mb-6 sm:mb-8 px-2 max-w-2xl mx-auto ${isTamil ? 'font-tamil' : ''}`}>
            {videoSectionDesc}
          </p>

          {/* Single Row Horizontal Scroll Carousel with Navigation Arrows */}
          <div className="relative group/carousel px-1 sm:px-3">
            {/* Scroll Left Button */}
            <button
              type="button"
              onClick={() => scrollVideos('left')}
              className="absolute -left-2 sm:-left-4 md:-left-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/95 hover:bg-white text-[#8B0000] border-2 border-[#d4af37] shadow-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95"
              title={t('prevVideo')}
              aria-label={t('prevVideo')}
            >
              <i className="fas fa-chevron-left text-sm sm:text-base" />
            </button>

            {/* Scroll Right Button */}
            <button
              type="button"
              onClick={() => scrollVideos('right')}
              className="absolute -right-2 sm:-right-4 md:-right-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/95 hover:bg-white text-[#8B0000] border-2 border-[#d4af37] shadow-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95"
              title={t('nextVideo')}
              aria-label={t('nextVideo')}
            >
              <i className="fas fa-chevron-right text-sm sm:text-base" />
            </button>

            {/* All Videos Same Row with Scroll */}
            <div
              ref={videoScrollRef}
              className="flex gap-6 overflow-x-auto pb-3 pt-2 px-3 snap-x snap-mandatory scroll-smooth no-scrollbar"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {darshanVideosData.videos && darshanVideosData.videos.filter(vid => Boolean(vid?.url)).map((vid, idx) => {
                const formattedDate = formatLocalizedDate(vid.date, language);
                const vidTitle = isEnglish && vid.title_en ? vid.title_en : vid.title;
                const vidDesc = isEnglish
                  ? (vid.description_en || (vid.description === 'திருக்கோவிலில் நடைபெற்ற சிறப்பு பூஜை மற்றும் திருவிழா தரிசனம்.' ? 'Special pooja and festival darshan celebrated at the holy temple.' : vid.description))
                  : vid.description;
                const vidCategory = isEnglish 
                  ? (vid.category === 'சிறப்பு பூஜை' ? t('categorySpecialPooja') : (vid.category_en || vid.category))
                  : vid.category;

                const videoDetailsUrl = `/gallery?video=${encodeURIComponent(vid.id || vid.url)}`;

                return (
                  <div
                    key={vid.id || idx}
                    className="shrink-0 w-[85vw] sm:w-[420px] md:w-[480px] snap-center sm:snap-start flex flex-col rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFDF5] bg-white group text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    {/* Video Player Box - Default Paused with Controls */}
                    <div className="relative aspect-video bg-black w-full overflow-hidden">
                      <video
                        className="w-full h-full object-cover"
                        src={vid.url}
                        autoPlay={false}
                        muted={vid.muted !== false}
                        loop={vid.loop !== false}
                        playsInline
                        controls={true}
                        preload="metadata"
                      />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 pointer-events-none z-10">
                        <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md bg-[#8B0000]">
                          <i className="fas fa-tag text-[10px]" />
                          {vidCategory || t('categorySpecialPooja')}
                        </span>
                      </div>

                      {/* Date Badge */}
                      {formattedDate && (
                        <div className="absolute top-3 right-3 pointer-events-none z-10">
                          <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md bg-black/75 backdrop-blur-xs">
                            <i className="fas fa-calendar-alt text-[10px]" />
                            {formattedDate}
                          </span>
                        </div>
                      )}

                      {/* Quick Details Floating Button */}
                      <a
                        href={videoDetailsUrl}
                        className="absolute bottom-3 right-3 z-10 bg-black/70 hover:bg-[#8B0000] text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 shadow-lg group-hover:scale-105"
                        title={t('viewVideoDetails')}
                      >
                        <i className="fas fa-expand text-[10px]" />
                        <span>{t('viewVideoDetails')}</span>
                      </a>
                    </div>

                    {/* Card Body with Title, Date & Description - Clickable Link to Video Details */}
                    <a
                      href={videoDetailsUrl}
                      className="p-4 flex flex-col flex-1 bg-gradient-to-b from-[#FFFDF5] to-[#FFF9E6] hover:from-[#FFF9E6] hover:to-[#FFF5D5] transition-colors cursor-pointer group/link block"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-[11px] font-bold text-[#8B0000] ${isTamil ? 'font-tamil' : ''}`}>
                          {vidCategory || t('categorySpecialPooja')}
                        </span>
                        {formattedDate && (
                          <span className={`text-[11px] text-[#a05a2c] font-medium ${isTamil ? 'font-tamil' : ''}`}>
                            {formattedDate}
                          </span>
                        )}
                      </div>

                      <h3 className={`font-bold text-base sm:text-lg text-[#8B0000] leading-snug line-clamp-1 group-hover/link:text-[#a05a2c] transition-colors flex items-center justify-between ${isTamil ? 'font-tamil' : ''}`}>
                        <span>{vidTitle}</span>
                        <i className="fas fa-arrow-right text-xs opacity-0 group-hover/link:opacity-100 transition-opacity ml-2 shrink-0 text-[#8B0000]" />
                      </h3>

                      {vidDesc && (
                        <p className={`mt-1.5 text-xs sm:text-sm text-[#4B2E15] leading-relaxed line-clamp-2 ${isTamil ? 'font-tamil' : ''}`}>
                          {vidDesc}
                        </p>
                      )}

                      <div className="mt-3 pt-2.5 border-t border-[#d4af37]/30 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#8B0000] flex items-center gap-1 group-hover/link:translate-x-1 transition-transform">
                          {t('viewVideoDetails')} <i className="fas fa-chevron-right text-[10px]" />
                        </span>
                        <span className="text-[11px] text-[#a05a2c] font-semibold flex items-center gap-1">
                          <i className="fas fa-play-circle" /> HD Darshan
                        </span>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Gallery;
