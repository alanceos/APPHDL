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
  {
    id: 1,
    title: 'Festival de la Vendimia',
    date: new Date(2025, 7, 15), // 15 de Agosto, 2025
    image: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?q=80&w=500&auto=format&fit=crop',
    description: 'Celebre con nosotros el inicio de la temporada de cosecha con música, comida y vino ilimitado.',
    time: '16:00 - 22:00',
    price: '€45',
  },
  {
    id: 2,
    title: 'Cata de Vinos Especiales',
    date: new Date(2025, 8, 5), // 5 de Septiembre, 2025
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=500&auto=format&fit=crop',
    description: 'Degustación exclusiva de nuestros vinos más premiados con maridaje de quesos.',
    time: '18:30 - 20:30',
    price: '€35',
  },
  {
    id: 3,
    title: 'Curso de Enología',
    date: new Date(2025, 8, 12), // 12 de Septiembre, 2025
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=500&auto=format&fit=crop',
    description: 'Aprenda los fundamentos de la cata de vinos y la enología con nuestro sommelier.',
    time: '11:00 - 14:00',
    price: '€60',
  },
  {
    id: 4,
    title: 'Cena Maridaje Especial',
    date: new Date(2025, 8, 20), // 20 de Septiembre, 2025
    image: 'https://images.unsplash.com/photo-1470158499416-75be9aa0c4db?q=80&w=500&auto=format&fit=crop',
    description: 'Disfrute de una cena de 5 platos con maridaje especial de nuestros mejores vinos.',
    time: '20:00 - 23:00',
    price: '€85',
  },
  {
    id: 5,
    title: 'Charla con el Enólogo',
    date: new Date(2025, 9, 8), // 8 de Octubre, 2025
    image: 'https://images.unsplash.com/photo-1580625528570-90823d3fcdf7?q=80&w=500&auto=format&fit=crop',
    description: 'Nuestro enólogo jefe compartirá los secretos de la elaboración de vinos premium.',
    time: '17:00 - 19:00',
    price: 'Gratis (con reserva)',
  },
  {
    id: 6,
    title: 'Tour de Bodega Nocturno',
    date: new Date(2025, 9, 15), // 15 de Octubre, 2025
    image: 'https://images.unsplash.com/photo-1602166242292-79b41eecf1a1?q=80&w=500&auto=format&fit=crop',
    description: 'Visite nuestras bodegas históricas a la luz de las velas y termine con una degustación.',
    time: '21:00 - 23:00',
    price: '€40',
  },
];

export default function EventsCalendarSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  
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
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedMonth(newDate);
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
              onMonthChange={setSelectedMonth}
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
                  onClick={() => setSelectedDate(undefined)}
                  className="mt-2 text-wine-red hover:text-deep-brown hover:bg-gold/20 text-sm"
                >
                  Mostrar todos los eventos
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
                  onClick={() => setSelectedDate(undefined)}
                  className="mt-4 border-gold text-wine-red hover:bg-gold/10"
                >
                  Ver todos los eventos
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