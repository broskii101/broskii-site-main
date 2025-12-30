import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Helmet } from 'react-helmet-async';
import {
  Calendar,
  Star,
  Play,
  Home,
  Globe,
  Users,
  Heart,
  Quote,
  ExternalLink,
  ArrowRight,
  Mountain,
  CheckCircle,
  X,
} from 'lucide-react';

interface Testimonial {
  name: string;
  text: string;
  featured?: boolean;
}

/* ===================== ON THE MOUNTAIN SECTION (SANDBOX MATCH + PREMIUM MOTION) ===================== */
function OnTheMountainSection() {
  const posterRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  

  useEffect(() => {
    const posterEl = posterRef.current;
    const imageEl = imageRef.current;
  
    if (!posterEl || !imageEl) return;
  
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
    // Initial fade state
    if (!reduceMotion) {
      posterEl.style.opacity = "0";
      
    }
  
    let hasRevealed = false;
  
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
  
        if (entry.isIntersecting && !hasRevealed) {
          hasRevealed = true;
  
          if (!reduceMotion) {
            posterEl.style.transition = "opacity 900ms ease-out";
posterEl.style.opacity = "1";

          } else {
            posterEl.style.opacity = "1";
            
          }
        }
      },
      { threshold: 0.25 }
    );
  
    observer.observe(posterEl);
  
    let ticking = false;
    let lastY = 9999;

  
    const updateParallax = () => {
      ticking = false;
    
      if (reduceMotion) {
        imageEl.style.transform = "translateY(0px)";
        return;
      }
    
      const rect = posterEl.getBoundingClientRect();
      const vh = window.innerHeight || 0;
    
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
    
      // Premium but stable: quantized + no micro-updates at rest
      const targetY = Math.round((clamped - 0.5) * 28);

// Subtle scale settle for premium depth (safe on mobile)
const scale = 1.03 - clamped * 0.03;

if (targetY === lastY) return;
lastY = targetY;

imageEl.style.transform = `translateY(${targetY}px) scale(${scale.toFixed(3)})`;

    };
    
  
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateParallax);
    };
  
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  
    updateParallax();
  
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  

  return (
    <section className="bg-[#f7fbff]">
      <div ref={posterRef} className="relative w-full max-w-[420px] mx-auto">
        {/* Poster */}
        <div className="relative w-full h-[500px] overflow-hidden">
          {/* Image */}
          <div
  
  ref={imageRef}
className="absolute inset-0 will-change-transform transition-transform duration-[1200ms] ease-out"

>
 
<img
  src="https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1600/v1766874825/broskii-ski-trip-group-evening.webp_kkhnxt.jpg"
  alt="Group of people standing together outdoors in falling snow after a day of skiing."
  loading="lazy"
  className="w-full h-full object-cover object-center"
/>


</div>


          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/45" />

          {/* Headline (keep your tuned version) */}
       
          <h2
  className="
    absolute top-20 left-1/2 -translate-x-1/2
    text-center text-white
    font-serif font-semibold
    text-[30px]
    leading-[1.15]
    px-6
    drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)]
  "
>
  <span className="block whitespace-nowrap">
    Nothing brings people
  </span>
  <span className="block whitespace-nowrap">
    together like the mountains.
  </span>
