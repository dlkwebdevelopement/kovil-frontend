import React, { useState, useEffect } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

export const fallbackGalleryItems = [
  {
    image: 'https://picsum.photos/900/650?random=10',
    images: [
      'https://picsum.photos/900/650?random=10',
      'https://picsum.photos/900/650?random=101',
      'https://picsum.photos/900/650?random=102',
      'https://picsum.photos/900/650?random=103',
      'https://picsum.photos/900/650?random=104',
    ],
    title: 'திருக்கோவில் திருவிழா',
    title_en: 'Temple Grand Festival',
    category: 'திருவிழா நிகழ்வுகள்',
    date: '2026-10-14',
    description: 'அருள்மிகு மகா காளியம்மன் திருக்கோவிலில் நடைபெறும் சிறப்பு திருவிழாக்களின் ஆன்மிக தருணங்கள். பக்தர்கள் ஒன்றிணைந்து வழிபாடு, ஊர்வலம் மற்றும் பாரம்பரிய நிகழ்வுகளில் கலந்து கொள்ளும் காட்சிகள் இங்கே தொகுக்கப்பட்டுள்ளன.',
    description_en: 'Sacred moments of grand festivals celebrated at Arulmigu Maha Kaliamman Temple. Devotees gather for devotional rituals, holy processions, and traditional festive ceremonies.',
  },
  {
    image: 'https://picsum.photos/900/650?random=11',
    images: [
      'https://picsum.photos/900/650?random=11',
      'https://picsum.photos/900/650?random=105',
      'https://picsum.photos/900/650?random=106',
    ],
    title: 'அலங்கார தரிசனம்',
    title_en: 'Special Alankaram Darshan',
    category: 'சிறப்பு தரிசனம்',
    date: '2026-10-12',
    description: 'அம்மனுக்கு நடைபெறும் சிறப்பு அலங்காரம் மற்றும் தீபாராதனையின் அழகிய தருணங்கள். பக்தர்களுக்கு அமைதியும் பக்தி உணர்வும் அளிக்கும் இந்த தரிசனக் காட்சிகள் கோவிலின் தனிச்சிறப்பை வெளிப்படுத்துகின்றன.',
    description_en: 'Sublime moments of special flower decorations (alankaram) and maha deeparadhana for Goddess Kaliamman, bringing divine peace and serenity to all devotees.',
  },
  {
    image: 'https://picsum.photos/900/650?random=12',
    images: [
      'https://picsum.photos/900/650?random=12',
      'https://picsum.photos/900/650?random=107',
      'https://picsum.photos/900/650?random=108',
      'https://picsum.photos/900/650?random=109',
    ],
    title: 'நவராத்திரி சிறப்பு',
    title_en: 'Navaratri Celebrations',
    category: 'சிறப்பு பூஜை',
    date: '2026-10-10',
    description: 'நவராத்திரி பண்டிகையை முன்னிட்டு நடைபெறும் சிறப்பு பூஜைகள் மற்றும் அலங்காரங்கள்.',
    description_en: 'Auspicious special poojas, sacred havans, and vibrant festive alankarams during the holy Navaratri festival.',
  },
  {
    image: 'https://picsum.photos/900/650?random=13',
    images: [
      'https://picsum.photos/900/650?random=13',
      'https://picsum.photos/900/650?random=110',
      'https://picsum.photos/900/650?random=111',
    ],
    title: 'தீப அலங்காரம்',
    title_en: 'Deepam Illumination',
    category: 'ஆன்மிக தருணங்கள்',
    date: '2026-10-08',
    description: 'விளக்குகளால் ஒளிரும் கோவில் வளாகத்தின் மனதை கவரும் காட்சிகள். மாலை நேர வழிபாட்டில் பக்தர்கள் அனுபவிக்கும் ஆன்மிக நிறைவை இந்தப் புகைப்படங்கள் எடுத்துக்காட்டுகின்றன.',
    description_en: 'Breathtaking scenes of the temple sanctum illuminated by hundreds of traditional oil lamps during the sacred evening deepa aradhana.',
  },
  {
    image: 'https://picsum.photos/900/650?random=14',
    images: [
      'https://picsum.photos/900/650?random=14',
      'https://picsum.photos/900/650?random=112',
    ],
    title: 'பக்தர்களின் வழிபாடு',
    title_en: 'Devotee Congregational Prayers',
    category: 'பக்தி நிகழ்வுகள்',
    date: '2026-10-05',
    description: 'கோவிலுக்கு வரும் பக்தர்கள் தங்கள் வேண்டுதல்களுடன் அம்மனை வழிபடும் நெகிழ்வான தருணங்கள். சமூகத்தின் நம்பிக்கையையும் கோவிலுடன் கொண்டுள்ள அன்பையும் இந்தப் பகுதி பிரதிபலிக்கிறது.',
    description_en: 'Touching moments of devotees offering heartfelt prayers and seeking the divine grace and protection of Goddess Kaliamman.',
  },
  {
    image: 'https://picsum.photos/900/650?random=15',
    images: [
      'https://picsum.photos/900/650?random=15',
      'https://picsum.photos/900/650?random=113',
    ],
    title: 'ஆடி வெள்ளி பூஜை',
    title_en: 'Aadi Friday Special Pooja',
    category: 'சிறப்பு பூஜை',
    date: '2026-10-01',
    description: 'ஆடி மாத வெள்ளிக்கிழமைகளில் நடைபெறும் சிறப்பு அம்மன் அலங்காரம் மற்றும் மகா தீபாராதனை.',
    description_en: 'Grand Aadi Velli special pooja, sacred milk abhishekam, and golden chariot deeparadhana dedicated to Goddess Kaliamman.',
  },
  ...Array.from({ length: 14 }, (_, index) => ({
    image: `https://picsum.photos/900/650?random=${index + 16}`,
    images: [`https://picsum.photos/900/650?random=${index + 16}`],
    title: `கோவில் நினைவுகள் ${index + 7}`,
    title_en: `Temple Memories ${index + 7}`,
    category: index % 3 === 0 ? 'சிறப்பு பூஜை' : index % 2 === 0 ? 'திருவிழா நிகழ்வுகள்' : 'கோவில் வளாகம்',
    date: `2026-09-${String(Math.max(1, 28 - index)).padStart(2, '0')}`,
    description: 'திருக்கோவில் வளாகத்தின் பக்தி நிறைந்த தருணங்களையும் பாரம்பரிய அழகையும் பதிவு செய்யும் சிறப்பு புகைப்படம். இந்த புனித காட்சி கோவிலின் அமைதியையும் ஆன்மிக உணர்வையும் எடுத்துக்காட்டுகிறது.',
    description_en: 'Photographic capture of divine devotion and spiritual tranquility within the holy sanctum of Arulmigu Maha Kaliamman Temple.',
  })),
];

