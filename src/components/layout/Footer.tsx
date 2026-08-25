import { HeartPulse, Mail, MapPin, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContent } from "@/src/hooks/useAppContent";

export default function Footer() {
  const { siteSettings } = useAppContent();
  
  const phone = siteSettings.phone || "+91 800-14-800-75";
  const rawPhone = phone.replace(/[^0-9+]/g, '');
  const email = siteSettings.email || "care@silvercare.com";
  const address = siteSettings.address || "Flat No-60, SF Sector-33,\nGurgaon, Haryana 122001";

  return (
    <footer className="bg-[#241442] text-[#DCC7EF]">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/silvercare-footer-logo.png"
                alt="SilverCare India Logo"
                className="h-12 w-auto object-contain bg-white/10 p-1.5 rounded-xl border border-white/10"
                onError={(e) => {
                  (e.target as any).src = "https://silvercareindia.com/wp-content/uploads/2025/12/footer-logo.png";
                }}
              />
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm text-sm">
              Providing compassionate, professional eldercare services at home across North India. Bringing dignity, comfort, and peace of mind to families.
            </p>
            <div className="flex items-start gap-3 text-xs text-slate-400">
              <MapPin size={16} className="text-[#FF4F81] shrink-0 mt-0.5" />
              <span>Flat No-60, SF Sector-33, Gurgaon, Haryana, India 122001</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">Useful Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-slate-400 hover:text-[#FF9F43] transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-[#FF9F43] transition-colors">About Us</Link></li>
              <li><Link to="/professionals" className="text-slate-400 hover:text-[#FF9F43] transition-colors">Our Team</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-[#FF9F43] transition-colors">Contact Us</Link></li>
              <li><Link to="/admin/login" className="text-[#FF4F81] font-bold hover:text-white transition-colors">🔑 Admin Panel Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">Our Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services/nursing-attendant-care" className="text-slate-400 hover:text-[#FF9F43] transition-colors">Nursing & Attendant Care</Link></li>
              <li><Link to="/services/doctor-visit-at-home" className="text-slate-400 hover:text-[#FF9F43] transition-colors">Doctor Visit at Home</Link></li>
              <li><Link to="/services/physiotherapy-at-home" className="text-slate-400 hover:text-[#FF9F43] transition-colors">Physiotherapy at Home</Link></li>
              <li><Link to="/services/pathology-diagnostics" className="text-slate-400 hover:text-[#FF9F43] transition-colors">Pathology & Diagnostics</Link></li>
              <li><Link to="/services/telemedicine" className="text-slate-400 hover:text-[#FF9F43] transition-colors">Telemedicine</Link></li>
              <li><Link to="/services/medical-equipment" className="text-slate-400 hover:text-[#FF9F43] transition-colors">Medical Equipment</Link></li>
              <li><Link to="/services/daycare-companionship" className="text-slate-400 hover:text-[#FF9F43] transition-colors">Daycare & Companionship</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#FF4F81] shrink-0" />
                <a href={`tel:${rawPhone}`} className="text-slate-400 hover:text-[#FF9F43] transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#FF4F81] shrink-0" />
                <a href={`mailto:${email}`} className="text-slate-400 hover:text-[#FF9F43] transition-colors">{email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Globe size={16} className="text-[#FF4F81] shrink-0" />
                <span className="text-slate-400">silvercareindia.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/book" className="inline-block bg-[#7B2CBF] hover:bg-[#6A24A6] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors">
                Book Appointment →
              </Link>
            </div>
          </div>
          
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} SilverCare India. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
