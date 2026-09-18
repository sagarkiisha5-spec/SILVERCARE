import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Stethoscope, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  CheckCircle2, 
  Heart, 
  Sparkles, 
  Search, 
  HelpCircle, 
  Calendar,
  ChevronRight,
  ChevronDown,
  Compass,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  Phone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/src/components/ui/button";
import AutoBookingModal from "@/src/components/shared/AutoBookingModal";
import { HalftoneWaveSVG, OrganicPastelBlobs } from "@/src/components/shared/SilverCareBackground";

// Motion Tokens matching approved website
const premiumEase = [0.16, 1, 0.3, 1];

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

export interface LocationRankedService {
  rank: number;
  id: string;
  title: string;
  badgeTag: string;
  category: "nursing" | "clinical" | "rehab" | "specialized" | "support";
  rating: number;
  reviewCount: number;
  shortDesc: string;
  fullDesc: string;
  keyFeatures: string[];
  responseTime?: string;
  coveredSectors: string[];
  recommendedFor: string;
  doctorSupervised: boolean;
  icon: React.ElementType;
}

export interface LocationHub {
  name: string;
  status: string;
  coverage: string;
}

export interface LocationFAQ {
  q: string;
  a: string;
}

export interface LocationStatItem {
  value: string;
  label: string;
  icon?: React.ElementType;
}

export interface LocationPageTemplateProps {
  cityName: string;
  canonicalUrl: string;
  pageTitle: string;
  pageDesc: string;
  keywords: string;
  schemaData: object;
  
  // Hero Section
  eyebrowBadgeText: string;
  h1TitleStart: string;
  h1CityHighlighted: string;
  h1TitleEnd?: string;
  heroSubtitle: string;
  stats?: LocationStatItem[];
  
  // Services
  services: LocationRankedService[];
  servicesSectionTitle?: string;
  servicesSectionSubtitle?: string;
  
  // FAQs
  faqs: LocationFAQ[];
  
  // Interactive Local Modules (Optional)
  sectorHubs?: LocationHub[];
  sectorHubsTitle?: string;
  sectorHubsSubtitle?: string;
  
  fallRiskQuestions?: { q: string; key: string }[];
  
  // Bottom CTA
  ctaHeading?: string;
  ctaDescription?: string;
}

const ALL_SISTER_LOCATIONS = [
  { name: "Chandigarh", path: "/best-elderly-healthcare-services-chandigarh", desc: "Sectors 1-60, Capitol & VIP Belts" },
  { name: "Mohali (SAS Nagar)", path: "/best-elderly-healthcare-services-mohali", desc: "Phases 1-11, Aerocity & Sec 70" },
  { name: "Panchkula", path: "/best-elderly-healthcare-services-panchkula", desc: "Sectors 1-21, Sector 15 & MDC" },
  { name: "Zirakpur (HQ)", path: "/best-elderly-healthcare-services-zirakpur", desc: "VIP Road, PR7 & High-Rises" },
  { name: "Delhi", path: "/best-elderly-healthcare-services-delhi", desc: "South Delhi, Central & Dwarka" },
  { name: "Gurgaon", path: "/best-elderly-healthcare-services-gurgaon", desc: "Sector 33 Hub & DLF Belts" },
  { name: "Noida", path: "/best-elderly-healthcare-services-noida", desc: "Expressway Sectors & Central Noida" },
  { name: "Faridabad", path: "/best-elderly-healthcare-services-faridabad", desc: "Sectors 14-21, Neharpar & Green Field" },
  { name: "Kharar", path: "/best-elderly-healthcare-services-kharar", desc: "Sunny Enclave & Gillco Valley" },
  { name: "Dera Bassi", path: "/best-elderly-healthcare-services-derabassi", desc: "ATS Golf Meadows & Gulmohar" },
  { name: "Pinjore & Kalka", path: "/best-elderly-healthcare-services-pinjore", desc: "HMT Township & Surajpur" },
  { name: "Ambala Cantt", path: "/best-elderly-healthcare-services-ambala-cantt", desc: "Defence Colony & Sadar Bazaar" },
  { name: "Meerut", path: "/best-elderly-healthcare-services-meerut", desc: "Shastri Nagar & Saket Belt" },
];

