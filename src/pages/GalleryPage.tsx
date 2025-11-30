import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Snowflake } from 'lucide-react';
import CloudinaryGallery from '../components/CloudinaryGallery';

interface CloudinaryImage {
  id: string;
  url: string;
  fullUrl: string;
  alt: string;
  created_at: string;
}

const GalleryPage = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  const handleImagesLoaded = (images: CloudinaryImage[]) => {
    if (images.length > 0) {
      setHeroImage(images[0].fullUrl);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Snowflake className="absolute top-20 left-10 h-8 w-8 text-primary-200 animate-float" />
        <Snowflake className="absolute top-40 right-20 h-6 w-6 text-primary-300 animate-float" style={{ animationDelay: '2s' }} />
        <Snowflake className="absolute bottom-40 left-20 h-10 w-10 text-primary-200 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Hero Section */}
      <section 
        className="relative py-20"
        style={{
          backgroundImage: heroImage ? `url(${heroImage})` : 'linear-gradient(to right, #0284c7, #075985)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
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
              <h1 className="text-5xl font-serif font-bold mb-6">Captured In Motion</h1>
              <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
                An intimate look into the moments that define our passion for the mountains.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Gallery Component */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <CloudinaryGallery onImagesLoaded={handleImagesLoaded} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-serif font-bold text-white">
              Ready to Create Your Own Memories?
            </h2>
            <p className="text-xl text-primary-100">
              Join us on our next adventure and become part of the Broskii story.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center space-x-2 bg-broskii-light-blue-500 hover:bg-broskii-light-blue-600 text-black px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <span>Book Your Trip</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;