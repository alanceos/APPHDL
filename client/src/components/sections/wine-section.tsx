import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import WineCard from '@/components/ui/wine-card';
import { Wine } from '@shared/schema';

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
            Our Collection
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gold mb-8 mx-auto"
            variants={fadeInUp}
          />
          <motion.p 
            className="text-deep-brown leading-relaxed"
            variants={fadeInUp}
          >
            Each bottle represents the perfect harmony of nature, tradition, and craftsmanship. Explore our award-winning selections, each with its own unique story and character.
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
            All Wines
          </button>
          <button 
            className={`px-6 py-2 border border-wine-red ${activeCategory === 'red' ? 'bg-wine-red text-white' : 'text-wine-red hover:bg-wine-red hover:text-white'} transition-colors duration-300 text-sm`}
            onClick={() => handleCategoryChange('red')}
          >
            Red Wines
          </button>
          <button 
            className={`px-6 py-2 border border-wine-red ${activeCategory === 'white' ? 'bg-wine-red text-white' : 'text-wine-red hover:bg-wine-red hover:text-white'} transition-colors duration-300 text-sm`}
            onClick={() => handleCategoryChange('white')}
          >
            White Wines
          </button>
          <button 
            className={`px-6 py-2 border border-wine-red ${activeCategory === 'reserve' ? 'bg-wine-red text-white' : 'text-wine-red hover:bg-wine-red hover:text-white'} transition-colors duration-300 text-sm`}
            onClick={() => handleCategoryChange('reserve')}
          >
            Reserve Selection
          </button>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white animate-pulse h-[600px]"></div>
            ))
          ) : error ? (
            <div className="col-span-3 text-center text-wine-red">
              Failed to load wines. Please try again later.
            </div>
          ) : wines?.length === 0 ? (
            <div className="col-span-3 text-center text-deep-brown py-12">
              No wines found in this category.
            </div>
          ) : (
            wines?.map((wine) => (
              <WineCard key={wine.id} wine={wine} />
            ))
          )}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a 
            href="#" 
            className="inline-block border-b-2 border-gold text-deep-brown hover:text-wine-red transition-colors duration-300 font-medium"
          >
            VIEW FULL COLLECTION
          </a>
        </motion.div>
      </div>
    </section>
  );
}
