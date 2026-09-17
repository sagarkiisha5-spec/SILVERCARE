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

// Interface for Ranked Eldercare Services in Chandigarh
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

// Top 10 Best Elderly Healthcare Services in Chandigarh Dataset
const TOP_CHANDIGARH_SERVICES: RankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care",
    title: "24/7 Skilled In-Home Nursing & Attendant Care",
    badgeTag: "#1 Choice in Chandigarh",
    category: "nursing",
    rating: 4.9,
    reviewCount: 480,
    shortDesc: "Comprehensive 12-hour and 24-hour live-in registered nurses (GNM/B.Sc) and trained geriatric caregivers for seniors.",
    fullDesc: "SilverCare provides Chandigarh's top-rated in-home nursing care. Certified GNM and B.Sc nurses specialize in bedridden care, post-stroke recovery, tracheostomy care, catheterization, aseptic wound dressing, and IV infusions under doctor supervision.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM/B.Sc Registered Nurses",
      "Vitals Logging, Medication Management & Sugar/BP Monitoring",
      "Tracheostomy, Feeding Tube (Ryle's Tube) & Catheter Care",
      "Guaranteed 24-Hour Caregiver Replacement across Chandigarh"
    ],
    startingPrice: "₹1,200 / day (Attendant) • ₹2,200 / day (Skilled Nurse)",
    responseTime: "Prompt Same-Day Deployment",
    coveredSectors: ["Sectors 1-60", "Mohali Phase 1-11", "Panchkula Sectors 1-20", "Zirakpur"],
    recommendedFor: "Bedridden seniors, post-surgical recovery, chronic illness, and elderly mobility assistance.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 2,
    id: "doctor-visit-at-home",
    title: "Senior Physician Doorstep Visits & Geriatric Audits",
    badgeTag: "Top Clinical Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 395,
    shortDesc: "Experienced MBBS & MD Physicians visiting your residence in Chandigarh for thorough geriatric consultations and prescription setups.",
    fullDesc: "Eliminate stressful hospital waiting rooms. Our experienced physicians conduct thorough in-home physical examinations, portable 12-lead ECGs, medicine audits, and personalized care planning across all Chandigarh sectors.",
    keyFeatures: [
      "Senior MD Physicians with PGIMER & GMCH-32 Clinical Background",
      "Doorstep 12-Lead ECG, Blood Pressure & O2 Saturation Checks",
      "Medication Optimization & Polypharmacy Review",
      "Fast-Track Admission Coordination with Top Tricity Hospitals"
    ],
    startingPrice: "₹1,500 - ₹2,000 per consultation",
    responseTime: "Same-Day Appointment Available",
    coveredSectors: ["Sector 1-60", "Sector 8, 9, 10, 11, 15", "Sector 33, 34, 35, 44"],
    recommendedFor: "Elderly with mobility challenges, chronic disease management, multi-morbidity, and routine preventative reviews.",
    doctorSupervised: true,
    icon: UserCheck,
  },
  {
    rank: 3,
    id: "dementia-alzheimers-care",
    title: "Specialized Dementia & Alzheimer's Memory Care",
    badgeTag: "Memory Care Leader",
    category: "specialized",
    rating: 4.8,
    reviewCount: 310,
    shortDesc: "Compassionate memory care attendants certified in cognitive stimulation, wandering prevention, and empathetic behavior therapy.",
    fullDesc: "Managing Alzheimer's and dementia requires structured routines and gentle empathy. SilverCare memory caregivers help Chandigarh seniors maintain daily independence, engage in mental stimulation, and prevent disorientation.",
    keyFeatures: [
      "Cognitive Stimulation Therapy & Memory Orientation Games",
      "Home Safety & Anti-Wandering Security Protocols",
      "Empathetic Behavioral Management & Sleep Regularization",
      "Family Counseling & Caregiver Respite Solutions"
    ],
    startingPrice: "₹1,400 / day or Custom Monthly Package",
    responseTime: "Fast Caregiver Placement",
    coveredSectors: ["All Chandigarh Sectors", "Mohali", "Panchkula MDC"],
    recommendedFor: "Seniors with Alzheimer's disease, Vascular Dementia, Parkinson's, or memory decline.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 4,
    id: "physiotherapy-at-home",
    title: "Geriatric Physiotherapy & Neuro-Rehabilitation",
    badgeTag: "Fastest Recovery",
    category: "rehab",
    rating: 4.9,
    reviewCount: 420,
    shortDesc: "Licensed Master of Physiotherapy (MPT) practitioners delivering stroke rehab, knee/hip surgery mobilization, and balance therapy at home.",
    fullDesc: "Restore confident mobility and independence. SilverCare physiotherapists bring electrotherapy modalities (TENS/IFT/Ultrasound), parallel balance trainers, and manual therapies directly into your Chandigarh home.",
    keyFeatures: [
      "Certified MPT Physiotherapists Specialized in Geriatric Rehab",
      "Post Total Knee/Hip Replacement Mobilization Programs",
      "Stroke Neuro-Rehabilitation & Fall Prevention Gait Training",
      "Portable Electrotherapy Equipment Included"
    ],
    startingPrice: "₹800 - ₹1,200 per session • ₹18,000 / 15 sessions",
    responseTime: "Same-Day Session Booking",
    coveredSectors: ["Sectors 8, 9, 10, 11, 15", "Sectors 33, 34, 35, 44", "All Tricity"],
    recommendedFor: "Post-op joint surgeries, stroke recovery, Parkinson's mobility, arthritis, and fall rehabilitation.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 5,
    id: "post-operative-cardiac-care",
    title: "Post-Hospitalization & Cardiac Recovery Care",
    badgeTag: "Hospital Grade Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 290,
    shortDesc: "Seamless transition from PGIMER, Fortis, or Max Mohali to home with sterile surgical wound dressing, drain management, and vitals monitoring.",
    fullDesc: "Prevent hospital re-admissions. SilverCare establishes a sterile, hospital-standard recovery environment at your residence with ICU-trained nurses, infection prevention protocols, and continuous doctor supervision.",
    keyFeatures: [
      "Aseptic Surgical Dressing & Post-CABG Vitals Tracking",
      "Drain Tube, Foley Catheter & Stoma Management",
      "IV Infusion Administration & Medication Timelines",
      "Daily Doctor Review & Clinical Discharge Liaison"
    ],
    startingPrice: "₹2,500 / day (Full Clinical Package)",
    responseTime: "Pre-Discharge Bedside Setup",
    coveredSectors: ["Greater Chandigarh", "Mohali", "Panchkula", "Zirakpur"],
    recommendedFor: "Patients discharged after cardiac bypass (CABG), orthopedic surgeries, oncology, or intensive care.",
    doctorSupervised: true,
    icon: ShieldCheck,
  },
  {
    rank: 6,
    id: "nri-parent-care",
    title: "NRI Parent Health Management & Dedicated Care Concierge",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 510,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor appointments, medicine deliveries, emergency response, and live WhatsApp updates for overseas children.",
    fullDesc: "Peace of mind across ocean boundaries. Designed for NRIs residing in Canada, USA, UK, and Australia, SilverCare provides a single accountable care manager to oversee your parents' health, nutrition, and daily safety in Chandigarh.",
    keyFeatures: [
      "Dedicated Senior Clinical Care Manager Assigned to Parents",
      "Real-time Digital WhatsApp Health Reports & Bi-weekly Doctor Calls",
      "Doorstep Medicine Refills, Lab Tests & Hospital Escorts",
      "24/7 Priority Emergency Evacuation & Admission Desk"
    ],
    startingPrice: "Custom Monthly & Annual Plans",
    responseTime: "Instant Global Onboarding",
    coveredSectors: ["Chandigarh Sectors 1-60", "Mohali", "Panchkula"],
    recommendedFor: "Aging parents living independently in Chandigarh while children reside overseas.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 7,
    id: "icu-setup-medical-equipment",
    title: "Home ICU Setup & Biomedical Equipment Rental",
    badgeTag: "Critical Care",
    category: "specialized",
    rating: 4.9,
    reviewCount: 260,
    shortDesc: "Complete hospital-grade ICU setup at home including Ventilators, BiPAP/CPAP, 5-Function Motorized Beds, Multipara Monitors, and Critical Care Nurses.",
    fullDesc: "Deliver hospital-level intensive care at home. Our biomedical engineering team installs certified ICU equipment with immediate availability, backed by registered critical care nurses.",
    keyFeatures: [
      "High-End Invasive/Non-Invasive Ventilators & BiPAP/CPAP",
      "5-Function Motorized Hospital ICU Beds & Air Mattresses",
      "5-Lead Multipara Cardiac Monitors & Suction Units",
      "24/7 Critical Care (ICU) Registered Nurse Staffing"
    ],
    startingPrice: "Equipment from ₹300/day • Complete ICU setup custom",
    responseTime: "Fast Equipment Delivery & Setup",
    coveredSectors: ["Entire Chandigarh Tricity Region"],
    recommendedFor: "Critically ill seniors, ventilator-dependent patients, and palliative home care.",
    doctorSupervised: true,
    icon: Building2,
  },
  {
    rank: 8,
    id: "senior-companionship-daycare",
    title: "Senior Companionship, Daycare & Social Well-being",
    badgeTag: "Emotional Wellness",
    category: "support",
    rating: 4.8,
    reviewCount: 195,
    shortDesc: "Educated, compassionate senior companions for morning walks in Sukhna Lake/Rose Garden, reading, clinic escorts, and lively conversation.",
    fullDesc: "Eliminate loneliness and maintain active social vitality. Our verified companions assist with outings, mandir/gurdwara visits, digital tech guidance, and daily hobbies.",
    keyFeatures: [
      "Accompaniment to Sukhna Lake, Rose Garden & Community Centers",
      "Medical & Bank Appointment Escort Services",
      "Mind Fitness, Book Reading, and Tech/Smartphone Assistance",
      "Empathetic Friendship & Daily Activity Assistance"
    ],
    startingPrice: "₹800 / session (4-6 Hours)",
    responseTime: "Same-Day Deployment",
    coveredSectors: ["Chandigarh Sectors 8, 9, 10, 11, 15, 18, 33, 34, 35, 44"],
    recommendedFor: "Independent seniors seeking enriching social engagement and assistance with outside errands.",
    doctorSupervised: false,
    icon: Heart,
  },
  {
    rank: 9,
    id: "pathology-diagnostics-home",
    title: "Doorstep Phlebotomy & NABL Lab Diagnostics",
    badgeTag: "NABL Certified",
    category: "clinical",
    rating: 4.8,
    reviewCount: 340,
    shortDesc: "Painless home sample collection for 65+ senior executive health parameters with accurate digital reports delivered within 6 hours.",
    fullDesc: "Skip diagnostic center queues. Certified phlebotomists collect blood and urine samples gently at your doorstep and process them in NABL & ICMR accredited laboratories.",
    keyFeatures: [
      "100% Sterile, Painless Blood & Urine Sample Collection",
      "Comprehensive Senior Wellness Profiles (Sugar, Lipid, KFT, LFT, CBC, Thyroid)",
      "Digital WhatsApp & Email Report Delivery in 6 Hours",
      "Free Doctor Tele-Consultation on Lab Findings"
    ],
    startingPrice: "Packages from ₹499 • Routine Tests Standard Rates",
    responseTime: "Morning Home Slots Available",
    coveredSectors: ["All Chandigarh Sectors", "Mohali", "Panchkula", "Zirakpur"],
    recommendedFor: "Diabetic monitoring, routine health screening, and mobility-impaired elders.",
    doctorSupervised: true,
    icon: Sparkles,
  },
  {
    rank: 10,
    id: "emergency-eldercare-ambulance",
    title: "24/7 Priority Emergency Ambulance & Hospital Triage",
    badgeTag: "24/7 Emergency",
    category: "support",
    rating: 4.9,
    reviewCount: 430,
    shortDesc: "Dedicated senior emergency SOS helpline with ALS/BLS ICU ambulances, oxygen support, and fast-track admission to PGIMER, GMCH-32, and Fortis.",
    fullDesc: "When emergencies strike, every second is precious. SilverCare provides rapid-response ICU ambulances equipped with defibrillators, oxygen, paramedics, and guaranteed hospital triage.",
    keyFeatures: [
      "24/7 Dedicated Senior Emergency SOS Helpline",
      "Advanced Cardiac Life Support (ACLS) Ambulances",
      "Direct Admission Coordination with PGIMER, GMCH 32, Fortis",
      "On-Board Emergency Paramedic & Critical Oxygenation"
    ],
    startingPrice: "Standard Distance Tariff",
    responseTime: "Immediate Emergency Dispatch",
    coveredSectors: ["Entire Chandigarh & Tricity Region"],
    recommendedFor: "Sudden breathing difficulty, cardiac distress, acute fall trauma, or stroke symptoms.",
    doctorSupervised: true,
    icon: PhoneCall,
  }
];

