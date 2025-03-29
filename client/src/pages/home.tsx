import { useEffect } from 'react';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import StorySection from '@/components/sections/story-section';
import ExperiencesSection from '@/components/sections/experiences-section';
import ParallaxSection from '@/components/sections/parallax-section';
import WineSection from '@/components/sections/wine-section';
import VineyardMapSection from '@/components/sections/vineyard-map-section';
import ContactSection from '@/components/sections/contact-section';
import ReservationSection from '@/components/sections/reservation-section';
import EventsCalendarSection from '@/components/sections/events-calendar-section';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Home() {
  const isMobile = useIsMobile();
  
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Ajuste del desplazamiento para compensar el encabezado fijo en móvil
          const offsetY = isMobile ? -56 : 0;
          
          const y = targetElement.getBoundingClientRect().top + window.pageYOffset + offsetY;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [isMobile]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className={`flex-grow ${isMobile ? 'pt-14 pb-16' : ''}`}>
        <HeroSection />
        <StorySection />
        <ExperiencesSection />
        <ParallaxSection />
        <WineSection />
        <VineyardMapSection />
        <EventsCalendarSection />
        <ContactSection />
        <ReservationSection />
      </main>
      
      <Footer />
    </div>
  );
}
