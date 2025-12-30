import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Mail, MessageCircle, Instagram, Mountain } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
// Header is always light and independent (no transparent overlay state)



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
  
    if (isMobileMenuOpen) {
      // Prevent layout shift when scrollbar disappears (desktop browsers)
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    }
  
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [isMobileMenuOpen]);
  
  
  

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Trips', href: '/upcoming-trip' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  // Company Logo Component with proper colors and vertical flip
  const CompanyLogo = ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 614 614"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'scaleY(-1)' }}
    >
      <defs>
        <clipPath id="clipPath18" clipPathUnits="userSpaceOnUse">
          <path d="M 0,614 H 614 V 0 H 0 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#clipPath18)">
        {/* Blue/Cyan mountain shape */}
        <g transform="translate(332.4779,356.0261)">
          <path
            fill="#55c9f4"
            d="m 0,0 -7.819,7.521 c -3.792,3.63 -8.747,5.639 -13.935,5.639 -0.977,0 -1.962,-0.073 -2.928,-0.216 l -0.149,-0.021 c -4.148,-0.551 -7.999,-2.427 -11.138,-5.425 l -45.64,-43.832 -5.213,1.218 c -4.399,1.028 -8.818,2.179 -13.506,3.519 l -0.124,0.036 c -2.332,0.7 -4.808,1.464 -7.569,2.336 l -0.073,0.023 c -4.736,1.535 -9.233,3.138 -13.368,4.763 -4.666,1.752 -9.399,3.736 -14.467,6.063 -19,8.766 -29.065,16.655 -29.484,16.986 l -3.744,2.961 v 94.144 l 4.431,2.923 c 41.719,27.519 106.982,36.621 133.104,39.257 3.949,0.414 6.84,0.636 8.229,0.743 l 0.016,0.002 c 0.495,0.075 0.991,0.112 1.496,0.112 h 1.421 l 0.507,-0.147 c 2.539,-0.205 5.436,-0.478 8.448,-0.795 4.411,-0.427 9.688,-1.058 15.265,-1.826 3.071,-0.403 5.755,-0.792 8.381,-1.216 11.76,-1.795 23.36,-4.046 34.481,-6.69 13.686,-3.264 26.317,-7.058 37.549,-11.28 14.202,-5.314 26.586,-11.425 36.793,-18.161 l 4.43,-2.923 V 1.56 l -3.759,-2.961 C 120.511,-2.287 93.512,-23.238 43.031,-35.113 l -5.224,-1.228 z"
          />
        </g>
        
        {/* Dark gray/black outline and details */}
        <g transform="translate(310.7246,372.186)">
          <path
            fill="#292929"
            d="m 0,0 c 5.964,0 11.649,-2.298 16.009,-6.472 l 44.454,-42.736 3.634,0.856 c 49.815,11.718 76.332,32.278 77.436,33.147 l 2.613,2.06 v 91.084 l -3.082,2.035 c -10.018,6.61 -22.195,12.617 -36.192,17.855 -11.118,4.179 -23.63,7.937 -37.193,11.171 -11.035,2.624 -22.555,4.859 -34.238,6.642 -2.615,0.423 -5.251,0.805 -8.318,1.208 -5.556,0.764 -10.793,1.391 -15.164,1.815 -2.999,0.315 -5.895,0.587 -8.399,0.79 l -0.305,0.024 -0.389,0.113 h -0.994 c -0.356,0 -0.697,-0.025 -1.041,-0.078 l -0.273,-0.029 c -1.341,-0.103 -4.198,-0.323 -8.114,-0.734 -25.914,-2.614 -90.604,-11.626 -131.765,-38.777 l -3.083,-2.034 v -91.077 l 2.605,-2.06 c 0.407,-0.322 10.211,-8.001 28.881,-16.615 5.001,-2.296 9.669,-4.253 14.264,-5.978 4.129,-1.622 8.568,-3.204 13.238,-4.719 2.797,-0.882 5.26,-1.642 7.58,-2.338 l 0.103,-0.03 c 4.616,-1.32 8.988,-2.459 13.347,-3.478 l 3.627,-0.847 44.466,42.703 c 3.606,3.446 8.038,5.601 12.82,6.236 l 0.135,0.019 C -2.259,-0.083 -1.125,0 0,0 M 58.658,-55.795 11.854,-10.801 C 8.623,-7.707 4.411,-6 0,-6 -0.83,-6 -1.667,-6.062 -2.487,-6.184 l -0.182,-0.025 c -3.527,-0.469 -6.799,-2.066 -9.474,-4.622 l -46.809,-44.955 -6.799,1.588 c -4.456,1.042 -8.92,2.205 -13.649,3.557 l -0.141,0.041 c -2.365,0.71 -4.854,1.477 -7.63,2.354 l -0.095,0.03 c -4.786,1.552 -9.341,3.175 -13.54,4.825 -4.687,1.76 -9.484,3.77 -14.621,6.129 -19.315,8.911 -29.662,17.018 -30.094,17.359 l -4.883,3.862 V 81.17 l 5.779,3.812 c 42.273,27.886 108.111,37.08 134.455,39.738 3.909,0.409 6.786,0.633 8.216,0.743 0.6,0.086 1.213,0.129 1.826,0.129 h 1.85 l 0.625,-0.182 c 2.481,-0.203 5.313,-0.471 8.215,-0.776 4.425,-0.428 9.745,-1.065 15.361,-1.838 3.108,-0.408 5.8,-0.798 8.45,-1.227 11.817,-1.804 23.5,-4.07 34.696,-6.733 13.808,-3.292 26.562,-7.124 37.91,-11.39 14.415,-5.393 26.996,-11.606 37.39,-18.465 l 5.777,-3.812 v -97.225 l -4.901,-3.862 c -1.147,-0.904 -28.68,-22.256 -79.774,-34.275 z"
          />
        </g>
        
        {/* Central figure/skier */}
        <g transform="translate(448.6753,245.8938)">
          <path
            fill="#292929"
            d="m 0,0 -10.537,10.441 c 7.575,-44.352 -18.154,-98.133 -18.154,-98.133 l -12.827,10.452 c 1.545,-29.437 -54.303,-71.306 -54.303,-71.306 l -6.072,20.317 c -12.028,-10.708 -21.862,-17.537 -29.085,-21.873 -2.738,-1.609 -5.082,-2.876 -7.053,-3.846 h -0.011 c -0.032,0.011 -0.053,0.021 -0.085,0.032 -1.971,0.969 -4.315,2.237 -7.053,3.846 -7.223,4.336 -17.057,11.165 -29.085,21.872 l -6.072,-20.316 c 0,0 -55.848,41.869 -54.303,71.306 l -12.827,-10.452 c 0,0 -25.729,53.781 -18.154,98.122 l -10.537,-10.43 -4.549,91.303 c 3.334,-2.738 6.296,-5.881 8.81,-9.343 2.515,-3.473 4.571,-7.266 6.094,-11.304 3.804,-10.11 10.75,-24.003 21.34,-28.786 17.344,-7.884 17.344,-8.673 20.36,-12.221 3.004,-3.494 17.61,-46.908 17.61,-46.908 l 43.947,26.602 c 2.121,1.29 4.784,1.332 6.925,0.096 4.912,-2.834 13.829,-7.394 17.558,-5.55 V 3.878 c -0.011,0 -0.021,0.011 -0.032,0.011 V -7.884 c -0.597,-0.532 -9.354,-8.086 -21.851,-8.086 -27.487,0 -39.057,-14.063 -39.057,-14.063 0,0 21.681,-13.147 34.518,-11.187 10.494,1.63 21.468,3.676 25.143,4.336 v 0.128 c 0,0 0.086,0 0.309,-0.085 l 0.97,-0.138 h 0.032 v -0.022 l 0.905,0.128 c 0.224,0.096 0.309,0.096 0.309,0.096 v -0.138 c 3.676,-0.661 14.649,-2.707 25.143,-4.337 12.828,-1.949 34.519,11.187 34.519,11.187 0,0 -11.57,14.063 -39.057,14.063 -12.955,0 -21.883,8.118 -21.883,8.118 0.021,0.022 0.032,0.032 0.032,0.032 v 11.73 c 3.75,-1.811 12.625,2.749 17.526,5.561 2.141,1.236 4.804,1.204 6.925,-0.096 l 43.947,-26.591 c 0,0 14.606,43.403 17.61,46.898 3.015,3.548 3.015,4.336 20.36,12.22 10.59,4.783 17.536,18.687 21.34,28.786 1.523,4.038 3.579,7.831 6.093,11.304 2.515,3.473 5.477,6.616 8.811,9.354 z"
          />
        </g>
        
        {/* Text elements */}
        <g transform="translate(201.1793,380.7104)">
          <path
            fill="#292929"
            d="m 0,0 c -0.73,-7.18 -3.47,-12.63 -7.83,-11.78 -2.97,0.58 -4.44,0.87 -7.32,1.42 0.76,9.36 0.88,18.56 0.88,27.95 h 5.84 c 5.95,0 8.45,-2.41 8.45,-10.23 C 0.02,4.43 0.34,3.37 0,0 m -9.07,55.25 c 4.6,0.67 7.78,-6.04 7.78,-12.05 v -4.69 c 0,-6.74 -2.97,-8.9 -7.86,-8.9 h -5.12 c 0.08,8.4 -0.24,16.33 -0.97,24.72 2.43,0.37 3.67,0.55 6.17,0.92 M 13.13,6.52 c 0.25,7.36 -2.44,15.22 -9.77,18.04 5.84,2.77 8.46,8.3 8.46,16.95 0,1.21 0,1.66 -0.1,3.21 -0.8,13.43 -2.98,37.67 -22.03,28.91 -7.75,-3.23 -11.37,-4.89 -17.06,-8.19 v -85.73 c 6.23,-3.15 10,-5.41 18.01,-9.77 18.94,-11.39 21.61,17.05 22.44,29.58 0.23,3.57 0.05,4.26 0.05,7"
          />
        </g>
        
        {/* Additional text elements */}
        <g transform="translate(240.3892,406.7104)">
          <path
            fill="#292929"
            d="m 0,0 h -5.12 c 0,14.56 -0.81,33.68 -0.93,48.25 2.8,1.79 9.63,3.9 11.95,2.96 1.36,-0.54 1.76,-22.05 1.76,-29.6 L 7.86,11.17 C 7.86,2.72 4.88,0 0,0 m 21.08,-23.08 c 0.26,6.96 -1.69,14.96 -8.69,17.91 5.83,2.77 8.57,8.42 8.57,17.08 0,2.64 0.24,2.95 -0.18,6.96 -0.12,1.21 -0.23,3.09 -0.38,5.41 l -1.15,36.35 c -0.32,4.88 -4.9,8.33 -9.67,7.29 L 2.98,66.15 0.97,65.61 c -6.78,-2.25 -13.56,-4.49 -20.33,-6.8 1.2,-42.93 1.14,-85.39 -0.37,-128.32 5.6,-1.96 8.41,-2.76 13.84,-3.61 0.31,20.37 0.77,40.73 0.77,61.1 h 4.53 c 5.95,0 8.57,-2.89 8.57,-10.7 0.11,-8.67 0.17,-17.33 0.2,-25.99 0.07,-8.19 0.53,-16.21 0.29,-24.54 2.88,1.94 8.11,5.56 12.84,10.15 0,3.51 0,6.89 -0.21,17.9 0.59,7.28 -0.27,14.8 -0.02,22.12"
          />
        </g>
        
        {/* More text elements */}
        <g transform="translate(405.2994,464.2404)">
          <path
            fill="#292929"
            d="m 0,0 c -5.35,2.07 -8.03,3.03 -13.32,4.69 -5.49,-21.24 -7.8,-41.1 -17.11,-61.01 0,21.78 0.27,43.56 0.57,65.34 -4.57,1.01 -7.05,1.57 -12.21,2.7 -1.45,-45.21 -1.46,-90.24 -1.13,-135.46 5.28,-3.95 5.47,-7.15 11.63,-7.45 0.66,17.63 1.43,35.57 1.14,53.22 1.62,3.08 2.43,4.62 4.05,7.7 6.97,-18.35 8.77,-36.8 12.83,-56 5.26,1.82 7.9,2.78 13.22,4.83 -5.15,22.49 -9.7,42.84 -18.07,64.27 C -9.27,-38.36 -6.02,-20.06 0,0"
          />
        </g>
        
        <g transform="translate(411.3792,461.8004)">
          <path
            fill="#292929"
            d="m 0,0 c -0.33,-38.89 -0.25,-77.78 -0.52,-116.68 5.2,2.1 7.82,3.21 13.07,5.55 0.3,35.08 0.19,70.16 0.75,105.23 C 8.02,-3.41 5.35,-2.22 0,0"
          />
        </g>
        
        <g transform="translate(434.1693,451.2604)">
          <path
            fill="#292929"
            d="m 0,0 c -0.55,-32.05 -0.42,-64.09 -0.65,-96.15 5.29,2.54 7.95,3.88 13.29,6.7 V -6.67 C 7.71,-3.96 5.17,-2.61 0,0"
          />
        </g>
        
        {/* Side elements */}
        <g transform="translate(463.7667,370.7102)">
          <path
            fill="#292929"
            d="M 0,0 -5.895,-1.908 V 70.17 L 0.643,67.59 C 4.545,66.05 7.086,62.444 7.086,58.447 V 9.374 C 7.086,5.139 4.239,1.372 0,0"
          />
        </g>
        
        <g transform="translate(157.4258,370.7102)">
          <path
            fill="#292929"
            d="M 0,0 5.895,-1.908 V 70.17 L -0.643,67.59 C -4.545,66.05 -7.086,62.444 -7.086,58.447 V 9.374 C -7.086,5.139 -4.239,1.372 0,0"
          />
        </g>
        
        {/* Blue accent elements */}
        <g transform="translate(282.2193,448.5504)">
          <path
            fill="#2b5b93"
            d="m 0,0 v -1.87 l -0.14,0.02 C -0.1,-1.24 -0.05,-0.62 0,0"
          />
        </g>
        
        <g transform="translate(295.6092,389.6592)">
          <path
            fill="#292929"
            d="m 0,0 c -0.25,-2.08 -3.17,-3.47 -7.64,-5.402 -4.46,-1.932 -6.86,0.375 -6.05,4.968 0.51,16.964 0.26,29.371 0.02,46.335 -0.11,2.454 -0.11,6.082 0.14,9.877 0.04,0.601 0.09,1.212 0.14,1.823 v 12.47 c 0,2.444 2.02,4.425 4.5,4.425 h 4.23 c 2.48,0 4.49,-1.981 4.49,-4.425 V 48.947 c 0.09,-1.173 0.14,-2.208 0.16,-3.046 C 0.09,29.046 0.16,16.856 0,0 m 12.61,52.397 0.36,27.728 c 0.1,7.038 -6.13,12.538 -13.22,11.68 l -3.18,-0.384 -11.4,-1.37 -2.53,-0.306 C -23.27,89.036 -27.71,84.087 -27.71,78.213 V 57.611 l 0.09,-0.01 c -0.37,-9.246 0.38,-18.215 0.93,-23.765 0.09,-14.391 0.09,-28.783 -0.01,-43.184 -0.24,-3.41 -2.44,-18.551 2.2,-21.37 4.86,-2.937 12.98,5.54 15.72,7.649 6.66,5.146 13.3,13.041 21.93,13.948 v 42.947 c -0.1,3.953 -0.06,10.863 -0.54,18.571"
          />
        </g>
        
        <g transform="translate(295.4393,444.9504)">
          <path
            fill="#2b5b93"
            d="m 0,0 v -5.13 c -0.12,1.55 -0.3,3.33 -0.54,5.2 z"
          />
        </g>
        
        <g transform="translate(341.8192,433.3751)">
          <path
            fill="#292929"
            d="m 0,0 c 0.06,1.375 0.01,3.79 -0.15,6.716 v 21.487 c 0,3.162 -2.61,5.725 -5.83,5.725 h -1.33 c -3.22,0 -5.83,-2.563 -5.83,-5.725 V -9.649 l 0.02,14.74 c 0.63,-17.704 24.823,-12.081 25.56,-31.588 0.745,-19.71 3.044,-51.017 -19.324,-39.591 -6.62,3.381 -15.223,11.18 -19.746,13.293 0.01,0.58 0,27.121 0,29.153 h 12.39 c 0,-2.366 0.012,-22.323 0.002,-23.138 -0.019,-2.032 6.942,-7.284 11.132,-8.944 4.18,-1.649 2.566,20.72 2.446,24.844 -0.55,17.557 -25.41,11.774 -25.61,31.667 -0.04,4.448 -0.5,2.986 0.06,12.874 l -0.07,0.01 v 22.486 c 0,5.852 4.26,10.781 9.93,11.488 l 2.42,0.304 13.98,-0.216 c 6.8,0.855 12.77,-4.624 12.68,-11.635 L 12.4,10.44 C 12.84,2.507 12.54,3.839 12.35,-1.178 12.26,-2.415 -0.07,-2.16 0,0"
          />
        </g>
        
        <g transform="translate(328.6993,424.8104)">
          <path
            fill="#2b5b93"
            d="M 0,0 H -0.02 V 0.69 C -0.02,0.46 -0.02,0.23 0,0"
          />
        </g>
      </g>
    </svg>
  );

  return (
    <>
    <motion.header
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.25, ease: 'easeOut' }}
  className={`sticky top-0 z-50 bg-white border-b border-black/10 transition-shadow duration-300 ${
    isScrolled ? 'shadow-sm' : 'shadow-none'
  }`}
