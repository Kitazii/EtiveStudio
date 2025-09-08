import { SiFacebook, SiInstagram, SiYoutube, SiLinkedin } from "react-icons/si";

export function Footer() {
  const socialLinks = [
    {
      icon: SiFacebook,
      href: "https://www.facebook.com/etivestudios",
      label: "Facebook",
    },
    {
      icon: SiInstagram,
      href: "https://www.instagram.com/etivestudios/",
      label: "Instagram",
    },
    {
      icon: SiYoutube,
      href: "https://www.youtube.com/@etivestudios6925",
      label: "YouTube",
    },
    {
      icon: SiLinkedin,
      href: "https://www.linkedin.com/company/etive-creations/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-white text-brand-black py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Copyright */}
          <div className="mb-4 md:mb-0">
            <img
              src="/attached_assets/ETIVE_black_red_transparent_1751556670379.PNG"
              alt="Etive Studio"
              className="h-6 w-auto mx-8 mb-6"
            />
            <p className="text-gray-600 text-sm mx-5">
              © {new Date().getFullYear()} Etive Studio. All rights reserved.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 mt-2 md:mt-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-600 hover:text-brand-red transition-colors duration-200"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>

          {/* Kitazi Web Agency Logo */}
          <div className="mb-4 md:mb-0 flex items-center">
            <span className="text-gray-600 text-sm mr-2 font-bold italic">powered by</span>
            <img
              src="/attached_assets/my-logo/kitazi-web-agency-transparent.png"
              alt="Kitazi Web Agency"
              className="h-20 w-auto"
            />
          </div>


        </div>
      </div>
    </footer>
  );
}
