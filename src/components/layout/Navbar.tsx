import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, ChevronDown, ArrowRightCircle, Stethoscope, UserCheck, Activity, Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/button';
import { useAppContent, fallbackServices } from '@/src/hooks/useAppContent';
import ServiceSearch from '@/src/components/shared/ServiceSearch';

export default function Navbar() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { services, siteSettings } = useAppContent();

  const isActive = (path: string) => location.pathname === path;

  const displayServices = services.length > 0 ? services : fallbackServices;
  const phoneNumber = siteSettings.phone || "+91 800-14-800-75";
  const rawPhone = phoneNumber.replace(/[^0-9+]/g, '');

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'nursing-attendant-care': return Stethoscope;
      case 'doctor-visit-at-home': return UserCheck;
      case 'physiotherapy-at-home': return Activity;
      case 'pathology-diagnostics': return Sparkles;
      case 'medical-equipment': return ShieldCheck;
      case 'daycare-companionship': return Heart;
      default: return Stethoscope;
    }
  };

  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="sticky top-0 z-[100] w-full bg-white shadow-sm transition-all">
      {/* Top Accent Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF4F81] via-[#EC407A] to-[#E91E63]"></div>

      <nav className="relative z-[100] w-full border-b border-slate-100 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 lg:h-[86px] xl:h-[90px] items-center justify-between">

            {/* SilverCare Live Logo Container */}
            <div className="flex items-center shrink-0 py-1 w-auto max-w-[200px] sm:max-w-[230px] lg:max-w-[260px] xl:max-w-[280px]">
              <Link to="/" className="flex items-center group">
                <img
                  src="/silvercare-logo.png"
                  alt="SilverCare India - Rakhe Aapke Apne Ka Khayal"
                  className="h-12 sm:h-14 lg:h-[62px] xl:h-[72px] w-auto max-w-[180px] sm:max-w-[220px] lg:max-w-[250px] xl:max-w-[280px] object-contain transition-transform group-hover:scale-[1.02]"
                  onError={(e) => {
                    (e.target as any).src = "https://silvercareindia.com/wp-content/uploads/2025/12/logo.png";
                  }}
                />
              </Link>
            </div>

            {/* Desktop Navigation Group (Central Column) */}
            <div className="hidden xl:flex items-center justify-center flex-1 h-full px-2 min-w-0">
              <div className="flex items-stretch space-x-1 lg:space-x-2 xl:space-x-3 2xl:space-x-4 h-full">

                {/* Home */}
                <Link
                  to="/"
                  className={`flex items-center px-2 lg:px-2.5 xl:px-3 text-[13px] xl:text-[14px] 2xl:text-[15px] font-bold whitespace-nowrap transition-colors border-b-2 ${isActive('/') ? 'border-[#E91E63] text-[#E91E63]' : 'border-transparent text-slate-700 hover:text-[#E91E63]'}`}
                >
                  Home
                </Link>

                {/* About Us Dropdown */}
                <div
                  className="relative flex items-center h-full group"
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                >
                  <Link
                    to="/about"
                    className={`flex items-center gap-1 px-2 lg:px-2.5 xl:px-3 text-[13px] xl:text-[14px] 2xl:text-[15px] font-bold whitespace-nowrap transition-colors border-b-2 ${isActive('/about') || isActive('/professionals') ? 'border-[#E91E63] text-[#E91E63]' : 'border-transparent text-slate-700 hover:text-[#E91E63]'}`}
                  >
                    About Us <ChevronDown size={14} className={`transition-transform duration-200 opacity-70 ${isAboutOpen ? 'rotate-180' : ''}`} />
                  </Link>

                  {isAboutOpen && (
                    <div className="absolute top-[calc(100%-4px)] left-0 w-[240px] bg-white shadow-xl rounded-2xl border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                      <Link to="/about#who-we-are" className="block px-3.5 py-2.5 hover:bg-pink-50 rounded-xl font-medium text-slate-700 hover:text-[#E91E63] text-sm" onClick={() => setIsAboutOpen(false)}>
                        Who We Are
                      </Link>
                      <Link to="/about#how-we-work" className="block px-3.5 py-2.5 hover:bg-pink-50 rounded-xl font-medium text-slate-700 hover:text-[#E91E63] text-sm" onClick={() => setIsAboutOpen(false)}>
                        How We Work
                      </Link>
                    </div>
                  )}
                </div>

                {/* Services Mega Menu */}
                <div
                  className="relative flex items-center h-full group"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <Link
                    to="/services"
                    className={`flex items-center gap-1 px-2 lg:px-2.5 xl:px-3 text-[13px] xl:text-[14px] 2xl:text-[15px] font-bold whitespace-nowrap transition-colors border-b-2 ${isActive('/services') || location.pathname.startsWith('/services/') ? 'border-[#E91E63] text-[#E91E63]' : 'border-transparent text-slate-700 hover:text-[#E91E63]'}`}
                  >
                    Services <ChevronDown size={14} className={`transition-transform duration-200 opacity-70 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </Link>

                  {isServicesOpen && (
                    <div className="absolute top-[calc(100%-4px)] -left-36 w-[700px] bg-white shadow-2xl rounded-3xl border border-slate-100 p-6 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-left">
                      <div className="grid grid-cols-12 gap-6">

                        {/* Left 8 Cols: Services 2-Column Grid */}
                        <div className="col-span-8">
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Our Eldercare Services</span>
                            <Link to="/services" className="text-xs font-bold text-[#E91E63] hover:underline" onClick={() => setIsServicesOpen(false)}>
                              View All Services →
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {displayServices.slice(0, 6).map(srv => {
                              const Icon = getServiceIcon(srv.slug);
                              return (
                                <Link
                                  key={srv.id}
                                  to={`/services/${srv.slug}`}
                                  className="p-3 rounded-2xl hover:bg-pink-50/80 border border-transparent hover:border-pink-100 transition-all group/item flex items-start gap-3"
                                  onClick={() => setIsServicesOpen(false)}
                                >
                                  <div className="h-9 w-9 rounded-xl bg-pink-100 text-[#E91E63] flex items-center justify-center shrink-0 group-hover/item:bg-[#E91E63] group-hover/item:text-white transition-colors">
                                    <Icon size={18} />
                                  </div>
                                  <div>
                                    <h4 className="font-extrabold text-slate-900 group-hover/item:text-[#E91E63] text-xs sm:text-sm leading-snug">{srv.title}</h4>
                                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{srv.shortDescription}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right 4 Cols: Featured Care Highlight Banner */}
                        <div className="col-span-4 bg-[linear-gradient(135deg,#880E4F_0%,#AD1457_100%)] text-white rounded-2xl p-5 flex flex-col justify-between shadow-md">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-pink-200 text-[10px] font-extrabold uppercase mb-3">
                              <Sparkles size={12} className="text-[#FF80AB]" /> 24/7 Helpline
                            </div>
                            <h4 className="font-extrabold text-white text-sm leading-snug mb-2">
                              Need Immediate Eldercare Support?
                            </h4>
                            <p className="text-xs text-pink-100 leading-relaxed">
                              Our clinical team is ready to deploy verified nurses & doctors to your home.
                            </p>
                          </div>

                          <Link to="/book" className="mt-4" onClick={() => setIsServicesOpen(false)}>
                            <Button size="sm" className="w-full bg-[linear-gradient(90deg,#FF4F81,#FF6B8B)] text-white font-extrabold text-xs h-9 rounded-xl border-0 shadow-md">
                              Book Consultation
                            </Button>
                          </Link>
                        </div>

                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Us */}
                <Link
                  to="/contact"
                  className={`flex items-center px-2 lg:px-2.5 xl:px-3 text-[13px] xl:text-[14px] 2xl:text-[15px] font-bold whitespace-nowrap transition-colors border-b-2 ${isActive('/contact') ? 'border-[#E91E63] text-[#E91E63]' : 'border-transparent text-slate-700 hover:text-[#E91E63]'}`}
                >
                  Contact us
                </Link>

                {/* Blog */}
                <Link
                  to="/blog"
                  className={`flex items-center px-2 lg:px-2.5 xl:px-3 text-[13px] xl:text-[14px] 2xl:text-[15px] font-bold whitespace-nowrap transition-colors border-b-2 ${isActive('/blog') || location.pathname.startsWith('/blog') ? 'border-[#E91E63] text-[#E91E63]' : 'border-transparent text-slate-700 hover:text-[#E91E63]'}`}
                >
                  Blog
                </Link>

                {/* Our Team */}
                <Link
                  to="/professionals"
                  className={`flex items-center px-2 lg:px-2.5 xl:px-3 text-[13px] xl:text-[14px] 2xl:text-[15px] font-bold whitespace-nowrap transition-colors border-b-2 ${isActive('/professionals') ? 'border-[#E91E63] text-[#E91E63]' : 'border-transparent text-slate-700 hover:text-[#E91E63]'}`}
                >
                  Our Team
                </Link>

              </div>
            </div>

            {/* Right Side Pill CTA Button Container */}
            <div className="hidden xl:flex items-center justify-end shrink-0 w-auto">
              <Link to="/book">
                <Button className="bg-[linear-gradient(90deg,#FF3E72,#FF5C8D)] hover:opacity-95 text-white font-extrabold h-10 xl:h-11 px-4 xl:px-6 rounded-full text-xs xl:text-sm shadow-md shadow-[#FF3E72]/20 border-0 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0">
                  <span>Book Appointment</span>
                  <ArrowRightCircle size={18} className="text-white shrink-0" />
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex xl:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-pink-50 hover:text-[#E91E63] transition-colors focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="xl:hidden border-t border-slate-100 bg-white absolute w-full shadow-xl z-50">
            <div className="space-y-1 px-4 pb-6 pt-4">
              <Link to="/" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/') ? 'bg-pink-50 text-[#E91E63]' : 'text-slate-700 hover:bg-slate-50'}`}>Home</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/about') ? 'bg-pink-50 text-[#E91E63]' : 'text-slate-700 hover:bg-slate-50'}`}>About Us</Link>
              <Link to="/services" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/services') ? 'bg-pink-50 text-[#E91E63]' : 'text-slate-700 hover:bg-slate-50'}`}>Services</Link>
              <Link to="/book" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/book') ? 'bg-pink-50 text-[#E91E63]' : 'text-slate-700 hover:bg-slate-50'}`}>Book Appointment</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/contact') ? 'bg-pink-50 text-[#E91E63]' : 'text-slate-700 hover:bg-slate-50'}`}>Contact us</Link>
              <Link to="/blog" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/blog') || location.pathname.startsWith('/blog') ? 'bg-pink-50 text-[#E91E63]' : 'text-slate-700 hover:bg-slate-50'}`}>Blog & Stories</Link>
              <Link to="/professionals" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/professionals') ? 'bg-pink-50 text-[#E91E63]' : 'text-slate-700 hover:bg-slate-50'}`}>Our Team</Link>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link to="/book" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[linear-gradient(90deg,#FF3E72,#FF5C8D)] text-white font-bold text-base h-12 rounded-full shadow-md border-0 flex items-center justify-center gap-2">
                    <span>Book Appointment</span>
                    <ArrowRightCircle size={18} />
                  </Button>
                </Link>
                <a href={`tel:${rawPhone}`} className="mt-4 flex items-center justify-center gap-2 text-slate-700 font-bold py-3 hover:text-[#E91E63] transition-colors">
                  <PhoneCall size={20} className="text-[#FF3E72]" /> {phoneNumber}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Sub-header Suggestive Search Bar Strip - Completely Responsive Across All Screen Widths */}
      <div className="relative z-10 block w-full bg-slate-50 border-b border-slate-200 py-1.5 sm:py-2 shadow-2xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
            <ServiceSearch className="w-full" placeholder="Search for healthcare services (e.g. Home Nursing, Physiotherapy...)" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
