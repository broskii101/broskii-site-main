import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const FloatingContactButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <Link
        to="/contact"
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 sm:mr-3 whitespace-nowrap"
            >
              <div className="bg-gray-900 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow-lg text-xs sm:text-sm font-medium">
                Send us a message
                <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2">
                  <div className="w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button - Smaller for mobile */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {/* Pulse Animation Ring - Smaller for mobile */}
          <div className="absolute inset-0 bg-broskii-light-blue-500 rounded-full animate-ping opacity-20"></div>
          
          {/* Button - Responsive sizing */}
          <div className="relative bg-gradient-to-r from-broskii-light-blue-500 to-broskii-light-blue-600 hover:from-broskii-light-blue-600 hover:to-broskii-light-blue-700 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:shadow-3xl border-2 border-broskii-light-blue-400 hover:border-broskii-light-blue-300">
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>

          {/* Floating Particles Effect - Adjusted for smaller button */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default FloatingContactButton;