import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Wine } from '@shared/schema';
import OptimizedImage from './optimized-image';
import { IMAGE_DIMENSIONS } from '@/data/constants';

interface WineCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  vintage: string;
  varietal: string;
  price: string;
  isReserve?: boolean;
  href: string;
}

export default function WineCard({
  id,
  title,
  description,
  imageUrl,
  vintage,
  varietal,
  price,
  isReserve = false,
  href
}: WineCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    toast({
      title: "Añadido al Carrito",
      description: `${title} ha sido añadido a tu carrito.`,
    });
    
    // Reset the button after 2 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  return (
    <motion.div 
      className="group relative bg-cream rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-white">
        <OptimizedImage
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
          width={600}
          height={800}
        />
        {isReserve && (
          <div className="absolute top-4 right-4">
            <span className="bg-gold text-deep-brown px-3 py-1 text-xs font-medium rounded-full">
              RESERVA
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-serif text-wine-red mb-2">{title}</h3>
          <div className="flex items-center space-x-4 text-sm text-deep-brown/70 mb-3">
            <span>{vintage}</span>
            <span>•</span>
            <span>{varietal}</span>
          </div>
          <p className="text-deep-brown/80 line-clamp-2">{description}</p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gold/20">
          <span className="text-gold font-serif text-lg">{price}</span>
          <motion.a
            href={href}
            className="inline-flex items-center text-wine-red hover:text-gold transition-colors duration-300"
            whileHover={{ x: 5 }}
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
          </motion.a>
        </div>
      </div>
      
      {/* Diálogo de Detalles del Vino */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl bg-cream">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-wine-red">{title}</DialogTitle>
            <DialogDescription className="text-deep-brown italic">Cosecha {vintage}</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-[300px] object-cover rounded-md"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-serif text-wine-red mb-2">Notas de Cata</h4>
                <p className="text-deep-brown">{description}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-serif text-wine-red mb-2">Maridajes</h4>
                <div className="flex flex-wrap gap-2">
                  {/* Assuming pairings are not provided in the WineCardProps */}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gold/30">
                <div>
                  <span className="block text-deep-brown">Precio</span>
                  <span className="text-xl font-serif text-gold">{price}</span>
                </div>
                <div>
                  <span className="block text-deep-brown">Calificación</span>
                  <div className="flex items-center">
                    <span className="text-deep-brown mr-1">5.0</span>
                    <div className="flex text-gold">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg 
                          key={index} 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-wine-red text-white hover:bg-gold hover:text-deep-brown transition-colors duration-300"
                onClick={handleAddToCart}
              >
                Añadir al Carrito
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
