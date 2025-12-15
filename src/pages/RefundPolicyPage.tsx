import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  CreditCard,
  Users,
  Phone,
  Mail,
  MessageCircle,
  Info,
  Send,
  Instagram
} from 'lucide-react';

const RefundPolicyPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="h-12 w-12 text-primary-200" />
              <h1 className="text-5xl font-serif font-bold">Refund & Cancellation Policy</h1>
            </div>
            <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
              At Broskii, we aim to keep things simple and transparent. 
              Please read this carefully before booking, as our trips involve significant upfront costs and preparation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* Booking & Payment Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 rounded-full p-3">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-900">Booking & Payment</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 rounded-full p-2 mt-1">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Deposit Policy</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Deposits are generally non-refundable, as they go toward securing key elements of the trip (flights, accommodation, etc.). However, if a replacement is found, we'll refund your deposit minus any admin and/or airline name change fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 rounded-full p-2 mt-1">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Remaining Balance</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The remaining balance must be paid no later than 10 weeks before departure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Booking Confirmation</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Your booking is only confirmed once full payment has been received.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Refunds & Cancellations Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-red-100 rounded-full p-3">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-900">Refunds & Cancellations</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-serif font-bold text-red-900 mb-2">Important Notice</h3>
                      <p className="text-red-800 leading-relaxed">
                        If no replacement is found, no refund can be issued, including the deposit. This is because trip costs (flights, accommodation, transfers) are committed in advance and are usually non-recoverable.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-50 rounded-full p-2 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Replacement Found – More Than 15 Days Before Departure</h3>
                    <p className="text-gray-600 leading-relaxed mb-2">
                      If a replacement is found more than 15 days before departure:
                    </p>
                    <ul className="mt-3 space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>You will be refunded the full amount paid, minus any admin or airline name-change fees.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-50 rounded-full p-2 mt-1">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Replacement Found – Less Than 15 Days Before Departure</h3>
                    <p className="text-gray-600 leading-relaxed mb-2">
                      If a replacement is found less than 15 days before departure:
                    </p>
                    <ul className="mt-3 space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span>You will be refunded the full amount paid, minus admin fees and the full cost of the original flight, as most airlines do not allow name changes within two weeks of departure.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-50 rounded-full p-2 mt-1">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">No Replacement Found</h3>
                    <p className="text-gray-600 leading-relaxed mb-2">
                      If no replacement is found:
                    </p>
                    <ul className="mt-3 space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>No refund can be provided, including the deposit, as major trip costs will already have been paid and are non-recoverable.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 rounded-full p-2 mt-1">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Transferring Your Booking</h3>
                    <p className="text-gray-600 leading-relaxed mb-2">
                      You are welcome to find someone to take your place. If this happens:
                    </p>
                    <ul className="mt-3 space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>You'll be refunded the full amount paid, minus any admin or airline name change fees (or the full flight fare if the transfer is within 15 days of departure).</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-50 rounded-full p-2 mt-1">
                    <Info className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Why Full Refunds Are Not Always Possible</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We commit to major trip expenses early on — these are often non-refundable to us. However, if a replacement is found, we'll do our best to recover and return as much of your payment as possible.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-50 rounded-full p-2 mt-1">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">Mandatory Travel Insurance</h3>
                    <p className="text-gray-600 leading-relaxed mb-2">
                      Travel insurance with winter sports cover is required for all participants. Your policy should include cover for:
                    </p>
                    <ul className="mt-3 space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>Trip cancellation</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>Medical emergencies</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>Lost luggage</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>Winter sports-related injuries or delays</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

{/* Important Note Section */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-6 text-white"
>
  <div className="flex items-center space-x-3 mb-4">
    <div className="bg-white/20 rounded-full p-2">
      <AlertTriangle className="h-6 w-6 text-white" />
    </div>
    <h2 className="text-2xl font-serif font-bold">Important Note</h2>
  </div>

  <p className="text-base text-primary-100 leading-relaxed mb-4">
    We understand that plans can change. If you're thinking of cancelling or facing payment issues, 
    please contact us as early as possible — the more notice we have, the more options we can explore.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
    <Link
      to="/contact"
      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 text-white group text-center"
    >
      <Send className="h-6 w-6 mx-auto mb-2 text-primary-200 group-hover:text-white transition-colors" />
      <div className="font-serif font-semibold">Message Us</div>
    </Link>

    <a
      href="mailto:salaam@broskii.com"
      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 text-white group text-center"
    >
      <Mail className="h-6 w-6 mx-auto mb-2 text-primary-200 group-hover:text-white transition-colors" />
      <div className="font-serif font-semibold">Email</div>
    </a>

    <a
      href="https://wa.me/447749939192"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 text-white group text-center"
    >
      <MessageCircle className="h-6 w-6 mx-auto mb-2 text-primary-200 group-hover:text-white transition-colors" />
      <div className="font-serif font-semibold">WhatsApp</div>
   </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicyPage;