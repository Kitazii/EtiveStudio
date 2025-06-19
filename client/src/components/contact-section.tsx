import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { insertContactSchema, type InsertContact } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export function ContactSection() {
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      if (!captchaChecked) {
        throw new Error('Please complete the captcha verification');
      }
      return apiRequest('POST', '/api/contacts', data);
    },
    onSuccess: () => {
      toast({
        title: 'Message Sent!',
        description: 'Thank you for your message. We\'ll get back to you soon.',
      });
      form.reset();
      setCaptchaChecked(false);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Business Information Section */}
          <div>
            <div className="mb-12">
              <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase mb-4">
                GET BOOKED
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-6">
                Book Your <span className="brand-red">Photography Session</span>
              </h2>
              <p className="text-lg brand-gray leading-relaxed">
                Ready to capture your vision? Whether you want to book a full photography session or just discuss your project, we've got you covered.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-8 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-red text-lg">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-black mb-1">Phone</h3>
                  <p className="brand-gray">(+44) 123 456 789</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-red text-lg">✉️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-black mb-1">Email</h3>
                  <p className="brand-gray">info@etivestudio.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-red text-lg">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-black mb-1">Location</h3>
                  <p className="brand-gray">123 Photography Lane<br />Glasgow, United Kingdom</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-red text-lg">🕒</span>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-black mb-1">Hours</h3>
                  <p className="brand-gray">Mon - Fri: 09:00 - 18:00<br />Sat - Sun: 10:00 - 16:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase mb-4">
                CONTACT US
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4">
                Get In Touch
              </h2>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium brand-gray">Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            {...field}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium brand-gray">Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium brand-gray">
                        Project Details *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder="Tell us about your project, timeline, and requirements..."
                          {...field}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 resize-vertical"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Captcha */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="captcha"
                      checked={captchaChecked}
                      onCheckedChange={(checked) => setCaptchaChecked(checked as boolean)}
                      className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-600"
                    />
                    <label htmlFor="captcha" className="text-sm brand-gray">
                      I'm not a robot (reCAPTCHA verification)
                    </label>
                  </div>
                </div>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-brand-red text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors duration-200"
                >
                  {contactMutation.isPending ? 'Sending...' : 'Get In Touch'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}