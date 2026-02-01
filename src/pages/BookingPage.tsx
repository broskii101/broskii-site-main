import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabaseClient'; // Adjust path if needed
import { CheckCircle, User, Mail, Phone, CreditCard, ArrowRight, Mountain, Plane, HelpCircle, Wallet, X, ArrowLeft, Package, GraduationCap, Bed, ShieldCheck, FileSignature as Signature } from 'lucide-react';
import toast from 'react-hot-toast';


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
  const { tripId } = useParams<{ tripId?: string }>();

  console.log('BookingPage tripId:', tripId);

  const [trip, setTrip] = useState<any>(null);
  const [isLoadingTrip, setIsLoadingTrip] = useState(true);

  const isSoldOut =
  !!trip &&
  (
    (typeof trip.capacity === 'number' &&
      typeof trip.booked_count === 'number' &&
      trip.booked_count >= trip.capacity) ||
    trip.status === 'full'
  );



  const [currentStep, setCurrentStep] = useState(0);


  const [showTooltip, setShowTooltip] = useState<string | null>(null);
const formRef = useRef<HTMLFormElement>(null);  // 
  const [paymentOption, setPaymentOption] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
const [hasSaved, setHasSaved] = useState(false);
const [isSavingBooking, setIsSavingBooking] = useState(false);

const [showWaitlistModal, setShowWaitlistModal] = useState(false);



  
  const { register, handleSubmit, watch, formState: { errors }, setValue, trigger, getValues } = useForm<BookingForm>();
  
  const equipmentRental = watch('equipmentRental');

  useEffect(() => {
    const loadTrip = async () => {
      // If someone visits /booking without a tripId, skip for now
      if (!tripId) {
        setIsLoadingTrip(false);
        return;
      }
  
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .single();
  
      if (error) {
        console.error('Failed to load trip:', error);
      } else {
        setTrip(data);
        console.log('Loaded trip:', data);
      }
  
      setIsLoadingTrip(false);
    };
  
    loadTrip();
  }, [tripId]);
  

  
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


  // ---- Payment helpers (trip-driven) ----
  const fullAmount = trip?.full_payment_amount ?? null;
  const depositAmount = trip?.deposit_amount ?? null;
  const balanceDueDate = trip?.balance_due_date ?? null;

// ---- Travel helpers (trip-driven) ----
const departureAirport = trip?.departure_airport ?? null;
const transferAirport = trip?.transfer_airport ?? null;



  // Card prices are derived (2% fee)
  const fullAmountCard =
    fullAmount !== null ? Math.round(fullAmount * 1.02) : null;

  const depositAmountCard =
    depositAmount !== null ? Math.round(depositAmount * 1.02) : null;

  // Monzo links
  const monzoLinks = {
    bank: {
      full: trip?.monzo_bank_full_url ?? null,
      deposit: trip?.monzo_bank_deposit_url ?? null,
    },
    card: {
      full: trip?.monzo_card_full_url ?? null,
      deposit: trip?.monzo_card_deposit_url ?? null,
    },
  };




  

  useEffect(() => {
    if (!tripId) {
      navigate('/upcoming-trip', { replace: true });
    }
  }, [tripId, navigate]);
  


  

  // Steps (REORDERED: Waiver before Payment)
  const steps = [
    { title: 'Personal Information' },
    { title: 'Experience & Extras' },
    { title: 'Waiver & Release' },
    { title: 'Payment Information' }
  ];

  const experienceOptions = [
    {
      value: 'first-time',
      label: 'First Time',
      description:
        'You have never skied or snowboarded before. This is your first time on snow. Lessons are mandatory at this level and will be arranged for you.'
    },
    {
      value: 'beginner',
      label: 'Beginner',
      description:
        'You have been skiing or snowboarding once or twice and are still learning the basics. Lessons are highly recommended to build confidence and control.'
    },
    {
      value: 'intermediate',
      label: 'Intermediate',
      description:
        'You are comfortable on blue runs and have started skiing or snowboarding red runs with confidence.'
    },
    {
      value: 'advanced',
      label: 'Advanced',
      description:
        'You are confident on red and black runs and comfortable on steeper or more challenging terrain.'
    }
  ];
  



