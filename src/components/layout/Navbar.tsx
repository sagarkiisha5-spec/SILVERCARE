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
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF3E72] via-[#D946EF] to-[#7B2CBF]"></div>
      
      <nav className="relative z-[100] w-full border-b border-slate-100 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
          
            {/* Original SilverCare Live Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex flex-col group py-1">
                <img
                  src="/silvercare-logo.png"
                  alt="SilverCare India Logo"
                  className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
                  onError={(e) => {
                    (e.target as any).src = "https://silvercareindia.com/wp-content/uploads/2025/12/logo.png";
                  }}
                />
              </Link>
            </div>

            {/* Desktop Navigation matching target screenshot */}
            <div className="hidden md:flex items-center h-full">
              <div className="ml-8 flex items-stretch space-x-2 h-full">
                
                {/* Home */}
                <Link 
                  to="/" 
                  className={`flex items-center px-3.5 text-[15px] font-bold transition-colors border-b-2 ${isActive('/') ? 'border-[#7B2CBF] text-[#7B2CBF]' : 'border-transparent text-slate-700 hover:text-[#7B2CBF]'}`}
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
                    className={`flex items-center gap-1 px-3.5 text-[15px] font-bold transition-colors border-b-2 ${isActive('/about') || isActive('/professionals') ? 'border-[#7B2CBF] text-[#7B2CBF]' : 'border-transparent text-slate-700 hover:text-[#7B2CBF]'}`}
                  >
                    About Us <ChevronDown size={14} className={`transition-transform duration-200 opacity-70 ${isAboutOpen ? 'rotate-180' : ''}`} />
                  </Link>
                  
                  {isAboutOpen && (
                    <div className="absolute top-[calc(100%-4px)] left-0 w-[240px] bg-white shadow-xl rounded-2xl border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                      <Link to="/about#who-we-are" className="block px-3.5 py-2.5 hover:bg-purple-50 rounded-xl font-medium text-slate-700 hover:text-[#7B2CBF] text-sm" onClick={() => setIsAboutOpen(false)}>
                        Who We Are
                      </Link>
                      <Link to="/about#how-we-work" className="block px-3.5 py-2.5 hover:bg-purple-50 rounded-xl font-medium text-slate-700 hover:text-[#7B2CBF] text-sm" onClick={() => setIsAboutOpen(false)}>
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
                    className={`flex items-center gap-1 px-3.5 text-[15px] font-bold transition-colors border-b-2 ${isActive('/services') || location.pathname.startsWith('/services/') ? 'border-[#7B2CBF] text-[#7B2CBF]' : 'border-transparent text-slate-700 hover:text-[#7B2CBF]'}`}
                  >
                    Services <ChevronDown size={14} className={`transition-transform duration-200 opacity-70 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </Link>
                  
                  {isServicesOpen && (
                    <div className="absolute top-[calc(100%-4px)] -left-48 w-[720px] bg-white shadow-2xl rounded-3xl border border-slate-100 p-6 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-left">
                      <div className="grid grid-cols-12 gap-6">
                        
                        {/* Left 8 Cols: Services 2-Column Grid */}
                        <div className="col-span-8">
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Our Eldercare Services</span>
                            <Link to="/services" className="text-xs font-bold text-[#7B2CBF] hover:underline" onClick={() => setIsServicesOpen(false)}>
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
                                  className="p-3 rounded-2xl hover:bg-purple-50/80 border border-transparent hover:border-purple-100 transition-all group/item flex items-start gap-3"
                                  onClick={() => setIsServicesOpen(false)}
                                >
                                  <div className="h-9 w-9 rounded-xl bg-purple-100 text-[#7B2CBF] flex items-center justify-center shrink-0 group-hover/item:bg-[#7B2CBF] group-hover/item:text-white transition-colors">
                                    <Icon size={18} />
                                  </div>
                                  <div>
                                    <h4 className="font-extrabold text-slate-900 group-hover/item:text-[#7B2CBF] text-xs sm:text-sm leading-snug">{srv.title}</h4>
                                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{srv.shortDescription}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right 4 Cols: Featured Care Highlight Banner */}
                        <div className="col-span-4 bg-[linear-gradient(135deg,#1E1B4B_0%,#3B0764_100%)] text-white rounded-2xl p-5 flex flex-col justify-between shadow-md">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-purple-200 text-[10px] font-extrabold uppercase mb-3">
                              <Sparkles size={12} className="text-[#D946EF]" /> 24/7 Helpline
                            </div>
                            <h4 className="font-extrabold text-white text-sm leading-snug mb-2">
                              Need Immediate Eldercare Support?
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              Our clinical team is ready to deploy verified nurses & doctors to your home.
                            </p>
                          </div>

                          <Link to="/book" className="mt-4" onClick={() => setIsServicesOpen(false)}>
                            <Button size="sm" className="w-full bg-[linear-gradient(90deg,#FF3E72,#FF5C8D)] text-white font-extrabold text-xs h-9 rounded-xl border-0 shadow-md">
                              Book Consultation
                            </Button>
                          </Link>
                        </div>

                      </div>
                    </div>
                  )}
                </div>

                {/* Book Appointment Link */}
                <Link 
                  to="/book" 
                  className={`flex items-center px-3.5 text-[15px] font-bold transition-colors border-b-2 ${isActive('/book') ? 'border-[#7B2CBF] text-[#7B2CBF]' : 'border-transparent text-slate-700 hover:text-[#7B2CBF]'}`}
                >
                  Book Appointment
                </Link>

                {/* Contact Us */}
                <Link 
                  to="/contact" 
                  className={`flex items-center px-3.5 text-[15px] font-bold transition-colors border-b-2 ${isActive('/contact') ? 'border-[#7B2CBF] text-[#7B2CBF]' : 'border-transparent text-slate-700 hover:text-[#7B2CBF]'}`}
                >
                  Contact us
                </Link>

                {/* Blog */}
                <Link 
                  to="/blog" 
                  className={`flex items-center px-3.5 text-[15px] font-bold transition-colors border-b-2 ${isActive('/blog') || location.pathname.startsWith('/blog') ? 'border-[#7B2CBF] text-[#7B2CBF]' : 'border-transparent text-slate-700 hover:text-[#7B2CBF]'}`}
                >
                  Blog
                </Link>

                {/* Our Team */}
                <Link 
                  to="/professionals" 
                  className={`flex items-center px-3.5 text-[15px] font-bold transition-colors border-b-2 ${isActive('/professionals') ? 'border-[#7B2CBF] text-[#7B2CBF]' : 'border-transparent text-slate-700 hover:text-[#7B2CBF]'}`}
                >
                  Our Team
                </Link>

              </div>
            </div>

            {/* Right Side Pill CTA Button matching target screenshot */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <Link to="/book">
                <Button className="bg-[linear-gradient(90deg,#FF3E72,#FF5C8D)] hover:opacity-95 text-white font-extrabold h-11 px-6 rounded-full text-sm shadow-md shadow-[#FF3E72]/20 border-0 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0">
                  <span>Book Appointment</span>
                  <ArrowRightCircle size={18} className="text-white shrink-0" />
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 hover:text-[#7B2CBF] transition-colors focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white absolute w-full shadow-lg z-50">
            <div className="space-y-1 px-4 pb-6 pt-4">
              <Link to="/" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/') ? 'bg-[#F5E8FF] text-[#7B2CBF]' : 'text-slate-700 hover:bg-slate-50'}`}>Home</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/about') ? 'bg-[#F5E8FF] text-[#7B2CBF]' : 'text-slate-700 hover:bg-slate-50'}`}>About Us</Link>
              <Link to="/services" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/services') ? 'bg-[#F5E8FF] text-[#7B2CBF]' : 'text-slate-700 hover:bg-slate-50'}`}>Services</Link>
              <Link to="/book" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/book') ? 'bg-[#F5E8FF] text-[#7B2CBF]' : 'text-slate-700 hover:bg-slate-50'}`}>Book Appointment</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/contact') ? 'bg-[#F5E8FF] text-[#7B2CBF]' : 'text-slate-700 hover:bg-slate-50'}`}>Contact us</Link>
              <Link to="/blog" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/blog') || location.pathname.startsWith('/blog') ? 'bg-[#F5E8FF] text-[#7B2CBF]' : 'text-slate-700 hover:bg-slate-50'}`}>Blog & Stories</Link>
              <Link to="/professionals" onClick={() => setIsOpen(false)} className={`block rounded-lg px-4 py-3 text-base font-bold ${isActive('/professionals') ? 'bg-[#F5E8FF] text-[#7B2CBF]' : 'text-slate-700 hover:bg-slate-50'}`}>Our Team</Link>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link to="/book" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[linear-gradient(90deg,#FF3E72,#FF5C8D)] text-white font-bold text-base h-12 rounded-full shadow-md border-0 flex items-center justify-center gap-2">
                    <span>Book Appointment</span>
                    <ArrowRightCircle size={18} />
                  </Button>
                </Link>
                <a href={`tel:${rawPhone}`} className="mt-4 flex items-center justify-center gap-2 text-slate-700 font-bold py-3 hover:text-[#7B2CBF] transition-colors">
                  <PhoneCall size={20} className="text-[#FF3E72]" /> {phoneNumber}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Sub-header Suggestive Search Bar */}
      <div className="relative z-10 block w-full bg-slate-50 border-b border-slate-200 py-2 sm:py-2.5 shadow-sm px-3 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-center">
          <ServiceSearch className="w-full max-w-4xl" placeholder="Search for healthcare services (e.g. Home Nursing, Physiotherapy...)" />
        </div>
      </div>
    </motion.header>
  );
}
