import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';

const CaretDown = ({ className = '' }) => (
  <svg
    viewBox="0 0 12 8"
    width="14"
    height="10"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1.5L6 6.5L11 1.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);



const Footer = () => {
  const [openMenu, setOpenMenu] = useState<null | 'explore' | 'contact'>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (footerRef.current && !footerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };

    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z" />
    </svg>
  );

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/broskiiuk', icon: Instagram, hover: 'hover:text-[#E1306C]' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@broskiiuk', icon: TikTokIcon, hover: 'hover:text-black' },
    { name: 'YouTube', url: 'https://youtube.com/@broskiiuk', icon: Youtube, hover: 'hover:text-[#FF0000]' },
  ];

  const exploreLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Trips', href: '/upcoming-trip' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'FAQs', href: '/faq' },
  ];

  const contactLinks = [
    { name: 'Contact form', href: '/contact', internal: true },
    { name: 'Email', href: 'mailto:salaam@broskii.com' },
    { name: 'WhatsApp', href: 'https://wa.me/447749939192' },
    { name: 'Instagram', href: 'https://www.instagram.com/broskiiuk' },
  ];

  const legalLinks = [
    { name: 'Terms of Service', href: '/termsofservice' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Cookies Policy', href: '/cookiespolicy' },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-b from-[#eef7ff] via-[#e6f0fa] to-[#d9e6f2]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-14 pb-10">

        {/* Social icons */}
        <div className="flex justify-center mb-9">
          <div className="flex items-center gap-9 text-gray-600">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`transition-colors duration-300 ${social.hover}`}
              >
                <social.icon className="h-8 w-8" />
              </a>
            ))}
          </div>
        </div>

        {/* Desktop nav — unchanged */}
        <nav className="hidden md:block mb-10">
          <ul className="flex justify-center gap-12">
            {[...exploreLinks, { name: 'Contact', href: '/contact' }].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-[17px] text-gray-700 hover:text-[#1f7fbf] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile dropdowns */}
        <div className="md:hidden text-center space-y-7 mb-12">

          {/* Explore */}
          <div>
          <button
  type="button"
  onClick={() => setOpenMenu(openMenu === 'explore' ? null : 'explore')}
  className="font-serif text-[23px] text-gray-700 hover:text-[#1f7fbf] transition-colors"
>
  Explore{' '}
  <CaretDown className="inline-block opacity-45 relative top-[1px]" />
</button>


            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                openMenu === 'explore'
                  ? 'max-h-96 opacity-100 mt-4'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <ul className="flex flex-col items-center gap-4 text-[18px] text-gray-700">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      onClick={() => setOpenMenu(null)}
                      className="hover:text-[#1f7fbf] transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
          <button
  type="button"
  onClick={() => setOpenMenu(openMenu === 'contact' ? null : 'contact')}
  className="font-serif text-[23px] text-gray-700 hover:text-[#1f7fbf] transition-colors"
>
  Contact{' '}
  <CaretDown className="inline-block opacity-45 relative top-[1px]" />
</button>



            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                openMenu === 'contact'
                  ? 'max-h-96 opacity-100 mt-4'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <ul className="flex flex-col items-center gap-4 text-[18px] text-gray-700">
                {contactLinks.map((link) => (
                  <li key={link.name}>
                    {link.internal ? (
                      <Link
                        to={link.href}
                        onClick={() => setOpenMenu(null)}
                        className="hover:text-[#1f7fbf] transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpenMenu(null)}
                        className="hover:text-[#1f7fbf] transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Legal */}
        <div className="text-center text-[14px] text-gray-500">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mb-2">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-[#1f7fbf] transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <p>© 2025 Broskii. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

