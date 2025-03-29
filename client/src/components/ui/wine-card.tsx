import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Wine } from '@shared/schema';

interface WineCardProps {
  wine: Wine;
}

export default function WineCard({ wine }: WineCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    toast({
      title: "Añadido al Carrito",
      description: `${wine.name} ha sido añadido a tu carrito.`,
    });
    
    // Reset the button after 2 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  return (
    <motion.div 
      className="wine-card group bg-white hover:shadow-xl transition-all duration-500 relative"
      variants={fadeInUp}
    >
      <div className="overflow-hidden h-80 relative">
        <a href={`/vino/${wine.id}`} className="block cursor-pointer">
          <img 
            src={wine.imageUrl} 
            alt={wine.name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          {wine.isReserve && (
            <div className="absolute top-4 right-4 bg-gold text-deep-brown px-3 py-1 text-xs font-medium">RESERVA</div>
          )}
        </a>
      </div>
      <div className="p-6">
        <a href={`/vino/${wine.id}`} className="block cursor-pointer no-underline">
          <h3 className="text-2xl font-serif mb-2 text-wine-red">{wine.name}</h3>
          <p className="text-deep-brown italic mb-4">Cosecha {wine.vintage}</p>
        </a>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gold font-serif text-xl">${parseFloat(String(wine.price)).toFixed(2)}</span>
          <div className="flex">
            <span className="text-deep-brown mr-1">{wine.rating}</span>
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg 
                  key={index} 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill={index < Math.floor(parseFloat(String(wine.rating))) ? "currentColor" : "none"}
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="ml-0.5"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <p className="text-deep-brown mb-4 text-sm">{wine.description}</p>
        <div className="mb-4">
          <h4 className="text-wine-red font-medium mb-2 text-sm">Combina bien con:</h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {wine.pairings.map((pairing, index) => (
              <span key={index} className="bg-cream px-3 py-1 rounded-full text-deep-brown">
                {pairing}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button 
            className={`text-${isAddedToCart ? 'gold' : 'wine-red'} hover:text-gold transition-colors duration-300 text-sm flex items-center`}
            onClick={handleAddToCart}
          >
            <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isAddedToCart ? (
                <path d="M20 6L9 17l-5-5"/>
              ) : (
                <>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </>
              )}
            </svg>
            {isAddedToCart ? 'Añadido' : 'Añadir al Carrito'}
          </button>
          <div className="flex space-x-2">
            <a 
              href={`/vino/${wine.id}`}
              className="text-deep-brown hover:text-wine-red transition-colors duration-300"
              aria-label="Ver página completa"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
            <button 
              className="text-deep-brown hover:text-wine-red transition-colors duration-300"
              onClick={() => setIsOpen(true)}
              aria-label="Ver detalles rápidos"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Diálogo de Detalles del Vino */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl bg-cream">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-wine-red">{wine.name}</DialogTitle>
            <DialogDescription className="text-deep-brown italic">Cosecha {wine.vintage}</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <img 
                src={wine.imageUrl} 
                alt={wine.name} 
                className="w-full h-[300px] object-cover rounded-md"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-serif text-wine-red mb-2">Notas de Cata</h4>
                <p className="text-deep-brown">{wine.description}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-serif text-wine-red mb-2">Maridajes</h4>
                <div className="flex flex-wrap gap-2">
                  {wine.pairings.map((pairing, index) => (
                    <span key={index} className="bg-white px-3 py-1 rounded-full text-deep-brown text-sm">
                      {pairing}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gold/30">
                <div>
                  <span className="block text-deep-brown">Precio</span>
                  <span className="text-xl font-serif text-gold">${parseFloat(String(wine.price)).toFixed(2)}</span>
                </div>
                <div>
                  <span className="block text-deep-brown">Calificación</span>
                  <div className="flex items-center">
                    <span className="text-deep-brown mr-1">{wine.rating}</span>
                    <div className="flex text-gold">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg 
                          key={index} 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill={index < Math.floor(parseFloat(String(wine.rating))) ? "currentColor" : "none"}
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
