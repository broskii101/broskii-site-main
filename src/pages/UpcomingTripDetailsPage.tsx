import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import UpcomingTripCard from '../components/UpcomingTripCard';
import {
  Calendar,
  MapPin,
  Mountain,
  ArrowLeft,
  CheckCircle,
  X,
  Users,
  Mail,
  Phone,
  Send,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

interface WaitlistFormInputs {
  fullName: string;
  email: string;
  phone: string;
}

const UpcomingTripDetailsPage = () => {
  const [fullScreenImage, setFullScreenImage] = React.useState<string | null>(null);
  const [showWaitlistModal, setShowWaitlistModal] = React.useState(false);

  const tripCapacity = 52;
  const bookedCount = 52;
  const isSoldOut = bookedCount >= tripCapacity;

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<WaitlistFormInputs>();

  const openFullScreenImage = (imageUrl: string) => {
    setFullScreenImage(imageUrl);
  };

  const closeFullScreenImage = () => {
    setFullScreenImage(null);
  };

  /**
   * IMPORTANT:
   * This object now fully satisfies the Trip interface
   * required by UpcomingTripCard.
   *
   * No UI or logic is affected because:
   * - isHomepage={true}
   * - most fields are not rendered in that mode
   */
  const upcomingTrip = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'SKI 3 VALLEYS',
    subtitle: 'Val Thorens, French Alps',
    image: '/1000088456.jpg',
    price: '£1,999',
    originalPrice: undefined,
    dates: '10th - 17th January 2026',
    location: 'Val Thorens, French Alps',
    duration: '7 Days',
    groupSize: 'Small Group',
    description:
      'A premium alpine ski experience in the heart of the French Alps.',
    inclusions: [
      { text: 'Return flights with BA from LHR to GVA' },
      { text: 'Full 3 Valleys Ski pass (Worth £370)' },
      { text: "4★ Luxury Hotel (L'Oxalys)" },
      { text: 'Private Coach Transfer' },
      { text: 'Ski in/out access' },
      { text: 'Spa Facilities' },
    ],
    highlights: [],
    badge: undefined,
  };

  const onWaitlistSubmit = async (data: WaitlistFormInputs) => {
    try {
      const { error } = await supabase.from('waitlist').insert([
        {
          trip_id: upcomingTrip.id,
          full_name: data.fullName,
          email: data.email,
          phone: data.phone || null,
        },
      ]);

      if (error) {
        toast.error(`Failed to join waitlist: ${error.message}`);
      } else {
        toast.success(
          'Successfully joined the waitlist! We will notify you if a spot opens up.'
        );
        reset();
        setShowWaitlistModal(false);
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative py-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/IMG-20250125-WA0048.webp"
            alt="Skiing adventure background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white relative z-10"
          >
            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-primary-200 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>

            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                Our Next Adventure
              </h1>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
                Ready for the ultimate skiing experience? Join us on our next epic journey to the French Alps.
              </p>

              <p className="text-xl max-w-3xl mx-auto mt-4 text-primary-100">
  <span className="bg-white/10 text-white font-semibold px-3 py-1 rounded shadow-sm inline-block">
    Secure your spot today with just a £300 deposit.
  </span>
</p>

              
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trip Details Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {[{
              icon: Calendar,
              label: 'Dates',
              value: upcomingTrip.dates
            }, {
              icon: MapPin,
              label: 'Location',
              value: upcomingTrip.location
            }].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-white border border-primary-100 rounded-2xl p-6 shadow-lg text-center transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <Icon className="h-6 w-6 md:h-8 md:w-8 text-primary-600 mx-auto mb-3" />
                <div className="font-bold text-lg md:text-xl text-gray-900">{value}</div>
                <div className="text-gray-600 text-sm md:text-base">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Two Column Layout on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Trip Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <UpcomingTripCard trip={upcomingTrip} isHomepage={true} onImageClick={openFullScreenImage} />
            </motion.div>

            {/* Right Column - Trip Description */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2,
                    duration: 0.6,
                  },
                },
              }}
              className="mt-12 lg:mt-0 bg-white border border-primary-100 rounded-2xl p-8 shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-5 mb-10 border-l-4 border-primary-600 pl-5">
                {[
                  'Return flights with BA from LHR to GVA',
                  'Full 3 Valleys Ski pass (Worth £370)',
                  "4★ Luxury Hotel (L'Oxalys)",
                  'Private Coach Transfer',
                  'Ski in/out access',
                  'Spa Facilities',
                ].map((text) => (
                  <motion.div
                    key={text}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-900 font-semibold">{text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                {isSoldOut ? (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    className="inline-block"
                  >
                    <div className="bg-red-600 text-white px-10 py-5 rounded-full text-lg font-bold shadow-lg">
                      Sold Out
                    </div>
                    <p className="text-gray-700 mt-4 mb-2">This trip is currently full.</p>
                    <button
                      onClick={() => setShowWaitlistModal(true)}
                      className="inline-flex items-center space-x-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-transform duration-300 transform hover:scale-105"
                    >
                      <Users className="h-6 w-6" />
                      <span>Join Waitlist</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="inline-block"
                  >
                    <Link
                      to="/booking"
                      className="inline-flex items-center space-x-3 bg-primary-600 hover:bg-primary-700 text-white px-10 py-5 rounded-full text-lg font-bold shadow-lg transition-transform duration-300"
                    >
                      <Calendar className="h-6 w-6" />
                      <span>Book Now</span>
                    </Link>
                  </motion.div>
                )}
             
              </div>
            </motion.div>
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            {/* Why Val Thorens - Full Width */}
            <div className="bg-white border border-primary-100 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Mountain className="h-8 w-8 text-primary-600" />
                <h3 className="text-2xl font-serif font-bold text-gray-900">Why Val Thorens?</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Val Thorens sits at 2,300m altitude, making it Europe's highest ski resort. 
                  This means guaranteed snow conditions and an extended ski season.
                </p>
                <p>
                  As part of Les 3 Vallées, you'll have access to 600km of pistes - 
                  the world's largest ski area. From gentle beginner slopes to challenging 
                  off-piste terrain, there's something for every skill level.
                </p>
                <p>
                  The resort offers true ski-in/ski-out convenience, meaning you can 
                  step out of your accommodation and onto the slopes within minutes.
                </p>
              </div>
              
              {/* Mobile-only "Got questions?" section */}
              <div className="lg:hidden mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-700 mb-6 text-center">
                  Got questions? Check out our detailed FAQs or send us a message—we're happy to help.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/faq"
                    className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                  >
                    <span>FAQs</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-full font-semibold transition-colors"
                  >
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full Screen Image Modal */}
      {fullScreenImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeFullScreenImage}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fullScreenImage}
              alt="Full screen view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={closeFullScreenImage}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowWaitlistModal(false)} // Close modal on backdrop click
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
          >
            <button
              onClick={() => setShowWaitlistModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 text-center">
              Join the Waitlist
            </h2>
            <p className="text-gray-700 text-center mb-6">
              This trip is currently full. Enter your details below, and we'll notify you if a spot opens up!
            </p>

            <form onSubmit={handleSubmit(onWaitlistSubmit)} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline h-4 w-4 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  {...register('fullName', { required: 'Full name is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your phone number (optional)"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-transform duration-300 transform hover:scale-105"
              >
                <Send className="h-5 w-5" />
                <span>Submit</span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UpcomingTripDetailsPage;