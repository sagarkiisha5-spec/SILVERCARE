import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Stethoscope, 
  UserCheck, 
  Activity, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  PhoneCall, 
  Award, 
  CheckCircle2, 
  Heart, 
  Sparkles, 
  Search, 
  Building2, 
  HelpCircle, 
  Users, 
  Check, 
  Calendar,
  Globe,
  Flame,
  ThumbsUp,
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  Compass,
  Zap,
  CheckCheck,
  X,
  FileCheck2,
  Hospital
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/src/components/ui/button";
import CareCalculator from "@/src/components/tools/CareCalculator";
import AutoBookingModal from "@/src/components/shared/AutoBookingModal";
import SilverCareBackground, { HalftoneWaveSVG, OrganicPastelBlobs } from "@/src/components/shared/SilverCareBackground";

const easeCustom = [0.22, 1, 0.36, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeCustom } }
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

interface RankedService {
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
  startingPrice: string;
  responseTime: string;
  coveredSectors: string[];
  recommendedFor: string;
  doctorSupervised: boolean;
  icon: React.ElementType;
}

const TOP_KHARAR_SERVICES: RankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care",
    title: "24/7 Skilled In-Home Nursing & Attendant Care",
    badgeTag: "#1 Choice in Kharar & Sunny Enclave",
    category: "nursing",
    rating: 4.9,
    reviewCount: 390,
    shortDesc: "Comprehensive 12-hour and 24-hour live-in registered nurses (GNM/B.Sc) and trained geriatric attendants for seniors in Kharar.",
    fullDesc: "SilverCare provides Kharar's leading in-home eldercare services. Certified GNM and B.Sc nurses specialize in bedridden care, post-stroke recovery, tracheostomy care, catheterization, aseptic wound dressing, and IV infusions under strict doctor oversight.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM/B.Sc Registered Nurses",
      "Vitals Logging, Medication Management & Sugar/BP Monitoring",
      "Tracheostomy, Feeding Tube (Ryle's Tube) & Catheter Care",
      "Guaranteed 24-Hour Caregiver Replacement across Sunny Enclave & Gillco Valley"
    ],
    startingPrice: "₹1,200 / day (Attendant) • ₹2,200 / day (Skilled Nurse)",
    responseTime: "Prompt Same-Day Deployment in Kharar",
    coveredSectors: ["Sunny Enclave", "Gillco Valley", "Shivalik City", "Model Town Kharar", "Kharar-Kurali Highway", "Landran Road"],
    recommendedFor: "Bedridden seniors, post-hospitalization recovery & post-operative care.",
    doctorSupervised: true,
    icon: Heart
  },
  {
    rank: 2,
    id: "doctor-visit-at-home",
    title: "Doctor Home Visits & Bedside Geriatric Consultation",
    badgeTag: "Most Trusted Bedside Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 310,
    shortDesc: "Experienced MBBS and MD geriatric physicians visiting your residence for complete health checkups and chronic illness reviews.",
    fullDesc: "Avoid the hassle of long traffic delays to Mohali/Chandigarh hospitals. Our senior physicians conduct detailed bedside clinical examinations, adjust prescriptions, order necessary lab tests, and coordinate continuous chronic disease management right in your home.",
    keyFeatures: [
      "Senior MBBS / MD Geriatricians visiting patient's home",
      "Complete Bedside Vitals Check, ECG & Chronic Condition Review",
      "Digital Prescription & Direct Coordination with Home Nurses",
      "Hospital OPD Avoidance for frail and immobile seniors"
    ],
    startingPrice: "₹1,499 per consultation visit",
    responseTime: "Same-Day / Scheduled 2-Hour Slot",
    coveredSectors: ["Sunny Enclave Sector 125", "Gillco Valley", "Omega City", "Chajju Majra Road", "Sante Majra"],
    recommendedFor: "Hypertension, Diabetes management, dementia evaluation & post-discharge follow-ups.",
    doctorSupervised: true,
    icon: Stethoscope
  },
  {
    rank: 3,
    id: "physiotherapy-at-home",
    title: "Specialized Geriatric & Neuro Physiotherapy at Home",
    badgeTag: "Certified Rehab Specialists",
    category: "rehab",
    rating: 4.9,
    reviewCount: 280,
    shortDesc: "Licensed BPT/MPT physiotherapists bringing electrotherapy, ultrasound, and mobility equipment directly to senior homes.",
    fullDesc: "Restore joint mobility, muscle strength, and balance after knee/hip replacements, fractures, or paralytic strokes. Our physical therapists design customized rehabilitation programs with daily progress tracking.",
    keyFeatures: [
      "Certified MPT/BPT Neuro & Orthopedic Specialists",
      "Portable Ultrasound, TENS & Muscle Stimulator Units",
      "Fall Prevention, Balance Training & Gait Re-education",
      "Post-Knee & Hip Arthroplasty specialized rehabilitation protocols"
    ],
    startingPrice: "₹699 / session • Monthly rehabilitation packages available",
    responseTime: "Within 2-4 Hours",
    coveredSectors: ["Kharar Town", "Sunny Enclave", "Gillco Heights", "Aman City", "Kharar-Landran Road"],
    recommendedFor: "Paralysis recovery, Arthritis pain, Parkinson's mobility & Post-fracture rehab.",
    doctorSupervised: true,
    icon: Activity
  },
  {
    rank: 4,
    id: "icu-setup-at-home",
    title: "Critical Care & ICU Setup at Home in Kharar",
    badgeTag: "Hospital-Grade Critical Care",
    category: "specialized",
    rating: 4.9,
    reviewCount: 195,
    shortDesc: "Complete hospital-grade ICU infrastructure at home with multi-para monitors, ventilators, oxygen concentrators, and ICU nurses.",
    fullDesc: "Step down safely from hospital ICUs to the warmth of home. SilverCare sets up medical-grade critical care equipment with 24/7 ICU-trained nurses, backup power units, and daily intensivist tele-consultations.",
    keyFeatures: [
      "Motorized ICU 3-Function / 5-Function Medical Beds",
      "Mechanical Ventilator, BiPAP / CPAP & High-Flow Oxygen Support",
      "5-Para Cardiac Monitors, Syringe Pumps & Suction Machines",
      "24/7 Dedicated Critical Care Qualified Nursing Officers"
    ],
    startingPrice: "Custom ICU Package starting ₹4,500 / day",
    responseTime: "Emergency 2 to 4-Hour Setup",
    coveredSectors: ["All Kharar Sectors", "Sunny Enclave", "Gillco Parkhills", "Darpan City", "TDI City Kharar"],
    recommendedFor: "Tracheostomy patients, advanced COPD, coma care, end-stage respiratory care.",
    doctorSupervised: true,
    icon: ShieldCheck
  },
  {
    rank: 5,
    id: "pathology-diagnostics",
    title: "Doorstep Pathology & Diagnostic Blood Sample Collection",
    badgeTag: "NABL Accredited Labs",
    category: "clinical",
    rating: 4.8,
    reviewCount: 340,
    shortDesc: "Hygienic home sample collection by certified phlebotomists with digital report delivery within 6 to 12 hours.",
    fullDesc: "No need to transport elderly parents to crowded diagnostic centers. Our phlebotomists collect blood and urine samples at home using vacuum vacutainers with fast digital delivery of verified reports.",
    keyFeatures: [
      "Senior Citizen Complete Health Screening Panels",
      "Fast HbA1c, CBC, Kidney & Liver Function, Lipid Profiles",
      "Home ECG & Holter Monitor setup by trained technicians",
      "Digital WhatsApp & Email report dispatch with doctor review"
    ],
    startingPrice: "Starts from ₹399 • Free Home Collection on packages",
    responseTime: "Early Morning Slots from 6:30 AM",
    coveredSectors: ["Entire Kharar & Greater Mohali"],
    recommendedFor: "Quarterly diabetic reviews, senior health checks, bedridden routine tests.",
    doctorSupervised: true,
    icon: UserCheck
  }
];

