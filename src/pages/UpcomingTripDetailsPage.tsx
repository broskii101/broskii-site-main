import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import {
  Calendar,
  MapPin,
  CheckCircle,
  X,
  Users,
  Mail,
  Phone,
  Send
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
  const [trip, setTrip] = React.useState<any>(null);

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<WaitlistFormInputs>();

  React.useEffect(() => {
    const loadTrip = async () => {
      const { data } = await supabase
        .from('trips')
        .select('id, capacity, booked_count, status')
        .eq('id', '648bbce7-7b1f-4b53-aee3-0bfbfb32a1c1')
        .single();

      if (data) setTrip(data);
    };

    loadTrip();
  }, []);

  const isSoldOut =
    !!trip &&
    (
      (typeof trip.capacity === 'number' &&
        typeof trip.booked_count === 'number' &&
        trip.booked_count >= trip.capacity) ||
      trip.status === 'full'
    );

    const openFullScreenImage = (src: string) => {
      setFullScreenImage(src);
    };
  
    const closeFullScreenImage = () => {
      setFullScreenImage(null);
    };
  
    const premiumReveal = {
      initial: { opacity: 0, y: 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6 }
    };
  


  /* -------------------------------
     EVENT SCHEMA (GOOGLE ONLY)
     ------------------------------- */
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Broskii Ski Trip – Tignes, French Alps (April 2026)",
    startDate: "2026-04-11",
    endDate: "2026-04-18",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Tignes / Val d’Isère",
      address: {
        "@type": "PostalAddress",
        addressCountry: "FR"
      }
    },
    image: [
      "https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/v1769048687/broskii-tignes-april-ski-trip-poster_zpf1oe.jpg"
    ],
    organizer: {
      "@type": "Organization",
      name: "Broskii",
      url: "https://broskii.com/"
    },
    description:
      "A premium April ski trip to Tignes in the French Alps, offering high-altitude terrain, ski-in ski-out accommodation, full area ski pass, and a well-paced alpine experience.",
    

    url: "https://broskii.com/upcoming-trip/",
    offers: {
      "@type": "Offer",
      url: "https://broskii.com/upcoming-trip/",
      price: "1099",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock"
    }
  };
  

  

  const onWaitlistSubmit = async (data: WaitlistFormInputs) => {
    try {
      const { error } = await supabase.from('waitlist').insert([
        {
          trip_id: '648bbce7-7b1f-4b53-aee3-0bfbfb32a1c1',
          full_name: data.fullName,
          email: data.email,
          phone: data.phone || null
        }
      ]);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Successfully joined the waitlist');
        reset();
        setShowWaitlistModal(false);
      }
    } catch {
      toast.error('Unexpected error');
    }
  };

  return (
    <>
      {/* EVENT SCHEMA INJECTION */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema)
        }}
      />

      <div className="min-h-screen bg-gray-50">

        <Helmet>
          <title>
            Tignes Ski Trip, French Alps | April 2026 – Broskii
          </title>

          <meta
            name="description"
            content="Join Broskii on a premium April ski trip to Tignes in the French Alps, featuring ski-in ski-out accommodation, full area ski pass, and high-altitude late-season conditions."
          />

          <link
            rel="canonical"
            href="https://broskii.com/upcoming-trip/"
          />
        </Helmet>





      {/* Header Section */}
      <section className="relative overflow-hidden min-h-[38vh] sm:min-h-[44vh] flex items-center">

  {/* Background Image */}
  <div className="absolute inset-0">
  <img
  src="https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/v1766874462/broskii-skiing-action-alpine-hero.webp_qlnwfp.webp"
  alt="Action shot of a skier descending an alpine slope with two others nearby, showing the tips of skis in the foreground."
  className="absolute inset-0 w-full h-full object-cover"
