import { useState } from 'react';
import { motion } from 'framer-motion';
import { VINEYARD_LOCATIONS, COLORS } from '@/data/constants';

interface LocationDetailProps {
  title: string;
  description: string;
  details?: Record<string, any>;
}

const LocationDetail = ({ title, description, details }: LocationDetailProps) => (
  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-md">
    <h3 className="text-xl font-serif text-wineRed mb-2">{title}</h3>
    <p className="text-deepBrown mb-4">{description}</p>
    {details && (
      <div className="space-y-2">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="text-sm">
            <span className="font-medium text-saddleBrown capitalize">{key}: </span>
            {Array.isArray(value) ? (
              <span>{value.join(', ')}</span>
            ) : (
              <span>{value}</span>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

const VineyardMapSection = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const allLocations = [
    ...VINEYARD_LOCATIONS.mainAreas,
    ...VINEYARD_LOCATIONS.pointsOfInterest
  ];

  const selectedLocationData = allLocations.find(loc => loc.id === selectedLocation);
  const hoveredLocationData = allLocations.find(loc => loc.id === hoveredLocation);

  return (
    <section id="vineyard" className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center text-deepBrown mb-4">
          Nuestro Viñedo
        </h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-8"></div>
        <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
          Explora el terroir único y las instalaciones de nuestra finca a través de este mapa interactivo.
          Cada área contribuye a la calidad excepcional y al carácter de nuestros vinos.
        </p>

        <div className="relative w-full max-w-4xl mx-auto aspect-[16/9]">
          {/* Fondo del mapa */}
          <div className="absolute inset-0 bg-gradient-to-br from-cream to-gold/20 rounded-lg shadow-inner" />

          {/* SVG del mapa */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
          >
            {/* Caminos y elementos decorativos */}
            <path
              d="M10,50 Q30,30 50,50 T90,50"
              stroke={COLORS.gold}
              strokeWidth="0.5"
              fill="none"
              className="opacity-50"
            />
            
            {/* Marcadores de ubicación */}
            {allLocations.map((location) => (
              <motion.g
                key={location.id}
                transform={`translate(${location.coordinates.x} ${location.coordinates.y})`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedLocation(location.id)}
                onHoverStart={() => setHoveredLocation(location.id)}
                onHoverEnd={() => setHoveredLocation(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r="3"
                  fill={COLORS.wineRed}
                  className="transition-all duration-300"
                  style={{
                    opacity: hoveredLocation === location.id || selectedLocation === location.id ? 1 : 0.7,
                  }}
                />
                <text
                  y="-4"
                  textAnchor="middle"
                  fontSize="4"
                  fill={COLORS.deepBrown}
                  className="pointer-events-none"
                >
                  {location.icon}
                </text>
              </motion.g>
            ))}
          </svg>

          {/* Panel de información */}
          <motion.div
            className="absolute left-4 bottom-4 right-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: selectedLocation || hoveredLocation ? 1 : 0,
              y: selectedLocation || hoveredLocation ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
          >
            {(selectedLocationData || hoveredLocationData) && (
              <LocationDetail
                title={(selectedLocationData || hoveredLocationData)!.name}
                description={(selectedLocationData || hoveredLocationData)!.description}
                details={(selectedLocationData || hoveredLocationData)?.details}
              />
            )}
          </motion.div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-deepBrown/70">
            Haz clic en los marcadores para explorar cada área del viñedo
          </p>
        </div>
      </div>
    </section>
  );
};

export default VineyardMapSection;