const saveAfterWaiver = async () => {
  if (isSavingBooking || hasSaved) return true;

  setIsSavingBooking(true);

  const data = getValues();

  const transformedData = {
    trip_id: tripId ?? null,

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
    payment_option: data.selectedPaymentOption ?? null,
    waiver_agreed: data.waiver,
    extras_balance_adjusted: data.extrasTerms,
    terms_accepted: data.terms,
    electronic_signature: data.electronicSignature,
  };

  // 1️⃣ Save booking
  const { error } = await supabase
    .from('booking')
    .insert([transformedData]);

  if (error) {
    console.error('Supabase insert error:', error);
    alert('Failed to save booking. Please try again.');
    setIsSavingBooking(false);
    return false;
  }

  setHasSaved(true);

  // 2️⃣ Send confirmation email (non-blocking)
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
        electronicSignature: data.electronicSignature,
        messageType: 'pendingPayment',
      }),
    });
  } catch (err) {
    console.warn('Email send failed (non-blocking):', err);
  }

  setIsSavingBooking(false);
  return true;
};





const nextStep = async () => {
  if (isSoldOut) {
    setShowWaitlistModal(true);
    return;
  }


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
  if (isSoldOut) {
    setShowWaitlistModal(true);
    return;
  }
  if (!paymentConfirmed) {
    setPaymentConfirmedError('Please confirm your payment before finishing.');
    return;
  }
  navigate('/thank-you');
};


// --------------------
// Waitlist form logic
// --------------------
interface WaitlistFormInputs {
  fullName: string;
  email: string;
  phone?: string;
}

const {
  register: registerWaitlist,
  handleSubmit: handleWaitlistSubmit,
  reset: resetWaitlist,
  formState: { errors: waitlistErrors },
} = useForm<WaitlistFormInputs>();

const onWaitlistSubmit = async (data: WaitlistFormInputs) => {
  if (!tripId) return;

  try {
    const { error } = await supabase.from('waitlist').insert([
      {
        trip_id: tripId,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone ?? null,
      },
    ]);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('You have been added to the waitlist.');
    resetWaitlist();
    setShowWaitlistModal(false);
  } catch {
    toast.error('Something went wrong. Please try again.');
  }
};

const clickableCard =
  "cursor-pointer transition will-change-transform hover:shadow-md hover:-translate-y-[1px] active:translate-y-0";




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



  useEffect(() => {
    if (isLoadingTrip) {
      document.body.classList.add('booking-loading');
    } else {
      document.body.classList.remove('booking-loading');
    }
  
    return () => {
      document.body.classList.remove('booking-loading');
    };
  }, [isLoadingTrip]);
  





  if (isLoadingTrip) {
    return null;
  }


  return (
    <div className="min-h-screen bg-gray-50">
{/* Hero Section */}
<section className="relative h-[58vh] md:h-[58vh] flex items-center justify-center overflow-hidden">
  <img
    src="https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1600/v1766869280/alpine-skiing-panorama-hero.webp_nhhysp.webp"
    alt="Panoramic view of high-altitude alpine ski terrain with snow-covered mountains under a clear sky."
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/45"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center text-white relative z-10"
>
 {/* increased top margin to move block down */}  
    
      <div className="flex items-center justify-center space-x-3 mb-2 md:mb-4">
      <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.1] drop-shadow-lg">

        {trip?.title ?? 'Loading trip...'}

        </h1>
      </div>

      <p className="text-lg md:text-xl font-normal text-white/90 max-w-4xl mx-auto drop-shadow-md mb-5">

      {trip?.location ?? ''}

      </p>

      <p className="text-base md:text-lg text-white/85 max-w-4xl mx-auto leading-relaxed drop-shadow-md mb-6">

      {trip?.hero_description ?? ''}

      </p>

      <p className="text-2xl text-white font-semibold max-w-4xl mx-auto drop-shadow-md mb-7">
  {trip
    ? `${new Date(trip.start_date).toLocaleDateString('en-GB', {
        day: 'numeric',
      })} – ${new Date(trip.end_date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`
    : ''}
