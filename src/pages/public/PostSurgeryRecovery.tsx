import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  PhoneCall, 
  ArrowRight, 
  Activity, 
  Stethoscope, 
  CheckCircle2, 
  Calendar,
  Users,
  Clock,
  Award,
  ChevronRight,
  Info,
  Check,
  FileText,
  BadgeCheck,
  MessageCircle,
  HelpCircle
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import SEO from "@/src/components/seo/SEO";
import { useAppContent } from "@/src/hooks/useAppContent";
import AutoBookingModal from "@/src/components/shared/AutoBookingModal";
import heroDoctorImg from "@/src/assets/hero-doctor.png";
import { 
  RECOVERY_PACKAGES, 
  RecoveryPackage, 
  formatINR 
} from "@/src/data/recoveryPackagesData";

// Motion Tokens matching SilverCare design system
const premiumEase = [0.22, 1, 0.36, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: premiumEase } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function PostSurgeryRecovery() {
  const { siteSettings } = useAppContent();
  const phone = siteSettings?.phone || "+91 800-14-800-75";
  const rawPhone = phone ? phone.replace(/[^0-9+]/g, "") : "+918001480075";
  const whatsappNum = siteSettings?.whatsapp ? siteSettings.whatsapp.replace(/[^0-9]/g, "") : "918001480075";

  // State to track selected plan duration per package (defaulting to 14 days - Most Popular)
  const [selectedDurations, setSelectedDurations] = useState<{ [packageId: string]: 7 | 14 | 30 }>({
    "joint-replacement": 14,
    "cardiac-surgery": 14,
    "cancer-chemotherapy": 14,
    "general-surgery": 14,
    "ckd-dialysis": 14,
    "dementia-management": 14
  });

  // Modal State for enquiry/booking
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalServiceTitle, setModalServiceTitle] = useState("");

  const handleDurationChange = (packageId: string, days: 7 | 14 | 30) => {
    setSelectedDurations(prev => ({ ...prev, [packageId]: days }));
  };

  const handleEnquire = (pkg: RecoveryPackage) => {
    const days = selectedDurations[pkg.id] || 14;
    const plan = pkg.plans.find(p => p.days === days) || pkg.plans[1];
    const enquiryName = `${pkg.title} (${days} Days - ${formatINR(plan.price_inr)})`;
    setModalServiceTitle(enquiryName);
    setIsModalOpen(true);
  };

  return (
    <>
      <SEO 
        title="Post Surgery Recovery Package | 6 Home Care Plans | SilverCare India" 
        description="Personalised recovery and supportive home care with coordinated nursing, physiotherapy, doctor visits and caregiver services across 6 specialised post-surgery packages."
      />

      <div className="flex flex-col font-sans text-slate-800 bg-white">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section 
          className="relative pt-8 sm:pt-12 lg:pt-16 pb-16 lg:pb-24 overflow-hidden border-b border-slate-100 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: 'url(/home-bg-1.png)' }}
        >
          {/* Subtle Top-Right Soft Lightening Overlay */}
          <div className="absolute top-0 right-0 w-[60%] h-[85%] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.6)_0%,rgba(247,238,252,0.4)_50%,transparent_100%)] pointer-events-none z-0" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] relative z-10">
            
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 mb-6 sm:mb-8" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-[#8138B5] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-400" />
              <Link to="/plans" className="hover:text-[#8138B5] transition-colors">Plans</Link>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-[#8138B5] font-bold">Post Surgery Recovery Package</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Headline & Action */}
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={staggerContainer} 
                className="lg:col-span-7 text-left"
              >
                {/* Eyebrow Badge */}
                <motion.div 
                  variants={fadeInUp} 
                  className="inline-flex items-center gap-2 rounded-full bg-[#F7EEFC] border border-[#E9D4F7] px-4 py-1.5 text-xs sm:text-sm font-bold text-[#8138B5] mb-5 shadow-xs"
                >
                  <Sparkles size={15} className="text-[#8138B5]" />
                  <span>SILVERCARE HOME RECOVERY</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1 
                  variants={fadeInUp} 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-black tracking-tight text-[#17345C] leading-[1.12] mb-5"
                >
                  Recover at Home, <br className="hidden sm:inline" />
                  <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#8138B5,#F92D7B,#269B49)]">
                    Surrounded by Care.
                  </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p 
                  variants={fadeInUp} 
                  className="text-base sm:text-lg md:text-xl text-[#59677D] leading-relaxed mb-8 max-w-2xl font-normal"
                >
                  Personalised recovery and supportive home care with coordinated nursing, physiotherapy, doctor visits and caregiver services, according to your selected package.
                </motion.p>

                {/* Dual CTAs */}
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                  <a href="#packages-overview" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-[linear-gradient(90deg,#8138B5,#9D4EDD)] hover:opacity-95 text-white font-extrabold text-base h-13 sm:h-14 px-8 rounded-xl shadow-[0_8px_20px_rgba(129,56,181,0.25)] border-0 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-95"
                    >
                      <span>Explore Recovery Packages</span>
                      <ArrowRight size={18} />
                    </Button>
                  </a>

                  <Button 
                    onClick={() => {
                      setModalServiceTitle("Post Surgery Recovery Consultation");
                      setIsModalOpen(true);
                    }}
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#17345C] border-2 border-slate-200 font-extrabold text-base h-13 sm:h-14 px-7 rounded-xl shadow-xs flex items-center justify-center gap-2"
                  >
                    <PhoneCall size={18} className="text-[#8138B5]" />
                    <span>Talk to Our Care Team</span>
                  </Button>
                </motion.div>

                {/* Quick Trust Highlights */}
                <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-slate-200/70 max-w-xl">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={20} className="text-[#269B49] shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">6 Specialised</div>
                      <div className="text-[11px] sm:text-xs text-slate-500">Clinical Packages</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={20} className="text-[#8138B5] shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">100% Verified</div>
                      <div className="text-[11px] sm:text-xs text-slate-500">Nurses & Physios</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} className="text-[#F92D7B] shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">7 / 14 / 30 Days</div>
                      <div className="text-[11px] sm:text-xs text-slate-500">Flexible Durations</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column: Rakesh Bedi Brand Ambassador Portrait */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: premiumEase }}
                className="lg:col-span-5 relative flex flex-col items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0"
              >
                <div className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[560px]">
                  {/* Subtle Background Glow behind Rakesh Bedi */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#8138B5]/15 via-[#F92D7B]/10 to-[#269B49]/10 rounded-full blur-3xl opacity-70 pointer-events-none" />

                  <img 
                    src={siteSettings?.heroImageUrl && siteSettings.heroImageUrl.startsWith('http') ? siteSettings.heroImageUrl : heroDoctorImg}
                    alt={siteSettings?.doctorName || "Rakesh Bedi - SilverCare Brand Ambassador"} 
                    className="relative z-10 w-full h-auto object-contain object-bottom max-h-[340px] sm:max-h-[460px] lg:max-h-[580px] transition-transform duration-500 hover:scale-[1.01]"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />

                  {/* Brand Ambassador Badge ("TRUSTED BY RAKESH BEDI") */}
                  <div className="absolute bottom-1 right-2 sm:bottom-2 sm:right-4 lg:bottom-4 lg:right-6 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,243,255,0.96)_100%)] backdrop-blur-md border border-[#7B4CC9]/[0.18] shadow-[0_8px_24px_rgba(72,45,128,0.16),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-[14px] px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2.5 sm:gap-3 z-20 transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_28px_rgba(72,45,128,0.2)]">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#7B4CC9]/[0.12] border border-[#7B4CC9]/[0.14] text-[#7B4CC9] flex items-center justify-center shrink-0 shadow-2xs">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <span className="block text-[12px] sm:text-[13.5px] font-black uppercase text-[#17365C] tracking-[0.4px] leading-tight mb-0.5">
                        TRUSTED BY RAKESH BEDI
                      </span>
                      <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.6px] text-[#7B4CC9] leading-tight">
                        BRAND AMBASSADOR
                      </span>
                      <span className="block text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-[0.8px] text-slate-500 leading-none mt-0.5">
                        SILVERCARE
                      </span>
                    </div>
                  </div>

                  {/* Floating Doctor-Led Recovery Protocols Chip */}
                  <div className="absolute top-4 left-1 sm:top-6 sm:-left-2 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-lg border border-slate-100 flex items-center gap-2.5 z-20">
                    <div className="w-8 h-8 rounded-xl bg-[#F0FAF3] text-[#269B49] flex items-center justify-center font-black">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#17345C]">Doctor-Led Recovery</div>
                      <div className="text-[10px] text-slate-500 font-semibold">Hospital-Grade at Home</div>
                    </div>
                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. PACKAGE OVERVIEW SECTION (Cards Grid)                                  */}
        {/* ========================================================================= */}
        <section id="packages-overview" className="py-16 lg:py-24 bg-slate-50/70 border-b border-slate-200/60 scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
            
            <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F7EEFC] px-3.5 py-1 text-xs font-extrabold text-[#8138B5] uppercase tracking-wider mb-3">
                Transparent Home Recovery
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#17345C] tracking-tight mb-4">
                Recovery Packages Designed Around Your Needs
              </h2>
              <p className="text-base sm:text-lg text-[#59677D] leading-relaxed">
                Explore six personalised home-care packages with transparent plan pricing and clearly defined included services.
              </p>
            </div>

            {/* 3-column desktop, 2-column tablet, 1-column mobile grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {RECOVERY_PACKAGES.map((pkg) => {
                const isPurple = pkg.theme === 'purple';
                const sevenDayPlan = pkg.plans[0];
                const fourteenDayPlan = pkg.plans[1];

                return (
                  <div 
                    key={pkg.id}
                    className="group bg-white rounded-2xl border border-slate-200 hover:border-[#8138B5]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 relative overflow-hidden"
                  >
                    {/* Top Accent Strip */}
                    <div 
                      className={`absolute top-0 left-0 right-0 h-1.5 ${
                        isPurple 
                          ? 'bg-gradient-to-r from-[#8138B5] to-[#9D4EDD]' 
                          : 'bg-gradient-to-r from-[#269B49] to-[#34D399]'
                      }`}
                    />

                    <div>
                      {/* Top Header: Package Number & Category Tag */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className={`text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded-md ${
                          isPurple ? 'bg-[#F7EEFC] text-[#8138B5]' : 'bg-[#F0FAF3] text-[#269B49]'
                        }`}>
                          PACKAGE {pkg.package_number}
                        </span>

                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Home Recovery
                        </span>
                      </div>

                      {/* Package Title */}
                      <h3 className="text-xl sm:text-2xl font-black text-[#17345C] tracking-tight mb-2 group-hover:text-[#8138B5] transition-colors leading-snug">
                        {pkg.title}
                      </h3>

                      {/* Package Subtitle */}
                      <p className="text-xs sm:text-sm text-[#59677D] leading-relaxed mb-6 font-medium">
                        {pkg.subtitle}
                      </p>

                      {/* Service Inclusion Highlights Preview */}
                      <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                        {pkg.services.slice(0, 3).map((svc, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 size={14} className={isPurple ? "text-[#8138B5] shrink-0 mt-0.5" : "text-[#269B49] shrink-0 mt-0.5"} />
                            <span className="font-semibold text-slate-800">{svc.name}:</span>
                            <span className="text-slate-500 line-clamp-1">{svc.quantity}</span>
                          </div>
                        ))}
                        {pkg.services.length > 3 && (
                          <div className="text-[11px] font-semibold text-slate-400 pl-5">
                            + {pkg.services.length - 3} more coordinated services included
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      {/* Price & Duration Summary */}
                      <div className="pt-4 border-t border-slate-100 mb-5">
                        <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Starting Price</div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-2xl sm:text-3xl font-black text-[#17345C]">
                            {formatINR(sevenDayPlan.price_inr)}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">/ 7 Days</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                          <span className="font-bold text-[#8138B5]">14 Days: {formatINR(fourteenDayPlan.price_inr)}</span>
                          <span className="text-[10px] bg-pink-100 text-[#F92D7B] font-extrabold px-1.5 py-0.2 rounded uppercase">Popular</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <a 
                        href={`#${pkg.id}`}
                        className="block w-full"
                      >
                        <Button 
                          className={`w-full font-extrabold text-sm h-11 rounded-xl border-0 flex items-center justify-center gap-2 transition-all ${
                            isPurple
                              ? 'bg-[#8138B5] hover:bg-[#6A24A6] text-white shadow-sm hover:shadow-md'
                              : 'bg-[#269B49] hover:bg-[#1E7E3B] text-white shadow-sm hover:shadow-md'
                          }`}
                        >
                          <span>Explore Package Details</span>
                          <ChevronRight size={16} />
                        </Button>
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. DETAILED PACKAGES SECTION (Full inclusions, pricing selectors)          */}
        {/* ========================================================================= */}
        <section id="package-details" className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F0FAF3] px-3.5 py-1 text-xs font-extrabold text-[#269B49] uppercase tracking-wider mb-3">
                Complete Service Transparency
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#17345C] tracking-tight mb-4">
                Detailed Package Inclusions & Plan Pricing
              </h2>
              <p className="text-base sm:text-lg text-[#59677D] leading-relaxed">
                Review the exact clinical team, visit allocations and fixed pricing for every recovery plan.
              </p>
            </div>

            {/* List of 6 Packages as Rich Showcase Sections */}
            <div className="space-y-16 lg:space-y-24">
              {RECOVERY_PACKAGES.map((pkg, index) => {
                const isPurple = pkg.theme === 'purple';
                const currentDuration = selectedDurations[pkg.id] || 14;
                const activePlan = pkg.plans.find(p => p.days === currentDuration) || pkg.plans[1];

                return (
                  <article 
                    id={pkg.id} 
                    key={pkg.id} 
                    className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden transition-all hover:border-slate-300"
                  >
                    {/* Header Strip with Package Number and Category */}
                    <div className={`p-6 sm:p-8 border-b ${
                      isPurple 
                        ? 'bg-gradient-to-r from-[#F7EEFC] via-white to-[#F7EEFC] border-[#E9D4F7]' 
                        : 'bg-gradient-to-r from-[#F0FAF3] via-white to-[#F0FAF3] border-[#D1F2DD]'
                    }`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-xs sm:text-sm font-black tracking-widest uppercase px-3 py-1 rounded-full ${
                              isPurple ? 'bg-[#8138B5] text-white' : 'bg-[#269B49] text-white'
                            }`}>
                              PACKAGE {pkg.package_number}
                            </span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              SilverCare Recovery Protocol
                            </span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#17345C] tracking-tight">
                            {pkg.title}
                          </h3>
                          <p className="text-sm sm:text-base font-semibold text-[#59677D] mt-1 max-w-3xl">
                            {pkg.subtitle}
                          </p>
                        </div>

                        {/* Top Recovery Team Discipline Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 md:justify-end">
                          <span className="text-xs font-extrabold uppercase text-slate-400 mr-1 hidden sm:inline">Recovery Team:</span>
                          {pkg.recovery_team.map((discipline, dIdx) => (
                            <span 
                              key={dIdx}
                              className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs"
                            >
                              {discipline}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Main Content Area: 2-Column Responsive Layout */}
                    <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                      
                      {/* Left Side: Services Table (7 Cols on desktop) */}
                      <div className="lg:col-span-7 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-black text-[#17345C] flex items-center gap-2">
                              <FileText size={18} className={isPurple ? "text-[#8138B5]" : "text-[#269B49]"} />
                              <span>Included Clinical & Supportive Services</span>
                            </h4>
                            <span className="text-xs font-bold text-slate-400">
                              {pkg.services.length} Core Inclusions
                            </span>
                          </div>

                          {/* Accessible Semantic Services Table */}
                          <div className="overflow-x-auto rounded-2xl border border-slate-200">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-black text-[#17345C] uppercase tracking-wider">
                                  <th scope="col" className="py-3 px-4 sm:px-5">Service</th>
                                  <th scope="col" className="py-3 px-4 sm:px-5">Care details</th>
                                  <th scope="col" className="py-3 px-4 sm:px-5 text-right sm:text-left">Visits / Duration</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                                {pkg.services.map((service, sIdx) => (
                                  <tr key={sIdx} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="py-3.5 px-4 sm:px-5 font-bold text-[#17345C] align-top whitespace-nowrap">
                                      {service.name}
                                    </td>
                                    <td className="py-3.5 px-4 sm:px-5 text-[#59677D] align-top">
                                      {service.description}
                                    </td>
                                    <td className="py-3.5 px-4 sm:px-5 font-black text-slate-900 align-top text-right sm:text-left whitespace-nowrap">
                                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-black ${
                                        isPurple ? 'bg-purple-50 text-[#8138B5]' : 'bg-emerald-50 text-[#269B49]'
                                      }`}>
                                        {service.quantity}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Transparency Note on Caregiver / Duration Ambiguity */}
                          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-[#59677D] leading-relaxed">
                            <Info size={16} className="text-[#8138B5] shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold text-slate-800">Plan Duration Note: </strong>
                              Service visit counts and caregiver coverage (e.g. 12 hrs/day × 14 days) represent the verified source clinical protocol. When choosing a 7-day or 30-day plan, exact scheduled caregiver shifts and visit cadence are tailored to your discharge summary and confirmed by our clinical care manager.
                              {pkg.special_note && (
                                <span className="block mt-1 font-bold text-slate-700">{pkg.special_note}</span>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Right Side: Interactive Duration Selector & Pricing Card (5 Cols on desktop) */}
                      <div className="lg:col-span-5 bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between">
                        
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                              Choose Recovery Plan Duration
                            </span>
                            <span className="text-xs font-bold text-[#8138B5]">
                              {currentDuration} Days Selected
                            </span>
                          </div>

                          {/* 3 Selectable Plan Cards: 7 Days, 14 Days, 30 Days */}
                          <div className="space-y-3 mb-6" role="radiogroup" aria-label={`Select duration for ${pkg.title}`}>
                            {pkg.plans.map((plan) => {
                              const isSelected = plan.days === currentDuration;
                              const isPopular = plan.badge === "MOST POPULAR";

                              return (
                                <button
                                  type="button"
                                  key={plan.days}
                                  role="radio"
                                  aria-checked={isSelected}
                                  onClick={() => handleDurationChange(pkg.id, plan.days)}
                                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between relative cursor-pointer ${
                                    isSelected 
                                      ? 'border-[#8138B5] bg-white shadow-md ring-2 ring-[#8138B5]/10' 
                                      : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'
                                  }`}
                                >
                                  {/* Featured Badge */}
                                  {isPopular && (
                                    <div className="absolute -top-2.5 right-4 bg-[linear-gradient(90deg,#F92D7B,#FF4F81)] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                                      MOST POPULAR
                                    </div>
                                  )}

                                  <div className="flex items-center gap-3">
                                    {/* Custom Radio Circle */}
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                      isSelected ? 'border-[#8138B5] bg-[#8138B5]' : 'border-slate-300'
                                    }`}>
                                      {isSelected && <Check size={12} className="text-white" />}
                                    </div>
                                    <div>
                                      <div className="text-sm sm:text-base font-black text-[#17345C]">
                                        {plan.days} Days Plan
                                      </div>
                                      <div className="text-xs text-slate-500">
                                        Comprehensive home rehabilitation
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <div className="text-base sm:text-lg font-black text-[#17345C]">
                                      {formatINR(plan.price_inr)}
                                    </div>
                                    <div className="text-[10px] uppercase font-bold text-slate-400">
                                      All Inclusions
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* Selected Plan Details Snapshot */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span>Selected Package & Duration</span>
                              <span className="font-bold text-slate-800">{pkg.title}</span>
                            </div>
                            <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                              <span className="text-xs font-bold text-slate-600">Total Plan Fee (INR)</span>
                              <span className="text-2xl font-black text-[#8138B5]">
                                {formatINR(activePlan.price_inr)}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1 text-right">
                              *Includes coordinated doctor, nurse, physio & caregiver visits as listed
                            </div>
                          </div>
                        </div>

                        {/* Dual Action Buttons */}
                        <div className="space-y-2.5">
                          <Button
                            onClick={() => handleEnquire(pkg)}
                            size="lg"
                            className="w-full bg-[linear-gradient(90deg,#8138B5,#9D4EDD)] hover:opacity-95 text-white font-black text-sm sm:text-base h-13 rounded-xl shadow-md border-0 flex items-center justify-center gap-2 transition-transform active:scale-98"
                          >
                            <span>Enquire About This Plan</span>
                            <ArrowRight size={18} />
                          </Button>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(
                                `Hello SilverCare India, I am interested in the ${pkg.title} (${currentDuration} Days Plan - ${formatINR(activePlan.price_inr)}). Please share details.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1"
                            >
                              <Button
                                variant="outline"
                                className="w-full h-11 bg-white hover:bg-emerald-50 text-[#269B49] border border-emerald-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                              >
                                <MessageCircle size={15} />
                                <span>WhatsApp Us</span>
                              </Button>
                            </a>

                            <a href={`tel:${rawPhone}`} className="flex-1">
                              <Button
                                variant="outline"
                                className="w-full h-11 bg-white hover:bg-slate-100 text-[#17345C] border border-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                              >
                                <PhoneCall size={15} className="text-[#8138B5]" />
                                <span>Call Care Advisor</span>
                              </Button>
                            </a>
                          </div>
                        </div>

                      </div>

                    </div>
                  </article>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. COMPARISON SECTION (All 6 Packages in exact source order)               */}
        {/* ========================================================================= */}
        <section className="py-16 lg:py-24 bg-slate-50 border-t border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
            
            <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F7EEFC] px-3.5 py-1 text-xs font-extrabold text-[#8138B5] uppercase tracking-wider mb-3">
                Side-by-Side Comparison
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#17345C] tracking-tight mb-4">
                Compare Recovery Plans
              </h2>
              <p className="text-base sm:text-lg text-[#59677D] leading-relaxed">
                Compare all six packages and their exact 7-day, 14-day and 30-day prices in one simple view.
              </p>
            </div>

            {/* Desktop Comparison Table */}
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#17345C] text-white text-xs font-black uppercase tracking-wider">
                    <th scope="col" className="py-4 px-6 w-[28%]">Package Name & Focus</th>
                    <th scope="col" className="py-4 px-4 text-center w-[16%]">7 Days Plan</th>
                    <th scope="col" className="py-4 px-4 text-center w-[18%] bg-[#8138B5]">
                      <div className="inline-block text-[10px] bg-white text-[#8138B5] font-black px-2 py-0.5 rounded-full uppercase mb-0.5">
                        Most Popular
                      </div>
                      <div>14 Days Plan</div>
                    </th>
                    <th scope="col" className="py-4 px-4 text-center w-[16%]">30 Days Plan</th>
                    <th scope="col" className="py-4 px-4 text-center w-[12%]">Clinical Team</th>
                    <th scope="col" className="py-4 px-6 text-right w-[10%]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {RECOVERY_PACKAGES.map((pkg) => {
                    const isPurple = pkg.theme === 'purple';
                    return (
                      <tr key={pkg.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-5 px-6">
                          <span className="text-[11px] font-black uppercase text-slate-400 block mb-0.5">
                            PACKAGE {pkg.package_number}
                          </span>
                          <div className="font-extrabold text-[#17345C] text-base leading-snug">
                            {pkg.title}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {pkg.subtitle}
                          </div>
                        </td>

                        <td className="py-5 px-4 text-center">
                          <span className="font-black text-[#17345C] text-base">
                            {formatINR(pkg.plans[0].price_inr)}
                          </span>
                        </td>

                        <td className="py-5 px-4 text-center bg-purple-50/50">
                          <span className="font-black text-[#8138B5] text-lg">
                            {formatINR(pkg.plans[1].price_inr)}
                          </span>
                        </td>

                        <td className="py-5 px-4 text-center">
                          <span className="font-black text-[#17345C] text-base">
                            {formatINR(pkg.plans[2].price_inr)}
                          </span>
                        </td>

                        <td className="py-5 px-4 text-center">
                          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                            {pkg.recovery_team.length} Disciplines
                          </span>
                        </td>

                        <td className="py-5 px-6 text-right">
                          <a href={`#${pkg.id}`}>
                            <Button size="sm" variant="outline" className="font-bold text-xs h-9 rounded-lg hover:bg-[#8138B5] hover:text-white transition-colors">
                              View
                            </Button>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Vertically Stacked Cards Comparison */}
            <div className="lg:hidden space-y-4">
              {RECOVERY_PACKAGES.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black uppercase text-[#8138B5] bg-purple-50 px-2 py-0.5 rounded">
                      PACKAGE {pkg.package_number}
                    </span>
                    <a href={`#${pkg.id}`} className="text-xs font-bold text-[#8138B5] hover:underline">
                      View details →
                    </a>
                  </div>

                  <h3 className="font-black text-slate-900 text-base leading-snug mb-1">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">{pkg.subtitle}</p>

                  <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-100">
                    <div className="p-2 rounded-lg bg-slate-50">
                      <div className="text-[10px] font-bold uppercase text-slate-400">7 Days</div>
                      <div className="text-sm font-black text-slate-800">{formatINR(pkg.plans[0].price_inr)}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 relative">
                      <div className="text-[9px] font-black uppercase text-[#8138B5]">14 Days (Popular)</div>
                      <div className="text-sm font-black text-[#8138B5]">{formatINR(pkg.plans[1].price_inr)}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50">
                      <div className="text-[10px] font-bold uppercase text-slate-400">30 Days</div>
                      <div className="text-sm font-black text-slate-800">{formatINR(pkg.plans[2].price_inr)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CLINICAL ASSURANCE & TRUST PILLARS                                      */}
        {/* ========================================================================= */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-[#17345C] tracking-tight mb-3">
                Why Families Rely on SilverCare Home Recovery
              </h2>
              <p className="text-sm sm:text-base text-[#59677D]">
                Hospital-grade standards of care delivered with empathy, transparency and continuous clinical governance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#F7EEFC]/50 border border-[#E9D4F7] text-left">
                <div className="w-12 h-12 rounded-xl bg-[#8138B5] text-white flex items-center justify-center mb-4">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-base font-black text-[#17345C] mb-1.5">Registered Nurses</h3>
                <p className="text-xs sm:text-sm text-[#59677D] leading-relaxed">
                  Certified clinical nurses trained in sterile post-op wound dressings, vitals monitoring and medication administration.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F0FAF3]/60 border border-[#D1F2DD] text-left">
                <div className="w-12 h-12 rounded-xl bg-[#269B49] text-white flex items-center justify-center mb-4">
                  <Activity size={24} />
                </div>
                <h3 className="text-base font-black text-[#17345C] mb-1.5">Licensed Physiotherapy</h3>
                <p className="text-xs sm:text-sm text-[#59677D] leading-relaxed">
                  BPT/MPT physical therapists focused on safe gait re-education, mobility restoration, respiratory exercises and strength.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 text-left">
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4">
                  <Stethoscope size={24} />
                </div>
                <h3 className="text-base font-black text-[#17345C] mb-1.5">Doctor Home Reviews</h3>
                <p className="text-xs sm:text-sm text-[#59677D] leading-relaxed">
                  Scheduled clinical reviews by qualified doctors to track healing trajectory, review diagnostics and adjust care plans.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 text-left">
                <div className="w-12 h-12 rounded-xl bg-[#F92D7B] text-white flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-base font-black text-[#17345C] mb-1.5">Dedicated Care Manager</h3>
                <p className="text-xs sm:text-sm text-[#59677D] leading-relaxed">
                  Daily follow-up, family coordination and digital updates so family members—whether locally or overseas—stay informed.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CONVERSION / NEED HELP SECTION                                          */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 bg-[#17345C] text-white relative overflow-hidden">
          {/* Subtle Decorative Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(129,56,181,0.25)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(38,155,73,0.2)_0%,transparent_70%)] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-pink-300 flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
              <Heart size={28} className="text-[#FF4F81]" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 tracking-tight">
              Need Help Choosing the Right Recovery Package?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto font-normal">
              Our care team can help you discuss the home-care services and support required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => {
                  setModalServiceTitle("Post Surgery Recovery - Custom Consultation");
                  setIsModalOpen(true);
                }}
                size="lg"
                className="w-full sm:w-auto bg-[linear-gradient(90deg,#8138B5,#F92D7B)] hover:opacity-95 text-white font-black text-base h-14 px-8 rounded-xl shadow-lg border-0 transition-transform active:scale-95"
              >
                <span>Speak to Our Care Team</span>
                <ArrowRight size={18} className="ml-2" />
              </Button>

              <Link to="/book?service=Post%20Surgery%20Recovery%20Package" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white font-extrabold text-base h-14 px-8 rounded-xl hover:bg-white hover:text-[#17345C] transition-all"
                >
                  <Calendar size={18} className="mr-2" />
                  <span>Book Appointment</span>
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <a href={`tel:${rawPhone}`} className="hover:text-white flex items-center gap-2">
                <PhoneCall size={14} className="text-pink-400" />
                <span>Call Us 24/7: <strong className="text-white">{phone}</strong></span>
              </a>
              <span className="text-white/20">•</span>
              <a 
                href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent("Hello SilverCare, I need assistance choosing a Post Surgery Recovery package.")}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-2"
              >
                <MessageCircle size={14} className="text-emerald-400" />
                <span>Instant WhatsApp Care Support</span>
              </a>
            </div>

          </div>
        </section>

      </div>

      {/* Auto Booking Modal popup when user clicks Enquire or Consultation */}
      {isModalOpen && (
        <AutoBookingModal 
          forceOpen={true} 
          initialService={modalServiceTitle || "Post Surgery Recovery Package"} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
