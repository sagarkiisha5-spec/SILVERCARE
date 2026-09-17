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
  Hospital,
  Zap,
  Timer
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

// Interface for Ranked Eldercare Services in Mohali
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
  coveredPhases: string[];
  recommendedFor: string;
  doctorSupervised: boolean;
  icon: React.ElementType;
}

// Top 10 Best Elderly Healthcare Services in Mohali Dataset
const TOP_MOHALI_SERVICES: RankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-mohali",
    title: "24/7 Skilled Home Nursing & Attendant Care in Mohali",
    badgeTag: "#1 Choice in SAS Nagar Mohali",
    category: "nursing",
    rating: 4.9,
    reviewCount: 420,
    shortDesc: "Qualified 12-hour & 24-hour GNM/B.Sc registered nurses for post-op, bedridden, and senior daily assistance across Mohali Phases 1-11 & Aerocity.",
    fullDesc: "SilverCare is Mohali's premier home healthcare provider. Located in close proximity to Fortis & Max Hospitals Mohali, our certified nurses handle tracheostomy, catheterization, IV medications, stroke rehab, and complete bedridden care.",
    keyFeatures: [
      "24-Hour Live-In & 12-Hour Shift Qualified GNM/B.Sc Registered Nurses",
      "Comprehensive Care across Mohali Phases 1-11, Aerocity & Sector 70",
      "Specialized Post-Surgery Care (Direct Discharge Support from Fortis/Max Mohali)",
      "100% Police Verified & Background Checked Caregivers"
    ],
    startingPrice: "₹1,200 / day (Attendant) • ₹2,200 / day (Skilled Nurse)",
    responseTime: "Prompt Same-Day Deployment",
    coveredPhases: ["Mohali Phase 1-11", "Sector 68, 69, 70, 71", "Aerocity & IT City", "Sector 79, 80, 82"],
    recommendedFor: "Bedridden elders, stroke rehabilitation, post-cardiac surgery care, and chronic illness management.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 2,
    id: "doctor-home-visits-mohali",
    title: "Senior Doctor Home Visits & Health Checkups in Mohali",
    badgeTag: "Top Clinical Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 360,
    shortDesc: "Senior MBBS & MD Geriatric Physicians visiting elders at home in Mohali for routine checkups, ECG, prescription reviews, and chronic care.",
    fullDesc: "Skip crowded outpatient clinics. SilverCare doctors conduct comprehensive physical examinations, bedside ECG, oxygen saturation, diabetes & hypertension audits right in the comfort of your Mohali residence.",
    keyFeatures: [
      "Experienced Senior MD Physicians at Your Doorstep",
      "In-Home 12-Lead ECG, Blood Pressure & Vitals Assessment",
      "Medication Optimization & Polypharmacy Review",
      "Priority Referral with Fortis, Max, & Ivy Hospitals Mohali"
    ],
    startingPrice: "₹1,500 - ₹2,000 per visit",
    responseTime: "Same-Day Appointment Available",
    coveredPhases: ["Phase 1 to 11", "Sector 70, 71, 78, 79", "Aerocity & Wave Estate"],
    recommendedFor: "Elderly parents needing routine medical attention, multi-morbidity reviews, or post-hospital follow-ups.",
    doctorSupervised: true,
    icon: UserCheck,
  },
  {
    rank: 3,
    id: "post-surgery-hospital-discharge-mohali",
    title: "Hospital-to-Home Post-Surgery Transition Care",
    badgeTag: "Hospital Grade Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 310,
    shortDesc: "Specialized post-discharge nursing aligned with Fortis Mohali, Max Hospital Phase 6, and Ivy Hospital Sector 71 for fast surgical recovery.",
    fullDesc: "We take over clinical care right as you leave Fortis or Max Mohali. Our team sets up sterile wound dressing, drain management, and IV infusions at home before you arrive.",
    keyFeatures: [
      "Aseptic Surgical Wound Dressing & Suture Care",
      "Post-Cardiac Bypass & Joint Replacement Protocols",
      "Foley Catheter, Ryle's Tube & Drain Tube Management",
      "Direct Medical Updates Shared with Operating Surgeon"
    ],
    startingPrice: "₹2,500 / day (Full Clinical Care Package)",
    responseTime: "Pre-Discharge Bedside Setup",
    coveredPhases: ["All Mohali Phases", "Kharar Road", "Aerocity", "Sector 82"],
    recommendedFor: "Patients discharged after orthopedic, cardiac, oncology, or general surgeries.",
    doctorSupervised: true,
    icon: ShieldCheck,
  },
  {
    rank: 4,
    id: "physiotherapy-stroke-rehab-mohali",
    title: "Stroke Rehab & Orthopedic Physiotherapy at Home",
    badgeTag: "Fastest Recovery",
    category: "rehab",
    rating: 4.9,
    reviewCount: 380,
    shortDesc: "Certified Master of Physiotherapy (MPT) specialists delivering stroke paralysis recovery, knee replacement rehab, and gait training in Mohali.",
    fullDesc: "Bring rehabilitation clinic equipment directly to your Mohali living room. Our physiotherapists bring electrotherapy modalities (TENS/IFT/Ultrasound) and custom mobilization regimes.",
    keyFeatures: [
      "Master of Physiotherapy (MPT) Certified Specialists",
      "Post-Knee & Hip Replacement Rapid Mobilization",
      "Stroke Neuro-Rehabilitation & Balance Training",
      "Pain Management for Severe Arthritis & Sciatica"
    ],
    startingPrice: "₹800 - ₹1,200 per session • ₹18,000 / 15 sessions",
    responseTime: "Same-Day Session Available",
    coveredPhases: ["Phase 1 to 11", "Sector 68 to 82", "Aerocity & IT City"],
    recommendedFor: "Stroke survivors, post-knee replacement seniors, and elderly with mobility impairment.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 5,
    id: "dementia-alzheimers-care-mohali",
    title: "Specialized Dementia & Alzheimer's Memory Care in Mohali",
    badgeTag: "Memory Care Leader",
    category: "specialized",
    rating: 4.8,
    reviewCount: 275,
    shortDesc: "Trained memory care attendants providing cognitive stimulation, wandering prevention, and empathetic behavior management in Mohali.",
    fullDesc: "Compassionate memory care tailored to seniors suffering from Alzheimer's, vascular dementia, or Parkinson's disease. We create a structured, calming home routine.",
    keyFeatures: [
      "Cognitive Stimulation Therapy & Memory Exercises",
      "Anti-Wandering & Home Safety Protocol Setup",
      "Gentle Behavioral Management & Emotional Reassurance",
      "Caregiver Respite & Family Counseling Support"
    ],
    startingPrice: "₹1,400 / day or Customized Monthly Plan",
    responseTime: "Fast Caregiver Placement",
    coveredPhases: ["Mohali Phase 1-11", "Sector 70, 71", "Aerocity", "Wave Estate"],
    recommendedFor: "Seniors with Alzheimer's, Parkinson's disease, or age-related cognitive decline.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 6,
    id: "nri-parent-care-mohali",
    title: "NRI Parent Health Management & Concierge Care in Mohali",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 460,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor visits, lab tests, pharmacy deliveries, and sending live WhatsApp health updates to children in Canada, USA, UK.",
    fullDesc: "Peace of mind for Punjabis settled abroad. SilverCare assigns an accountable care manager in Mohali to oversee all aspects of your parents' well-being and medical routines.",
    keyFeatures: [
      "Dedicated Eldercare Companion & Clinical Manager",
      "Live WhatsApp Vitals Logs & Video Call Updates",
      "Routine Doctor Visits, Lab Tests & Medicine Delivery",
      "24/7 Priority Emergency Transport in Mohali & Tricity"
    ],
    startingPrice: "Custom Monthly & Annual Plans",
    responseTime: "Instant Global Onboarding",
    coveredPhases: ["All Mohali Phases", "Sector 68-82", "Aerocity", "IT City"],
    recommendedFor: "NRI families living in Canada, USA, UK, or Australia with aging parents in Mohali.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 7,
    id: "home-icu-setup-mohali",
    title: "Home ICU Setup & Biomedical Equipment Rental in Mohali",
    badgeTag: "Critical Life Support",
    category: "specialized",
    rating: 4.9,
    reviewCount: 230,
    shortDesc: "Hospital-grade ICU setup at home including Ventilators, BiPAP/CPAP, 5-Function Motorized Beds, Multipara Monitors, and 24/7 ICU Nurses in Mohali.",
    fullDesc: "Transform any room into a high-dependency clinical unit in Mohali. Backed by critical care nurses and biomedical engineers available for prompt delivery and setup.",
    keyFeatures: [
      "Motorized 3 & 5 Function Hospital ICU Beds",
      "Invasive/Non-Invasive Ventilators, BiPAP & CPAP Units",
      "Multipara Patient Monitors & Medical Grade Suction Units",
      "24/7 Critical Care ICU Registered Nurse Coverage"
    ],
    startingPrice: "Equipment rental from ₹300/day • Complete ICU setup custom",
    responseTime: "Fast Delivery & Setup in Mohali",
    coveredPhases: ["Mohali Phase 1-11", "Sector 70, 71, 79, 80", "Aerocity", "Kharar"],
    recommendedFor: "Critically ill patients requiring life support or post-ICU step-down care at home.",
    doctorSupervised: true,
    icon: Building2,
  },
  {
    rank: 8,
    id: "doorstep-lab-tests-mohali",
    title: "Doorstep Blood Sample Collection & Pathology in Mohali",
    badgeTag: "NABL Certified",
    category: "clinical",
    rating: 4.8,
    reviewCount: 310,
    shortDesc: "Painless home sample collection for Senior Health Profiles, Diabetes, Thyroid, Lipid, KFT, LFT with digital reports delivered in 6 hours.",
    fullDesc: "Certified phlebotomists collect blood samples gently at your Mohali home with sterile vacutainers, processed via NABL-accredited labs.",
    keyFeatures: [
      "Painless Blood & Urine Sample Collection at Home",
      "Complete Senior Executive Health Package (65+ Parameters)",
      "NABL & ICMR Accredited Diagnostic Labs",
      "Digital WhatsApp & Email Report Delivery in 6 Hours"
    ],
    startingPrice: "Packages from ₹499",
    responseTime: "Morning Slots Available",
    coveredPhases: ["All Mohali Phases", "Sector 68-82", "Aerocity", "Kharar"],
    recommendedFor: "Diabetic monitoring, routine health checkups, and seniors with mobility challenges.",
    doctorSupervised: true,
    icon: Sparkles,
  },
  {
    rank: 9,
    id: "senior-companionship-mohali",
    title: "Senior Daycare, Companionship & Errands Assistance in Mohali",
    badgeTag: "Emotional Wellness",
    category: "support",
    rating: 4.8,
    reviewCount: 180,
    shortDesc: "Warm, educated companions for morning park walks, mandir/gurdwara visits, bank errands, and engaging conversations in Mohali.",
    fullDesc: "Combat senior isolation. Our verified companions keep elderly parents mentally engaged, active, and safe during daily outings or indoor reading.",
    keyFeatures: [
      "Accompaniment for Walks in Mohali Silvi Park & Gurdwara Amb Sahib",
      "Escort to Hospitals, Clinics & Grocery/Bank Errands",
      "Mental Stimulation Games, Reading & Tech/Smartphone Guidance",
      "Empathetic Friendship & Daily Activity Support"
    ],
    startingPrice: "₹800 / session (4-6 Hours)",
    responseTime: "Same-Day Deployment",
    coveredPhases: ["Phase 1 to 11", "Sector 70, 71", "Aerocity", "Wave Estate"],
    recommendedFor: "Independent seniors seeking emotional companionship, errand support, or social wellness.",
    doctorSupervised: false,
    icon: Heart,
  },
  {
    rank: 10,
    id: "emergency-ambulance-mohali",
    title: "24/7 Priority Emergency Ambulance & Hospital Triage Mohali",
    badgeTag: "24/7 Emergency",
    category: "support",
    rating: 4.9,
    reviewCount: 390,
    shortDesc: "Urgent senior helpline with ALS/BLS ICU ambulances, oxygen support, and fast-track admissions to Fortis, Max, or Ivy Hospital Mohali.",
    fullDesc: "Rapid-response emergency ambulances equipped with defibrillators, oxygen, paramedics, and seamless hospital triage in SAS Nagar Mohali.",
    keyFeatures: [
      "24/7 Dedicated Senior Emergency Helpline",
      "Advanced Life Support (ALS) & Basic Life Support (BLS) Ambulances",
      "Fast-Track Admission into Fortis, Max, and Ivy Mohali",
      "On-Board Paramedic & Critical Oxygenation Support"
    ],
    startingPrice: "Standard Distance Tariff",
    responseTime: "Immediate Emergency Dispatch",
    coveredPhases: ["All Mohali Phases", "Sector 68-82", "Aerocity", "Kharar Road"],
    recommendedFor: "Acute medical emergencies, sudden cardiac symptoms, breathing difficulty, or severe falls.",
    doctorSupervised: true,
    icon: PhoneCall,
  }
];

