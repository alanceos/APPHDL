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

type Step = 'experience' | 'datetime' | 'details' | 'payment' | 'confirmation';

// Extend the reservation schema
const reservationFormSchema = insertReservationSchema.extend({
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string({
    required_error: "Please select a time",
  }),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  guests: z.coerce.number().min(1, "At least 1 guest required").max(20, "Maximum 20 guests"),
  specialRequests: z.string().optional(),
  cardNumber: z.string().min(16, "Please enter a valid card number"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Please enter a valid expiry date (MM/YY)"),
  cvv: z.string().min(3, "Please enter a valid CVV"),
  billingZip: z.string().min(5, "Please enter a valid zip code"),
});

type ReservationFormValues = z.infer<typeof reservationFormSchema>;

export default function ReservationSection() {
  const [currentStep, setCurrentStep] = useState<Step>('experience');
  const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: experiences, isLoading } = useQuery<Experience[]>({
    queryKey: ['/api/experiences'],
  });

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      experienceId: 0,
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
  const calculateTotalPrice = (experienceId: number, guests: number): string => {
    const selectedExperience = experiences?.find(exp => exp.id === experienceId);
    if (!selectedExperience) return '0';
    
    const pricePerPerson = parseFloat(String(selectedExperience.price));
    return (pricePerPerson * guests).toString();
  };

  const selectExperience = (experienceId: number) => {
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
          title: "Please Select an Experience",
          description: "You must select an experience to continue.",
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
          title: "Date and Time Required",
          description: "Please select both a date and time for your reservation.",
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
            Reserve Your Experience
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gold mb-8 mx-auto"
            variants={fadeInUp}
          />
          <motion.p 
            className="text-deep-brown leading-relaxed"
            variants={fadeInUp}
          >
            Select your preferred experience, date, and time to embark on a journey through our vineyard's heritage and flavors.
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
              <span className="text-deep-brown text-sm">Experience</span>
            </div>
            
            <div className={`reservation-step flex flex-col items-center z-10 ${currentStep === 'datetime' || currentStep === 'details' || currentStep === 'payment' || currentStep === 'confirmation' ? 'active' : ''}`}>
              <div className={`w-10 h-10 rounded-full ${currentStep === 'datetime' || currentStep === 'details' || currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-wine-red text-white' : 'bg-gray-300 text-deep-brown'} flex items-center justify-center mb-2`}>2</div>
              <span className="text-deep-brown text-sm">Date & Time</span>
            </div>
            
            <div className={`reservation-step flex flex-col items-center z-10 ${currentStep === 'details' || currentStep === 'payment' || currentStep === 'confirmation' ? 'active' : ''}`}>
              <div className={`w-10 h-10 rounded-full ${currentStep === 'details' || currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-wine-red text-white' : 'bg-gray-300 text-deep-brown'} flex items-center justify-center mb-2`}>3</div>
              <span className="text-deep-brown text-sm">Details</span>
            </div>
            
            <div className={`reservation-step flex flex-col items-center z-10 ${currentStep === 'payment' || currentStep === 'confirmation' ? 'active' : ''}`}>
              <div className={`w-10 h-10 rounded-full ${currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-wine-red text-white' : 'bg-gray-300 text-deep-brown'} flex items-center justify-center mb-2`}>4</div>
              <span className="text-deep-brown text-sm">Payment</span>
            </div>
            
            <div className={`reservation-step flex flex-col items-center z-10 ${currentStep === 'confirmation' ? 'active' : ''}`}>
              <div className={`w-10 h-10 rounded-full ${currentStep === 'confirmation' ? 'bg-wine-red text-white' : 'bg-gray-300 text-deep-brown'} flex items-center justify-center mb-2`}>5</div>
              <span className="text-deep-brown text-sm">Confirmation</span>
            </div>
          </div>
          
          {/* Experience Selection Step */}
          {currentStep === 'experience' && (
            <div className="reservation-form">
              <h3 className="text-2xl font-serif mb-6 text-wine-red text-center">Select Your Experience</h3>
              
              {isLoading ? (
                <div className="text-center py-8">Loading experiences...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {experiences?.map((experience) => (
                    <div 
                      key={experience.id}
                      className={`experience-option cursor-pointer border-2 ${selectedExperienceId === experience.id ? 'border-gold bg-white' : 'border-transparent'} hover:border-gold p-4 rounded-lg transition-all duration-300`}
                      onClick={() => selectExperience(experience.id)}
                    >
                      <div className="flex items-start mb-4">
                        <div className="mr-4">
                          <img 
                            src={`${experience.imageUrl}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80`} 
                            alt={experience.name} 
                            className="w-16 h-16 object-cover rounded"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-serif text-wine-red">{experience.name}</h4>
                          <p className="text-deep-brown text-sm mb-2">
                            {experience.duration} minutes | ${parseFloat(String(experience.price)).toFixed(2)} per person
                          </p>
                          <div className="flex text-gold text-xs">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <i key={i} className={`fas ${i < Math.floor(parseFloat(String(experience.ratings))) ? 'fa-star' : i < parseFloat(String(experience.ratings)) ? 'fa-star-half-alt' : 'fa-star'}`}></i>
                            ))}
                            <span className="text-deep-brown ml-1">({experience.reviewCount} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-deep-brown text-sm">{experience.shortDescription}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="text-center">
                <Button 
                  onClick={handleContinue}
                  className="bg-wine-red text-white hover:bg-gold hover:text-deep-brown px-8 py-3 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
                  disabled={isLoading}
                >
                  CONTINUE
                </Button>
              </div>
            </div>
          )}
          
          {/* Date and Time Selection Step */}
          {currentStep === 'datetime' && (
            <div className="reservation-form">
              <h3 className="text-2xl font-serif mb-6 text-wine-red text-center">Select Date & Time</h3>
              
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
                  BACK
                </Button>
                <Button 
                  onClick={handleContinue}
                  className="bg-wine-red text-white hover:bg-gold hover:text-deep-brown px-8 py-3 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
                >
                  CONTINUE
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
                          {experiences?.find(exp => exp.id === selectedExperienceId)?.name}
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
                  BACK
                </Button>
                <Button 
                  onClick={handleContinue}
                  className="bg-wine-red text-white hover:bg-gold hover:text-deep-brown px-8 py-3 transition-colors duration-300 font-sans tracking-wider text-sm font-medium"
                >
                  CONTINUE
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
                          {experiences?.find(exp => exp.id === selectedExperienceId)?.name}
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
                  BACK
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
                    <span className="font-medium">Experience:</span> {experiences?.find(exp => exp.id === selectedExperienceId)?.name}
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
                  We look forward to welcoming you to Estate de Vino.
                </p>
                <p className="text-deep-brown">
                  If you have any questions before your visit, please contact us at {COMPANY_INFO.phone}.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
