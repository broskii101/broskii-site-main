import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Adjust if you use a different router
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabaseClient'; // Adjust path if needed
import { CheckCircle, Calendar, User, Mail, Phone, Users, CreditCard, ArrowRight, Clock, MapPin, Mountain, Plane, Snowflake, Hotel, Sparkles, Bus, HelpCircle, FileText, Info, Globe, Wallet, X, ArrowLeft, Package, GraduationCap, Bed, ShieldCheck, FileSignature as Signature } from 'lucide-react';


interface BookingForm {
  fullName: string;
  age: number;
  city: string;
  email: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  skiingExperience: string;
  equipmentRental: string;
  equipmentRentalOption?: string;
  lessons: string;
  roomPreference: string;
  travelPlans: string;
  selectedPaymentOption: 'bankTransferFull' | 'bankTransferDeposit' | 'cardFull' | 'cardDeposit' | '';
  waiver: boolean;
  extrasTerms: boolean;
  terms: boolean;
  electronicSignature: string;
}

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
const formRef = useRef<HTMLFormElement>(null);  // 
  const [paymentOption, setPaymentOption] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
const [hasSaved, setHasSaved] = useState(false);

  
  const { register, handleSubmit, watch, formState: { errors }, setValue, trigger, getValues } = useForm<BookingForm>();
  
  const equipmentRental = watch('equipmentRental');
  
  useEffect(() => {
    if (equipmentRental !== 'yes') {
      setValue('equipmentRentalOption', undefined);
    }
  }, [equipmentRental, setValue]);
  
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bankTransfer' | 'cardPayment' | null>(null);
  const [selectedPaymentAmount, setSelectedPaymentAmount] = useState<'full' | 'deposit' | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentConfirmedError, setPaymentConfirmedError] = useState('');
  

  // Trip data
  const tripData = {
    dates: "10th - 17th January 2026",
    location: "Val Thorens",
    region: "French Alps",
    resortLocation: "Val Thorens, French Alps",
    resort: "Europe's Highest Ski Resort",
    price: "£1200",
    priceLabel: "Total Trip Price",
    inclusions: [
      { text: "Return flights with BA from LHR", icon: Plane },
      { text: "4★ Luxury Hotel (L'Oxalys)", icon: Hotel },
      { text: "Private Coach Transfer", icon: Bus },
      { text: "Ski pass (£370 value)", icon: Snowflake },
      { text: "Ski in/out access", icon: ArrowRight },
      { text: "Spa Facilities", icon: Sparkles }
    ]
  };

  // Steps (REORDERED: Waiver before Payment)
  const steps = [
    { title: 'Personal Information' },
    { title: 'Experience & Extras' },
    { title: 'Waiver & Release' },
    { title: 'Payment Information' }
  ];

const experienceOptions = [
  {
    value: 'beginner',
    label: 'First Time / Beginner',
    description:
      "It’s your first ski/snowboard trip, or you’ve only been once and are still learning the basics."
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    description:
      "You’ve been a couple of times, feel comfortable on blue runs, and have started trying reds."
  },
  {
    value: 'advanced',
    label: 'Advanced',
    description:
      "You’re confident on red/black runs, enjoy challenging terrain, and want to refine advanced skills."
  }
];

