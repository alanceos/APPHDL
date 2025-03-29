import { motion } from 'framer-motion';
import { fadeInUp, scaleIn } from '@/lib/animations';
import { IMAGES } from '@/data/constants';

export default function StorySection() {
  return (
    <section id="story" className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <motion.div 
              className="md:w-1/2 mb-12 md:mb-0 md:pr-12"
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
                className="inline-block border-b-2 border-gold text-deep-brown hover:text-wine-red transition-colors duration-300 font-medium"
                variants={fadeInUp}
              >
                EXPLORA NUESTRA HACIENDA
              </motion.a>
            </motion.div>
            <motion.div 
              className="md:w-1/2 relative h-96 md:h-auto overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
            >
              <motion.img 
                src={IMAGES.story} 
                alt="Vineyard legacy" 
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
