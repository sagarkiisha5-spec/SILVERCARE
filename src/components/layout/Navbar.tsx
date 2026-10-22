import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, ChevronDown, ArrowRightCircle, Stethoscope, UserCheck, Activity, Sparkles, ShieldCheck, Heart, ArrowRight, Globe, Users, Briefcase, BookOpen, Info, HelpCircle, Handshake, MapPin } from 'lucide-react';
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
      case 'icu-setup': return Activity;
      case 'daycare-companionship': return Heart;
      case 'mother-baby-care': return Heart;
      default: return Stethoscope;
    }
  };

  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="sticky top-0 z-[100] w-full bg-white shadow-sm transition-all overflow-x-clip">
      {/* Top Accent Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF4F81] via-[#EC407A] to-[#E91E63]"></div>

      <nav className="relative z-[100] w-full border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-[1680px] px-3 sm:px-6 xl:px-8 2xl:px-10">
          <div className="flex h-18 lg:h-[76px] xl:h-[80px] items-center justify-between">

            {/* SilverCare Live Logo Container */}
            <div className="flex items-center shrink-0 py-1 mr-2 sm:mr-4 xl:mr-5 2xl:mr-8">
              <Link to="/" className="flex items-center group focus:outline-none" aria-label="SilverCare Home">
                <img
                  src="/silvercare-logo.png"
                  alt="SilverCare India - Rakhe Aapke Apno Ka Khayal"
                  className="h-8.5 sm:h-9.5 xl:h-11 2xl:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                  onError={(e) => {
                    (e.target as any).src = "https://silvercareindia.com/wp-content/uploads/2025/12/logo.png";
                  }}
                />
              </Link>
            </div>

            {/* Desktop Navigation Group (Central Column) - 7 items with responsive spacing (>= xl: 1280px) */}
            <div className="hidden xl:flex items-center justify-center flex-1 h-full px-1 xl:px-2 min-w-0">
              <div className="flex items-center gap-0.5 xl:gap-1.5 2xl:gap-3.5 h-full">

                {/* 1. Services Mega Menu */}
                <div
                  className="relative flex items-center h-full group shrink-0"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <Link
                    to="/services"
                    className={`relative flex items-center h-full px-1.5 xl:px-2 2xl:px-3 text-[12.5px] xl:text-[13px] 2xl:text-[14.5px] font-bold whitespace-nowrap transition-colors group/btn ${
                      isActive('/services') || location.pathname.startsWith('/services/')
                        ? 'text-[#E91E63]'
                        : 'text-slate-700 hover:text-[#E91E63]'
                    }`}
                  >
                    <span className="relative py-2 flex items-center gap-1">
                      Services
                      <ChevronDown size={13} className={`transition-transform duration-200 opacity-70 ${isServicesOpen ? 'rotate-180' : ''}`} />
                      {(isActive('/services') || location.pathname.startsWith('/services/')) && (
                        <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#E91E63] rounded-full shadow-xs" />
                      )}
                    </span>
                  </Link>

                  {isServicesOpen && (
                    <div className="absolute top-[calc(100%-4px)] -left-20 xl:-left-28 w-[680px] bg-white shadow-2xl rounded-3xl border border-slate-100 p-6 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-left">
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
                            {displayServices.slice(0, 8).map(srv => {
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

                          {/* Quick Plan Links Bar inside Services Dropdown */}
                          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5">
                            <Link to="/plans" onClick={() => setIsServicesOpen(false)} className="text-[11px] xl:text-xs font-bold text-slate-700 hover:text-[#E91E63] flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                              <ShieldCheck size={13} className="text-[#E91E63]" /> Freedom Plans
                            </Link>
                            <Link to="/post-surgery-recovery-package" onClick={() => setIsServicesOpen(false)} className="text-[11px] xl:text-xs font-bold text-[#8138B5] hover:text-[#6A24A6] flex items-center gap-1 bg-[#F7EEFC] px-2 py-1 rounded-lg border border-[#E9D4F7]">
                              <Activity size={13} className="text-[#8138B5]" /> Post Surgery Recovery
                            </Link>
                            <Link to="/best-elderly-healthcare-services-chandigarh" onClick={() => setIsServicesOpen(false)} className="text-[11px] xl:text-xs font-bold text-slate-700 hover:text-[#E91E63] flex items-center gap-1 bg-pink-50 px-2 py-1 rounded-lg border border-pink-100">
                              <MapPin size={13} className="text-[#E91E63]" /> Chandigarh
                            </Link>
                            <Link to="/nri-care" onClick={() => setIsServicesOpen(false)} className="text-[11px] xl:text-xs font-bold text-slate-700 hover:text-sky-600 flex items-center gap-1 bg-sky-50 px-2 py-1 rounded-lg border border-sky-100">
                              <Globe size={13} className="text-sky-600" /> NRI Care
                            </Link>
                          </div>
                        </div>

                        {/* Right 4 Cols: Featured Care Highlight Banner */}
                        <div className="col-span-4 bg-[linear-gradient(135deg,#880E4F_0%,#AD1457_100%)] text-white rounded-2xl p-5 flex flex-col justify-between shadow-md">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-pink-200 text-[10px] font-extrabold uppercase mb-3">
                              <Sparkles size={12} className="text-[#FF80AB]" /> Dedicated Care Support
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

                {/* 2. Freedom Plans */}
                <Link
                  to="/plans"
                  className={`relative flex items-center h-full px-1.5 xl:px-2 2xl:px-3 text-[12.5px] xl:text-[13px] 2xl:text-[14.5px] font-bold whitespace-nowrap shrink-0 transition-colors group ${
                    isActive('/plans') ? 'text-[#E91E63]' : 'text-slate-700 hover:text-[#E91E63]'
                  }`}
                >
                  <span className="relative py-2 flex items-center">
                    Freedom Plans
                    {isActive('/plans') ? (
                      <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#E91E63] rounded-full shadow-xs" />
                    ) : (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E91E63] rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
                    )}
                  </span>
                </Link>

                {/* 3. Post Surgery Recovery Package */}
                <Link
                  to="/post-surgery-recovery-package"
                  className={`relative flex items-center h-full px-1.5 xl:px-2 2xl:px-3 text-[12.5px] xl:text-[13px] 2xl:text-[14.5px] font-bold whitespace-nowrap shrink-0 transition-colors group ${
                    isActive('/post-surgery-recovery-package') ? 'text-[#8138B5]' : 'text-slate-700 hover:text-[#8138B5]'
                  }`}
                >
                  <span className="relative py-2 flex items-center">
                    Post Surgery Recovery
                    <span className="hidden 2xl:inline">&nbsp;Package</span>
                    {isActive('/post-surgery-recovery-package') ? (
                      <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#8138B5] rounded-full shadow-xs" />
                    ) : (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#8138B5] rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
                    )}
                  </span>
                </Link>

                {/* 4. NRI Care Plan */}
                <Link
                  to="/nri-care"
                  className={`relative flex items-center h-full px-1.5 xl:px-2 2xl:px-3 text-[12.5px] xl:text-[13px] 2xl:text-[14.5px] font-bold whitespace-nowrap shrink-0 transition-colors group ${
                    isActive('/nri-care') ? 'text-[#C9A45C]' : 'text-slate-700 hover:text-[#C9A45C]'
                  }`}
                >
                  <span className="relative py-2 flex items-center gap-1 xl:gap-1.5">
                    <Globe size={13} className={isActive('/nri-care') ? "text-[#C9A45C] shrink-0" : "text-slate-400 group-hover:text-[#C9A45C] shrink-0 transition-colors"} />
                    NRI Care Plan
                    {isActive('/nri-care') ? (
                      <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#C9A45C] rounded-full shadow-xs" />
                    ) : (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C9A45C] rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
                    )}
                  </span>
                </Link>

                {/* 5. Partner With Us */}
                <Link
                  to="/partner-with-us"
                  className={`relative flex items-center h-full px-1.5 xl:px-2 2xl:px-3 text-[12.5px] xl:text-[13px] 2xl:text-[14.5px] font-bold whitespace-nowrap shrink-0 transition-colors group ${
                    isActive('/partner-with-us') ? 'text-[#E91E63]' : 'text-slate-700 hover:text-[#E91E63]'
                  }`}
                >
                  <span className="relative py-2 flex items-center gap-1 xl:gap-1.5">
                    <Handshake size={14} className={isActive('/partner-with-us') ? "text-[#E91E63] shrink-0" : "text-[#E91E63] opacity-80 group-hover:opacity-100 shrink-0 transition-opacity"} />
                    Partner With Us
                    {isActive('/partner-with-us') ? (
                      <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#E91E63] rounded-full shadow-xs" />
                    ) : (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E91E63] rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
                    )}
                  </span>
                </Link>

                {/* 6. About Us Dropdown */}
                <div
                  className="relative flex items-center h-full group shrink-0"
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                >
                  <Link
                    to="/about"
                    className={`relative flex items-center h-full px-1.5 xl:px-2 2xl:px-3 text-[12.5px] xl:text-[13px] 2xl:text-[14.5px] font-bold whitespace-nowrap transition-colors group/btn ${
                      isActive('/about') || isActive('/professionals') || location.pathname.startsWith('/blog')
                        ? 'text-[#E91E63]'
                        : 'text-slate-700 hover:text-[#E91E63]'
                    }`}
                  >
                    <span className="relative py-2 flex items-center gap-1">
                      About Us
                      <ChevronDown size={13} className={`transition-transform duration-200 opacity-70 ${isAboutOpen ? 'rotate-180' : ''}`} />
                      {(isActive('/about') || isActive('/professionals') || location.pathname.startsWith('/blog')) && (
                        <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#E91E63] rounded-full shadow-xs" />
                      )}
                    </span>
                  </Link>

                  {isAboutOpen && (
                    <div className="absolute top-[calc(100%-4px)] left-0 w-[260px] bg-white shadow-xl rounded-2xl border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                      <Link to="/about#who-we-are" className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-pink-50 rounded-xl font-medium text-slate-700 hover:text-[#E91E63] text-sm transition-colors" onClick={() => setIsAboutOpen(false)}>
                        <Info size={16} className="text-[#E91E63]" /> Who We Are
                      </Link>
                      <Link to="/about#how-we-work" className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-pink-50 rounded-xl font-medium text-slate-700 hover:text-[#E91E63] text-sm transition-colors" onClick={() => setIsAboutOpen(false)}>
                        <HelpCircle size={16} className="text-[#E91E63]" /> How We Work
                      </Link>
                      <div className="my-1 border-t border-slate-100"></div>
                      <Link to="/professionals" className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-pink-50 rounded-xl font-medium text-slate-700 hover:text-[#E91E63] text-sm transition-colors" onClick={() => setIsAboutOpen(false)}>
                        <Users size={16} className="text-[#E91E63]" /> Our Team
                      </Link>
                      <Link to="/contact#join-us" className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-pink-50 rounded-xl font-medium text-slate-700 hover:text-[#E91E63] text-sm transition-colors" onClick={() => setIsAboutOpen(false)}>
                        <Briefcase size={16} className="text-[#E91E63]" /> Join Us (Careers)
                      </Link>
                      <Link to="/blog" className="flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-pink-50 rounded-xl font-medium text-slate-700 hover:text-[#E91E63] text-sm transition-colors" onClick={() => setIsAboutOpen(false)}>
                        <BookOpen size={16} className="text-[#E91E63]" /> Blog & Stories
                      </Link>
                    </div>
                  )}
                </div>

                {/* 7. Contact Us */}
                <Link
                  to="/contact"
                  className={`relative flex items-center h-full px-1.5 xl:px-2 2xl:px-3 text-[12.5px] xl:text-[13px] 2xl:text-[14.5px] font-bold whitespace-nowrap shrink-0 transition-colors group ${
                    isActive('/contact') && !location.hash.includes('join') ? 'text-[#E91E63]' : 'text-slate-700 hover:text-[#E91E63]'
                  }`}
                >
                  <span className="relative py-2 flex items-center">
                    Contact us
                    {isActive('/contact') && !location.hash.includes('join') ? (
                      <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#E91E63] rounded-full shadow-xs" />
                    ) : (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E91E63] rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
                    )}
                  </span>
                </Link>

              </div>
            </div>

            {/* Right Side Pill CTA Button Container on Desktop (>= xl: 1280px) */}
            <div className="hidden xl:flex items-center justify-end shrink-0 ml-2 xl:ml-4 2xl:ml-6">
              <Link to="/book" className="focus:outline-none">
                <Button className="bg-[linear-gradient(90deg,#FF3E72,#FF5C8D)] hover:opacity-95 text-white font-extrabold h-9.5 xl:h-10 px-3.5 xl:px-4 2xl:px-5 rounded-full text-xs xl:text-sm shadow-md shadow-[#FF3E72]/20 border-0 flex items-center gap-1.5 xl:gap-2 transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer">
                  <span>Book Appointment</span>
                  <ArrowRightCircle size={15} className="text-white shrink-0" />
                </Button>
              </Link>
            </div>

            {/* Tablet & Mobile Right Controls (< xl: 1280px) */}
            <div className="flex xl:hidden items-center gap-2 sm:gap-3 shrink-0">
              <Link to="/book" className="hidden sm:inline-flex focus:outline-none">
                <Button className="bg-[linear-gradient(90deg,#FF3E72,#FF5C8D)] hover:opacity-95 text-white font-bold h-9 px-3.5 rounded-full text-xs shadow-sm border-0 flex items-center gap-1.5 whitespace-nowrap cursor-pointer">
                  <span>Book Appointment</span>
                  <ArrowRightCircle size={13} className="text-white shrink-0" />
                </Button>
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-pink-50 hover:text-[#E91E63] transition-colors focus:outline-none border border-slate-200 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile & Tablet Navigation Drawer (< xl: 1280px) */}
        {isOpen && (
          <div className="xl:hidden border-t border-slate-100 bg-white absolute w-full shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-1.5 px-4 pb-6 pt-4 max-h-[82vh] overflow-y-auto">
              <Link to="/services" onClick={() => setIsOpen(false)} className={`block rounded-xl px-4 py-3 text-base font-bold ${isActive('/services') ? 'bg-pink-50 text-[#E91E63]' : 'text-slate-700 hover:bg-slate-50'}`}>Services</Link>
              <Link to="/plans" onClick={() => setIsOpen(false)} className={`block rounded-xl px-4 py-3 text-base font-bold ${isActive('/plans') ? 'bg-pink-50 text-[#E91E63]' : 'text-slate-700 hover:bg-slate-50'}`}>Freedom Plans</Link>
              <Link to="/post-surgery-recovery-package" onClick={() => setIsOpen(false)} className={`block rounded-xl px-4 py-3 text-base font-bold flex items-center gap-2.5 ${isActive('/post-surgery-recovery-package') ? 'bg-[#F7EEFC] text-[#8138B5]' : 'text-slate-700 hover:bg-slate-50'}`}>
                <Activity size={18} className="text-[#8138B5]" /> Post Surgery Recovery Package
              </Link>
              <Link to="/nri-care" onClick={() => setIsOpen(false)} className={`block rounded-xl px-4 py-3 text-base font-bold flex items-center gap-2.5 ${isActive('/nri-care') ? 'bg-[#C9A45C]/10 text-[#C9A45C]' : 'text-slate-700 hover:bg-slate-50'}`}>
                <Globe size={18} className={isActive('/nri-care') ? "text-[#C9A45C]" : "text-slate-500"} /> NRI Care Plan
              </Link>
              <Link to="/partner-with-us" onClick={() => setIsOpen(false)} className={`block rounded-xl px-4 py-3 text-base font-bold text-[#E91E63] hover:bg-pink-50 flex items-center gap-2.5`}>
                <Handshake size={18} className="text-[#E91E63]" /> Partner With Us (Franchise)
              </Link>

              {/* About Us Subgroup in Mobile Menu */}
              <div className="pt-2 pb-1 border-t border-slate-100">
                <span className="px-4 text-xs font-extrabold uppercase text-slate-400 tracking-wider">About Us</span>
                <div className="pl-3 mt-1 space-y-1">
                  <Link to="/about" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Who We Are & How We Work</Link>
                  <Link to="/professionals" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <Users size={16} className="text-[#E91E63]" /> Our Team
                  </Link>
                  <Link to="/contact#join-us" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <Briefcase size={16} className="text-[#E91E63]" /> Join Us (Careers)
                  </Link>
                  <Link to="/blog" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <BookOpen size={16} className="text-[#E91E63]" /> Blog & Stories
                  </Link>
                </div>
              </div>

              <Link to="/contact" onClick={() => setIsOpen(false)} className={`block rounded-xl px-4 py-3 text-base font-bold ${isActive('/contact') ? 'bg-pink-50 text-[#E91E63]' : 'text-slate-700 hover:bg-slate-50'}`}>Contact us</Link>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link to="/book" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[linear-gradient(90deg,#FF3E72,#FF5C8D)] text-white font-bold text-base h-12 rounded-full shadow-md border-0 flex items-center justify-center gap-2 cursor-pointer">
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
      <div className="relative z-10 block w-full bg-slate-50/90 backdrop-blur-xs border-b border-slate-200/80 py-2 shadow-2xs">
        <div className="mx-auto max-w-[1680px] px-3 sm:px-6 xl:px-8 2xl:px-10">
          <div className="w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto">
            <ServiceSearch className="w-full" placeholder="Search for healthcare services (e.g. Home Nursing, Physiotherapy...)" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
