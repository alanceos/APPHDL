import { useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import StorySection from '@/components/sections/story-section';
import ExperiencesSection from '@/components/sections/experiences-section';
import ParallaxSection from '@/components/sections/parallax-section';
import WineSection from '@/components/sections/wine-section';
import VineyardMapSection from '@/components/sections/vineyard-map-section';
import ContactSection from '@/components/sections/contact-section';
import ReservationSection from '@/components/sections/reservation-section';

export default function Home() {
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
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <StorySection />
        <ExperiencesSection />
        <ParallaxSection />
        <WineSection />
        <VineyardMapSection />
        <ContactSection />
        <ReservationSection />
      </main>
      
      <Footer />
    </div>
  );
}