</h2>





          {/* CTA (your “View Trip Details / Read Our Story” style) */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2">
          <Link
  to="/upcoming-trip"
  className="
  whitespace-nowrap
  inline-flex items-center gap-3
  px-7 py-3.5
  rounded-full
  bg-[#0092D1]/80 backdrop-blur-md
  text-white font-semibold text-base
  shadow-[0_8px_30px_rgba(0,146,209,0.35)]
  transition-all duration-200
  hover:bg-[#0092D1]
  hover:shadow-[0_10px_40px_rgba(0,146,209,0.45)]
  active:scale-[0.97]
  "
>
Book Now
<Calendar className="h-4 w-4" />

</Link>



          </div>
        </div>
      </div>
    </section>
  );
}










const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Newsletter
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const videoSectionRef = useRef<HTMLDivElement | null>(null);

    // HERO: scroll-based cinematic motion (mobile-safe)
    const { scrollY } = useScroll();

    // Background: subtle parallax + slow zoom
    const heroBgY = useTransform(scrollY, [0, 700], [0, -40]);
    const heroBgScale = useTransform(scrollY, [0, 1000], [1, 1.08]);
  
    // Text: float up + fade slightly as you scroll
    const heroTextY = useTransform(scrollY, [0, 450], [0, -80]);
    const heroTextOpacity = useTransform(scrollY, [0, 260], [1, 0]);
  

    const heroImages = [
      {
        src: "https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1600/v1766261594/broskii-bro-mountain-view-alps_czxoyo.webp",
        alt: "A bro sitting on the snow overlooking a mountain resort in the Alps",
      },
      {
        src: "https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1600/v1766943421/broskii-skiing-padel-rackets-alps_h5dyl1.jpg",
alt: "Broskii skier descending an Alpine slope while holding padel tennis rackets",

      },
      {
        src: "https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1600/v1766261597/broskii-snow-trike-astronaut-suit-alps_xw9pjb.webp",
        alt: "A bro riding a snow trike in the Alps while wearing an astronaut suit",
      },
      {
        src: "https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1600/v1766261594/broskii-snowboarder-group-alps_v5duwe.webp",
        alt: "A snowboarder in green posing with the Broskii group on the slopes in the Alps",
      },
      {
        src: "https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1600/v1766261595/broskii-skiing-action-shot-alps_xlr1lc.webp",
        alt: "A bro skiing downhill on a groomed slope in the Alps",
      },
    ];
    

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % heroImages.length),
      4500
    );
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const wrapper = videoSectionRef.current; // observe wrapper
    const iframe = iframeRef.current; // send commands to iframe

    if (!wrapper || !iframe) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isVisible = entry.isIntersecting;

        const message = JSON.stringify({
          event: 'command',
          func: isVisible ? 'playVideo' : 'pauseVideo',
          args: [],
        });

        iframe.contentWindow?.postMessage(message, '*');
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(wrapper); // IMPORTANT: observing wrapper, not iframe

    return () => observer.disconnect();
  }, []);

  const handleVideoClick = () => {
    if (!iframeRef.current) return;

    const unmute = JSON.stringify({
      event: 'command',
      func: 'unMute',
      args: [],
    });

    const play = JSON.stringify({
      event: 'command',
      func: 'playVideo',
      args: [],
    });

    iframeRef.current.contentWindow?.postMessage(unmute, '*');
    iframeRef.current.contentWindow?.postMessage(play, '*');
  };

  const testimonials: Testimonial[] = [
    {
      name: 'Harris J',
      featured: true,
      text: "Skiing with the Broskiis — there’s honestly no feeling like it. Flying through the mountains with brothers, soaking in the views, laughing, learning, and just enjoying the moment — Alhamdulillah, it’s something truly special. Every day felt like a reset. The fresh snow, the crisp air, the peaceful mornings, the evening reminders, the vibes with the bros — it all came together in a way that’s hard to describe. You feel connected, grounded, and uplifted at the same time. I can say with full confidence: everyone needs to experience this. It’s more than a trip — it’s something that stays with you. Trust me, you’ll have the time of your life.",
    },
    {
      name: 'Amir Malik MGA',
      text: "At first, you're excited and nervous because you don’t know what to expect. But that first morning — stepping outside and seeing the sunrise hit the mountains — SubhanAllah, it was awe-inspiring. It makes you reflect deeply. You look around at this huge display of Allah’s creation and you just think, How can anyone deny a Creator? The brothers looked after us, supported us, guided us, and made sure no one was left behind. The atmosphere was warm and sincere — it genuinely felt like family. I’d recommend it 100%. It’s an experience that stays with you for life.",
    },
    {
      name: 'Kamran Saleem',
      text: "The trip was really good — I genuinely enjoyed every part of it. The brotherhood was amazing; I met new people and reconnected with familiar faces, and the whole week felt effortless and uplifting. There’s something unique about being in the mountains with like-minded brothers — you learn, you laugh, and you grow without even realising it. I’d definitely come again. It’s the kind of experience that pulls you back.",
    },
    {
      name: 'Waseem Iqbal',
      text: "Finally made it to the blue runs! And honestly, this trip was the most amazing experience of my life. At 45 years old, I didn’t expect to feel this energised, motivated, and uplifted. The company, the reminders, the atmosphere, the brotherhood — it all came together beautifully. I was pushed, supported, and encouraged in the best possible way. I’ll definitely come again, in shaa Allah. Age doesn’t limit you here — if anything, it inspires you.",
    },
    {
      name: 'Haroon Khan',
      text: "My first skiing trip — Alhamdulillah, it was amazing. From the incredible slopes to hanging out with the bros, everything was on point. The package is perfect for beginners. With lessons, you get the hang of it within a couple of days, and by the end of the trip you’re doing things you never thought you’d be able to do. The brotherhood, the conversations, the laughs — it all added to the experience. Definitely coming back, in shaa Allah.",
    },
    {
      name: 'Abdurrahman Jung',
      text: "Great week, amazing experience. Even if you don’t know anyone before you come, you’ll feel like you’ve known everyone for years. That’s the beauty of Broskii — the brothers are easy-going, generous, and truly welcoming. It was a beautiful trip to come as a beginner. I learned at my own pace, never felt rushed, and always felt supported. Would absolutely recommend it for anyone looking for adventure, growth, and sincere brotherhood.",
    },
  ];

  const truncateText = (text: string, maxLength: number) =>
    text.length <= maxLength ? text : text.substring(0, maxLength) + '…';

  const upcomingTrip = {
    id: 'val-thorens 2026',
    title: 'SKI 3 VALLEYS',
    subtitle: 'High-altitude slopes and huge terrain',
    image: '/1000088456.jpg',
    price: '£1200',
    dates: '10–17 January 2026',
    location: 'Val Thorens, France',
    duration: '7 days',
    groupSize: 'For solo travellers, friends and families',
    description:
      'A full week of skiing, snowboarding and slow moments off the mountain – surrounded by Muslim brothers and families.',
    inclusions: [
      { text: 'Return flights from LHR', highlight: true },
      { text: 'Lift pass included', highlight: true },
      { text: '4★ accommodation' },
      { text: 'Spa facilities' },
      { text: 'Ski-in/ski-out access' },
      { text: 'Private coach transfers' },
    ],
    highlights: [
      'Beginner & intermediate friendly',
      'Big terrain and big views',
      'Time on the mountain and time to switch off',
      'Atmosphere that feels like you’ve always been part of it',
    ],
    badge: 'Beginners welcome',
  };

  const primaryButtonClasses =
    'inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-sm md:text-base font-semibold bg-[#0092D1] text-white shadow-sm hover:shadow-md transition-all duration-300';

  const secondaryButtonClasses =
    'inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-sm md:text-base font-semibold border border-gray-300 bg-white text-gray-900 shadow-sm hover:shadow-md transition-all duration-300';

    const heroPrimaryButtonClasses =
  'inline-flex items-center justify-center space-x-3 ' +
  'px-8 py-4 sm:px-10 sm:py-5 ' +
  'text-base sm:text-xl font-semibold ' +
  'rounded-full ' +
  'bg-broskii-light-blue-500/80 backdrop-blur-sm text-black ' +
  'hover:bg-broskii-light-blue-500 ' +
  'transition-colors duration-300 ease-out';






  return (
    <div className="overflow-hidden bg-white">

<Helmet>
  <title>
    Muslim Ski Holidays | Muslim Ski Trips Worldwide – Broskii
  </title>

  <meta
    name="description"
    content="Premium ski trips for Muslims — a different kind of ski experience rooted in faith, brotherhood and shared adventure across the mountains of the world."
  />

  <link rel="canonical" href="https://broskii.com/" />
</Helmet>


      
{/* HERO */}
<section className="relative h-[85vh] min-h-[550px] flex items-center justify-center overflow-hidden bg-black">

  {/* Background Carousel */}
  <div className="absolute inset-0">
    <motion.div
      className="absolute inset-0"
      style={{ y: heroBgY, scale: heroBgScale }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentSlide].src}
            alt={heroImages[currentSlide].alt}
            className="w-full h-full object-cover"
          />
          {/* IMPORTANT: no global overlay (matches old site) */}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  </div>

  
{/* Eyebrow — stronger, editorial, 2 lines max */}
<div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-20 px-4 text-center pointer-events-none">
  <p
    className="
      text-[11px] sm:text-base
      tracking-[0.18em] sm:tracking-[0.22em]
      uppercase
      text-white
      font-semibold
    "
    style={{
      textShadow: '0 3px 12px rgba(0,0,0,0.75), 0 1px 4px rgba(0,0,0,0.6)',
    }}
  >
    <span className="block whitespace-nowrap">
      Muslim ski &amp; snowboarding
    </span>
    <span className="block whitespace-nowrap">
      trips worldwide
    </span>
  </p>
