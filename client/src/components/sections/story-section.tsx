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
                A Legacy of Excellence
              </motion.h2>
              <motion.div 
                className="w-20 h-1 bg-gold mb-8"
                variants={scaleIn}
              />
              <motion.p 
                className="mb-6 text-deep-brown leading-relaxed"
                variants={fadeInUp}
              >
                For over five generations, the Laurent family has cultivated the art of winemaking with passion and precision. Our estate spans 200 acres of the finest terroir, nurturing vines that produce exceptional grapes with unique character.
              </motion.p>
              <motion.p 
                className="mb-6 text-deep-brown leading-relaxed"
                variants={fadeInUp}
              >
                Every bottle of Estate de Vino wine encapsulates our philosophy: a harmonious balance of tradition and innovation, where time-honored techniques meet modern excellence.
              </motion.p>
              <motion.p 
                className="mb-10 text-deep-brown leading-relaxed"
                variants={fadeInUp}
              >
                Our commitment to sustainable practices ensures that we preserve our land for future generations, maintaining the delicate ecosystem that gives our wines their distinctive qualities.
              </motion.p>
              <motion.a 
                href="#experiences" 
                className="inline-block border-b-2 border-gold text-deep-brown hover:text-wine-red transition-colors duration-300 font-medium"
                variants={fadeInUp}
              >
                EXPLORE OUR VINEYARD
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
