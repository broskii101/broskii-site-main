import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Mail, 
  MessageCircle, 
  Clock,
  Users,
  ArrowRight,
  Home,
  HelpCircle,
  Snowflake
} from 'lucide-react';

const ThankYouPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Snowflake className="absolute top-20 left-10 h-8 w-8 text-primary-200 animate-float" />
        <Snowflake className="absolute top-40 right-20 h-6 w-6 text-primary-300 animate-float" style={{ animationDelay: '2s' }} />
        <Snowflake className="absolute bottom-40 left-20 h-10 w-10 text-primary-200 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="bg-green-100 rounded-full p-6 shadow-xl">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                Thank You for Booking with Broskii!
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                We've received your registration and are excited to have you on board.
              </p>

              {/* What Happens Next Section */}
              <div className="bg-primary-50 rounded-xl p-6 md:p-8 mb-8">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Clock className="h-8 w-8 text-primary-600" />
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
                    What Happens Next?
                  </h2>
                </div>
                
                <p className="text-lg text-gray-700 mb-6">
                  You'll hear from us within 48 hours via email or WhatsApp with:
                </p>
                
                <div className="space-y-4 text-left max-w-2xl mx-auto">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Payment confirmation and trip details</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">A WhatsApp invite to your Broskii Trip Group for updates, travel info, and more</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-lg text-gray-700 mb-6">
                  If you have any questions in the meantime, feel free to reach out:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <a
                    href="mailto:salaam@broskii.com"
                    className="group flex items-center justify-center space-x-3 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <Mail className="h-6 w-6" />
                    <span className="font-semibold">salaam@broskii.com</span>
                  </a>
                  
                  <a
                    href="https://wa.me/447749939192"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center space-x-3 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="h-6 w-6" />
                    <span className="font-semibold">+44 7749 939192</span>
                  </a>
                </div>

                <p className="text-lg text-gray-700 mb-2">
                  We'll be in touch soon.
                </p>
                <p className="text-lg font-semibold text-primary-600">
                  — The Broskii Team
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <Home className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              
              <Link
                to="/faq"
                className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border border-gray-200 hover:border-gray-300"
              >
                <HelpCircle className="h-5 w-5" />
                <span>View FAQs</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ThankYouPage;