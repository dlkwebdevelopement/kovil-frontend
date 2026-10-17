import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t, isTamil } = useLanguage();
  const [contactData, setContactData] = useState({});

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setContactData(data.data);
        }
      })
      .catch(() => { });
  }, []);

  return (
    <footer id="contact" className={`bg-[#4A0404] text-white pt-10 sm:pt-12 pb-0 ${isTamil ? 'font-tamil' : ''} border-t-4 border-[#d4af37]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1 - 2 - 1 Grid on Mobile (Full width, 2-cols, Full width), 4 equal columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-0 gap-y-8 sm:gap-y-10 lg:gap-y-0 mb-8 sm:mb-10">

          {/* Section 1: Temple Information (Full Width on Mobile, 1 col on Desktop) */}
          <div className="col-span-2 lg:col-span-1 lg:pr-6 xl:pr-8 lg:border-r lg:border-white/15 pb-6 lg:pb-0 border-b lg:border-b-0 border-white/10 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-3 sm:mb-6 text-center sm:text-left">
              <img src="/images/logo_new.png" alt="Logo" className="w-14 sm:w-16 h-auto mb-2 sm:mb-0 sm:mr-3.5 object-contain shrink-0" />
              <div>
                <h4 className="m-0 font-bold text-base sm:text-lg mb-1 leading-snug text-white">
                  {t('templeTitle')}
                </h4>
                <p className="text-xs sm:text-sm text-gray-200">
                  {t('heroLocation')}
                </p>
              </div>
            </div>
            <p className="text-gray-200 leading-relaxed text-xs sm:text-sm mb-4 sm:mb-6 text-center lg:text-left whitespace-pre-line">
              {t('footerBlessing')}
            </p>
            {/* Social Icons with brand colors */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 sm:space-x-3">
              {contactData.facebook && (
                <a href={contactData.facebook} target="_blank" rel="noopener noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity" title="Facebook">
                  <i className="fab fa-facebook-f text-xs sm:text-sm"></i>
                </a>
              )}
              {contactData.instagram && (
                <a href={contactData.instagram} target="_blank" rel="noopener noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center text-white hover:opacity-80 transition-opacity" title="Instagram">
                  <i className="fab fa-instagram text-xs sm:text-sm"></i>
                </a>
              )}
              {contactData.youtube && (
                <a href={contactData.youtube} target="_blank" rel="noopener noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:opacity-80 transition-opacity" title="YouTube">
                  <i className="fab fa-youtube text-xs sm:text-sm"></i>
                </a>
              )}
              {contactData.whatsapp && (
                <a href={contactData.whatsapp} target="_blank" rel="noopener noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-80 transition-opacity" title="WhatsApp">
                  <i className="fab fa-whatsapp text-xs sm:text-sm"></i>
                </a>
              )}
            </div>
          </div>

          {/* Section 2: Quick Links (Left Column on Mobile, 1 col on Desktop) */}
          <div className="col-span-1 lg:col-span-1 lg:px-6 xl:px-8 lg:border-r lg:border-white/15 text-center lg:text-left">
            <h5 className="font-bold text-base sm:text-lg mb-3 sm:mb-6 text-[#F6C026] lg:text-white text-center lg:text-left whitespace-nowrap">
              {t('quickLinksTitle')}
            </h5>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><a href="/#home" className="text-gray-200 hover:text-white transition-colors flex items-center justify-center lg:justify-start"><i className="fas fa-caret-right text-[10px] mr-1.5 text-gray-400"></i> {t('navHome')}</a></li>
              <li><a href="/temple" className="text-gray-200 hover:text-white transition-colors flex items-center justify-center lg:justify-start"><i className="fas fa-caret-right text-[10px] mr-1.5 text-gray-400"></i> {t('navTemple')}</a></li>
              <li><a href="/pooja" className="text-gray-200 hover:text-white transition-colors flex items-center justify-center lg:justify-start"><i className="fas fa-caret-right text-[10px] mr-1.5 text-gray-400"></i> {t('navPooja')}</a></li>
              <li><a href="/#events" className="text-gray-200 hover:text-white transition-colors flex items-center justify-center lg:justify-start"><i className="fas fa-caret-right text-[10px] mr-1.5 text-gray-400"></i> {t('navEvents')}</a></li>
              <li><a href="/gallery" className="text-gray-200 hover:text-white transition-colors flex items-center justify-center lg:justify-start"><i className="fas fa-caret-right text-[10px] mr-1.5 text-gray-400"></i> {t('navGallery')}</a></li>
              <li><a href="/#donation" className="text-gray-200 hover:text-white transition-colors flex items-center justify-center lg:justify-start"><i className="fas fa-caret-right text-[10px] mr-1.5 text-gray-400"></i> {t('serviceAnnadhanam')}</a></li>
              <li><a href="/contact" className="text-gray-200 hover:text-white transition-colors flex items-center justify-center lg:justify-start"><i className="fas fa-caret-right text-[10px] mr-1.5 text-gray-400"></i> {t('navContact')}</a></li>
            </ul>
          </div>

          {/* Section 3: Contact Information (Right Column on Mobile, 1 col on Desktop) */}
          <div className="col-span-1 lg:col-span-1 lg:px-6 xl:px-8 lg:border-r lg:border-white/15 text-center lg:text-left">
            <h5 className="font-bold text-base sm:text-lg mb-3 sm:mb-6 text-[#F6C026] lg:text-white text-center lg:text-left whitespace-nowrap">
              {t('contactUsTitle')}
            </h5>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-200">
              <a href="tel:9840656936" className="flex items-center justify-center lg:justify-start hover:text-[#F6C026] transition-colors">
                <i className="fas fa-phone-alt fa-flip-horizontal mr-2 text-[#F6C026] text-xs shrink-0 inline-block" style={{ transform: 'scaleX(-1)' }}></i>
                <span>98406 56936</span>
              </a>
              <a href="tel:9941952018" className="flex items-center justify-center lg:justify-start hover:text-[#F6C026] transition-colors">
                <i className="fas fa-phone-alt fa-flip-horizontal mr-2 text-[#F6C026] text-xs shrink-0 inline-block" style={{ transform: 'scaleX(-1)' }}></i>
                <span>99419 52018</span>
              </a>
              <a href="tel:9884255943" className="flex items-center justify-center lg:justify-start hover:text-[#F6C026] transition-colors">
                <i className="fas fa-phone-alt fa-flip-horizontal mr-2 text-[#F6C026] text-xs shrink-0 inline-block" style={{ transform: 'scaleX(-1)' }}></i>
                <span>98842 55943</span>
              </a>
              <a href="tel:9940391565" className="flex items-center justify-center lg:justify-start hover:text-[#F6C026] transition-colors">
                <i className="fas fa-phone-alt fa-flip-horizontal mr-2 text-[#F6C026] text-xs shrink-0 inline-block" style={{ transform: 'scaleX(-1)' }}></i>
                <span>99403 91565</span>
              </a>
              <a href="tel:7305246999" className="flex items-center justify-center lg:justify-start hover:text-[#F6C026] transition-colors">
                <i className="fas fa-phone-alt fa-flip-horizontal mr-2 text-[#F6C026] text-xs shrink-0 inline-block" style={{ transform: 'scaleX(-1)' }}></i>
                <span>73052 46999</span>
              </a>
            </div>
            {/* Desktop Email display */}
            <div className="hidden lg:flex items-center justify-start mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10 text-xs text-gray-200">
              <i className="far fa-envelope mr-1.5 text-[#F6C026] shrink-0 text-xs"></i>
              <a href="mailto:arulmigumahakaliammanthirukoil@gmail.com" className="hover:text-[#F6C026] transition-colors text-[11px] xl:text-xs truncate" title="arulmigumahakaliammanthirukoil@gmail.com">
                arulmigumahakaliammanthirukoil@gmail.com
              </a>
            </div>
          </div>

          {/* Mobile Email Single Line Strip (Spans full width across mobile Row 2) */}
          <div className="col-span-2 lg:hidden flex items-center justify-center py-2.5 px-3 bg-black/20 rounded-lg text-gray-200 border border-white/10 -mt-2">
            <i className="far fa-envelope mr-2 text-[#F6C026] shrink-0 text-xs"></i>
            <a href="mailto:arulmigumahakaliammanthirukoil@gmail.com" className="whitespace-nowrap hover:text-[#F6C026] transition-colors text-[11px] sm:text-xs tracking-tight">
              arulmigumahakaliammanthirukoil@gmail.com
            </a>
          </div>

          {/* Section 4: Location Map (Full Width on Mobile, 1 col on Desktop) */}
          <div className="col-span-2 lg:col-span-1 lg:pl-6 xl:pl-8 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/10 text-center lg:text-left">
            <h5 className="font-bold text-base sm:text-lg mb-3 sm:mb-6 text-[#F6C026] lg:text-white text-center lg:text-left whitespace-nowrap">
              {t('locationTitle')}
            </h5>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-3 sm:mb-4 text-center lg:text-left whitespace-pre-line">
              {isTamil
                ? "அருள்மிகு மகா காளியம்மன் திருக்கோவில்,\nபோரூர், சென்னை - 116"
                : "Arulmigu Maha Kaliamman Temple,\nPorur, Chennai - 600116"}
            </p>
            <div className="rounded-xl overflow-hidden shadow-sm h-36 sm:h-44 lg:h-32 border-2 border-[#F6C026]/60 max-w-md mx-auto lg:max-w-none">
              <iframe
                title="Temple Location"
                src="https://maps.google.com/maps?q=13.035389,80.158306+(Arulmigu%20Maha%20Kaliamman%20Thirukoil)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy">
              </iframe>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-black/30 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300 text-center md:text-left gap-2">
          <p className="mb-1 md:mb-0">
            &copy; {new Date().getFullYear()} {t('copyrightText')}
          </p>
          <p className="flex items-center gap-1">
            <span>{t('developedBy')}</span>
            <span className="text-red-500">❤️</span>
            <span>{t('byText')}</span>
            <a
              href="https://dlktechnologies.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F6C026] hover:underline font-semibold transition-colors ml-0.5"
            >
              DLK Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
