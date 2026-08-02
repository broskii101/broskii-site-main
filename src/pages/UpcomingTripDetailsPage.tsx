import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  CalendarDays,
  CheckCircle,
  Clock3,
  Mail,
  MapPin,
  Mountain,
  Phone,
  Plane,
  Send,
  Sparkles,
  Users,
  X
} from 'lucide-react';
import {
  useFieldArray,
  useForm
} from 'react-hook-form';
import toast from 'react-hot-toast';

import { supabase } from '../lib/supabaseClient';

/* =========================================================
   CONSTANTS
   ========================================================= */

const JANUARY_2027_TRIP_ID =
  '6db8abe3-efa0-4847-a90d-2fb944fd36a8';

const FAMILY_TRIP_STATUS:
  | 'enquiries_open'
  | 'limited'
  | 'sold_out' = 'enquiries_open';

const IMAGES = {
  pageHero:
    'https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1600/v1766874462/broskii-skiing-action-alpine-hero.webp_qlnwfp.webp',

  seasonPoster:
    'https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/v1785682931/broskii-2026-2027-ski-season-poster.webp_lynqvu.jpg',

  decemberFamily:
    'https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1400/v1785684164/broskii-family-ski-trip-december-2026.webp_chycxd.jpg',

  januaryValThorens:
    'https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1400/v1785684467/broskii-val-thorens-january-2027.webp_qinxth.jpg',

  aprilValThorens:
    'https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1400/v1785684117/broskii-val-thorens-april-2027.webp_lfgweu.jpg',

  april2026Poster:
    'https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/v1769048687/broskii-tignes-april-ski-trip-poster_zpf1oe.jpg',

  january2026Poster:
    'https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/broskii-val-thorens-ski-3-valleys-january-2026-sold-out_ijudjp.jpg',

  january2025Poster:
    'https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/broskii-val-thorens-ski-3-valleys-january-2025-sold-out_pjrvzr.jpg',

  december2024Poster:
    'https://res.cloudinary.com/dtx0og5tm/image/upload/f_auto,q_auto,w_1200/broskii-tignes-val-disere-december-2024-sold-out_jlsgmn.jpg'
};

/* =========================================================
   TYPES
   ========================================================= */

interface SupabaseTripAvailability {
  id: string;
  capacity: number | null;
  booked_count: number | null;
  status: string | null;
}

interface SelectedWaitlistTrip {
  id: string;
  title: string;
}

interface WaitlistFormInputs {
  fullName: string;
  email: string;
  phone: string;
}

type SkiExperience =
  | 'never-skied'
  | 'beginner'
  | 'intermediate'
  | 'advanced';

type SkiPassRequirement =
  | 'yes'
  | 'no'
  | 'not-sure';

interface FamilyTraveller {
  travellerType: 'adult' | 'child';
  age: string;
  skiExperience: SkiExperience | '';
  skiPassRequired: SkiPassRequirement | '';
}

interface FamilyQuoteFormInputs {
  leadName: string;
  email: string;
  phone: string;
  adultCount: string;
  childCount: string;
  sameExperience: 'yes' | 'no' | '';
  sharedExperience: SkiExperience | '';
  sharedSkiPass: SkiPassRequirement | '';
  travellers: FamilyTraveller[];
  additionalInformation: string;
}

/* =========================================================
   HELPERS
   ========================================================= */

const isTripSoldOut = (
  trip: SupabaseTripAvailability | null
): boolean => {
  if (!trip) return false;

  if (
    trip.status === 'full' ||
    trip.status === 'sold_out'
  ) {
    return true;
  }

  if (
    typeof trip.capacity === 'number' &&
    typeof trip.booked_count === 'number'
  ) {
    return trip.booked_count >= trip.capacity;
  }

  return false;
};

const getSkiExperienceLabel = (
  value: FamilyTraveller['skiExperience']
) => {
  switch (value) {
    case 'never-skied':
      return 'Never skied';
    case 'beginner':
      return 'Beginner';
    case 'intermediate':
      return 'Intermediate';
    case 'advanced':
      return 'Advanced';
    default:
      return 'Not provided';
  }
};

const getSkiPassLabel = (
  value: FamilyTraveller['skiPassRequired']
) => {
  switch (value) {
    case 'yes':
      return 'Yes';
    case 'no':
      return 'No';
    case 'not-sure':
      return 'Not sure';
    default:
      return 'Not provided';
  }
};

/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

