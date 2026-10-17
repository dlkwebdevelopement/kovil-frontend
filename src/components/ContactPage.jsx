import React, { useState, useEffect } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const defaultPhones = ['98406 56936', '99419 52018', '98842 55943', '99403 91565', '73052 46999'];
const defaultEmail = 'arulmigumahakaliammanthirukoil@gmail.com';
const defaultAddressTa = 'அருள்மிகு மகா காளியம்மன் திருக்கோவில்,\nபோரூர், சென்னை - 116';
const defaultAddressEn = 'Arulmigu Maha Kaliamman Temple,\nPorur, Chennai - 600116';
const defaultSubtitleTa = 'வருகை தரும் முன் கோவில் நேரத்தை உறுதி செய்ய தொடர்பு கொள்ளுங்கள்.';
const defaultSubtitleEn = 'Please contact us to confirm temple timings and pooja schedules before your visit.';
const defaultMapUrl = 'https://maps.google.com/maps?q=13.035389,80.158306+(Arulmigu%20Maha%20Kaliamman%20Thirukoil)&t=&z=16&ie=UTF8&iwloc=B&output=embed';

const ContactPage = () => {
  const { t, isTamil } = useLanguage();
  const [contactData, setContactData] = useState({
    phones: defaultPhones,
    email: defaultEmail,
    address: defaultAddressTa,
    address_en: defaultAddressEn,
    subtitle: defaultSubtitleTa,
    subtitle_en: defaultSubtitleEn,
    mapUrl: defaultMapUrl,
  });

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && Object.keys(data.data).length > 0) {
          const fetchedPhones = data.data.phones ? data.data.phones.split(',').map(p => p.trim()) : defaultPhones;
          setContactData({
            phones: fetchedPhones.length > 0 ? fetchedPhones : defaultPhones,
            email: data.data.email || defaultEmail,
            address: data.data.address || defaultAddressTa,
            address_en: data.data.address_en || defaultAddressEn,
            subtitle: data.data.subtitle || defaultSubtitleTa,
            subtitle_en: data.data.subtitle_en || defaultSubtitleEn,
            mapUrl: data.data.mapUrl || defaultMapUrl,
          });
        }
      })
      .catch(() => {});
  }, []);

  const currentAddress = (!isTamil && contactData.address_en)
    ? contactData.address_en
    : (isTamil ? contactData.address : defaultAddressEn);

  const currentSubtitle = (!isTamil && contactData.subtitle_en)
    ? contactData.subtitle_en
    : (isTamil ? (contactData.subtitle || t('locationMapSubtitle')) : t('locationMapSubtitle'));

  return (
    <main className="min-h-screen bg-[#FFF9E6] pt-24 sm:pt-32 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 lg:px-10">
        <AnimatedSection className="mb-8 sm:mb-10 text-center">
          <p className={`${isTamil ? 'font-tamil' : ''} text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#a05a2c]`}>
            {t('contactTag')}
          </p>
          <h1 className={`mt-2 ${isTamil ? 'font-tamil' : ''} text-3xl sm:text-4xl font-bold text-[#8B0000] md:text-6xl`}>
            {t('contactHeading')}
          </h1>
          <p className={`mx-auto mt-3 sm:mt-4 max-w-2xl ${isTamil ? 'font-tamil' : ''} text-sm sm:text-base leading-7 sm:leading-8 text-[#5e402c] md:text-lg`}>
            {t('contactSubtitle')}
          </p>
        </AnimatedSection>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <AnimatedSection className="rounded-3xl bg-[#4A0404] p-5 sm:p-7 text-white shadow-2xl md:p-10">
            <h2 className={`${isTamil ? 'font-tamil' : ''} text-2xl sm:text-3xl font-bold text-[#F6C026]`}>
              {t('contactDetailsTitle')}
            </h2>
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
              {contactData.phones.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.replaceAll(' ', '')}`}
                  className={`flex items-center gap-3 sm:gap-4 ${isTamil ? 'font-tamil' : ''} text-base sm:text-lg text-gray-100 transition-colors hover:text-[#F6C026]`}
                >
                  <i className="fas fa-phone-alt fa-flip-horizontal w-5 text-center text-[#F6C026] inline-block shrink-0" style={{ transform: 'scaleX(-1)' }} />
                  {phone}
                </a>
              ))}
              {contactData.email && (
                <a
                  href={`mailto:${contactData.email}`}
                  className="flex items-start gap-3 sm:gap-4 break-all text-sm sm:text-lg leading-7 sm:leading-8 text-gray-100 transition-colors hover:text-[#F6C026]"
                >
                  <i className="far fa-envelope mt-1 sm:mt-2 w-5 shrink-0 text-center text-[#F6C026]" />
                  {contactData.email}
                </a>
              )}
            </div>
            {currentAddress && (
              <div className="mt-8 sm:mt-10 border-t border-white/20 pt-5 sm:pt-7">
                <h3 className={`${isTamil ? 'font-tamil' : ''} text-lg sm:text-xl font-bold text-[#F6C026]`}>
                  {t('addressTitle')}
                </h3>
                <p className={`mt-2 sm:mt-3 whitespace-pre-wrap ${isTamil ? 'font-tamil' : ''} text-sm sm:text-base leading-7 sm:leading-8 text-gray-100`}>
                  {currentAddress}
                </p>
              </div>
            )}
          </AnimatedSection>

          <AnimatedSection className="overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#FFFDF5] shadow-xl">
            <div className="p-5 sm:p-7 md:p-10">
              <h2 className={`${isTamil ? 'font-tamil' : ''} text-2xl sm:text-3xl font-bold text-[#8B0000]`}>
                {t('templeLocationTitle')}
              </h2>
              <p className={`mt-2 sm:mt-3 ${isTamil ? 'font-tamil' : ''} text-sm sm:text-base leading-7 sm:leading-8 text-[#5e402c]`}>
                {currentSubtitle}
              </p>
            </div>
            <div className="h-64 sm:h-80 border-t-2 border-[#F6C026]/60">
              <iframe 
                title="Temple Location" 
                src={contactData.mapUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
