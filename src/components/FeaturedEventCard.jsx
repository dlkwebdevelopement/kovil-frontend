import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

const formatTimingForCard = (timeStr, isEnglish) => {
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

const FeaturedEventCard = ({
  events = null,
  day = '18',
  month = 'மே',
  image = '/images/hero-bg-latest.png',
  title = 'பௌர்ணமி',
  subtitle = 'திருவிளக்கு பூஜை',
  time = 'இன்று மாலை 6:30 மணிக்கு நடைபெறுகிறது.',
  panchangamDetails = null,
  isTodayOnly = false,
}) => {
  const { t, isTamil, isEnglish } = useLanguage();

  // Normalize into an array of events
  const eventList = Array.isArray(events) && events.length > 0
    ? events
    : [
        {
          day,
          month,
          image,
          title,
          subtitle,
          time,
          panchangamDetails,
          isTodayOnly,
        },
      ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const hasMultiple = eventList.length > 1;

  // Smooth slide change with transition animation
  const changeSlide = useCallback((nextIndex) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setAnimating(false);
    }, 280);
  }, [animating]);

  const handleNext = useCallback(() => {
    changeSlide((currentIndex + 1) % eventList.length);
  }, [changeSlide, currentIndex, eventList.length]);

  const handlePrev = useCallback(() => {
    changeSlide((currentIndex - 1 + eventList.length) % eventList.length);
  }, [changeSlide, currentIndex, eventList.length]);

  // Auto-move slider every 4.5 seconds with smooth animation (pauses on hover)
  useEffect(() => {
    if (!hasMultiple || isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [hasMultiple, isPaused, handleNext]);

  // Keep index within bounds if eventList changes
  useEffect(() => {
    if (currentIndex >= eventList.length) {
      setCurrentIndex(0);
    }
  }, [eventList.length, currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const current = eventList[currentIndex] || eventList[0];
  const activePanchangam = current.panchangamDetails || panchangamDetails;

  const displayTitle = isEnglish && current.title_en ? current.title_en : (current.isTodayOnly ? t('todayHighlights') : current.title);
  const displaySubtitle = isEnglish && current.subtitle_en ? current.subtitle_en : (current.isTodayOnly ? t('todayLabel') : current.subtitle);
  const displayTime = formatTimingForCard(current.time, isEnglish);

  return (
    <div
      className="p-4 sm:p-8 md:p-10 h-full relative flex flex-col justify-center overflow-hidden transition-transform hover:-translate-y-1 duration-300 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative frame borders */}
      <div className="absolute inset-0 m-[3%] bg-white border-[1.5px] border-[#c0973a] rounded-xl pointer-events-none shadow-sm"></div>

      <div
        className="absolute inset-0 pointer-events-none bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/images/today-card-border.png')",
          backgroundSize: '100% 100%',
        }}
      ></div>

      <div className="flex z-10 relative h-full items-center pt-2 overflow-hidden">
        {/* Left Side: Content */}
        <div className={`flex-1 min-w-0 flex flex-col justify-center relative z-20 pr-2 ${isTamil ? 'font-tamil' : ''}`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-bold text-[#8B0000] text-lg drop-shadow-sm m-0">
              {t('todayAuspiciousDay')}
            </h5>
          </div>

          {/* Animated Slide Content */}
          <div
            className={`transition-all duration-300 ease-in-out transform ${
              animating
                ? 'opacity-0 translate-x-2 scale-[0.98]'
                : 'opacity-100 translate-x-0 scale-100'
            }`}
          >
            {/* Title Pill */}
            {!current.isTodayOnly && (
              <div className="flex items-center mb-3 bg-white/70 backdrop-blur-sm p-1.5 pr-4 rounded-full shadow-sm max-w-full border border-gray-100">
                <div className="rounded-full bg-gray-50 flex items-center justify-center mr-3 w-8 h-8 shadow-inner border border-gray-100 flex-shrink-0">
                  <i className="fas fa-moon text-gray-500 text-lg"></i>
                </div>
                <h4 className="font-bold m-0 text-[#8B0000] text-base md:text-lg leading-snug truncate">
                  {displayTitle}
                </h4>
              </div>
            )}

            {/* Subtitle */}
            {!current.isTodayOnly && (
              <h5 className="font-bold mb-1.5 text-[#4B2E15] text-base md:text-lg drop-shadow-sm line-clamp-1">
                {displaySubtitle}
              </h5>
            )}

            {/* Time */}
            {displayTime && !current.isTodayOnly && (
              <p className="text-xs md:text-sm text-gray-700 font-bold leading-relaxed mb-3 drop-shadow-sm flex items-center gap-1.5">
                <i className="far fa-clock text-[#a05a2c] text-xs" />
                <span>{displayTime}</span>
              </p>
            )}

            {/* Panchangam Details (Daily info) */}
            {activePanchangam && (
              <div className="mb-4 space-y-1.5 text-xs font-bold bg-[#fffdf5] p-2.5 rounded-lg border border-[#d4af37]/30 shadow-inner">
                <div className="flex items-start gap-2 text-[#4B2E15] mb-1 pb-1 border-b border-[#d4af37]/20">
                  <i className="fas fa-calendar-alt mt-0.5 text-[#a05a2c]"></i>
                  <span>
                    {t('dateLabel')}{' '}
                    <span className="font-normal">
                      {activePanchangam.tamil_month} {activePanchangam.tamil_date},{' '}
                      {activePanchangam.weekday}
                    </span>
                  </span>
                </div>
                {activePanchangam.nalla_neram && (
                  <div className="flex items-start gap-2 text-[#2f7d5a]">
                    <i className="fas fa-check-circle mt-0.5"></i>
                    <span>
                      {t('auspiciousTimeLabel')}{' '}
                      <span className="font-normal">
                        {activePanchangam.nalla_neram.split(';')[0]}
                      </span>
                    </span>
                  </div>
                )}
                {activePanchangam.rahu_kalam && (
                  <div className="flex items-start gap-2 text-[#8B0000]">
                    <i className="fas fa-times-circle mt-0.5"></i>
                    <span>
                      {t('rahuKalamLabel')}{' '}
                      <span className="font-normal">{activePanchangam.rahu_kalam}</span>
                    </span>
                  </div>
                )}
                {activePanchangam.yamagandam && (
                  <div className="flex items-start gap-2 text-[#8B0000]">
                    <i className="fas fa-times-circle mt-0.5"></i>
                    <span>
                      {t('yamagandamLabel')}{' '}
                      <span className="font-normal">{activePanchangam.yamagandam}</span>
                    </span>
                  </div>
                )}
                {activePanchangam.kuligai && (
                  <div className="flex items-start gap-2 text-[#b06a00]">
                    <i className="fas fa-clock mt-0.5"></i>
                    <span>
                      {t('kuligaiLabel')}{' '}
                      <span className="font-normal">{activePanchangam.kuligai}</span>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Action Button & Navigation Dots */}
            <div className="flex items-center justify-between gap-3">
              {!current.isTodayOnly && (
                <a
                  href="/events"
                  className="inline-block text-white rounded-md px-5 py-2 font-bold bg-[#8B0000] hover:bg-[#690000] transition-colors text-xs shadow-md"
                >
                  {t('learnMore')}
                </a>
              )}

              {/* Slider Dots */}
              {hasMultiple && (
                <div className="flex items-center gap-1.5 ml-auto">
                  {eventList.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => changeSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentIndex
                          ? 'w-5 bg-[#8B0000]'
                          : 'w-2 bg-[#d4af37]/45 hover:bg-[#d4af37]'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Image with Transition Animation */}
        <div className="w-4/12 flex justify-end shrink-0 pl-1">
          <div
            onClick={hasMultiple ? handleNext : undefined}
            title={hasMultiple ? t('nextEventClick') : undefined}
            className={`h-32 w-20 sm:h-36 sm:w-24 md:h-48 md:w-32 lg:h-52 lg:w-36 rounded-xl overflow-hidden shadow-md border-2 border-white/80 bg-stone-100 relative transition-transform duration-300 ${
              hasMultiple ? 'cursor-pointer hover:scale-[1.03] active:scale-95' : ''
            }`}
          >
            <img
              src={current.image || '/images/hero-bg-latest.png'}
              alt={displayTitle}
              className={`h-full w-full object-cover transition-all duration-500 ease-out ${
                animating ? 'opacity-30 scale-105 blur-[1px]' : 'opacity-100 scale-100 blur-0'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEventCard;
