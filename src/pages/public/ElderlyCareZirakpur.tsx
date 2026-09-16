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
  Layers,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/src/components/ui/button";
import CareCalculator from "@/src/components/tools/CareCalculator";
import AutoBookingModal from "@/src/components/shared/AutoBookingModal";

// Motion Tokens
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

// Interface for Ranked Eldercare Services in Zirakpur
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
  coveredAreas: string[];
  recommendedFor: string;
  doctorSupervised: boolean;
  icon: React.ElementType;
}

// Top 10 Best Elderly Healthcare Services in Zirakpur Dataset
const TOP_ZIRAKPUR_SERVICES: RankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-zirakpur",
    title: "24/7 Skilled In-Home Nursing & Attendant Care in Zirakpur",
    badgeTag: "#1 Flagship Hub in Zirakpur",
    category: "nursing",
    rating: 5.0,
    reviewCount: 450,
    shortDesc: "SilverCare's flagship central headquarters is based in Zirakpur! Delivering rapid deployment of qualified GNM/B.Sc registered nurses across VIP Road, Dhakoli, & Peer Muchalla.",
    fullDesc: "Because SilverCare's central clinical operations are headquartered at Green Lotus Avenue Complex, Zirakpur, our eldercare teams offer rapid deployment for 12h/24h nursing, catheterization, bedridden care, and post-operative recovery across all Zirakpur societies.",
    keyFeatures: [
      "Headquarters Proximity: Immediate Caregiver Deployment in Zirakpur",
      "12-Hour & 24-Hour Live-In Qualified GNM & B.Sc Registered Nurses",
      "Coverage Across VIP Road, Dhakoli, Peer Muchalla, Gazipur & PR7 Airport Road",
      "100% Police Verified & Doctor-Supervised Clinical Staff"
    ],
    startingPrice: "₹1,200 / day (Attendant) • ₹2,200 / day (Skilled Nurse)",
    responseTime: "Prompt Same-Day Deployment",
    coveredAreas: ["VIP Road & VIP Galleria", "Dhakoli & Peer Muchalla", "Singhpura & Gazipur Road", "Patiala Highway & Ambala Highway"],
    recommendedFor: "Bedridden elders, post-surgical recovery, chronic illness care, and 24/7 senior assistance.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 2,
    id: "doctor-home-visits-zirakpur",
    title: "Senior Physician & Geriatric Doctor Home Visits in Zirakpur",
    badgeTag: "Top Clinical Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 380,
    shortDesc: "Senior MBBS & MD Physicians visiting residential apartments across Zirakpur for thorough health checkups, portable ECG, and prescription audits.",
    fullDesc: "Skip chaotic traffic on Chandigarh-Ambala highway. SilverCare doctors conduct bedside consultations, 12-lead ECG, blood pressure checks, and chronic care management in your Zirakpur apartment.",
    keyFeatures: [
      "Senior MD Physicians Visiting Your High-Rise Apartment",
      "At-Home 12-Lead ECG, Blood Pressure & Pulse Oximetry Diagnostics",
      "Medication Optimization & Polypharmacy Review",
      "Direct Hospital Referral Coordination across Tricity"
    ],
    startingPrice: "₹1,500 - ₹2,000 per consultation",
    responseTime: "Same-Day Appointment Available",
    coveredAreas: ["VIP Road Societies", "PR7 Airport Road", "Maya Garden", "Highland Park", "Savitry Greens"],
    recommendedFor: "Seniors with mobility issues, routine checkups, hypertension, diabetes, and multi-morbidity care.",
    doctorSupervised: true,
    icon: UserCheck,
  },
  {
    rank: 3,
    id: "highrise-apartment-care-zirakpur",
    title: "High-Rise Society Eldercare & Lift-Assisted Mobility Protocol",
    badgeTag: "High-Rise Specialist",
    category: "support",
    rating: 5.0,
    reviewCount: 395,
    shortDesc: "Specialized care designed for senior citizens living in multi-storey gated societies along VIP Road, PR7, and Dhakoli with dedicated elevator-assisted mobility.",
    fullDesc: "Navigating elevators, high-rise balconies, and large society podiums requires vigilant caregivers. Our attendants provide safe wheelchair transfers, park walk accompaniment, and emergency evacuation protocols.",
    keyFeatures: [
      "Wheelchair & Lift Transition Assistance in Multi-Storey Towers",
      "Accompaniment to Society Clubhouses, Parks & Temple Complexes",
      "Direct Gate-Pass & Society Security Liaison for Smooth Access",
      "Rapid Elevator Emergency Evacuation Protocols"
    ],
    startingPrice: "₹1,200 / day or Custom Monthly Package",
    responseTime: "Fast Society Gate Dispatch",
    coveredAreas: ["Maya Garden City", "Highland Park", "Savitry Greens", "Motiaz Royal", "Sushma Grande"],
    recommendedFor: "Seniors residing in 4th to 15th-floor apartments requiring mobility and outdoor assistance.",
    doctorSupervised: false,
    icon: Layers,
  },
  {
    rank: 4,
    id: "physiotherapy-stroke-rehab-zirakpur",
    title: "Geriatric Physiotherapy & Joint Surgery Rehab at Home",
    badgeTag: "Fastest Recovery",
    category: "rehab",
    rating: 4.9,
    reviewCount: 370,
    shortDesc: "Certified Master of Physiotherapy (MPT) practitioners delivering stroke paralysis recovery, knee replacement rehab, and gait training in Zirakpur.",
    fullDesc: "Restore confident mobility without travelling to clinics. Our certified physiotherapists bring electrotherapy equipment (TENS/IFT/Ultrasound), balance trainers, and manual therapies directly to your Zirakpur apartment.",
    keyFeatures: [
      "Certified MPT Physiotherapists Specialized in Geriatrics",
      "Post-Total Knee/Hip Replacement Mobilization Programs",
      "Stroke Neuro-Rehabilitation & Fall Prevention Gait Training",
      "Portable Electrotherapy Equipment Included in Every Session"
    ],
    startingPrice: "₹800 - ₹1,200 per session • ₹18,000 / 15 sessions",
    responseTime: "Same-Day Session Booking",
    coveredAreas: ["VIP Road", "PR7 Airport Road", "Dhakoli", "Peer Muchalla", "Singhpura"],
    recommendedFor: "Post-op joint surgeries, stroke recovery, arthritis, sciatica, and fall rehabilitation.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 5,
    id: "dementia-alzheimers-care-zirakpur",
    title: "Specialized Dementia & Alzheimer's Memory Care Zirakpur",
    badgeTag: "Memory Care Leader",
    category: "specialized",
    rating: 4.8,
    reviewCount: 280,
    shortDesc: "Compassionate memory care specialists certified in cognitive stimulation, balcony/door anti-wandering protocols, and dementia behavioral management.",
    fullDesc: "Managing dementia in high-rise societies requires safety protocols to prevent balcony falls and elevator wandering. SilverCare's memory caregivers provide 24/7 vigilant reassurance.",
    keyFeatures: [
      "High-Rise Apartment Balcony & Door Anti-Wandering Protocols",
      "Cognitive Stimulation Therapy & Memory Orientation Games",
      "Gentle Behavioral Management & Emotional Reassurance",
      "Caregiver Respite & Family Counseling Support"
    ],
    startingPrice: "₹1,400 / day or Custom Monthly Package",
    responseTime: "Fast Caregiver Placement",
    coveredAreas: ["All Zirakpur Societies", "VIP Road", "Peer Muchalla", "Dhakoli"],
    recommendedFor: "Seniors with Alzheimer's, Parkinson's disease, or age-related memory decline.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 6,
    id: "nri-parent-care-zirakpur",
    title: "NRI Parent Healthcare & Dedicated Care Manager in Zirakpur",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 470,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor checkups, medicines delivery, 24/7 emergency response, and live WhatsApp updates for overseas children.",
    fullDesc: "Peace of mind for Punjabis settled in Canada, USA, UK, or Australia. Because SilverCare is based in Zirakpur, our senior care managers personally visit and oversee your parents' health daily.",
    keyFeatures: [
      "Dedicated Senior Clinical Care Manager Assigned from HQ",
      "Real-time Digital WhatsApp Health Reports & Bi-weekly Doctor Calls",
      "Doorstep Medicine Refills, Lab Tests & Hospital Escort",
      "24/7 Priority Emergency Evacuation across Zirakpur & Tricity"
    ],
    startingPrice: "Custom Monthly & Annual NRI Care Plans",
    responseTime: "Instant Global Onboarding",
    coveredAreas: ["Entire Zirakpur Area", "VIP Road", "Singhpura", "Dhakoli"],
    recommendedFor: "Aging parents residing independently in Zirakpur with adult children overseas.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 7,
    id: "home-icu-setup-zirakpur",
    title: "Home ICU Setup & Biomedical Equipment Rental in Zirakpur",
    badgeTag: "Critical Life Support",
    category: "specialized",
    rating: 4.9,
    reviewCount: 240,
    shortDesc: "Hospital-grade ICU setup at home including Ventilators, BiPAP/CPAP, 5-Function Motorized Beds, Multipara Monitors, and 24/7 Critical Care Nurses in Zirakpur.",
    fullDesc: "Delivered directly from our central Zirakpur medical warehouse! Installed by certified biomedical engineers and staffed by experienced ICU registered nurses.",
    keyFeatures: [
      "Direct Delivery from Central Zirakpur Medical Depot",
      "Motorized 3 & 5 Function Hospital ICU Beds & Ripple Mattresses",
      "High-End Invasive/Non-Invasive Ventilators & BiPAP/CPAP",
      "24/7 Critical Care ICU Registered Nurse Coverage"
    ],
    startingPrice: "Equipment rental from ₹300/day • Complete ICU setup custom",
    responseTime: "Fast Warehouse Dispatch",
    coveredAreas: ["All Zirakpur Societies", "Dhakoli", "Peer Muchalla", "Panchkula Border"],
    recommendedFor: "Critically ill patients requiring life support or post-ICU step-down recovery at home.",
    doctorSupervised: true,
    icon: Building2,
  },
  {
    rank: 8,
    id: "doorstep-lab-tests-zirakpur",
    title: "Doorstep Pathology Blood Collection & Health Checkups Zirakpur",
    badgeTag: "NABL Certified",
    category: "clinical",
    rating: 4.8,
    reviewCount: 320,
    shortDesc: "Painless home sample collection for Complete Senior Health Profiles, Diabetes, Thyroid, Lipid, KFT, LFT with digital reports in 6 hours.",
    fullDesc: "Skip traffic and clinic queues. Certified phlebotomists collect blood samples gently at your Zirakpur residence with sterile equipment and NABL-accredited processing.",
    keyFeatures: [
      "Painless Blood & Urine Sample Collection at Home",
      "Complete Senior Executive Health Package (65+ Parameters)",
      "NABL & ICMR Accredited Diagnostic Labs",
      "Digital WhatsApp & Email Report Delivery in 6 Hours"
    ],
    startingPrice: "Packages from ₹499",
    responseTime: "Morning Slots Available",
    coveredAreas: ["All Zirakpur Societies", "VIP Road", "PR7", "Dhakoli"],
    recommendedFor: "Routine diabetic monitoring, lipid profiles, and mobility-impaired elders.",
    doctorSupervised: true,
    icon: Sparkles,
  },
  {
    rank: 9,
    id: "senior-companionship-zirakpur",
    title: "Senior Daycare, Companionship & Errands Assistance Zirakpur",
    badgeTag: "Emotional Wellness",
    category: "support",
    rating: 4.8,
    reviewCount: 190,
    shortDesc: "Warm, educated companions for morning walks inside gated societies, grocery shopping on VIP Road, reading, and doctor escorts in Zirakpur.",
    fullDesc: "Combat senior isolation in high-rise apartments. Our verified companions keep elderly parents mentally engaged, active, and safe during daily outings or indoor reading.",
    keyFeatures: [
      "Accompaniment for Walks in Society Gardens & Parks",
      "Escort to Clinics, D-Mart / Supermarket & Bank Errands",
      "Mental Stimulation Games, Reading & Tech/Smartphone Assistance",
      "Empathetic Friendship & Daily Activity Assistance"
    ],
    startingPrice: "₹800 / session (4-6 Hours)",
    responseTime: "Same-Day Deployment",
    coveredAreas: ["VIP Road", "PR7 Airport Road", "Dhakoli", "Peer Muchalla"],
    recommendedFor: "Independent seniors seeking enriching social engagement and assistance with outside errands.",
    doctorSupervised: false,
    icon: Heart,
  },
  {
    rank: 10,
    id: "emergency-ambulance-zirakpur",
    title: "24/7 Priority Emergency Ambulance & Hospital Triage Zirakpur",
    badgeTag: "24/7 Emergency",
    category: "support",
    rating: 4.9,
    reviewCount: 420,
    shortDesc: "Urgent senior helpline with ALS/BLS ICU ambulances, oxygen support, and fast-track admissions across Chandigarh, Mohali, and Panchkula hospitals.",
    fullDesc: "Rapid-response emergency ambulances stationed at Zirakpur junction with quick access to Chandigarh, Mohali, and Panchkula tertiary hospitals.",
    keyFeatures: [
      "24/7 Dedicated Senior Emergency Helpline",
      "Advanced Life Support (ALS) & Basic Life Support (BLS) Ambulances",
      "Direct Highway Corridor Access to PGIMER, Fortis & Alchemist",
      "On-Board Emergency Paramedic & Critical Oxygenation"
    ],
    startingPrice: "Standard Distance Tariff",
    responseTime: "Immediate Emergency Dispatch",
    coveredAreas: ["Entire Zirakpur, Dhakoli, Peer Muchalla, Gazipur"],
    recommendedFor: "Acute medical emergencies, sudden cardiac distress, breathing difficulty, or severe falls.",
    doctorSupervised: true,
    icon: PhoneCall,
  }
];

