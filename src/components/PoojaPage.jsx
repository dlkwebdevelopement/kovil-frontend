import React, { useEffect, useState } from 'react';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const specialFestivals = [
  {
    id: 'pooja-1',
    title: 'மகா பிரத்யங்கிரா தேவி பூஜை',
    title_en: 'Maha Pratyangira Devi Pooja',
    subtitle: 'கிருஷ்ணாஷ்டமி',
    subtitle_en: 'Krishna Ashtami',
    image: '/images/Pooja-icons/file_00000000d3a08211a3efbcfdcb87b1ab.png',
    description: 'கிருஷ்ணாஷ்டமி நன்னாளில் நடைபெறும் விசேஷ மகா பிரத்யங்கிரா தேவி பூஜை.',
    description_en: 'Special Maha Pratyangira Devi Pooja conducted with sacred rituals on Krishna Ashtami.'
  },
  {
    id: 'pooja-2',
    title: 'ஊஞ்சல் சாமி பூஜை',
    title_en: 'Oonjal Seva Pooja',
    subtitle: 'அமாவாசை',
    subtitle_en: 'Amavasai (New Moon)',
    image: '/images/Pooja-icons/file_0000000010b081f4a87b6a97e32cd93e.png',
    description: 'அமாவாசை தோறும் நடைபெறும் சிறப்பு ஊஞ்சல் சாமி பூஜை.',
    description_en: 'Sacred divine swing ritual (Oonjal Seva) performed specially on every Amavasai.'
  },
  {
    id: 'pooja-3',
    title: 'திருவிளக்கு பூஜை',
    title_en: 'Thiruvilakku Pooja',
    subtitle: 'பௌர்ணமி',
    subtitle_en: 'Pournami (Full Moon)',
    image: '/images/Pooja-icons/file_00000000982482118cad7730b0d94e64.png',
    description: 'பௌர்ணமி தோறும் நடைபெறும் சிறப்பு திருவிளக்கு பூஜை.',
    description_en: 'Sacred oil lamp prayer ceremony by women devotees performed on every auspicious Pournami.'
  },
  {
    id: 'pooja-4',
    title: 'ஆடி பூரம்',
    title_en: 'Aadi Pooram',
    subtitle: 'கூழ் வார்த்தல்',
    subtitle_en: 'Koozh Offering',
    image: '/images/Pooja-icons/file_00000000971482088067e1bccf06389f.png',
    description: 'ஆடி மாதத்தில் நடைபெறும் விசேஷ கூழ் வார்த்தல் மற்றும் அம்மன் தரிசனம்.',
    description_en: 'Grand celebration of Aadi Pooram with sacred Koozh distribution and special Amman darshan.'
  },
  {
    id: 'pooja-5',
    title: 'ஆடி கரகம் விழா',
    title_en: 'Aadi Karagam Festival',
    subtitle: 'சிறப்பு விழா',
    subtitle_en: 'Grand Festival',
    image: '/images/Pooja-icons/file_0000000000708207b8d963915833b01b.png',
    description: 'ஆடி மாதத்தில் மிகவும் விமர்சையாக நடைபெறும் கரகம் மற்றும் சிறப்பு விழா.',
    description_en: 'Grand traditional holy Karagam procession and festive celebrations held during the month of Aadi.'
  },
  {
    id: 'pooja-6',
    title: 'நவசக்தி அர்ச்சனை',
    title_en: 'Navasakthi Archanai',
    subtitle: 'சிறப்பு அர்ச்சனை',
    subtitle_en: 'Special Archanai',
    image: '/images/Pooja-icons/file_000000008a4c8208984a0a6b3302fd9b.png',
    description: 'அம்மனின் ஒன்பது ரூபங்களை வழிபடும் சிறப்பு நவசக்தி அர்ச்சனை.',
    description_en: 'Sacred chanting and floral offerings worshipping the nine divine forms of Goddess Sakthi.'
  },
  {
    id: 'pooja-7',
    title: 'தேர் உற்சவம்',
    title_en: 'Temple Car Festival (Ther)',
    subtitle: 'திருவிழா',
    subtitle_en: 'Sacred Procession',
    image: '/images/Pooja-icons/file_0000000001048208866a794118137fbc.png',
    description: 'அம்மன் வீதி உலா வரும் சிறப்பு தேர் உற்சவம் மற்றும் கோலாகல விழா.',
    description_en: 'Majestic temple chariot procession carrying Goddess Kaliamman through the holy streets.'
  },
  {
    id: 'pooja-8',
    title: '5-நாள் கோவில் திருவிழா',
    title_en: '5-Day Grand Brahmotsavam',
    subtitle: 'வருடாந்திர விழா',
    subtitle_en: 'Annual Festival',
    image: '/images/Pooja-icons/file_00000000b1f08208b28d20310423eb0c.png',
    description: 'ஆண்டுதோறும் விமரிசையாக நடைபெறும் 5-நாள் பெருவிழா.',
    description_en: 'The auspicious five-day annual temple festival celebrated with daily homams, abhishekams, and cultural devotional events.'
  },
  {
    id: 'pooja-9',
    title: 'சித்திரா பௌர்ணமி',
    title_en: 'Chitra Pournami',
    subtitle: 'பால் குடம்',
    subtitle_en: 'Milk Pot Procession',
    image: '/images/Pooja-icons/file_00000000dad08211bf40b5cd5aa81bc8.png',
    description: 'சித்திரா பௌர்ணமி அன்று நடைபெறும் சிறப்பு பால்குட ஊர்வலம்.',
    description_en: 'Sacred Paal Kudam (Holy Milk Pot) procession and divine abhishekam on auspicious Chitra Pournami.'
  },
  {
    id: 'pooja-10',
    title: 'தமிழ் புத்தாண்டு',
    title_en: 'Tamil New Year',
    subtitle: 'சித்திரை 1',
    subtitle_en: 'Chithirai 1',
    image: '/images/Pooja-icons/file_00000000ad208208904ac49188316895.png',
    description: 'தமிழ் வருடப்பிறப்பு சிறப்பு தரிசனம் மற்றும் விசேஷ பூஜைகள்.',
    description_en: 'Auspicious Tamil New Year special alankaram darshan, panchangam reading, and divine poojas.'
  }
];

