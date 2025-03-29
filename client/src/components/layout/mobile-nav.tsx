import { useState } from 'react';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/data/constants';
import { 
  Home, 
  Book, 
  GlassWater, 
  Wine, 
  MapPin, 
  MessageSquare, 
  CalendarCheck 
} from 'lucide-react';

export default function MobileNav() {
  const [activeTab, setActiveTab] = useState('#hero');

  // Map de iconos para cada enlace
  const iconMap: Record<string, JSX.Element> = {
    '#hero': <Home size={22} />,
    '#story': <Book size={22} />,
    '#experiences': <GlassWater size={22} />,
    '#wines': <Wine size={22} />,
    '#vineyard': <MapPin size={22} />,
    '#contact': <MessageSquare size={22} />,
    '#reserve': <CalendarCheck size={22} />,
  };

  // Aseguramos que el botón de reserva esté incluido y limitamos a 5 elementos
  const mobileNavItems = [
    NAV_LINKS[0], // Historia
    NAV_LINKS[1], // Experiencias
    NAV_LINKS[2], // Vinos
    NAV_LINKS[4], // Contacto
    NAV_LINKS[5], // Reservar
  ];
  
  const navItems = mobileNavItems;

  const handleClick = (href: string) => {
    setActiveTab(href);
    
    // Scroll suave hacia la sección con ajuste para compensar el header fijo
    const element = document.querySelector(href);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 56;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <motion.button
            key={item.href}
            className={`flex flex-col items-center justify-center w-full h-full text-xs ${
              activeTab === item.href ? 'text-wine-red' : 'text-deep-brown'
            }`}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(item.href)}
          >
            <div className={`
              ${activeTab === item.href 
                ? 'bg-wine-red/10 text-wine-red' 
                : item.isButton 
                  ? 'bg-wine-red text-white' 
                  : 'text-deep-brown'} 
              p-1.5 rounded-full`}>
              {iconMap[item.href]}
            </div>
            <span className={`mt-1 text-[10px] font-medium ${item.isButton && activeTab !== item.href ? 'text-wine-red' : ''}`}>
              {item.name}
            </span>
            {activeTab === item.href && (
              <motion.div
                className="absolute bottom-0 w-1/5 h-1 bg-wine-red rounded-t-md"
                layoutId="underline"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}