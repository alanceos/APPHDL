import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { COMPANY_INFO } from '@/data/constants';
import { insertContactMessageSchema } from '@shared/schema';
import { z } from 'zod';

const contactFormSchema = insertContactMessageSchema.extend({
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor, introduce un correo electrónico válido'),
  phone: z.string().min(10, 'Por favor, introduce un número de teléfono válido'),
  subject: z.string().min(1, 'Por favor, selecciona un asunto'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const { mutate: submitContact, isPending } = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Mensaje Enviado!",
        description: "Gracias por tu mensaje. Nos pondremos en contacto pronto.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `No se pudo enviar el mensaje: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    submitContact(data);
  };

  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            <motion.div 
              className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.h2 
                className="text-3xl md:text-5xl font-serif mb-6 text-wine-red"
                variants={fadeInUp}
              >
                Contáctanos
              </motion.h2>
              <motion.div 
                className="w-20 h-1 bg-gold mb-8"
                variants={fadeInUp}
              />
              
              <motion.div 
                className="mb-8"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-serif mb-4 text-deep-brown">Visita Nuestra Hacienda</h3>
                <p className="text-deep-brown mb-2">
                  <i className="fas fa-map-marker-alt mr-3 text-wine-red"></i> {COMPANY_INFO.address}
                </p>
                <p className="text-deep-brown mb-2">
                  <i className="fas fa-phone mr-3 text-wine-red"></i> {COMPANY_INFO.phone}
                </p>
                <p className="text-deep-brown">
                  <i className="fas fa-envelope mr-3 text-wine-red"></i> {COMPANY_INFO.email}
                </p>
              </motion.div>
              
              <motion.div 
                className="mb-8"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-serif mb-4 text-deep-brown">Horarios</h3>
                <p className="text-deep-brown mb-2">
                  <span className="font-medium">Visitas y Degustaciones:</span> {COMPANY_INFO.hours.toursTastings}
                </p>
                <p className="text-deep-brown mb-2">
                  <span className="font-medium">Restaurante:</span> {COMPANY_INFO.hours.restaurant}
                </p>
                <p className="text-deep-brown">
                  <span className="font-medium">Tienda de Vinos:</span> {COMPANY_INFO.hours.wineShop}
                </p>
              </motion.div>
              
              <motion.div 
                className="mb-8"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-serif mb-4 text-deep-brown">Síguenos</h3>
                <div className="flex space-x-4">
                  <a 
                    href={COMPANY_INFO.social.instagram} 
                    className="text-wine-red hover:text-gold transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                  <a 
                    href={COMPANY_INFO.social.facebook} 
                    className="text-wine-red hover:text-gold transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f text-2xl"></i>
                  </a>
                  <a 
                    href={COMPANY_INFO.social.twitter} 
                    className="text-wine-red hover:text-gold transition-colors duration-300"
                    aria-label="Twitter"
                  >
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                  <a 
                    href={COMPANY_INFO.social.pinterest} 
                    className="text-wine-red hover:text-gold transition-colors duration-300"
                    aria-label="Pinterest"
                  >
                    <i className="fab fa-pinterest text-2xl"></i>
                  </a>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-8 shadow-md">
                  <h3 className="text-2xl font-serif mb-6 text-wine-red">Envíanos un Mensaje</h3>
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="block text-deep-brown mb-2 text-sm">Nombre Completo</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-3 border border-gray-300 focus:border-gold focus:outline-none transition-colors duration-300" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="block text-deep-brown mb-2 text-sm">Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 focus:border-gold focus:outline-none transition-colors duration-300" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="block text-deep-brown mb-2 text-sm">Número de Teléfono</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="tel"
                            className="w-full px-4 py-3 border border-gray-300 focus:border-gold focus:outline-none transition-colors duration-300" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="block text-deep-brown mb-2 text-sm">Asunto</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full px-4 py-3 border border-gray-300 focus:border-gold focus:outline-none transition-colors duration-300">
                              <SelectValue placeholder="Selecciona un asunto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tours">Visitas y Degustaciones</SelectItem>
                            <SelectItem value="events">Eventos Privados</SelectItem>
                            <SelectItem value="orders">Pedidos de Vino</SelectItem>
                            <SelectItem value="other">Otra Consulta</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="block text-deep-brown mb-2 text-sm">Mensaje</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 focus:border-gold focus:outline-none transition-colors duration-300" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-wine-red text-white hover:bg-gold hover:text-deep-brown px-8 py-3 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
                    disabled={isPending}
                  >
                    {isPending ? "ENVIANDO..." : "ENVIAR MENSAJE"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
