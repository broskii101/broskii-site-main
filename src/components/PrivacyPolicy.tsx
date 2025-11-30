import React, { useState } from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'block',
          width: '100%',
          backgroundColor: '#f0f0f0',
          border: 'none',
          textAlign: 'left',
          padding: '1rem',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {title}
      </button>
      {isOpen && (
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderTop: 'none' }}>
          {children}
        </div>
      )}
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border shadow-md rounded-md my-8 pt-20 font-sans">
      <h1 className="text-3xl font-bold mb-1">Broskii Ltd Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-6"><strong>Effective Date:</strong> July 21, 2025</p>

      <Section title="1. Information We Collect">
        <p>We collect the following personal data:</p>
        <ul>
          <li>Name</li>
          <li>Age</li>
          <li>Email address</li>
          <li>Contact number</li>
          <li>Emergency contact name and phone number</li>
          <li>Booking details (e.g., selected trips, preferences, special arrangements)</li>
          <li>Photos and videos taken during trips (used only with your consent)</li>
        </ul>
        <p>We do <strong>not</strong> collect any health information or use health questionnaires.</p>
      </Section>

      <Section title="2. How We Collect Your Data">
        <p>We collect personal data when:</p>
        <ul>
          <li>You book a trip or service with us</li>
          <li>You contact us via email, phone, or WhatsApp</li>
          <li>You attend one of our trips or events (e.g., for group photos and videos)</li>
        </ul>
      </Section>

      <Section title="3. How We Use Your Data">
        <ul>
          <li>Manage your bookings and payment confirmations</li>
          <li>Communicate important trip details or changes</li>
          <li>Provide customer support</li>
          <li>Contact emergency services or your emergency contact if needed</li>
          <li>Share photos/videos for promotional use — <strong>only with your consent</strong></li>
        </ul>
        <p>You can withdraw consent for photo/video use at any time by emailing <strong>salaam@broskii.co</strong>.</p>
      </Section>

      <Section title="4. Payment Information">
        <p>All payments are processed via bank transfer, Monzo, or Stripe. We do <strong>not</strong> store card details.</p>
      </Section>

      <Section title="5. Data Sharing and Disclosure">
        <p>We may share your data only when necessary:</p>
        <ul>
          <li>With trip providers to fulfil bookings</li>
          <li>With emergency services if needed</li>
          <li>With legal authorities when required</li>
        </ul>
        <p>We do <strong>not</strong> sell your data or share it with marketing partners.</p>
      </Section>

      <Section title="6. Data Retention">
        <p>We retain your data only as long as necessary to provide services and meet legal obligations.</p>
      </Section>

      <Section title="7. Your Rights">
        <p>You have the right to access, correct, or delete your data, and withdraw any consent given.</p>
        <p>To make a request, contact us at <strong>salaam@broskii.co</strong>.</p>
      </Section>

      <Section title="8. Data Security">
        <p>We implement reasonable security measures including staff access controls and secure storage.</p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>We may update this policy. The latest version will always appear on our website.</p>
      </Section>

      <Section title="10. Contact Us">
        <p>If you have any questions about this policy or your data, email: <strong>salaam@broskii.co</strong></p>
      </Section>
    </div>
  );
};

export default PrivacyPolicy;