// Mohali Hospital Bridge Data
const MOHALI_HOSPITALS = [
  { name: "Fortis Hospital Mohali (Sector 62)", status: "Active Coordination", desc: "Direct discharge transfer & post-cardiac CABG / stent recovery." },
  { name: "Max Super Speciality (Phase 6)", status: "Active Coordination", desc: "Specialized neuro, orthopedic, and oncology home step-down care." },
  { name: "Ivy Hospital (Sector 71)", status: "Active Coordination", desc: "Post-surgical care, catheterization, and ICU step-down nursing." },
  { name: "Sohana Multi-Speciality Hospital", status: "Active Coordination", desc: "Geriatric post-op care and daily nurse attendant placement." }
];

// Mohali Daily Schedule Protocol
const MOHALI_CARE_PROTOCOL = [
  { time: "07:30 AM", title: "Morning Vitals & Blood Glucose Check", desc: "NIBP, Pulse, SpO2 logging and pre-breakfast medication administration." },
  { time: "09:30 AM", title: "Aseptic Hygiene & Bed Bath / Dressing", desc: "Surgical wound dressing, stoma/catheter flush, and comfortable oral hygiene." },
  { time: "11:30 AM", title: "Geriatric Physiotherapy & Mobilization", desc: "Passive/active range-of-motion exercises, gait training, and electrotherapy." },
  { time: "02:00 PM", title: "Nutritional Support & Midday Rest", desc: "Ryle's tube feeding / oral meal assistance and vitals re-check." },
  { time: "05:00 PM", title: "Cognitive Therapy & Mind Games", desc: "Memory stimulation, park walks, and emotional interaction." },
  { time: "08:30 PM", title: "Night Vitals & Daily WhatsApp Family Log", desc: "Evening medications, digital chart upload to family, and night monitoring." }
];