/>


    {/* Cinematic overlay (lighter than before) */}
    <div className="absolute inset-0 bg-black/35"></div>

    {/* Subtle vignette for premium depth */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
  </div>

  <div className="max-w-7xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-white relative z-10 text-center"
    >
      <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
  Upcoming Trips
</h1>

<div className="mt-10 md:mt-12">
  <p className="text-sm md:text-base text-primary-100 font-medium tracking-wide mb-1">
    Limited spaces
  </p>
  <p className="text-sm md:text-base text-primary-100/85 font-normal">
    Secure your place with a £300 deposit
  </p>
</div>


    </motion.div>
  </div>
</section>


     
{/* Trip Details Section */}
<section className="py-12">
  <div className="max-w-7xl mx-auto px-6">
  <motion.div
  initial={{ opacity: 0, y: 14 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.05 }}
  className="text-center mb-10"
>
  <h2 className="text-[2.1rem] leading-tight font-serif font-bold text-gray-900 mb-3">
    Tignes, French Alps
  </h2>

  <p className="text-[1.3rem] font-semibold text-primary-600 mb-3">
    11th – 18th April 2026
  </p>

  <p className="text-[1rem] font-medium text-gray-600 tracking-wide">
    Tignes le Lac · 2,100 m
  </p>
</motion.div>

   



    {/* April poster (clickable) */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="mx-auto w-[92%] max-w-sm"

    >
      <div className="relative">
        <img
          src="https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/v1769048687/broskii-tignes-april-ski-trip-poster_zpf1oe.jpg"
          alt="Broskii poster promoting an April ski trip to Tignes, part of the Tignes–Val d’Isère ski area in the French Alps.
          "
          onClick={() =>
            openFullScreenImage(
              "https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/v1769048687/broskii-tignes-april-ski-trip-poster_zpf1oe.jpg"
            )
          }
          className="w-full h-full object-contain cursor-pointer"

        />

        
      </div>
    </motion.div>

    {/* April details */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-10 max-w-2xl mx-auto"
    >
      {/* Why Tignes (short, premium) */}
      <motion.section {...premiumReveal} className="mb-8">

        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
          Why Tignes?
        </h3>
        <div className="space-y-2 text-gray-700">
          <p>
            High-altitude terrain and reliable late-season conditions make Tignes a strong choice for April skiing.
          </p>
          <p>
            Expect big, varied slopes with a great mix for different ability levels — plus a lively alpine resort feel.
          </p>
          </div>
          </motion.section>

    

      {/* What’s included (lightweight list — not a bulky card) */}
      <motion.section {...premiumReveal} className="mb-10">

        <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
          What’s included?
        </h3>

        <div className="space-y-3">
          {[
            "BA Return flights from London Heathrow",
            "Ski-in / ski-out accommodation",
            "4★ Accommodation with Spa facilities",
            "Full area Ski Pass included",
            "Private Coach Transfers",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800 font-medium">{item}</span>
            </div>
          ))}
        </div>
        </motion.section>


      {/* April CTA */}
<div className="text-center">
  {isSoldOut ? (
    <>
      <div className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-gray-300 text-gray-700 font-bold text-lg cursor-not-allowed">
        Sold out
      </div>

      
      <button
  onClick={() => setShowWaitlistModal(true)}
  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
>
  Join waitlist
  <span aria-hidden>→</span>
</button>



    </>
  ) : (
    <>
      <Link
        to="/booking/648bbce7-7b1f-4b53-aee3-0bfbfb32a1c1"
        className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-primary-600 text-white font-bold text-lg shadow-lg transition-transform duration-300 hover:bg-primary-700 hover:scale-105"
      >
        Book Now
      </Link>

      <p className="text-sm text-gray-600 mt-3">
        Reserve your place with a £300 deposit
      </p>
    </>
  )}
</div>






    </motion.div>

   
    {/* Divider */}
<div className="mt-20 mb-10">
  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
</div>

{/* SOLD OUT TRIPS ARCHIVE */}
<div className="space-y-24">

  {/* JANUARY 2026 — SOLD OUT */}
  <div className="max-w-md mx-auto">
    <div className="text-center mb-6">
      <p className="text-[0.8rem] tracking-widest uppercase text-gray-400 font-semibold">
        January 2026
      </p>
    </div>

    <div className="relative">
      <img
        src="https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/broskii-val-thorens-ski-3-valleys-january-2026-sold-out_ijudjp.jpg"
        alt="Broskii January 2026 ski trip poster in Val Thorens, French Alps – sold out"
        onClick={() =>
          openFullScreenImage(
            "https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/broskii-val-thorens-ski-3-valleys-january-2026-sold-out_ijudjp.jpg"
          )
        }
        className="w-full rounded-2xl shadow-lg cursor-pointer ring-1 ring-black/5 opacity-95 scale-[0.90]"
      />

      <div className="absolute top-4 right-4 bg-gray-900/85 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
        SOLD OUT
      </div>
    </div>
  </div>

  {/* JANUARY 2025 — SOLD OUT */}
  <div className="max-w-md mx-auto">
    <div className="text-center mb-6">
      <p className="text-[0.8rem] tracking-widest uppercase text-gray-400 font-semibold">
        January 2025
      </p>
    </div>

    <div className="relative">
      <img
        src="https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/broskii-val-thorens-ski-3-valleys-january-2025-sold-out_pjrvzr.jpg"
        alt="Broskii January 2025 ski trip poster in Val Thorens, French Alps – sold out"
        onClick={() =>
          openFullScreenImage(
            "https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/broskii-val-thorens-ski-3-valleys-january-2025-sold-out_pjrvzr.jpg"
          )
        }
        className="w-full rounded-2xl shadow-lg cursor-pointer ring-1 ring-black/5 opacity-95 scale-[0.90]"
      />

      <div className="absolute top-4 right-4 bg-gray-900/85 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
        SOLD OUT
      </div>
    </div>
  </div>

  {/* DECEMBER 2024 — SOLD OUT */}
  <div className="max-w-md mx-auto">
    <div className="text-center mb-6">
      <p className="text-[0.8rem] tracking-widest uppercase text-gray-400 font-semibold">
        December 2024
      </p>
    </div>

    <div className="relative">
      <img
        src="https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/broskii-tignes-val-disere-december-2024-sold-out_jlsgmn.jpg"
        alt="Broskii December 2024 ski trip poster in Tignes and Val d’Isère, French Alps – sold out"
        onClick={() =>
          openFullScreenImage(
            "https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/broskii-tignes-val-disere-december-2024-sold-out_jlsgmn.jpg"
          )
        }
        className="w-full rounded-2xl shadow-lg cursor-pointer ring-1 ring-black/5 opacity-95 scale-[0.90]"
      />

      <div className="absolute top-4 right-4 bg-gray-900/85 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
        SOLD OUT
      </div>
    </div>
    </div>

</div>
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
  </>
);
};


export default UpcomingTripDetailsPage;