</p>


      {/* Grouped Total Trip Price and Price */}
      <div className="max-w-4xl mx-auto drop-shadow-md">
        <p className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-0">
          Trip Price
        </p>
        <p className="text-3xl font-bold text-primary-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] mt-1">
        {trip?.hero_price ?? ''}

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
          (Airline carriage fees may apply — details will be sent closer to the trip)
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
                            <div className="text-sm text-gray-600">(Subject to availability)</div>
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
  {trip?.travel_information && (
    <div
      className="space-y-4"
      dangerouslySetInnerHTML={{ __html: trip.travel_information }}
    />
  )}

  {trip?.important_notice && (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-700">
      <div dangerouslySetInnerHTML={{ __html: trip.important_notice }} />
    </div>
  )}
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
                            <div className="font-medium text-gray-900">I'll be flying with the group from {departureAirport ?? 'London Heathrow'}
</div>
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
                              <div className="text-sm text-gray-600 mt-1">I will join the group coach transfer from {transferAirport ?? 'Geneva'}
</div>
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
  I have read and agree to the{' '}
  <a
    href="/termsofservice"
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary-600 underline underline-offset-2 hover:text-primary-700 cursor-pointer"
  >
    terms of service
  </a>
  , including the{' '}
  <a
    href="/refund-policy"
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary-600 underline underline-offset-2 hover:text-primary-700 cursor-pointer"
  >
    refund policy
  </a>
  . *
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
{trip?.payment_explanation && (
  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded text-blue-900 text-sm leading-relaxed font-medium">
    <h4 className="font-semibold text-base mb-2">💳 Payment</h4>

    {trip?.deposit_enabled ? (
      <p
        className="mb-2"
        dangerouslySetInnerHTML={{ __html: trip.payment_explanation }}
      />
    ) : (
      <p className="mb-0">
        Full payment is required to confirm your booking.
      </p>
    )}
  </div>
)}



{/* 3. Subheader */}
<h3 className="text-xl font-semibold text-gray-900 mb-2">
  How would you like to pay?
</h3>
<p className="text-sm text-gray-600 mb-5">
  Select an option below to continue.
</p>

