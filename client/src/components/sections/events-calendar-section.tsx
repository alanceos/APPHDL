import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, ArrowLeft, ArrowRight } from 'lucide-react';

// Datos de ejemplo para eventos
const EVENTS = [
  // Eventos para cada mes del año
  {
    id: 1,
    title: 'Año Nuevo entre Viñedos',
    date: new Date(2025, 0, 2), // 2 de Enero, 2025
    image: 'https://images.unsplash.com/photo-1513267048331-5611cad62e41?q=80&w=500&auto=format&fit=crop',
    description: 'Comience el año con una exclusiva cata de espumosos y tapas gourmet en nuestro viñedo.',
    time: '18:00 - 21:00',
    price: '€50',
  },
  {
    id: 2,
    title: 'Cena Romántica de San Valentín',
    date: new Date(2025, 1, 14), // 14 de Febrero, 2025
    image: 'https://images.unsplash.com/photo-1532498551838-b7a1cffa0daa?q=80&w=500&auto=format&fit=crop',
    description: 'Celebre el amor con una elegante cena de cinco tiempos maridada con nuestros mejores vinos reserva.',
    time: '20:00 - 23:00',
    price: '€90 por pareja',
  },
  {
    id: 3,
    title: 'Taller de Poda de Primavera',
    date: new Date(2025, 2, 15), // 15 de Marzo, 2025
    image: 'https://images.unsplash.com/photo-1516749396351-ab16a461de52?q=80&w=500&auto=format&fit=crop',
    description: 'Aprenda las técnicas tradicionales de poda de viñedos y participe en nuestra ceremonia anual de bienvenida a la primavera.',
    time: '10:00 - 14:00',
    price: '€25',
  },
  {
    id: 4,
    title: 'Maridaje de Vinos y Chocolates',
    date: new Date(2025, 3, 12), // 12 de Abril, 2025
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=500&auto=format&fit=crop',
    description: 'Descubra las fascinantes combinaciones entre nuestros vinos tintos seleccionados y chocolates artesanales.',
    time: '17:00 - 19:00',
    price: '€40',
  },
  {
    id: 5,
    title: 'Festival de Gastronomía Regional',
    date: new Date(2025, 4, 10), // 10 de Mayo, 2025
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=500&auto=format&fit=crop',
    description: 'Deguste platos tradicionales de la región en combinación con nuestra amplia selección de vinos.',
    time: '12:00 - 18:00',
    price: '€55',
  },
  {
    id: 6,
    title: 'Concierto entre Viñedos',
    date: new Date(2025, 5, 21), // 21 de Junio, 2025
    image: 'https://images.unsplash.com/photo-1499364615646-ec38552f4f34?q=80&w=500&auto=format&fit=crop',
    description: 'Disfrute de un concierto al aire libre mientras el sol se pone sobre nuestros viñedos con una copa de vino en mano.',
    time: '19:00 - 22:00',
    price: '€35',
  },
  {
    id: 7,
    title: 'Noche de Astronomía y Vino',
    date: new Date(2025, 6, 18), // 18 de Julio, 2025
    image: 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?q=80&w=500&auto=format&fit=crop',
    description: 'Observe las estrellas con telescopios profesionales mientras degusta nuestros vinos especiales de reserva.',
    time: '21:30 - 00:30',
    price: '€45',
  },
  {
    id: 8,
    title: 'Festival de la Vendimia',
    date: new Date(2025, 7, 15), // 15 de Agosto, 2025
    image: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?q=80&w=500&auto=format&fit=crop',
    description: 'Celebre con nosotros el inicio de la temporada de cosecha con música, comida y vino ilimitado.',
    time: '16:00 - 22:00',
    price: '€45',
  },
  {
    id: 9,
    title: 'Curso de Enología',
    date: new Date(2025, 8, 12), // 12 de Septiembre, 2025
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=500&auto=format&fit=crop',
    description: 'Aprenda los fundamentos de la cata de vinos y la enología con nuestro sommelier.',
    time: '11:00 - 14:00',
    price: '€60',
  },
  {
    id: 10,
    title: 'Charla con el Enólogo',
    date: new Date(2025, 9, 8), // 8 de Octubre, 2025
    image: 'https://images.unsplash.com/photo-1580625528570-90823d3fcdf7?q=80&w=500&auto=format&fit=crop',
    description: 'Nuestro enólogo jefe compartirá los secretos de la elaboración de vinos premium.',
    time: '17:00 - 19:00',
    price: 'Gratis (con reserva)',
  },
  {
    id: 11,
    title: 'Cata de Vinos de Temporada',
    date: new Date(2025, 10, 14), // 14 de Noviembre, 2025
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=500&auto=format&fit=crop',
    description: 'Deguste nuestra nueva colección de vinos de temporada con maridaje de quesos artesanales.',
    time: '18:30 - 20:30',
    price: '€38',
  },
  {
    id: 12,
    title: 'Cena de Navidad en la Bodega',
    date: new Date(2025, 11, 20), // 20 de Diciembre, 2025
    image: 'https://images.unsplash.com/photo-1576867663093-c2a4ea51e7ce?q=80&w=500&auto=format&fit=crop',
    description: 'Celebre la temporada navideña con una elegante cena de gala en nuestra centenaria bodega subterránea.',
    time: '20:00 - 23:30',
    price: '€95',
  },
];

