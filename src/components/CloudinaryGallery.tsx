import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Download, Loader } from 'lucide-react';

interface CloudinaryImage {
  id: string;
  url: string;
  fullUrl: string;
  alt: string;
  created_at: string;
}

interface CloudinaryGalleryProps {
  onImagesLoaded?: (images: CloudinaryImage[]) => void;
}

const CloudinaryGallery: React.FC<CloudinaryGalleryProps> = ({ onImagesLoaded }) => {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/.netlify/functions/getCloudinaryImages');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      
      if (!text) {
        console.warn('Empty response received');
        setImages([]);
        onImagesLoaded?.([]);
        return;
      }

      const data = JSON.parse(text);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setImages(data.images || []);
      onImagesLoaded?.(data.images || []);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError(err instanceof Error ? err.message : 'Failed to load images');
      setImages([]);
      onImagesLoaded?.([]);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Prepare slides for lightbox
  const lightboxSlides = images.map((image) => ({
    src: image.fullUrl,
    alt: image.alt,
    download: image.fullUrl,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8">
          <p className="text-lg text-red-800 mb-4">Failed to load gallery</p>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchImages}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-lg text-gray-600">No images found in the gallery.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 pt-[75%] overflow-hidden">
              <img
                src={image.url}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-3">
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={closeLightbox}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[]}
        render={{
          buttonDownload: () => (
            <button
              type="button"
              className="yarl__button"
              onClick={() => {
                const link = document.createElement('a');
                link.href = images[lightboxIndex]?.fullUrl || '';
                link.download = images[lightboxIndex]?.alt || 'image';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="w-5 h-5" />
            </button>
          ),
        }}
        toolbar={{
          buttons: ['download', 'close'],
        }}
        counter={{
          container: { style: { top: 'unset', bottom: '1rem' } },
        }}
      />
    </div>
  );
};

export default CloudinaryGallery;