// Chandigarh Sector Navigator Data
const CHANDIGARH_SECTOR_HUBS = [
  { name: "Sector 8 & 9 (VIP Belt)", status: "Active Sector Hub", coverage: "Daily Nurse & Attendant Coverage" },
  { name: "Sector 10 & 11 (North Zone)", status: "Active Sector Hub", coverage: "Home Caregivers on Standby" },
  { name: "Sector 15 & 16 (Near GMCH)", status: "Priority Medical Hub", coverage: "Fast Hospital Discharge Support" },
  { name: "Sector 17 & 22 (City Center)", status: "Active Sector Hub", coverage: "Doctor & Nursing Visits" },
  { name: "Sector 33, 34 & 35 (South Zone)", status: "Priority Care Hub", coverage: "24/7 Live-In Caregivers" },
  { name: "Sector 44, 45 & 46 (South-East)", status: "Active Sector Hub", coverage: "Geriatric Physio & Nursing" },
  { name: "Manimajra & IT Park", status: "Active Sector Hub", coverage: "Home Health Checkups" },
  { name: "Mohali Border Sectors (48-60)", status: "Tricity Connector Hub", coverage: "Rapid Dispatch & ICU Care" }
];

// FAQs for Chandigarh Eldercare
const CHANDIGARH_FAQS = [
  {
    q: "Why is SilverCare rated as the best elderly healthcare service in Chandigarh?",
    a: "SilverCare is the leading eldercare provider in Chandigarh due to our 100% background-checked & police-verified nursing staff, direct clinical doctor supervision for every senior, comprehensive coverage across all sectors, and dedicated care managers for NRI families living abroad. We provide 12h/24h skilled nursing with a guaranteed 24-hour caregiver replacement."
  },
  {
    q: "How quickly can SilverCare deploy a nurse or attendant to my sector in Chandigarh?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with same-day prompt availability across Sectors 1-60, Mohali, and Panchkula. For post-hospital discharges from PGIMER, GMCH-32, or Fortis, our team coordinates with the hospital to set up equipment and care staff before the patient reaches home."
  },
  {
    q: "What are the charges for hiring a 24-hour home nurse in Chandigarh?",
    a: "SilverCare offers transparent and personalized care plans based on patient dependency, clinical needs, and duration. Our care managers provide a complete custom plan following a clinical assessment."
  },
  {
    q: "How does SilverCare support NRI children living in Canada, USA, UK, or Australia?",
    a: "SilverCare assigns a dedicated Senior Clinical Care Manager who coordinates regular physician checkups, doorstep medicine delivery, emergency transport, and sends real-time WhatsApp vitals updates and audio-video briefings directly to family members overseas."
  },
  {
    q: "Can SilverCare set up a full ICU with ventilator support at home in Chandigarh?",
    a: "Yes. SilverCare provides hospital-grade ICU setups at home in Chandigarh, including motorized ICU beds, mechanical ventilators, BiPAP/CPAP, multipara cardiac monitors, suction units, oxygen concentrators, and 24/7 critical care ICU registered nurses."
  },
  {
    q: "Are SilverCare doctors affiliated with local Chandigarh hospitals?",
    a: "Our visiting doctors and clinical directors have extensive medical experience across top North Indian tertiary centers including PGIMER Chandigarh, GMCH Sector 32, Fortis Mohali, and Max Super Speciality Hospital, ensuring seamless coordination and fast-track admissions if needed."
  }
];