export default function ElderlyCareKharar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>("Skilled In-Home Nursing");

  const filteredServices = useMemo(() => {
    return TOP_KHARAR_SERVICES.filter(service => {
      const matchesCat = selectedCategory === "all" || service.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.coveredSectors.some(sec => sec.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare Eldercare & Senior Home Healthcare Kharar",
    "image": "https://silvercareindia.com/hero-doctor.png",
    "telephone": "+91 800-14-800-75",
    "email": "info@silvercareindia.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sunny Enclave & Kharar Hub",
      "addressLocality": "Kharar",
      "addressRegion": "Punjab",
      "postalCode": "140301",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.7456,
      "longitude": 76.6433
    },
    "url": "https://silvercareindia.com/best-elderly-healthcare-services-kharar",
    "priceRange": "₹₹",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Best Elderly Healthcare Services in Kharar | SilverCare India</title>
        <meta name="description" content="Top-rated senior eldercare and home nursing in Kharar, Sunny Enclave & Gillco Valley. 24/7 live-in nurses, doctor home visits, home physio & ICU setup. Call +91 800-14-800-75." />
        <link rel="canonical" href="https://silvercareindia.com/best-elderly-healthcare-services-kharar" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLdSchema)}
        </script>
      </Helmet>

      <div className="bg-slate-50 min-h-screen font-sans">
        {/* HERO SECTION */}
        <section className="relative bg-[linear-gradient(135deg,#0F172A_0%,#1E1B4B_50%,#3B0764_100%)] text-white pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <HalftoneWaveSVG density="high" />
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E91E63]/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm font-medium text-slate-300 mb-6">
              <Link to="/" className="hover:text-[#FF4F81] transition-colors">Home</Link>
              <span className="mx-2 text-slate-500">/</span>
              <Link to="/services" className="hover:text-[#FF4F81] transition-colors">Services</Link>
              <span className="mx-2 text-slate-500">/</span>
              <span className="text-[#FF4F81] font-bold">Elderly Care Kharar</span>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-semibold text-pink-200 mb-6 shadow-inner">
                <MapPin size={16} className="text-[#FF4F81]" />
                Kharar • Sunny Enclave • Gillco Valley • Shivalik City
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Best Elderly Healthcare Services in <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B9B,#FF4F81,#E91E63)]">Kharar</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-8 max-w-3xl">
                Compassionate, doctor-supervised in-home senior care in Kharar. 24/7 skilled nursing attendants, bedside doctor visits, physiotherapy, and hospital-grade ICU setups delivered directly to your doorstep.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button 
                  onClick={() => {
                    setSelectedServiceForBooking("24/7 Skilled In-Home Nursing");
                    setIsBookingOpen(true);
                  }}
                  className="bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white font-extrabold px-8 h-13 rounded-2xl shadow-xl shadow-[#E91E63]/30 text-base transition-all hover:scale-105"
                >
                  Book Care in Kharar
                </Button>
                <a 
                  href="tel:+918001480075"
                  className="inline-flex items-center gap-2 px-6 h-13 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white font-bold hover:bg-white hover:text-slate-900 transition-all text-sm"
                >
                  <PhoneCall size={18} className="text-[#FF4F81]" /> +91 800-14-800-75
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES RANKED LIST */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-[#E91E63] font-bold text-xs uppercase tracking-wider block mb-2">Verified Clinical Standards</span>
              <h2 className="text-3xl font-extrabold text-[#17345E] mb-4">Top Ranked Eldercare Services in Kharar</h2>
              <p className="text-slate-600 text-base">Explore comprehensive home healthcare solutions tailored for senior citizens living in Kharar and surrounding residential townships.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-8">
              {["all", "nursing", "clinical", "rehab", "specialized"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                    selectedCategory === cat 
                      ? 'bg-[#E91E63] text-white shadow-md shadow-[#E91E63]/25' 
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat === "all" ? "All Services" : cat}
                </button>
              ))}
            </div>

            {/* Services Cards */}
            <div className="space-y-8">
              {filteredServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={service.id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-start justify-between group hover:border-[#E91E63]"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3.5 py-1 rounded-full bg-pink-50 text-[#E91E63] border border-pink-200 text-xs font-bold">
                          {service.badgeTag}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star size={14} className="fill-amber-400 text-amber-400" />
                          <span>{service.rating} ({service.reviewCount} reviews)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#FCE4EC] text-[#E91E63] flex items-center justify-center shrink-0">
                          <IconComponent size={24} />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                        {service.fullDesc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                        {service.keyFeatures.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                            <CheckCircle2 size={16} className="text-[#00B894] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-4 border-t border-slate-100">
                        <span className="flex items-center gap-1.5"><Clock size={15} className="text-[#FF4F81]" /> {service.responseTime}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={15} className="text-[#FF4F81]" /> Covers: {service.coveredSectors.slice(0, 3).join(", ")} + more</span>
                      </div>
                    </div>

                    <div className="w-full lg:w-72 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shrink-0 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Pricing Model</span>
                        <div className="text-base font-extrabold text-[#17345E] mb-4">{service.startingPrice}</div>
                        <span className="text-xs text-slate-500 font-medium block mb-4">Doctor-Supervised • 100% Background Verified</span>
                      </div>
                      <Button 
                        onClick={() => {
                          setSelectedServiceForBooking(service.title);
                          setIsBookingOpen(true);
                        }}
                        className="w-full bg-[linear-gradient(90deg,#FF4F81,#E91E63)] text-white font-bold h-11 rounded-xl shadow-md text-sm hover:opacity-95"
                      >
                        Book This Service
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAST DISPATCH BANNER */}
        <section className="py-14 bg-[linear-gradient(90deg,#E91E63_0%,#FF4F81_100%)] text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Need Immediate Eldercare Assistance in Kharar?</h2>
            <p className="text-pink-100 text-sm sm:text-base mb-6">Our 24/7 clinical coordinators will connect you with qualified nurses and physiotherapists in Kharar within minutes.</p>
            <a href="tel:+918001480075" className="inline-flex items-center gap-2 bg-white text-[#E91E63] font-extrabold px-8 h-13 rounded-2xl shadow-xl hover:bg-slate-100 transition-all text-base">
              <PhoneCall size={20} /> Call Now: +91 800-14-800-75
            </a>
          </div>
        </section>
      </div>

      <AutoBookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={selectedServiceForBooking}
        preselectedCity="Kharar"
      />
    </>
  );
}
