import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Wine } from '@shared/schema';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/layout/footer';

export default function VinoPage() {
  const { id } = useParams();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { toast } = useToast();
  
  // Consulta para obtener la información del vino
  const { data: wine, isLoading, error } = useQuery<Wine>({
    queryKey: ['/api/wines', id],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`/api/wines/${queryKey[1]}`);
      if (!response.ok) {
        throw new Error('No se pudo cargar el vino');
      }
      return response.json();
    },
  });

  const handleAddToCart = () => {
    if (!wine) return;
    
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="w-16 h-16 border-4 border-wine-red border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !wine) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream p-4">
        <h1 className="text-3xl font-serif text-wine-red mb-4">Vino no encontrado</h1>
        <p className="text-deep-brown mb-6">Lo sentimos, el vino que buscas no está disponible.</p>
        <a href="/#wines" className="flex items-center text-wine-red hover:underline">
          <ArrowLeft className="mr-2" />
          Volver a vinos
        </a>
      </div>
    );
  }

  return (
    <>
      <main className="pt-16">
        {/* Hero del vino */}
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
                {wine.name}
              </h1>
              <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
              <p className="text-xl text-white">
                Cosecha {wine.vintage}
              </p>
            </div>
          </div>
        </section>

        {/* Detalles del vino */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12">
              <motion.div 
                className="md:w-2/5"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="relative">
                  <a href="/#wines" className="inline-flex items-center text-wine-red hover:underline mb-6">
                    <ArrowLeft className="mr-2" size={18} />
                    Volver a vinos
                  </a>
                  
                  <div className="bg-cream p-8 rounded-lg shadow-sm">
                    <div className="relative mb-8 mx-auto max-w-xs">
                      <img 
                        src={wine.imageUrl} 
                        alt={wine.name} 
                        className="w-full object-contain h-[500px]"
                      />
                      {wine.isReserve && (
                        <div className="absolute top-4 right-4 bg-gold text-deep-brown px-3 py-1 text-xs font-medium rounded-full">
                          RESERVA
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gold font-serif text-2xl">${parseFloat(String(wine.price)).toFixed(2)}</span>
                      <div className="flex">
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
                              className="ml-0.5"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full ${isAddedToCart ? 'bg-gold text-deep-brown' : 'bg-wine-red text-white'} hover:bg-gold hover:text-deep-brown transition-colors`}
                      onClick={handleAddToCart}
                    >
                      {isAddedToCart ? 'Añadido al Carrito' : 'Añadir al Carrito'}
                    </Button>
                    
                    <p className="text-xs text-center text-deep-brown/70 mt-3">
                      Envío gratuito en pedidos de $100+
                    </p>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="md:w-3/5"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <h2 className="text-3xl font-serif text-wine-red mb-3">{wine.name}</h2>
                  <p className="text-deep-brown italic mb-6">Cosecha {wine.vintage} | {wine.category}</p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-serif text-wine-red mb-3">Características</h3>
                    <p className="text-deep-brown mb-6">{wine.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-cream p-3 rounded-md">
                        <h4 className="text-sm text-deep-brown font-medium">Variedad</h4>
                        <p className="text-wine-red font-serif">{wine.category === 'red' ? 'Tempranillo' : 'Albariño'}</p>
                      </div>
                      <div className="bg-cream p-3 rounded-md">
                        <h4 className="text-sm text-deep-brown font-medium">Región</h4>
                        <p className="text-wine-red font-serif">Valle de Letras</p>
                      </div>
                      <div className="bg-cream p-3 rounded-md">
                        <h4 className="text-sm text-deep-brown font-medium">Alcohol</h4>
                        <p className="text-wine-red font-serif">14.5%</p>
                      </div>
                      <div className="bg-cream p-3 rounded-md">
                        <h4 className="text-sm text-deep-brown font-medium">Volumen</h4>
                        <p className="text-wine-red font-serif">750 ml</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-serif text-wine-red mb-3">Notas de Cata</h3>
                    <div className="bg-cream p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <h4 className="text-deep-brown font-medium mb-2">Vista</h4>
                          <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center" 
                               style={{ backgroundColor: wine.category === 'red' ? '#722F37' : '#ECDA9A' }}>
                          </div>
                          <p className="text-sm text-deep-brown">
                            {wine.category === 'red' 
                              ? 'Rojo rubí intenso con reflejos granates' 
                              : 'Amarillo pajizo con destellos dorados'}
                          </p>
                        </div>
                        <div className="text-center">
                          <h4 className="text-deep-brown font-medium mb-2">Nariz</h4>
                          <div className="w-16 h-16 rounded-full mx-auto mb-2 bg-cream border-2 border-gold flex items-center justify-center">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
                              <path d="M2 12h6m14 0h-6M8 12a4 4 0 0 1 8 0M8 12v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-8"/>
                            </svg>
                          </div>
                          <p className="text-sm text-deep-brown">
                            {wine.category === 'red' 
                              ? 'Aromas a frutos negros, vainilla y especias' 
                              : 'Notas de frutas tropicales, cítricos y flores blancas'}
                          </p>
                        </div>
                        <div className="text-center">
                          <h4 className="text-deep-brown font-medium mb-2">Boca</h4>
                          <div className="w-16 h-16 rounded-full mx-auto mb-2 bg-cream border-2 border-gold flex items-center justify-center">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
                              <path d="M8 22h8m-4-10v10M12 6a4 4 0 0 0 0-8 4 4 0 0 0 0 8z"/>
                            </svg>
                          </div>
                          <p className="text-sm text-deep-brown">
                            {wine.category === 'red' 
                              ? 'Aterciopelado, taninos suaves y final persistente' 
                              : 'Fresco, ligero y equilibrado con final aromático'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-serif text-wine-red mb-3">Maridaje</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {wine.pairings.map((pairing, index) => (
                        <span key={index} className="bg-cream px-3 py-1 rounded-full text-deep-brown text-sm">
                          {pairing}
                        </span>
                      ))}
                    </div>
                    <p className="text-deep-brown">
                      {wine.category === 'red' 
                        ? 'Este vino combina perfectamente con platos de carne asada, estofados y quesos curados.' 
                        : 'Ideal para acompañar mariscos, pescados blancos y ensaladas frescas.'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-serif text-wine-red mb-3">Proceso de Elaboración</h3>
                    <p className="text-deep-brown mb-4">
                      {wine.category === 'red' 
                        ? 'Fermentación en tanques de acero inoxidable con temperatura controlada. Crianza de 12 meses en barricas de roble francés y americano. Afinamiento en botella durante 6 meses antes de su comercialización.' 
                        : 'Prensado suave de las uvas y fermentación a baja temperatura para preservar los aromas varietales. Crianza sobre lías durante 4 meses.'}
                    </p>
                    <img 
                      src="https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                      alt="Proceso de elaboración" 
                      className="w-full h-64 object-cover rounded-md mb-4"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Vinos recomendados - Solo título para simplificar */}
        <section className="py-12 bg-cream">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-wine-red text-center mb-4">Vinos Recomendados</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-8"></div>
            {/* Aquí irían las tarjetas de vinos recomendados */}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}