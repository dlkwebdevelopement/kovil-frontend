import React, { useEffect, useState, useCallback } from 'react';
import EventCard from './EventCard';
import FeaturedEventCard from './FeaturedEventCard';
import { StaggerContainer, StaggerItem } from './AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const UpcomingEvents = () => {
  const { t, isTamil, isEnglish } = useLanguage();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [todayPanchangam, setTodayPanchangam] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const fetchEvents = useCallback(() => {
    Promise.all([
      fetch('/api/upcoming-events').then((res) => res.json()).catch(() => ({ success: false, data: [] })),
      fetch('/api/panchangam/events/upcoming').then((res) => res.json()).catch(() => ({ success: false, data: [] })),
      fetch('/api/panchangam/today').then((res) => res.json()).catch(() => ({ success: false, data: null }))
    ])
      .then(([adminRes, panchangamRes, todayRes]) => {
        let adminTemplates = [];
        if (adminRes.success && Array.isArray(adminRes.data)) {
          adminTemplates = adminRes.data;
        }

        // 1. Process custom upcoming events from Admin Panel
        const customItems = adminTemplates.map((adminEv) => {
          const dateObj = adminEv.date ? new Date(`${adminEv.date}T00:00:00`) : new Date();
          return {
            id: adminEv.id || `admin-${adminEv.date}-${adminEv.title}-${adminEv.time || ''}`,
            title: adminEv.title || 'சிறப்பு நிகழ்வு',
            title_en: adminEv.title_en || adminEv.title,
            subtitle: adminEv.subtitle || '',
            subtitle_en: adminEv.subtitle_en || adminEv.subtitle,
            time: adminEv.time || 'காலை 8:00 மணி',
            date: adminEv.date,
            day: adminEv.day || (adminEv.date ? adminEv.date.split('-')[2] : ''),
            month: adminEv.month || dateObj.toLocaleString('ta-IN', { month: 'short' }),
            month_ta: adminEv.month || dateObj.toLocaleString('ta-IN', { month: 'short' }),
            month_en: dateObj.toLocaleString('en-US', { month: 'short' }),
            image: adminEv.image || '/images/event-card-icon.png',
            featured: Boolean(adminEv.featured),
            isAdminEvent: true,
          };
        });

        // 2. Process panchangam / temple events
        let panchangamItems = [];
        if (panchangamRes.success && Array.isArray(panchangamRes.data)) {
          panchangamItems = panchangamRes.data.map((pEvent) => {
            const dateObj = new Date(`${pEvent.date}T00:00:00`);

            // Find matching template from Admin Panel to enrich image/custom details
            const pName = (pEvent.event_name || '').toLowerCase();
            const pType = (pEvent.event_type || '').toLowerCase();
            const pNote = (pEvent.note || '').toLowerCase();

            const matchedTemplate = adminTemplates.find((adminEv) => {
              if (adminEv.date && adminEv.date === pEvent.date) return true;
              const aTitle = (adminEv.title || '').toLowerCase();
              const aSub = (adminEv.subtitle || '').toLowerCase();

              if (pType === "navasakthi" && aTitle.includes("நவசக்தி அர்ச்சனை")) return true;
              if (pType === "ther_utsavam" && aTitle.includes("தேர்")) return true;
              if (pType === "pournami" && (aTitle.includes("பௌர்ணமி") || aTitle.includes("திருவிளக்கு"))) return true;
              if (pType === "amavasai" && (aTitle.includes("அமாவாசை") || aTitle.includes("ஊஞ்சல்"))) return true;
              if (pType.includes("ashtami") && (aTitle.includes("அஷ்டமி") || aTitle.includes("பிரத்யங்கிரா"))) return true;
              if (pType === "thiruvizha_start" && aTitle.includes("திருவிழா")) return true;

              if (pName.includes(aTitle) || (aTitle.length > 5 && pName.includes(aTitle.split(' ')[0]))) return true;
              if (aSub && (pNote.includes(aSub) || pName.includes(aSub))) return true;
              return false;
            });

            return {
              id: pEvent.id || `panchangam-${pEvent.date}-${pEvent.event_type}`,
              title: matchedTemplate ? matchedTemplate.title : pEvent.event_name,
              title_en: pEvent.event_name_en || (matchedTemplate ? matchedTemplate.title_en || matchedTemplate.title : pEvent.event_name),
              subtitle: matchedTemplate ? matchedTemplate.subtitle : (pEvent.note || pEvent.event_type),
              subtitle_en: matchedTemplate ? (matchedTemplate.subtitle_en || matchedTemplate.subtitle) : (pEvent.note || pEvent.event_type),
              time: matchedTemplate ? matchedTemplate.time : 'முழு நாள்',
              date: pEvent.date,
              day: dateObj.getDate().toString().padStart(2, '0'),
              month: dateObj.toLocaleString('ta-IN', { month: 'short' }),
              month_ta: dateObj.toLocaleString('ta-IN', { month: 'short' }),
              month_en: dateObj.toLocaleString('en-US', { month: 'short' }),
              image: matchedTemplate ? matchedTemplate.image : (pEvent.event_type === 'pournami' ? '/images/hero-bg-latest.png' : '/images/event-card-icon.png'),
              featured: matchedTemplate ? matchedTemplate.featured : false,
              isPanchangam: true,
            };
          });
        }

        // 3. Combine both collections, keeping unique events by ID or unique (date + title + time)
        const combined = [];
        const seen = new Set();

        [...customItems, ...panchangamItems].forEach((item) => {
          const key = item.id || `${item.date}_${item.title}_${item.time}`;
          if (!seen.has(key)) {
            seen.add(key);
            combined.push(item);
          }
        });

        // Sort by date (ascending)
        combined.sort((a, b) => (a.date || '').localeCompare(b.date || ''));

        // 4. Determine "Today's" date and panchangam details
        const todayData = todayRes.data;
        const todayDateStr = todayData ? todayData.gregorian_date : new Date().toISOString().split('T')[0];

        const panchangamDetails = todayData ? {
          tithi: todayData.tithi,
          nalla_neram: todayData.nalla_neram || todayData['நல்ல_நேரம்'],
          rahu_kalam: todayData.rahu_kalam || todayData['ராகு_காலம்'],
          yamagandam: todayData.yamagandam || todayData['எமகண்டம்'],
          kuligai: todayData.kuligai || todayData['குளிகை'],
          tamil_date: todayData.tamil_date,
          tamil_month: todayData.tamil_month,
          weekday: todayData.weekday
        } : null;

        setTodayPanchangam(panchangamDetails);

        // Find ALL events that match today's date (multi same date)
        let todayEventsList = combined.filter((e) => e.date === todayDateStr);

        // If no events match today's date directly, check if any event was explicitly flagged as featured
        if (todayEventsList.length === 0) {
          const featuredOnly = combined.filter((e) => e.featured);
          if (featuredOnly.length > 0) {
            // Group all events with the same date as the featured event
            const featuredDate = featuredOnly[0].date;
            todayEventsList = combined.filter((e) => e.date === featuredDate);
          }
        }

        // If still empty, create generic today card
        if (todayEventsList.length === 0) {
          const dateObj = new Date();
          todayEventsList = [{
            id: 'today-card',
            title: 'இன்றைய நாளின் சிறப்புகள்',
            title_en: "Today's Temple Highlights",
            subtitle: todayData ? `${todayData.tamil_month} ${todayData.tamil_date}` : 'இன்று',
            subtitle_en: 'Today',
            time: '',
            date: todayDateStr,
            day: dateObj.getDate().toString().padStart(2, '0'),
            month: dateObj.toLocaleString('ta-IN', { month: 'short' }),
            month_ta: dateObj.toLocaleString('ta-IN', { month: 'short' }),
            month_en: dateObj.toLocaleString('en-US', { month: 'short' }),
            image: '/images/hero-bg-latest.png',
            featured: true,
            isTodayOnly: true
          }];
        }

        // Enrich all today events with panchangam details
        const enrichedToday = todayEventsList.map((evt) => ({
          ...evt,
          panchangamDetails: evt.panchangamDetails || panchangamDetails,
        }));

        // 5. Select 4 regular upcoming event cards for the right side
        const primaryFeaturedId = enrichedToday[0]?.id;
        const upcomingRegular = combined
          .filter((e) => e.id !== primaryFeaturedId && e.date && e.date >= todayDateStr)
          .slice(0, 4);

        setFeaturedEvents(enrichedToday);
        setEvents(upcomingRegular);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Don't render until first fetch completes
  if (!loaded) return null;

  // If no events at all, don't show the section
  if (featuredEvents.length === 0 && events.length === 0) return null;

  return (
    <section id="events" className="py-10 sm:py-12 bg-[#FFF9E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center mb-6">
          <StaggerItem className="lg:col-span-4 hidden lg:block"></StaggerItem>

          <StaggerItem className="lg:col-span-8 w-full flex justify-between items-center gap-2 sm:gap-4">
            <div className="flex items-center whitespace-nowrap">
              <i className="fas fa-gem mr-2 text-[#d4af37] text-sm"></i>
              <h3 className={`font-bold m-0 text-[#8B0000] text-xl sm:text-2xl ${isTamil ? 'font-tamil' : ''}`}>{t('upcomingEventsTitle')}</h3>
            </div>
            {/* Decorative line */}
            <div className="flex-grow h-px bg-gradient-to-r from-[#d4af37]/10 via-[#d4af37]/40 to-[#d4af37]/10"></div>
            <a href="/events" className={`whitespace-nowrap no-underline font-bold flex items-center text-[#a05a2c] hover:text-[#8B0000] transition-colors text-xs sm:text-sm ${isTamil ? 'font-tamil' : ''}`}>
              {t('viewAll')} <i className="fas fa-chevron-right ml-1.5 text-xs"></i>
            </a>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-12 gap-6" delayChildren={0.2} staggerChildren={0.15}>
          {/* Featured Card (Left) with Multi-Event Slideshow / Slider */}
          <StaggerItem className="lg:col-span-4 mt-0 lg:-mt-20 relative z-10">
            <FeaturedEventCard
              events={featuredEvents}
              panchangamDetails={todayPanchangam}
            />
          </StaggerItem>

          {/* 4 Upcoming Event Cards (Right) - Takes up 8 columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 h-full">
              {events.map((event) => (
                <StaggerItem key={event.id}>
                  <EventCard
                    day={event.day}
                    month={isEnglish && event.month_en ? event.month_en : event.month}
                    image={event.image}
                    title={isEnglish && event.title_en ? event.title_en : event.title}
                    subtitle={isEnglish && event.subtitle_en ? event.subtitle_en : event.subtitle}
                    time={event.time}
                  />
                </StaggerItem>
              ))}
            </div>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default UpcomingEvents;