const PoojaPage = () => {
  const { t, isTamil } = useLanguage();
  const [poojas, setPoojas] = useState(specialFestivals);

  useEffect(() => {
    fetch('/api/pooja')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPoojas(data.data);
        }
      })
      .catch((err) => {
        console.warn('Unable to load poojas from API, using default list:', err);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[#FFF9E6] pt-24 sm:pt-32 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 lg:px-10">
        <AnimatedSection className="mb-8 sm:mb-12 text-center">
          <p className={`${isTamil ? 'font-tamil' : ''} text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#a05a2c]`}>
            {t('poojaTag')}
          </p>
          <h1 className={`mt-2 ${isTamil ? 'font-tamil' : ''} text-3xl sm:text-4xl font-bold text-[#8B0000] md:text-6xl`}>
            {t('poojaHeading')}
          </h1>
          <p className={`mx-auto mt-3 sm:mt-4 max-w-2xl ${isTamil ? 'font-tamil' : ''} text-sm sm:text-base leading-7 sm:leading-8 text-[#5e402c] md:text-lg`}>
            {t('poojaSubtitle')}
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4" delayChildren={0.2} staggerChildren={0.1}>
          {poojas.map((fest, idx) => {
            const displayTitle = (!isTamil && fest.title_en) ? fest.title_en : fest.title;
            const displaySubtitle = (!isTamil && fest.subtitle_en) ? fest.subtitle_en : fest.subtitle;
            const displayDesc = (!isTamil && fest.description_en) ? fest.description_en : fest.description;

            return (
              <StaggerItem key={fest.id || `${fest.title}-${idx}`}>
                <article className="h-full flex flex-col items-center rounded-3xl border border-[#d4af37]/40 bg-[#FFFDF5] p-5 sm:p-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-2">
                  <div className="mx-auto flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full border-2 border-[#F6C026]/50 bg-[#FFF5D5]">
                    {fest.image ? (
                      <img
                        src={fest.image}
                        alt={displayTitle}
                        className="h-24 w-24 sm:h-28 sm:w-28 object-contain"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/images/Pooja-icons/file_00000000d3a08211a3efbcfdcb87b1ab.png';
                        }}
                      />
                    ) : (
                      <i className={`fas ${fest.icon} text-4xl sm:text-5xl text-[#8B0000]`} />
                    )}
                  </div>
                  <h2 className={`mt-4 sm:mt-6 ${isTamil ? 'font-tamil' : ''} text-xl sm:text-2xl font-bold text-[#8B0000] leading-snug`}>
                    {displayTitle}
                  </h2>
                  <span className={`mt-1 inline-block rounded-full bg-[#eadfbf] px-3 py-1 text-xs font-bold text-[#8B0000] ${isTamil ? 'font-tamil' : ''}`}>
                    {displaySubtitle}
                  </span>
                  <p className={`mt-3 sm:mt-4 ${isTamil ? 'font-tamil' : ''} text-sm sm:text-base leading-7 sm:leading-8 text-[#5e402c] flex-grow`}>
                    {displayDesc}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimatedSection className="mt-12 sm:mt-16 rounded-3xl border border-[#d4af37]/40 bg-white/75 p-5 sm:p-7 text-center shadow-xl md:p-10">
          <h2 className={`${isTamil ? 'font-tamil' : ''} text-2xl sm:text-3xl font-bold text-[#8B0000]`}>
            {t('poojaTimingBooking')}
          </h2>
          <p className={`mx-auto mt-3 sm:mt-4 max-w-2xl ${isTamil ? 'font-tamil' : ''} text-sm sm:text-base leading-7 sm:leading-8 text-[#5e402c] md:text-lg`}>
            {t('poojaBookingDesc')}
          </p>
          <a
            href="/contact"
            className={`mt-5 sm:mt-6 inline-flex items-center gap-2 rounded-xl bg-[#8B0000] px-6 sm:px-7 py-2.5 sm:py-3 ${isTamil ? 'font-tamil' : ''} font-bold text-white shadow-lg transition-colors hover:bg-[#690000]`}
          >
            {t('contactForBooking')} <i className="fas fa-arrow-right text-sm" />
          </a>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default PoojaPage;