>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-[72px] sm:h-[88px]">

{/* Mobile Menu Button */}
<button
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  className="md:hidden flex items-center justify-center h-11 w-11 rounded-full bg-black/5 hover:bg-black/10 transition-colors duration-200 text-gray-900"
>
  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
</button>



          {/* Logo Only - Bigger Size and Vertically Flipped - Moved Left */}
          <Link to="/" className="flex items-center -mr-3">

          <CompanyLogo className="h-[77px] w-[77px] sm:h-[80px] sm:w-[80px]" />


          </Link>

          {/* Desktop Navigation */}
<nav className="hidden md:flex items-center space-x-2">
  {navigation.map((item) => {
    const isActive = location.pathname === item.href;

    return (
      <Link
        key={item.name}
        to={item.href}
        className={`relative px-3 py-2 text-sm font-medium transition-opacity duration-200 ${
          isActive ? 'text-gray-900 opacity-100' : 'text-gray-700 opacity-80 hover:opacity-100'
        }`}
        
      >
        {item.name}

        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute -bottom-[1px] left-3 right-3 h-px bg-gray-900"

          />
        )}
      </Link>
    );
  })}
</nav>


          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/upcoming-trip"
              className="flex items-center gap-2 bg-[#0092D1] hover:bg-[#0088c4] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-[0_10px_30px_rgba(0,146,209,0.22)] hover:shadow-[0_14px_40px_rgba(0,146,209,0.28)] hover:scale-[1.03]"

            >
              <Calendar className="h-4 w-4" />
              <span>Book Now</span>
            </Link>
          </div>

         


        </div>
      </div>

      

    </motion.header>

