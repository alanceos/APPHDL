import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VineyardArea } from '@shared/schema';

interface MapMarkerProps {
  area: VineyardArea;
  visible: boolean;
}

export default function MapMarker({ area, visible }: MapMarkerProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const { position } = area;
  
  if (!visible) return null;
  
  return (
    <motion.div 
      className="absolute group cursor-pointer"
      style={{ 
        top: `${position.y}%`, 
        left: `${position.x}%`, 
        transform: 'translate(-50%, -50%)' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="w-12 h-12 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: `${area.color}aa` }}
        whileHover={{ 
          backgroundColor: area.color,
          scale: 1.1,
        }}
      >
        <i className={`fas ${area.icon}`}></i>
      </motion.div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded shadow-lg w-64 z-10 pointer-events-none"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-wine-red font-serif text-lg mb-1">{area.name}</h3>
            <p className="text-deep-brown text-sm">{area.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