// Save into Supabase + send confirmation email after Step 3 (Waiver)
const saveAfterWaiver = async () => {
  if (hasSaved) return true; // already saved once

  const data = getValues();

  const transformedData = {
    full_name: data.fullName,
    age: data.age,
    city: data.city,
    email: data.email,
    phone_number: data.phone,
    emergency_contact_name: data.emergencyContactName,
    emergency_contact_number: data.emergencyContactNumber,
    skiing_experience_level: data.skiingExperience,
    equipment_rental: data.equipmentRental,
    equipment_rental_option: data.equipmentRentalOption ?? null,
    lessons: data.lessons,
    room_preference: data.roomPreference,
    travel_plans: data.travelPlans,
    payment_option: data.selectedPaymentOption ?? null, // ensure not undefined
    waiver_agreed: data.waiver,
    extras_balance_adjusted: data.extrasTerms,
    terms_accepted: data.terms,
    electronic_signature: data.electronicSignature,
  };

  const { error: insertError } = await supabase.from('booking').insert([transformedData]);
  if (insertError) {
    console.error('Supabase insert error:', insertError);
    alert('Failed to save booking. Please try again.');
    return false;
  }

  setHasSaved(true); // mark as saved so we don’t insert again

  // Send single confirmation email that mentions payment
  try {
    await fetch('/.netlify/functions/sendBookingConfirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        age: data.age,
        emergencyContactName: data.emergencyContactName,
        emergencyContactNumber: data.emergencyContactNumber,
        skiingExperience: data.skiingExperience,
        equipmentRental: data.equipmentRental,
        equipmentRentalOption: data.equipmentRentalOption ?? 'N/A',
        lessons: data.lessons,
        roomPreference: data.roomPreference,
        travelPlans: data.travelPlans,
        selectedPaymentOption: data.selectedPaymentOption,
        waiver: data.waiver,
        extrasTerms: data.extrasTerms,
        terms: data.terms,
        electronicSignature: data.electronicSignature,
        messageType: 'pendingPayment',
      }),
    });
  } catch (emailErr) {
    console.warn('Email send failed (non-blocking):', emailErr);
  }

  return true;
};
const nextStep = async () => {
  // Clear previous payment confirmation error
  setPaymentConfirmedError('');

  // Perform step-specific validation before proceeding
  let isValid = false;

  if (currentStep === 0) {
    // Step 1: Personal Information - validate required fields only
    isValid = await trigger(['fullName', 'age', 'city', 'email', 'phone']);
  } else if (currentStep === 1) {
    // Step 2: Experience & Extras - validate all required fields
    isValid = await trigger(['skiingExperience', 'equipmentRental', 'lessons', 'roomPreference', 'travelPlans']);

    // Additional conditional validation for equipment rental option
    if (getValues('equipmentRental') === 'yes') {
      const equipmentOptionValid = await trigger('equipmentRentalOption');
      isValid = isValid && equipmentOptionValid;
    }
} else if (currentStep === 2) {
  // Step 3: Waiver & Release
  isValid = await trigger(['waiver', 'extrasTerms', 'terms', 'electronicSignature']);
  if (isValid) {
    const saved = await saveAfterWaiver();
    if (!saved) return;
  }
} else if (currentStep === 3) {
  // Step 4: Payment
  if (!paymentConfirmed) {
    setPaymentConfirmedError('You must confirm your payment before continuing.');
    return;
  }
  isValid = true;
}
  // Only proceed to next step if validation passes
  if (!isValid) {
    return;
  }

  if (currentStep < steps.length - 1) {
    setCurrentStep(currentStep + 1);
    // Scroll to top of form section
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }
};

const prevStep = () => {
  if (currentStep > 0) {
    setCurrentStep(currentStep - 1);
    // Scroll to top of form section
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }
};