{/* One-step payment options (amounts always visible) */}
{(() => {
  const depositEnabled = trip?.deposit_enabled ?? false;

 
  const paymentOptions = [



    {
      id: 'full_bank',
      method: 'bankTransfer',
      amountType: 'full',
      title: 'Bank Transfer',
      note: 'Full payment • No fees',
      amount: fullAmount,
      meta: null,
      url: monzoLinks.bank.full,
    },
    


    {
      id: 'full_card',
      method: 'cardPayment',
      amountType: 'full',
      title: 'Card',
      note: 'Full payment • 2% fee',
      amount: fullAmountCard,
      meta: null, // ✅ removes the duplicated "(incl. 2% fee)"
      url: monzoLinks.card.full,
    },
    


    ...(depositEnabled
      ? [
        {
          id: 'deposit_bank',
          method: 'bankTransfer',
          amountType: 'deposit',
          title: 'Bank Transfer',
          note: 'Deposit • No fees',
          amount: depositAmount,
          meta: balanceDueDate
            ? `Remaining balance due ${new Date(balanceDueDate).toLocaleDateString('en-GB')}`
            : null,
          url: monzoLinks.bank.deposit,
        },
        

        {
          id: 'deposit_card',
          method: 'cardPayment',
          amountType: 'deposit',
          title: 'Card',
          note: 'Deposit • 2% fee',
          amount: depositAmountCard,
          meta: balanceDueDate
            ? `Remaining balance due ${new Date(balanceDueDate).toLocaleDateString('en-GB')}`
            : null,
          url: monzoLinks.card.deposit,
        },
        

        ]
      : []),
  
    ] as Array<{
      id: string;
      method: 'bankTransfer' | 'cardPayment';
      amountType: 'full' | 'deposit';
      title: string;
      note: string;
      amount: number | null;
      meta: string | null;
      url: string | null;
    }>;
  


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {paymentOptions.map((opt) => {
        const isSelected =
          paymentMethod === opt.method &&
          selectedPaymentAmount === opt.amountType;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => {
              // Select both method + amount in one tap
              setPaymentMethod(opt.method);
              setSelectedPaymentAmount(opt.amountType);

              // Set link and open confirmation modal
              setPaymentUrl(opt.url);
              setShowPaymentModal(true);
            }}
            className={`w-full rounded-2xl border p-4 sm:p-5 text-left transition
              ${isSelected
                ? 'border-gray-300 bg-white ring-2 ring-gray-200 shadow-sm'
                : 'border-gray-200 bg-white hover:bg-gray-50/60'
              } ${clickableCard}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-gray-900">
                    {opt.title}
                  </div>

                  <span className="text-[11px] font-medium text-gray-600 bg-gray-100 border border-gray-200 px-2 py-1 rounded-full">
  {opt.note}
</span>



                </div>

                {opt.amount !== null && (
                  <div className="mt-3 text-xl font-semibold tracking-tight text-gray-900">
                    £{opt.amount}{' '}
                    {opt.meta ? (
                      <span className="text-sm font-normal text-gray-600">
                        {opt.meta}
                      </span>
                    ) : null}
                  </div>
                )}

                <div className="mt-2 text-xs font-medium text-gray-500">
                  Tap to select
                </div>
              </div>

              {isSelected ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 shrink-0" />
              ) : (
                <div className="h-5 w-5 mt-1 shrink-0 rounded-full border border-gray-300" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
})()}









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
       

                            <button
  type="button"
  onClick={() => {

    if (paymentUrl) {
      window.open(paymentUrl, '_blank', 'noopener,noreferrer');
    }

    
  }}
  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
>
  Proceed to Payment
</button>






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
                <div className="flex justify-between gap-3 pt-8 border-t">
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
  isSoldOut ? (
    <button
      type="button"
      onClick={() => setShowWaitlistModal(true)}
      className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium h-11 leading-5 hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      Join waitlist
    </button>
  ) : (
    <button
      type="button"
      onClick={nextStep}
      className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium h-11 leading-5 hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      Next
      <ArrowRight className="h-4 w-4 ml-2" />
    </button>
  )
) : (


<button
  type="submit"
  disabled={isSubmitting}
  className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium h-11 leading-5 hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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


      
      {/* Waitlist Modal */}
{showWaitlistModal && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={() => setShowWaitlistModal(false)}
  >
    <div
      className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setShowWaitlistModal(false)}
        className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 text-center">
        Join the waitlist
      </h2>

      <p className="text-gray-700 text-center mb-6">
        This trip is currently full. Enter your details below and we’ll notify you if a spot becomes available.
      </p>

      <form
        onSubmit={handleWaitlistSubmit(onWaitlistSubmit)}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full name *
          </label>
          <input
            type="text"
            {...registerWaitlist('fullName', { required: 'Full name is required' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {waitlistErrors.fullName && (
            <p className="text-sm text-red-600 mt-1">
              {waitlistErrors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email address *
          </label>
          <input
            type="email"
            {...registerWaitlist('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {waitlistErrors.email && (
            <p className="text-sm text-red-600 mt-1">
              {waitlistErrors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone number (optional)
          </label>
          <input
            type="tel"
            {...registerWaitlist('phone')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-transform duration-300 hover:scale-105"
        >
          Join waitlist
        </button>
      </form>
    </div>
  </div>
)}





    </div>
  );
};

export default BookingPage;