const IncludedItem = ({
  children
}: {
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
    <span className="text-[0.95rem] font-medium leading-relaxed text-gray-800">
      {children}
    </span>
  </div>
);

const TripImage = ({
  src,
  alt,
  onClick
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="block w-full overflow-hidden text-left"
    aria-label={`Open full-size image: ${alt}`}
  >
    <img
      src={src}
      alt={alt}
      className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
    />
  </button>
);

const PastTripPoster = ({
  label,
  src,
  alt,
  onOpen
}: {
  label: string;
  src: string;
  alt: string;
  onOpen: () => void;
}) => (
  <article className="mx-auto w-full max-w-sm">
    <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
      {label}
    </p>

    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onOpen}
        className="block w-full"
        aria-label={`View ${label} trip poster`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full object-cover opacity-95 transition-transform duration-500 hover:scale-[1.02]"
        />
      </button>

      <div className="absolute right-3 top-3 rounded-full bg-gray-950/90 px-4 py-1.5 text-xs font-bold tracking-wide text-white shadow-md">
        SOLD OUT
      </div>
    </div>
  </article>
);

/* =========================================================
   PAGE
   ========================================================= */

const UpcomingTripDetailsPage = () => {
  const [fullScreenImage, setFullScreenImage] =
    React.useState<string | null>(null);

  const [
    januaryAvailability,
    setJanuaryAvailability
  ] = React.useState<SupabaseTripAvailability | null>(
    null
  );

  const [
    availabilityLoading,
    setAvailabilityLoading
  ] = React.useState(true);

  const [
    availabilityError,
    setAvailabilityError
  ] = React.useState(false);

  const [
    showFamilyQuoteModal,
    setShowFamilyQuoteModal
  ] = React.useState(false);

  const [
    showWaitlistModal,
    setShowWaitlistModal
  ] = React.useState(false);

  const [
    selectedWaitlistTrip,
    setSelectedWaitlistTrip
  ] = React.useState<SelectedWaitlistTrip | null>(
    null
  );

  /* ---------------------------------------------------------
     FAMILY QUOTE FORM
     --------------------------------------------------------- */

  const {
    register: registerFamily,
    control: familyControl,
    handleSubmit: handleFamilySubmit,
    reset: resetFamilyForm,
    watch: watchFamily,
    setValue: setFamilyValue,
    formState: {
      errors: familyErrors,
      isSubmitting: familySubmitting
    }
  } = useForm<FamilyQuoteFormInputs>({
    defaultValues: {
      leadName: '',
      email: '',
      phone: '',
      adultCount: '1',
      childCount: '0',
      sameExperience: '',
      sharedExperience: '',
      sharedSkiPass: '',
      travellers: [
        {
          travellerType: 'adult',
          age: '',
          skiExperience: '',
          skiPassRequired: ''
        }
      ],
      additionalInformation: ''
    }
  });

  const {
    fields: travellerFields,
    replace: replaceTravellers
  } = useFieldArray({
    control: familyControl,
    name: 'travellers'
  });

  const adultCount = Number(
    watchFamily('adultCount') || 1
  );
  const childCount = Number(
    watchFamily('childCount') || 0
  );
  const sameExperience =
    watchFamily('sameExperience');
  const sharedExperience =
    watchFamily('sharedExperience');
  const sharedSkiPass =
    watchFamily('sharedSkiPass');

  React.useEffect(() => {
    const travellers: FamilyTraveller[] = [
      ...Array.from(
        { length: adultCount },
        () => ({
          travellerType: 'adult' as const,
          age: '',
          skiExperience: '',
          skiPassRequired: ''
        })
      ),
      ...Array.from(
        { length: childCount },
        () => ({
          travellerType: 'child' as const,
          age: '',
          skiExperience: '',
          skiPassRequired: ''
        })
      )
    ];

    replaceTravellers(travellers);
  }, [
    adultCount,
    childCount,
    replaceTravellers
  ]);

  React.useEffect(() => {
    if (
      sameExperience === 'yes' &&
      sharedExperience
    ) {
      travellerFields.forEach((_, index) => {
        setFamilyValue(
          `travellers.${index}.skiExperience`,
          sharedExperience,
          { shouldValidate: true }
        );

        const defaultSkiPass:
          | SkiPassRequirement
          | '' =
          sharedExperience === 'intermediate' ||
          sharedExperience === 'advanced'
            ? 'yes'
            : 'no';

        setFamilyValue(
          `travellers.${index}.skiPassRequired`,
          defaultSkiPass,
          { shouldValidate: true }
        );
      });
    }
  }, [
    sameExperience,
    sharedExperience,
    travellerFields,
    setFamilyValue
  ]);

  React.useEffect(() => {
    if (sharedSkiPass) {
      travellerFields.forEach((_, index) => {
        setFamilyValue(
          `travellers.${index}.skiPassRequired`,
          sharedSkiPass,
          { shouldValidate: true }
        );
      });
    }
  }, [
    sharedSkiPass,
    travellerFields,
    setFamilyValue
  ]);

  /* ---------------------------------------------------------
     WAITLIST FORM
     --------------------------------------------------------- */

  const {
    register: registerWaitlist,
    handleSubmit: handleWaitlistSubmit,
    reset: resetWaitlistForm,
    formState: {
      errors: waitlistErrors,
      isSubmitting: waitlistSubmitting
    }
  } = useForm<WaitlistFormInputs>();

  /* ---------------------------------------------------------
     LOAD JANUARY AVAILABILITY
     --------------------------------------------------------- */

  React.useEffect(() => {
    let isMounted = true;

    const loadJanuaryAvailability = async () => {
      setAvailabilityLoading(true);
      setAvailabilityError(false);

      const { data, error } = await supabase
        .from('trips')
        .select(
          'id, capacity, booked_count, status'
        )
        .eq('id', JANUARY_2027_TRIP_ID)
        .single();

      if (!isMounted) return;

      if (error) {
        console.error(
          'Unable to load January trip availability:',
          error
        );
        setAvailabilityError(true);
      } else {
        setJanuaryAvailability(data);
      }

      setAvailabilityLoading(false);
    };

    loadJanuaryAvailability();

    return () => {
      isMounted = false;
    };
  }, []);

  const januarySoldOut = isTripSoldOut(
    januaryAvailability
  );

  /* ---------------------------------------------------------
     IMAGE MODAL
     --------------------------------------------------------- */

  const openFullScreenImage = (src: string) => {
    setFullScreenImage(src);
  };

  const closeFullScreenImage = () => {
    setFullScreenImage(null);
  };

  /* ---------------------------------------------------------
     FAMILY FORM MODAL
     --------------------------------------------------------- */

  const closeFamilyQuoteModal = () => {
    setShowFamilyQuoteModal(false);
  };

  const onFamilyQuoteSubmit = async (
    data: FamilyQuoteFormInputs
  ) => {
    const travellerSummary = data.travellers
      .map((traveller, index) => {
        const adultNumber = data.travellers
          .slice(0, index + 1)
          .filter(
            (item) =>
              item.travellerType === 'adult'
          ).length;

        const childNumber = data.travellers
          .slice(0, index + 1)
          .filter(
            (item) =>
              item.travellerType === 'child'
          ).length;

        const label =
          traveller.travellerType === 'adult'
            ? adultNumber === 1
              ? 'Adult 1 (Lead traveller)'
              : `Adult ${adultNumber}`
            : `Child ${childNumber}`;

        const ageText =
          traveller.travellerType === 'child'
            ? `\nAge: ${traveller.age || 'Not provided'}`
            : '';

        return [
          `${label}:`,
          `Type: ${
            traveller.travellerType === 'adult'
              ? 'Adult'
              : 'Child'
          }${ageText}`,
          `Ski experience: ${getSkiExperienceLabel(
            traveller.skiExperience
          )}`,
          `Ski pass required: ${getSkiPassLabel(
            traveller.skiPassRequired
          )}`
        ].join('\n');
      })
      .join('\n\n');

    const message = `
FAMILY SKI TRIP QUOTE REQUEST

Trip:
Les Arcs Family Ski Trip
12–19 December 2026

LEAD TRAVELLER

Name:
${data.leadName}

Email:
${data.email}

Phone:
${data.phone}

FAMILY

Adults:
${data.adultCount}

Children:
${data.childCount}

SKIING REQUIREMENTS

${travellerSummary}

ADDITIONAL INFORMATION

${data.additionalInformation || 'None provided'}
    `.trim();

    try {
      const response = await fetch(
        '/.netlify/functions/sendContactMessage',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: data.leadName,
            email: data.email,
            phone: data.phone,
            subject:
              'Family Trip Quote Request – Les Arcs December 2026',
            message
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          'The family quote request could not be sent.'
        );
      }

      toast.success(
        'Your personalised quote request has been sent.'
      );

      resetFamilyForm();
      setShowFamilyQuoteModal(false);
    } catch (error) {
      console.error(error);
      toast.error(
        'Sorry, your request could not be sent. Please try again.'
      );
    }
  };

  /* ---------------------------------------------------------
     WAITLIST MODAL
     --------------------------------------------------------- */

  const openWaitlist = (
    trip: SelectedWaitlistTrip
  ) => {
    setSelectedWaitlistTrip(trip);
    setShowWaitlistModal(true);
  };

  const closeWaitlist = () => {
    setShowWaitlistModal(false);
    setSelectedWaitlistTrip(null);
    resetWaitlistForm();
  };

  const onWaitlistSubmit = async (
    data: WaitlistFormInputs
  ) => {
    if (!selectedWaitlistTrip) {
      toast.error('No trip was selected.');
      return;
    }

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({
          trip_id: selectedWaitlistTrip.id,
          full_name: data.fullName.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone?.trim() || null
        });

      if (error?.code === '23505') {
        toast.error(
          'This email is already on the waitlist for this trip.'
        );
        return;
      }

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success(
        `You joined the waitlist for ${selectedWaitlistTrip.title}.`
      );

      closeWaitlist();
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred.');
    }
  };

  const premiumReveal = {
    initial: {
      opacity: 0,
      y: 16
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: true,
      amount: 0.15
    },
    transition: {
      duration: 0.55
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Upcoming Ski Trips 2026/27 | Broskii
        </title>

        <meta
          name="description"
          content="Explore Broskii's 2026/27 ski trips to Les Arcs and Val Thorens, including a family ski package and group trips to the Three Valleys."
        />

        <link
          rel="canonical"
          href="https://broskii.com/upcoming-trip/"
        />
      </Helmet>

      <div className="min-h-screen overflow-x-hidden bg-gray-50">
        {/* =================================================
            HERO
            ================================================= */}

        <section className="relative flex min-h-[36vh] items-center overflow-hidden sm:min-h-[42vh]">
          <img
            src={IMAGES.pageHero}
            alt="Skiers descending an alpine mountain during a Broskii ski trip"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6">
            <motion.div
              initial={{
                opacity: 0,
                y: 16
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6
              }}
              className="mx-auto max-w-3xl text-center text-white"
            >
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-primary-100">
                Broskii 2026/27
              </p>

              <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Upcoming Trips
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                Family adventures, premium group trips and
                unforgettable weeks in the French Alps.
              </p>
            </motion.div>
          </div>
        </section>

        {/* =================================================
            SEASON POSTER
            ================================================= */}

        <section className="border-b border-gray-200 bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <motion.div
              {...premiumReveal}
              className="mx-auto max-w-lg text-center"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                The season line-up
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Three trips. One unforgettable season.
              </h2>

              <p className="mt-4 leading-relaxed text-gray-600">
                Tap the poster to view the complete
                2026/27 trip line-up.
              </p>
            </motion.div>

            <motion.div
              {...premiumReveal}
              className="mx-auto mt-8 w-[92%] max-w-md"
            >
              <button
                type="button"
                onClick={() =>
                  openFullScreenImage(
                    IMAGES.seasonPoster
                  )
                }
                className="block w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10"
                aria-label="Open the Broskii 2026/27 season poster"
              >
                <img
                  src={IMAGES.seasonPoster}
                  alt="Broskii 2026 and 2027 upcoming ski trips poster showing Les Arcs and Val Thorens trips"
                  className="w-full object-contain"
                />
              </button>

              <p className="mt-4 text-center text-sm font-medium text-gray-500">
                Tap to view full size
              </p>
            </motion.div>
          </div>
        </section>

        {/* =================================================
            ACTIVE TRIPS
            ================================================= */}

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className="mb-10 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">
                Choose your trip
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                2026/27 ski trips
              </h2>
            </div>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
              {/* =============================================
                  DECEMBER FAMILY TRIP
                  ============================================= */}

              <motion.article
                {...premiumReveal}
                className="overflow-hidden rounded-3xl border border-amber-200/70 bg-white shadow-lg shadow-gray-900/5"
              >
                <TripImage
                  src={IMAGES.decemberFamily}
                  alt="Family enjoying a ski holiday in the French Alps"
                  onClick={() =>
                    openFullScreenImage(
                      IMAGES.decemberFamily
                    )
                  }
                />

                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-800">
                      Family trip
                    </span>

                    {FAMILY_TRIP_STATUS ===
                      'limited' && (
                      <span className="rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-700">
                        Limited availability
                      </span>
                    )}

                    {FAMILY_TRIP_STATUS ===
                      'sold_out' && (
                      <span className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                        Sold out
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-serif text-3xl font-bold text-gray-900">
                    Les Arcs
                  </h3>

                  <div className="mt-4 space-y-2 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary-600" />
                      <span>
                        12–19 December 2026
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary-600" />
                      <span>
                        Les Arcs, French Alps
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 leading-relaxed text-gray-700">
                    Stay in a 4★ ski-in / ski-out hotel
                    in Les Arcs with spa facilities, while
                    we tailor your family’s ski holiday
                    around your group size, skiing ability
                    and lesson requirements.
                  </p>

                  <div className="mt-7">
                    <h4 className="font-serif text-xl font-bold text-gray-900">
                      Package includes
                    </h4>

                    <div className="mt-4 space-y-3">
                      <IncludedItem>
                        4★ ski-in / ski-out hotel
                        accommodation
                      </IncludedItem>

                      <IncludedItem>
                        Spa facilities
                      </IncludedItem>

                      <IncludedItem>
                        Ski passes tailored to each
                        traveller’s requirements
                      </IncludedItem>

                      <IncludedItem>
                        Ski and snowboard lessons arranged
                        with trusted local ski schools
                      </IncludedItem>

                      <IncludedItem>
                        Options for first-time, beginner,
                        intermediate and advanced skiers
                      </IncludedItem>
                    </div>
                  </div>

                  <div className="mt-7 border-t border-gray-100 pt-6">
                    <p className="font-serif text-2xl font-bold text-gray-900">
                      Travel
                    </p>

                    <p className="mt-2 leading-relaxed text-gray-700">
                      Most Broskii families choose to
                      drive directly to the resort, giving
                      you the flexibility to travel on
                      your own schedule and bring
                      everything you need for the week.
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Travel is self-arranged. We’ll
                      provide full arrival information
                      before your trip.
                    </p>

                    {FAMILY_TRIP_STATUS ===
                    'sold_out' ? (
                      <div className="mt-5 flex w-full items-center justify-center rounded-full bg-gray-200 px-6 py-4 font-bold text-gray-600">
                        Sold out
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setShowFamilyQuoteModal(true)
                        }
                        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-amber-600 px-6 py-4 text-base font-bold text-white shadow-lg transition hover:bg-amber-700"
                      >
                        Request a Quote
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>

              {/* =============================================
                  JANUARY BOOKABLE TRIP
                  ============================================= */}

              <motion.article
                {...premiumReveal}
                className="overflow-hidden rounded-3xl border border-primary-200 bg-white shadow-xl shadow-primary-900/10 lg:-translate-y-3"
              >
                <TripImage
                  src={IMAGES.januaryValThorens}
                  alt="Val Thorens ski slopes during the January winter season"
                  onClick={() =>
                    openFullScreenImage(
                      IMAGES.januaryValThorens
                    )
                  }
                />

                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-primary-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                      Bookings open
                    </span>

                    <span className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-700">
                      Group ski trip
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-3xl font-bold text-gray-900">
                    Val Thorens
                  </h3>

                  <div className="mt-4 space-y-2 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary-600" />
                      <span>
                        16–23 January 2027
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary-600" />
                      <span>
                        Val Thorens, French Alps
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 leading-relaxed text-gray-700">
                    Stay at L'Oxalys, a 4★ ski-in /
                    ski-out hotel in Europe’s highest ski
                    resort, with direct access to the
                    legendary Three Valleys ski area.
                  </p>

                  <div className="mt-7 space-y-3">
                    <IncludedItem>
                      British Airways return flights from
                      London Heathrow
                    </IncludedItem>

                    <IncludedItem>
                      23 kg checked baggage plus cabin bag
                    </IncludedItem>

                    <IncludedItem>
                      Private coach transfers from Lyon
                    </IncludedItem>

                    <IncludedItem>
                      4★ L'Oxalys ski-in / ski-out hotel
                    </IncludedItem>

                    <IncludedItem>
                      Spa facilities
                    </IncludedItem>

                    <IncludedItem>
                      Full Three Valleys ski pass
                    </IncludedItem>

                    <IncludedItem>
                      Ski and snowboard lessons arranged
                      with trusted local ski schools
                    </IncludedItem>
                  </div>

                  <div className="mt-7 rounded-2xl bg-primary-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
                      Package price
                    </p>

                    <p className="mt-1 font-serif text-4xl font-bold text-gray-900">
                      £1,300
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-600">
                      Per person
                    </p>

                    <div className="mt-4 border-t border-primary-100 pt-4">
                      <p className="font-bold text-gray-900">
                        Secure your place with a £300
                        deposit
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        Remaining balance due by 10
                        October 2026.
                      </p>
                    </div>
                  </div>

                  <div className="mt-7">
                    {availabilityLoading ? (
                      <div className="flex w-full items-center justify-center rounded-full bg-gray-200 px-6 py-4 font-bold text-gray-600">
                        Checking availability…
                      </div>
                    ) : availabilityError ? (
                      <Link
                        to="/contact"
                        className="inline-flex w-full items-center justify-center rounded-full bg-gray-900 px-6 py-4 font-bold text-white transition hover:bg-black"
                      >
                        Contact us to book
                      </Link>
                    ) : januarySoldOut ? (
                      <div className="text-center">
                        <div className="flex w-full items-center justify-center rounded-full bg-gray-200 px-6 py-4 font-bold text-gray-700">
                          Sold out
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            openWaitlist({
                              id: JANUARY_2027_TRIP_ID,
                              title:
                                'Val Thorens – January 2027'
                            })
                          }
                          className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-600 transition hover:text-primary-700"
                        >
                          Join waitlist
                          <span aria-hidden="true">
                            →
                          </span>
                        </button>
                      </div>
                    ) : (
                      <Link
                        to={`/booking/${JANUARY_2027_TRIP_ID}`}
                        className="inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-6 py-4 text-base font-bold text-white shadow-lg transition hover:bg-primary-700"
                      >
                        Book with £300 Deposit
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>

              {/* =============================================
                  APRIL COMING SOON
                  ============================================= */}

              <motion.article
                {...premiumReveal}
                className="overflow-hidden rounded-3xl border border-sky-200 bg-white shadow-lg shadow-gray-900/5"
              >
                <TripImage
                  src={IMAGES.aprilValThorens}
                  alt="Sunny late-season skiing in Val Thorens during April"
                  onClick={() =>
                    openFullScreenImage(
                      IMAGES.aprilValThorens
                    )
                  }
                />

                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-sky-800">
                      Confirmed trip
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-gray-600">
                      Coming soon
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-3xl font-bold text-gray-900">
                    Val Thorens
                  </h3>

                  <div className="mt-4 space-y-2 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary-600" />
                      <span>
                        10–17 April 2027
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary-600" />
                      <span>
                        Val Thorens, French Alps
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 leading-relaxed text-gray-700">
                    Our April 2027 Val Thorens trip is
                    confirmed, offering a full week of
                    high-altitude late-season skiing in
                    the Three Valleys.
                  </p>

                  <div className="mt-7 rounded-2xl bg-sky-50 p-5">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-700" />

                      <div>
                        <p className="font-bold text-gray-900">
                          Booking details coming soon
                        </p>

                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                          Package details and pricing will
                          be released once flights are
                          confirmed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7">
                    <div
                      aria-disabled="true"
                      className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border-2 border-sky-200 bg-sky-50 px-6 py-4 font-bold text-sky-800"
                    >
                      <Clock3 className="h-5 w-5" />
                      Bookings Open Oct / Nov
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        {/* =================================================
            PAST TRIPS
            ================================================= */}

        <section className="border-t border-gray-200 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
                The journey so far
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Past Broskii trips
              </h2>

              <p className="mt-4 leading-relaxed text-gray-600">
                A look back at previous sold-out Broskii
                ski trips.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <PastTripPoster
                label="April 2026"
                src={IMAGES.april2026Poster}
                alt="Broskii Tignes April 2026 ski trip poster marked sold out"
                onOpen={() =>
                  openFullScreenImage(
                    IMAGES.april2026Poster
                  )
                }
              />

              <PastTripPoster
                label="January 2026"
                src={IMAGES.january2026Poster}
                alt="Broskii Val Thorens January 2026 ski trip poster marked sold out"
                onOpen={() =>
                  openFullScreenImage(
                    IMAGES.january2026Poster
                  )
                }
              />

              <PastTripPoster
                label="January 2025"
                src={IMAGES.january2025Poster}
                alt="Broskii Val Thorens January 2025 ski trip poster marked sold out"
                onOpen={() =>
                  openFullScreenImage(
                    IMAGES.january2025Poster
                  )
                }
              />

              <PastTripPoster
                label="December 2024"
                src={IMAGES.december2024Poster}
                alt="Broskii December 2024 ski trip poster marked sold out"
                onOpen={() =>
                  openFullScreenImage(
                    IMAGES.december2024Poster
                  )
                }
              />
            </div>
          </div>
        </section>

        {/* =================================================
            FULL-SCREEN IMAGE MODAL
            ================================================= */}

        {fullScreenImage && (
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={closeFullScreenImage}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                duration: 0.25
              }}
              className="relative max-h-full max-w-4xl"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <img
                src={fullScreenImage}
                alt="Full-size Broskii trip image"
                className="max-h-[92vh] max-w-full rounded-xl object-contain"
              />

              <button
                type="button"
                onClick={closeFullScreenImage}
                className="absolute right-3 top-3 rounded-full bg-black/65 p-2 text-white transition hover:bg-black"
                aria-label="Close image"
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* =================================================
            FAMILY QUOTE MODAL
            ================================================= */}

        {showFamilyQuoteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-black/65 p-0 backdrop-blur-sm sm:items-center sm:p-5"
            onClick={closeFamilyQuoteModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeFamilyQuoteModal}
                className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close family quote form"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="pr-10">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
                  Les Arcs · 12–19 December 2026
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900">
                  Request a Family Trip Quote
                </h2>
                <p className="mt-3 leading-relaxed text-gray-600">
                  Tell us a little about your family and we’ll prepare a
                  personalised quote based on your group size and skiing
                  requirements.
                </p>
              </div>

              <form
                onSubmit={handleFamilySubmit(onFamilyQuoteSubmit)}
                className="mt-8 space-y-8"
              >
                <section>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">
                    Step 1 of 3
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-gray-900">
                    Your Details
                  </h3>

                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Full name *
                      </label>
                      <input
                        type="text"
                        {...registerFamily('leadName', {
                          required: 'Full name is required'
                        })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                        placeholder="Your full name"
                      />
                      {familyErrors.leadName && (
                        <p className="mt-1 text-sm text-red-600">
                          {familyErrors.leadName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Email address *
                      </label>
                      <input
                        type="email"
                        {...registerFamily('email', {
                          required: 'Email address is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Enter a valid email address'
                          }
                        })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                        placeholder="you@example.com"
                      />
                      {familyErrors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {familyErrors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Phone number *
                      </label>
                      <input
                        type="tel"
                        {...registerFamily('phone', {
                          required: 'Phone number is required'
                        })}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                        placeholder="Your phone number"
                      />
                      {familyErrors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {familyErrors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                <section className="border-t border-gray-100 pt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">
                    Step 2 of 3
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-gray-900">
                    Your Family
                  </h3>

                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        How many adults? *
                      </label>
                      <select
                        {...registerFamily('adultCount', {
                          required: 'Select the number of adults'
                        })}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      >
                        {Array.from({ length: 8 }, (_, index) => index + 1).map(
                          (count) => (
                            <option key={count} value={count}>
                              {count}
                            </option>
                          )
                        )}
                      </select>
                      <p className="mt-2 text-xs text-gray-500">
                        Includes the lead traveller.
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        How many children? *
                      </label>
                      <select
                        {...registerFamily('childCount', {
                          required: 'Select the number of children'
                        })}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      >
                        {Array.from({ length: 9 }, (_, index) => index).map(
                          (count) => (
                            <option key={count} value={count}>
                              {count}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </section>

                <section className="border-t border-gray-100 pt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">
                    Step 3 of 3
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-gray-900">
                    Skiing Requirements
                  </h3>

                  <div className="mt-5 space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Does everyone have the same ski experience? *
                      </label>
                      <select
                        {...registerFamily('sameExperience', {
                          required: 'Select an option'
                        })}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    {sameExperience === 'yes' && (
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Ski experience *
                        </label>
                        <select
                          {...registerFamily('sharedExperience', {
                            required: 'Select a ski experience level'
                          })}
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Select experience</option>
                          <option value="never-skied">First Time</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Does everyone require a ski pass? *
                      </label>
                      <select
                        {...registerFamily('sharedSkiPass', {
                          required: 'Select a ski-pass option'
                        })}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No — select individually</option>
                        <option value="not-sure">Not sure</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {travellerFields.map((field, index) => {
                      const isAdult = index < adultCount;
                      const adultNumber = index + 1;
                      const childNumber = index - adultCount + 1;
                      const label = isAdult
                        ? adultNumber === 1
                          ? 'You'
                          : `Adult ${adultNumber}`
                        : `Child ${childNumber}`;

                      return (
                        <div
                          key={field.id}
                          className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5"
                        >
                          <p className="font-bold text-gray-900">{label}</p>

                          <input
                            type="hidden"
                            value={isAdult ? 'adult' : 'child'}
                            {...registerFamily(
                              `travellers.${index}.travellerType`
                            )}
                          />

                          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {!isAdult && (
                              <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                  Age *
                                </label>
                                <select
                                  {...registerFamily(
                                    `travellers.${index}.age`,
                                    { required: 'Child age is required' }
                                  )}
                                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                                >
                                  <option value="">Select age</option>
                                  {Array.from(
                                    { length: 17 },
                                    (_, ageIndex) => ageIndex + 1
                                  ).map((age) => (
                                    <option key={age} value={age}>
                                      {age}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}

                            {sameExperience === 'no' && (
                              <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                  Ski experience *
                                </label>
                                <select
                                  {...registerFamily(
                                    `travellers.${index}.skiExperience`,
                                    {
                                      required:
                                        'Select a ski experience level',
                                      onChange: (event) => {
                                        const value =
                                          event.target.value as SkiExperience;
                                        if (
                                          sharedSkiPass ===
                                          'no'
                                        ) {
                                          const skiPass:
                                            | SkiPassRequirement
                                            | '' =
                                            value ===
                                              'intermediate' ||
                                            value ===
                                              'advanced'
                                              ? 'yes'
                                              : value
                                                ? 'no'
                                                : '';

                                          setFamilyValue(
                                            `travellers.${index}.skiPassRequired`,
                                            skiPass,
                                            {
                                              shouldValidate:
                                                true
                                            }
                                          );
                                        }
                                      }
                                    }
                                  )}
                                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                                >
                                  <option value="">Select experience</option>
                                  <option value="never-skied">First Time</option>
                                  <option value="beginner">Beginner</option>
                                  <option value="intermediate">Intermediate</option>
                                  <option value="advanced">Advanced</option>
                                </select>
                              </div>
                            )}

                            {sharedSkiPass === 'no' && (
                              <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                  Ski pass required? *
                                </label>
                                <select
                                  {...registerFamily(
                                    `travellers.${index}.skiPassRequired`,
                                    {
                                      required:
                                        'Select a ski-pass option'
                                    }
                                  )}
                                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                                >
                                  <option value="">Select an option</option>
                                  <option value="yes">Yes</option>
                                  <option value="no">No</option>
                                  <option value="not-sure">Not sure</option>
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="border-t border-gray-100 pt-8">
                  <label className="block font-serif text-xl font-bold text-gray-900">
                    Additional Information
                    <span className="ml-2 font-sans text-sm font-medium text-gray-400">
                      Optional
                    </span>
                  </label>
                  <textarea
                    {...registerFamily('additionalInformation')}
                    rows={4}
                    className="mt-4 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    placeholder="Lessons, equipment hire, accessibility requirements or anything else you’d like us to know."
                  />
                </section>

                <section className="rounded-2xl bg-primary-50 p-5">
                  <h3 className="font-serif text-xl font-bold text-gray-900">
                    What happens next?
                  </h3>
                  <div className="mt-4 space-y-3">
                    <IncludedItem>We’ll review your requirements</IncludedItem>
                    <IncludedItem>
                      We’ll prepare your personalised quote
                    </IncludedItem>
                    <IncludedItem>
                      We’ll contact you by phone or email to discuss your trip
                      and answer any questions
                    </IncludedItem>
                    <IncludedItem>
                      We aim to respond within 24–48 hours
                    </IncludedItem>
                  </div>
                </section>

                <button
                  type="submit"
                  disabled={familySubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-600 px-6 py-4 text-base font-bold text-white shadow-lg transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-5 w-5" />
                  <span>
                    {familySubmitting
                      ? 'Sending Request…'
                      : 'Request My Personalised Quote'}
                  </span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* =================================================
            WAITLIST MODAL
            ================================================= */}

        {showWaitlistModal &&
          selectedWaitlistTrip && (
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
              onClick={closeWaitlist}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.94
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  duration: 0.25
                }}
                className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
                onClick={(event) =>
                  event.stopPropagation()
                }
              >
                <button
                  type="button"
                  onClick={closeWaitlist}
                  className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Close waitlist form"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="pr-8 text-center">
                  <Users className="mx-auto h-10 w-10 text-primary-600" />

                  <h2 className="mt-4 font-serif text-3xl font-bold text-gray-900">
                    Join the Waitlist
                  </h2>

                  <p className="mt-3 leading-relaxed text-gray-600">
                    {selectedWaitlistTrip.title} is
                    currently sold out. We’ll contact you
                    if a place becomes available.
                  </p>
                </div>

                <form
                  onSubmit={handleWaitlistSubmit(
                    onWaitlistSubmit
                  )}
                  className="mt-7 space-y-5"
                >
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      <Users className="mr-2 inline h-4 w-4" />
                      Full name *
                    </label>

                    <input
                      type="text"
                      {...registerWaitlist(
                        'fullName',
                        {
                          required:
                            'Full name is required'
                        }
                      )}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      placeholder="Your full name"
                    />

                    {waitlistErrors.fullName && (
                      <p className="mt-1 text-sm text-red-600">
                        {
                          waitlistErrors.fullName
                            .message
                        }
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      <Mail className="mr-2 inline h-4 w-4" />
                      Email address *
                    </label>

                    <input
                      type="email"
                      {...registerWaitlist('email', {
                        required:
                          'Email address is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message:
                            'Enter a valid email address'
                        }
                      })}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      placeholder="you@example.com"
                    />

                    {waitlistErrors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {waitlistErrors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      <Phone className="mr-2 inline h-4 w-4" />
                      Phone number
                    </label>

                    <input
                      type="tel"
                      {...registerWaitlist('phone')}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      placeholder="Optional"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={waitlistSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-4 font-bold text-white shadow-lg transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Send className="h-5 w-5" />

                    <span>
                      {waitlistSubmitting
                        ? 'Joining…'
                        : 'Join Waitlist'}
                    </span>
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
      </div>
    </>
  );
};

export default UpcomingTripDetailsPage;