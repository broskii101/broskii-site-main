import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Mail, 
  MessageCircle, 
  Home,
  HelpCircle,
  Snowflake
} from 'lucide-react';

const MessageSentPage = () => {
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
            {/* Success Icon - No pulse animation */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="bg-green-100 rounded-full p-6 shadow-xl">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                Message Sent – Thank You!
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                We've received your message and will get back to you as soon as possible — usually within 48 hours via email or WhatsApp.
              </p>

              {/* Contact Information */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-lg text-gray-700 mb-6">
                  If your enquiry is urgent, feel free to reach out directly:
                </p>
                
                <div className="space-y-4 mb-8 text-center">
                  <div>
                    <a
                      href="tel:+447749939192"
                      className="text-lg font-semibold text-primary-600 hover:text-primary-700 underline"
                    >
                      +44 7749 939192
                    </a>
                  </div>
                  
                  <div>
                    <a
                      href="mailto:salaam@broskii.com"
                      className="text-lg font-semibold text-primary-600 hover:text-primary-700 underline"
                    >
                      salaam@broskii.com
                    </a>
                  </div>
                </div>

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

export default MessageSentPage;