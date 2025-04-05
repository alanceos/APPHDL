import { motion } from 'framer-motion';
import { fadeInUp, scaleIn } from '@/lib/animations';
import { IMAGES, IMAGE_DIMENSIONS } from '@/data/constants';
import OptimizedImage from '@/components/ui/optimized-image';

export default function StorySection() {
  return (
    <section id="story" className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
            >
              <motion.h2 
                className="text-3xl md:text-5xl font-serif mb-6 text-wine-red"
                variants={fadeInUp}
              >
                Un Legado de Excelencia y Celebración
              </motion.h2>
              <motion.div 
                className="w-20 h-1 bg-gold mb-8"
                variants={scaleIn}
              />
              <motion.p 
                className="mb-6 text-deep-brown leading-relaxed"
                variants={fadeInUp}
              >
                Durante más de cinco generaciones, la familia Letras ha cultivado el arte de la vinificación con pasión y precisión. Nuestra hacienda abarca 80 hectáreas del mejor terroir, nutriendo vides que producen uvas excepcionales con carácter único, creando el escenario perfecto para celebraciones y eventos inolvidables.
              </motion.p>
              <motion.p 
                className="mb-6 text-deep-brown leading-relaxed"
                variants={fadeInUp}
              >
                Cada botella de vino de Hacienda de Letras encapsula nuestra filosofía: un equilibrio armonioso entre tradición e innovación, donde las técnicas ancestrales se encuentran con la excelencia moderna. Nuestros vinos son el alma de nuestras celebraciones, el compañero perfecto para los momentos especiales de la vida.
              </motion.p>
              <motion.p 
                className="mb-10 text-deep-brown leading-relaxed"
                variants={fadeInUp}
              >
                Nuestro compromiso con las prácticas sostenibles garantiza que preservemos nuestra tierra para las generaciones futuras, manteniendo el delicado ecosistema que da a nuestros vinos sus cualidades distintivas. La Hacienda de Letras no es solo un viñedo, es un destino donde la tradición vitivinícola se convierte en una experiencia festiva para todos los sentidos.
              </motion.p>
              <motion.a 
                href="#experiences" 
                className="inline-block border-b-2 border-gold text-deep-brown hover:text-wine-red transition-colors duration-300 font-medium mb-8"
                variants={fadeInUp}
              >
                EXPLORA NUESTRA HACIENDA
              </motion.a>

              <motion.div 
                className="mt-12 w-full"
                variants={fadeInUp}
              >
                <OptimizedImage 
                  src={IMAGES.winePouring}
                  alt="Sommelier sirviendo vino premium"
                  className="w-full max-w-md rounded-lg shadow-xl"
                  width={IMAGE_DIMENSIONS.gallery.width}
                  height={IMAGE_DIMENSIONS.gallery.height}
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 relative h-[600px] md:h-[800px] overflow-hidden rounded-lg shadow-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
            >
              <OptimizedImage 
                src={IMAGES.story}
                alt="Barricas en nuestra bodega histórica"
                className="w-full h-full"
                width={IMAGE_DIMENSIONS.gallery.width}
                height={IMAGE_DIMENSIONS.gallery.height}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