// Final submit on last step -> just navigate to thank-you
const onSubmit = async () => {
  if (!paymentConfirmed) {
    setPaymentConfirmedError('Please confirm your payment before finishing.');
    return;
  }
  navigate('/thank-you');
};

  const Tooltip = ({ content, id }: { content: string; id: string }) => (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowTooltip(showTooltip === id ? null : id)}
        className="ml-2 text-primary-600 hover:text-primary-700 transition-colors focus:outline-none"
      >
        <HelpCircle className="h-4 w-4" />
      </button>
      {showTooltip === id && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute z-50 left-full top-1/2 -translate-y-1/2 ml-2 max-w-[280px] sm:max-w-xs bg-gray-900 text-white text-sm rounded-lg p-3 shadow-xl"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-2">{content}</div>
            <button
              onClick={() => setShowTooltip(null)}
              className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-900"></div>
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
{/* Hero Section */}
<section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
  <img
    src="/IMG-20250120-WA0026.webp"
    alt="Ski slopes background"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    {/* Moved everything slightly lower */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center text-white relative z-10 mt-20 md:mt-28"
>
 {/* increased top margin to move block down */}  
    
      <div className="flex items-center justify-center space-x-3 mb-2 md:mb-4">
        <h1 className="text-5xl font-serif font-bold text-white drop-shadow-lg">
          SKI 3 VALLEYS
        </h1>
      </div>

      <p className="text-lg font-semibold text-white/90 max-w-4xl mx-auto drop-shadow-md mb-6">
        Val Thorens, French Alps
      </p>

      <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md mb-7">
        Where every run feels legendary — 600km of epic slopes at Europe's highest ski resort.
      </p>

      <p className="text-2xl text-white font-semibold max-w-4xl mx-auto drop-shadow-md mb-7">
        10th – 17th January 2026
      </p>

      {/* Grouped Total Trip Price and Price */}
      <div className="max-w-4xl mx-auto drop-shadow-md">
        <p className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-0">
          Total Trip Price
        </p>
        <p className="text-3xl font-bold text-primary-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] mt-1">
          £1,200
        </p>
      </div>
    </motion.div>
  </div>
</section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1">
          {/* Trip Summary Sidebar */}
       
          {/* Booking Form */}
        <div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden"   >
              {/* Progress Bar */}
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-primary-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`text-xs ${
                        index <= currentStep ? 'text-primary-600 font-medium' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6" ref={formRef}>
                {/* Step 1: Personal Information */}
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h2>
                      <p className="text-gray-600">Let's start with your basic details</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="inline h-4 w-4 mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          {...register('fullName', { required: 'Full name is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age *
                        </label>
                        <input
                          type="number"
                          {...register('age', { 
                            required: 'Age is required', 
                            min: { value: 18, message: 'Must be 18 or older' },
                            valueAsNumber: true
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your age"
                        />
                        {errors.age && (
                          <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          {...register('city', { required: 'City is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your city"
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="inline h-4 w-4 mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your email"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="inline h-4 w-4 mr-2" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          {...register('phone', { required: 'Phone number is required' })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                      </div>

                      {/* Emergency Contact Section Divider */}
                      <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center my-6">
                          <div className="flex-grow border-t border-gray-300"></div>
                          <div className="flex-shrink-0 px-4">
                            <span className="text-sm font-medium text-gray-500 bg-white px-2">Emergency Contact Information</span>
                          </div>
                          <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Emergency Contact Name 
                        </label>
                        <input
                          type="text"
                          {...register('emergencyContactName')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                          placeholder="Emergency contact full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Emergency Contact Number 
                        </label>
                        <input
                          type="tel"
                          {...register('emergencyContactNumber')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                          placeholder="Emergency contact phone number"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Experience & Extras */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Experience & Extras</h2>
                      <p className="text-gray-600">Tell us about your skiing experience and preferences</p>
                    </div>

                    {/* Skiing Experience Level */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 flex items-center space-x-3">
                        <Mountain className="h-6 w-6 text-primary-600" />
                        <span>Skiing Experience Level</span>
                      </h3>
                      <div className="space-y-3">
                        {experienceOptions.map((option) => (
                          <label key={option.value} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
                            <input
                              type="radio"
                              value={option.value}
                              {...register('skiingExperience', { required: 'Please select your skiing experience level' })}
                              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 flex items-center">
                                {option.label}
                                <Tooltip content={option.description} id={option.value} />
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.skiingExperience && (
                        <p className="mt-2 text-sm text-red-600">{errors.skiingExperience.message}</p>
                      )}
                    </div>

              {/* Equipment Rental */}
<div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 flex items-center space-x-3">
    <Package className="h-6 w-6 text-primary-600" />
    <span>Equipment Rental</span>
  </h3>
  <p className="text-gray-600 mb-4">Would you like us to arrange your ski/snowboard rental?</p>
  <div className="space-y-3">
    {/* YES Option */}
    <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
      <input
        type="radio"
        value="yes"
        {...register('equipmentRental', { required: 'Please select an equipment rental option' })}
        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
      />
      <div className="flex-1">
        <div className="font-medium text-gray-900">Yes</div>
        <div className="text-sm text-gray-600">(rental prices will be shared closer to the trip)</div>

        {/* Sub-options for "Yes" */}
        {equipmentRental === 'yes' && (
          <div className="pl-6 pt-3 space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="full-package"
                {...register('equipmentRentalOption', {
                  validate: value =>
                    equipmentRental !== 'yes' || !!value || 'Please select a rental package option.',
                })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Skis/snowboard, boots & helmet</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="skis-boots"
                {...register('equipmentRentalOption', {
                  validate: value =>
                    equipmentRental !== 'yes' || !!value || 'Please select a rental package option.',
                })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Skis/snowboard & boots</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="skis-only"
                {...register('equipmentRentalOption', {
                  validate: value =>
                    equipmentRental !== 'yes' || !!value || 'Please select a rental package option.',
                })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="text-sm text-gray-700">Skis or snowboard only</span>
            </label>

            {/* Show validation error if sub-option is required and missing */}
            {errors.equipmentRentalOption && (
              <p className="text-sm text-red-600">{errors.equipmentRentalOption.message}</p>
            )}
          </div>
        )}
      </div>
    </label>

    {/* NO Option */}
    <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
      <input
        type="radio"
        value="no-book-online"
        {...register('equipmentRental', { required: 'Please select an equipment rental option' })}
        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
      />
      <div className="flex-1">
        <div className="font-medium text-gray-900">No</div>
        <div className="text-sm text-gray-600 mt-1">
          I'll book equipment hire online or hire directly at the resort
        </div>
      </div>
    </label>

    {/* BRINGING OWN Option */}
    <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
      <input
        type="radio"
        value="bringing-own"
        {...register('equipmentRental', { required: 'Please select an equipment rental option' })}
        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
      />
      <div className="flex-1">
        <div className="font-medium text-gray-900">I'll be bringing my own skis/snowboard</div>
        <div className="text-sm text-gray-600">
          (airline carriage fees may apply — details will be sent closer to the trip)
        </div>
      </div>
    </label>
  </div>
  {errors.equipmentRental && (
    <p className="mt-2 text-sm text-red-600">{errors.equipmentRental.message}</p>
  )}
</div>





                    {/* Lessons */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 flex items-center space-x-3">
                        <GraduationCap className="h-6 w-6 text-primary-600" />
                        <span>Lessons</span>
                      </h3>
                      <p className="text-gray-600 mb-2">Would you like to book ski or snowboard lessons?</p>
                      <p className="text-sm text-gray-500 mb-4">(Highly recommended for first-timers and beginners. Lesson prices will be shared closer to the trip.)</p>
                      <div className="space-y-3">
                        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
                          <input
                            type="radio"
                            value="group"
                            {...register('lessons', { required: 'Please select a lessons option' })}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">Yes, group lessons</div>
                            <div className="text-sm text-gray-600">(cost-effective)</div>
                          </div>
                        </label>
                        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
                          <input
                            type="radio"
                            value="private"
                            {...register('lessons', { required: 'Please select a lessons option' })}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">Yes, private lessons</div>
                          </div>
                        </label>
                        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
                          <input
                            type="radio"
                            value="none"
                            {...register('lessons', { required: 'Please select a lessons option' })}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">No lessons needed</div>
                          </div>
                        </label>
                      </div>
                      {errors.lessons && (
                        <p className="mt-2 text-sm text-red-600">{errors.lessons.message}</p>
                      )}
                    </div>

                    {/* Room Preference */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 flex items-center space-x-3">
                        <Bed className="h-6 w-6 text-primary-600" />
                        <span>Room Preference</span>
                      </h3>
                      <p className="text-gray-600 mb-4">
                        All accommodation is based on shared rooms (twin occupancy). If you would prefer a single occupancy room, you can request it below — but please note this is not guaranteed and subject to availability. Additional charges apply, and the exact pricing will be confirmed after the booking.
                      </p>
                      <div className="space-y-3">
                        {/* Shared room first */}
                        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
                          <input
                            type="radio"
                            value="shared"
                            {...register('roomPreference', { required: 'Please select a room preference' })}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">I'm happy to share a room</div>
                          </div>
                        </label>

                        {/* Single room second */}
                        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
                          <input
                            type="radio"
                            value="single"
                            {...register('roomPreference', { required: 'Please select a room preference' })}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">I'd like to request my own room</div>
                            <div className="text-sm text-gray-600">(approx. £550 extra – subject to availability)</div>
                          </div>
                        </label>
                      </div>
                      {errors.roomPreference && (
                        <p className="mt-2 text-sm text-red-600">{errors.roomPreference.message}</p>
                      )}
                    </div>

                    {/* Travel Plans */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 flex items-center space-x-3">
                        <Plane className="h-6 w-6 text-primary-600" />
                        <span>Travel Plans</span>
                      </h3>
                      <div className="text-gray-600 mb-4 space-y-4">
                        <p>Our package includes return flights from London Heathrow (LHR) to Geneva (GVA), along with private coach transfers from Geneva to the resort.</p>

                        <p>If you're travelling from another UK airport or from abroad, you'll need to arrange your own flights. You can still join our private coach transfer from Geneva — we'll share our flight details and transfer timings in advance to help you coordinate.</p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-blue-800 font-medium mb-2">If you're arranging your own flights and/or transfer:</p>
                          <p className="text-blue-700">Please only pay the deposit when booking. We will deduct the cost of the flights and/or transfers from your total and send you an adjusted invoice for the remaining balance.</p>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <p className="text-amber-800 font-semibold mb-2">Important:</p>
                          <p className="text-amber-700">If you miss your group flight from London or miss the group transfer in Geneva, you'll be responsible for arranging your own transportation to the resort at your own expense.</p>
                        </div>
                      </div>
                      <p className="text-gray-700 font-medium mb-4">How will you be travelling?</p>
                      <div className="space-y-3">
                        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
                          <input
                            type="radio"
                            value="group-flight"
                            {...register('travelPlans', { required: 'Please select your travel plans' })}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">I'll be flying with the group from London Heathrow</div>
                            <div className="text-sm text-gray-600">(included in the package)</div>
                          </div>
                        </label>
                        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
                          <input
                            type="radio"
                            value="own-flight-group-transfer"
                            {...register('travelPlans', { required: 'Please select your travel plans' })}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <div className="flex-1">
                            <div>
                              <div className="font-medium text-gray-900">I'll be travelling from another UK airport or abroad</div>
                              <div className="text-sm text-gray-600 mt-1">I will join the group coach transfer from Geneva</div>
                            </div>
                          </div>
                        </label>
                        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-white transition-colors cursor-pointer">
                          <input
                            type="radio"
                            value="own-flight-own-transfer"
                            {...register('travelPlans', { required: 'Please select your travel plans' })}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <div className="flex-1">
                            <div>
                              <div className="font-medium text-gray-900">I'll be travelling from another UK airport or abroad</div>
                              <div className="text-sm text-gray-600 mt-1">I will arrange my own transfer to the resort</div>
                            </div>
                          </div>
                        </label>
                      </div>
                      {errors.travelPlans && (
                        <p className="mt-2 text-sm text-red-600">{errors.travelPlans.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Waiver & Release */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 flex items-center space-x-3">
                        <ShieldCheck className="h-8 w-8 text-primary-600" />
                        <span>Waiver & Release</span>
                      </h2>

                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-md mb-6">
                        <p className="text-gray-700 leading-relaxed">
                          I acknowledge that skiing and snowboarding carry inherent risks including but not limited to: collision with other skiers, trees, or obstacles; equipment failure; weather conditions; and terrain variations. I accept full responsibility for my safety and understand that Broskii Ltd is not liable for any personal injury, property damage, or loss that may occur during this trip. I confirm that I am physically fit to participate and have adequate travel insurance with winter sports coverage.
                        </p>
                      </div>

                      <div className="space-y-4 mb-8">
                        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            {...register('waiver', { required: 'You must agree to the waiver and release of liability' })}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="text-gray-700">
                            I have read, understood, and agree to the terms of this waiver and release of liability. *
                          </span>
                        </label>
                        {errors.waiver && (
                          <p className="mt-1 text-sm text-red-600">{errors.waiver.message}</p>
                        )}

                        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            {...register('extrasTerms', { required: 'You must acknowledge the extras terms' })}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="text-gray-700">
                            I understand that if I have selected any extras (e.g. equipment hire, single room, lessons), my remaining balance will be adjusted accordingly. *
                          </span>
                        </label>
                        {errors.extrasTerms && (
                          <p className="mt-1 text-sm text-red-600">{errors.extrasTerms.message}</p>
                        )}

                        <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            {...register('terms', { required: 'You must agree to the terms of service' })}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="text-gray-700">
                            I have read and agree to the terms of service, including the refund policy. *
                          </span>
                        </label>
                        {errors.terms && (
                          <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
                        )}
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center space-x-3">
                          <Signature className="h-6 w-6 text-primary-600" />
                          <span>Electronic Signature</span>
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name (Electronic Signature) *
                            </label>
                            <input
                              type="text"
                              placeholder="Type your full name"
                              {...register('electronicSignature', { required: 'Electronic signature is required' })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                            />
                            {errors.electronicSignature && (
                              <p className="mt-1 text-sm text-red-600">{errors.electronicSignature.message}</p>
                            )}
                          </div>

                          <p className="text-sm text-gray-600">
                            By typing your name above, you are providing your electronic signature and agreeing to all terms.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Payment Information */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >

                    {/* 2. Payment Info Box */}
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded text-blue-900 text-sm leading-relaxed font-medium">
                      <h4 className="font-semibold text-base mb-2">💳 Payment Options</h4>
                      <p className="mb-2">
                        You can choose to pay either the <strong>full amount (£1200)</strong> or a <strong>£300 deposit</strong> to secure your spot.
                      </p>
                      <p className="mb-2">
                        If you’ve selected <strong>extras</strong> (like equipment hire or lessons), or if you're flying from a <strong>different airport</strong>, please only pay the deposit for now.
                        We'll send you a revised total after your booking is confirmed.
                      </p>
                      <p>
                        🗓️ If you choose to pay the deposit, the remaining balance is due by <strong>01/11/2025</strong>.
                      </p>
                    </div>

        {/* 3. Subheader */}
<h3 className="text-xl font-semibold text-gray-900 mb-3">How would you like to pay?</h3>

{/* Segmented method selector – with inline fee notes */}
<div className="mb-5">
  <p className="sm:hidden text-xs text-gray-500 mb-2">Tap a method to continue</p>
  <div className="inline-flex w-full sm:w-auto rounded-xl bg-gray-50 border border-gray-200 p-1">
    <button
      type="button"
      onClick={() => setPaymentMethod('bankTransfer')}
      aria-pressed={paymentMethod === 'bankTransfer'}
      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2
        px-4 py-3 rounded-lg text-sm font-medium transition
        border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-[.98]
        ${paymentMethod === 'bankTransfer'
          ? 'bg-white text-gray-900 border-gray-300 shadow'
          : 'bg-gray-100 text-gray-800 border-transparent active:bg-gray-200'
        }`}
    >
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-2">
        <Wallet className="h-4 w-4" />
        <span>Bank Transfer</span>
        <span className="text-[11px] sm:text-xs text-gray-500 sm:ml-1 sm:mt-0 mt-0.5">No fees</span>
      </div>
      {paymentMethod === 'bankTransfer' && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
    </button>

    <button
      type="button"
      onClick={() => setPaymentMethod('cardPayment')}
      aria-pressed={paymentMethod === 'cardPayment'}
      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2
        px-4 py-3 rounded-lg text-sm font-medium transition
        border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[.98]
        ${paymentMethod === 'cardPayment'
          ? 'bg-white text-blue-900 border-blue-300 shadow'
          : 'bg-blue-50 text-blue-800 border-transparent active:bg-blue-100'
        }`}
    >
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-2">
        <CreditCard className="h-4 w-4" />
        <span>Card</span>
        <span className="text-[11px] sm:text-xs text-blue-700/80 sm:ml-1 sm:mt-0 mt-0.5">2% fee</span>
      </div>
      {paymentMethod === 'cardPayment' && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
    </button>
  </div>
</div>


{/* Bank Transfer options */}
{paymentMethod === 'bankTransfer' && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <button
      type="button"
      onClick={() => {
        setSelectedPaymentAmount('full');
        setPaymentUrl('https://monzo.com/pay/r/broskii-ltd_M9c3CNpxlcIlWL');
        setShowPaymentModal(true);
      }}
      className={`w-full rounded-xl border p-3 sm:p-4 text-left transition
        ${selectedPaymentAmount === 'full'
          ? 'border-gray-300 ring-2 ring-gray-200 bg-white'
          : 'border-gray-200 hover:bg-gray-50'
        }`}
    >
      <div className="font-semibold text-gray-900">Full Payment</div>
      <div className="text-sm text-gray-600">£1,200</div>
    </button>

    <button
      type="button"
      onClick={() => {
        setSelectedPaymentAmount('deposit');
        setPaymentUrl('https://monzo.com/pay/r/broskii-ltd_2h3KswpLAxWlnJ');
        setShowPaymentModal(true);
      }}
      className={`w-full rounded-xl border p-3 sm:p-4 text-left transition
        ${selectedPaymentAmount === 'deposit'
          ? 'border-gray-300 ring-2 ring-gray-200 bg-white'
          : 'border-gray-200 hover:bg-gray-50'
        }`}
    >
      <div className="font-semibold text-gray-900">Deposit</div>
      <div className="text-sm text-gray-600">£300 • Balance due 01/11/2025</div>
    </button>
  </div>
)}

{/* Card options */}
{paymentMethod === 'cardPayment' && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <button
      type="button"
      onClick={() => {
        setSelectedPaymentAmount('full');
        setPaymentUrl('https://monzo.com/pay/r/broskii-ltd_sWuhRPwxUlU5zS');
        setShowPaymentModal(true);
      }}
      className={`w-full rounded-xl border p-3 sm:p-4 text-left transition
        ${selectedPaymentAmount === 'full'
          ? 'border-blue-300 ring-2 ring-blue-200 bg-white'
          : 'border-blue-200 hover:bg-blue-50'
        }`}
    >
      <div className="font-semibold text-blue-900">Full Payment</div>
      <div className="text-sm text-blue-700">£1,224 (incl. 2% fee)</div>
    </button>

    <button
      type="button"
      onClick={() => {
        setSelectedPaymentAmount('deposit');
        setPaymentUrl('https://monzo.com/pay/r/broskii-ltd_qFFngtKWtWWJQA');
        setShowPaymentModal(true);
      }}
      className={`w-full rounded-xl border p-3 sm:p-4 text-left transition
        ${selectedPaymentAmount === 'deposit'
          ? 'border-blue-300 ring-2 ring-blue-200 bg-white'
          : 'border-blue-200 hover:bg-blue-50'
        }`}
    >
      <div className="font-semibold text-blue-900">Deposit</div>
      <div className="text-sm text-blue-700">£306 (incl. 2% fee) • Balance due 01/11/2025</div>
    </button>
  </div>
)}


                    {/* 7. Manual Bank Transfer Accordion */}
                    <div className="mt-6 max-w-md mx-auto">
                      <details className="bg-gray-100 rounded-lg p-4 shadow-sm group">
                        <summary className="font-medium text-blue-700 cursor-pointer hover:underline transition">
                          🔽 Prefer to pay via your own banking app? Click here for manual bank details
                        </summary>
                        <div className="mt-4 text-sm text-gray-800 leading-relaxed space-y-1">
                          <p><strong>Bank:</strong> Monzo Business</p>
                          <p><strong>Account Name:</strong> Broskii Ltd</p>
                          <p><strong>Account Number:</strong> 95313511</p>
                          <p><strong>Sort Code:</strong> 04-00-03</p>
                          <p><strong>Reference:</strong> Your Full Name</p>
                        </div>
                      </details>
                    </div>

                    <div className="mt-6">
                      <label className="inline-flex items-center text-sm font-medium text-gray-700">
                        <input
                          type="checkbox"
                          checked={paymentConfirmed}
                          onChange={(e) => {
                            setPaymentConfirmed(e.target.checked);
                            if (e.target.checked) setPaymentConfirmedError('');
                          }}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">
                          I confirm I have completed my payment using one of the above methods.
                        </span>
                      </label>
                      {paymentConfirmedError && (
                        <p className="text-red-600 text-xs mt-1 font-semibold">{paymentConfirmedError}</p>
                      )}
                    </div>

                    {/* 8. Payment Confirmation Modal */}
                    {showPaymentModal && (
                      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-5 relative">
                          <h2 className="text-lg font-semibold text-gray-800">
                            You’ll be redirected to a <span className="text-blue-600">secure payment page</span>.
                          </h2>

          <div className="bg-amber-100 border border-amber-300 rounded-md p-4 text-sm text-amber-900 shadow-sm">
  <p className="font-semibold text-base mb-1">⚠️ <span className="underline">IMPORTANT</span></p>
  <p>Your place is not confirmed until payment is completed. Please complete payment on the next page to secure your spot.</p>
</div>


                          <div className="flex justify-end space-x-3 pt-2">
                            <button
                              onClick={() => setShowPaymentModal(false)}
                              className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                            >
                              Cancel
                            </button>
                            <a
                              href={paymentUrl!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
                            >
                              Proceed to Payment
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 9. Responsive Style Block */}
                    <style>
                      {`
                        .payment-container {
                          display: flex;
                          gap: 0.5rem;
                          margin-top: 0.5rem;
                          flex-wrap: wrap;
                        }
                        .payment-box {
                          border-radius: 0.5rem;
                          padding: 1rem;
                          flex: 1 1 220px;
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                        }
                        .bank-transfer-box {
                          background: #f5f7fa;
                          border: 2px solid #cbd2d9;
                        }
                        .card-payment-box {
                          background: #e8f0fe;
                          border: 2px solid #a9c1ff;
                        }
                        @media (max-width: 640px) {
                          .payment-container {
                            flex-direction: column;
                          }
                          .payment-box {
                            width: 100%;
                            padding: 0.75rem;
                          }
                          button {
                            padding: 0.75rem 1rem;
                          }
                          p {
                            margin-top: 0.25rem !important;
                          }
                        }
                      `}
                    </style>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium h-11 leading-5 transition-all duration-300 ${
                      currentStep === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium h-11 leading-5 hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium h-11 leading-5 hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {isSubmitting ? 'Submitting...' : 'Complete Booking'}
                    </button>
                  )}
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
