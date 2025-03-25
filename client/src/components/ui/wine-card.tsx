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
      title: "Added to Cart",
      description: `${wine.name} has been added to your cart.`,
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
        <img 
          src={wine.imageUrl} 
          alt={wine.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        {wine.isReserve && (
          <div className="absolute top-4 right-4 bg-gold text-deep-brown px-3 py-1 text-xs font-medium">RESERVE</div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif mb-2 text-wine-red">{wine.name}</h3>
        <p className="text-deep-brown italic mb-4">{wine.vintage} Vintage</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gold font-serif text-xl">${parseFloat(String(wine.price)).toFixed(2)}</span>
          <div className="flex">
            <span className="text-deep-brown mr-1">{wine.rating}</span>
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, index) => (
                <i 
                  key={index} 
                  className={`fas ${
                    index < Math.floor(parseFloat(String(wine.rating))) 
                      ? 'fa-star' 
                      : index < parseFloat(String(wine.rating)) 
                        ? 'fa-star-half-alt' 
                        : 'fa-star'
                  }`}
                ></i>
              ))}
            </div>
          </div>
        </div>
        <p className="text-deep-brown mb-4 text-sm">{wine.description}</p>
        <div className="mb-4">
          <h4 className="text-wine-red font-medium mb-2 text-sm">Pairs Well With:</h4>
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
            <i className={`fas ${isAddedToCart ? 'fa-check' : 'fa-plus-circle'} mr-2`}></i> 
            {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
          <button 
            className="text-deep-brown hover:text-wine-red transition-colors duration-300"
            onClick={() => setIsOpen(true)}
            aria-label="View details"
          >
            <i className="fas fa-info-circle"></i>
          </button>
        </div>
      </div>
      
      {/* Wine Details Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl bg-cream">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-wine-red">{wine.name}</DialogTitle>
            <DialogDescription className="text-deep-brown italic">{wine.vintage} Vintage</DialogDescription>
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
                <h4 className="text-lg font-serif text-wine-red mb-2">Tasting Notes</h4>
                <p className="text-deep-brown">{wine.description}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-serif text-wine-red mb-2">Pairings</h4>
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
                  <span className="block text-deep-brown">Price</span>
                  <span className="text-xl font-serif text-gold">${parseFloat(String(wine.price)).toFixed(2)}</span>
                </div>
                <div>
                  <span className="block text-deep-brown">Rating</span>
                  <div className="flex items-center">
                    <span className="text-deep-brown mr-1">{wine.rating}</span>
                    <div className="flex text-gold">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <i 
                          key={index} 
                          className={`fas ${
                            index < Math.floor(parseFloat(String(wine.rating))) 
                              ? 'fa-star' 
                              : index < parseFloat(String(wine.rating)) 
                                ? 'fa-star-half-alt' 
                                : 'fa-star'
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-wine-red text-white hover:bg-gold hover:text-deep-brown transition-colors duration-300"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
