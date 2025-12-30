import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div>
      

     {/* Hero Section */}
     <section className="relative py-20 overflow-hidden">

  {/* Background image */}
  <img
     src="https://res.cloudinary.com/dtx0og5tm/image/upload/v1766891995/broskii-group-ski-trip-alpine-ridge-gallery-hero.webp_em3d2q.webp"
    alt="Broskii group ski trip on an alpine ridge"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-white text-center"
    >
      <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1] mb-6">
        Captured In Motion
      </h1>

      <p className="text-lg md:text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed font-normal">
        An intimate look into the moments that define our passion for the mountains.
      </p>
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

      
    </div>
  );
};

export default GalleryPage;