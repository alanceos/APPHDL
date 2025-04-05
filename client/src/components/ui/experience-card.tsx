import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import OptimizedImage from './optimized-image';
import { IMAGE_DIMENSIONS } from '@/data/constants';

interface ExperienceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
}

export default function ExperienceCard({
  title,
  description,
  imageUrl,
  duration,
  price,
  rating,
  reviews
}: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div 
        className="group relative bg-cream rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <OptimizedImage
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            width={800}
            height={450}
          />
        </div>
        
        <div className="p-6">
          <h3 className="text-2xl font-serif text-wine-red mb-2">{title}</h3>
          <div className="flex items-center space-x-4 text-sm text-deep-brown/70 mb-3">
            <span>{duration}</span>
            <span>•</span>
            <span>{price}</span>
          </div>
          <p className="text-deep-brown/80 line-clamp-2 mb-4">{description}</p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gold/20">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-deep-brown/70 ml-2">({reviews})</span>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="text-wine-red hover:text-gold transition-colors duration-300 flex items-center"
            >
              Ver detalles
              <svg 
                className="w-4 h-4 ml-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-wine-red">{title}</DialogTitle>
            <DialogDescription className="text-deep-brown">{duration} | {price}</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <OptimizedImage
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
                width={600}
                height={450}
              />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-serif text-wine-red mb-2">Descripción</h4>
                <p className="text-deep-brown">{description}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-serif text-wine-red mb-2">Incluye</h4>
                <ul className="list-disc list-inside text-deep-brown space-y-1">
                  <li>Tour guiado por el viñedo</li>
                  <li>Degustación de vinos premium</li>
                  <li>Material didáctico</li>
                  <li>Certificado de participación</li>
                </ul>
              </div>
              
              <div className="pt-4 border-t border-gold/30">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-sm text-deep-brown">Duración</span>
                    <span className="text-wine-red">{duration}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-deep-brown">Precio por persona</span>
                    <span className="text-wine-red">{price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