// FAQs for Mohali Eldercare
const MOHALI_FAQS = [
  {
    q: "Why is SilverCare rated as the best elderly healthcare service in Mohali (SAS Nagar)?",
    a: "SilverCare is Mohali's #1 eldercare choice due to our 100% police-verified nursing staff, close proximity to Fortis and Max Hospitals for immediate hospital step-down care, comprehensive coverage across Phases 1-11 & Aerocity, and dedicated care managers for Punjabi NRI families living abroad."
  },
  {
    q: "How quickly can SilverCare send a nurse to my home in Mohali?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with prompt same-day availability anywhere in Mohali Phases 1-11, Sector 68 to 82, Aerocity, and Wave Estate. For patients getting discharged from Fortis or Max Mohali, we arrange the bedside care setup in advance."
  },
  {
    q: "What is the daily cost of a 24-hour home nurse in Mohali?",
    a: "Attendant daily rates start from ₹1,200 for a 12-hour shift and ₹2,200 for 24-hour registered GNM/B.Sc nurse care. Affordable monthly packages with inclusive doctor consultations and physio sessions are also available."
  },
  {
    q: "Can SilverCare handle post-surgery recovery after heart or knee surgery in Mohali?",
    a: "Yes. Our nurses are specially trained for post-CABG cardiac monitoring, surgical drain care, sterile wound dressings, catheterization, and knee/hip replacement mobility in coordination with your treating surgeon."
  },
  {
    q: "Does SilverCare offer care for NRI parents in Mohali whose children live in Canada/USA?",
    a: "Yes! A large percentage of our Mohali families are NRIs. We assign a dedicated Clinical Care Manager who coordinates doctor visits, medicine deliveries, emergency hospital runs, and sends daily WhatsApp vitals reports to children living abroad."
  },
  {
    q: "Can I get ICU medical equipment like a ventilator or motorized bed on rent in Mohali?",
    a: "Yes. SilverCare provides same-day delivery of ICU beds, ventilators, BiPAP/CPAP, oxygen concentrators, and cardiac monitors across all Mohali phases and sectors, supported by 24/7 biomedical technicians."
  }
];