export default function LocationPageTemplate(props: LocationPageTemplateProps) {
  const {
    cityName,
    canonicalUrl,
    pageTitle,
    pageDesc,
    keywords,
    schemaData,
    eyebrowBadgeText,
    h1TitleStart,
    h1CityHighlighted,
    h1TitleEnd = "",
    heroSubtitle,
    stats,
    services,
    servicesSectionTitle = `Top 10 Rated Elderly Healthcare Services in ${cityName}`,
    servicesSectionSubtitle = `Showing verified, clinical-grade home healthcare solutions ranked by family ratings, clinical excellence, and rapid response standards in ${cityName}.`,
    faqs,
    sectorHubs,
    sectorHubsTitle = `${cityName} Sector Coverage Navigator`,
    sectorHubsSubtitle = `Select your sector or residential locality below to check active caregiver readiness and fast dispatch.`,
    fallRiskQuestions,
    ctaHeading = `Give Your Loved Ones the Dignified Healthcare They Deserve in ${cityName}`,
    ctaDescription = `Contact SilverCare today to speak directly with our Senior Clinical Care Team and arrange a comprehensive home healthcare assessment anywhere in ${cityName}.`
  } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState(`In-Home Healthcare ${cityName}`);
  const [selectedHub, setSelectedHub] = useState<LocationHub | null>(sectorHubs && sectorHubs.length > 0 ? sectorHubs[0] : null);

  // Fall Risk state if questions provided
  const [fallAnswers, setFallAnswers] = useState<{ [key: string]: boolean }>({});
  const [assessmentResult, setAssessmentResult] = useState<string | null>(null);

  const handleToggleFallAnswer = (key: string) => {
    setFallAnswers((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const calculateFallRisk = () => {
    const affirmativeCount = Object.values(fallAnswers).filter(Boolean).length;
    if (affirmativeCount >= 2) {
      setAssessmentResult("HIGH RISK: Recommended 12h/24h supervised nursing & balance physiotherapy.");
    } else if (affirmativeCount === 1) {
      setAssessmentResult("MODERATE RISK: Recommended home safety grab-bar audit and daily mobility assistance.");
    } else {
      setAssessmentResult("LOW RISK: Senior is generally stable. Preventative wellness checkup recommended.");
    }
  };

  // Filtered Services List
  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchesSearch = 
        srv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.fullDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.keyFeatures.some(f => f.toLowerCase().includes(searchTerm.toLowerCase())) ||
        srv.coveredSectors.some(sec => sec.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || srv.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, selectedCategory]);

  const handleOpenBooking = (serviceName: string) => {
    setModalService(serviceName);
    setIsModalOpen(true);
  };

  // Fallback stats matching homepage bar
  const displayStats = stats || [
    { value: "1,500+", label: `${cityName} Families Cared`, icon: CheckCircle2 },
    { value: "4.9", label: "Google Rating", icon: Star },
    { value: "100%", label: "Verified Caregivers", icon: ShieldCheck },
    { value: "24/7", label: "Care Assistance", icon: Clock },
  ];

  return (
    <div className="flex flex-col font-sans text-slate-800 bg-white selection:bg-[#FF4F81] selection:text-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://silvercareindia.com/hero-doctor.png" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="SilverCare India" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content="https://silvercareindia.com/hero-doctor.png" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Booking Popup Modal */}
      {isModalOpen && (
        <AutoBookingModal 
          forceOpen={isModalOpen} 
          initialService={modalService} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      {/* ============================================================ */}
      {/* 1. HERO SECTION (Approved Homepage Luxury Light Gradient Theme) */}
      {/* ============================================================ */}
      <section 
        className="relative pt-6 sm:pt-8 lg:pt-10 pb-16 lg:pb-24 overflow-hidden border-b border-slate-100 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: 'url(/home-bg-1.png)' }}
      >
        {/* Top-Right Soft Lightening Overlay */}
        <div className="absolute top-0 right-0 w-[60%] h-[85%] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.5)_0%,rgba(255,248,252,0.35)_50%,transparent_100%)] pointer-events-none z-0" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1480px] relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link to="/" className="hover:text-[#FF4F81] transition-colors">Home</Link>
            <ChevronRight size={12} className="text-[#FF4F81]" />
            <Link to="/services" className="hover:text-[#FF4F81] transition-colors">Services</Link>
            <ChevronRight size={12} className="text-[#FF4F81]" />
            <span className="text-[#FF4F81] font-bold">{cityName} Senior Care</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer} 
              className="max-w-2xl text-left order-2 lg:order-1 space-y-5"
            >
              {/* Trust Badge Eyebrow */}
              <motion.div 
                variants={fadeInUp} 
                className="inline-flex items-center gap-2 rounded-full bg-[#FFF0F5] border border-[#FFD6E5] px-4 py-1.5 text-xs sm:text-sm font-bold text-[#FF4F81] shadow-xs"
              >
                <Sparkles size={16} className="text-[#FF3E72] animate-pulse" /> {eyebrowBadgeText}
              </motion.div>
              
              {/* Main SEO H1 Headline */}
              <motion.h1 
                variants={fadeInUp} 
                className="text-3xl sm:text-4xl md:text-[3rem] lg:text-[3.5rem] font-black tracking-tight text-[#17345E] leading-[1.12]"
              >
                {h1TitleStart}
                <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF3E72,#FF7A45,#7B2CBF)]">
                  {h1CityHighlighted}
                </span>
                {h1TitleEnd}
              </motion.h1>

              {/* Subtitle Paragraph */}
              <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
                {heroSubtitle}
              </motion.p>
              
              {/* CTA Buttons - Clean Consultation Actions (No raw phone numbers or prices) */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Button 
                  size="lg" 
                  onClick={() => handleOpenBooking(`Home Care Visit in ${cityName}`)}
                  className="w-full sm:w-auto bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 border-0 text-white font-extrabold text-base sm:text-lg h-14 px-8 shadow-[0_8px_22px_rgba(233,30,99,0.25)] rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
                >
                  <Calendar size={18} className="mr-2" /> Book a Home Visit
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => handleOpenBooking(`Enquiry & Callback for ${cityName}`)}
                  className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-800 hover:bg-pink-50/50 hover:border-[#E91E63] hover:text-[#E91E63] font-extrabold text-base sm:text-lg h-14 px-8 rounded-xl transition-all duration-300 group cursor-pointer"
                >
                  <MessageSquare size={18} className="mr-2 text-[#FF4F81]" /> Request a Callback
                </Button>
              </motion.div>

              {/* Premium Icon-Led Trust Badge Row */}
              <motion.div 
                variants={staggerContainer} 
                className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-bold text-slate-700"
              >
                <motion.div variants={fadeInUp} className="flex items-center gap-2.5 bg-pink-50/50 border border-pink-100/60 rounded-xl px-3.5 py-2.5 shadow-2xs">
                  <ShieldCheck size={18} className="text-[#E91E63] shrink-0" /> 
                  <span>Verified staff</span>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-center gap-2.5 bg-pink-50/50 border border-pink-100/60 rounded-xl px-3.5 py-2.5 shadow-2xs">
                  <Stethoscope size={18} className="text-[#E91E63] shrink-0" /> 
                  <span>Doctor-guided</span>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-center gap-2.5 bg-pink-50/50 border border-pink-100/60 rounded-xl px-3.5 py-2.5 shadow-2xs">
                  <Heart size={18} className="text-[#FF4F81] shrink-0" /> 
                  <span>Compassionate</span>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Right Visual Column - Rakesh Bedi Portrait (Approved Homepage Presentation) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: premiumEase }}
              className="relative mb-6 lg:mb-0 flex flex-col items-center justify-center order-1 lg:order-2"
            >
              <div className="relative w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[620px]">
                <img 
                  src="/hero-doctor.png"
                  alt="Rakesh Bedi - SilverCare Brand Ambassador" 
                  className="w-full h-auto object-contain object-bottom max-h-[340px] sm:max-h-[480px] lg:max-h-[620px] transition-transform duration-500 hover:scale-[1.01]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Brand Ambassador Badge ("TRUSTED BY RAKESH BEDI") */}
                <div className="absolute bottom-1 right-2 sm:bottom-2 sm:right-6 lg:bottom-4 lg:right-8 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,243,255,0.96)_100%)] backdrop-blur-md border border-[#7B4CC9]/[0.16] shadow-[0_8px_22px_rgba(72,45,128,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] rounded-[14px] px-3.5 sm:px-4.5 py-2.5 sm:py-3 flex items-center gap-2.5 sm:gap-3 z-20 transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_26px_rgba(72,45,128,0.18)]">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#7B4CC9]/[0.12] border border-[#7B4CC9]/[0.14] text-[#7B4CC9] flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck size={20} className="sm:hidden" />
                    <ShieldCheck size={22} className="hidden sm:block text-[#7B4CC9]" />
                  </div>
                  <div>
                    <span className="block text-[13px] sm:text-[14.5px] font-black uppercase text-[#17365C] tracking-[0.4px] leading-tight mb-0.5">
                      TRUSTED BY RAKESH BEDI
                    </span>
                    <span className="block text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.6px] text-[#7B4CC9] leading-tight">
                      BRAND AMBASSADOR
                    </span>
                    <span className="block text-[9px] sm:text-[9.5px] font-extrabold uppercase tracking-[0.8px] text-slate-500 leading-none mt-0.5">
                      SILVERCARE
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. STATS BAR SECTION (Matching Approved Homepage Strip) */}
      {/* ============================================================ */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1480px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {displayStats.map((stat, i) => {
              const StatIcon = stat.icon || CheckCircle2;
              return (
                <div key={i} className="p-4 sm:p-5 rounded-2xl bg-pink-50/30 border border-pink-100/50 flex flex-col items-center hover:bg-pink-50/50 transition-colors">
                  <StatIcon size={24} className="text-[#E91E63] mb-2" />
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#17345E]">{stat.value}</span>
                  <span className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. OPTIONAL INTERACTIVE MODULES (Sector Navigator / Fall Risk) */}
      {/* ============================================================ */}
      {sectorHubs && sectorHubs.length > 0 && (
        <section className="py-12 bg-[#FAF7FC] border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
                <Compass size={14} /> {sectorHubsTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#17345E]">
                Select Your {cityName} Sector Zone
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl mx-auto">
                {sectorHubsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {sectorHubs.map((hub, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHub(hub)}
                  className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
                    selectedHub?.name === hub.name
                      ? "bg-white border-[#E91E63] shadow-md ring-2 ring-[#E91E63]/20"
                      : "bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="text-[11px] font-bold text-[#E91E63] flex items-center justify-between mb-1">
                    <span>{hub.status}</span>
                    {selectedHub?.name === hub.name && <CheckCircle2 size={13} className="text-[#E91E63]" />}
                  </div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm leading-tight line-clamp-1">
                    {hub.name}
                  </div>
                </button>
              ))}
            </div>

            {selectedHub && (
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-pink-50 text-[#E91E63] flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#17345E] text-sm sm:text-base">{selectedHub.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{selectedHub.coverage}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleOpenBooking(`Care Dispatch to ${selectedHub.name}`)}
                  className="w-full sm:w-auto bg-[linear-gradient(90deg,#FF4F81,#E91E63)] text-white font-bold text-xs h-10 px-5 rounded-xl shadow-xs cursor-pointer"
                >
                  Request Dispatch to {selectedHub.name.split(' ')[0]} →
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Fall Risk Interactive Assessment (Geriatric Safety) */}
      {fallRiskQuestions && fallRiskQuestions.length > 0 && (
        <section className="py-12 bg-[#FAF7FC] border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
                <AlertTriangle size={14} /> Interactive Fall-Risk Assessment Tool
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#17345E]">
                Evaluate Your Senior's Fall Risk in 30 Seconds
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl mx-auto">
                Check the boxes that apply to your elder to receive an instant risk calculation and clinical safety advice.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-4">
              <div className="space-y-3">
                {fallRiskQuestions.map((q) => (
                  <label
                    key={q.key}
                    onClick={() => handleToggleFallAnswer(q.key)}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                      fallAnswers[q.key]
                        ? "bg-pink-50/50 border-[#E91E63] text-slate-900"
                        : "bg-slate-50/50 border-slate-200/80 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!fallAnswers[q.key]}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-[#E91E63] focus:ring-[#E91E63]"
                    />
                    <span className="text-xs sm:text-sm font-semibold leading-relaxed">{q.q}</span>
                  </label>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  onClick={calculateFallRisk}
                  className="w-full sm:w-auto bg-[linear-gradient(90deg,#FF4F81,#E91E63)] text-white font-extrabold text-xs sm:text-sm h-11 px-6 rounded-xl shadow-xs cursor-pointer"
                >
                  Calculate Senior Fall Risk →
                </Button>

                {assessmentResult && (
                  <div className="w-full sm:w-auto flex-1 p-3 rounded-xl bg-pink-50 border border-pink-200 text-xs font-bold text-[#17345E]">
                    {assessmentResult}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. SEARCH & CATEGORY FILTER BAR */}
      {/* ============================================================ */}
      <section className="py-4 bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-[72px] z-30 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1480px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search services, sectors, or clinical needs in ${cityName}...`}
                className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4F81] focus:bg-white transition-all"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer">
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {[
                { id: "all", label: "All Ranked Services" },
                { id: "nursing", label: "Nursing & Attendants" },
                { id: "clinical", label: "Doctor Visits & Labs" },
                { id: "rehab", label: "Physio & Rehab" },
                { id: "specialized", label: "Dementia & ICU" },
                { id: "support", label: "NRI Care & Companionship" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all border cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[linear-gradient(90deg,#FF4F81,#E91E63)] text-white border-transparent shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. TOP RANKED SERVICES SHOWCASE */}
      {/* ============================================================ */}
      <section className="relative py-16 lg:py-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#FAF6FF_50%,#FFFFFF_100%)] overflow-hidden border-b border-slate-100">
        <OrganicPastelBlobs variant="services" />
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
          <HalftoneWaveSVG density="subtle" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#FF4F81] mb-2 block">
              Official 2026 Rankings
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#17345E]">
              {servicesSectionTitle}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              {servicesSectionSubtitle}
            </p>
          </div>

          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-pink-100 shadow-sm">
              <Search size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-800">No matching services found</h3>
              <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or category filter.</p>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }} className="mt-4 bg-[#FF4F81] text-white font-bold text-xs">
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredServices.map((service) => {
                const IconComp = service.icon || Heart;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(233,30,99,0.12)] hover:border-pink-200/80 transition-all duration-300 overflow-hidden relative group hover:-translate-y-0.5"
                  >
                    {/* Top Rank Header Strip */}
                    <div className="bg-gradient-to-r from-pink-50/80 via-purple-50/50 to-pink-50/40 border-b border-pink-100/60 px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-full bg-[linear-gradient(90deg,#FF4F81,#E91E63)] text-white font-black text-sm flex items-center justify-center shadow-xs">
                          #{service.rank}
                        </span>
                        <span className="font-extrabold text-xs sm:text-sm tracking-wide text-[#17345E] uppercase flex items-center gap-1.5">
                          <Award size={16} className="text-[#FF4F81]" /> {service.badgeTag}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                        <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-pink-100/80 shadow-2xs">
                          <Star size={14} className="fill-amber-400 text-amber-400" />
                          <strong className="text-[#17345E]">{service.rating}</strong> / 5 ({service.reviewCount}+ Reviews)
                        </span>
                        {service.doctorSupervised && (
                          <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200/60 text-xs">
                            <ShieldCheck size={14} className="text-emerald-600" /> Doctor Supervised
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Service Left Details */}
                        <div className="lg:col-span-8 space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-pink-50 text-[#E91E63] flex items-center justify-center shrink-0 border border-pink-100 shadow-2xs">
                              <IconComp size={24} />
                            </div>
                            <div>
                              <h3 className="text-xl sm:text-2xl font-black text-[#17345E] leading-tight">
                                {service.title}
                              </h3>
                              {service.responseTime && (
                                <p className="text-xs font-bold text-[#E91E63] mt-0.5">
                                  Response in {cityName}: {service.responseTime}
                                </p>
                              )}
                            </div>
                          </div>

                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                            {service.fullDesc}
                          </p>

                          {/* Key Features Bullet List */}
                          <div>
                            <h4 className="text-xs font-extrabold text-[#17345E] uppercase tracking-wider mb-2">Key Clinical Highlights:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                              {service.keyFeatures.map((feat, idx) => (
                                <div key={idx} className="flex items-start gap-2 bg-[#FAF7FC] p-2.5 rounded-xl border border-pink-100/50">
                                  <CheckCircle2 size={15} className="text-[#E91E63] shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Sector Coverage Tags */}
                          {service.coveredSectors && service.coveredSectors.length > 0 && (
                            <div className="pt-1">
                              <span className="text-[11px] font-bold text-slate-400 uppercase mr-2">Covered Areas:</span>
                              <div className="inline-flex flex-wrap gap-1.5 mt-1">
                                {service.coveredSectors.map((sec, sIdx) => (
                                  <span key={sIdx} className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-slate-200">
                                    📍 {sec}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>

                        {/* Service Right Action Box */}
                        <div className="lg:col-span-4 bg-pink-50/30 rounded-2xl p-5 border border-pink-100/60 flex flex-col justify-between h-full space-y-4">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 text-[#E91E63] text-[11px] font-extrabold mb-3">
                              <ShieldCheck size={13} /> Verified Senior Care
                            </div>

                            <div className="text-xs text-slate-600 leading-relaxed">
                              <strong className="text-slate-900 font-bold">Recommended for:</strong> {service.recommendedFor}
                            </div>
                          </div>

                          <div className="space-y-2.5 pt-2">
                            <Button
                              onClick={() => handleOpenBooking(`Booking: ${service.title}`)}
                              className="w-full bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm h-11 rounded-xl shadow-md shadow-[#FF4F81]/20 border-0 transition-all hover:scale-[1.01] cursor-pointer"
                            >
                              Book {service.title.split(' ')[0]} Care →
                            </Button>

                            <button 
                              type="button"
                              onClick={() => handleOpenBooking(`Consultation: ${service.title}`)}
                              className="w-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs h-10 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                            >
                              <MessageSquare size={14} className="text-[#E91E63]" /> Request Clinical Callback
                            </button>
                          </div>

                        </div>

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. EXPLORE SISTER LOCATIONS ACROSS TRICITY, NCR & REGION */}
      {/* ============================================================ */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-10">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#FF4F81] mb-2 block">
              Regional Healthcare Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17345E]">
              Explore Our Eldercare Services Across Tricity, NCR & Northern India
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALL_SISTER_LOCATIONS.map((loc, idx) => {
              const isActive = loc.name.toLowerCase().includes(cityName.toLowerCase().split(' ')[0]);
              return (
                <Link 
                  key={idx}
                  to={loc.path} 
                  className={`p-5 rounded-2xl text-left block transition-all ${
                    isActive 
                      ? "bg-pink-50/40 border-2 border-[#E91E63] shadow-xs" 
                      : "bg-white hover:bg-slate-50 border border-slate-200 hover:border-pink-200"
                  }`}
                >
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#E91E63] mb-1">
                    {isActive ? "📍 CURRENT LOCATION" : "📍 REGIONAL HUB"}
                  </div>
                  <h3 className="font-extrabold text-[#17345E] text-base">{loc.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{loc.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-[#FAF7FC] border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <HelpCircle size={14} /> Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17345E]">
              Questions About Senior Care in {cityName}
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-slate-100/90 overflow-hidden shadow-2xs hover:border-pink-200/80 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-extrabold text-[#17345E] text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                  <div className={`h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 transition-transform ${openFaq === index ? 'rotate-180 bg-pink-100 text-[#E91E63]' : 'text-slate-500'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-100 bg-slate-50/40 px-5 sm:px-6 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FINAL HIGH-IMPACT BOTTOM CTA (Matching Approved Website Theme) */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 bg-[linear-gradient(135deg,#17345E_0%,#3B0764_50%,#E91E63_100%)] text-white relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF4F81]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-pink-200 font-extrabold text-xs uppercase tracking-wider backdrop-blur-sm border border-white/10">
            <Sparkles size={14} className="text-pink-300" /> Immediate Care Readiness
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {ctaHeading}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-pink-100/90 leading-relaxed max-w-2xl mx-auto font-normal">
            {ctaDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg"
              onClick={() => handleOpenBooking(`Assessment for ${cityName}`)}
              className="w-full sm:w-auto bg-white text-[#17345E] hover:bg-slate-50 font-black text-base sm:text-lg h-14 px-8 rounded-xl shadow-xl transition-all hover:scale-105 border-0 cursor-pointer"
            >
              Request Free Home Assessment →
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => handleOpenBooking(`Direct Consultation for ${cityName}`)}
              className="w-full sm:w-auto border-2 border-white/40 bg-white/10 hover:bg-white/20 text-white font-extrabold text-base sm:text-lg h-14 px-8 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageSquare size={18} className="text-pink-300" /> Speak with Clinical Care Manager
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
