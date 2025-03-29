import { motion } from 'framer-motion';
import { fadeIn, fadeInUp } from '@/lib/animations';
import { useParallax } from '@/hooks/use-parallax';
import { IMAGES } from '@/data/constants';

export default function HeroSection() {
  const { offset } = useParallax({ speed: 0.5 });

  return (
    <section id="hero" className="h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${IMAGES.hero})`, 
          transform: `translateY(${offset}px) scale(1.1)` 
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div 
          className="text-center max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white text-shadow mb-6"
            variants={fadeInUp}
          >
            El Arte del Vino y la Celebración
          </motion.h1>
          <motion.p 
            className="text-white text-lg md:text-xl mb-10 font-light"
            variants={fadeInUp}
          >
            Un viaje extraordinario donde los sabores se entrelazan con la tradición y los momentos inolvidables
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            variants={fadeInUp}
          >
            <a 
              href="#reserve" 
              className="bg-gold text-deep-brown hover:bg-white px-8 py-3 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
            >
              RESERVA TU VISITA
            </a>
            <a 
              href="#story" 
              className="border border-white text-white hover:bg-white hover:text-deep-brown px-8 py-3 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
            >
              DESCUBRE NUESTRA HISTORIA
            </a>
          </motion.div>
        </motion.div>
      </div>
      <motion.div 
        className="absolute bottom-8 left-0 right-0 text-center"
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        }}
      >
        <a href="#story" className="text-white" aria-label="Scroll down">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
