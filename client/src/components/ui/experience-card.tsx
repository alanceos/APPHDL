import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { Experience } from '@shared/schema';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <motion.div 
      className="group bg-cream hover:shadow-xl transition-all duration-500 relative"
      variants={fadeInUp}
    >
      <div className="overflow-hidden h-64">
        <img 
          src={experience.imageUrl} 
          alt={experience.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </div>
      <div className="p-6 border-t border-gold">
        <h3 className="text-2xl font-serif mb-3 text-wine-red">{experience.name}</h3>
        <p className="text-deep-brown mb-4">{experience.shortDescription}</p>
        <div className="flex justify-between items-center">
          <span className="text-gold font-serif text-xl">${parseFloat(String(experience.price)).toFixed(2)} por persona</span>
          <a 
            href="#reserve" 
            className="text-deep-brown hover:text-wine-red transition-colors duration-300"
            aria-label={`Reservar ${experience.name}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
