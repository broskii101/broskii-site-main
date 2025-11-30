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

const CookiesPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border shadow-md rounded-md my-8 pt-20 font-sans">
      <h1 className="text-3xl font-bold mb-1">Broskii Ltd Cookies Policy</h1>
      <p className="text-sm text-gray-600 mb-6">
        <strong>Effective Date: July 21, 2025</strong>
      </p>

      <Section title="What Are Cookies?">
        <p>
          Cookies are small text files stored on your device (computer, smartphone, tablet) when you visit a website. They help websites remember information about your visit to improve your browsing experience.
        </p>
      </Section>

      <Section title="How Broskii Ltd Uses Cookies">
        <p>We use cookies to:</p>
        <ul>
          <li>Enhance website functionality: Remember your preferences and settings.</li>
          <li>Analyze website traffic: Understand how visitors use our site to improve content and navigation.</li>
          <li>Deliver personalised content: Tailor offers and marketing communications based on your interests.</li>
        </ul>
      </Section>

      <Section title="Types of Cookies We Use">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">Cookie Type</th>
              <th className="border border-gray-300 p-2 text-left">Purpose</th>
              <th className="border border-gray-300 p-2 text-left">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Essential Cookies</td>
              <td className="border border-gray-300 p-2">Required for website operation (e.g., booking process).</td>
              <td className="border border-gray-300 p-2">Session ID, security cookies</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-2">Performance Cookies</td>
              <td className="border border-gray-300 p-2">Collect anonymous data on how visitors use the site.</td>
              <td className="border border-gray-300 p-2">Google Analytics</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Functional Cookies</td>
              <td className="border border-gray-300 p-2">Remember preferences (language, room selection).</td>
              <td className="border border-gray-300 p-2">User preference cookies</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-2">Advertising Cookies</td>
              <td className="border border-gray-300 p-2">Help us show relevant ads and measure effectiveness.</td>
              <td className="border border-gray-300 p-2">Facebook Pixel, Google Ads</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section title="Third-Party Cookies">
        <p>
          We use third-party services such as Google Analytics and social media platforms that may place cookies on your device. These third parties are responsible for their own privacy practices.
        </p>
      </Section>

      <Section title="Managing Cookies">
        <p>You can control and/or delete cookies through your browser settings. You can:</p>
        <ul>
          <li>Set your browser to refuse cookies.</li>
          <li>Delete existing cookies.</li>
          <li>Use “Do Not Track” settings (note: not all websites honour this).</li>
        </ul>
        <p>Please note that blocking cookies may impact your experience on our site, including booking functions.</p>
      </Section>

      <Section title="Consent">
        <p>
          By continuing to use our website, you consent to the use of cookies as described in this policy. If you do not agree, please adjust your cookie settings or refrain from using the site.
        </p>
      </Section>

      <Section title="Contact Us">
        <p>If you have questions about our cookies policy, please contact:</p>
        <p><strong>📧 salaam@broskii.co</strong></p>
      </Section>
    </div>
  );
};

export default CookiesPolicy;