export default function ElderlyCareChandigarh() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState("In-Home Nursing Care Chandigarh");
  const [selectedHub, setSelectedHub] = useState(CHANDIGARH_SECTOR_HUBS[0]);

  // Filtered Services List
  const filteredServices = useMemo(() => {
    return TOP_CHANDIGARH_SERVICES.filter((srv) => {
      const matchesSearch = 
        srv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.keyFeatures.some(f => f.toLowerCase().includes(searchTerm.toLowerCase())) ||
        srv.coveredSectors.some(sec => sec.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || srv.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleOpenBooking = (serviceName: string) => {
    setModalService(serviceName);
    setIsModalOpen(true);
  };

  // Structured Data Schema for Google Rich Snippets & SEO
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-chandigarh";
  const pageTitle = "Best Elderly Healthcare Services in Chandigarh (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Chandigarh. 24/7 verified in-home nursing, senior MD doctor home visits, NRI parent care, dementia support, bedridden patient attendants & ICU setup across Sectors 1-60.";

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${canonicalUrl}#organization`,
        "name": "SilverCare India - Eldercare Services Chandigarh",
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
          "streetAddress": "Sector 17 & Sector 35 Hub, Chandigarh",
          "addressLocality": "Chandigarh",
          "addressRegion": "Chandigarh UT",
          "postalCode": "160017",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "30.7333",
          "longitude": "76.7794"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Chandigarh Sectors 1-60" },
          { "@type": "AdministrativeArea", "name": "Sector 1-30 VIP Zone Chandigarh" },
          { "@type": "AdministrativeArea", "name": "Sector 31-60 South Chandigarh" },
          { "@type": "AdministrativeArea", "name": "Mohali" },
          { "@type": "AdministrativeArea", "name": "Panchkula" },
          { "@type": "AdministrativeArea", "name": "Zirakpur" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1480",
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
        "name": "Top 10 Best Elderly Healthcare Services in Chandigarh",
        "description": "Ranked list of top-rated senior care and home health services in Chandigarh.",
        "itemListElement": TOP_CHANDIGARH_SERVICES.map((srv, index) => ({
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
            "areaServed": "Chandigarh, India",
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
        "mainEntity": CHANDIGARH_FAQS.map((faq) => ({
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
            "name": "Best Elderly Healthcare Services in Chandigarh",
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
        <meta name="keywords" content="Best elderly healthcare services in Chandigarh, top senior care Chandigarh, 24/7 home nursing Chandigarh, doctor visit at home Chandigarh, NRI parent care Chandigarh, dementia care Chandigarh, geriatric physiotherapy Chandigarh, ICU setup home Chandigarh, bedridden senior care Chandigarh, SilverCare" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="IN-CH" />
        <meta name="geo.placename" content="Chandigarh, Sector 1-60" />
        <meta name="geo.position" content="30.7333;76.7794" />
        <meta name="ICBM" content="30.7333, 76.7794" />
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
      {/* SECTION 1: HERO BANNER (SilverCare Luxury Plum & Rose Glow) */}
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
            <span className="text-pink-300 font-bold">Chandigarh Senior Care</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Hero Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Trust Pill */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-extrabold shadow-sm backdrop-blur-md">
                <Award size={16} className="text-[#FF4F81]" />
                <span>🏆 Top-Ranked Senior Healthcare Provider in Chandigarh</span>
              </motion.div>

              {/* Main SEO H1 Headline */}
              <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.14] tracking-tight">
                Best Elderly Healthcare Services in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F81] via-pink-300 to-amber-200">Chandigarh</span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p variants={fadeInUp} className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                SilverCare brings hospital-standard 24/7 home nursing, senior MD doctor visits, NRI parent management & intensive rehabilitation directly to senior citizens across Chandigarh Sectors 1-60, Mohali & Panchkula.
              </motion.p>

              {/* Verified Statistics Bar */}
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 pt-2 pb-2 max-w-lg">
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#FF4F81]">1,500+</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Chandigarh Families</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-center">
                  <div className="text-xl sm:text-2xl font-black text-amber-300 flex items-center justify-center gap-1">
                    <span>4.9</span> <Star size={16} className="fill-amber-300 text-amber-300" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Google Rating</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-center">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">24/7</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Clinical Support</div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button 
                  onClick={() => handleOpenBooking("Best Eldercare Consultation Chandigarh")}
                  className="bg-gradient-to-r from-[#FF4F81] to-[#E91E63] hover:opacity-95 text-white font-extrabold text-sm sm:text-base h-13 px-8 rounded-2xl shadow-xl shadow-[#FF4F81]/30 border-0 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Calendar size={18} className="mr-2" /> Book Home Consultation
                </Button>

                <button 
                  type="button"
                  onClick={() => handleOpenBooking("Senior Care Consultation Chandigarh")}
                  className="w-full sm:w-auto border-2 border-white/40 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm sm:text-base h-13 px-6 rounded-2xl backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <PhoneCall size={18} className="text-[#FF4F81]" /> Speak with Care Specialist
                </button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 text-xs font-bold text-pink-200/90 pt-1">
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-400" /> 100% Police Verified Staff</span>
                <span className="flex items-center gap-1.5"><Stethoscope size={16} className="text-emerald-400" /> MD Doctor Supervised</span>
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
                      <h3 className="font-extrabold text-white text-base">Chandigarh Coverage Hub</h3>
                      <p className="text-xs text-pink-200/80">Sectors 1 to 60 & Tricity</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Active Hub
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 Chandigarh North & VIP Belt</span>
                    <span className="text-pink-300 font-bold">Sec 8, 9, 10, 11 & Capitol</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 Central & South Chandigarh</span>
                    <span className="text-pink-300 font-bold">Sec 17, 34, 35, 44 & 45</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 Tertiary Hospital Links</span>
                    <span className="text-pink-300 font-bold">PGIMER, GMCH-32, Fortis</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 Sister City Coverage</span>
                    <span className="text-pink-300 font-bold">Mohali & Panchkula</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/15 text-center">
                  <p className="text-xs text-slate-300 mb-3 font-medium">Need medical nurse deployment for an elderly parent?</p>
                  <Button 
                    onClick={() => handleOpenBooking("Fast Care Deployment Chandigarh")}
                    className="w-full bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm h-11 rounded-xl shadow-md border-0"
                  >
                    Request Fast Chandigarh Deployment →
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURE 1: SECTOR AVAILABILITY & COVERAGE NAVIGATOR */}
      {/* ============================================================ */}
      <section className="py-12 bg-white border-b border-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <Compass size={14} /> Chandigarh Sector Coverage Navigator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Select Your Chandigarh Sector Zone
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl mx-auto">
              Click your sector zone below to view active local caregiver coverage and one-click assistance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {CHANDIGARH_SECTOR_HUBS.map((hub, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedHub(hub)}
                className={`p-3.5 rounded-2xl text-left transition-all border ${
                  selectedHub.name === hub.name 
                    ? "bg-[#FFF0F5] border-[#FF4F81] text-[#2B0E1E] shadow-sm ring-1 ring-[#FF4F81]/40" 
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-extrabold mb-1">
                  <span>{hub.name.split(' ')[0]} {hub.name.split(' ')[1]}</span>
                  <span className="text-[10px] text-[#E91E63] font-bold">Active</span>
                </div>
                <div className="text-[11px] text-slate-500 truncate">{hub.name}</div>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#FFF5F8] via-[#FFF0F5] to-[#FFF5F8] border border-pink-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#E91E63] bg-white px-3 py-1 rounded-full border border-pink-200 shadow-xs">
                <Zap size={14} className="text-[#FF4F81]" /> Active Hub: <strong>{selectedHub.name}</strong>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">{selectedHub.name} Sector Hub</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {selectedHub.coverage}. Skilled nurses equipped with vitals monitoring, catheter care, and post-op support.
              </p>
            </div>

            <Button
              onClick={() => handleOpenBooking(`Dispatch Nurse to ${selectedHub.name}`)}
              className="bg-gradient-to-r from-[#FF4F81] to-[#E91E63] text-white font-extrabold text-xs sm:text-sm h-12 px-6 rounded-xl border-0 shadow-md shadow-[#FF4F81]/25 shrink-0"
            >
              Request Care in {selectedHub.name.split(' ')[0]} →
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
                placeholder="Search services, sectors, or clinical needs..."
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
                { id: "support", label: "NRI Care & Support" },
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
      {/* SECTION 3: TOP RANKED RESULTS SHOWCASE */}
      {/* ============================================================ */}
      <section className="py-14 sm:py-20 bg-[#FFF7FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-3">
              <Flame size={14} /> Official 2026 Rankings
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Top 10 Rated Elderly Healthcare Services in Chandigarh
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Showing verified, clinical-grade home healthcare solutions ranked by Chandigarh family ratings, clinical quality, and rapid response standards.
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
                                Response in Chandigarh: {service.responseTime}
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

                          {/* Sector Coverage Tags */}
                          <div className="pt-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase mr-2">Covered Sectors:</span>
                            <div className="inline-flex flex-wrap gap-1.5 mt-1">
                              {service.coveredSectors.map((sec, sIdx) => (
                                <span key={sIdx} className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-slate-200">
                                  📍 {sec}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Service Right Action Box */}
                        <div className="lg:col-span-4 bg-[#FFF8FA] rounded-2xl p-5 border border-pink-100 flex flex-col justify-between h-full space-y-4">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#E91E63] text-[11px] font-extrabold mb-3">
                              <ShieldCheck size={13} /> Verified Senior Care
                            </div>

                            <div className="text-xs space-y-2">
                              <div className="text-slate-600 leading-relaxed">
                                <strong className="text-slate-900 font-bold">Recommended for:</strong> {service.recommendedFor}
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
      {/* FEATURE 2: NRI FAMILY LIVE VITALS PORTAL SIMULATOR */}
      {/* ============================================================ */}
      <section className="py-16 bg-white border-y border-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <Globe size={14} /> NRI Overseas Family Health Bridge
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Live Health Tracking for Children in USA, Canada, UK & Australia
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl mx-auto">
              How our dedicated Chandigarh Clinical Care Managers keep overseas children 100% informed with zero timezone friction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#FFF7FA] border border-pink-100 space-y-3 shadow-xs">
              <div className="h-10 w-10 rounded-xl bg-pink-100 text-[#E91E63] flex items-center justify-center font-black">1</div>
              <h3 className="font-extrabold text-slate-900 text-base">Dedicated Care Manager</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A single senior doctor-led care manager in Chandigarh handles all doctor visits, medicines, nutrition, and personal errands.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFF7FA] border border-pink-100 space-y-3 shadow-xs">
              <div className="h-10 w-10 rounded-xl bg-pink-100 text-[#E91E63] flex items-center justify-center font-black">2</div>
              <h3 className="font-extrabold text-slate-900 text-base">WhatsApp Vitals Dashboard</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive instant daily logs of BP, sugar, pulse, food intake, and nurse notes directly on your personal phone across any timezone.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFF7FA] border border-pink-100 space-y-3 shadow-xs">
              <div className="h-10 w-10 rounded-xl bg-pink-100 text-[#E91E63] flex items-center justify-center font-black">3</div>
              <h3 className="font-extrabold text-slate-900 text-base">24/7 Priority Hospital Escort</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In case of emergency, our team arranges immediate ambulance transport to PGIMER, Fortis, or Max with bedside admission support.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button 
              onClick={() => handleOpenBooking("NRI Parent Care Plan")}
              className="bg-gradient-to-r from-[#FF4F81] to-[#E91E63] text-white font-extrabold text-sm h-12 px-8 rounded-xl border-0 shadow-md shadow-[#FF4F81]/25"
            >
              Consult with NRI Care Specialist →
            </Button>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURE 3: COMPARISON MATRIX */}
      {/* ============================================================ */}
      <section className="py-16 bg-[#FFF7FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <Award size={14} /> Quality Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Why SilverCare Outperforms Unverified Bureau Agencies
            </h2>
          </div>

          <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-pink-100 bg-[#FFF0F5] text-slate-900">
                  <th className="p-4 sm:p-5 font-black">Service Feature</th>
                  <th className="p-4 sm:p-5 font-black text-[#E91E63]">SilverCare Certified Care</th>
                  <th className="p-4 sm:p-5 font-bold text-slate-400">Local Bureau / Freelancers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Police Verification</td>
                  <td className="p-4 sm:p-5 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCheck size={16} /> 100% Police Verified Staff</td>
                  <td className="p-4 sm:p-5 text-red-500 flex items-center gap-1.5"><X size={15} /> Often Unverified</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Doctor Supervision</td>
                  <td className="p-4 sm:p-5 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCheck size={16} /> MD Physician Supervised</td>
                  <td className="p-4 sm:p-5 text-red-500 flex items-center gap-1.5"><X size={15} /> No Medical Oversight</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Caregiver Replacement</td>
                  <td className="p-4 sm:p-5 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCheck size={16} /> Guaranteed within 24 Hours</td>
                  <td className="p-4 sm:p-5 text-red-500 flex items-center gap-1.5"><X size={15} /> Days of delay or ghosting</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">Emergency Support</td>
                  <td className="p-4 sm:p-5 text-emerald-600 font-bold flex items-center gap-1.5"><CheckCheck size={16} /> 24/7 Red Alert SOS Helpline</td>
                  <td className="p-4 sm:p-5 text-red-500 flex items-center gap-1.5"><X size={15} /> No Emergency Backup</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: INTERACTIVE CARE CALCULATOR WIDGET */}
      {/* ============================================================ */}
      <section className="py-16 bg-white border-y border-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <SlidersHorizontal size={14} /> Chandigarh Plan Cost Estimator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Calculate Your Senior Care Budget in Chandigarh
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
            <Link to="/best-elderly-healthcare-services-chandigarh" className="p-5 rounded-2xl bg-white border-2 border-[#FF4F81] shadow-sm text-left block">
              <div className="text-xs font-black text-[#E91E63] mb-1">📍 CURRENT HUB</div>
              <h3 className="font-extrabold text-slate-900 text-base">Chandigarh</h3>
              <p className="text-xs text-slate-600 mt-1">Sectors 1-60, Capitol & VIP Belts</p>
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

            <Link to="/best-elderly-healthcare-services-zirakpur" className="p-5 rounded-2xl bg-white hover:bg-pink-50/50 border border-pink-100 text-left block transition-all hover:border-pink-300">
              <div className="text-xs font-bold text-slate-400 mb-1">📍 HEADQUARTERS HUB</div>
              <h3 className="font-extrabold text-slate-900 text-base">Zirakpur</h3>
              <p className="text-xs text-slate-500 mt-1">VIP Road, Dhakoli & High-Rises</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6: FAQ ACCORDION FOR CHANDIGARH ELDERCARE */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <HelpCircle size={14} /> Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Questions About Elderly Healthcare in Chandigarh
            </h2>
          </div>

          <div className="space-y-4">
            {CHANDIGARH_FAQS.map((faq, index) => (
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
            <Sparkles size={14} className="text-pink-300" /> Immediate Care Readiness
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Give Your Loved Ones the Dignified Healthcare They Deserve in Chandigarh
          </h2>
          <p className="text-sm sm:text-base text-pink-100/90 leading-relaxed max-w-2xl mx-auto">
            Contact SilverCare today to speak directly with a Senior Clinical Care Manager and arrange a free home assessment anywhere in Chandigarh.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              type="button"
              onClick={() => handleOpenBooking("Chandigarh Final CTA")}
              className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm sm:text-base h-13 px-8 rounded-2xl shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center"
            >
              Request Free Consultation Call →
            </button>
            <button 
              type="button"
              onClick={() => handleOpenBooking("Chandigarh Quick Callback")}
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
