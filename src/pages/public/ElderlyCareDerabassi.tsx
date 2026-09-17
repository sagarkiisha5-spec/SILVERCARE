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
import AutoBookingModal from "@/src/components/shared/AutoBookingModal";
import SilverCareBackground, { HalftoneWaveSVG } from "@/src/components/shared/SilverCareBackground";

const easeCustom = [0.22, 1, 0.36, 1];

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

const TOP_DERABASSI_SERVICES: RankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care",
    title: "24/7 Skilled In-Home Nursing & Attendant Care",
    badgeTag: "#1 Choice in Derabassi & Barwala Road",
    category: "nursing",
    rating: 4.9,
    reviewCount: 320,
    shortDesc: "Dedicated 12-hour and 24-hour registered nurses (GNM/B.Sc) and trained geriatric caregivers for seniors in Derabassi.",
    fullDesc: "SilverCare delivers premier home nursing across Derabassi, ATS Golf Meadows, and Gulmohar City. Certified nurses manage medication, injections, post-operative wounds, and daily mobility with strict doctor supervision.",
    keyFeatures: [
      "12-Hour & 24-Hour Qualified GNM/B.Sc Registered Nurses",
      "Vitals Logging, Medication Management & Sugar/BP Monitoring",
      "Catheterization, Tracheostomy & Tube Feeding Care",
      "Prompt 24-Hour Caregiver Replacement Guarantee across Derabassi"
    ],
    startingPrice: "₹1,200 / day (Attendant) • ₹2,200 / day (Skilled Nurse)",
    responseTime: "Prompt Same-Day Dispatch from Zirakpur Hub",
    coveredSectors: ["ATS Golf Meadows", "Gulmohar City", "Barwala Road", "Haibatpur Road", "Silver City Derabassi", "Derabassi Main"],
    recommendedFor: "Elderly recovery, post-surgery support & chronic health management.",
    doctorSupervised: true,
    icon: Heart
  },
  {
    rank: 2,
    id: "doctor-visit-at-home",
    title: "Doctor Home Visits & Bedside Consultation",
    badgeTag: "Doctor at Doorstep",
    category: "clinical",
    rating: 4.9,
    reviewCount: 290,
    shortDesc: "Experienced general physicians and geriatric doctors visiting senior homes in Derabassi for thorough clinical checkups.",
    fullDesc: "No need to drive into Chandigarh or Mohali for routine doctor visits. Our doctors conduct comprehensive bedside evaluations, adjust medicines, and review recovery progress right in your home.",
    keyFeatures: [
      "Senior MBBS / MD Physicians visiting your residence",
      "Comprehensive Bedside Clinical Checkup & Prescription Review",
      "Direct Coordination with Family & Caregiver Attendants",
      "Avoid Hospital OPD Commutes for frail seniors"
    ],
    startingPrice: "₹1,499 per consultation visit",
    responseTime: "Same-Day Scheduled Visits",
    coveredSectors: ["Gulmohar City", "ATS Pride & Meadows", "Bella Green", "Barwala Road"],
    recommendedFor: "Chronic illness monitoring, diabetes, hypertension & dementia care.",
    doctorSupervised: true,
    icon: Stethoscope
  },
  {
    rank: 3,
    id: "physiotherapy-at-home",
    title: "Home Physiotherapy & Stroke Rehabilitation",
    badgeTag: "Certified Physiotherapists",
    category: "rehab",
    rating: 4.9,
    reviewCount: 260,
    shortDesc: "Personalized physical rehabilitation for joint pain, stroke recovery, and post-fracture mobility in Derabassi.",
    fullDesc: "Experienced physiotherapists deliver electrotherapy, muscle strengthening, and gait retraining at your home to help seniors regain independent walking and daily function.",
    keyFeatures: [
      "Certified MPT/BPT Orthopedic & Neuro Specialists",
      "Post-Knee & Hip Replacement custom recovery protocols",
      "Advanced portable modalities (TENS, Muscle Stimulators)",
      "Balance training and fall prevention routines"
    ],
    startingPrice: "₹699 / session • Monthly packages available",
    responseTime: "Within 2 to 4 Hours",
    coveredSectors: ["Entire Derabassi & Zirakpur-Derabassi Highway"],
    recommendedFor: "Joint stiffness, paralysis recovery, post-fall rehabilitation.",
    doctorSupervised: true,
    icon: Activity
  },
  {
    rank: 4,
    id: "icu-setup-at-home",
    title: "Critical Care & ICU Setup at Home in Derabassi",
    badgeTag: "Critical Care Excellence",
    category: "specialized",
    rating: 4.9,
    reviewCount: 175,
    shortDesc: "Complete hospital-grade ICU infrastructure at home with multi-para monitors, ventilators, and 24/7 critical care nurses.",
    fullDesc: "Safe hospital-to-home step-down critical care. We deliver motorized ICU beds, oxygen concentrators, suction machines, and 24/7 ICU nurses supervised by intensivists.",
    keyFeatures: [
      "Motorized ICU 3-Function & 5-Function Medical Beds",
      "BiPAP, CPAP, Oxygen Concentrators & Ventilators",
      "5-Para Vital Sign Cardiac Monitors & Syringe Infusion Pumps",
      "24/7 Dedicated Critical Care Qualified Nurses"
    ],
    startingPrice: "Custom ICU Package starting ₹4,500 / day",
    responseTime: "Emergency 2-4 Hour Deployment",
    coveredSectors: ["All Residential Societies in Derabassi"],
    recommendedFor: "Post-ICU step-down, tracheostomy, advanced respiratory care.",
    doctorSupervised: true,
    icon: ShieldCheck
  }
];

