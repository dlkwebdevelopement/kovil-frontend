import React, { useEffect } from 'react';
import { defaultDonors } from '../data/donorsData';
import { useLanguage } from '../context/LanguageContext';

const DonorsPage = () => {
  const { t, isTamil, isEnglish } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const donors = defaultDonors;

  return (
    <div className="pt-24 sm:pt-32 pb-12 sm:pb-16 min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#FFF0C2] to-transparent -z-10"></div>
      <div className="absolute top-20 right-[-10%] w-[30%] opacity-10 pointer-events-none z-0">
        <img src="/images/mandala-bg.png" alt="" className="w-full h-auto animate-spin-slow" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-16">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black text-[#8B0000] mb-3 sm:mb-4 drop-shadow-sm ${isTamil ? 'font-tamil' : ''}`}>
            {t('donorsTitle')}
          </h1>
          <p className={`text-sm sm:text-base md:text-xl text-[#B8860B] max-w-3xl mx-auto px-2 ${isTamil ? 'font-tamil' : ''}`}>
            {t('donorsGratitude')}
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4 sm:mt-6"></div>
        </div>

        {/* Donors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {donors.map((donor) => {
            const donorName = isEnglish && donor.name_en ? donor.name_en : donor.name;
            const donorLocation = isEnglish && donor.location_en ? donor.location_en : donor.location;
            const donorPurpose = isEnglish && donor.purpose_en ? donor.purpose_en : donor.purpose;
            const donorDate = isEnglish && donor.date_en ? donor.date_en : donor.date;

            return (
              <div 
                key={donor.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FFF0C2] overflow-hidden group hover:-translate-y-1"
              >
                {/* Card Header with Design */}
                <div className="bg-gradient-to-r from-[#8B0000] to-[#B80000] p-4 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full -mr-8 -mt-8"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-white opacity-10 rounded-full -ml-4 -mb-4"></div>
                  
                  <div className="w-16 h-16 bg-[#FFF0C2] rounded-full mx-auto flex items-center justify-center mb-2 shadow-inner border-2 border-white">
                    <i className="fas fa-praying-hands text-[#8B0000] text-2xl"></i>
                  </div>
                  <h3 className={`text-white font-bold text-lg line-clamp-1 ${isTamil ? 'font-tamil' : ''}`}>{donorName}</h3>
                  <p className={`text-[#FFD700] text-sm font-medium ${isTamil ? 'font-tamil' : ''}`}>{donorLocation}</p>
                </div>

                {/* Card Body */}
                <div className="p-5 text-center relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-3 text-[#d4af37]">
                    <i className="fas fa-star text-xs"></i>
                  </div>
                  
                  <div className="mb-4 mt-2">
                    <p className={`text-gray-500 text-xs uppercase tracking-wider mb-1 ${isTamil ? 'font-tamil' : ''}`}>{t('donationAmountLabel')}</p>
                    <p className="text-2xl font-black text-[#8B0000]">{donor.amount}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-2 border border-gray-100">
                    <p className={`text-gray-500 text-xs mb-1 ${isTamil ? 'font-tamil' : ''}`}>{t('purposeSupport')}</p>
                    <p className={`text-[#B8860B] font-bold text-sm ${isTamil ? 'font-tamil' : ''}`}>{donorPurpose}</p>
                  </div>
                  
                  <div className={`mt-3 flex items-center justify-center text-xs text-gray-400 ${isTamil ? 'font-tamil' : ''}`}>
                    <i className="far fa-calendar-alt mr-1"></i>
                    {donorDate}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 bg-white rounded-2xl shadow-md p-8 border border-[#FFF0C2] max-w-4xl mx-auto text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("/images/pattern.png")' }}></div>
          <div className="relative z-10">
            <h2 className={`text-2xl md:text-3xl font-bold text-[#8B0000] mb-4 ${isTamil ? 'font-tamil' : ''}`}>{t('wishToDonateTitle')}</h2>
            <p className={`text-gray-600 mb-6 ${isTamil ? 'font-tamil' : ''}`}>
              {t('wishToDonateDesc')}
            </p>
            <a 
              href="/#donation" 
              className={`inline-block bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] hover:from-[#8B0000] hover:to-[#B80000] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl ${isTamil ? 'font-tamil' : ''}`}
              onClick={(e) => {
                if(window.location.pathname !== '/') {
                  window.location.href = '/#donation';
                }
              }}
            >
              <i className="fas fa-hand-holding-heart mr-2"></i>
              {t('donateNow')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorsPage;
