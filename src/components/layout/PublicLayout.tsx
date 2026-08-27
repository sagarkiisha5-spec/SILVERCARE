import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { PhoneCall, CalendarDays, MessageCircle } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAppContent } from "@/src/hooks/useAppContent";
import AutoBookingModal from "@/src/components/shared/AutoBookingModal";

export default function PublicLayout() {
  const location = useLocation();
  const { siteSettings } = useAppContent();
  const phone = siteSettings.phone || "+918001480075";
  const rawPhone = phone.replace(/[^0-9+]/g, '');
  const waMessage = encodeURIComponent("Hello SilverCare, I would like to know more about your home healthcare and eldercare services.");
  const waLink = `https://wa.me/${rawPhone.replace('+', '')}?text=${waMessage}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans pb-[72px] md:pb-0 relative">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Auto Popup Booking Modal after 2 seconds */}
      <AutoBookingModal />
      
      {/* Floating WhatsApp Button */}
      <a 
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-50 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
      
      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 flex">
        <a href={`tel:${rawPhone}`} className="flex-1 flex flex-col items-center justify-center py-3 text-slate-600 hover:text-[#7B2CBF] hover:bg-slate-50 transition-colors">
          <PhoneCall size={20} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call Now</span>
        </a>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center py-3 border-l border-r border-slate-100 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-colors">
          <MessageCircle size={20} className="mb-1 text-[#25D366]" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>
        <Link to="/book" className="flex-[1.5] flex flex-col items-center justify-center py-3 bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] text-white hover:opacity-90 transition-colors">
          <CalendarDays size={20} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Book a Visit</span>
        </Link>
      </div>
    </div>
  );
}

