import { motion } from 'framer-motion';
import { fadeIn, fadeInUp } from '@/lib/animations';
import { useParallax } from '@/hooks/use-parallax';
import { IMAGES } from '@/data/constants';
import OptimizedImage from '@/components/ui/optimized-image';

export default function HeroSection() {
  const { offset } = useParallax({ speed: 0.5 });

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage
          src={IMAGES.hero}
          alt="Viñedo al atardecer"
          className="w-full h-full"
          priority={true}
          onLoad={() => {
            // Podemos agregar analytics aquí si es necesario
            console.log('Hero image loaded successfully');
          }}
        />
        <div 
          className="absolute inset-0"
          style={{ 
            transform: `translateY(${offset}px) scale(1.1)`,
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-4xl mx-auto py-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white text-shadow-lg mb-4 sm:mb-6"
            variants={fadeInUp}
          >
            Hacienda de Letras
          </motion.h1>
          <motion.p 
            className="text-white text-base sm:text-lg md:text-xl mb-8 sm:mb-10 font-light max-w-2xl mx-auto px-4"
            variants={fadeInUp}
          >
            Donde la tradición vitivinícola se convierte en una experiencia festiva para todos los sentidos
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 px-4"
            variants={fadeInUp}
          >
            <a 
              href="#reserve" 
              className="w-full sm:w-auto bg-gold text-deep-brown hover:bg-white px-8 py-3 transition-colors duration-300 font-sans tracking-wider text-sm font-medium rounded-sm"
            >
              RESERVA TU EXPERIENCIA
            </a>
            <a 
              href="#story" 
              className="w-full sm:w-auto border border-white text-white hover:bg-white hover:text-deep-brown px-8 py-3 transition-colors duration-300 font-sans tracking-wider text-sm font-medium rounded-sm"
            >
              EXPLORA NUESTRA HACIENDA
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
        <a href="#story" className="text-white hover:text-gold transition-colors duration-300" aria-label="Desplázate hacia abajo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
