import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mountain, 
  Users, 
  Heart, 
  Star,
  Calendar,
  Target,
  Zap,
  Globe,
  ArrowRight,
  Quote,
  Snowflake,
  Award,
  Camera,
  MessageCircle
} from 'lucide-react';

const AboutPage = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  const imageY = useTransform(scrollY, [0, 700], [0, -150]);
  const imageScale = useTransform(scrollY, [0, 700], [1, 1.05]);

  const textY = useTransform(scrollY, [0, 700], [0, -50]);
  const textOpacity = useTransform(scrollY, [0, 300, 600], [1, 1, 0]);

  const snowflakeY = useTransform(scrollY, [0, 700], [0, -200]);

  const founders = [
    {
      name: 'Ali Shaikh',
      role: 'Co-Founder', 
      image: '/Screenshot_20250710_212007_Gallery.webp'
    },
    {
      name: 'Abdullah Green',
      role: 'Co-Founder',
      image: '/Screenshot_20250710_211429_Gallery.webp'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Purpose with Powder',
      description: 'Yes, it\'s about skiing — but it\'s also about disconnecting from the noise, being present, and soaking in the beauty of Allah\'s creation. The views are beautiful, but the peace hits harder.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Users,
      title: 'Everyone\'s Welcome',
      description: 'Come with your Broskiis or come solo — either way, you\'ll feel part of the brotherhood. No cliques, no egos — just good people sharing good moments.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Target,
      title: 'Progress Over Perfection',
      description: 'Never skied before? No stress. We\'re all learning something out here — on the slopes and in life. It\'s about pushing yourself a bit, having a laugh, and enjoying the ride.',
      color: 'bg-green-100 text-green-600'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative">
        <motion.div
          className="relative"
          style={{ y: imageY, scale: imageScale }}
        >
          <img 
            src="/IMG-20250116-WA0034.jpg"
            alt="Two Broskiis enjoying mountain views"
            className="w-full h-auto min-h-[70vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30"></div>
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              className="text-center text-white"
              style={{ y: textY, opacity: textOpacity }}
            >
              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-tight">
                <span className="block" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                  About Us
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-medium" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
                Broskii.. we're not just hitting the slopes — we're building something bigger.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute top-20 left-10 animate-float"
          style={{ y: snowflakeY }}
        >
          <Snowflake className="h-8 w-8 text-white/20" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 animate-float"
          style={{ animationDelay: '2s', y: snowflakeY }}
        >
          <Snowflake className="h-6 w-6 text-white/30" />
        </motion.div>
      </section>

      {/* Origin Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="w-20 h-1 bg-primary-600 mb-8"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  In 2018, what started as organizing a ski trip for a small group of friends looking to try something different has grown into <strong>Broskii</strong>: a thriving brotherhood bringing Muslim brothers and families to the mountains.
                </p>
                <p>
                  Our backgrounds run deep in the thrill-seeking world — from mountain biking to racing superbikes on track days. But that first ski trip showed us it was about way more than just the rush of skiing. It was the brotherhood, the break from the everyday, and the strong connections formed on and off the slopes.
                </p>
                <p>
                  Since then, Broskii has grown into multiple ski trips each year, with 50 to 60 people joining us on every adventure. We've also introduced family trips — giving the next generation a chance to experience the mountains, build memories, and fall in love with winter sports just like we did.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/IMG-20241217-WA0005.jpg"
                  alt="Group skiing"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative">
              <Quote className="h-16 w-16 text-primary-200 mx-auto mb-6 opacity-50" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8">Our Mission</h2>
              <p className="text-xl md:text-2xl text-primary-100 leading-relaxed font-medium">
                To bring as many Muslims as possible to the mountains to enjoy the awe of nature, 
                connect with like-minded people, and experience something truly out of the ordinary.
              </p>
            </div>
            <div className="pt-6">
              <p className="text-lg text-primary-200">
                Whether you're stepping into ski boots for the first time or carving down black diamonds with confidence, 
                Broskii welcomes you. This isn't an exclusive club — it's an open invitation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Mountains Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Why the Mountains?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              There's something humbling about standing at the top of a peak, surrounded by silence, snow, and sky. 
              It reminds you of how small we are — and how incredible Allah's creation truly is.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${value.color} flex items-center justify-center mb-6`}>
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Founders Section */}
<section
  className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-white rounded-3xl relative overflow-hidden mx-4 sm:mx-8"
  style={{
    boxShadow: `
      inset 0 4px 8px rgba(0,0,0,0.1),       /* subtle inner shadow */
      0 0 20px 5px rgba(0,0,0,0.08)         /* soft neutral glow */
    `,
  }}
>
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-12 sm:mb-20"
    >
      <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-gray-900 mb-4 sm:mb-6 uppercase tracking-wide relative inline-block">
        Broskii Founders
        <span className="block w-20 h-1 bg-primary-600 mx-auto mt-2 rounded-full"></span>
      </h2>
    </motion.div>

    <div className="grid grid-cols-2 gap-8 sm:gap-12 max-w-3xl mx-auto">
      {founders.map((founder, index) => (
        <motion.div
          key={founder.name}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-4 sm:mb-6">
            <img
              src={founder.image}
              alt={founder.name}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full mx-auto object-cover shadow-xl"
            />
          </div>
          <h3 className="text-base sm:text-lg md:text-2xl font-serif font-bold text-gray-900 mb-1 sm:mb-2">
            {founder.name}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-primary-600 font-semibold">
            {founder.role}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


{/* Elevating the Journey Section */}
<section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-serif font-bold text-gray-900 mb-6"
      >
        Elevating the Journey
      </motion.h2>

      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <p className="text-lg text-gray-700 leading-relaxed">
          Over the years, we've had the honour of welcoming esteemed scholars such as 
          <strong> Shaykh Abduraheem Green</strong>, <strong>Shaykh Musa Abuzaghleh</strong>, 
          <strong> Ustadh Omar Hajaj</strong> and others on multiple occasions. Their presence brings depth, 
          reflection, and a unique spiritual dimension to our trips - enriching the experience for everyone involved.
        </p>
      </div>
    </motion.div>
  </div>
</section>
      
     {/* CTA Section */}
<section className="py-12 bg-broskii-cta-blue">
  <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
        Ready for the next Broskii trip?
      </h2>
      <p className="text-xl text-primary-100 mb-8">
        If you've ever thought, "I'd love to try that one day" — this is your sign.
        Whether you're new to skiing or an off-piste legend, come be part of something special.
      </p>
      
      <div className="space-y-6">
        <Link
          to="/upcoming-trip"
          className="group relative inline-flex items-center space-x-3 bg-broskii-light-blue-500 hover:bg-broskii-light-blue-600 text-black px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-broskii-light-blue-500 hover:border-broskii-light-blue-400 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <span className="relative z-10">See our upcoming trips</span>
          <ArrowRight className="h-6 w-6" />
        </Link>
        
        <p className="text-primary-200 font-medium">
          Limited spaces – they always go fast.
        </p>
      </div>
    </motion.div>
  </div>
</section>
</div>
);
};

export default AboutPage;