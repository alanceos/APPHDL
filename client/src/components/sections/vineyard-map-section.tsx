import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { IMAGES } from '@/data/constants';
import MapMarker from '@/components/ui/map-marker';
import { VineyardArea } from '@shared/schema';

type AreaType = 'all' | 'vineyards' | 'facilities';

export default function VineyardMapSection() {
  const [activeFilter, setActiveFilter] = useState<AreaType>('all');
  
  const { data: areas, isLoading, error } = useQuery<VineyardArea[]>({
    queryKey: ['/api/vineyard-areas', activeFilter],
    queryFn: async ({ queryKey }) => {
      const type = queryKey[1];
      const response = await fetch(`/api/vineyard-areas${type !== 'all' ? `?type=${type}` : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch vineyard areas');
      }
      return response.json();
    }
  });

  const handleFilterChange = (filter: AreaType) => {
    setActiveFilter(filter);
  };

  return (
    <section id="vineyard" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-serif mb-6 text-wine-red"
            variants={fadeInUp}
          >
            Nuestro Viñedo
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gold mb-8 mx-auto"
            variants={fadeInUp}
          />
          <motion.p 
            className="text-deep-brown leading-relaxed"
            variants={fadeInUp}
          >
            Explora el terroir único y las instalaciones de nuestra finca a través de este mapa interactivo. Cada área contribuye a la calidad excepcional y al carácter de nuestros vinos.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative w-full h-[600px] bg-cream rounded-lg overflow-hidden">
            {/* Map background */}
            <img 
              src={IMAGES.vineyardMap} 
              alt="Vista aérea del viñedo" 
              className="w-full h-full object-cover"
            />
            
            {/* Interactive map markers */}
            <div className="absolute top-0 left-0 right-0 bottom-0">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-wine-red">Cargando mapa...</div>
                </div>
              ) : error ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-wine-red">Error al cargar el mapa. Por favor, inténtelo de nuevo más tarde.</div>
                </div>
              ) : (
                areas?.map((area) => (
                  <MapMarker 
                    key={area.id} 
                    area={area} 
                    visible={activeFilter === 'all' || activeFilter === area.type}
                  />
                ))
              )}
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button 
              className={`map-filter px-6 py-2 border border-wine-red ${activeFilter === 'all' ? 'bg-wine-red text-white' : 'text-wine-red hover:bg-wine-red hover:text-white'} transition-colors duration-300 text-sm`}
              onClick={() => handleFilterChange('all')}
            >
              Todas las Áreas
            </button>
            <button 
              className={`map-filter px-6 py-2 border border-wine-red ${activeFilter === 'vineyards' ? 'bg-wine-red text-white' : 'text-wine-red hover:bg-wine-red hover:text-white'} transition-colors duration-300 text-sm`}
              onClick={() => handleFilterChange('vineyards')}
            >
              Viñedos
            </button>
            <button 
              className={`map-filter px-6 py-2 border border-wine-red ${activeFilter === 'facilities' ? 'bg-wine-red text-white' : 'text-wine-red hover:bg-wine-red hover:text-white'} transition-colors duration-300 text-sm`}
              onClick={() => handleFilterChange('facilities')}
            >
              Instalaciones
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
