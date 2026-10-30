import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// Route-based code splitting.
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const ServiceDetail = lazy(() => import('./pages/services/ServiceDetail.jsx'));
const Careers = lazy(() => import('./pages/Careers.jsx'));
const RequestConsultation = lazy(() => import('./pages/RequestConsultation.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function Loading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/request-consultation" element={<RequestConsultation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            {/* Legacy / convenience redirects */}
            <Route path="/consultation" element={<Navigate to="/request-consultation" replace />} />
            <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
            <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
