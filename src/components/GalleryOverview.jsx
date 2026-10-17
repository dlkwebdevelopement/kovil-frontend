import React, { useState, useEffect } from 'react';
import { StaggerContainer, StaggerItem } from './AnimatedSection';
import { fallbackGalleryItems } from './GalleryPage';
import { useLanguage } from '../context/LanguageContext';

const ornaments = Array.from({ length: 5 });

const GallerySidePattern = ({ mirrored = false }) => (
  <div className={`relative hidden flex-col items-center justify-between py-8 lg:flex ${mirrored ? '-scale-x-100' : ''}`} aria-hidden="true">
    <div className="h-full w-px bg-gradient-to-b from-transparent via-[#d4af37] to-transparent" />
    <div className="absolute flex h-full flex-col items-center justify-around">
      {ornaments.map((_, index) => (
        <img key={index} src="/images/info-icons/om.png" alt="" className="h-9 w-9 object-contain opacity-80" />
      ))}
    </div>
  </div>
);

export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
  }
  return dateStr;
};

const GalleryOverview = () => {
  const { t, isTamil, isEnglish } = useLanguage();
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setGalleryItems(data.data);
        } else {
          setGalleryItems(fallbackGalleryItems);
        }
      })
      .catch(err => {
        console.error("Failed to load gallery:", err);
        if (isMounted) setGalleryItems(fallbackGalleryItems);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  const rawCategories = [...new Set(galleryItems.map(item => item.category).filter(Boolean))];
  const categories = [
    { key: 'ALL', label: t('allCategory') },
    ...rawCategories.map(cat => ({ key: cat, label: cat }))
  ];

  const filteredItems = selectedCategory === 'ALL' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#FFF9E6] pt-24 sm:pt-32 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 min-h-[42px]">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm border cursor-pointer ${isTamil ? 'font-tamil' : ''} ${
                selectedCategory === category.key 
                  ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-md -translate-y-0.5' 
                  : 'bg-white text-[#8B0000] border-[#d4af37]/40 hover:bg-[#FFFDF5] hover:border-[#d4af37]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[72px_minmax(0,1fr)_72px] lg:gap-5">
          <GallerySidePattern />

          {loading ? (
            /* Skeleton Loading Grid */
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-[#FFFDF5] p-3 shadow-sm">
                  <div className="aspect-[4/3] w-full rounded-xl bg-gray-200" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <StaggerContainer
              key={`${selectedCategory}-${galleryItems.length}`}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              delayChildren={0.05}
              staggerChildren={0.05}
            >
              {filteredItems.map((item, index) => {
                const originalIndex = galleryItems.findIndex(i => (i.id && item.id ? i.id === item.id : i.image === item.image));
                const coverImg = (Array.isArray(item.images) && item.images.length > 0) ? item.images[0] : item.image;
                const photoCount = Array.isArray(item.images) ? item.images.length : (item.image ? 1 : 0);
                const displayDate = formatDisplayDate(item.date);
                const itemTitle = isEnglish && item.title_en ? item.title_en : item.title;

                return (
                  <StaggerItem key={item.id || item.image || index}>
                    <a
                      href={`/gallery?image=${originalIndex !== -1 ? originalIndex : index}`}
                      className="group block overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-[#FFFDF5] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <div className="relative">
                        <img
                          src={coverImg}
                          alt={itemTitle}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.src = '/images/hero-bg-latest.png';
                          }}
                          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Category tag overlay on image */}
                        <div className={`absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#a05a2c] shadow-sm ${isTamil ? 'font-tamil' : ''}`}>
                          {item.category}
                        </div>

                        {/* Multi-image indicator badge */}
                        {photoCount > 1 && (
                          <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                            <i className="fas fa-images text-[11px] text-[#f6c026]" />
                            <span>{photoCount} {t('photosCountText')}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className={`font-bold text-[#8B0000] text-base group-hover:text-[#a05a2c] transition-colors truncate ${isTamil ? 'font-tamil' : ''}`}>
                          {itemTitle}
                        </h3>
                        {displayDate && (
                          <p className={`text-xs text-[#a05a2c] mt-1.5 flex items-center gap-1.5 font-medium ${isTamil ? 'font-tamil' : ''}`}>
                            <i className="far fa-calendar-alt text-[11px] text-[#8B0000]" />
                            {displayDate}
                          </p>
                        )}
                      </div>
                    </a>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <i className="fas fa-images text-5xl text-[#d4af37]/50 mb-3" />
              <p className={`text-base font-bold text-[#8B0000] ${isTamil ? 'font-tamil' : ''}`}>
                {t('noGalleryItems')}
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory('ALL')}
                className={`mt-3 px-4 py-1.5 rounded-full bg-[#8B0000] text-white text-xs font-bold hover:bg-[#6e0000] transition cursor-pointer ${isTamil ? 'font-tamil' : ''}`}
              >
                {t('viewAllPhotosBtn')}
              </button>
            </div>
          )}

          <GallerySidePattern mirrored />
        </div>
      </div>
    </main>
  );
};

export default GalleryOverview;