export default function EventsCalendarSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  // Inicializar el mes seleccionado a enero 2025 (como los eventos de ejemplo)
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(2025, 0, 1));
  
  // Resetear la selección de fecha
  const resetDateSelection = () => {
    setSelectedDate(undefined);
  };
  
  // Filtrar eventos según la fecha seleccionada o mostrar todos
  const filteredEvents = selectedDate 
    ? EVENTS.filter(event => 
        event.date.getDate() === selectedDate.getDate() && 
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
      )
    : EVENTS.filter(event => 
        event.date.getMonth() === selectedMonth.getMonth() &&
        event.date.getFullYear() === selectedMonth.getFullYear()
      );
  
  // Fechas con eventos para resaltar en el calendario
  const eventDates = EVENTS.map(event => event.date);
  
  const goToPreviousMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedMonth(newDate);
    // Resetear la selección de fecha al cambiar de mes
    resetDateSelection();
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedMonth(newDate);
    // Resetear la selección de fecha al cambiar de mes
    resetDateSelection();
  };

  return (
    <section id="events" className="py-24 bg-cream">
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
            Eventos en Hacienda de Letras
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gold mb-8 mx-auto"
            variants={fadeInUp}
          />
          <motion.p 
            className="text-deep-brown leading-relaxed"
            variants={fadeInUp}
          >
            Descubre los eventos especiales, catas y celebraciones que tenemos programados. Reserva con anticipación para asegurar tu lugar.
          </motion.p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendario */}
          <motion.div 
            className="lg:w-1/3 bg-white p-6 shadow-md rounded-lg h-fit"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif text-wine-red">
                {format(selectedMonth, 'MMMM yyyy', { locale: es })}
              </h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousMonth}
                  className="h-8 w-8 p-0 border-gold hover:bg-gold/10"
                >
                  <ArrowLeft className="h-4 w-4 text-deep-brown" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextMonth}
                  className="h-8 w-8 p-0 border-gold hover:bg-gold/10"
                >
                  <ArrowRight className="h-4 w-4 text-deep-brown" />
                </Button>
              </div>
            </div>
            
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={selectedMonth}
              onMonthChange={(month) => {
                setSelectedMonth(month);
                resetDateSelection();
              }}
              modifiers={{
                eventDay: (date) => 
                  eventDates.some(eventDate => 
                    eventDate.getDate() === date.getDate() && 
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getFullYear() === date.getFullYear()
                  ),
              }}
              modifiersClassNames={{
                eventDay: 'bg-wine-red/20 text-wine-red font-bold',
              }}
              locale={es}
              className="rounded-md border"
            />
            
            <div className="mt-4 text-center">
              <p className="text-sm text-deep-brown italic">
                Los días con eventos están resaltados. Haga clic en una fecha para ver detalles.
              </p>
              {selectedDate && (
                <Button 
                  variant="ghost" 
                  onClick={resetDateSelection}
                  className="mt-2 text-wine-red hover:text-deep-brown hover:bg-gold/20 text-sm"
                >
                  Mostrar todos los eventos del mes
                </Button>
              )}
            </div>
          </motion.div>
          
          {/* Lista de eventos */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-serif text-wine-red mb-6">
              {selectedDate ? `Eventos el ${format(selectedDate, 'dd MMMM yyyy', { locale: es })}` : `Eventos en ${format(selectedMonth, 'MMMM yyyy', { locale: es })}`}
            </h3>
            
            {filteredEvents.length === 0 ? (
              <div className="bg-white p-8 shadow-md rounded-lg text-center">
                <CalendarIcon className="w-12 h-12 text-gold mx-auto mb-4" />
                <p className="text-deep-brown">No hay eventos programados para esta fecha.</p>
                <Button 
                  variant="outline" 
                  onClick={resetDateSelection}
                  className="mt-4 border-gold text-wine-red hover:bg-gold/10"
                >
                  Ver todos los eventos del mes
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <motion.div 
                    key={event.id}
                    className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-serif text-wine-red font-medium">{event.title}</h4>
                        <span className="bg-gold/20 text-deep-brown text-xs px-2 py-1 rounded font-medium">
                          {event.price}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <p className="flex items-center text-deep-brown">
                          <CalendarIcon className="w-4 h-4 mr-1" /> 
                          {format(event.date, "dd MMMM yyyy", { locale: es })} • {event.time}
                        </p>
                      </div>
                      <p className="text-deep-brown text-sm mb-4 flex-grow">{event.description}</p>
                      <Button 
                        className="bg-wine-red text-white hover:bg-gold hover:text-deep-brown mt-auto"
                      >
                        Reservar Plaza
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}