// Zirakpur Top Gated Societies Locator Data
const ZIRAKPUR_SOCIETIES = [
  { name: "Maya Garden City / Phase 1-3", area: "VIP Road", status: "Active Care Hub", coverage: "Daily Nurse & Attendant Visits" },
  { name: "Highland Park / Terraces", area: "Patiala Highway", status: "Active Care Hub", coverage: "Home Caregivers on Standby" },
  { name: "Savitry Greens 1 & 2", area: "VIP Road", status: "Active Care Hub", coverage: "Fast Doorstep Dispatch" },
  { name: "Motiaz Royal City / Heights", area: "Ambala Highway", status: "Active Care Hub", coverage: "24/7 Live-In Caregivers" },
  { name: "Sushma Grande / Crescent", area: "PR7 Airport Road", status: "Active Care Hub", coverage: "Geriatric Physio & Nursing" },
  { name: "Green Lotus Avenue / Saksham", area: "Singhpura / Ambala Rd", status: "Headquarters Hub", coverage: "Central Management & Depot" },
  { name: "Orbit Apartments & Motia Blue Ridge", area: "VIP Road", status: "Active Care Hub", coverage: "Home Health Checkups" },
  { name: "Trident Hills & Peer Muchalla Societies", area: "Peer Muchalla", status: "Active Care Hub", coverage: "Emergency & Attendant Care" }
];

