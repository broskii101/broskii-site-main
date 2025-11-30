import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  // TikTok Icon Component (since it's not in Lucide)
  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z"/>
    </svg>
  );

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/broskiiuk?igsh=YXpqM3J4NjhsMTVz',
      icon: Instagram,
      color: 'hover:text-pink-500'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@broskiiuk?_t=ZN-8xhU3rECMsA&_r=1',
      icon: TikTokIcon,
      color: 'hover:text-black'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@broskiiuk?si=qe8BXRsGEnkuar2W',
      icon: Youtube,
      color: 'hover:text-red-500'
    }
  ];

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/about' },
    { name: 'Upcoming trips', href: '/upcoming-trip' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Contact Us', href: '/contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/termsofservice' },
    { name: 'Cookies Policy', href: '/cookiespolicy' },  // <-- updated here
    { name: 'Refund Policy', href: '/refund-policy' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Three Column Layout - Quick Links, Follow Us, Legal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Follow Us */}
          <div className="text-center lg:text-center md:order-2 order-1">
            <h3 className="text-xl font-serif font-semibold mb-6">Follow Us</h3>
            <div className="flex justify-center lg:justify-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors duration-300 p-3 rounded-lg hover:bg-gray-800`}
                  aria-label={social.name}
                >
                  <social.icon className="h-7 w-7" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left md:order-1 order-2">
            <h3 className="text-xl font-serif font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="hidden md:block md:order-3 text-center lg:text-right">
            <h3 className="text-xl font-serif font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            {/* Mobile only Policies links */}
            <div className="flex flex-col items-center space-y-2 md:hidden">
              <div className="flex justify-center items-center space-x-4">
                {legalLinks.slice(0, 3).map((link, index) => (
                  <React.Fragment key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm whitespace-nowrap"
                    >
                      {link.name}
                    </Link>
                    {index < 2 && (
                      <span className="text-gray-600">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-center">
                <Link 
                  to={legalLinks[3].href} 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {legalLinks[3].name}
                </Link>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm text-center">
              © 2025 Broskii. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;