</div>



  {/* Hero Content */}
  <motion.div
    className="relative z-10 text-center max-w-5xl mx-auto px-4"
    style={{ y: heroTextY, opacity: heroTextOpacity }}
  >
    {/* This spacing rhythm is a major part of the old site's readability */}
    <div className="space-y-8">

      {/* Headline — replicate old site's mechanism */}
      <div className="relative">
        {/* Old-site local blurred backdrop behind headline */}
        <div className="absolute inset-0 bg-black/20 blur-3xl rounded-3xl" />

        <h1 className="relative font-serif font-black leading-tight tracking-tight text-[38px] sm:text-6xl md:text-7xl">

          <span
            className="block text-white drop-shadow-2xl"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}
          >
            Not just a trip
          </span>

          <span
            className="block mt-2 drop-shadow-2xl text-broskii-light-blue-500"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}
          >
            A Journey
          </span>
        </h1>
      </div>

      {/* Subtext — replicate old site's mechanism */}
      <div className="relative">
        {/* Old-site local blurred backdrop behind subtext */}
        <div className="absolute inset-0 bg-black/15 blur-2xl rounded-2xl" />
        <p
          className="relative text-lg sm:text-xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-medium"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)' }}
        >
          Join us for an unforgettable experience that blends adventure &amp; faith.
        </p>
      </div>

      {/* CTA row — DO NOT TOUCH styles, only keep original spacing intent */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-2">
        <Link to="/upcoming-trip" className={heroPrimaryButtonClasses}>
          <Calendar className="h-5 w-5" />
          <span>Book Now</span>
        </Link>

        <button
          onClick={() =>
            videoSectionRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
          className="flex items-center space-x-3 text-white hover:text-broskii-light-blue-500 transition-colors"
        >
          <div className="bg-white/10 hover:bg-white/20 rounded-full p-3 sm:p-4 border border-white/30 backdrop-blur-sm">
            <Play className="h-5 w-5 sm:h-7 sm:w-7" />
          </div>

          <span className="text-lg sm:text-2xl font-semibold">
            Watch our story
          </span>
        </button>
      </div>

    </div>
  </motion.div>
</section>



        







      
{/* ===================== NEXT TRIP SECTION ===================== */}
<section className="
  relative 
  pt-14 pb-16 
  sm:pt-20 sm:pb-20
  bg-gradient-to-b 
  from-[#cfe4f0] 
  via-white 
  to-[#cfe4f0]
">


  <div className="max-w-6xl mx-auto px-4 sm:px-6">

    {/* LABEL */}
    <p className="
  text-center
  text-3xl
  sm:text-4xl md:text-5xl
  uppercase
  tracking-[0.12em]
  font-bold
  text-[#0092D1]
  mb-5
">
  NEXT STOP:
</p>


    {/* HEADER + DATE */}
    <div className="text-center mb-8">
    <h2 className="text-[26px] sm:text-3xl md:text-4xl font-serif font-semibold leading-tight text-gray-900 mb-2">

        Tignes, French Alps
      </h2>

      <p className="
  text-lg sm:text-2xl md:text-3xl
  font-semibold
  text-[#0092D1]
  tracking-wide
  font-sans
  mt-1
">


  APRIL 11–18, 2026
</p>


<div className="w-16 sm:w-20 h-[2px] bg-[#0092D1] mt-4 mx-auto" />

    </div>

    {/* SUBTEXT */}
    <p className="
  text-[17px] sm:text-[19px] md:text-[21px]
  text-gray-700
  leading-[1.7]
  text-center
  max-w-[36rem]
  mx-auto
  mb-8 sm:mb-10
">
  Part of a 300km alpine playground built for real mountain days — wide pistes, 
  breathtaking views and an atmosphere made for switching off and reconnecting.
</p>


    {/* POSTER (smaller, rounded, shadow) */}
    <div
      className="
        mx-auto cursor-pointer 
        max-w-[280px] sm:max-w-[410px]
        rounded-3xl overflow-hidden 
        shadow-xl border border-white/60
      "
      onClick={() =>
        setFullScreenImage(
          'https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/v1766871242/broskii-tignes-april-ski-trip-poster.JPG_mu5ffe.jpg'   
        )
      }
    >
      <img
        src='https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/v1766871242/broskii-tignes-april-ski-trip-poster.JPG_mu5ffe.jpg'   
        alt="Broskii poster promoting an April ski trip to Tignes, part of the Tignes–Val d’Isère ski area in the French Alps.
        "
        className="w-full h-auto"
      />
    </div>

    {/* CTA */}
    <div className="flex justify-center mt-8 sm:mt-10">

      <Link
        to="/upcoming-trip"
        className="
  rounded-full
  px-8 py-4
  sm:px-10 sm:py-5
  bg-[#0092D1] text-white
  text-base sm:text-xl
  font-semibold
  flex items-center gap-3
  transition-transform duration-200
  hover:scale-[1.04] active:scale-[0.96]
  shadow-md
"


      >
        <span>View Trip Details</span>
        <ArrowRight className="h-6 w-6" />
      </Link>
    </div>

  </div>
</section>







      <>

           {/* VISION */}
           <section className="py-12 sm:py-16 bg-[#f7fbff]">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
            className="space-y-10"
          >

            {/* HEADER BLOCK */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } }
              }}
              className="text-center text-gray-900"
            >
              <p className="text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.1em] font-bold text-[#0092D1] mb-3">
  Our Vision
</p>


<h2 className="text-[26px] sm:text-3xl md:text-4xl font-serif font-semibold leading-tight">

                Breaking barriers. Building belonging.
              </h2>

              <div className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-[#0092D1] to-[#00A8E8] mt-3 mx-auto" />

            </motion.div>

            {/* BODY TEXT */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } }
              }}
              className="text-base sm:text-xl md:text-2xl text-gray-700 leading-relaxed text-center max-w-[36rem] mx-auto"

            >
              We make skiing and winter travel accessible to people who never thought it was possible.
              No barriers. No exclusivity. Just unforgettable experiences in the mountains.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } }
              }}
              className="flex justify-center"
            >
              <Link
  to="/about"
  className="rounded-full px-6 py-4 sm:px-8 sm:py-5
             bg-[#0092D1] text-white text-base sm:text-xl font-semibold
             flex items-center gap-3 transition-transform duration-200
             hover:scale-[1.04] active:scale-[0.96] hover:bg-[#007bb2]"
>

                <span>Read our story</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* VIDEO */}
      <div
  ref={videoSectionRef}
  className="flex justify-center lg:justify-end px-4 sm:px-0 mt-10 mb-10 sm:mt-14 sm:mb-14"
>


<div className="
  bg-white/80
  backdrop-blur-md
  rounded-2xl
  overflow-hidden
  shadow-[0_20px_60px_rgba(0,0,0,0.18)]
  border border-gray-200/60
  w-full
  max-w-[360px]
  sm:max-w-md
">




          {!videoError ? (
            <iframe
              ref={iframeRef}
              onClick={handleVideoClick}
              src="https://www.youtube.com/embed/4B4TGO_qZrU?vq=hd1080&enablejsapi=1&mute=1"
              title="Broskii - Muslim ski & snowboarding trips"
              className="w-full aspect-[9/16] min-h-[380px] sm:min-h-[420px]"

              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              onError={() => setVideoError(true)}
            />
          ) : (
            <div className="w-full aspect-[9/16] bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-xl font-semibold mb-2">Watch our story</h3>

                <a
                  href="https://youtube.com/shorts/4B4TGO_qZrU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Watch on YouTube</span>
                </a>

              </div>
            </div>
          )}

        </div>
      </div>

</>   {/* ← CLOSE THE FRAGMENT HERE — CORRECT PLACEMENT */}

{/* ===================== THE BROSKII EXPERIENCE ===================== */}


      
{/* ===================== THE BROSKII EXPERIENCE ===================== */}
<section className="py-12 sm:py-16 bg-gradient-to-b from-[#F3FAFF] via-white to-white overflow-hidden">

  {/* HEADER */}
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-gray-900">
      Why Book With Broskii?
    </h2>

    {/* Divider (kept for homepage consistency) */}
    <div className="w-16 sm:w-24 h-[3px] bg-gradient-to-r from-[#0092D1] via-[#00A8E8] to-[#0092D1] mx-auto rounded-full mt-6" />
  </div>

  {/* BENEFITS LIST */} 
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

    {[
      {
        title: "8+ Years Experience",
        desc: "Trusted, tried, and tested by hundreds",
        Icon: Mountain,
      },
      {
        title: "Hassle-Free",
        desc: "We handle all the details, so you can just enjoy the ride",
        Icon: CheckCircle,
      },
      {
        title: "Amazing Value",
        desc: "Top-tier experiences at unbeatable prices",
        Icon: Star,
      },
      {
        title: "World-Class Resorts",
        desc: "Carefully selected to suit all levels",
        Icon: Globe,
      },
      {
        title: "Ski-In / Ski-Out Accommodation",
        desc: "Quality stays right on the slopes",
        Icon: Home,
      },
      {
        title: "Beginner-Friendly",
        desc: "Optional lessons and equipment hire available — everything you need to get started",
        Icon: CheckCircle,
      },
      {
        title: "Dedicated Family Trips",
        desc: "Family-friendly experiences designed to inspire young skiers and snowboarders",
        Icon: Users,
      },
      {
        title: "Warm, Welcoming Vibe",
        desc: "Come solo or with friends — everyone feels at home",
        Icon: Heart,
      },
    ].map((item, index) => (
      <div
        key={index}
        className="flex items-start gap-5 sm:gap-6"
      >
        <item.Icon
          className="h-7 w-7 text-[#0092D1] mt-1 flex-shrink-0"
          strokeWidth={2.1}
        />

        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            {item.title}
          </h3>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl">
            {item.desc}
          </p>
        </div>
      </div>
    ))}

  </div>
</section>







      {/* ON THE MOUNTAIN SECTION (PARALLAX) */}
      <OnTheMountainSection />

      {/* ===================== TESTIMONIALS SECTION ===================== */}
      <section className="py-14 md:py-16 bg-[#eaf4ff] relative overflow-hidden">

      <div className="relative max-w-6xl mx-auto px-4">

      <div className="text-center mb-14 md:mb-16">

      <p className="text-3xl sm:text-4xl md:text-4xl tracking-[0.12em] uppercase font-bold text-[#0092D1]">

    Testimonials
  </p>

  <h2 className="text-2xl sm:text-3xl md:text-3xl font-serif font-semibold text-gray-900 mt-4">

    Straight from the Broskiis
  </h2>

  <div className="w-24 h-[4px] bg-gradient-to-r from-[#0092D1] via-[#00A8E8] to-[#0092D1] mx-auto mt-6 rounded-full" />

  
</div>



          {/* FEATURED TESTIMONIAL — NO FLICKER */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ willChange: 'opacity' }}
            className="mb-16 md:mb-20"

          >
            <div
              className="
              rounded-3xl p-6 md:p-7 cursor-pointer relative
              backdrop-blur-xl 
              bg-gradient-to-br from-[#d6edfa]/70 via-white/40 to-white/10
              border border-[#0092D1]/30 ring-1 ring-[#0092D1]/10
              shadow-[0_10px_34px_rgba(0,146,209,0.22)]
              hover:shadow-[0_16px_48px_rgba(0,146,209,0.28)]
              transition-all
              "
              onClick={() => setSelectedTestimonial(testimonials[0])}
            >
              <div className="absolute top-10 left-10 opacity-10">
                <Quote className="h-24 w-24" />
              </div>

              <p className="text-xl md:text-2xl leading-relaxed italic text-gray-800 mb-8">

                “{truncateText(testimonials[0].text, 180)}”
              </p>

              <div className="flex items-center justify-between">
              <div className="font-semibold text-gray-900 text-base md:text-lg">

                   {testimonials[0].name}
                </div>
                <div className="text-base md:text-lg text-[#0092D1] flex items-center space-x-1 font-medium">
                  <span>Tap to read full</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* SCROLLER — SMALL CARDS */}
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex space-x-10 w-max">
              {testimonials.slice(1).map((t) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ willChange: 'opacity' }}
                >
                  <div
                    className="
                    rounded-3xl p-6 w-64 md:w-72 lg:w-[20rem]


                      flex-shrink-0 cursor-pointer
                      backdrop-blur-xl 
                      bg-gradient-to-br from-[#d6edfa]/60 via-white/40 to-white/10
                      border border-[#0092D1]/25 ring-1 ring-[#0092D1]/10
                      shadow-[0_8px_30px_rgba(0,146,209,0.18)]
                      hover:shadow-[0_14px_45px_rgba(0,146,209,0.28)]
                      hover:-translate-y-1
                      transition-all
                    "
                    onClick={() => setSelectedTestimonial(t)}
                  >
                    <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed italic line-clamp-4">

                      “{truncateText(t.text, 160)}”
                    </p>

                    <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900 text-base md:text-lg">

                        — {t.name}
                      </div>
                      <div className="text-sm md:text-base text-[#0092D1] flex items-center space-x-1">
                        <span>Read more</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============== TESTIMONIAL MODAL (unchanged) =============== */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {selectedTestimonial.name}
                  </h3>
                  <button
                    onClick={() => setSelectedTestimonial(null)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <div className="relative">
                  <Quote className="h-10 w-10 text-gray-200 mb-4" />
                  <blockquote className="text-lg text-gray-700 leading-relaxed italic mb-6">
                    “{selectedTestimonial.text}”
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== NEWSLETTER ===================== */}
      <section className="relative py-10 md:py-12 bg-gradient-to-b from-white via-white to-[#eef7ff] overflow-hidden">



        {/* Smooth transition */}
        <div className="absolute -top-14 left-0 w-full h-24 bg-gradient-to-b from-[#eaf4ff] via-white to-white pointer-events-none"></div>


        <div className="relative max-w-4xl mx-auto px-4">
          {/* HEADER */}
          <div className="text-center space-y-3 mb-9 md:mb-12">

            {/* Stay Updated — SAME SIZE AS TESTIMONIAL TOP LABEL */}
            <p className="text-3xl sm:text-4xl md:text-4xl tracking-[0.12em] uppercase font-bold text-[#0092D1]">


              Stay Updated
            </p>

            {/* Be Part… — SAME SIZE AS TESTIMONIAL SUBHEADER */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-gray-900">


              Be part of the next chapter
            </h2>

            <div className="w-24 h-[3px] bg-gradient-to-r from-[#0092D1] via-[#00A8E8] to-[#0092D1] mx-auto rounded-full" />

            {/* Join a growing… — SAME SIZE AS TESTIMONIAL BODY TEXT */}
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">

              Be the first to hear
              about new dates, destinations and exclusive Broskii announcements.
            </p>
          </div>

          {/* SIGNUP CARD */}
          
          <div className="max-w-lg mx-auto pt-1">


            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!email.trim()) {
                  setMessage({ type: 'error', text: 'Please enter a valid email.' });
                  return;
                }
                setIsSubmitting(true);
                try {
                  const { error } = await supabase.from('subscribers').insert([{ email }]);
                  if (error) throw error;
                  setMessage({
                    type: 'success',
                    text: 'Subscribed — see you on the next drop.',
                  });
                  setEmail('');
                } catch {
                  setMessage({
                    type: 'error',
                    text: 'Something went wrong. Try again.',
                  });
                }
                setIsSubmitting(false);
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              {/* Input */}
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="
                  flex-1 px-4 py-3 
                  rounded-full 
                  border border-[#0092D1]/30 
                  bg-white/90 
                  text-gray-900 
                  placeholder-gray-400 
                  focus:ring-4 focus:ring-[#0092D1]/20 
                  focus:border-[#0092D1] 
                  shadow-sm
                  text-base sm:text-lg
                "
              />

              {/* CTA BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  min-w-[160px]
                  px-6 py-3.5 
                  rounded-full 
                  bg-[#0092D1]/90 text-white 
                  shadow-md hover:shadow-lg 
                  transition-all duration-300
                  flex items-center justify-center 
                  space-x-3 
                  hover:bg-[#0092D1]
                  hover:scale-[1.04]
                  active:scale-[0.96]
                  text-base sm:text-lg
                "
              >
                <span>{isSubmitting ? 'Subscribing…' : 'Subscribe'}</span>
                <ArrowRight className="h-6 w-6" />
              </button>
            </form>

            {message && (
              <div
                className={`mt-4 p-3 rounded-lg text-center text-sm ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message.text}
              </div>
            )}
          </div>
        </div>
      </section>

{/* FULLSCREEN IMAGE MODAL */}
<AnimatePresence>
  {fullScreenImage && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4"
      onClick={() => setFullScreenImage(null)}
    >
      <motion.img
        src={fullScreenImage}
        alt="Full Screen"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="max-h-[90vh] w-auto rounded-xl shadow-2xl"
      />

      {/* Close Button */}
      <button
        onClick={() => setFullScreenImage(null)}
        className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/30 p-3 rounded-full"
      >
        <X className="h-6 w-6" />
      </button>
    </motion.div>
  )}
</AnimatePresence>


    </div>
  );
};

export default HomePage;