// FAQs for Zirakpur Eldercare
const ZIRAKPUR_FAQS = [
  {
    q: "Why is SilverCare rated as the best elderly healthcare service in Zirakpur?",
    a: "SilverCare is headquartered in Zirakpur at Green Lotus Avenue Complex! Because our central management, medical depot, and nurse training hubs are based here, we offer prompt same-day deployment across all VIP Road, PR7, Dhakoli, and Peer Muchalla gated societies with 100% police-verified staff."
  },
  {
    q: "How fast can a nurse reach my high-rise apartment on VIP Road or PR7 Airport Road?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with prompt availability to any society in Zirakpur, including Maya Garden, Savitry Greens, Highland Park, Motiaz, and Sushma Grande."
  },
  {
    q: "What are the rates for hiring a 24-hour home nurse in Zirakpur?",
    a: "General trained attendant care starts from ₹1,200 per day (12-hour shift) and ₹2,200 per day for 24-hour registered GNM/B.Sc nurses. Monthly customized packages with included doctor visits and physio sessions offer additional savings."
  },
  {
    q: "Do you provide special elevator and balcony safety care for high-rise apartments in Zirakpur?",
    a: "Yes! High-rise apartment living requires specialized protocols to ensure senior mobility in elevators, clubhouse accompaniment, anti-wandering measures, and rapid emergency evacuation."
  },
  {
    q: "Can SilverCare look after NRI parents living in Zirakpur while children are abroad?",
    a: "Yes! Many NRI families with parents in Zirakpur rely on SilverCare. Our local HQ care manager visits your parents, manages doctor consultations, delivers medications, and provides daily WhatsApp health logs to children in Canada, USA, UK, or Australia."
  },
  {
    q: "How fast can I get ICU medical equipment delivered to my home in Zirakpur?",
    a: "Because our central medical equipment warehouse is located in Zirakpur, motorized ICU beds, ventilators, BiPAP/CPAP machines, oxygen concentrators, and patient monitors can be delivered and set up on the same day."
  }
];

