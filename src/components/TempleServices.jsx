import React from 'react';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const TempleServices = () => {
  const { t, isTamil } = useLanguage();

  const services = [
    { name: t('serviceArchanai'), image: '/images/services/archanai.png', href: '/pooja' },
    { name: t('serviceAbhishekam'), image: '/images/services/abhishekam.png', href: '/pooja' },
    { name: t('serviceAnnadhanam'), image: '/images/services/annadhanam.png', href: '/pooja' },
    { name: t('serviceKaanikkai'), image: '/images/services/kaanikkai.png', href: '/pooja' },
    { name: t('servicePooja'), image: '/images/services/poojai.png', href: '/pooja' },
    { name: t('servicePrarthanai'), image: '/images/services/prarthanai.png', href: '/pooja' },
  ];

  return (
    <section id="services" className="py-12 bg-[#FFF9E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <AnimatedSection className="relative flex items-center justify-center mb-8 sm:mb-10 mt-2 sm:mt-4">
          {/* Decorative horizontal line */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/60 to-[#d4af37]/10 z-0"></div>
          
          {/* Centered Title */}
          <div className="relative z-10 px-4 sm:px-6 flex items-center bg-[#FFF9E6]">
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-[#8B0000] flex items-center justify-center text-center tracking-wide ${isTamil ? 'font-tamil' : ''}`}>
              <img src="/images/info-icons/om.png" alt="Ornament" className="h-5 sm:h-8 md:h-10 w-auto mr-1.5 sm:mr-4 object-contain shrink-0" />
              {t('servicesTitle')}
              <img src="/images/info-icons/om.png" alt="Ornament" className="h-5 sm:h-8 md:h-10 w-auto ml-1.5 sm:mr-4 object-contain -scale-x-100 shrink-0" />
            </h2>
          </div>
        </AnimatedSection>

        {/* Services Card */}
        <div className="bg-[#FFFDF5] border border-[#d4af37]/30 rounded-3xl shadow-sm p-5 sm:p-8 md:p-10 mx-auto w-full">
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-4 lg:gap-8 justify-items-center" delayChildren={0.1} staggerChildren={0.1}>
            {services.map((service, index) => (
              <StaggerItem key={index} className="flex flex-col items-center group cursor-pointer w-full max-w-[140px]">
                <a href={service.href} className="flex w-full flex-col items-center">
                {/* Circle Icon Container */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#FFF5D5] border-2 border-[#F6C026]/40 flex items-center justify-center shadow-sm mb-2.5 sm:mb-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:border-[#F6C026]">
                  <img src={service.image} alt={service.name} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
                </div>
                {/* Service Label */}
                <h4 className={`font-bold text-[#4B2E15] text-xs sm:text-sm md:text-base text-center transition-colors group-hover:text-[#8B0000] whitespace-nowrap ${isTamil ? 'font-tamil' : ''}`}>
                  {service.name}
                </h4>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>
    </section>
  );
};

export default TempleServices;
