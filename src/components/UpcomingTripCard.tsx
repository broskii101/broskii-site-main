import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  CheckCircle, 
  DollarSign,
  Users,
  Clock,
  ArrowRight,
  Star
} from 'lucide-react';

interface TripInclusion {
  text: string;
  highlight?: boolean;
}

interface Trip {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: string;
  originalPrice?: string;
  dates: string;
  location: string;
  duration: string;
  groupSize: string;
  description: string;
  inclusions: TripInclusion[];
  highlights: string[];
  badge?: string;
}

interface UpcomingTripCardProps {
  trip: Trip;
  index?: number;
  isHomepage?: boolean;
  nestedInCard?: boolean;
  onImageClick?: (imageUrl: string) => void;
}

const UpcomingTripCard: React.FC<UpcomingTripCardProps> = ({ trip, index = 0, isHomepage = false, nestedInCard = false, onImageClick }) => {
  return (
    <div className={`${nestedInCard ? '' : (isHomepage ? 'bg-gray-100' : 'bg-broskii-cream') + ' shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'} rounded-2xl overflow-hidden`}>
      {/* Image Section */}
      <div 
        className={`relative h-auto overflow-hidden ${isHomepage ? 'p-4' : ''} ${onImageClick ? 'cursor-pointer' : ''}`}
        onClick={onImageClick ? () => onImageClick(trip.image) : undefined}
      >
        <img 
          src={trip.image} 
          alt={trip.title}
          className={`w-full h-auto lg:max-h-80 object-contain transition-transform duration-700 ${isHomepage ? 'rounded-xl' : ''}`}
        />
        
        {!isHomepage && (
          <>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
            {/* Badge */}
            {trip.badge && (
              <div className="absolute top-6 left-6">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {trip.badge}
                </span>
              </div>
            )}
        
            {/* Price Badge */}
            <div className="absolute top-6 right-6">
              <div className="bg-red-500 text-white px-6 py-3 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">{trip.price}</div>
                {trip.originalPrice && (
                  <div className="text-sm line-through opacity-75">{trip.originalPrice}</div>
                )}
              </div>
            </div>
        
            {/* Title and Location Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-3xl font-serif font-bold mb-2 drop-shadow-lg">
                {trip.title}
              </h3>
              <p className="text-lg font-medium mb-4 drop-shadow-md">
                {trip.subtitle}
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary-300" />
                  <span className="font-semibold">{trip.dates}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary-300" />
                  <span className="font-semibold">{trip.location}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {!isHomepage && (
        /* Content Section */
        <div className="p-8">
          {/* Trip Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="text-center">
              <Clock className="h-6 w-6 text-primary-600 mx-auto mb-2" />
              <div className="font-bold text-gray-900">{trip.duration}</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="text-center">
              <Users className="h-6 w-6 text-primary-600 mx-auto mb-2" />
              <div className="font-bold text-gray-900">{trip.groupSize}</div>
              <div className="text-sm text-gray-600">Group Size</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            {trip.description}
          </p>

          {/* Highlights */}
          {trip.highlights.length > 0 && (
            <div className="mb-6">
              <h4 className="font-serif font-bold text-gray-900 mb-3 flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                Trip Highlights
              </h4>
              <div className="flex flex-wrap gap-2">
                {trip.highlights.map((highlight, idx) => (
                  <span 
                    key={idx}
                    className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions */}
          <div className="mb-8">
            <h4 className="font-serif font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              What's Included
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trip.inclusions.map((inclusion, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start space-x-3 ${
                    inclusion.highlight ? 'bg-green-50 p-3 rounded-lg border border-green-200' : ''
                  }`}
                >
                  <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                    inclusion.highlight ? 'text-green-600' : 'text-primary-600'
                  }`} />
                  <span className={`text-sm ${
                    inclusion.highlight ? 'text-green-800 font-semibold' : 'text-gray-600'
                  }`}>
                    {inclusion.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/upcoming-trip"
            className="w-full bg-gradient-to-r from-broskii-light-blue-500 to-broskii-light-blue-600 hover:from-broskii-light-blue-600 hover:to-broskii-light-blue-700 text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 group"
          >
            <DollarSign className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <span>Book Your Spot Now</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Limited spaces available • Early bird pricing ends soon
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
              <span>✈️ Flights included</span>
              <span>🏨 4★ Accommodation</span>
              <span>🎿 Ski pass included</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingTripCard;