import React, { useState, useEffect } from 'react';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const Donation = () => {
  const { t, isTamil } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [donationData, setDonationData] = useState(null);

  useEffect(() => {
    fetch('/api/donation')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setDonationData(data.data);
        }
      })
      .catch(console.error);
  }, []);

  const paymentMethods = [
    { name: t('methodQr'), type: 'qr' },
    { name: t('methodUpi'), type: 'upi' },
    { name: t('methodBank'), type: 'bank' },
  ];
  return (
    <section id="donation" className="py-12 sm:py-16 bg-[#FFF9E6] flex justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center w-full">
        
        {/* Header Section (Matching Temple Services) */}
        <AnimatedSection className="relative flex items-center justify-center mb-8 sm:mb-10 w-full">
          {/* Decorative horizontal line */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/60 to-[#d4af37]/10 z-0"></div>
          
          {/* Centered Title */}
          <div className="relative z-10 px-4 sm:px-6 flex items-center bg-[#FFF9E6]">
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-[#8B0000] flex items-center justify-center text-center tracking-wide ${isTamil ? 'font-tamil' : ''}`}>
              <img src="/images/info-icons/om.png" alt="Ornament" className="h-5 sm:h-8 md:h-10 w-auto mr-1.5 sm:mr-4 object-contain shrink-0" />
              {t('donationSectionTitle')}
              <img src="/images/info-icons/om.png" alt="Ornament" className="h-5 sm:h-8 md:h-10 w-auto ml-1.5 sm:mr-4 object-contain -scale-x-100 shrink-0" />
            </h2>
          </div>
        </AnimatedSection>

        {/* Main Card */}
        <AnimatedSection delay={0.2} className="bg-[#FFFDF5] border border-[#d4af37]/20 rounded-3xl shadow-lg p-5 sm:p-8 md:p-12 w-full max-w-7xl relative z-10">
          
          {/* Faint Background Mandalas */}
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 opacity-[0.025] text-[#d4af37] pointer-events-none z-0">
            <i className="fas fa-dharmachakra text-[350px]"></i>
          </div>
          <div className="absolute -right-32 top-1/2 -translate-y-1/2 opacity-[0.025] text-[#d4af37] pointer-events-none z-0">
            <i className="fas fa-dharmachakra text-[350px]"></i>
          </div>

          {/* Inner Decorative Frame */}
          <div className="absolute inset-4 md:inset-5 border-[1.5px] border-[#d4af37]/50 rounded-2xl pointer-events-none z-0"></div>
          
          {/* Corner Ornaments */}
          <div className="absolute top-2 left-2 md:top-3 md:left-3 text-[#d4af37] pointer-events-none z-0">
             <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor" className="opacity-90">
               <path d="M0,0 C30,0 50,20 50,50 C50,20 70,0 100,0 C70,0 50,20 50,50 C50,20 30,0 0,0 Z M0,0 C0,30 20,50 50,50 C20,50 0,70 0,100 C0,70 20,50 50,50 C20,50 0,30 0,0 Z" />
             </svg>
          </div>
          <div className="absolute top-2 right-2 md:top-3 md:right-3 text-[#d4af37] pointer-events-none z-0 rotate-90">
             <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor" className="opacity-90">
               <path d="M0,0 C30,0 50,20 50,50 C50,20 70,0 100,0 C70,0 50,20 50,50 C50,20 30,0 0,0 Z M0,0 C0,30 20,50 50,50 C20,50 0,70 0,100 C0,70 20,50 50,50 C20,50 0,30 0,0 Z" />
             </svg>
          </div>
          <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 text-[#d4af37] pointer-events-none z-0 -rotate-90">
             <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor" className="opacity-90">
               <path d="M0,0 C30,0 50,20 50,50 C50,20 70,0 100,0 C70,0 50,20 50,50 C50,20 30,0 0,0 Z M0,0 C0,30 20,50 50,50 C20,50 0,70 0,100 C0,70 20,50 50,50 C20,50 0,30 0,0 Z" />
             </svg>
          </div>
          <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 text-[#d4af37] pointer-events-none z-0 rotate-180">
             <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor" className="opacity-90">
               <path d="M0,0 C30,0 50,20 50,50 C50,20 70,0 100,0 C70,0 50,20 50,50 C50,20 30,0 0,0 Z M0,0 C0,30 20,50 50,50 C20,50 0,70 0,100 C0,70 20,50 50,50 C20,50 0,30 0,0 Z" />
             </svg>
          </div>

          <div className="text-center relative z-10 px-2 md:px-8">
            <p className={`text-[#4B2E15] font-bold text-lg md:text-xl opacity-90 mt-2 ${isTamil ? 'font-tamil' : ''}`}>
              {t('donationTagline')}
            </p>
            
            {/* Top Separator */}
            <div className="flex items-center justify-center gap-2 mt-5 mb-10 w-full opacity-70">
              <div className="w-16 md:w-24 h-[1px] bg-[#d4af37]"></div>
              <div className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]"></div>
              <div className="w-16 md:w-24 h-[1px] bg-[#d4af37]"></div>
            </div>
            
            {/* Payment Methods Grid */}
            <StaggerContainer className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-8 sm:mb-12 max-w-3xl mx-auto" delayChildren={0.4} staggerChildren={0.15}>
              {paymentMethods.map((method, index) => (
                <StaggerItem 
                  key={index} 
                  onClick={() => setSelectedMethod(method.type)}
                  className={`bg-[#FFFDF5] border ${selectedMethod === method.type ? 'border-[#d4af37] shadow-[0_8px_25px_rgba(212,175,55,0.25)] -translate-y-1.5' : 'border-[#d4af37]/30'} rounded-2xl p-2.5 sm:p-5 md:p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.15)] group h-full`}
                >
                  <div className="w-[52px] h-[52px] sm:w-[70px] sm:h-[70px] md:w-[85px] md:h-[85px] rounded-full bg-gradient-to-br from-[#FFFDF5] to-[#f9eed5] shadow-[inset_0_2px_10px_rgba(212,175,55,0.1),0_4px_10px_rgba(0,0,0,0.05)] border border-[#d4af37]/30 flex items-center justify-center mb-2 sm:mb-5 group-hover:scale-105 transition-transform duration-300">
                    {method.type === 'qr' && (
                      <div className="grid grid-cols-2 gap-0.5 sm:gap-1 w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9">
                         <div className="border-[2px] sm:border-[3px] border-[#222] rounded-xs sm:rounded-sm"></div>
                         <div className="border-[2px] sm:border-[3px] border-[#222] rounded-xs sm:rounded-sm"></div>
                         <div className="border-[2px] sm:border-[3px] border-[#222] rounded-xs sm:rounded-sm"></div>
                         <div className="flex flex-wrap gap-0.5 justify-between">
                            <div className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 bg-[#222] rounded-xs sm:rounded-sm"></div>
                            <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
                            <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
                            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#222] rounded-xs sm:rounded-sm"></div>
                         </div>
                      </div>
                    )}
                    {method.type === 'upi' && (
                      <div className="flex items-center -mr-0.5 sm:-mr-1">
                        <span className="font-black italic text-base sm:text-xl md:text-2xl text-[#222] tracking-tighter mr-0.5 sm:mr-1">UPI</span>
                        <div className="flex h-3.5 sm:h-[18px] md:h-5 items-end ml-0.5">
                          <div className="w-1 sm:w-1.5 h-full bg-[#1A8352] skew-x-[-15deg] mr-0.5"></div>
                          <div className="w-1 sm:w-1.5 h-full bg-[#E5760F] skew-x-[-15deg]"></div>
                        </div>
                      </div>
                    )}
                    {method.type === 'bank' && (
                      <i className="fas fa-university text-2xl sm:text-3xl md:text-[34px] text-[#1a56db]"></i>
                    )}
                  </div>
                  <span className={`font-bold text-xs sm:text-sm md:text-[15px] text-[#222] text-center leading-tight tracking-wide ${isTamil ? 'font-tamil' : ''}`}>
                    {method.name}
                  </span>
                  
                  {/* Miniature Separator */}
                  <div className="hidden sm:flex items-center justify-center gap-1 mt-3 w-full opacity-60">
                    <div className="w-5 h-[1px] bg-[#d4af37]"></div>
                    <div className="w-1 h-1 rotate-45 bg-[#d4af37]"></div>
                    <div className="w-5 h-[1px] bg-[#d4af37]"></div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Selected Method Details */}
            {selectedMethod && donationData && (
              <div className="mb-10 p-6 bg-white border border-[#d4af37]/30 rounded-2xl shadow-md mx-auto max-w-md animate-fade-in relative z-20">
                {selectedMethod === 'qr' && (
                  <div className="text-center">
                    <h3 className={`font-bold text-[#8B0000] text-xl md:text-2xl mb-4 ${isTamil ? 'font-tamil' : ''}`}>{t('payViaQr')}</h3>
                    <img src={donationData.qrImage} alt="QR Code" className="w-48 h-48 mx-auto mb-4 border-2 border-[#d4af37]/50 p-2 rounded-lg object-cover" />
                    <p className={`text-gray-600 text-sm md:text-base ${isTamil ? 'font-tamil' : ''}`}>{donationData.qrInstructions}</p>
                  </div>
                )}
                
                {selectedMethod === 'upi' && (
                  <div className="text-center">
                    <h3 className={`font-bold text-[#8B0000] text-xl md:text-2xl mb-4 ${isTamil ? 'font-tamil' : ''}`}>{t('payViaUpi')}</h3>
                    <div className="bg-[#FFF9E6] p-4 rounded-lg font-bold text-lg md:text-xl text-[#4B2E15] mb-4 border border-[#d4af37]/50">
                      {donationData.upiId}
                    </div>
                    <p className={`text-gray-600 text-sm md:text-base ${isTamil ? 'font-tamil' : ''}`}>{donationData.upiInstructions}</p>
                  </div>
                )}

                {selectedMethod === 'bank' && (
                  <div className="text-left">
                    <h3 className={`font-bold text-[#8B0000] text-xl md:text-2xl mb-5 text-center ${isTamil ? 'font-tamil' : ''}`}>{t('bankDetailsTitle')}</h3>
                    <div className={`space-y-4 text-gray-800 text-sm md:text-base ${isTamil ? 'font-tamil' : ''}`}>
                      <div className="flex justify-between border-b border-gray-100 pb-3">
                        <span className="text-gray-500">{t('bankNameLabel')}</span> 
                        <span className="font-bold text-[#4B2E15]">{donationData.bankName}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-3">
                        <span className="text-gray-500">{t('accountNameLabel')}</span> 
                        <span className="font-bold text-[#4B2E15]">{donationData.accountName}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-3">
                        <span className="text-gray-500">{t('accountNumberLabel')}</span> 
                        <span className="font-bold text-[#4B2E15]">{donationData.accountNumber}</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-gray-500">{t('ifscLabel')}</span> 
                        <span className="font-bold text-[#4B2E15]">{donationData.ifscCode}</span>
                      </div>
                    </div>
                    {donationData.bankInstructions && (
                      <div className={`mt-5 p-4 bg-[#FFF9E6] border border-[#d4af37]/50 rounded-lg text-sm text-gray-700 leading-relaxed ${isTamil ? 'font-tamil' : ''}`}>
                        {donationData.bankInstructions}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* Action Button */}
            {!selectedMethod && (
              <button className={`bg-[#6b0f0f] text-white px-8 md:px-12 py-3 md:py-3.5 rounded-xl font-bold hover:bg-[#520a0a] transition-all duration-300 shadow-[inset_0_0_0_1px_rgba(212,175,55,0.4),0_6px_20px_rgba(107,15,15,0.25)] hover:shadow-[inset_0_0_0_1px_rgba(212,175,55,0.6),0_8px_25px_rgba(107,15,15,0.35)] hover:-translate-y-1 text-base md:text-[17px] inline-flex items-center group cursor-pointer ${isTamil ? 'font-tamil' : ''}`}>
                {t('selectPaymentMethod')}
                <i className="fas fa-chevron-up ml-3 text-sm text-[#d4af37] transition-transform duration-300 group-hover:-translate-y-1"></i>
              </button>
            )}
            
            {selectedMethod && (
              <button onClick={() => setSelectedMethod(null)} className={`bg-transparent border border-[#6b0f0f] text-[#6b0f0f] px-8 md:px-12 py-3 md:py-3.5 rounded-xl font-bold hover:bg-[#FFF9E6] transition-all duration-300 text-base md:text-[17px] inline-flex items-center group cursor-pointer ${isTamil ? 'font-tamil' : ''}`}>
                <i className="fas fa-chevron-left mr-3 text-sm transition-transform duration-300 group-hover:-translate-x-1.5"></i>
                {t('backButton')}
              </button>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Donation;
