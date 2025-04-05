import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import ExperienceCard from '@/components/ui/experience-card';
import { FEATURED_EXPERIENCES } from '@/data/constants';

export default function ExperiencesSection() {
  return (
    <section id="experiences" className="py-24 bg-white">
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
            Experiencias Únicas
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gold mx-auto mb-8"
            variants={fadeInUp}
          />
          <motion.p 
            className="text-deep-brown text-lg"
            variants={fadeInUp}
          >
            Descubre nuestras experiencias diseñadas para sumergirte en el fascinante mundo del vino.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {FEATURED_EXPERIENCES.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={fadeInUp}
              custom={index}
            >
              <ExperienceCard {...experience} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a 
            href="/experiencias" 
            className="inline-flex items-center text-wine-red hover:text-gold transition-colors duration-300 text-lg"
          >
            Ver todas las experiencias
            <svg 
              className="w-5 h-5 ml-2" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
