import { Phone, Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';

import { useMobileDevice } from "@/hooks/use-mobile";

import { CONTACT_LINKS } from "@/components/contact-section/data/contact";
import { Formatters } from "@/components/utils/formatters";

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

  const handleWhatsApp = () => {
    window.open("https://wa.me/447964873296", "_blank");
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

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-2 px-4 active:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mb-1">
            <FaWhatsapp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs text-gray-700 font-medium">WA</span>
        </button>
      </div>
    </div>
  );
}
