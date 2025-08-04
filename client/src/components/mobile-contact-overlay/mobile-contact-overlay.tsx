import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { useMobileDevice } from "@/hooks/use-mobile";

import { CONTACT_LINKS } from "@/components/contact-section/data/contact";
import { Formatters } from "@/components/utils/formatters";
import { format } from "path";
import { Form } from "react-hook-form";

export function MobileContactOverlay() {
  const isMobile = useMobileDevice();

  // Only show on mobile devices
  if (!isMobile) return null;

  //See if you can store values in objects and pass through as props, demonstrate this at meeting.
  const handleCall = () => {
    window.location.href = Formatters.phoneToTelLink(CONTACT_LINKS.phone);
  };

  const handleEmail = () => {
    window.location.href = Formatters.emailToMailLink(CONTACT_LINKS.email);
  };

  const handleDirections = () => {
    // Opens default maps app with business location
    window.open("https://maps.google.com/?q=Glasgow+City+Centre", "_blank");
  };

  const handleSMS = () => {
    window.location.href = Formatters.phoneToSMSLink(CONTACT_LINKS.phone);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-4 py-3">
        {/* Call Button */}
        <button
          onClick={handleCall}
          className="flex flex-col items-center justify-center py-2 px-4 active:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mb-1">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs text-gray-700 font-medium">CALL</span>
        </button>

        {/* Email Button */}
        <button
          onClick={handleEmail}
          className="flex flex-col items-center justify-center py-2 px-4 active:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mb-1">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs text-gray-700 font-medium">EMAIL</span>
        </button>

        {/* Directions Button */}
        <button
          onClick={handleDirections}
          className="flex flex-col items-center justify-center py-2 px-4 active:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mb-1">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs text-gray-700 font-medium">DIR</span>
        </button>

        {/* SMS Button */}
        <button
          onClick={handleSMS}
          className="flex flex-col items-center justify-center py-2 px-4 active:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mb-1">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs text-gray-700 font-medium">SMS</span>
        </button>
      </div>
    </div>
  );
}
