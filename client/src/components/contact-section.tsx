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
                  BOOK <span className="brand-gray">PHOTOGRAPHY SESSION</span>
                </span>
              </h2>

              {/* Contact Details */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-center space-x-3">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
                    />
                  </svg>
                  <span className="brand-gray">(+44) 7964873296</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                    />
                  </svg>
                  <span className="brand-gray">etivecreations@gmail.com</span>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mb-8 text-center">
                <h3 className="brand-gray font-semibold mb-3">
                  Business Hours
                </h3>
                <table className="table-auto border-collapse text-left mx-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Day</th>
                      <th className="px-4 py-2">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-t px-4 py-2">Mon - Fri</td>
                      <td className="border-t px-4 py-2">09:00 - 18:00</td>
                    </tr>
                    <tr>
                      <td className="border-t px-4 py-2">Sat - Sun</td>
                      <td className="border-t px-4 py-2">10:00 - 16:00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-lg brand-gray mb-8 leading-relaxed">
                Ready to capture your vision? We've got you covered. Reach out
                to us using the details below.
              </p>
              {/* Address */}
              <div>
                <p className="brand-gray mb-2">Etive Studio —</p>
                <p className="brand-gray">Glasgow, United Kingdom.</p>
              </div>
            </div>

            {/* Contact Form Section */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black mb-4 text-center">
                {/* Underline */}
                <span className="inline-block border-b-4 border-brand-red pb-1 mb-10">
                  GET IN TOUCH
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
                      {/*Use the react-google-recaptcha library, implement this once I launch to production*/}
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