export default function ElderlyCareDerabassi() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>("Skilled In-Home Nursing");

  const filteredServices = useMemo(() => {
    return TOP_DERABASSI_SERVICES.filter(service => {
      return selectedCategory === "all" || service.category === selectedCategory;
    });
  }, [selectedCategory]);

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare Eldercare & Senior Home Healthcare Derabassi",
    "image": "https://silvercareindia.com/hero-doctor.png",
    "telephone": "+91 800-14-800-75",
    "email": "info@silvercareindia.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Derabassi - Zirakpur Hub",
      "addressLocality": "Derabassi",
      "addressRegion": "Punjab",
      "postalCode": "140507",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.5898,
      "longitude": 76.8443
    },
    "url": "https://silvercareindia.com/best-elderly-healthcare-services-derabassi",
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
        <title>Best Elderly Healthcare Services in Derabassi | SilverCare India</title>
        <meta name="description" content="Trusted eldercare and home nursing in Derabassi, ATS Golf Meadows, and Gulmohar City. 24/7 live-in nurses, doctor home visits & home physio. Call +91 800-14-800-75." />
        <link rel="canonical" href="https://silvercareindia.com/best-elderly-healthcare-services-derabassi" />
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
            <nav className="flex items-center text-sm font-medium text-slate-300 mb-6">
              <Link to="/" className="hover:text-[#FF4F81] transition-colors">Home</Link>
              <span className="mx-2 text-slate-500">/</span>
              <Link to="/services" className="hover:text-[#FF4F81] transition-colors">Services</Link>
              <span className="mx-2 text-slate-500">/</span>
              <span className="text-[#FF4F81] font-bold">Elderly Care Derabassi</span>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-semibold text-pink-200 mb-6 shadow-inner">
                <MapPin size={16} className="text-[#FF4F81]" />
                Derabassi • ATS Golf Meadows • Gulmohar City • Barwala Road
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Best Elderly Healthcare Services in <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B9B,#FF4F81,#E91E63)]">Derabassi</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-8 max-w-3xl">
                Dedicated in-home senior healthcare and nursing care in Derabassi. 24/7 skilled nursing attendants, bedside doctor visits, home physiotherapy, and medical ICU setups dispatched promptly.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button 
                  onClick={() => {
                    setSelectedServiceForBooking("24/7 Skilled In-Home Nursing");
                    setIsBookingOpen(true);
                  }}
                  className="bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white font-extrabold px-8 h-13 rounded-2xl shadow-xl shadow-[#E91E63]/30 text-base transition-all hover:scale-105"
                >
                  Book Care in Derabassi
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

        {/* SERVICES LIST */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-[#E91E63] font-bold text-xs uppercase tracking-wider block mb-2">Hospital-Grade Eldercare</span>
              <h2 className="text-3xl font-extrabold text-[#17345E] mb-4">Top Ranked Eldercare Services in Derabassi</h2>
              <p className="text-slate-600 text-base">Explore comprehensive clinical home healthcare solutions designed for seniors living in Derabassi and surrounding townships.</p>
            </div>

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
                        <span className="flex items-center gap-1.5"><MapPin size={15} className="text-[#FF4F81]" /> Covers: {service.coveredSectors.slice(0, 3).join(", ")}</span>
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

        {/* CTA BANNER */}
        <section className="py-14 bg-[linear-gradient(90deg,#E91E63_0%,#FF4F81_100%)] text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Need Fast Eldercare Deployment in Derabassi?</h2>
            <p className="text-pink-100 text-sm sm:text-base mb-6">Our 24/7 care coordination desk will match certified nursing attendants and physiotherapists in Derabassi immediately.</p>
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
        preselectedCity="Derabassi"
      />
    </>
  );
}
