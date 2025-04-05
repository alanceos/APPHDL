import { motion } from 'framer-motion';
import { IMAGES, IMAGE_DIMENSIONS } from '@/data/constants';
import { fadeIn } from '@/lib/animations';
import OptimizedImage from '@/components/ui/optimized-image';

export default function ParallaxSection() {
  return (
    <section className="relative h-96 overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage
          src={IMAGES.parallax}
          alt="Bodega de vinos"
          className="w-full h-full"
          width={IMAGE_DIMENSIONS.gallery.width}
          height={IMAGE_DIMENSIONS.gallery.height}
        />
        <div 
          className="absolute inset-0"
          style={{ backgroundAttachment: 'fixed' }}
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.blockquote 
          className="text-center max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeIn}
        >
          <p className="text-2xl md:text-4xl font-serif text-white text-shadow mb-6 italic">
            "El vino es la poesía de la tierra."
          </p>
          <footer className="text-gold font-serif text-xl">
            — Filosofía de Hacienda de Letras
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
