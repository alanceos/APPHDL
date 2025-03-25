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
          <span className="text-gold font-serif text-xl">${parseFloat(String(experience.price)).toFixed(2)} per person</span>
          <a 
            href="#reserve" 
            className="text-deep-brown hover:text-wine-red transition-colors duration-300"
            aria-label={`Reserve ${experience.name}`}
          >
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
