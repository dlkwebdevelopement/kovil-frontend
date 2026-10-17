import React from 'react';
import { AnimatedSection } from './AnimatedSection';
import Donation from './Donation';
import { useLanguage } from '../context/LanguageContext';

const TemplePage = () => {
  const { t, isTamil } = useLanguage();

  return (
    <main className="min-h-screen bg-[#FFF9E6] pt-24 sm:pt-32 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 lg:px-10">
        <AnimatedSection className="mb-8 sm:mb-10 text-center">
          <p className={`${isTamil ? 'font-tamil' : ''} text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#a05a2c]`}>
            {t('templeIntroTag')}
          </p>
          <h1 className={`mt-2 ${isTamil ? 'font-tamil' : ''} text-2xl sm:text-4xl font-bold tracking-wide text-[#8B0000] md:text-6xl`}>
            {t('templeTitle')}
          </h1>
          <p className={`mx-auto mt-3 sm:mt-4 max-w-3xl ${isTamil ? 'font-tamil' : ''} text-sm sm:text-base leading-7 sm:leading-8 text-[#5e402c] md:text-lg`}>
            {t('templeSubtitle')}
          </p>
        </AnimatedSection>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <AnimatedSection className="overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#4B2E15] shadow-2xl">
            <img src="/images/hero-bg-latest.png" alt={t('templeTitle')} className="h-64 sm:min-h-[380px] w-full object-cover lg:min-h-[520px]" />
          </AnimatedSection>
          <AnimatedSection className="rounded-3xl border border-[#d4af37]/40 bg-white/75 p-5 sm:p-7 shadow-xl md:p-10">
            <p className={`${isTamil ? 'font-tamil' : ''} text-xs sm:text-sm font-bold tracking-widest text-[#a05a2c]`}>
              {t('templeAboutTag')}
            </p>
            <h2 className={`mt-2 sm:mt-3 ${isTamil ? 'font-tamil' : ''} text-2xl sm:text-3xl font-bold text-[#8B0000] md:text-4xl`}>
              {t('templeDevotionHeritage')}
            </h2>
            <div className="my-4 sm:my-6 h-1 w-16 rounded-full bg-[#d4af37]" />
            <p className={`${isTamil ? 'font-tamil' : ''} text-sm sm:text-base leading-7 sm:leading-8 text-[#5e402c] md:text-lg`}>
              {t('templeAboutPara1')}
            </p>
            <p className={`mt-4 sm:mt-5 ${isTamil ? 'font-tamil' : ''} text-sm sm:text-base leading-7 sm:leading-8 text-[#5e402c] md:text-lg`}>
              {t('templeAboutPara2')}
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-8 sm:mt-10 rounded-3xl border border-[#d4af37]/40 bg-[#FFFDF5] p-5 sm:p-7 shadow-lg md:p-10">
          <h2 className={`${isTamil ? 'font-tamil' : ''} text-2xl sm:text-3xl font-bold text-[#8B0000]`}>
            {t('templeHoursHeading')}
          </h2>
          <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-[#FFF5D5] p-4 sm:p-5">
              <p className={`${isTamil ? 'font-tamil' : ''} font-bold text-xs sm:text-sm text-[#a05a2c]`}>{t('templeDailyOpening')}</p>
              <p className={`mt-1.5 sm:mt-2 ${isTamil ? 'font-tamil' : ''} text-base sm:text-lg text-[#4B2E15]`}>{t('templeDailyHours')}</p>
            </div>
            <div className="rounded-2xl bg-[#FFF5D5] p-4 sm:p-5">
              <p className={`${isTamil ? 'font-tamil' : ''} font-bold text-xs sm:text-sm text-[#a05a2c]`}>{t('templeAddressLabel')}</p>
              <p className={`mt-1.5 sm:mt-2 ${isTamil ? 'font-tamil' : ''} text-base sm:text-lg text-[#4B2E15]`}>{t('templeAddressVal')}</p>
            </div>
            <div className="rounded-2xl bg-[#FFF5D5] p-4 sm:p-5">
              <p className={`${isTamil ? 'font-tamil' : ''} font-bold text-xs sm:text-sm text-[#a05a2c]`}>{t('templeWorshipLabel')}</p>
              <p className={`mt-1.5 sm:mt-2 ${isTamil ? 'font-tamil' : ''} text-base sm:text-lg text-[#4B2E15]`}>{t('templeWorshipVal')}</p>
            </div>
          </div>
        </AnimatedSection>

        <Donation />
      </div>
    </main>
  );
};

export default TemplePage;
