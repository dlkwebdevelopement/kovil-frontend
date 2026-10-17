import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InfoCards from './components/InfoCards';
import Announcements from './components/Announcements';
import UpcomingEvents from './components/UpcomingEvents';
import Gallery from './components/Gallery';
import GalleryPage from './components/GalleryPage';
import GalleryOverview from './components/GalleryOverview';
import TempleServices from './components/TempleServices';
import DonorsSlider from './components/DonorsSlider';
import Donation from './components/Donation';
import TemplePage from './components/TemplePage';
import PoojaPage from './components/PoojaPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import EventsPage from './components/EventsPage';
import DonorsPage from './components/DonorsPage';
import VideoDetailPage from './components/VideoDetailPage';

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const isGalleryPage = window.location.pathname === '/gallery';
  const hasGalleryImage = searchParams.has('image');
  const hasGalleryVideo = searchParams.has('video');
  const isVideoPage = window.location.pathname === '/video' || (isGalleryPage && hasGalleryVideo);
  const isTemplePage = window.location.pathname === '/temple';
  const isPoojaPage = window.location.pathname === '/pooja';
  const isContactPage = window.location.pathname === '/contact';
  const isEventsPage = window.location.pathname === '/events';
  const isDonorsPage = window.location.pathname === '/donors';

  const page = isVideoPage ? <VideoDetailPage />
    : isGalleryPage ? (hasGalleryImage ? <GalleryPage /> : <GalleryOverview />)
    : isTemplePage ? <TemplePage />
      : isPoojaPage ? <PoojaPage />
        : isContactPage ? <ContactPage />
          : isEventsPage ? <EventsPage />
            : isDonorsPage ? <DonorsPage />
          : (
            <main>
              <Hero />
              <InfoCards />
              <UpcomingEvents />
              <Announcements />
              <Gallery />
              <TempleServices />
              <DonorsSlider />
              <Donation />
            </main>
          );

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50">
      <Header />
      {page}
      <Footer />
    </div>
  );
}

export default App;
