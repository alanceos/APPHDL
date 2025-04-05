import { motion } from 'framer-motion';
import OptimizedImage from './optimized-image';
import { IMAGE_DIMENSIONS } from '@/data/constants';

interface ExperienceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  href: string;
}

export default function ExperienceCard({
  title,
  description,
  imageUrl,
  price,
  href
}: ExperienceCardProps) {
  return (
    <motion.div 
      className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-full h-[240px] overflow-hidden">
        <OptimizedImage
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          width={800}
          height={600}
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-serif text-wine-red mb-3">{title}</h3>
        <p className="text-deep-brown/80 mb-4 flex-1">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-gold font-serif text-lg">{price}</span>
          <motion.a
            href={href}
            className="inline-flex items-center text-wine-red hover:text-gold transition-colors duration-300"
            whileHover={{ x: 5 }}
          >
            Ver detalles
            <svg 
              className="w-4 h-4 ml-2" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
