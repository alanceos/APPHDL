import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import WineCard from '@/components/ui/wine-card';
import { Wine } from '@shared/schema';
import { IMAGES, FEATURED_WINES } from '@/data/constants';

type WineCategory = 'all' | 'red' | 'white' | 'reserve';

export default function WineSection() {
  const [activeCategory, setActiveCategory] = useState<WineCategory>('all');
  
  const { data: wines, isLoading, error } = useQuery<Wine[]>({
    queryKey: ['/api/wines', activeCategory],
    queryFn: async ({ queryKey }) => {
      const category = queryKey[1];
      const response = await fetch(`/api/wines${category !== 'all' ? `?category=${category}` : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch wines');
      }
      return response.json();
    }
  });

  const handleCategoryChange = (category: WineCategory) => {
    setActiveCategory(category);
  };

  return (
    <section id="wines" className="py-24 bg-cream">
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
            Nuestros Vinos
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gold mx-auto mb-8"
            variants={fadeInUp}
          />
          <motion.p 
            className="text-deep-brown text-lg"
            variants={fadeInUp}
          >
            Descubre nuestra colección de vinos excepcionales, elaborados con pasión y 
            experiencia, capturando la esencia única de nuestro terroir.
          </motion.p>
        </motion.div>
        
        {/* Wine Filters */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <button 
            className={`px-6 py-2 border border-wine-red ${activeCategory === 'all' ? 'bg-wine-red text-white' : 'text-wine-red hover:bg-wine-red hover:text-white'} transition-colors duration-300 text-sm`}
            onClick={() => handleCategoryChange('all')}
          >
            Todos los Vinos
          </button>
          <button 
            className={`px-6 py-2 border border-wine-red ${activeCategory === 'red' ? 'bg-wine-red text-white' : 'text-wine-red hover:bg-wine-red hover:text-white'} transition-colors duration-300 text-sm`}
            onClick={() => handleCategoryChange('red')}
          >
            Vinos Tintos
          </button>
          <button 
            className={`px-6 py-2 border border-wine-red ${activeCategory === 'white' ? 'bg-wine-red text-white' : 'text-wine-red hover:bg-wine-red hover:text-white'} transition-colors duration-300 text-sm`}
            onClick={() => handleCategoryChange('white')}
          >
            Vinos Blancos
          </button>
          <button 
            className={`px-6 py-2 border border-wine-red ${activeCategory === 'reserve' ? 'bg-wine-red text-white' : 'text-wine-red hover:bg-wine-red hover:text-white'} transition-colors duration-300 text-sm`}
            onClick={() => handleCategoryChange('reserve')}
          >
            Reserva Especial
          </button>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {FEATURED_WINES.map((wine, index) => (
            <motion.div
              key={wine.id}
              variants={fadeInUp}
              custom={index}
            >
              <WineCard {...wine} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a 
            href="/vinos" 
            className="inline-flex items-center text-wine-red hover:text-gold transition-colors duration-300 text-lg"
          >
            Explorar todos nuestros vinos
            <svg 
              className="w-5 h-5 ml-2" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
