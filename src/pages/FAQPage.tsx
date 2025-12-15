import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Phone, 
  Mail,
  MessageCircle,
  Search,
  Plane,
  Mountain,
  Hotel,
  Users,
  Heart,
  DollarSign,
  Instagram,
  CreditCard,
  Send
} from 'lucide-react';

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: 'Trip & Booking',
      icon: Plane,
      color: 'bg-blue-100 text-blue-600',
      faqs: [
        {
         question: "What's included in the Broskii trip package?",
          answer: `What's Included:
• Return flights from London 
• 4★ luxury hotel accommodation
• 6–7 day full ski pass
• Spa facilities
• Ski-in/ski-out access
• Private coach transfers

What's Not Included:
• Meals
• Ski/ snowboard hire (available during booking)
• Ski/snowboard lessons (available during booking)`
        },
        {
          question: "Do I need skiing experience to come along?",
          answer: " Not at all. Broskii trips are beginner-friendly, and we have first-timers on nearly every trip. We’ll guide you through everything — from hiring equipment to booking lessons — so you feel confident and comfortable on the slopes."
        },
        {
          question: "Do I need to come with a group, or can I come alone?",
          answer: "You’re welcome either way. Some brothers come with friends, others join solo — and everyone settles in quickly. Rooms are shared (2 single beds), but if you'd prefer your own space, single occupancy is available for an extra cost."
        },
        {
          question: "I'm not a Muslim, can I still join the trip?",
          answer: "Absolutely, Our trips are open to everyone who's comfortable with a respectful, Muslim-friendly environment. This means things like no alcohol, Halal food, and shared accommodation that aligns with Islamic etiquette. We’ll never say no to a Broskii with a good heart regardless of background"
        },
       {
  question: "What are the available payment options?",
  answer: `We offer two options:
• Bank transfer — no fees, and our preferred method.
• Debit or credit card — available via the booking page, with a 2% processing fee (charged by the payment provider, not Broskii).

You're free to choose whichever works best for you.`
},

        {
          question: "Is there an option to pay in instalments?",
          answer: "Yes, you can pay in instalments as long as the full balance is paid before the deadline (usually 10 weeks before the trip)."
        },
        {
          question: "What happens if I need to cancel my booking?",
          answer: `Please see our refund policy page for details. `

        }
      ]
    },
    {
      title: 'Ski Gear & Experience',
      icon: Mountain,
      color: 'bg-green-100 text-green-600',
      faqs: [
        {
          question: "Do I need to bring my own ski/snowboard clothing or equipment?",
          answer: `Yes — you’ll need to bring your own ski clothing: jacket, pants, thermals, gloves, goggles, and ski socks.
You don’t need to bring your own skis/snowboard, boots, or helmet — you can rent them through us on the booking form for an additional cost. If you don’t pre-book, rental gear is also available from shops near the hotel.
Note: A full PDF info pack with gear, lessons, flights, and more will be sent once your booking is confirmed..`
        },
        {
          question: "Are ski or snowboard lessons available?",
          answer: "Yes. We offer optional group or private lessons with certified instructors for both skiing and snowboarding. Highly recommended for first-timers. These are not included in the base price and will be quoted separately."
        },
        {
          question: "How many lessons will I need, and what do they cost?",
          answer: `That depends on your experience, how many lessons you want, and whether you go for group or private sessions. As a rough guide:
• Group lessons (2.5 hours): around £40
• Private 1-on-1 lesson (2 hours): around £110

Group lessons are a lot more cost-effective and a great vibe if you're learning with others. Exact prices and options will be in the PDF pack after booking. You can pre-book through us ( or book directly with ski schools at the resort.`
        },
        {
          question: "What's the cost of ski or snowboard hire for the week?",
          answer: `Ski or snowboard hire is typically around £70-£90 for the week, and that includes Skis/Snowboard, boots and a helmet. There are different packages depending on your experience — you can upgrade to higher-performance gear if you like. If you bring your own boots or helmet, it'll be slightly cheaper. Full options and pricing will be included in the PDF info pack once you've booked, so you can choose what suits you best.`
        },
        {
          question: "I'm new to skiing — how many lessons would you recommend?",
          answer: `If it's your first time on the slopes, we'd recommend at least 3–5 group lessons over the first few days. This gives you a solid foundation, helps you build confidence, and makes sure you're staying safe while having fun. Most beginners start with 2.5 hour daily group lessons, which strike a good balance between learning and having time to practice on your own. You can always add more if you feel you need it — or even book a private session later in the week to fine-tune your skills.`
        },
        {
          question: "Who will be in the group lessons? Will I be learning with other brothers on the trip?",
          answer: `Where possible, we'll group you with other brothers from the trip who are at a similar level — especially if you're all beginners. It makes the experience more fun, supportive, and a lot more relaxed. That said, group lessons are run by the resort's ski schools, so sometimes you may be placed with other learners outside our group — but we'll always do our best to coordinate and keep you with familiar faces wherever we can.`
        },
        {
          question: "What experience level is required?",
          answer: "All levels are welcome — from complete beginners to seasoned skiers and snowboarders."
        },
        {
          question: "Can I bring my own skis or snowboard gear?",
          answer: "Yes — you're welcome to bring your own gear. Just let us know on the booking form so we can make the necessary arrangements. Please note that airlines may apply additional charges for transporting ski/snowboard equipment, which would be your responsibility."
        },
        {
          question: "What if I don't want to ski every day?",
          answer: "That's totally fine — it's your trip! Some brothers take rest days to relax, explore the area, or unwind in the spa. You're free to do what works best for you."
        }
      ]
    },
    {
      title: 'Accommodation & Food',
      icon: Hotel,
      color: 'bg-purple-100 text-purple-600',
      faqs: [
        {
          question: "What facilities are available at the accommodation?",
          answer: "We usually stay in 4-star self-catering apartments with ski-in/ski-out access and spa facilities. Room-sharing is standard unless a single occupancy room is requested and paid for in advance. Please see upcoming trips for more information on accommodation"
        },
        {
          question: "Are meals included in the package?",
          answer: `Meals are not included. We usually stay in self-catering apartments, and brothers often bring frozen halal meat from the UK (in cool bags), then shop locally for groceries to cook together. This keeps costs low, and the grocery/meat cost is split between the apartment group.

Once your booking is confirmed, you'll be added to the Broskii Trip WhatsApp group — and then to your apartment sub-group to discuss food plans.

If you prefer to eat out, there are plenty of local restaurants nearby.`
        },
        {
          question: "Is single occupancy an option?",
          answer: "Yes — availability is limited and will incur an additional charge. Please let us know in the booking form if this is something you need."
        },
        {
          question: "We're booking as a group of friends — can we be placed together?",
          answer: "We do our best to accommodate groups so you can stay close and enjoy the trip together. Just let us know when you book, and we'll arrange your rooms accordingly."
        }
      ]
    },
    {
      title: 'Travel & Preparation',
      icon: Plane,
      color: 'bg-orange-100 text-orange-600',
      faqs: [
        {
          question: "Do I need travel insurance?",
          answer: "Yes — travel insurance with winter sports cover is mandatory for all Broskii trips."
        },
        {
          question: "Yes — you'll need a valid passport. For most European destinations, UK passport holders currently don't need a visa. However, many countries require that your passport is valid for at least 6 months from your departure date, so please double-check this based on your destination. We also recommend reviewing any travel updates or entry requirements closer to the time of travel."
        },
        {
          question: "Is there a recommended packing list for the trip?",
          answer: "Yes — after your booking is confirmed, we'll send you a full packing list recommendations."
        },
        {
          question: "Where is the trip's meeting point or arrival airport?",
          answer: "We typically fly from London Heathrow or Gatwick. Please see our upcoming trips page for more information."
        },
        {
          question: "Are brothers carpooling to the airport to share parking/fuel costs?",
          answer: "Yes — depending on where you're based, you can carpool with other brothers. Just send a message in the WhatsApp group after booking with your location."
        },
        {
          question: "What are the flight itinerary and baggage allowance details?",
          answer: "Once your booking is confirmed, we'll send you a full PDF info pack via email with flight details and baggage allowance. If you need to know before booking, just drop us a message."
        },
        {
          question: "What is the total duration of the trip?",
          answer: "All trips are usually 7 days long, including travel to and from the resort."
        },
        {
          question: "I'd love to join the trip but I don't live in London — is that a problem?",
          answer: `Not at all.  We welcome brothers from anywhere. You can either meet us at one of the designated London airports or meet with the group at the destination. If you're flying from elsewhere, we can help you find the best flights and coordinate arrival times so everything runs smoothly.`
        },
        {
          question: "I'm travelling from another country — can I still join?",
          answer: `Absolutely. We've had international guests before and it's always a blessing to meet brothers from different places. If you're not coming via London, that's totally fine — we'll support you in finding a good flight plan and make sure you can meet with the group when you arrive. Just let us know your plans on the booking page so we can help coordinate everything.`
        },
        {
          question: "Do I need to buy ski clothing?",
          answer: "Yes — you'll need to buy proper ski clothing in the UK beforehand. We'll send you a full checklist after your booking is confirmed."
        },
        {
          question: "Can I bring a carry-on only?",
          answer: "It’s possible, but we strongly recommend checking in a suitcase due to bulky winter gear. Most airlines include a 23kg checked bag — full details will be in the info pack once booking is confirmed."

        },
        {
          question: "How much spending money should I bring?",
          answer: "It depends on your meal choices and extras, but most brothers bring around £150–£300 for groceries, meals out, and personal expenses. If you're renting ski gear or taking lessons, factor that in too."
        },
        {
          question: "Are toiletries and towels provided at the accommodation?",
          answer: "Yes — towels and basic toiletries are usually provided, we recommend bringing your own travel-sized essentials (shampoo, showergel and toothpaste, etc.)."
        },
        {
          question: "What if I miss my flight?",
          answer: "We strongly advise arriving at the airport early to avoid missing your flight. If you do miss it, you'll need to book a replacement at your own cost."
        }
      ]
    },
    {
      title: 'Family Trips',
      icon: Users,
      color: 'bg-pink-100 text-pink-600',
      faqs: [
        {
          question: "Is the trip suitable for kids?",
          answer: "Yes — many ski resorts are family-friendly with dedicated beginner areas, kids' ski schools, and other activities like sledging or snow parks. We'll help you choose the right lessons and passes depending on their age and experience."
        },
        {
          question: "Are there ski lessons for children?",
          answer: "Yes. Most resorts offer group or private ski lessons specifically for children, usually starting from age 4 and up. These are run by qualified instructors in a safe and fun environment. Prices and options will be shared in the PDF info pack after your booking is confirmed."
        },
        {
          question: "What ages is the trip suitable for?",
          answer: "All ages are welcome. Whether you've got toddlers, teens, or just the two of you — we'll help make sure the experience is right for your family. Resorts are family-friendly with activities and services for every stage."
        },
        {
          question: "Is the trip suitable for first-time skiers/snowboarders?",
          answer: "Absolutely. The trip is beginner-friendly for both adults and kids. We'll help arrange lessons, rental gear, and lift passes to suit your experience level — whether it's your first time or you're getting back into it after a break."
        },
        {
          question: "Do I need travel insurance for my family?",
          answer: "Yes — travel insurance is essential for all travellers, especially on a ski trip. It should cover winter sports, medical emergencies, cancellations, and equipment loss/damage."
        },
        {
          question: "Will there be other families with children?",
          answer: "Yes — this is a family group trip, so expect a mix of parents with young children, older kids, and teens. It's a great way for kids and adults to meet others and share the experience."
        }
      ]
    },
    {
      title: 'Refunds & Cancellations',
      icon: CreditCard,
      color: 'bg-yellow-100 text-yellow-600',
      faqs: [
        {
          question: "Are deposits refundable?",
          answer: "Deposits are generally non-refundable, as they go toward securing key elements of the trip (flights, accommodation, etc.).\n\nHowever, if a replacement is found, we'll refund your deposit minus any admin or airline fees.\n\nPlease refer to our <a href='/refund-policy' class='text-primary-600 hover:text-primary-700 underline'>refund policy</a> for more details."
        },
        {
          question: "What happens if I cancel more than 15 days before departure?",
          answer: "If you cancel more than 15 days before the trip and a replacement is found:\n• You will be refunded the full amount paid, minus any admin or airline name change fees.\n\nIf no replacement is found, we are unable to issue a refund.\n\nPlease refer to our <a href='/refund-policy' class='text-primary-600 hover:text-primary-700 underline'>refund policy</a> for more details."
        },
        {
          question: "What if I cancel and find a replacement less than 15 days before departure?",
          answer: "If a replacement is found less than 15 days before departure, you will be refunded the full amount paid,\nminus admin fees and flight cost, as most airlines do not allow name changes within two weeks of departure.\n\nPlease refer to our <a href='/refund-policy' class='text-primary-600 hover:text-primary-700 underline'>refund policy</a> for more details."
        },
        {
          question: "What if I cancel and no replacement is found?",
          answer: "If no replacement is found, unfortunately no refund can be issued, including the deposit.\n\nThis is because trip costs (such as flights, accommodation, and transfers) will have already been paid and are non-recoverable.\n\nPlease refer to our <a href='/refund-policy' class='text-primary-600 hover:text-primary-700 underline'>refund policy</a> for more details."
        },
        {
          question: "Can I transfer my booking to someone else?",
          answer: "Yes — you're welcome to find someone to take your place.\n\nIf this happens:\n• You will be refunded the full amount paid,\nminus any admin or airline name change fees (or full flight fare if within 15 days of departure).\n\nPlease refer to our <a href='/refund-policy' class='text-primary-600 hover:text-primary-700 underline'>refund policy</a> for more details."
        },
        {
          question: "Why can't I get a full refund if I cancel?",
          answer: "We commit to major trip expenses in advance, and these are often non-refundable to us.\n\nHowever, if a replacement is found, we will do our best to recover and return as much of your payment as possible.\n\nPlease refer to our <a href='/refund-policy' class='text-primary-600 hover:text-primary-700 underline'>refund policy</a> for more details."
        },
        {
          question: "Is travel insurance required?",
          answer: "Yes — travel insurance with winter sports cover is mandatory for all participants.\n\nMake sure your policy includes cover for:\n• Trip cancellation\n• Medical emergencies\n• Lost luggage\n• Winter sports-related injuries or delays"
        },
        {
          question: "What if I have an emergency?",
          answer: "We'll always try to support you.\n\nPlease reach out to us as early as possible so we can explore your options together."
        }
      ]
    },
    {
      title: 'Broskii & Faith',
      icon: Heart,
      color: 'bg-red-100 text-red-600',
      faqs: [
        {
          question: "What arrangements are made for daily prayers?",
          answer: "We pray Fajr in congregation each morning, and Maghrib/Isha together in the evening. Dhuhr and Asr are usually prayed on the mountain (depending on timings), or you can take a quick break and return to your apartment to pray."
        },
        {
          question: "Will there be Islamic talks or reminders?",
          answer: "Yes — throughout the week, we include relaxed reminders and short talks. These are kept brief and relevant, with no pressure to attend. It's also a great chance to meet and bond with other brothers. We're often joined by respected guests like Shaykh Abdurraheem Green and Shaykh Musa Abuzaghleh, who share insight and reflections in a down-to-earth way."
        },
        {
          question: "Can sisters join the trip?",
          answer: "Our main ski trips are for brothers only. However, we do organise family trips where sisters can attend. Keep an eye on our upcoming trips page!"
        },
        {
          question: "Can I bring a friend who's not religious?",
          answer: "Of course! Broskii trips are open to all brothers — no judgment. Many brothers find the environment uplifting and motivating, regardless of where they're at in their journey."
        }
      ]
    },
    {
      title: 'Group & Behaviour',
      icon: Users,
      color: 'bg-indigo-100 text-indigo-600',
      faqs: [
        {
          question: "What's the vibe like on the trip?",
          answer: "Chilled, respectful, and brotherly. It's a mix of fun and purpose — we hit the slopes, share laughs, reflect when the moment calls for it, and keep the banter flowing. Think good energy, no egos, and plenty of memories made along the way"
        },
        {
          question: "Are there any rules or codes of conduct?",
          answer: "We ask all brothers to maintain good etiquette and respectful behaviour. This ensures the trip remains enjoyable and comfortable for everyone."
        },
        {
          question: "How many people are expected to come on a Broskii ski trip?",
          answer: "The group size typically stays between 40 and 60."
        }
      ]
    }
  ];

  const supportFAQs = [
    {
      question: "What happens after I book?",
      answer: "Once you fill out the booking form and pay your deposit or full payment, you'll receive a confirmation email and be added to our Broskii trip WhatsApp group. From there, you'll get all the updates, packing lists, and apartment assignments."
    },
    {
      question: "How do I contact you?",
      answer: `You can reach out to us through the contact form on our website, or drop us a message on WhatsApp, email, or Instagram — whatever's easiest for you!

For full contact info, check out our <a href='/contact' class='text-primary-600 hover:text-primary-700 underline'>Contact Us page</a>`
    },
    {
      question: "How do I cancel or transfer my booking?",
      answer: `If you need to cancel or transfer your place, just get in touch with us as soon as possible — the more notice you give, the better we can assist you.`

    }
  ];

  // Flatten all FAQs for search
  const allFAQs = faqCategories.flatMap((category, categoryIndex) => 
    category.faqs.map((faq, faqIndex) => ({
      ...faq,
      categoryTitle: category.title,
      categoryColor: category.color,
      categoryIcon: category.icon,
      id: `${categoryIndex}-${faqIndex}`
    }))
  ).concat(
    supportFAQs.map((faq, index) => ({
      ...faq,
      categoryTitle: 'Support',
      categoryColor: 'bg-gray-100 text-gray-600',
      categoryIcon: MessageCircle,
      id: `support-${index}`
    }))
  );

  const filteredFAQs = searchTerm 
    ? allFAQs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <img 
          src="/Snapshot_20250114_230101.webp"
          alt="Skiing adventure background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white relative z-10"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
             
              <h1 className="text-5xl font-serif font-bold">FAQs — We've Got You Covered</h1>
            </div>
            <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
              From booking your spot to hitting the slopes, here's everything you need to know about our Broskii trips.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      {searchTerm && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Search Results ({filteredFAQs.length})
            </h2>
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${faq.categoryColor}`}>
                        <faq.categoryIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">{faq.categoryTitle}</div>
                        <div className="font-serif font-semibold text-gray-900">{faq.question}</div>
                      </div>
                    </div>
                    {openFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-gray-600 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: faq.answer }}>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Categories */}
      {!searchTerm && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${category.color}`}>
                        <category.icon className="h-8 w-8" />
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-gray-900">{category.title}</h2>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.faqs.map((faq, faqIndex) => {
                      const faqId = `${categoryIndex}-${faqIndex}`;
                      return (
                        <div key={faqIndex}>
                          <button
                            onClick={() => toggleFAQ(faqId)}
                            className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="font-serif font-semibold text-gray-900 text-lg pr-4">
                              {faq.question}
                            </h3>
                            {openFAQ === faqId ? (
                              <ChevronUp className="h-6 w-6 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-6 w-6 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          <AnimatePresence>
                            {openFAQ === faqId && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-8 pb-6 text-gray-600 leading-relaxed text-lg whitespace-pre-line" dangerouslySetInnerHTML={{ __html: faq.answer }}>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Support Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-gray-100 text-gray-600">
                      <MessageCircle className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">Support</h2>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {supportFAQs.map((faq, faqIndex) => {
                    const faqId = `support-${faqIndex}`;
                    return (
                      <div key={faqIndex}>
                        <button
                          onClick={() => toggleFAQ(faqId)}
                          className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="font-serif font-semibold text-gray-900 text-lg pr-4">
                            {faq.question}
                          </h3>
                          {openFAQ === faqId ? (
                            <ChevronUp className="h-6 w-6 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-6 w-6 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        <AnimatePresence>
                          {openFAQ === faqId && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-8 pb-6 text-gray-600 leading-relaxed text-lg">
                                {faq.question === "How do I cancel or transfer my booking?" ? (
                                  <div>
                                    <div className="whitespace-pre-line mb-6">{faq.answer}</div>
                                    <div className="space-y-4">
                                      <div className="text-gray-700 font-semibold mb-4">You can reach us via:</div>
                                      <div className="grid grid-cols-1 gap-4">
                                        <a
                                          href="mailto:salaam@broskii.com"
                                          className="group block p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 hover:border-primary-300"
                                        >
                                          <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                                              <Mail className="h-6 w-6" />
                                            </div>
                                            <div>
                                              <div className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">Email</div>
                                              <div className="text-sm text-gray-600">salaam@broskii.com</div>
                                            </div>
                                          </div>
                                        </a>
                                        
                                        <a
                                          href="https://wa.me/447749939192"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="group block p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 hover:border-green-300"
                                        >
                                          <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                              <MessageCircle className="h-6 w-6" />
                                            </div>
                                            <div>
                                              <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">WhatsApp/Phone</div>
                                              <div className="text-sm text-gray-600">+44 7749 939192</div>
                                            </div>
                                          </div>
                                        </a>
                                        
                                        <a
                                          href="/contact"
                                          className="group block p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 hover:border-broskii-light-blue-300"
                                        >
                                          <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-broskii-light-blue-100 text-broskii-light-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                              <Send className="h-6 w-6" />
                                            </div>
                                            <div>
                                              <div className="font-semibold text-gray-900 group-hover:text-broskii-light-blue-700 transition-colors">Contact Form</div>
                                              <div className="text-sm text-gray-600">Send us a message</div>
                                            </div>
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

{/* Contact Section */}
<section className="py-12 bg-white">
  <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-black">
          Still got questions?
        </h3>
        <p className="text-base sm:text-lg text-black mt-2">
          We're just a message away and happy to help
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          to="/contact"
          className="group bg-[#00a6fb]/10 hover:bg-[#00a6fb]/20 rounded-md p-4 transition"
        >
          <Send className="h-6 w-6 mx-auto mb-2 text-[#00a6fb] group-hover:text-white" />
          <div className="text-sm font-semibold text-black">Send a Message</div>
          <div className="text-xs text-black hidden">Contact Form</div>
        </Link>

        <a
          href="mailto:salaam@broskii.com"
          className="group bg-[#00a6fb]/10 hover:bg-[#00a6fb]/20 rounded-md p-4 transition"
        >
          <Mail className="h-6 w-6 mx-auto mb-2 text-[#00a6fb] group-hover:text-white" />
          <div className="text-sm font-semibold text-black">Email</div>
          <div className="text-xs text-black hidden">salaam@broskii.com</div>
        </a>

        <a
          href="https://wa.me/447749939192"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#00a6fb]/10 hover:bg-[#00a6fb]/20 rounded-md p-4 transition"
        >
          <MessageCircle className="h-6 w-6 mx-auto mb-2 text-[#00a6fb] group-hover:text-white" />
          <div className="text-sm font-semibold text-black">WhatsApp</div>
          <div className="text-xs text-black hidden">+44 7749 939192</div>
        </a>

        <a
          href="https://www.instagram.com/broskiiuk"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#00a6fb]/10 hover:bg-[#00a6fb]/20 rounded-md p-4 transition"
        >
          <Instagram className="h-6 w-6 mx-auto mb-2 text-[#00a6fb] group-hover:text-white" />
          <div className="text-sm font-semibold text-black">Instagram</div>
          <div className="text-xs text-black hidden">@broskiiuk</div>
        </a>
      </div>
    </motion.div>
  </div>
</section>



    </div>
  );
};

export default FAQPage;
