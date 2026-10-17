import React, { useState, useEffect } from 'react';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

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

const defaultFallbackVideo = {
  id: 'video-1792078903334',
  title: 'நவராத்திரி சிறப்பு பூஜை',
  title_en: 'Navaratri Special Pooja',
  url: '/uploads/darshan-video-1792133771488.mp4',
  autoplay: false,
  loop: true,
  muted: false,
  controls: true,
  category: 'சிறப்பு பூஜை',
  description: 'திருக்கோவிலில் நடைபெற்ற சிறப்பு பூஜை மற்றும் திருவிழா தரிசனம்.',
  description_en: 'Special pooja, divine abhishekam, and sacred festival darshan celebrated at Arulmigu Maha Kaliamman Temple.',
  date: '2026-10-16'
};

const VideoDetailPage = () => {
  const { t, language, isTamil, isEnglish } = useLanguage();
  const [videos, setVideos] = useState([defaultFallbackVideo]);
  const [selectedVideo, setSelectedVideo] = useState(defaultFallbackVideo);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetch('/api/darshan-videos')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && Array.isArray(data.data.videos) && data.data.videos.length > 0) {
          const validVideos = data.data.videos.filter((v) => Boolean(v?.url));
          setVideos(validVideos);

          // Get video id or url from URL search params
          const params = new URLSearchParams(window.location.search);
          const targetKey = params.get('video') || params.get('id');

          if (targetKey) {
            const found = validVideos.find((v) => v.id === targetKey || v.url === targetKey || encodeURIComponent(v.id) === targetKey || encodeURIComponent(v.url) === targetKey);
            if (found) {
              setSelectedVideo(found);
              return;
            }
          }
          setSelectedVideo(validVideos[0]);
        }
      })
      .catch((err) => console.warn('Failed to load videos:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectVideo = (vid) => {
    setSelectedVideo(vid);
    // Update URL query param without full page reload
    const newUrl = `${window.location.pathname}?video=${encodeURIComponent(vid.id || vid.url)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentTitle = isEnglish && selectedVideo.title_en ? selectedVideo.title_en : selectedVideo.title;
  const currentDesc = isEnglish
    ? (selectedVideo.description_en || (selectedVideo.description === 'திருக்கோவிலில் நடைபெற்ற சிறப்பு பூஜை மற்றும் திருவிழா தரிசனம்.' ? 'Special pooja and festival darshan celebrated at the holy temple.' : selectedVideo.description))
    : selectedVideo.description;
  const currentCategory = isEnglish
    ? (selectedVideo.category === 'சிறப்பு பூஜை' ? t('categorySpecialPooja') : (selectedVideo.category_en || selectedVideo.category))
    : selectedVideo.category;
  const formattedDate = formatLocalizedDate(selectedVideo.date, language);

  const otherVideos = videos.filter((v) => (v.id || v.url) !== (selectedVideo.id || selectedVideo.url));

  return (
    <main className="min-h-screen bg-[#FFF9E6] pt-24 sm:pt-28 lg:pt-30 pb-10 sm:pb-12">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header section matching GalleryPage */}
        <AnimatedSection className="mb-3 sm:mb-4 text-center">
          <p className={`${isTamil ? 'font-tamil' : ''} text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#a05a2c]`}>
            {t('videoDetailsSubtitle')}
          </p>
          <h1 className={`mt-1 ${isTamil ? 'font-tamil' : ''} text-2xl sm:text-3xl font-bold tracking-wide text-[#8B0000] md:text-4xl`}>
            {t('videoDetailsTitle')}
          </h1>
          <p className={`mx-auto mt-1 max-w-2xl ${isTamil ? 'font-tamil' : ''} text-xs sm:text-sm leading-5 sm:leading-6 text-[#5e402c]`}>
            {t('videoDetailsDesc')}
          </p>
        </AnimatedSection>

        {/* Back Navigation Bar */}
        <div className="max-w-5xl mx-auto mb-3 sm:mb-4 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <a
              href="/gallery"
              className={`inline-flex items-center gap-2 ${isTamil ? 'font-tamil' : ''} text-xs sm:text-sm font-bold text-[#8B0000] hover:text-[#a05a2c] bg-white/90 border border-[#d4af37]/40 px-3.5 py-1.5 rounded-full shadow-xs transition hover:shadow-md hover:-translate-y-0.5`}
            >
              <i className="fas fa-arrow-left text-xs" />
              <span>{t('backToGallery')}</span>
            </a>
            <a
              href="/#gallery"
              className={`inline-flex items-center gap-1.5 ${isTamil ? 'font-tamil' : ''} text-xs sm:text-sm font-medium text-[#7a4b27] hover:text-[#8B0000] bg-white/70 border border-[#d4af37]/30 px-3 py-1.5 rounded-full shadow-xs transition`}
            >
              <i className="fas fa-home text-xs" />
              <span>{t('backToHome')}</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              type="button"
              className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#8B0000] border border-[#d4af37]/40 px-3 py-1.5 rounded-full text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <i className={`fas ${copied ? 'fa-check text-green-600' : 'fa-link'}`} />
              <span>{copied ? t('copiedLink') : t('copyLink')}</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Details Layout - Same Height & Width, Compact Height */}
        <div className="max-w-5xl mx-auto grid gap-4 sm:gap-5 lg:grid-cols-2 lg:items-stretch">
          
          {/* Left Column: Video Player Card */}
          <div className="flex flex-col h-full">
            <AnimatedSection className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#d4af37]/50 bg-[#1e1107] shadow-xl flex flex-col h-full justify-between group">
              <div className="relative w-full aspect-video flex items-center justify-center bg-black overflow-hidden">
                <video
                  key={selectedVideo.url}
                  src={selectedVideo.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain select-none"
                  poster="/images/hero-bg-latest.png"
                />

                {/* Category Pill Top Left */}
                <div className="absolute top-3 left-3 pointer-events-none z-10">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-lg bg-[#8B0000] border border-white/20 backdrop-blur-xs ${isTamil ? 'font-tamil' : ''}`}>
                    <i className="fas fa-tag text-[9px]" />
                    {currentCategory || t('categorySpecialPooja')}
                  </span>
                </div>

                {/* Date Pill Top Right */}
                {formattedDate && (
                  <div className="absolute top-3 right-3 pointer-events-none z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-lg bg-black/75 backdrop-blur-md border border-white/20">
                      <i className="fas fa-calendar-alt text-[#f6c026] text-[9px]" />
                      {formattedDate}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Decorative Sacred Bar */}
              <div className="bg-gradient-to-r from-[#2d1b0d] via-[#4a2e16] to-[#2d1b0d] px-4 sm:px-5 py-2.5 border-t border-[#d4af37]/30 flex items-center justify-between text-white text-[11px] sm:text-xs shrink-0">
                <span className="flex items-center gap-2 text-[#f6c026] font-semibold truncate">
                  <i className="fas fa-video text-xs" />
                  <span className="truncate">{t('templeTitle')}</span>
                </span>
                <span className="text-gray-300 flex items-center gap-1.5 shrink-0 ml-2">
                  <i className="fas fa-volume-up text-[10px]" />
                  <span>HD Darshan</span>
                </span>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Information Card - Same Height & Width */}
          <div className="flex flex-col h-full">
            <AnimatedSection className="rounded-2xl sm:rounded-3xl border border-[#d4af37]/50 bg-[#FFFDF5] p-4 sm:p-5 shadow-xl flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2 sm:gap-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className={`inline-block rounded-full bg-[#8B0000] px-3 py-0.5 text-xs font-bold text-white shadow-xs ${isTamil ? 'font-tamil' : ''}`}>
                    {currentCategory || t('categorySpecialPooja')}
                  </span>
                  {formattedDate && (
                    <span className={`text-[11px] sm:text-xs text-[#a05a2c] font-semibold flex items-center gap-1 bg-[#FFF9E6] px-2.5 py-0.5 rounded-full border border-[#d4af37]/30 ${isTamil ? 'font-tamil' : ''}`}>
                      <i className="far fa-calendar-alt text-[#8B0000]" />
                      {formattedDate}
                    </span>
                  )}
                </div>

                <h2 className={`text-xl sm:text-2xl font-bold text-[#8B0000] leading-snug ${isTamil ? 'font-tamil' : ''}`}>
                  {currentTitle}
                </h2>

                <div className="h-px bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/50 to-[#d4af37]/10" />

                {/* Description */}
                <div>
                  <h3 className={`text-[11px] uppercase tracking-wider font-bold text-[#a05a2c] mb-1 ${isTamil ? 'font-tamil' : ''}`}>
                    {isEnglish ? 'About This Darshan' : 'தரிசன விபரம்'}
                  </h3>
                  <p className={`text-xs sm:text-sm text-[#5e402c] leading-relaxed ${isTamil ? 'font-tamil' : ''}`}>
                    {currentDesc}
                  </p>
                </div>
              </div>

              {/* Temple Attributes */}
              <div className="bg-[#FFF9E6] rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border border-[#d4af37]/30 flex flex-col gap-2 mt-2.5">
                <div className="flex items-center gap-2 text-xs text-[#5e402c]">
                  <i className="fas fa-map-marker-alt text-[#8B0000] text-xs shrink-0" />
                  <span className="font-semibold truncate">{t('templeAddressVal')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#5e402c]">
                  <i className="fas fa-clock text-[#8B0000] text-xs shrink-0" />
                  <span className="font-semibold truncate">{t('templeTimingsTopBar')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#5e402c]">
                  <i className="fas fa-om text-[#8B0000] text-xs shrink-0" />
                  <span className="font-semibold truncate">{t('heroBlessing')}</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* More Darshan Videos Section */}
        {otherVideos.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <AnimatedSection className="relative flex items-center justify-center mb-6">
              <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/60 to-[#d4af37]/10 z-0"></div>
              <div className="relative z-10 px-4 sm:px-6 flex items-center bg-[#FFF9E6]">
                <img src="/images/info-icons/om.png" alt="Ornament" className="h-5 sm:h-7 w-auto mr-2 sm:mr-3 object-contain shrink-0" />
                <h3 className={`font-bold m-0 text-[#8B0000] text-lg sm:text-2xl tracking-wide text-center ${isTamil ? 'font-tamil' : ''}`}>
                  {t('moreVideos')}
                </h3>
                <img src="/images/info-icons/om.png" alt="Ornament" className="h-5 sm:h-7 w-auto ml-2 sm:mr-3 object-contain -scale-x-100 shrink-0" />
              </div>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherVideos.map((vid, index) => {
                const vidTitle = isEnglish && vid.title_en ? vid.title_en : vid.title;
                const vidFormattedDate = formatLocalizedDate(vid.date, language);
                const vidCategory = isEnglish
                  ? (vid.category === 'சிறப்பு பூஜை' ? t('categorySpecialPooja') : (vid.category_en || vid.category))
                  : vid.category;

                return (
                  <StaggerItem key={vid.id || vid.url || index}>
                    <button
                      type="button"
                      onClick={() => handleSelectVideo(vid)}
                      className="w-full text-left group overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-[#FFFDF5] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
                    >
                      <div className="relative aspect-video bg-black overflow-hidden">
                        <video
                          src={vid.url}
                          preload="metadata"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#8B0000]/90 text-white flex items-center justify-center border-2 border-white/80 shadow-xl group-hover:scale-110 transition-transform">
                            <i className="fas fa-play text-sm ml-0.5" />
                          </div>
                        </div>

                        <div className="absolute top-2.5 left-2.5">
                          <span className="rounded-full bg-[#8B0000] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                            {vidCategory}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between text-[11px] text-[#a05a2c] font-medium mb-1">
                          <span>{vidCategory}</span>
                          {vidFormattedDate && <span>{vidFormattedDate}</span>}
                        </div>
                        <h4 className={`font-bold text-sm sm:text-base text-[#8B0000] line-clamp-1 group-hover:text-[#a05a2c] transition-colors ${isTamil ? 'font-tamil' : ''}`}>
                          {vidTitle}
                        </h4>
                      </div>
                    </button>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        )}
      </div>
    </main>
  );
};

export default VideoDetailPage;
