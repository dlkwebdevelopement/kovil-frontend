import React from 'react';

const Sponsor = () => {
  return (
    <section className="py-12 bg-[#d4af37] text-gray-900 text-center">
      <div className="container mx-auto px-3">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
          <img src="/images/prayer-hands-placeholder.png" alt="Prayer Hands" className="w-24 mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-tamil text-[#4B2E15]">வாழ்நாள் புரவலராகுங்கள்</h2>
          <p className="text-lg md:text-xl mb-8 font-tamil leading-relaxed text-[#4B2E15]">
            வாழ்நாள் புரவலராக மாறி எங்களது நோக்கத்திற்கு ஆதரவளியுங்கள். வருங்கால சந்ததியினருக்காக நமது வளமான பாரம்பரியத்தை பாதுகாக்க உதவுங்கள்.
          </p>
          <button className="bg-gray-900 px-10 py-3 rounded-full text-white font-bold hover:bg-black transition-colors shadow-lg font-tamil text-lg">
            விசாரிக்க
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sponsor;