export default function ElderlyCareZirakpur() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState("In-Home Nursing Care Zirakpur");
  const [selectedSociety, setSelectedSociety] = useState(ZIRAKPUR_SOCIETIES[0]);

  // Filtered Services List
  const filteredServices = useMemo(() => {
    return TOP_ZIRAKPUR_SERVICES.filter((srv) => {
      const matchesSearch = 
        srv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.keyFeatures.some(f => f.toLowerCase().includes(searchTerm.toLowerCase())) ||
        srv.coveredAreas.some(sec => sec.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || srv.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleOpenBooking = (serviceName: string) => {
    setModalService(serviceName);
    setIsModalOpen(true);
  };

  // Structured Data Schema for Google Rich Snippets & SEO
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-zirakpur";
  const pageTitle = "Best Elderly Healthcare Services in Zirakpur (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Zirakpur. 24/7 verified in-home nursing, doctor home visits, high-rise society senior care, ICU setup & NRI parent support across VIP Road, PR7 Airport Road & Dhakoli.";

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${canonicalUrl}#organization`,
        "name": "SilverCare India - Central Headquarters & Eldercare Hub Zirakpur",
        "url": canonicalUrl,
        "logo": "https://silvercareindia.com/silvercare-logo.png",
        "image": "https://silvercareindia.com/hero-doctor.png",
        "description": pageDesc,
        "telephone": "+918001480075",
        "email": "care@silvercareindia.com",
        "priceRange": "₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Credit Card, UPI, Net Banking",
        "medicalSpecialty": "Geriatric",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "SCO 110, 1st Floor, Green Lotus Avenue Complex, Zirakpur",
          "addressLocality": "Zirakpur",
          "addressRegion": "Punjab",
          "postalCode": "140603",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "30.6425",
          "longitude": "76.8173"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "VIP Road Zirakpur" },
          { "@type": "AdministrativeArea", "name": "PR7 Airport Road Zirakpur" },
          { "@type": "AdministrativeArea", "name": "Dhakoli Zirakpur" },
          { "@type": "AdministrativeArea", "name": "Peer Muchalla Zirakpur" },
          { "@type": "AdministrativeArea", "name": "Singhpura Zirakpur" },
          { "@type": "AdministrativeArea", "name": "Maya Garden City & Sushma Square" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "1520",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": pageTitle,
        "description": pageDesc,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://silvercareindia.com/#website",
          "name": "SilverCare India",
          "url": "https://silvercareindia.com/"
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", ".hero-subtext", ".ranked-service-title"]
        }
      },
      {
        "@type": "ItemList",
        "name": "Top 10 Best Elderly Healthcare Services in Zirakpur",
        "description": "Ranked list of top-rated senior care and home health services in Zirakpur Punjab.",
        "itemListElement": TOP_ZIRAKPUR_SERVICES.map((srv, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "name": srv.title,
            "description": srv.shortDesc,
            "provider": {
              "@type": "MedicalBusiness",
              "name": "SilverCare India"
            },
            "areaServed": "Zirakpur, Punjab, India",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": srv.rating.toString(),
              "reviewCount": srv.reviewCount.toString()
            }
          }
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": ZIRAKPUR_FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://silvercareindia.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://silvercareindia.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Best Elderly Healthcare Services in Zirakpur",
            "item": canonicalUrl
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FFF7FA] font-sans text-slate-800 selection:bg-[#FF4F81] selection:text-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content="Best elderly healthcare services in Zirakpur, home nursing Zirakpur, doctor visit at home Zirakpur, VIP Road Zirakpur eldercare, PR7 Airport Road nursing, Maya Garden senior care, 24/7 caregiver Dhakoli, SilverCare Zirakpur" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="IN-PB" />
        <meta name="geo.placename" content="Zirakpur, Punjab" />
        <meta name="geo.position" content="30.6425;76.8173" />
        <meta name="ICBM" content="30.6425, 76.8173" />
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

      {/* Auto Booking Popup Modal */}
      {isModalOpen && (
        <AutoBookingModal 
          forceOpen={isModalOpen} 
          initialService={modalService} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      {/* ============================================================ */}
      {/* SECTION 1: HERO BANNER FOR ZIRAKPUR (HQ) */}
      {/* ============================================================ */}
      <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#2B0E1E] via-[#380A22] to-[#1E0915] text-white overflow-hidden">
        
        {/* Soft Ambient Rose Lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF4F81]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,79,129,0.15),transparent_50%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-pink-200/80 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} className="text-[#FF4F81]" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} className="text-[#FF4F81]" />
            <span className="text-pink-300 font-bold">Zirakpur Flagship Hub</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Hero Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Trust Badge */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-extrabold shadow-sm backdrop-blur-md">
                <Award size={16} className="text-[#FF4F81]" />
                <span>🏆 Central Headquarters & Senior Care Hub in Zirakpur</span>
              </motion.div>

              {/* Main SEO H1 Headline */}
              <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.14] tracking-tight">
                Best Elderly Healthcare Services in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F81] via-pink-300 to-amber-200">Zirakpur</span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p variants={fadeInUp} className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Headquartered at Green Lotus Avenue Complex, SilverCare provides verified home nursing, doctor visits, high-rise lift assistance & home ICU setups across VIP Road, PR7 & Dhakoli.
              </motion.p>

              {/* Verified Stats Bar */}
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 pt-2 pb-2 max-w-lg">
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#FF4F81]">1,520+</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Zirakpur Families</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-center">
                  <div className="text-xl sm:text-2xl font-black text-amber-300 flex items-center justify-center gap-1">
                    <span>5.0</span> <Star size={16} className="fill-amber-300 text-amber-300" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Google Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-center">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">24/7</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">HQ Support</div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button 
                  onClick={() => handleOpenBooking("Best Eldercare Consultation Zirakpur")}
                  className="bg-gradient-to-r from-[#FF4F81] to-[#E91E63] hover:opacity-95 text-white font-extrabold text-sm sm:text-base h-13 px-8 rounded-2xl shadow-xl shadow-[#FF4F81]/30 border-0 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Calendar size={18} className="mr-2" /> Book Home Consultation
                </Button>

                <button 
                  type="button"
                  onClick={() => handleOpenBooking("Senior Care Consultation Zirakpur")}
                  className="w-full sm:w-auto border-2 border-white/40 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm sm:text-base h-13 px-6 rounded-2xl backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <PhoneCall size={18} className="text-[#FF4F81]" /> Speak with Care Specialist
                </button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 text-xs font-bold text-pink-200/90 pt-1">
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-400" /> 100% Police Verified Staff</span>
                <span className="flex items-center gap-1.5"><Building2 size={16} className="text-emerald-400" /> Central HQ & Medical Depot</span>
                <span className="flex items-center gap-1.5"><Clock size={16} className="text-emerald-400" /> 24/7 Emergency Support</span>
              </motion.div>

            </motion.div>

            {/* Hero Right Visual Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: easeCustom }}
              className="lg:col-span-5"
            >
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-pink-500/20 text-[#FF4F81] flex items-center justify-center border border-pink-400/30">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-base">Zirakpur Flagship Hub</h3>
                      <p className="text-xs text-pink-200/80">Green Lotus Avenue Complex</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> HQ Active
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 VIP Road & Commercial Hub</span>
                    <span className="text-pink-300 font-bold">Maya Garden, Savitry, Orbit</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 PR7 Airport Ring Road</span>
                    <span className="text-pink-300 font-bold">Sushma Grande & Joynest</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 Dhakoli & Peer Muchalla</span>
                    <span className="text-pink-300 font-bold">Trident Hills & Motia Heights</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 Highway Arteries</span>
                    <span className="text-pink-300 font-bold">Patiala & Ambala Highways</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/15 text-center">
                  <p className="text-xs text-slate-300 mb-3 font-medium">Prompt caregiver dispatch across all Zirakpur societies!</p>
                  <Button 
                    onClick={() => handleOpenBooking("Fast Care Deployment Zirakpur")}
                    className="w-full bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm h-11 rounded-xl shadow-md border-0"
                  >
                    Request Fast Zirakpur Deployment →
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURE 1: GATED SOCIETY FAST DISPATCH RADAR */}
      {/* ============================================================ */}
      <section className="py-12 bg-white border-b border-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <Building2 size={14} /> Zirakpur Gated Societies Dispatch Navigator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Direct Nurse Dispatch to Major Gated Societies
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl mx-auto">
              Click your residential society below to view active local coverage and one-click dispatch from our central Zirakpur hub.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {ZIRAKPUR_SOCIETIES.map((soc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSociety(soc)}
                className={`p-3.5 rounded-2xl text-left transition-all border ${
                  selectedSociety.name === soc.name 
                    ? "bg-[#FFF0F5] border-[#FF4F81] text-[#2B0E1E] shadow-sm ring-1 ring-[#FF4F81]/40" 
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-extrabold mb-1">
                  <span className="truncate">{soc.name.split('/')[0]}</span>
                  <span className="text-[10px] text-[#E91E63] font-bold">Active</span>
                </div>
                <div className="text-[11px] text-slate-500 truncate">{soc.area}</div>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#FFF5F8] via-[#FFF0F5] to-[#FFF5F8] border border-pink-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#E91E63] bg-white px-3 py-1 rounded-full border border-pink-200 shadow-xs">
                <Zap size={14} className="text-[#FF4F81]" /> Active Hub: <strong>{selectedSociety.name}</strong>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">{selectedSociety.name} ({selectedSociety.area})</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {selectedSociety.coverage}. Pre-registered caregivers for seamless security gate and lift access.
              </p>
            </div>

            <Button
              onClick={() => handleOpenBooking(`Dispatch Caregiver to ${selectedSociety.name}`)}
              className="bg-gradient-to-r from-[#FF4F81] to-[#E91E63] text-white font-extrabold text-xs sm:text-sm h-12 px-6 rounded-xl border-0 shadow-md shadow-[#FF4F81]/25 shrink-0"
            >
              Dispatch to {selectedSociety.name.split('/')[0]} →
            </Button>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: SEARCH & FILTER RANKED SERVICES */}
      {/* ============================================================ */}
      <section className="py-6 bg-white border-b border-pink-100 sticky top-[72px] z-30 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services, societies, or clinical needs..."
                className="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF4F81] focus:bg-white transition-all"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700">
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {[
                { id: "all", label: "All Top 10 Services" },
                { id: "nursing", label: "Nursing & Attendants" },
                { id: "clinical", label: "Doctor & Post-Op" },
                { id: "rehab", label: "Physio & Rehab" },
                { id: "specialized", label: "Dementia & ICU" },
                { id: "support", label: "NRI Care & High-Rise" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all border ${
                    selectedCategory === cat.id
                      ? "bg-[#2B0E1E] text-white border-[#2B0E1E] shadow-xs"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
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
      {/* SECTION 3: TOP RANKED SERVICES SHOWCASE */}
      {/* ============================================================ */}
      <section className="py-14 sm:py-20 bg-[#FFF7FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-3">
              <Flame size={14} /> Official 2026 Rankings
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Top 10 Rated Elderly Healthcare Services in Zirakpur
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Showing verified, clinical-grade home healthcare solutions ranked by Zirakpur family ratings, headquarters response speed, and clinical quality.
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
            <div className="space-y-8 max-w-5xl mx-auto">
              {filteredServices.map((service) => {
                const IconComp = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative"
                  >
                    {/* Top Rank Banner Accent */}
                    <div className="bg-gradient-to-r from-[#2B0E1E] via-purple-900 to-[#E91E63] px-6 py-3.5 text-white flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-sm">
                          #{service.rank}
                        </span>
                        <span className="font-extrabold text-sm tracking-wide text-amber-200 uppercase flex items-center gap-1.5">
                          <Award size={16} /> {service.badgeTag}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-bold text-pink-100">
                        <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                          <Star size={14} className="fill-amber-300 text-amber-300" />
                          <strong className="text-white">{service.rating}</strong> / 5 ({service.reviewCount}+ Reviews)
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/30">
                          <ShieldCheck size={14} /> Doctor Supervised
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Service Left Details */}
                        <div className="lg:col-span-8 space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-pink-50 text-[#E91E63] flex items-center justify-center shrink-0 border border-pink-100 shadow-xs">
                              <IconComp size={24} />
                            </div>
                            <div>
                              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                                {service.title}
                              </h3>
                              <p className="text-xs font-bold text-[#E91E63] mt-0.5">
                                Response in Zirakpur: {service.responseTime}
                              </p>
                            </div>
                          </div>

                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                            {service.fullDesc}
                          </p>

                          {/* Key Features Bullet List */}
                          <div>
                            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">Key Clinical Highlights:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                              {service.keyFeatures.map((feat, idx) => (
                                <div key={idx} className="flex items-start gap-2 bg-[#FFF7FA] p-2.5 rounded-xl border border-pink-100">
                                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Covered Areas Tags */}
                          <div className="pt-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase mr-2">Covered Areas:</span>
                            <div className="inline-flex flex-wrap gap-1.5 mt-1">
                              {service.coveredAreas.map((sec, sIdx) => (
                                <span key={sIdx} className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-slate-200">
                                  📍 {sec}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Service Right Pricing & Action Box */}
                        <div className="lg:col-span-4 bg-[#FFF8FA] rounded-2xl p-5 border border-pink-100 flex flex-col justify-between h-full space-y-4">
                          <div>
                            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Estimated Pricing:</span>
                            <div className="text-base sm:text-lg font-black text-[#2B0E1E] leading-snug">
                              {service.startingPrice}
                            </div>

                            <div className="mt-4 pt-3 border-t border-pink-100 text-xs space-y-2">
                              <div className="text-slate-600">
                                <strong className="text-slate-900">Recommended for:</strong> {service.recommendedFor}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2.5 pt-2">
                            <Button
                              onClick={() => handleOpenBooking(service.title)}
                              className="w-full bg-gradient-to-r from-[#FF4F81] to-[#E91E63] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm h-11 rounded-xl shadow-md shadow-[#FF4F81]/25 border-0 transition-all hover:scale-[1.01]"
                            >
                              Book {service.title.split(' ')[0]} Care →
                            </Button>

                            <a href="tel:+918001480075" className="block">
                              <button 
                                type="button"
                                className="w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs h-10 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <PhoneCall size={14} className="text-[#E91E63]" /> Speak to Care Manager
                              </button>
                            </a>
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
      {/* SECTION 4: INTERACTIVE CARE CALCULATOR WIDGET */}
      {/* ============================================================ */}
      <section className="py-16 bg-white border-y border-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <SlidersHorizontal size={14} /> Zirakpur Plan Cost Estimator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Calculate Your Senior Care Budget in Zirakpur
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Select your required care shift duration and service type to generate an instant estimate.
            </p>
          </div>

          <CareCalculator />
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5: TRICITY SISTER CITIES INTER-LINKING GRID */}
      {/* ============================================================ */}
      <section className="py-14 bg-[#FFF7FA] border-b border-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <Building2 size={14} /> Tricity Eldercare Sister Hubs
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Explore Our Eldercare Services Across Tricity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/best-elderly-healthcare-services-chandigarh" className="p-5 rounded-2xl bg-white hover:bg-pink-50/50 border border-pink-100 text-left block transition-all hover:border-pink-300">
              <div className="text-xs font-bold text-slate-400 mb-1">📍 SISTER HUB</div>
              <h3 className="font-extrabold text-slate-900 text-base">Chandigarh</h3>
              <p className="text-xs text-slate-500 mt-1">Sectors 1-60, Capitol & VIP Belts</p>
            </Link>

            <Link to="/best-elderly-healthcare-services-mohali" className="p-5 rounded-2xl bg-white hover:bg-pink-50/50 border border-pink-100 text-left block transition-all hover:border-pink-300">
              <div className="text-xs font-bold text-slate-400 mb-1">📍 SISTER HUB</div>
              <h3 className="font-extrabold text-slate-900 text-base">Mohali (SAS Nagar)</h3>
              <p className="text-xs text-slate-500 mt-1">Phases 1-11, Aerocity & Sec 70</p>
            </Link>

            <Link to="/best-elderly-healthcare-services-panchkula" className="p-5 rounded-2xl bg-white hover:bg-pink-50/50 border border-pink-100 text-left block transition-all hover:border-pink-300">
              <div className="text-xs font-bold text-slate-400 mb-1">📍 SISTER HUB</div>
              <h3 className="font-extrabold text-slate-900 text-base">Panchkula</h3>
              <p className="text-xs text-slate-500 mt-1">Sectors 1-21, MDC & Pinjore</p>
            </Link>

            <Link to="/best-elderly-healthcare-services-zirakpur" className="p-5 rounded-2xl bg-white border-2 border-[#FF4F81] shadow-sm text-left block">
              <div className="text-xs font-black text-[#E91E63] mb-1">📍 HEADQUARTERS HUB</div>
              <h3 className="font-extrabold text-slate-900 text-base">Zirakpur</h3>
              <p className="text-xs text-slate-600 mt-1">VIP Road, Dhakoli & High-Rises</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6: FAQ ACCORDION FOR ZIRAKPUR ELDERCARE */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <HelpCircle size={14} /> Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Questions About Elderly Healthcare in Zirakpur
            </h2>
          </div>

          <div className="space-y-4">
            {ZIRAKPUR_FAQS.map((faq, index) => (
              <div 
                key={index}
                className="bg-[#FFF7FA] rounded-2xl border border-pink-100 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                  <div className={`h-8 w-8 rounded-full bg-white flex items-center justify-center shrink-0 transition-transform ${openFaq === index ? 'rotate-180 bg-pink-100 text-[#E91E63]' : 'text-slate-500'}`}>
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
                      className="border-t border-pink-100 bg-white px-5 sm:px-6 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed"
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
      {/* SECTION 7: FINAL CTA BOTTOM BANNER */}
      {/* ============================================================ */}
      <section className="py-16 bg-gradient-to-r from-[#2B0E1E] via-[#380A22] to-[#E91E63] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-pink-200 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles size={14} className="text-pink-300" /> Central HQ Care Readiness
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Give Your Loved Ones the Dignified Healthcare They Deserve in Zirakpur
          </h2>
          <p className="text-sm sm:text-base text-pink-100/90 leading-relaxed max-w-2xl mx-auto">
            Contact SilverCare headquarters today to speak directly with our Senior Clinical Care Manager and arrange a free home assessment in your society.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              type="button"
              onClick={() => handleOpenBooking("Zirakpur Final CTA")}
              className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm sm:text-base h-13 px-8 rounded-2xl shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center"
            >
              Request Free Consultation Call →
            </button>
            <button 
              type="button"
              onClick={() => handleOpenBooking("Zirakpur Quick Callback")}
              className="w-full sm:w-auto border-2 border-pink-200/50 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm sm:text-base h-13 px-8 rounded-2xl backdrop-blur-md transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <PhoneCall size={18} className="text-pink-300" /> Speak with Care Specialist
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
