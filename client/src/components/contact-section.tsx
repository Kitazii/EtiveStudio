import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function ContactSection() {
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      if (!captchaChecked) {
        throw new Error("Please complete the captcha verification");
      }
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      form.reset();
      setCaptchaChecked(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 min-h-[50vh] overflow-hidden bg-brand-light"
    >
      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Business Information Section */}
            <div className="text-brand-black">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 ">
                {/* Underline */}
                <span className="inline-block border-b-4 border-brand-red pb-1 mb-10">
                  Book Your{" "}
                  <span className="brand-gray">Photography Session</span>
                </span>
              </h2>
              <p className="text-lg brand-gray mb-8 leading-relaxed">
                Ready to capture your vision? Whether you want to book a full
                photography session or just discuss your project, we've got you
                covered. Reach out to us using the details below.
              </p>

              {/* Contact Details */}
              <div className="space-y-6 mb-8">
                <div className="flex flex-col items-center space-x-3">
                  <span className="brand-gray">📞(+44) 123 456 789</span>
                </div>
                <div className="flex flex-col items-center space-x-3">
                  <span className="brand-gray"></span>
                  <span className="brand-gray">✉️info@etivestudio.com</span>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mb-8">
                <h3 className="brand-gray font-semibold mb-3">
                  Mon - Fri : 09:00 - 18:00 / Sat - Sun : 10:00 - 16:00
                </h3>
              </div>

              {/* Address */}
              <div>
                <p className="brand-gray mb-2">Etive Studio —</p>
                <p className="brand-gray mb-1">123 Photography Lane,</p>
                <p className="brand-gray">Glasgow, United Kingdom.</p>
              </div>
            </div>

            {/* Contact Form Section */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4 text-center">
                {/* Underline */}
                <span className="inline-block border-b-4 border-brand-red pb-1 mb-10">
                  Get In Touch
                </span>
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium brand-gray">
                            Full Name *
                          </FormLabel>
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
                          <FormLabel className="text-sm font-medium brand-gray">
                            Email Address *
                          </FormLabel>
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
                        onCheckedChange={(checked) =>
                          setCaptchaChecked(checked as boolean)
                        }
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
                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors duration-200"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
