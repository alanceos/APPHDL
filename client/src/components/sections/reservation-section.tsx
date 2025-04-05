import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COMPANY_INFO, FEATURED_EXPERIENCES } from '@/data/constants';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Experience, insertReservationSchema } from '@shared/schema';
import { z } from 'zod';
import OptimizedImage from '@/components/ui/optimized-image';

type Step = 'experience' | 'datetime' | 'details' | 'payment' | 'confirmation';

// Extend the reservation schema
const reservationFormSchema = insertReservationSchema.extend({
  experienceId: z.string({
    required_error: "Por favor, selecciona una experiencia",
  }),
  date: z.date({
    required_error: "Por favor, selecciona una fecha",
  }),
  time: z.string({
    required_error: "Por favor, selecciona una hora",
  }),
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor, introduce un correo electrónico válido"),
  phone: z.string().min(10, "Por favor, introduce un número de teléfono válido"),
  guests: z.coerce.number().min(1, "Se requiere al menos 1 invitado").max(20, "Máximo 20 invitados"),
  specialRequests: z.string().optional(),
  cardNumber: z.string().min(16, "Por favor, introduce un número de tarjeta válido"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Por favor, introduce una fecha de caducidad válida (MM/AA)"),
  cvv: z.string().min(3, "Por favor, introduce un CVV válido"),
  billingZip: z.string().min(5, "Por favor, introduce un código postal válido"),
});

type ReservationFormValues = z.infer<typeof reservationFormSchema>;

export default function ReservationSection() {
  const [currentStep, setCurrentStep] = useState<Step>('experience');
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      experienceId: '0',
      fullName: '',
      email: '',
      phone: '',
      guests: 2,
      specialRequests: '',
      date: undefined,
      time: '',
      totalPrice: '0',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingZip: '',
    },
  });

  const { mutate: submitReservation, isPending } = useMutation({
    mutationFn: async (data: ReservationFormValues) => {
      const submissionData = {
        experienceId: data.experienceId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
        guests: data.guests,
        specialRequests: data.specialRequests,
        totalPrice: calculateTotalPrice(data.experienceId, data.guests),
      };
      
      const response = await apiRequest('POST', '/api/reservations', submissionData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Reservation Confirmed!",
        description: "Your reservation has been successfully booked.",
      });
      setCurrentStep('confirmation');
      queryClient.invalidateQueries({ queryKey: ['/api/reservations'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to book reservation: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Helper to calculate total price
  const calculateTotalPrice = (experienceId: string, guests: number): string => {
    const selectedExperience = FEATURED_EXPERIENCES.find(exp => exp.id === experienceId);
    if (!selectedExperience) return '0';
    
    const pricePerPerson = parseInt(selectedExperience.price.replace(/[^0-9]/g, ''));
    return (pricePerPerson * guests).toString();
  };

  const selectExperience = (experienceId: string) => {
    setSelectedExperienceId(experienceId);
    form.setValue('experienceId', experienceId);
    
    // Auto-update the total price when experience changes
    const guests = form.getValues('guests');
    form.setValue('totalPrice', calculateTotalPrice(experienceId, guests));
  };

  const handleContinue = () => {
    if (currentStep === 'experience') {
      if (!selectedExperienceId) {
        toast({
          title: "Por favor, Selecciona una Experiencia",
          description: "Debes seleccionar una experiencia para continuar.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep('datetime');
    } else if (currentStep === 'datetime') {
      const date = form.getValues('date');
      const time = form.getValues('time');
      
      if (!date || !time) {
        toast({
          title: "Fecha y Hora Requeridas",
          description: "Por favor, selecciona tanto una fecha como una hora para tu reserva.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep('details');
    } else if (currentStep === 'details') {
      // Validate form fields for the current step
      form.trigger(['fullName', 'email', 'phone', 'guests']).then(isValid => {
        if (isValid) {
          setCurrentStep('payment');
        }
      });
    } else if (currentStep === 'payment') {
      form.handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => {
    if (currentStep === 'datetime') setCurrentStep('experience');
    else if (currentStep === 'details') setCurrentStep('datetime');
    else if (currentStep === 'payment') setCurrentStep('details');
  };

  const onSubmit = (data: ReservationFormValues) => {
    submitReservation(data);
  };

  // Available time slots
  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', 
    '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  return (
    <section id="reserve" className="py-24 bg-white">
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
            Reserva Tu Experiencia
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gold mb-8 mx-auto"
            variants={fadeInUp}
          />
          <motion.p 
            className="text-deep-brown leading-relaxed"
            variants={fadeInUp}
          >
            Selecciona tu experiencia preferida, fecha y hora para embarcarte en un viaje a través de la herencia y sabores de nuestro viñedo.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto bg-cream p-8 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* Reservation Steps */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gold -z-10 transform -translate-y-1/2"></div>
            
            <div className={`reservation-step flex flex-col items-center z-10 ${currentStep === 'experience' || currentStep === 'datetime' || currentStep === 'details' || currentStep === 'payment' || currentStep === 'confirmation' ? 'active' : ''}`}>
              <div className={`w-10 h-10 rounded-full ${currentStep === 'experience' || currentStep === 'datetime' || currentStep === 'details' || currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-wine-red text-white' : 'bg-gray-300 text-deep-brown'} flex items-center justify-center mb-2`}>1</div>
              <span className="text-deep-brown text-sm">Experiencia</span>
            </div>
            
            <div className={`reservation-step flex flex-col items-center z-10 ${currentStep === 'datetime' || currentStep === 'details' || currentStep === 'payment' || currentStep === 'confirmation' ? 'active' : ''}`}>
              <div className={`w-10 h-10 rounded-full ${currentStep === 'datetime' || currentStep === 'details' || currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-wine-red text-white' : 'bg-gray-300 text-deep-brown'} flex items-center justify-center mb-2`}>2</div>
              <span className="text-deep-brown text-sm">Fecha y Hora</span>
            </div>
            
            <div className={`reservation-step flex flex-col items-center z-10 ${currentStep === 'details' || currentStep === 'payment' || currentStep === 'confirmation' ? 'active' : ''}`}>
              <div className={`w-10 h-10 rounded-full ${currentStep === 'details' || currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-wine-red text-white' : 'bg-gray-300 text-deep-brown'} flex items-center justify-center mb-2`}>3</div>
              <span className="text-deep-brown text-sm">Detalles</span>
            </div>
            
            <div className={`reservation-step flex flex-col items-center z-10 ${currentStep === 'payment' || currentStep === 'confirmation' ? 'active' : ''}`}>
              <div className={`w-10 h-10 rounded-full ${currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-wine-red text-white' : 'bg-gray-300 text-deep-brown'} flex items-center justify-center mb-2`}>4</div>
              <span className="text-deep-brown text-sm">Pago</span>
            </div>
            
            <div className={`reservation-step flex flex-col items-center z-10 ${currentStep === 'confirmation' ? 'active' : ''}`}>
              <div className={`w-10 h-10 rounded-full ${currentStep === 'confirmation' ? 'bg-wine-red text-white' : 'bg-gray-300 text-deep-brown'} flex items-center justify-center mb-2`}>5</div>
              <span className="text-deep-brown text-sm">Confirmación</span>
            </div>
          </div>
          
          {/* Experience Selection Step */}
          {currentStep === 'experience' && (
            <div className="reservation-form">
              <h3 className="text-2xl font-serif mb-6 text-wine-red text-center">Selecciona tu Experiencia</h3>
              
              <div className="grid gap-6">
                {FEATURED_EXPERIENCES.map((experience) => (
                  <div
                    key={experience.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedExperienceId === experience.id
                        ? 'border-gold bg-cream shadow-md'
                        : 'border-gray-200 hover:border-gold'
                    }`}
                    onClick={() => selectExperience(experience.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                        <OptimizedImage
                          src={experience.imageUrl}
                          alt={experience.title}
                          className="object-cover"
                          width={96}
                          height={96}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-serif text-wine-red">{experience.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-deep-brown/70 mb-1">
                          <span>{experience.duration}</span>
                          <span>•</span>
                          <span>{experience.price} per person</span>
                        </div>
                        <p className="text-deep-brown/80 text-sm line-clamp-2">{experience.description}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < experience.rating ? 'text-gold' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-sm text-deep-brown/70 ml-1">
                            ({experience.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button
                  type="button"
                  className="bg-wine-red text-white hover:bg-gold transition-colors duration-300"
                  onClick={handleContinue}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}
          
          {/* Date and Time Selection Step */}
          {currentStep === 'datetime' && (
            <div className="reservation-form">
              <h3 className="text-2xl font-serif mb-6 text-wine-red text-center">Selecciona Fecha y Hora</h3>
              
              <Form {...form}>
                <form className="space-y-6 mb-8">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-deep-brown mb-2">Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
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
                                date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 6))
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
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-deep-brown mb-2">Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((timeSlot) => (
                              <SelectItem key={timeSlot} value={timeSlot}>
                                {timeSlot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              
              <div className="flex justify-between">
                <Button 
                  onClick={handleBack}
                  className="bg-gray-300 text-deep-brown hover:bg-gray-400 px-6 py-2 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
                >
                  ATRÁS
                </Button>
                <Button 
                  onClick={handleContinue}
                  className="bg-wine-red text-white hover:bg-gold hover:text-deep-brown px-8 py-3 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
                >
                  CONTINUAR
                </Button>
              </div>
            </div>
          )}
          
          {/* Guest Details Step */}
          {currentStep === 'details' && (
            <div className="reservation-form">
              <h3 className="text-2xl font-serif mb-6 text-wine-red text-center">Your Details</h3>
              
              <Form {...form}>
                <form className="space-y-4 mb-8">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-deep-brown mb-2">Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300 focus:border-gold" />
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
                        <FormLabel className="text-deep-brown mb-2">Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" className="border-gray-300 focus:border-gold" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-deep-brown mb-2">Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" className="border-gray-300 focus:border-gold" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-deep-brown mb-2">Number of Guests</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number" 
                            min={1} 
                            max={20} 
                            className="border-gray-300 focus:border-gold"
                            onChange={(e) => {
                              field.onChange(e);
                              // Update total price when guest count changes
                              const experienceId = form.getValues('experienceId');
                              const guests = parseInt(e.target.value);
                              if (!isNaN(guests) && experienceId) {
                                form.setValue('totalPrice', calculateTotalPrice(experienceId, guests));
                              }
                            }} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-deep-brown mb-2">Special Requests (Optional)</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="border-gray-300 focus:border-gold" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Total Price Display */}
                  {selectedExperienceId && (
                    <div className="mt-6 p-4 bg-white rounded-lg">
                      <h4 className="text-lg font-serif text-wine-red mb-2">Reservation Summary</h4>
                      <div className="flex justify-between mb-2">
                        <span className="text-deep-brown">Experience:</span>
                        <span className="font-medium text-deep-brown">
                          {FEATURED_EXPERIENCES.find(exp => exp.id === selectedExperienceId)?.title}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-deep-brown">Date & Time:</span>
                        <span className="font-medium text-deep-brown">
                          {form.getValues('date') ? format(form.getValues('date'), "PPP") : 'Not selected'} at {form.getValues('time') || 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-deep-brown">Guests:</span>
                        <span className="font-medium text-deep-brown">{form.getValues('guests')}</span>
                      </div>
                      <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                        <span className="text-deep-brown font-medium">Total:</span>
                        <span className="font-medium text-wine-red">${parseFloat(form.getValues('totalPrice')).toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
              
              <div className="flex justify-between">
                <Button 
                  onClick={handleBack}
                  className="bg-gray-300 text-deep-brown hover:bg-gray-400 px-6 py-2 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
                >
                  ATRÁS
                </Button>
                <Button 
                  onClick={handleContinue}
                  className="bg-wine-red text-white hover:bg-gold hover:text-deep-brown px-8 py-3 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
                >
                  CONTINUAR
                </Button>
              </div>
            </div>
          )}
          
          {/* Payment Step */}
          {currentStep === 'payment' && (
            <div className="reservation-form">
              <h3 className="text-2xl font-serif mb-6 text-wine-red text-center">Payment Information</h3>
              
              <Form {...form}>
                <form className="space-y-4 mb-8">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-deep-brown mb-2">Card Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="1234 5678 9012 3456" 
                            className="border-gray-300 focus:border-gold" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-deep-brown mb-2">Expiry Date</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="MM/YY" 
                              className="border-gray-300 focus:border-gold" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-deep-brown mb-2">CVV</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="123" 
                              className="border-gray-300 focus:border-gold" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="billingZip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-deep-brown mb-2">Billing Zip Code</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="12345" 
                            className="border-gray-300 focus:border-gold" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Total Price Display */}
                  {selectedExperienceId && (
                    <div className="mt-6 p-4 bg-white rounded-lg">
                      <h4 className="text-lg font-serif text-wine-red mb-2">Payment Summary</h4>
                      <div className="flex justify-between mb-2">
                        <span className="text-deep-brown">Experience:</span>
                        <span className="font-medium text-deep-brown">
                          {FEATURED_EXPERIENCES.find(exp => exp.id === selectedExperienceId)?.title}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-deep-brown">Date & Time:</span>
                        <span className="font-medium text-deep-brown">
                          {form.getValues('date') ? format(form.getValues('date'), "PPP") : 'Not selected'} at {form.getValues('time') || 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-deep-brown">Guests:</span>
                        <span className="font-medium text-deep-brown">{form.getValues('guests')}</span>
                      </div>
                      <div className="border-t border-gold my-2 pt-2 flex justify-between">
                        <span className="text-deep-brown font-medium">Total Amount:</span>
                        <span className="font-medium text-wine-red">${parseFloat(form.getValues('totalPrice')).toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
              
              <div className="flex justify-between">
                <Button 
                  onClick={handleBack}
                  className="bg-gray-300 text-deep-brown hover:bg-gray-400 px-6 py-2 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
                >
                  ATRÁS
                </Button>
                <Button 
                  onClick={handleContinue}
                  className="bg-wine-red text-white hover:bg-gold hover:text-deep-brown px-8 py-3 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
                  disabled={isPending}
                >
                  {isPending ? "PROCESSING..." : "COMPLETE RESERVATION"}
                </Button>
              </div>
            </div>
          )}
          
          {/* Confirmation Step */}
          {currentStep === 'confirmation' && (
            <div className="reservation-form text-center">
              <div className="my-8 text-6xl text-wine-red">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3 className="text-2xl font-serif mb-4 text-wine-red">Reservation Confirmed!</h3>
              <p className="text-deep-brown mb-6">
                Thank you for booking your experience with Estate de Vino. A confirmation email has been sent to {form.getValues('email')}.
              </p>
              <div className="bg-white p-6 rounded-lg mb-8">
                <h4 className="text-lg font-serif text-wine-red mb-4">Reservation Details</h4>
                <div className="text-left space-y-2">
                  <p className="text-deep-brown">
                    <span className="font-medium">Experience:</span> {FEATURED_EXPERIENCES.find(exp => exp.id === selectedExperienceId)?.title}
                  </p>
                  <p className="text-deep-brown">
                    <span className="font-medium">Date & Time:</span> {form.getValues('date') ? format(form.getValues('date'), "PPP") : ''} at {form.getValues('time')}
                  </p>
                  <p className="text-deep-brown">
                    <span className="font-medium">Number of Guests:</span> {form.getValues('guests')}
                  </p>
                  <p className="text-deep-brown">
                    <span className="font-medium">Total Paid:</span> ${parseFloat(form.getValues('totalPrice')).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-deep-brown">
                  Esperamos darle la bienvenida a Hacienda de Letras.
                </p>
                <p className="text-deep-brown">
                  Si tiene alguna pregunta antes de su visita, contáctenos al {COMPANY_INFO.phone}.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
