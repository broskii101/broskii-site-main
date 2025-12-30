import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const BookingSuccessPage = () => {
  // Always reset scroll on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <section className="min-h-screen bg-white px-4 sm:px-6">
      <div className="max-w-3xl mx-auto pt-20 pb-28 text-center">

        {/* Success indicator */}
        <div className="flex justify-center mb-10">
          <CheckCircle className="h-14 w-14 text-green-600" />
        </div>

        {/* Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
          Thank you for booking with Broskii
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-14">
          We’ve received your registration and are excited to have you on board.
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-gray-200 mb-14" />

        {/* What happens next */}
        <div className="text-left mb-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6 text-center">
            What happens next
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
            You’ll hear from us within 48 hours via email or WhatsApp with:
          </p>

          <ul className="space-y-5 text-gray-700 text-lg leading-relaxed">
            <li className="flex gap-3">
              <span className="text-green-600 mt-1">✓</span>
              <span>Payment confirmation and trip details</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 mt-1">✓</span>
              <span>
                A WhatsApp invite to your Broskii Trip Group for updates,
                travel info, and more
              </span>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-200 mb-14" />

        {/* Contact */}
        <div className="mb-16">
          <p className="text-gray-700 text-lg mb-6">
            If you have any questions in the meantime, feel free to reach out:
          </p>

          <div className="space-y-3 text-lg">
            <a
              href="mailto:salaam@broskii.com"
              className="block text-primary-600 hover:underline"
            >
              salaam@broskii.com
            </a>

            <a
              href="tel:+447749939192"
              className="block text-primary-600 hover:underline"
            >
              +44&nbsp;7749&nbsp;939192
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 rounded-md bg-primary-600 text-white text-base font-medium hover:bg-primary-700 transition-colors"
          >
            Back to Home
          </Link>

          <Link
            to="/faq"
            className="px-8 py-3 rounded-md border border-gray-300 text-gray-700 text-base font-medium hover:bg-gray-50 transition-colors"
          >
            View FAQs
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BookingSuccessPage;

