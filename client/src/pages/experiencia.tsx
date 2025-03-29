import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Experience } from '@shared/schema';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, ArrowLeft } from 'lucide-react';
import Footer from '@/components/layout/footer';

// Esquema para la reserva
const reservationSchema = z.object({
  nombre: z.string().min(3, { message: 'El nombre es requerido' }),
  email: z.string().email({ message: 'Email inválido' }),
  telefono: z.string().min(10, { message: 'Teléfono inválido' }),
  fecha: z.date({
    required_error: 'Por favor selecciona una fecha',
  }),
  hora: z.string({
    required_error: 'Por favor selecciona una hora',
  }),
  personas: z.string().min(1, { message: 'Número de personas requerido' }),
  mensaje: z.string().optional(),
});

type ReservationValues = z.infer<typeof reservationSchema>;

export default function ExperienciaPage() {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Consulta para obtener la experiencia específica
  const { data: experience, isLoading, error } = useQuery<Experience>({
    queryKey: ['/api/experiences', id],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`/api/experiences/${queryKey[1]}`);
      if (!response.ok) {
        throw new Error('No se pudo cargar la experiencia');
      }
      return response.json();
    },
  });

  // Formulario para la reserva
  const form = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      personas: '2',
      mensaje: '',
    },
  });

  const onSubmit = async (data: ReservationValues) => {
    if (!experience) return;
    
    setIsSubmitting(true);
    
    try {
      // Aquí se enviaría la reserva al servidor
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación
      
      toast({
        title: "¡Reserva recibida!",
        description: `Tu reserva para ${experience.name} ha sido enviada. Te contactaremos pronto para confirmar.`,
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error al enviar",
        description: "Hubo un problema al procesar tu reserva. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="w-16 h-16 border-4 border-wine-red border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream p-4">
        <h1 className="text-3xl font-serif text-wine-red mb-4">Experiencia no encontrada</h1>
        <p className="text-deep-brown mb-6">Lo sentimos, la experiencia que buscas no está disponible.</p>
        <a href="/#experiences" className="flex items-center text-wine-red hover:underline">
          <ArrowLeft className="mr-2" />
          Volver a experiencias
        </a>
      </div>
    );
  }

  return (
    <>
      <main className="pt-16">
        {/* Hero de la experiencia */}
        <section className="relative h-[40vh] md:h-[60vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${experience.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
                {experience.name}
              </h1>
              <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
              <p className="text-xl text-white">
                Una experiencia única en Hacienda de Letras
              </p>
            </div>
          </div>
        </section>

        {/* Detalles de la experiencia */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-2/3">
                <motion.div 
                  className="prose prose-lg max-w-none"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp}>
                    <a href="/#experiences" className="inline-flex items-center text-wine-red hover:underline mb-6 no-underline">
                      <ArrowLeft className="mr-2" size={18} />
                      Volver a experiencias
                    </a>
                    <h2 className="text-3xl font-serif text-wine-red mt-2">{experience.name}</h2>
                    <p className="text-xl text-deep-brown">{experience.shortDescription}</p>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="my-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-cream p-4 rounded-md text-center">
                        <p className="text-deep-brown text-sm">Duración</p>
                        <p className="text-wine-red font-serif text-xl">2.5 horas</p>
                      </div>
                      <div className="bg-cream p-4 rounded-md text-center">
                        <p className="text-deep-brown text-sm">Participantes</p>
                        <p className="text-wine-red font-serif text-xl">2-10 personas</p>
                      </div>
                      <div className="bg-cream p-4 rounded-md text-center">
                        <p className="text-deep-brown text-sm">Idioma</p>
                        <p className="text-wine-red font-serif text-xl">Español</p>
                      </div>
                      <div className="bg-cream p-4 rounded-md text-center">
                        <p className="text-deep-brown text-sm">Precio</p>
                        <p className="text-wine-red font-serif text-xl">${parseFloat(String(experience.price)).toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <h3 className="text-2xl font-serif text-wine-red">Acerca de esta experiencia</h3>
                    <p className="text-deep-brown">
                      {experience.description || experience.shortDescription}
                    </p>
                    <p className="text-deep-brown mt-4">
                      En Hacienda de Letras, cada experiencia es una oportunidad para sumergirse en la cultura y tradición
                      de la elaboración del vino. Nuestros expertos guías te llevarán en un viaje sensorial que
                      despertará tus sentidos y te conectará con nuestra tierra.
                    </p>
                  </motion.div>

                  {/* Imágenes adicionales */}
                  <motion.div variants={fadeInUp} className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <img 
                      src="https://images.unsplash.com/photo-1528293780212-141511b35fb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Experiencia viñedo" 
                      className="w-full h-64 object-cover rounded-md"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Experiencia cata" 
                      className="w-full h-64 object-cover rounded-md"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <h3 className="text-2xl font-serif text-wine-red">Lo que incluye</h3>
                    <ul className="list-disc pl-5 text-deep-brown mt-2">
                      <li>Recorrido guiado por los viñedos</li>
                      <li>Visita a la bodega de producción</li>
                      <li>Degustación de 4 vinos premium</li>
                      <li>Tabla de quesos y aperitivos artesanales</li>
                      <li>Botella de vino de cortesía para llevar</li>
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="mt-8">
                    <h3 className="text-2xl font-serif text-wine-red">Ubicación</h3>
                    <p className="text-deep-brown">
                      Hacienda de Letras, Km 35 Carretera a Valle de Bravo, Colonia Viñedos, 52200
                    </p>
                    <div className="mt-4 h-64 bg-cream rounded-md">
                      <img 
                        src="https://images.unsplash.com/photo-1565955473425-3c136bad1461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                        alt="Mapa del viñedo" 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <div className="md:w-1/3 mt-10 md:mt-0">
                <div className="sticky top-24 bg-cream p-6 rounded-md">
                  <h3 className="text-2xl font-serif text-wine-red mb-6">Reserva tu experiencia</h3>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-brown">Nombre completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu nombre" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-brown">Correo electrónico</FormLabel>
                            <FormControl>
                              <Input placeholder="tu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="telefono"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-brown">Teléfono</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu teléfono" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fecha"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-deep-brown">Fecha</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-full pl-3 text-left font-normal"
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP", { locale: es })
                                      ) : (
                                        <span>Seleccionar fecha</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => 
                                      date < new Date() || 
                                      date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="hora"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-deep-brown">Hora</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar hora" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="10:00">10:00 AM</SelectItem>
                                  <SelectItem value="12:00">12:00 PM</SelectItem>
                                  <SelectItem value="14:00">2:00 PM</SelectItem>
                                  <SelectItem value="16:00">4:00 PM</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="personas"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-brown">Número de personas</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">1 persona</SelectItem>
                                <SelectItem value="2">2 personas</SelectItem>
                                <SelectItem value="3">3 personas</SelectItem>
                                <SelectItem value="4">4 personas</SelectItem>
                                <SelectItem value="5">5 personas</SelectItem>
                                <SelectItem value="6+">6+ personas</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="mensaje"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-brown">Mensaje (opcional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Información adicional o requerimientos especiales" 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="mt-6">
                        <Button 
                          type="submit" 
                          className="w-full bg-wine-red hover:bg-gold hover:text-deep-brown text-white transition-colors"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Procesando..." : "Confirmar Reservación"}
                        </Button>
                      </div>
                      
                      <p className="text-xs text-deep-brown/70 text-center mt-4">
                        Al reservar, aceptas nuestros términos y condiciones de servicio.
                      </p>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Experiencias relacionadas - Solo se muestra el título para simplificar */}
        <section className="py-12 bg-cream">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-wine-red text-center mb-4">Experiencias Relacionadas</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-8"></div>
            {/* Aquí irían las tarjetas de experiencias relacionadas */}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}