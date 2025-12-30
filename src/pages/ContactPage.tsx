import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  MessageCircle,
  Send,
  Instagram
} from 'lucide-react';

import ContactSuccessPage from './ContactSuccessPage';


interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();
  const [messageSent, setMessageSent] = React.useState(false);
  const navigate = useNavigate();

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'salaam@broskii.com',
      description: 'Send us a message anytime',
      link: 'mailto:salaam@broskii.com',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: MessageCircle,
      title: 'Whatsapp or Call us',
      details: '+44 7749 939192',
      description: 'Quick chat and instant responses',
      link: 'https://wa.me/447749939192',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      details: '@broskiiuk',
      description: 'Ski fails, epic runs, and laughs from the lift—see it all on our IG.',
      link: 'https://www.instagram.com/broskiiuk?igsh=YXpqM3J4NjhsMTVz',
      color: 'from-pink-500 to-purple-600'
    }
  ];

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch('/.netlify/functions/sendContactMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessageSent(true);
        reset();
      } else {
        alert('Sorry, there was a problem sending your message.');
      }
    } catch (err) {
      alert('An unexpected error occurred.');
      console.error(err);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {messageSent ? (
  <ContactSuccessPage />
) : (

        <>
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            {/* Background image */}
            <img
              src="https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1600/v1766890218/broskii-ski-lesson-instructor-guided-slope.webp_rdonp2.webp"
              alt="Ski instructor guiding a small group on a gentle alpine slope, representing support and guidance during a Broskii ski trip."
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/35"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-white"
              >
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <MessageCircle className="h-12 w-12 text-white/80" />
                  <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1]">
                    Let&apos;s Chat
                  </h1>
                </div>

                <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed font-normal">
                  Need help planning your trip? Whether it&apos;s your first time on the slopes or your sixth — we&apos;ll guide you every step of the way.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Contact Form & Info */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}

                  // Tuned: calmer, lighter container; does not add scroll
                  className="bg-[#f7fbff] border border-[#e6f1f8] rounded-3xl shadow-sm p-6 sm:p-7"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <MessageCircle className="h-4 w-4" />
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Send us a Message</h2>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          {...register('name', { required: 'Name is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter your full name"
                        />
                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Please enter a valid email'
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          {...register('phone')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          {...register('subject', { required: 'Please select a subject' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Select a subject</option>
                          <option value="booking">Booking Inquiry</option>
                          <option value="trip-info">Trip Information</option>
                          <option value="equipment">Equipment & Lessons</option>
                          <option value="group">Group Bookings</option>
                          <option value="family">Family Trips</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        {...register('message', { required: 'Message is required' })}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="Your message..."
                      />
                      {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                </motion.div>

                {/* Contact Info Cards */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}

                  // keep spacing same to avoid adding scroll
                  className="space-y-6"
                >
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <a
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}

                        // Tuned: centered, calmer, smaller-feeling; no translate jump
                        className="
                          block
                          bg-white
                          border border-gray-200/70
                          rounded-3xl
                          shadow-sm
                          hover:shadow-md
                          transition-shadow duration-300
                          p-6 sm:p-7
                          text-center
                        "
                      >
                        <div
                          className={`
                            bg-gradient-to-r ${info.color}
                            rounded-full
                            w-14 h-14
                            flex items-center justify-center
                            mx-auto
                            mb-4
                            shadow-sm
                          `}
                        >
                          <info.icon className="h-7 w-7 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-1">{info.title}</h3>
                        <p className="text-gray-900 font-medium mb-1">{info.details}</p>
                        <p className="text-gray-600 text-[15px]">{info.description}</p>
                      </a>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ContactPage;

