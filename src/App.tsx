import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './lib/AuthContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import BookForm from './pages/public/BookForm';
import Services from './pages/public/Services';
import ServiceDetail from './pages/public/ServiceDetail';
import About from './pages/public/About';
import Professionals from './pages/public/Professionals';
import SearchResults from './pages/public/SearchResults';

import Contact from './pages/public/Contact';
import Blog from './pages/public/Blog';
import BlogPost from './pages/public/BlogPost';
import Plans from './pages/public/Plans';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRequests from './pages/admin/AdminRequests';
import AdminContentManager from './pages/admin/AdminContentManager';
import AdminServices from './pages/admin/AdminServices';
import AdminProfessionals from './pages/admin/AdminProfessionals';
import AdminMediaManager from './pages/admin/AdminMediaManager';
import AdminSocialSync from './pages/admin/AdminSocialSync';
import AdminSettings from './pages/admin/AdminSettings';
import AdminBlog from './pages/admin/AdminBlog';
import AdminTeam from './pages/admin/AdminTeam';
import AdminBilling from './pages/admin/AdminBilling';
import AdminFollowUps from './pages/admin/AdminFollowUps';

// Fallback empty component for unfinished routes
const Placeholder = ({ title }: { title: string }) => (
  <div className="container mx-auto px-4 py-20 text-center">
    <h1 className="text-3xl font-bold text-slate-900 mb-4">{title}</h1>
    <p className="text-slate-500">This page is coming soon.</p>
  </div>
);

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToHash />
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/book" element={<BookForm />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/about" element={<About />} />
              <Route path="/professionals" element={<Professionals />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
              <Route path="/terms" element={<Placeholder title="Terms of Service" />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="requests" element={<AdminRequests />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="billing" element={<AdminBilling />} />
              <Route path="followups" element={<AdminFollowUps />} />
              <Route path="professionals" element={<AdminProfessionals />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="content" element={<AdminMediaManager />} />
              <Route path="social-sync" element={<AdminSocialSync />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}
