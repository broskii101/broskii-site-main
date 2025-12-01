import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import UpcomingTripCard from '../components/UpcomingTripCard';
import { supabase } from '../lib/supabaseClient';
import { 
  Calendar, 
  Star, 
  Snowflake, 
  Play,
  Quote,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  Mountain,
  CheckCircle,
  Mail,
  X
} from 'lucide-react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<boolean[]>([]);
  const [videoError, setVideoError] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Create ref for video section
  const videoSectionRef = useRef<HTMLElement>(null);

  // Parallax scroll effect
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -200]);
  const parallaxOpacity = useTransform(scrollY, [0, 300, 600], [1, 0.8, 0.3]);

  const heroImages = [
    '/1000090386.webp',
    '/broskii-social-preview.webp',
    '/1000090389.webp',
    '/1000090390.webp',
    '/1000090385.webp'
  ];

  // Initialize error tracking
  useEffect(() => {
    setImageErrors(new Array(heroImages.length).fill(false));
  }, []);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 1023px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-transition every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleImageError = (index: number) => {
    console.log(`Failed to load image ${index + 1}: ${heroImages[index]}`);
    setImageErrors(prev => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
  };

  const openFullScreenImage = (imageUrl: string) => {
    setFullScreenImage(imageUrl);
  };

  const closeFullScreenImage = () => {
    setFullScreenImage(null);
  };

  const testimonials = [
    {
      name: 'Harris J',
      text: "Skiing with the Broskiis – there's honestly no feeling like it. Flying through the mountains with brothers, just enjoying the moment – Alhamdulillah, it's something special. From the fresh snow to the vibes with the bros. Everyone needs to experience this. Trust me, you'll have the time of your life.",
      featured: true
    },
    {
      name: 'Amir Malik MGA',
      text: "At first, you're excited and nervous because you don't know what to expect. But that first morning — seeing the sunrise surrounded by the majesty of the mountains — it was awe-inspiring. You reflect, you contemplate, and you just think: SubhanAllah, how can there not be a Creator? I'd recommend it 100%. The brothers looked after us, guided us, and made it an unforgettable experience — something that stays with you for life.",
      featured: false
    },
    {
      name: 'Kamran Saleem',
      text: "The trip was really good — I genuinely enjoyed it. The brotherhood was amazing; met new people and reconnected with familiar faces. I'd definitely come again.",
      featured: false
    },
    {
      name: 'Waseem Iqbal',
      text: "Finally made it to the blue runs, This trip was the most amazing experience of my life. At 45 years old, I was uplifted by the company, the reminders, and the brotherhood. I'll definitely come again",
      featured: false
    },
    {
      name: 'Haroon Khan',
      text: "My first skiing trip — Alhamdulillah, it was amazing. From the incredible skiing to hanging out with the bros, everything was on point. The package was really good for beginners — with lessons, you get the hang of it within a couple of days. Definitely coming back, insha'Allah",
      featured: false
    },
    {
      name: 'Abdurrahman Jung',
      text: "Great week, amazing experience. Even if you don't know anyone, you'll feel like you've known everyone for years. Everyone's easy-going, generous, and welcoming. It's been a beautiful trip to come as a beginner.",
      featured: false
    }
  ];

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const openTestimonialModal = (testimonial: any) => {
    setSelectedTestimonial(testimonial);
  };

  const closeTestimonialModal = () => {
    setSelectedTestimonial(null);
  };

  // Function to scroll to video section
  const handleWatchOurStoryClick = () => {
    videoSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email: email.trim() }]);

      if (error) {
        console.error('Supabase error:', error);
        setMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' });
      } else {
        setMessage({ type: 'success', text: 'Successfully subscribed! Thank you for joining us.' });
        setEmail(''); // Clear the input
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upcoming trip data
  const upcomingTrip = {
    id: 'val-thorens-2026',
    title: 'SKI 3 VALLEYS',
    subtitle: 'Europe\'s Highest resort & the largest ski area in the World',
    image: '/1000088456.jpg',
    price: '£1200',
    dates: '10th - 17th January 2026',
    location: 'Val Thorens, French Alps',
    duration: '7 Days',
    groupSize: '40-60 Brothers',
    description: 'Join us for an epic week in Val Thorens, the highest ski resort in Europe and part of the world\'s largest ski area - Les 3 Vallées. Experience world-class skiing, luxury accommodation, and unforgettable brotherhood moments in the heart of the French Alps.',
    inclusions: [
      { text: 'Return flights with BA from LHR', highlight: true },
      { text: 'Ski pass (£370 Value)', highlight: true },
      { text: '4★ Luxury Hotel (L\'Oxalys)' },
      { text: 'Spa Facilities' },
      { text: 'Ski in/out access' },
      { text: 'Private Coach Transfer' }
    ],
    highlights: [
      'Europe\'s Highest Resort',
      'World\'s Largest Ski Area',
      'Luxury 4★ Hotel',
      'Ski-in/Ski-out',
      'Beginner Friendly'
    ],
    badge: 'Beginners Welcome!'
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeTestimonialModal();
      }
    };

    if (selectedTestimonial) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedTestimonial]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Image Carousel */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            y: parallaxY,
            opacity: parallaxOpacity,
            scale: useTransform(scrollY, [0, 1000], [1, 1.1])
          }}
        >
          <AnimatePresence>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {!imageErrors[currentSlide] ? (
                <img
                  src={heroImages[currentSlide]}
                  alt={`Ski adventure ${currentSlide + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(currentSlide)}
                  onLoad={() => console.log(`Successfully loaded image ${currentSlide + 1}: ${heroImages[currentSlide]}`)}
                />
              ) : (
                // Fallback gradient background if image fails
                <div className="w-full h-full bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Snowflake className="h-24 w-24 mx-auto mb-4 opacity-50" />
                    <p className="text-lg opacity-75">Loading mountain view...</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/30 ${
                index === currentSlide 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        
        {/* Enhanced Hero Text with Better Contrast */}
        <motion.div 
          className="relative z-10 text-center max-w-5xl mx-auto px-4"
          style={{
            y: useTransform(scrollY, [0, 500], [0, -100]),
            opacity: useTransform(scrollY, [0, 300], [1, 0])
          }}
        >
          <div className="space-y-8">
            {/* Main heading with text shadow and backdrop - Smaller text */}
            <div className="relative">
              <div className="absolute inset-0 bg-black/20 blur-3xl rounded-3xl"></div>
              <h1 className="relative text-4xl md:text-7xl font-serif font-black leading-tight tracking-tight">
                <span className="block text-white drop-shadow-2xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}>
                  Not Just a Trip
                </span>
                <span className="block text-primary-300 drop-shadow-2xl mt-2" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}>
                  A Journey
                </span>
              </h1>
            </div>

            {/* Description with enhanced readability - Smaller text */}
            <div className="relative">
              <div className="absolute inset-0 bg-black/15 blur-2xl rounded-2xl"></div>
              <p className="relative text-lg md:text-xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-medium" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)' }}>
                Join us for an unforgettable experience that blends adventure & faith.
              </p>
            </div>

            {/* CTA Buttons with enhanced styling - Made Book Now button smaller for mobile */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link
                to="/upcoming-trip"
                className="group relative bg-broskii-light-blue-500 hover:bg-broskii-light-blue-600 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-lg font-impact uppercase transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-2 border-2 border-broskii-light-blue-500 hover:border-broskii-light-blue-400 overflow-hidden"
              >
                {/* Animated background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="relative z-10">BOOK NOW</span>
              </Link>
              <button 
                onClick={handleWatchOurStoryClick}
                className="flex items-center space-x-3 text-white hover:text-primary-300 transition-all duration-300 group focus:outline-none focus:border-transparent active:border-transparent focus:shadow-none active:shadow-none focus:ring-0 active:ring-0"
              >
                <div className="relative bg-black/30 hover:bg-black/50 rounded-full p-3 sm:p-4 transition-all duration-300 border border-white/30 backdrop-blur-sm group-hover:border-white/50 group-hover:shadow-xl">
                  {/* Pulsing ring effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-0 group-hover:opacity-100"></div>
                  <Play className="h-5 w-5 sm:h-7 sm:w-7 ml-1" />
                </div>
                <span className="text-lg sm:text-xl font-semibold group-hover:scale-105 transition-transform duration-300" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>Watch Our Story</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-10 animate-float"
          style={{ y: useTransform(scrollY, [0, 500], [0, -150]) }}
        >
          <Snowflake className="h-8 w-8 text-white/30" />
        </motion.div>
        <motion.div 
          className="absolute top-40 right-20 animate-float" 
          style={{ 
            animationDelay: '2s',
            y: useTransform(scrollY, [0, 500], [0, -120])
          }}
        >
          <Snowflake className="h-6 w-6 text-white/20" />
        </motion.div>
        <motion.div 
          className="absolute bottom-40 left-20 animate-float" 
          style={{ 
            animationDelay: '4s',
            y: useTransform(scrollY, [0, 500], [0, -80])
          }}
        >
          <Snowflake className="h-10 w-10 text-white/25" />
        </motion.div>
      </section>

      {/* Upcoming Trips Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid container for desktop side-by-side layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Why Book With Us Section - Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0 }}
              viewport={{ once: true }}
              className="text-center lg:order-1"
            >
              <div className="bg-gray-100 rounded-2xl p-8 shadow-2xl border border-gray-200">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center gradient-text-primary"
                  style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}
                >
                  Why Book With Us?
                </motion.h3>
                
                <div className="space-y-4 mb-8">
                  {[
                    'Amazing Value – Top-tier experiences at unbeatable prices',
                    '7+ Years Experience – Trusted, tried, and tested by hundreds',
                    'Hassle-Free – We handle all the details, so you can just enjoy the ride',
                    'Ski-In/Ski-Out Accommodation – Quality stays right on the slopes',
                    'World-Class Resorts – Carefully selected to suit all levels',
                    'Beginner-Friendly – Optional lessons and equipment hire available — everything you need to get started',
                    'Dedicated Family Trips – Family-friendly experiences designed to inspire young skiers and snowboarders',
                    'Warm, Welcoming Vibe – Come solo or with friends – everyone feels at home'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3 text-left">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 leading-relaxed font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-xl text-primary-600 mb-6 leading-relaxed font-medium">
                    Ready to experience the mountains with us?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/upcoming-trip"
                     className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Book Now</span>
                    </Link>
                    <Link
                      to="/about"
                     className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next Adventure Section - Right Column */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center order-first lg:order-2"
            >
              <div className="bg-gray-100 rounded-2xl p-8 shadow-2xl border border-gray-200">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-serif font-bold mb-6 flex items-center justify-center space-x-3 gradient-text-primary"
                  style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}
                >
                  <Mountain className="h-12 w-12 md:h-16 md:w-16 text-primary-600" />
                  <span>Next Stop: Val Thorens, French Alps</span>
                </motion.h2>
                <p className="text-2xl text-primary-600 font-semibold mb-6 flex items-center justify-center space-x-3">
                  <Calendar className="h-8 w-8" />
                  <span>10–17 January 2026</span>
                </p>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
                  Ready for the ultimate week in the Alps? Val Thorens is calling — Europe's highest ski resort with endless terrain, breathtaking views, and nonstop vibes across Les 3 Vallées.
                </p>
                
                {/* Trip Card */}
                <div className="mt-8">
                  <UpcomingTripCard 
                    trip={upcomingTrip} 
                    isHomepage={true} 
                    nestedInCard={true}
                    onImageClick={isMobile ? openFullScreenImage : undefined}
                  />
                </div>
                
                {/* Text and Button below poster */}
                <div className="mt-8 text-center">
                  <p className="text-gray-800 mb-6 leading-relaxed font-medium">
                    Spaces are limited — hit the link below for everything you need to know.
                  </p>
                  <Link
                    to="/upcoming-trip"
                    className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                  >
                    <span>Upcoming Trips</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section ref={videoSectionRef} className="py-20 bg-gray-100 relative overflow-hidden">
        {/* Floating Snowflakes */}
        <div className="absolute inset-0 pointer-events-none">
          <Snowflake className="absolute top-20 left-1/4 h-6 w-6 text-gray-400/30 animate-float" />
          <Snowflake className="absolute top-1/3 right-1/4 h-8 w-8 text-gray-400/25 animate-float" style={{ animationDelay: '2s' }} />
          <Snowflake className="absolute bottom-1/3 left-1/3 h-5 w-5 text-gray-400/35 animate-float" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Mission Text */}
              <div className="text-gray-900 space-y-6 relative z-10">
                <h3 className="text-4xl font-serif font-bold mb-6 text-gray-900">Our Mission</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To bring as many Muslims as possible to the mountains to enjoy the awe of nature, 
                  connect with like-minded people, and experience something truly out of the ordinary.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Whether you're stepping into ski boots for the first time or carving down black diamonds with confidence, 
                  Broskii welcomes you. This isn't an exclusive club — it's an open invitation.
                </p>
                
                {/* Our Story Section */}
                <div className="mt-12 pt-8 border-t border-gray-300">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 group text-center border border-gray-300 hover:border-gray-400 shadow-xl hover:shadow-2xl transform hover:scale-105">
                    <h4 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-gray-900 transition-colors duration-300 mb-4">
                      It Started with One Trip
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-4 group-hover:text-gray-800 transition-colors duration-300">
                      A simple idea, a shared passion, and the mountains that brought it all together.
                    </p>
                    <div className="flex justify-center">
                      <Link
                        to="/about"
                        className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <span>Read Our Story</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Video */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-102 border border-broskii-dark-blue-400 group">
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-broskii-light-blue-500/20 via-transparent to-broskii-light-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  {!videoError ? (
                    <iframe
                      src="https://www.youtube.com/embed/4B4TGO_qZrU?vq=hd1080&hd=1&quality=hd1080"
                      title="Broskii - Our Story in Motion"
                      className="w-full aspect-[9/16] max-w-xs relative z-10"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      onError={() => setVideoError(true)}
                    />
                  ) : (
                    // Fallback if video doesn't load
                    <div className="w-full aspect-[9/16] max-w-xs bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center relative z-10">
                      <div className="text-center text-white">
                        <Play className="h-16 w-16 mx-auto mb-4 opacity-75" />
                        <h3 className="text-xl font-sans font-semibold mb-2">Watch Our Story</h3>
                        <p className="text-primary-200 mb-4">Experience the Broskii adventure</p>
                        <a
                          href="https://youtube.com/shorts/4B4TGO_qZrU?si=x8Of-RK54ZP9nPMo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Watch on YouTube</span>
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-broskii-light-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                </div>
              </div>
            </div>
            
            {/* Additional decorative text */}
            <p className="text-gray-700 mt-12 text-lg font-medium text-center relative z-10">
              Experience the thrill, the connection, and the moments that stay with you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 broskiis-heading-effect"
              style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}
            >
              Straight from the Broskiis
            </h2>
          </div>

          {/* Featured Testimonial */}
          <div className="mb-16">
            <div 
              className="group bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-6 md:p-8 lg:p-10 text-white relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-primary-500/20 hover:border-primary-400/40"
              onClick={() => openTestimonialModal(testimonials[0])}
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="absolute top-6 left-6 opacity-20">
                <Quote className="h-16 w-16 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="relative z-10">
                <p className="text-lg md:text-xl xl:text-lg leading-relaxed italic mb-6 font-medium group-hover:text-primary-100 transition-colors duration-300">
                  "{truncateText(testimonials[0].text, 200)}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-sans font-bold text-lg group-hover:text-primary-100 transition-colors duration-300">— {testimonials[0].name}</div>
                    </div>
                  </div>
                  <div className="text-primary-200 text-sm group-hover:text-primary-100 transition-colors duration-300 flex items-center space-x-1">
                    <span>Click to read full testimonial</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Snowflake className="h-32 w-32 group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </div>
          </div>

          {/* Horizontal Scrolling Testimonials Carousel */}
          <div className="relative">
            <div
              className="overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex space-x-6 w-max">
                {testimonials.slice(1).map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 w-80 flex-shrink-0 cursor-pointer transform hover:scale-105 hover:-translate-y-2"
                    onClick={() => openTestimonialModal(testimonial)}
                  >
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-200" style={{ transitionDelay: `${i * 50}ms` }} />
                      ))}
                    </div>
                    <p className="text-gray-700 group-hover:text-gray-900 mb-6 leading-relaxed italic line-clamp-4 transition-colors duration-300">
                      "{truncateText(testimonial.text, 120)}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-sans font-semibold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">— {testimonial.name}</div>
                        </div>
                      </div>
                      <div className="text-gray-400 group-hover:text-primary-500 text-xs transition-colors duration-300 flex items-center space-x-1">
                        <span>Click to read more</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Hint */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <ChevronLeft className="h-4 w-4" />
                <span>Scroll to see more testimonials</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeTestimonialModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-2xl font-sans font-bold text-gray-900">{selectedTestimonial.name}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeTestimonialModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="h-12 w-12 text-primary-200 mb-4" />
                  <blockquote className="text-lg text-gray-700 leading-relaxed italic mb-6">
                    "{selectedTestimonial.text}"
                  </blockquote>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div></div>
                  <Link
                    to="/booking"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors"
                    onClick={closeTestimonialModal}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
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
      </AnimatePresence>

      {/* Newsletter Section */}
      <section className="py-8 lg:py-12 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-white/15 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/25 rounded-full"></div>
          <div className="absolute bottom-40 right-1/3 w-20 h-20 border border-white/20 rounded-full"></div>
        </div>
        
        {/* Floating Snowflakes */}
        <div className="absolute inset-0 pointer-events-none">
          <Snowflake className="absolute top-20 left-1/4 h-6 w-6 text-white/20 animate-float" />
          <Snowflake className="absolute top-1/3 right-1/4 h-8 w-8 text-white/15 animate-float" style={{ animationDelay: '2s' }} />
          <Snowflake className="absolute bottom-1/3 left-1/3 h-5 w-5 text-white/25 animate-float" style={{ animationDelay: '4s' }} />
          <Snowflake className="absolute top-1/2 left-1/6 h-4 w-4 text-white/30 animate-float" style={{ animationDelay: '1s' }} />
          <Snowflake className="absolute bottom-1/4 right-1/6 h-7 w-7 text-white/18 animate-float" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Mail className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl font-serif font-bold text-white">
                  Stay in the Loop
                </h2>
              </div>
              <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
              <p className="text-lg lg:text-xl xl:text-base text-primary-100 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
                Be the first to hear about upcoming ski trips and exclusive Broskii updates.
              </p>
              <p className="text-base lg:text-lg xl:text-base text-primary-200 font-medium">
                Subscribe to our mailing list — no spam, just powder ❄️
              </p>
            </div>

            <div className="max-w-md lg:max-w-lg mx-auto relative z-10">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 px-4 lg:px-6 py-3 lg:py-4 text-base lg:text-lg xl:text-base border-2 border-white/30 rounded-full focus:ring-4 focus:ring-white/50 focus:border-white shadow-xl hover:shadow-2xl focus:shadow-2xl transition-all duration-300 bg-white/15 hover:bg-white/25 focus:bg-white/25 text-white placeholder-white/70 backdrop-blur-md focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative bg-white hover:bg-gray-100 text-primary-700 px-5 lg:px-6 py-2 lg:py-3 text-sm lg:text-base xl:text-sm font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden"
                >
                  {/* Animated background shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>{isSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
                    <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </form>
              
              {/* Success/Error Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3 rounded-lg text-center ${
                    message.type === 'success' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}
                >
                  {message.text}
                </motion.div>
              )}
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center space-x-4 lg:space-x-6 mt-4 lg:mt-6 text-primary-200 text-xs lg:text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span>No spam</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span>Unsubscribe anytime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span>Exclusive updates</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;