import React, { useState, useEffect } from 'react';
import { StaggerContainer, StaggerItem } from './AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const Announcements = () => {
  const { t, isTamil, isEnglish } = useLanguage();
  const [announcements, setAnnouncements] = useState([]);
  const [annadhanam, setAnnadhanam] = useState('செவ்வாய், வெள்ளி, பௌர்ணமி, அமாவாசை அன்று நடைபெறுகிறது.');
  const [annadhanamEn, setAnnadhanamEn] = useState('');
  const [annadhanamImage, setAnnadhanamImage] = useState('');

  useEffect(() => {
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          if (data.data.announcements?.length) {
            setAnnouncements(data.data.announcements);
          }
          if (data.data.annadhanam) {
            setAnnadhanam(data.data.annadhanam);
          }
          if (data.data.annadhanam_en) {
            setAnnadhanamEn(data.data.annadhanam_en);
          }
          if (data.data.annadhanamImage) {
            setAnnadhanamImage(data.data.annadhanamImage);
          }
        }
      })
      .catch(err => console.error("Failed to load announcements:", err));
  }, []);

  const displayAnnadhanam = isEnglish 
    ? (annadhanamEn || (annadhanam === 'செவ்வாய், வெள்ளி, பௌர்ணமி, அமாவாசை அன்று நடைபெறுகிறது.' ? t('annadhanamDefault') : annadhanam))
    : annadhanam;

  return (
    <section className="py-12 bg-[#FFF9E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6" delayChildren={0.2} staggerChildren={0.2}>
          
          {/* Left Card: Announcements */}
          <StaggerItem 
            className="bg-[length:100%_100%] bg-no-repeat relative"
            style={{ backgroundImage: 'url(/images/announcements-bg.png)' }}
          >
            {/* Pad the inner content to strictly stay inside the parchment area */}
            <div className="relative z-10 pl-[18%] pr-[16%] pt-[28%] sm:pt-[25%] md:pt-[22%] pb-[18%] flex flex-col justify-start md:justify-center h-full min-h-[320px] sm:min-h-[350px]">
              <div className="flex items-center mb-2 sm:mb-4 justify-center">
                <i className="fas fa-bell text-[#8B0000] text-sm sm:text-xl md:text-2xl mr-2 sm:mr-3"></i>
                <h3 className={`font-bold text-[#8B0000] text-base sm:text-2xl lg:text-3xl m-0 drop-shadow-sm ${isTamil ? 'font-tamil' : ''}`}>{t('announcementsTitle')}</h3>
              </div>
            
              <ul className={`space-y-1.5 sm:space-y-3 text-[#4B2E15] font-bold text-xs sm:text-sm md:text-base mx-auto ${isTamil ? 'font-tamil' : ''}`}>
                {announcements.length > 0 ? (
                  announcements.map((ann, idx) => (
                    <li key={ann.id || idx} className="flex items-center">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#8B0000] rounded-full mr-2 sm:mr-4 shrink-0"></span>
                      <span>{isEnglish && ann.text_en ? ann.text_en : ann.text}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-center text-gray-500 text-xs sm:text-sm">{t('noAnnouncements')}</li>
                )}
              </ul>
            </div>
          </StaggerItem>

          {/* Right Card: Annadhanam */}
          <StaggerItem 
            className="bg-[length:100%_100%] bg-no-repeat relative"
            style={{ backgroundImage: 'url(/images/announcements-bg.png)' }}
          >
            {/* Pad to strictly stay inside parchment without touching top crest or bottom ornament */}
            <div className="relative z-10 pl-[18%] pr-[16%] pt-[28%] sm:pt-[25%] md:pt-[22%] pb-[18%] flex flex-col md:flex-row items-center justify-start md:justify-center h-full gap-2 sm:gap-4 md:gap-6 min-h-[320px] sm:min-h-[350px]">
              
              <div className="flex flex-col justify-center text-center md:text-left md:flex-1">
                <h3 className={`font-bold text-[#8B0000] text-base sm:text-2xl lg:text-3xl mb-1 sm:mb-2.5 drop-shadow-sm ${isTamil ? 'font-tamil' : ''}`}>{t('annadhanamTitle')}</h3>
                <p className={`text-[#4B2E15] font-bold text-xs sm:text-sm md:text-base leading-snug sm:leading-relaxed whitespace-pre-wrap mb-1.5 md:mb-0 ${isTamil ? 'font-tamil' : ''}`}>
                  {displayAnnadhanam}
                </p>
              </div>
              
              <div className="w-24 sm:w-32 md:w-1/3 lg:max-w-[160px] relative flex items-center md:items-start justify-center md:mr-4 lg:mr-6 shrink-0 mt-0.5 md:mt-0">
                 {/* Image representation of banana leaf meal */}
                 <img 
                   src={annadhanamImage || "https://picsum.photos/400/300?random=20"} 
                   alt={t('annadhanamTitle')} 
                   className="w-full h-auto max-h-16 sm:max-h-24 md:max-h-28 object-cover rounded-xl shadow-md border-2 border-white/60 aspect-[4/3]" 
                 />
              </div>
            </div>
          </StaggerItem>
          
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Announcements;