export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
  }
  return dateStr;
};

const GalleryPage = () => {
  const { t, isTamil } = useLanguage();
  const [galleryItems, setGalleryItems] = useState(fallbackGalleryItems);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setGalleryItems(data.data);
        }
      })
      .catch(err => console.error("Failed to load gallery:", err));
  }, []);

  const imageParam = new URLSearchParams(window.location.search).get('image');
  const initialIndex = Number.isInteger(Number(imageParam)) && Number(imageParam) >= 0 && Number(imageParam) < galleryItems.length
    ? Number(imageParam)
    : 0;
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  
  // ensure selectedIndex is valid if galleryItems length changes
  const safeSelectedIndex = selectedIndex < galleryItems.length ? selectedIndex : 0;
  const selectedItem = galleryItems[safeSelectedIndex] || fallbackGalleryItems[0];

  const albumImages = (Array.isArray(selectedItem?.images) && selectedItem.images.length > 0)
    ? selectedItem.images
    : (selectedItem?.image ? [selectedItem.image] : []);

  // reset photo index when album changes or out of bounds
  const currentPhotoIndex = activePhotoIndex < albumImages.length ? activePhotoIndex : 0;
  const currentImage = albumImages[currentPhotoIndex] || selectedItem?.image;
  const formattedDate = formatDisplayDate(selectedItem?.date);

  const translateCategory = (cat) => {
    if (isTamil || !cat) return cat;
    const map = {
      'திருவிழா நிகழ்வுகள்': 'Festival Events',
      'சிறப்பு தரிசனம்': 'Special Darshan',
      'சிறப்பு பூஜை': 'Special Pooja',
      'ஆன்மிக தருணங்கள்': 'Spiritual Moments',
      'பக்தி நிகழ்வுகள்': 'Devotional Events',
      'கோவில் வளாகம்': 'Temple Premises',
      'அனைத்தும்': 'All'
    };
    return map[cat] || cat;
  };

  const currentTitle = (!isTamil && selectedItem?.title_en) ? selectedItem.title_en : selectedItem?.title;
  const currentDesc = (!isTamil && selectedItem?.description_en)
    ? selectedItem.description_en
    : (selectedItem?.description || (isTamil ? 'இந்த நிகழ்வின் ஆன்மிக தருணங்கள்.' : 'Spiritual and auspicious moments of this sacred occasion.'));

  // Keyboard navigation for multi-image gallery
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (albumImages.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : albumImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev < albumImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [albumImages.length]);

  const handleSelectAlbum = (newIdx) => {
    setSelectedIndex(newIdx);
    setActivePhotoIndex(0);
    const newUrl = `${window.location.pathname}?image=${newIdx}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : albumImages.length - 1));
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev < albumImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <main className="min-h-screen bg-[#FFF9E6] pt-24 sm:pt-32 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 lg:px-10">
        <AnimatedSection className="mb-6 sm:mb-8 text-center">
          <p className={`${isTamil ? 'font-tamil' : ''} text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#a05a2c]`}>
            {t('sacredMemories')}
          </p>
          <h1 className={`mt-2 ${isTamil ? 'font-tamil' : ''} text-3xl sm:text-4xl font-bold tracking-wide text-[#8B0000] md:text-5xl`}>
            {t('galleryTitle')}
          </h1>
          <p className={`mx-auto mt-2 sm:mt-3 max-w-2xl ${isTamil ? 'font-tamil' : ''} text-sm sm:text-base leading-6 sm:leading-7 text-[#5e402c]`}>
            {t('galleryPageDesc')}
          </p>
        </AnimatedSection>

        {/* Top Back Link */}
        <div className="mb-4">
          <a
            href="/gallery"
            className={`inline-flex items-center gap-2 ${isTamil ? 'font-tamil' : ''} text-xs sm:text-sm font-bold text-[#8B0000] hover:text-[#a05a2c] bg-white/80 border border-[#d4af37]/40 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-xs transition`}
          >
            <i className="fas fa-arrow-left text-xs" />
            {t('backToAllAlbums')}
          </a>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-start">
          {/* Left Column: Main Image + Multi-image Controls & Thumbnail Strip */}
          <div className="flex flex-col gap-4">
            <AnimatedSection className="relative overflow-hidden rounded-3xl border border-[#d4af37]/40 bg-[#2d1b0d] shadow-2xl group">
              <div className="relative min-h-[260px] sm:min-h-[380px] lg:min-h-[540px] flex items-center justify-center bg-black/40">
                <img
                  key={currentImage}
                  src={currentImage}
                  alt={`${currentTitle} - ${currentPhotoIndex + 1}`}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = '/images/hero-bg-latest.png';
                  }}
                  className="max-h-[620px] w-full object-contain select-none transition-all duration-300"
                />

                {/* Photo counter badge */}
                {albumImages.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20">
                    <i className="fas fa-camera text-[#f6c026]" />
                    <span>{t('photoNumber', { current: currentPhotoIndex + 1, total: albumImages.length })}</span>
                  </div>
                )}

                {/* Previous & Next Buttons */}
                {albumImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-200 border border-white/20 shadow-lg cursor-pointer"
                      title={t('prevPhoto')}
                      aria-label={t('prevPhoto')}
                    >
                      <i className="fas fa-chevron-left text-base" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-200 border border-white/20 shadow-lg cursor-pointer"
                      title={t('nextPhoto')}
                      aria-label={t('nextPhoto')}
                    >
                      <i className="fas fa-chevron-right text-base" />
                    </button>
                  </>
                )}
              </div>

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-6 pb-5 pt-16 text-white md:px-8">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`${isTamil ? 'font-tamil' : ''} text-xs font-bold bg-[#8B0000] text-white px-3 py-1 rounded-full`}>
                    {translateCategory(selectedItem?.category)}
                  </span>
                  {formattedDate && (
                    <span className="text-xs text-[#f6c026] flex items-center gap-1.5 font-semibold bg-black/50 px-2.5 py-1 rounded-full border border-[#f6c026]/30">
                      <i className="far fa-calendar-alt text-[11px]" />
                      {formattedDate}
                    </span>
                  )}
                </div>
                <h2 className={`mt-2 ${isTamil ? 'font-tamil' : ''} text-xl font-bold md:text-2xl text-white drop-shadow`}>
                  {currentTitle}
                </h2>
              </div>
            </AnimatedSection>

            {/* Thumbnail Strip for Multi-Images */}
            {albumImages.length > 1 && (
              <AnimatedSection className="rounded-2xl border border-[#d4af37]/40 bg-[#FFFDF5] p-3 shadow-md">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className={`${isTamil ? 'font-tamil' : ''} text-xs font-bold text-[#8B0000]`}>
                    {t('albumPhotosHeader', { count: albumImages.length })}
                  </span>
                  <span className={`text-[11px] text-gray-500 ${isTamil ? 'font-tamil' : ''}`}>
                    {t('clickToEnlarge')}
                  </span>
                </div>
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#d4af37]/60">
                  {albumImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        currentPhotoIndex === idx
                          ? 'border-[#8B0000] ring-2 ring-[#d4af37] scale-105 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100 hover:border-[#d4af37]/60'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumb ${idx + 1}`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.src = '/images/event-card-icon.png';
                        }}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0.5 right-1 bg-black/70 text-white text-[9px] px-1 rounded">
                        #{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </AnimatedSection>
            )}
          </div>

          {/* Right Column: Album Details & Navigation */}
          <AnimatedSection className="flex flex-col justify-start rounded-3xl border border-[#d4af37]/40 bg-white/90 p-6 shadow-xl md:p-8">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className={`${isTamil ? 'font-tamil' : ''} text-xs font-bold tracking-widest text-[#a05a2c] uppercase bg-[#FFF9E6] px-3 py-1 rounded-full border border-[#d4af37]/30`}>
                {selectedItem?.rightSideDetail || t('photoDetailLabel')}
              </span>
              {formattedDate && (
                <span className={`${isTamil ? 'font-tamil' : ''} text-xs font-bold text-[#8B0000] bg-[#f6c026]/20 px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#d4af37]/40`}>
                  <i className="far fa-calendar-alt text-[11px] text-[#8B0000]" />
                  {t('dateLabel')} {formattedDate}
                </span>
              )}
            </div>

            <h2 className={`mt-4 ${isTamil ? 'font-tamil' : ''} text-2xl font-bold leading-tight text-[#8B0000] md:text-3xl`}>
              {currentTitle}
            </h2>

            {albumImages.length > 1 && (
              <div className={`mt-2.5 inline-flex items-center gap-2 text-xs ${isTamil ? 'font-tamil' : ''} font-bold text-[#a05a2c]`}>
                <i className="fas fa-images text-[#d4af37]" />
                {t('totalPhotosAttached', { count: albumImages.length })}
              </div>
            )}

            <div className="my-5 h-1 w-16 rounded-full bg-[#d4af37]" />

            <p className={`${isTamil ? 'font-tamil' : ''} text-base leading-8 text-[#5e402c] whitespace-pre-line`}>
              {currentDesc}
            </p>

            {/* Album Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-[#d4af37]/30 flex flex-col gap-3">
              <div className={`text-xs ${isTamil ? 'font-tamil' : ''} font-bold text-[#a05a2c] mb-1`}>
                {t('otherGalleryEvents')}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectAlbum(safeSelectedIndex > 0 ? safeSelectedIndex - 1 : galleryItems.length - 1)}
                  className={`flex-1 rounded-xl border border-[#d4af37]/50 bg-[#FFFDF5] hover:bg-[#ebd9a6]/30 py-2.5 px-3 text-xs ${isTamil ? 'font-tamil' : ''} font-bold text-[#8B0000] flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs`}
                >
                  <i className="fas fa-chevron-left text-[10px]" />
                  {t('prevAlbum')}
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectAlbum(safeSelectedIndex < galleryItems.length - 1 ? safeSelectedIndex + 1 : 0)}
                  className={`flex-1 rounded-xl border border-[#d4af37]/50 bg-[#FFFDF5] hover:bg-[#ebd9a6]/30 py-2.5 px-3 text-xs ${isTamil ? 'font-tamil' : ''} font-bold text-[#8B0000] flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs`}
                >
                  {t('nextAlbum')}
                  <i className="fas fa-chevron-right text-[10px]" />
                </button>
              </div>

              <a
                href="/gallery"
                className={`w-full text-center mt-2 rounded-xl bg-[#8B0000] hover:bg-[#6e0000] text-white py-2.5 px-4 ${isTamil ? 'font-tamil' : ''} text-xs font-bold transition shadow-sm`}
              >
                {t('viewAllAlbums')}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
};

export default GalleryPage;