{/* Mobile Menu (overlay, anchored to header, does NOT replace hero) */}
<AnimatePresence>
  {isMobileMenuOpen && (
    
<motion.div
  key="mobileMenuOverlay"
  onClick={() => setIsMobileMenuOpen(false)}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.18, ease: 'easeOut' }}
  className="md:hidden fixed inset-0 z-[50] pointer-events-auto"
>


      {/* IMPORTANT: no backdrop, no full-width white layer */}

      {/* Panel (anchored under header, right aligned) */}
      <motion.div
        key="mobileMenuPanel"
        onClick={(e) => e.stopPropagation()}

        initial={{ x: -64, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
exit={{ x: -64, opacity: 0 }}

        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-[72px] w-[48%] max-w-[220px] pointer-events-auto"


      >
        {/* Off-white veil surface (NOT pure white) */}
        <div className="rounded-b-3xl bg-[#FAFAFA] shadow-[0_20px_60px_rgba(0,0,0,0.12)] max-h-[60vh] overflow-y-auto px-5 py-6">

          {/* Menu label (no extra X here; header X controls close) */}
          

          {/* Links (staggered) */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.09,
                  delayChildren: 0.17,
                },
              },
            }}
            className="flex flex-col"
          >
            {navigation.map((item, idx) => {
              const active = location.pathname === item.href;

              return (
                <motion.div
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group block py-3"
                  >
                    <div
                      className={`inline-flex items-baseline gap-3 font-serif text-[24px] leading-tight ${
                        active ? 'text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      <span className="border-b border-transparent group-hover:border-gray-900/30 transition-colors">
                        {item.name}
                      </span>

                      {active && (
                        <span className="h-[6px] w-[6px] rounded-full bg-[#0092D1]" />
                      )}
                    </div>
                  </Link>

                  {/* ultra-soft divider (optional, very subtle) */}
                  {idx !== navigation.length - 1 && (
                    <div className="h-px bg-black/5" />
                  )}
                </motion.div>
              );
            })}
          </motion.nav>

      {/* Editorial CTA (text only, neutral) */}
<div className="mt-8">
  <Link
    to="/upcoming-trip"
    onClick={() => setIsMobileMenuOpen(false)}
    className="group inline-flex items-center font-serif text-[22px] leading-tight text-gray-900 font-semibold"
  >
    <span className="
      border-b-2
      border-gray-900/40
      group-hover:border-gray-900
      transition-colors duration-200
    ">
      Book now
    </span>
  </Link>
</div>



        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


     </>
   );
   };
   
   export default Header;
   