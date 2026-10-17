import React, { useEffect, useState, useMemo } from 'react';
import { StaggerContainer, StaggerItem } from './AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const tamilMonths = [
  'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்',
  'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'
];

const englishMonths = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const tamilWeekdays = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];
const englishWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const formatTimingForLang = (timingStr, lang) => {
  if (!timingStr) return '';
  if (lang === 'ta') return timingStr;

  // Convert Tamil time strings like "காலை 5:30 மணி" -> "5:30 AM", "இரவு 8:30 மணி" -> "8:30 PM"
  let formatted = timingStr;
  if (/காலை/i.test(formatted)) {
    const timeMatch = formatted.match(/\d{1,2}:\d{2}/);
    return timeMatch ? `${timeMatch[0]} AM` : formatted.replace(/காலை/g, 'Morning').replace(/மணி/g, '').trim();
  }
  if (/பகல்|மதியம்/i.test(formatted)) {
    const timeMatch = formatted.match(/\d{1,2}:\d{2}/);
    return timeMatch ? `${timeMatch[0]} PM` : formatted.replace(/பகல்|மதியம்/g, 'Noon').replace(/மணி/g, '').trim();
  }
  if (/இரவு|மாலை/i.test(formatted)) {
    const timeMatch = formatted.match(/\d{1,2}:\d{2}/);
    return timeMatch ? `${timeMatch[0]} PM` : formatted.replace(/இரவு/g, 'Night').replace(/மாலை/g, 'Evening').replace(/மணி/g, '').trim();
  }
  return formatted;
};

const InfoCards = () => {
  const { t, language, isTamil } = useLanguage();
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [timings, setTimings] = useState({
    openTime: "காலை 5:30 மணி",
    morningPooja: "காலை 8:00 மணி",
    noonPooja: "பகல் 12:00 மணி",
    nightPooja: "இரவு 8:30 மணி"
  });

  useEffect(() => {
    // Fetch timings
    fetch('/api/timings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setTimings(data.data);
        }
      })
      .catch(err => console.error('Error fetching timings:', err));

    const interval = window.setInterval(() => setCurrentDate(new Date()), 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  const displayDate = useMemo(() => {
    const d = currentDate.getDate();
    const mIdx = currentDate.getMonth();
    const y = currentDate.getFullYear();
    const wIdx = currentDate.getDay();

    if (language === 'en') {
      return {
        date: `${englishMonths[mIdx]} ${d}, ${y}`,
        weekday: englishWeekdays[wIdx]
      };
    }

    return {
      date: `${d} ${tamilMonths[mIdx]} ${y}`,
      weekday: `${tamilWeekdays[wIdx]} கிழமை`
    };
  }, [currentDate, language]);

  return (
    <section className="relative z-20 pt-6 sm:pt-8 pb-10 sm:pb-12 bg-[#fff9e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4" delayChildren={0.2} staggerChildren={0.1}>
          
          {/* Card 1 */}
          <StaggerItem
            className="p-2.5 flex items-center gap-2 transition-transform hover:-translate-y-1 duration-300 bg-transparent bg-no-repeat"
            style={{ backgroundImage: "url('/images/info-card-border.png')", backgroundSize: '100% 100%' }}
          >
            <div className="flex-shrink-0 w-16 lg:w-20 text-center">
              <img src="/images/info-icons/ChatGPT_Image_Aug_3__2026__04_07_28_PM-removebg-preview.png" alt={t('templeOpenTime')} className="w-16 h-16 object-contain mx-auto" />
            </div>
            <div className={`text-left ${isTamil ? 'font-tamil' : ''}`}>
              <div className="mb-1 font-bold text-[#a05a2c] text-sm">{t('templeOpenTime')}</div>
              <div className="font-bold text-[#4B2E15] text-base">{formatTimingForLang(timings.openTime, language)}</div>
            </div>
          </StaggerItem>

          {/* Card 2 */}
          <StaggerItem
            className="p-2.5 flex items-center gap-2 transition-transform hover:-translate-y-1 duration-300 bg-transparent bg-no-repeat"
            style={{ backgroundImage: "url('/images/info-card-border.png')", backgroundSize: '100% 100%' }}
          >
            <div className="flex-shrink-0 w-16 lg:w-20 text-center">
              <img src="/images/info-icons/poojai icon.png" alt={t('morningPooja')} className="w-16 h-16 object-contain mx-auto" />
            </div>
            <div className={`text-left ${isTamil ? 'font-tamil' : ''}`}>
              <div className="mb-1 font-bold text-[#a05a2c] text-sm">{t('morningPooja')}</div>
              <div className="font-bold text-[#4B2E15] text-base">{formatTimingForLang(timings.morningPooja, language)}</div>
            </div>
          </StaggerItem>

          {/* Card 3 */}
          <StaggerItem
            className="p-2.5 flex items-center gap-2 transition-transform hover:-translate-y-1 duration-300 bg-transparent bg-no-repeat"
            style={{ backgroundImage: "url('/images/info-card-border.png')", backgroundSize: '100% 100%' }}
          >
            <div className="flex-shrink-0 w-16 lg:w-20 text-center">
              <img src="/images/info-icons/ChatGPT_Image_Aug_3__2026__05_24_52_PM-removebg-preview.png" alt={t('noonPooja')} className="w-16 h-16 object-contain mx-auto" />
            </div>
            <div className={`text-left ${isTamil ? 'font-tamil' : ''}`}>
              <div className="mb-1 font-bold text-[#a05a2c] text-sm">{t('noonPooja')}</div>
              <div className="font-bold text-[#4B2E15] text-base">{formatTimingForLang(timings.noonPooja, language)}</div>
            </div>
          </StaggerItem>

          {/* Card 4 */}
          <StaggerItem
            className="p-2.5 flex items-center gap-2 transition-transform hover:-translate-y-1 duration-300 bg-transparent bg-no-repeat"
            style={{ backgroundImage: "url('/images/info-card-border.png')", backgroundSize: '100% 100%' }}
          >
            <div className="flex-shrink-0 w-16 lg:w-20 text-center">
              <img src="/images/info-icons/ChatGPT_Image_Aug_3__2026__04_08_31_PM-removebg-preview.png" alt={t('nightPooja')} className="w-16 h-16 object-contain mx-auto" />
            </div>
            <div className={`text-left ${isTamil ? 'font-tamil' : ''}`}>
              <div className="mb-1 font-bold text-[#a05a2c] text-sm">{t('nightPooja')}</div>
              <div className="font-bold text-[#4B2E15] text-base">{formatTimingForLang(timings.nightPooja, language)}</div>
            </div>
          </StaggerItem>

          {/* Card 5 */}
          <StaggerItem
            className="p-2.5 flex items-center gap-2 transition-transform hover:-translate-y-1 duration-300 bg-transparent bg-no-repeat"
            style={{ backgroundImage: "url('/images/info-card-border.png')", backgroundSize: '100% 100%' }}
          >
            <div className="flex-shrink-0 w-16 lg:w-20 text-center">
              <img src="/images/info-icons/calender.png" alt={t('todayDate')} className="w-16 h-16 object-contain mx-auto" />
            </div>
            <div className={`text-left ${isTamil ? 'font-tamil' : ''}`}>
              <div className="mb-1 font-bold text-[#a05a2c] text-sm">{t('todayDate')}</div>
              <div className="font-bold text-[#4B2E15] text-base leading-tight">
                {displayDate.date}<br />
                <span className="text-sm font-normal">{displayDate.weekday}</span>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>

      </div>
    </section>
  );
};

export default InfoCards;
