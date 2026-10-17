import { useEffect, useMemo, useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { useLanguage } from '../context/LanguageContext';

const tamilMonths = [
  'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்',
  'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'
];

const englishMonths = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const weekdaysTa = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];
const weekdaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const eventColors = {
  pournami: 'bg-[#d4af37]',
  amavasai: 'bg-[#6b4f8a]',
  krishna_ashtami: 'bg-[#8B0000]',
  navasakthi: 'bg-[#2f7d5a]',
  tamil_new_year: 'bg-[#2f7d5a]',
  aadi_pooram: 'bg-[#c46a2b]',
  aadi_kram: 'bg-[#328c9b]',
  ther_utsavam: 'bg-[#b04463]',
  thiruvizha_start: 'bg-[#b04463]',
  chithira_pournami: 'bg-[#d4af37]'
};

const eventIcons = {
  pournami: '/images/event-icons/ChatGPT_Image_Aug_3__2026__03_57_15_PM-removebg-preview.png',
  chithira_pournami: '/images/event-icons/ChatGPT_Image_Aug_3__2026__03_57_15_PM-removebg-preview.png',
  amavasai: '/images/event-icons/ChatGPT_Image_Aug_5__2026__11_21_32_AM-removebg-preview.png',
  krishna_ashtami: '/images/event-icons/ChatGPT_Image_Sep_11__2026__10_36_10_AM-removebg-preview.png',
  navasakthi: '/images/event-icons/ChatGPT_Image_Sep_11__2026__10_47_13_AM-removebg-preview.png',
  ther_utsavam: '/images/event-icons/ChatGPT_Image_Sep_11__2026__10_47_13_AM-removebg-preview.png',
  thiruvizha_start: '/images/event-icons/ChatGPT_Image_Sep_11__2026__10_47_13_AM-removebg-preview.png'
};

const legendItems = [
  { type: 'pournami', key: 'legendPournami' },
  { type: 'amavasai', key: 'legendAmavasai' },
  { type: 'krishna_ashtami', key: 'legendAshtami' },
  { type: 'navasakthi', key: 'legendNavasakthi' },
  { type: 'ther_utsavam', key: 'legendTher' }
];

const EventIcon = ({ type, className = 'h-8 w-8' }) => {
  return <img src={eventIcons[type]} alt="" className={`${className} object-contain`} />;
};

const formatDate = (date) => {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
};

const getDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const EventsPage = () => {
  const { t, isTamil } = useLanguage();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(Math.min(Math.max(today.getFullYear(), 2026), 2036));
  const [todayKey, setTodayKey] = useState(() => getDateKey());
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => getDateKey(today));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const refreshToday = () => setTodayKey(getDateKey());
    const interval = window.setInterval(refreshToday, 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadMonth = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/panchangam/month/${year}/${month}`);
        if (!response.ok) throw new Error('Calendar data could not be loaded');
        const payload = await response.json();
        const monthDays = payload.data || [];
        setDays(monthDays);
        setSelectedDate(monthDays.some((day) => day.gregorian_date === todayKey) ? todayKey : null);
      } catch (loadError) {
        setError(loadError.message);
        setDays([]);
      } finally {
        setLoading(false);
      }
    };

    loadMonth();
  }, [month, todayKey, year]);

  const eventsByDate = useMemo(() => {
    return days.reduce((events, day) => {
      events[day.gregorian_date] = day.events || [];
      return events;
    }, {});
  }, [days]);

  const firstDay = days.length ? new Date(`${year}-${String(month).padStart(2, '0')}-01T00:00:00`).getDay() : 0;
  const calendarCells = [...Array(firstDay).fill(null), ...days];
  const selectedEvents = selectedDate ? eventsByDate[selectedDate] || [] : [];
  const selectedDay = days.find((day) => day.gregorian_date === selectedDate);

  const changeMonth = (offset) => {
    const next = new Date(year, month - 1 + offset, 1);
    if (next.getFullYear() < 2026 || next.getFullYear() > 2036) return;
    setYear(next.getFullYear());
    setMonth(next.getMonth() + 1);
  };

  const translateWeekday = (w) => {
    if (isTamil || !w) return w;
    const map = {
      'ஞாயிறு': 'Sunday', 'திங்கள்': 'Monday', 'செவ்வாய்': 'Tuesday',
      'புதன்': 'Wednesday', 'வியாழன்': 'Thursday', 'வெள்ளி': 'Friday', 'சனி': 'Saturday',
      'ஞாயிற்றுக்கிழமை': 'Sunday', 'திங்கட்கிழமை': 'Monday', 'செவ்வாய்க்கிழமை': 'Tuesday',
      'புதன்கிழமை': 'Wednesday', 'வியாழக்கிழமை': 'Thursday', 'வெள்ளிக்கிழமை': 'Friday', 'சனிக்கிழமை': 'Saturday'
    };
    return map[w] || w;
  };

  const currentMonthDisplay = isTamil ? tamilMonths[month - 1] : englishMonths[month - 1];
  const currentWeekdays = isTamil ? weekdaysTa : weekdaysEn;

  return (
    <main className={`min-h-screen bg-[#fff9e6] pt-24 sm:pt-32 pb-12 sm:pb-16 ${isTamil ? 'font-tamil' : ''}`}>
      <section className="container mx-auto px-3 sm:px-4 lg:px-12">
        <AnimatedSection className="mb-8 sm:mb-10 text-center">
          <div className="mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3 text-[#d4af37]">
            <span className="h-px w-10 sm:w-14 bg-[#d4af37]/50" />
            <i className="fas fa-gem text-xs sm:text-sm" />
            <span className="h-px w-10 sm:w-14 bg-[#d4af37]/50" />
          </div>
          <p className="mb-1 text-xs sm:text-sm font-bold tracking-[0.18em] text-[#a05a2c]">
            {t('templeTitle')}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#8B0000]">
            {t('navEvents')}
          </h1>
          <p className="mx-auto mt-2 sm:mt-3 max-w-xl text-sm sm:text-base text-[#6f5a49]">
            {t('eventsSubtitle')}
          </p>
        </AnimatedSection>

        <AnimatedSection className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]" delay={0.1}>
          <div className="rounded-2xl border border-[#d4af37]/45 bg-[#fffdf5] p-3 sm:p-5 md:p-7 shadow-[0_12px_35px_rgba(139,0,0,0.08)]">
            <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2 sm:gap-3 border-b border-[#d4af37]/25 pb-4 sm:pb-5">
              <button
                onClick={() => changeMonth(-1)}
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#d4af37]/50 text-[#8B0000] transition hover:bg-[#8B0000] hover:text-white cursor-pointer"
                aria-label={t('prevMonthLabel')}
                title={t('prevMonthLabel')}
              >
                <i className="fas fa-chevron-left text-sm" />
              </button>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-[#8B0000]">{currentMonthDisplay}</p>
                <p className="text-xs sm:text-sm font-bold text-[#a05a2c]">
                  {isTamil ? `${year} · ${month} ${t('monthNumberLabel')}` : `${currentMonthDisplay} ${year}`}
                </p>
              </div>
              <button
                onClick={() => changeMonth(1)}
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#d4af37]/50 text-[#8B0000] transition hover:bg-[#8B0000] hover:text-white cursor-pointer"
                aria-label={t('nextMonthLabel')}
                title={t('nextMonthLabel')}
              >
                <i className="fas fa-chevron-right text-sm" />
              </button>
            </div>

            {loading && (
              <div className="flex min-h-[300px] sm:min-h-[360px] items-center justify-center text-[#8B0000]">
                <i className="fas fa-spinner fa-spin mr-2" /> {t('calendarLoading')}
              </div>
            )}
            {!loading && error && (
              <div className="rounded-xl bg-red-50 p-6 text-center text-[#8B0000]">{error}</div>
            )}
            {!loading && !error && (
              <>
                <div className="mb-1 sm:mb-2 grid grid-cols-7 gap-0.5 sm:gap-1 text-center text-[10px] sm:text-xs font-bold text-[#a05a2c] md:gap-2 md:text-sm">
                  {currentWeekdays.map((weekday) => (
                    <div key={weekday} className="py-1 sm:py-2 truncate">{weekday}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 md:gap-2">
                  {calendarCells.map((day, index) => {
                    if (!day) return <div key={`empty-${index}`} className="min-h-12 sm:min-h-16 rounded-lg md:min-h-24" />;
                    const dayEvents = eventsByDate[day.gregorian_date] || [];
                    const isToday = todayKey === day.gregorian_date;
                    const isSelected = selectedDate === day.gregorian_date;
                    return (
                      <button
                        key={day.gregorian_date}
                        onClick={() => setSelectedDate(day.gregorian_date)}
                        aria-current={isToday ? 'date' : undefined}
                        className={`min-h-12 sm:min-h-16 rounded-lg border p-1 text-left transition md:min-h-24 md:p-2 cursor-pointer ${
                          isToday
                            ? 'border-2 border-[#d4af37] bg-[#fff4c4] shadow-md ring-2 ring-[#d4af37]/30'
                            : isSelected
                            ? 'border-[#8B0000] bg-[#fff0d2] shadow-md'
                            : 'border-[#eadfbf] bg-white hover:border-[#d4af37] hover:bg-[#fffaf0]'
                        }`}
                      >
                        <span className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[10px] sm:text-xs font-black ${
                          isToday ? 'bg-[#d4af37] text-[#8B0000]' : isSelected ? 'bg-[#8B0000] text-white' : 'text-[#4B2E15]'
                        }`}>
                          {Number(day.gregorian_date.slice(-2))}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="mt-0.5 sm:mt-1 flex flex-wrap items-center gap-0.5 sm:gap-1">
                            {dayEvents.slice(0, 3).map((event) => (
                              <span
                                key={`${day.gregorian_date}-${event.event_type}`}
                                className="flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center"
                                title={(!isTamil && event.event_name_en) ? event.event_name_en : event.event_name}
                              >
                                <EventIcon type={event.event_type} className="h-4 w-4 sm:h-7 sm:w-7" />
                              </span>
                            ))}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <aside className="rounded-2xl border border-[#d4af37]/45 bg-[#8B0000] p-6 text-white shadow-[0_12px_35px_rgba(139,0,0,0.16)]">
            <div className="mb-5 flex items-center gap-3 border-b border-white/20 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d4af37]">
                <img src="/images/event-icons/calender.png" alt="" className="h-9 w-9 object-contain" />
              </div>
              <div>
                <p className="text-xs text-[#f6d98a]">{t('selectedDateLabel')}</p>
                <h2 className="text-xl font-black">
                  {selectedDay ? formatDate(selectedDay.gregorian_date) : t('selectDatePrompt')}
                </h2>
              </div>
            </div>
            {selectedDay ? (
              <>
                <div className="mb-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-white/10 p-3">
                    <span className="block text-xs text-[#f6d98a]">{t('weekdayHeader')}</span>
                    <strong>{translateWeekday(selectedDay['கிழமை'] || selectedDay.weekday)}</strong>
                  </div>
                  <div className="rounded-lg bg-white/10 p-3">
                    <span className="block text-xs text-[#f6d98a]">{t('tamilMonthHeader')}</span>
                    <strong>{selectedDay['தமிழ்_மாதம்'] || selectedDay.tamil_month}</strong>
                  </div>
                </div>
                {selectedEvents.length ? (
                  <div className="space-y-3">
                    {selectedEvents.map((event) => {
                      const eventPrimary = (!isTamil && event.event_name_en) ? event.event_name_en : event.event_name;
                      const eventSecondary = isTamil ? event.event_name_en : event.event_name;
                      const eventNote = (!isTamil && event.note_en) ? event.note_en : event.note;
                      return (
                        <div key={`${event.date}-${event.event_type}`} className="rounded-xl bg-white p-4 text-[#4B2E15]">
                          <div className="mb-1 flex items-center gap-2 text-xs font-bold text-[#a05a2c]">
                            <EventIcon type={event.event_type} className="h-8 w-8" />
                            {eventNote}
                          </div>
                          <h3 className="font-black text-[#8B0000]">{eventPrimary}</h3>
                          {eventSecondary && <p className="mt-1 text-xs text-gray-500">{eventSecondary}</p>}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm leading-7 text-[#f9e8be]">
                    {t('noSpecialEventDesc')}
                  </p>
                )}
                <div className="mt-5 border-t border-white/20 pt-4 text-sm text-[#f9e8be]">
                  <p>{t('tithiLabel')} {selectedDay.tithi}</p>
                  <p>{t('nakshatramLabel')} {selectedDay.nakshatram}</p>
                </div>
              </>
            ) : (
              <>
                <p className="mb-4 text-sm leading-7 text-[#f9e8be]">
                  {t('selectDateToViewDetails')}
                </p>
                
                {(() => {
                  const monthEvents = days.filter(day => day.events && day.events.length > 0);
                  if (monthEvents.length === 0) return <p className="text-sm text-[#f6d98a]">{t('noEventsThisMonth')}</p>;
                  return (
                    <div>
                      <h3 className="mb-3 text-sm font-bold text-[#f6d98a] border-b border-white/20 pb-2">
                        {t('monthEventsHeading')}
                      </h3>
                      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {monthEvents.map(day => (
                          <div
                            key={`list-${day.gregorian_date}`}
                            className="rounded-xl bg-white/10 p-3 hover:bg-white/20 transition cursor-pointer"
                            onClick={() => setSelectedDate(day.gregorian_date)}
                          >
                            <div className="text-xs text-[#f6d98a] font-bold mb-1">
                              {formatDate(day.gregorian_date)} • {translateWeekday(day.weekday)}
                            </div>
                            {day.events.map(event => {
                              const eName = (!isTamil && event.event_name_en) ? event.event_name_en : event.event_name;
                              const eNote = (!isTamil && event.note_en) ? event.note_en : event.note;
                              return (
                                <div key={`list-${day.gregorian_date}-${event.event_type}`} className="flex items-center gap-2 mt-1">
                                  <EventIcon type={event.event_type} className="h-6 w-6" />
                                  <div>
                                    <div className="text-sm font-bold text-white leading-tight">{eName}</div>
                                    <div className="text-[10px] text-[#f9e8be]">{eNote}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </>
            )}
          </aside>
        </AnimatedSection>

        <AnimatedSection className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs font-bold text-[#6f5a49]" delay={0.2}>
          <span className="flex items-center gap-2">
            <img src="/images/event-icons/calender.png" alt="" className="h-8 w-8 object-contain" />
            {t('legendToday')}
          </span>
          {legendItems.map(({ type, key }) => (
            <span key={type} className="flex items-center gap-2">
              <EventIcon type={type} />
              {t(key)}
            </span>
          ))}
        </AnimatedSection>
      </section>
    </main>
  );
};

export default EventsPage;