export default function ElderlyCareMohali() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState("In-Home Nursing Care Mohali");
  const [selectedHospital, setSelectedHospital] = useState(MOHALI_HOSPITALS[0]);

  // Filtered Services List
  const filteredServices = useMemo(() => {
    return TOP_MOHALI_SERVICES.filter((srv) => {
      const matchesSearch = 
        srv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.keyFeatures.some(f => f.toLowerCase().includes(searchTerm.toLowerCase())) ||
        srv.coveredPhases.some(ph => ph.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || srv.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleOpenBooking = (serviceName: string) => {
    setModalService(serviceName);
    setIsModalOpen(true);
  };

  // Structured Data Schema for Google Rich Snippets & SEO
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-mohali";
  const pageTitle = "Best Elderly Healthcare Services in Mohali (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Mohali (SAS Nagar). 24/7 verified in-home nursing, doctor home visits, Fortis/Max Hospital post-discharge care, ICU setup & NRI elder support across Phases 1-11 & Sectors 68-82.";

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${canonicalUrl}#organization`,
        "name": "SilverCare India - Eldercare Services Mohali",
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
          "streetAddress": "Phase 7 & Sector 70 Hub, SAS Nagar",
          "addressLocality": "Mohali",
          "addressRegion": "Punjab",
          "postalCode": "160055",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "30.7046",
          "longitude": "76.7179"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Mohali Phase 1-11" },
          { "@type": "AdministrativeArea", "name": "Sector 68-82 Mohali" },
          { "@type": "AdministrativeArea", "name": "Aerocity Mohali" },
          { "@type": "AdministrativeArea", "name": "IT City Mohali" },
          { "@type": "AdministrativeArea", "name": "Kharar & Landran" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1340",
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
        "name": "Top 10 Best Elderly Healthcare Services in Mohali",
        "description": "Ranked list of top-rated senior care and home health services in Mohali SAS Nagar.",
        "itemListElement": TOP_MOHALI_SERVICES.map((srv, index) => ({
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
            "areaServed": "Mohali, Punjab, India",
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
        "mainEntity": MOHALI_FAQS.map((faq) => ({
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
            "name": "Best Elderly Healthcare Services in Mohali",
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
        <meta name="keywords" content="Best elderly healthcare services in Mohali, home nursing Mohali, doctor visit at home Mohali, Fortis hospital discharge care Mohali, Max hospital home nursing Mohali, NRI parent care Mohali, 24/7 caregiver SAS Nagar, physiotherapy Mohali, SilverCare" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="IN-PB" />
        <meta name="geo.placename" content="Mohali, SAS Nagar, Punjab" />
        <meta name="geo.position" content="30.7046;76.7179" />
        <meta name="ICBM" content="30.7046, 76.7179" />
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
      {/* SECTION 1: HERO BANNER FOR MOHALI */}
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
            <span className="text-pink-300 font-bold">Mohali Senior Care</span>
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
                <span>🏆 Top-Ranked Senior Healthcare Provider in Mohali (SAS Nagar)</span>
              </motion.div>

              {/* Main SEO H1 Headline */}
              <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.14] tracking-tight">
                Best Elderly Healthcare Services in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F81] via-pink-300 to-amber-200">Mohali</span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p variants={fadeInUp} className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                SilverCare provides hospital-standard 24/7 home nursing, senior MD doctor visits, post-discharge recovery from Fortis/Max Mohali & NRI parent management across Phases 1-11, Aerocity & Sector 68-82.
              </motion.p>

              {/* Verified Stats Bar */}
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 pt-2 pb-2 max-w-lg">
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#FF4F81]">1,340+</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Mohali Seniors Cared</div>
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
                  onClick={() => handleOpenBooking("Best Eldercare Consultation Mohali")}
                  className="bg-gradient-to-r from-[#FF4F81] to-[#E91E63] hover:opacity-95 text-white font-extrabold text-sm sm:text-base h-13 px-8 rounded-2xl shadow-xl shadow-[#FF4F81]/30 border-0 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Calendar size={18} className="mr-2" /> Book Home Consultation
                </Button>

                <button 
                  type="button"
                  onClick={() => handleOpenBooking("Senior Care Consultation Mohali")}
                  className="w-full sm:w-auto border-2 border-white/40 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm sm:text-base h-13 px-6 rounded-2xl backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <PhoneCall size={18} className="text-[#FF4F81]" /> Speak with Care Specialist
                </button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 text-xs font-bold text-pink-200/90 pt-1">
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-400" /> 100% Police Verified Staff</span>
                <span className="flex items-center gap-1.5"><Hospital size={16} className="text-emerald-400" /> Fortis & Max Transition Desk</span>
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
                      <h3 className="font-extrabold text-white text-base">Mohali Coverage Hub</h3>
                      <p className="text-xs text-pink-200/80">Phases 1-11 & Aerocity</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Active Hub
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 Core Phases</span>
                    <span className="text-pink-300 font-bold">Phase 1, 2, 3B2, 5, 7, 9, 10, 11</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 Sectors & Commercial Hub</span>
                    <span className="text-pink-300 font-bold">Sector 68, 69, 70, 71, 79, 80</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 Aerocity & IT Corridor</span>
                    <span className="text-pink-300 font-bold">Aerocity, IT City, Wave Estate</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 Hospital Proximity</span>
                    <span className="text-pink-300 font-bold">Fortis, Max, Ivy & Sohana</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/15 text-center">
                  <p className="text-xs text-slate-300 mb-3 font-medium">Need medical nurse deployment in Mohali?</p>
                  <Button 
                    onClick={() => handleOpenBooking("Fast Care Deployment Mohali")}
                    className="w-full bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm h-11 rounded-xl shadow-md border-0"
                  >
                    Request Fast Mohali Deployment →
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURE 1: HOSPITAL DISCHARGE FAST-TRACK DESK */}
      {/* ============================================================ */}
      <section className="py-12 bg-white border-b border-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <Hospital size={14} /> Mohali Hospital Discharge Transition Desk
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Seamless Hospital-to-Home Step-Down Care
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl mx-auto">
              Our clinical care coordinators align directly with discharge teams at top Mohali tertiary hospitals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {MOHALI_HOSPITALS.map((hosp, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedHospital(hosp)}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  selectedHospital.name === hosp.name 
                    ? "bg-[#FFF0F5] border-[#FF4F81] text-[#2B0E1E] shadow-sm ring-1 ring-[#FF4F81]/40" 
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-extrabold mb-1">
                  <span className="truncate">{hosp.name.split(' ')[0]} {hosp.name.split(' ')[1]}</span>
                  <span className="text-[10px] text-[#E91E63] font-bold">Active</span>
                </div>
                <div className="text-[11px] text-slate-500 truncate">{hosp.name}</div>
              </button>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#FFF5F8] via-[#FFF0F5] to-[#FFF5F8] border border-pink-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#E91E63] bg-white px-3 py-1 rounded-full border border-pink-200 shadow-xs">
                <Zap size={14} className="text-[#FF4F81]" /> Direct Coordination: <strong>{selectedHospital.name}</strong>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">{selectedHospital.name} Step-Down Desk</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {selectedHospital.desc} We deliver sterile setup and nurse arrival before patient discharge.
              </p>
            </div>

            <Button
              onClick={() => handleOpenBooking(`Hospital Discharge Transition from ${selectedHospital.name}`)}
              className="bg-gradient-to-r from-[#FF4F81] to-[#E91E63] text-white font-extrabold text-xs sm:text-sm h-12 px-6 rounded-xl border-0 shadow-md shadow-[#FF4F81]/25 shrink-0"
            >
              Book Discharge Coordination →
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
                placeholder="Search services, phases, or clinical needs..."
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
      {/* SECTION 3: TOP RANKED SERVICES SHOWCASE */}
      {/* ============================================================ */}
      <section className="py-14 sm:py-20 bg-[#FFF7FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-3">
              <Flame size={14} /> Official 2026 Rankings
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Top 10 Rated Elderly Healthcare Services in Mohali
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Showing verified, clinical-grade home healthcare solutions ranked by Mohali family ratings, hospital transition standards, and speed of care.
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
                                Response in Mohali: {service.responseTime}
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

                          {/* Phases Coverage Tags */}
                          <div className="pt-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase mr-2">Covered Zones:</span>
                            <div className="inline-flex flex-wrap gap-1.5 mt-1">
                              {service.coveredPhases.map((sec, sIdx) => (
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
      {/* FEATURE 2: 24-HOUR CAREGIVER PROTOCOL TIMELINE */}
      {/* ============================================================ */}
      <section className="py-16 bg-white border-y border-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <Timer size={14} /> 24-Hour Clinical Day Protocol
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              A Typical Day of SilverCare In-Home Nursing
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl mx-auto">
              Our structured 6-point clinical milestone schedule guarantees your parents receive compassionate, disciplined medical care throughout the day and night.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOHALI_CARE_PROTOCOL.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#FFF7FA] border border-pink-100 flex items-start gap-4 shadow-xs">
                <span className="px-2.5 py-1 rounded-lg bg-[#FF4F81] text-white font-black text-xs shrink-0 mt-0.5">
                  {step.time}
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{step.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: INTERACTIVE CARE CALCULATOR WIDGET */}
      {/* ============================================================ */}
      <section className="py-16 bg-[#FFF7FA] border-b border-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <SlidersHorizontal size={14} /> Mohali Plan Cost Estimator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Calculate Your Senior Care Budget in Mohali
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
      <section className="py-14 bg-white border-b border-pink-100">
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

            <Link to="/best-elderly-healthcare-services-mohali" className="p-5 rounded-2xl bg-white border-2 border-[#FF4F81] shadow-sm text-left block">
              <div className="text-xs font-black text-[#E91E63] mb-1">📍 CURRENT HUB</div>
              <h3 className="font-extrabold text-slate-900 text-base">Mohali (SAS Nagar)</h3>
              <p className="text-xs text-slate-600 mt-1">Phases 1-11, Aerocity & Sec 70</p>
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
      {/* SECTION 6: FAQ ACCORDION FOR MOHALI ELDERCARE */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-[#FFF7FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <HelpCircle size={14} /> Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Questions About Elderly Healthcare in Mohali
            </h2>
          </div>

          <div className="space-y-4">
            {MOHALI_FAQS.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-pink-100 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                  <div className={`h-8 w-8 rounded-full bg-[#FFF7FA] flex items-center justify-center shrink-0 transition-transform ${openFaq === index ? 'rotate-180 bg-pink-100 text-[#E91E63]' : 'text-slate-500'}`}>
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
                      className="border-t border-pink-100 bg-[#FFF7FA]/50 px-5 sm:px-6 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed"
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
            Give Your Loved Ones the Dignified Healthcare They Deserve in Mohali
          </h2>
          <p className="text-sm sm:text-base text-pink-100/90 leading-relaxed max-w-2xl mx-auto">
            Contact SilverCare today to speak directly with our Senior Clinical Care Manager and arrange a free home assessment anywhere in Mohali SAS Nagar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              type="button"
              onClick={() => handleOpenBooking("Mohali Final CTA")}
              className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm sm:text-base h-13 px-8 rounded-2xl shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center"
            >
              Request Free Consultation Call →
            </button>
            <button 
              type="button"
              onClick={() => handleOpenBooking("Mohali Quick Callback")}
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
