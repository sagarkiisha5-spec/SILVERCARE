import { HeartPulse, Mail, MapPin, Phone, Instagram, Linkedin, MessageCircle, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContent } from "@/src/hooks/useAppContent";

export default function Footer() {
  const { siteSettings } = useAppContent();
  
  const phone = siteSettings.phone || "+91 800-14-800-75";
  const rawPhone = phone.replace(/[^0-9+]/g, '');
  const email = siteSettings.email || "info@silvercareindia.com";
  const address = siteSettings.address || "SCO 110, 1st Floor, Green Lotus Avenue Complex, Near, Singhpura Rd, Chandigarh, Zirakpur, Punjab 140603";

  return (
    <footer className="bg-[#2B0E1E] text-pink-100/80">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Logo & Address Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/silvercare-footer-logo.png"
                alt="SilverCare India - Rakhe Aapke Apne Ka Khayal"
                className="h-16 sm:h-20 w-auto max-w-[280px] object-contain bg-white p-2.5 rounded-xl shadow-md border border-white/30"
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
              <span>SCO 110, 1st Floor, Green Lotus Avenue Complex, Near, Singhpura Rd, Chandigarh, Zirakpur, Punjab 140603</span>
            </div>
          </div>
          
          {/* Useful Links Column */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">Useful Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-slate-400 hover:text-[#FF4F81] transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-[#FF4F81] transition-colors">About Us</Link></li>
              <li><Link to="/plans" className="text-slate-400 hover:text-[#FF4F81] transition-colors">Freedom Care Plans</Link></li>
              <li><Link to="/partner-with-us" className="text-slate-400 hover:text-[#FF4F81] transition-colors">Franchise (Partner With Us)</Link></li>
              <li><Link to="/professionals" className="text-slate-400 hover:text-[#FF4F81] transition-colors">Our Team</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-[#FF4F81] transition-colors">Contact Us</Link></li>
              <li><Link to="/admin/login" className="text-[#FF4F81] font-bold hover:text-white transition-colors">🔑 Admin Panel Login</Link></li>
            </ul>
          </div>
          
          {/* Services Column */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">Our Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services/nursing-attendant-care" className="text-slate-400 hover:text-[#FF4F81] transition-colors">Nursing & Attendant Care</Link></li>
              <li><Link to="/services/doctor-visit-at-home" className="text-slate-400 hover:text-[#FF4F81] transition-colors">Doctor Visit at Home</Link></li>
              <li><Link to="/services/physiotherapy-at-home" className="text-slate-400 hover:text-[#FF4F81] transition-colors">Physiotherapy at Home</Link></li>
              <li><Link to="/services/pathology-diagnostics" className="text-slate-400 hover:text-[#FF4F81] transition-colors">Pathology & Diagnostics</Link></li>
              <li><Link to="/services/telemedicine" className="text-slate-400 hover:text-[#FF4F81] transition-colors">Telemedicine</Link></li>
              <li><Link to="/services/medical-equipment" className="text-slate-400 hover:text-[#FF4F81] transition-colors">Medical Equipment</Link></li>
              <li><Link to="/services/icu-setup" className="text-slate-400 hover:text-[#FF4F81] transition-colors">ICU Set-up</Link></li>
              <li><Link to="/services/mother-baby-care" className="text-slate-400 hover:text-[#FF4F81] transition-colors">Mother & Baby Care</Link></li>
            </ul>
          </div>
          
          {/* Contact Us & Social Links Column */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#FF4F81] shrink-0" />
                <a href={`tel:${rawPhone}`} className="text-slate-400 hover:text-[#FF4F81] transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#FF4F81] shrink-0" />
                <a href={`mailto:${email}`} className="text-slate-400 hover:text-[#FF4F81] transition-colors">{email}</a>
              </li>
              
              {/* WhatsApp, Instagram & LinkedIn Social Icons */}
              <li className="pt-2 flex items-center gap-2.5">
                <a
                  href="https://wa.me/918001480075?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/30 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110"
                >
                  <MessageCircle size={18} />
                </a>

                <a
                  href="https://www.instagram.com/silvercare_eldercare?stkn=YzdodG9pdmw0NTV3&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="h-9 w-9 rounded-xl bg-pink-500/20 text-pink-400 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white border border-pink-500/30 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110"
                >
                  <Instagram size={18} />
                </a>

                <a
                  href="https://www.linkedin.com/company/silvercare-eldercare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="h-9 w-9 rounded-xl bg-sky-500/20 text-sky-400 hover:bg-sky-600 hover:text-white border border-sky-500/30 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110"
                >
                  <Linkedin size={18} />
                </a>

                <a
                  href="https://youtube.com/@silvercareindia_eldercare?si=-_z8Hnt1VZbRdLhp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  title="YouTube"
                  className="h-9 w-9 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110"
                >
                  <Youtube size={18} />
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <Link to="/book" className="inline-block bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-md">
                Book Appointment →
              </Link>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Bar with Digiexplode AI Developer Credit */}
        <div className="mt-16 pt-8 border-t border-pink-950/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-pink-200/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3.5 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} SilverCare India. All Rights Reserved.</span>
            <span className="hidden sm:inline text-pink-400/30">•</span>
            <div className="inline-flex items-center gap-1.5 text-pink-200/70">
              <span className="text-[12px] text-pink-200/50">Developed by</span>
              <span className="font-bold tracking-wide text-transparent bg-clip-text bg-[linear-gradient(90deg,#FF85A8,#E2B4FC)] text-[12.5px] hover:brightness-125 transition-all">
                Digiexplode AI
              </span>
            </div>
          </div>
          
          <div className="flex gap-6 text-xs sm:text-[13px]">
            <Link to="/privacy" className="text-pink-200/60 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-pink-200/60 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
