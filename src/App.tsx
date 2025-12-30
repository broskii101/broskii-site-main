import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContactButton from './components/FloatingContactButton';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import UpcomingTripDetailsPage from './pages/UpcomingTripDetailsPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import ContactSuccessPage from './pages/ContactSuccessPage';

import GalleryPage from './pages/GalleryPage';
import TermsPage from './pages/termsofservice';      // lowercase filename
import PrivacyPolicyPage from './pages/privacypolicy'; // lowercase filename
import CookiesPolicyPage from './pages/cookiespolicy';  // lowercase filename

function App() {
  return (
    <Router basename="/">

      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Legacy booking route (will be phased out safely) */}
<Route path="/booking" element={<BookingPage />} />

<Route path="/booking" element={<BookingPage />} />
<Route path="/booking/:tripId" element={<BookingPage />} />


            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/upcoming-trip" element={<UpcomingTripDetailsPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/cookiespolicy" element={<CookiesPolicyPage />} />  {/* Added cookies policy */}
            <Route path="/thank-you" element={<BookingSuccessPage />} />
<Route path="/message-sent" element={<ContactSuccessPage />} />

            <Route path="/termsofservice" element={<TermsPage />} />
          </Routes>
        </main>
        <Footer />
        
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;