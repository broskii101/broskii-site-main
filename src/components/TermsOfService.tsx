import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sections = [
  {
    title: '1. Definitions',
    content: (
      <>
        <p><strong>Broskii Ltd</strong> / “we” / “us” / “our” – The company organising and operating the trips.</p>
        <p><strong>Participant</strong> / “you” / “your” – Any individual booking or attending a trip.</p>
        <p><strong>Trip</strong> – Any adventure or ski experience organised by Broskii Ltd.</p>
        <p><strong>Brothers-Only Trip</strong> – Trips exclusively for adult males (18+) and boys aged 8+ accompanied by their father, legal guardian, or a responsible male relative aged 18+ (e.g. older brother or uncle).</p>
        <p><strong>Family Trip</strong> – Trips open to parents/guardians with children or dependents of any age, including siblings, cousins, and relatives.</p>
        <p><strong>Youth Trip</strong> – Future trips designed for youth ages 12+ under specific supervision and consent.</p>
        <p><strong>Extras</strong> – Optional services like equipment rental, ski lessons, room upgrades, etc.</p>
        <p><strong>Supplier</strong> – Any third-party service provider (hotels, airlines, ski instructors).</p>
        <p><strong>Parent/Guardian</strong> – An adult legally responsible for a minor under 18.</p>
      </>
    ),
  },
  {
    title: '2. Eligibility to Participate',
    content: (
      <>
        <p>To attend a Brothers-Only Trip, participants must be:</p>
        <ul className="list-disc pl-6">
          <li>Male and 18 years or older, or</li>
          <li>A boy aged 8 or older, accompanied by his father, legal guardian, or a responsible male relative aged 18+ (such as an older brother or uncle).</li>
        </ul>
        <p>The accompanying adult must:</p>
        <ul className="list-disc pl-6">
          <li>Be a paying participant</li>
          <li>Accept full responsibility for the minor for the entire duration of the trip</li>
          <li>Ensure all consent and waiver forms are completed prior to departure</li>
        </ul>
        <p>Individuals under 18 who are not attending with their father, legal guardian, or responsible adult male relative on a Brothers-Only Trip may only participate in:</p>
        <ul className="list-disc pl-6">
          <li>A designated Youth Trip (ages 12+), or</li>
          <li>A Family Trip accompanied by a parent or legal guardian.</li>
        </ul>
      </>
    ),
  },
  {
    title: '3. Booking & Deposit Policy',
    content: (
      <>
        <p>A non-refundable deposit is required to secure your place.</p>
        <p>Deposits are used to reserve critical components (e.g., flights, accommodation).</p>
        <p>If you select any Extras, your final balance will be adjusted accordingly.</p>
        <p>Final trip prices, including extras, are communicated before the remaining balance is due.</p>
      </>
    ),
  },
  {
    title: '4. Remaining Balance & Deadlines',
    content: (
      <>
        <p>Final balances are due no later than 10 weeks before departure.</p>
        <p>Late payments may lead to cancellation of your booking and forfeiture of the deposit.</p>
      </>
    ),
  },
  {
    title: '5. Booking Confirmation',
    content: (
      <>
        <p>A trip is only confirmed once:</p>
        <ul className="list-disc pl-6">
          <li>Full payment is received, and</li>
          <li>Confirmation is issued in writing by Broskii Ltd.</li>
        </ul>
      </>
    ),
  },
  {
    title: '6. Equipment Rental & Lessons',
    content: (
      <>
        <p><strong>Equipment Rental Options:</strong></p>
        <ul className="list-disc pl-6">
          <li>Rent skis/snowboards via Broskii Ltd (prices shared before the trip).</li>
          <li>Rent independently at the resort.</li>
          <li>Bring your own gear (note: airline carriage fees may apply).</li>
        </ul>
        <p><strong>Ski/Snowboard Lessons:</strong></p>
        <p>Beginners are strongly encouraged to take lessons. Options include group and private lessons. Prices and booking deadlines will be announced prior to departure.</p>
      </>
    ),
  },
  {
    title: '7. Rooming & Accommodation',
    content: (
      <>
        <p>Shared rooms are the default unless otherwise requested.</p>
        <p>You may request single occupancy or rooming with friends/family if confirmed in advance.</p>
        <p>Families will be accommodated together where possible. Extra room charges may apply.</p>
      </>
    ),
  },
  {
    title: '8. Cancellations, Transfers & Refunds',
    content: (
      <>
        <p><strong>Deposits:</strong> Deposits are generally non-refundable. If a replacement is found, the deposit may be refunded minus admin and airline name-change fees.</p>
        <p><strong>Cancellation More Than 15 Days Before Departure:</strong></p>
        <ul className="list-disc pl-6">
          <li>If a replacement is found: Full refund minus admin/airline fees.</li>
          <li>If no replacement is found: No refund, including deposit.</li>
        </ul>
        <p><strong>Cancellation Less Than 15 Days Before Departure:</strong></p>
        <ul className="list-disc pl-6">
          <li>If a replacement is found: Refund minus admin fees and flight cost.</li>
          <li>If no replacement is found: No refund due to prepaid expenses.</li>
        </ul>
        <p><strong>Transferring Your Place:</strong> Transfers allowed if notified in writing, new participant meets criteria, and admin/airline fees are covered.</p>
      </>
    ),
  },
  {
    title: '9. Travel Insurance (Mandatory)',
    content: (
      <>
        <p>All participants must purchase travel insurance including winter sports cover, trip cancellation/interruption, emergency medical, lost/delayed baggage, evacuation or repatriation.</p>
      </>
    ),
  },
  {
    title: '10. Health, Fitness & Emergencies',
    content: (
      <>
        <p>You must be in good physical health to participate.</p>
        <p>Disclose relevant medical conditions during booking.</p>
        <p>In emergencies, Broskii Ltd will coordinate medical assistance and notify your emergency contact.</p>
      </>
    ),
  },
  {
    title: '11. Conduct & Expectations',
    content: (
      <>
        <p>Participants must respect others, uphold Broskii Ltd values including brotherhood and safety, and avoid illegal or disruptive behavior.</p>
        <p>Use of alcohol, recreational drugs, or disruptive behaviour may result in removal without refund and permanent ban.</p>
      </>
    ),
  },
  {
    title: '12. Youth Trips (Ages 12+)',
    content: (
      <>
        <p>Youth Trips are for boys aged 12+.</p>
        <p>Signed parental waiver and emergency/medical form required.</p>
        <p>Participants must follow instructions, stay with the group, and behave respectfully.</p>
        <p>Serious misconduct may result in being sent home at the parent's expense.</p>
      </>
    ),
  },
  {
    title: '13. Family Trips Policy',
    content: (
      <>
        <p>Family Trips are for parents, children, and extended families of any ages, including siblings, cousins, and relatives.</p>
        <p>Focus is on shared adventure, relaxation, and connection.</p>
        <p>Parents/guardians are fully responsible for their children’s safety, conduct, and participation.</p>
        <p>Children must remain with their parent or guardian at all times.</p>
        <p>Families will be placed together where possible; please notify us of special requests.</p>
      </>
    ),
  },
  {
    title: '14. Media & Photography',
    content: (
      <>
        <p>Photos and videos may be taken during the trip.</p>
        <p>By attending, you consent to your image being used for promotional material by Broskii Ltd.</p>
        <p>To opt out, inform us in writing before the trip.</p>
      </>
    ),
  },
  {
    title: '15. Intellectual Property',
    content: (
      <>
        <p>All materials, photos, logos, and content belong to Broskii Ltd.</p>
        <p>You may not reproduce or use our content for commercial purposes without written permission.</p>
      </>
    ),
  },
  {
    title: '16. Data Privacy & Protection',
    content: (
      <>
        <p>Broskii Ltd complies with UK GDPR.</p>
        <p>Your data is stored securely and only used for trip coordination, emergencies, or communication.</p>
        <p>We never share or sell your data to third parties.</p>
      </>
    ),
  },
  {
    title: '17. Liability & Waiver',
    content: (
      <>
        <p>Adventure sports have inherent risks.</p>
        <p>By booking, you accept full responsibility for your own safety and waive liability against Broskii Ltd and suppliers.</p>
        <p>You agree to follow safety instructions and use protective equipment.</p>
      </>
    ),
  },
  {
    title: '18. Force Majeure',
    content: (
      <>
        <p>Broskii Ltd is not liable for delays, cancellations, or changes caused by events beyond our control, including weather, strikes, pandemics, or government restrictions.</p>
        <p>We will do our best to notify you and assist where possible.</p>
      </>
    ),
  },
  {
    title: '19. Dispute Resolution & Governing Law',
    content: (
      <>
        <p>Any disputes will first be addressed by negotiation.</p>
        <p>If unresolved, disputes are subject to UK law and jurisdiction.</p>
      </>
    ),
  },
  {
    title: '20. Amendments & Updates',
    content: (
      <>
        <p>Broskii Ltd reserves the right to update these Terms at any time.</p>
        <p>Updates will be communicated and posted on our website.</p>
        <p>Your continued participation constitutes acceptance of updated Terms.</p>
      </>
    ),
  },
];

export default function TermsOfService() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleSection(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }
  
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border shadow-md rounded-md my-8 pt-20">
      <h1 className="text-3xl font-bold mb-1">Broskii Ltd Terms of Service</h1>
      <p className="text-sm text-gray-600 mb-6">Effective Date: July 21, 2025</p>

      {sections.map(({ title, content }, i) => (
        <section key={i} className="mb-4 border-b pb-4">
          <button
            className="flex justify-between w-full text-left text-lg font-semibold focus:outline-none"
            onClick={() => toggleSection(i)}
            aria-expanded={openIndex === i}
            aria-controls={`section-content-${i}`}
          >
            {title}
            {openIndex === i ? (
              <ChevronUp className="w-5 h-5 ml-2" />
            ) : (
              <ChevronDown className="w-5 h-5 ml-2" />
            )}
          </button>

          {openIndex === i && (
            <div id={`section-content-${i}`} className="mt-3 prose max-w-none">
              {content}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}