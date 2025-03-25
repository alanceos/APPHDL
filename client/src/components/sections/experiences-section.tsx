import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useQuery } from '@tanstack/react-query';
import ExperienceCard from '@/components/ui/experience-card';
import { Experience } from '@shared/schema';

export default function ExperiencesSection() {
  const { data: experiences, isLoading, error } = useQuery<Experience[]>({
    queryKey: ['/api/experiences'],
  });

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
            Curated Experiences
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gold mb-8 mx-auto"
            variants={fadeInUp}
          />
          <motion.p 
            className="text-deep-brown leading-relaxed"
            variants={fadeInUp}
          >
            Immerse yourself in the art and science of winemaking through our carefully crafted experiences. Each journey offers a unique perspective on our heritage, process, and passion.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-cream animate-pulse h-[400px]"></div>
            ))
          ) : error ? (
            <div className="col-span-3 text-center text-wine-red">
              Failed to load experiences. Please try again later.
            </div>
          ) : (
            experiences?.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))
          )}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a 
            href="#reserve" 
            className="inline-block bg-wine-red text-white hover:bg-gold hover:text-deep-brown px-8 py-3 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
          >
            BOOK YOUR EXPERIENCE
          </a>
        </motion.div>
      </div>
    </section>
  );
}
