import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, MessageCircle } from 'lucide-react';

const ContactSuccessPage = () => {

  // Always reset scroll on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center text-center"
        >
          {/* Success icon */}
          <CheckCircle className="h-14 w-14 text-green-500 mb-2" />

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-3">
            Message sent
          </h1>

          {/* Primary reassurance */}
          <p className="text-gray-600 max-w-sm mb-6 leading-relaxed">
            We’ve received your message and will get back to you shortly.
          </p>

          {/* Secondary contact options */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <p className="text-gray-600">
              If your enquiry is urgent, you can reach us directly:
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <a
                href="mailto:salaam@broskii.com"
                className="flex items-center gap-2 text-gray-900 hover:text-primary-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="font-medium">salaam@broskii.com</span>
              </a>

              <a
                href="https://wa.me/447749939192"
                className="flex items-center gap-2 text-gray-900 hover:text-primary-600 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">+44 7749 939192</span>
              </a>
            </div>
          </div>

          {/* Soft return link */}
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Back to home
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSuccessPage;

