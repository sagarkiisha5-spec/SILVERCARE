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
  Medal,
  AlertTriangle
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

// Interface for Ranked Eldercare Services in Panchkula
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

// Top 10 Best Elderly Healthcare Services in Panchkula Dataset
const TOP_PANCHKULA_SERVICES: RankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-panchkula",
    title: "24/7 Skilled Home Nursing & Attendant Care in Panchkula",
    badgeTag: "#1 Choice in Panchkula",
    category: "nursing",
    rating: 4.9,
    reviewCount: 390,
    shortDesc: "Comprehensive 12-hour & 24-hour GNM/B.Sc registered nurses for bedridden, post-op, and senior daily living assistance in Panchkula Sectors 1-21 & MDC.",
    fullDesc: "SilverCare is Panchkula's premier home healthcare provider. Our qualified GNM and B.Sc nurses specialize in bedridden patient care, tracheostomy care, catheterization, wound dressing, IV medications, and stroke rehabilitation across all Panchkula sectors.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM/B.Sc Registered Nurses",
      "Comprehensive Care across Panchkula Sectors 1-21, MDC Swastik Vihar & Kalka",
      "Specialized Post-Surgery Care (Direct Discharge Support from Command & Alchemist Hospitals)",
      "100% Police Verified & Background Checked Caregivers"
    ],
    startingPrice: "₹1,200 / day (Attendant) • ₹2,200 / day (Skilled Nurse)",
    responseTime: "Prompt Same-Day Deployment",
    coveredSectors: ["Panchkula Sectors 1-21", "MDC Swastik Vihar", "Mansa Devi Complex", "Pinjore & Kalka"],
    recommendedFor: "Bedridden seniors, post-surgical recovery, chronic illness, and elderly mobility assistance.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 2,
    id: "doctor-home-visits-panchkula",
    title: "Senior Physician & Geriatric Doctor Home Visits in Panchkula",
    badgeTag: "Top Clinical Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 340,
    shortDesc: "Senior MD & MBBS Physicians visiting homes across Panchkula for routine health exams, bedside ECG, prescription optimization, and chronic disease audits.",
    fullDesc: "No more waiting in hospital queues for your elderly parents. SilverCare doctors conduct comprehensive doorstep checkups, portable 12-lead ECGs, blood pressure audits, and geriatric management across Panchkula.",
    keyFeatures: [
      "Experienced Senior MD Physicians with Tertiary Hospital Background",
      "At-Home 12-Lead ECG, Blood Pressure & Pulse Oximetry Diagnostics",
      "Medication Review & Reduction of Adverse Drug Interactions",
      "Direct Admission Coordination with Alchemist & Paras Hospitals Panchkula"
    ],
    startingPrice: "₹1,500 - ₹2,000 per consultation",
    responseTime: "Same-Day Appointment Available",
    coveredSectors: ["Sector 1 to 21", "MDC Sector 4, 5, 6", "Sec 8 & 10", "Sector 20"],
    recommendedFor: "Elderly with hypertension, diabetes, arthritis, multi-morbidity, and routine geriatric checkups.",
    doctorSupervised: true,
    icon: UserCheck,
  },
  {
    rank: 3,
    id: "veteran-defense-care-panchkula",
    title: "Veteran & Senior Defense Officer Dedicated Care",
    badgeTag: "Defense & Veteran Protocol",
    category: "support",
    rating: 5.0,
    reviewCount: 410,
    shortDesc: "Specialized healthcare tailored for retired armed forces officers, veterans, and civil services families in Panchkula & Chandimandir.",
    fullDesc: "Panchkula is home to distinguished defense veterans. SilverCare provides disciplined, compassionate caregivers who assist with medication schedules, mobility, clinic escorts to Command Hospital, and daily companionship.",
    keyFeatures: [
      "Disciplined, Background-Verified Healthcare Protocols",
      "Seamless Medical Appointment Escort to Command Hospital & Alchemist",
      "Daily Vitals Recording, Physical Fitness & Mobility Guidance",
      "Priority Care Manager for Retired Officers & Senior Citizens"
    ],
    startingPrice: "Custom Monthly Care Plans",
    responseTime: "Fast Caregiver Placement",
    coveredSectors: ["Chandimandir Cantt", "Sector 2, 4, 6, 8, 9", "MDC Swastik Vihar"],
    recommendedFor: "Retired defense personnel, civil officers, and independent elderly couples seeking respectful assistance.",
    doctorSupervised: true,
    icon: Medal,
  },
  {
    rank: 4,
    id: "physiotherapy-stroke-rehab-panchkula",
    title: "Senior Physiotherapy, Joint Replacement Rehab & Fall Recovery",
    badgeTag: "Fastest Recovery",
    category: "rehab",
    rating: 4.9,
    reviewCount: 360,
    shortDesc: "Licensed Master of Physiotherapy (MPT) practitioners delivering stroke rehab, knee/hip replacement recovery, and balance training at home in Panchkula.",
    fullDesc: "Restore confident walking and eliminate chronic pain. Our certified physiotherapists bring advanced electrotherapy modalities (TENS/IFT/Ultrasound), parallel balance trainers, and manual therapy to your Panchkula residence.",
    keyFeatures: [
      "Master of Physiotherapy (MPT) Certified Practitioners",
      "Post-Knee & Hip Replacement Rapid Mobilization Programs",
      "Stroke Neuro-Rehabilitation & Fall Prevention Gait Training",
      "Pain Relief Therapy for Spondylosis, Sciatica & Arthritis"
    ],
    startingPrice: "₹800 - ₹1,200 per session • ₹18,000 / 15 sessions",
    responseTime: "Same-Day Session Booking",
    coveredSectors: ["Sectors 1-21", "MDC Panchkula", "Pinjore & Kalka"],
    recommendedFor: "Post-op joint surgery recovery, stroke rehabilitation, arthritis, and fall recovery.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 5,
    id: "dementia-alzheimers-care-panchkula",
    title: "Specialized Dementia, Alzheimer's & Memory Care in Panchkula",
    badgeTag: "Memory Care Leader",
    category: "specialized",
    rating: 4.8,
    reviewCount: 260,
    shortDesc: "Compassionate memory care specialists certified in cognitive stimulation, anti-wandering protocols, and dementia behavioral management.",
    fullDesc: "Managing dementia requires gentle empathy and structured daily routines. SilverCare's trained memory attendants help Panchkula seniors stay engaged, calm, and safe in familiar home surroundings.",
    keyFeatures: [
      "Memory Stimulation Exercises & Reminiscence Therapy",
      "Anti-Wandering & Home Safety Hazard Audits",
      "Gentle Behavioral Management & Emotional Reassurance",
      "Family Counseling & Caregiver Respite Solutions"
    ],
    startingPrice: "₹1,400 / day or Custom Monthly Package",
    responseTime: "Fast Caregiver Placement",
    coveredSectors: ["All Panchkula Sectors", "MDC Swastik Vihar", "Sector 20"],
    recommendedFor: "Seniors with Alzheimer's disease, Vascular Dementia, Parkinson's, or memory decline.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 6,
    id: "nri-parent-care-panchkula",
    title: "NRI Parent Healthcare & Dedicated Care Manager in Panchkula",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 440,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor checkups, medicines delivery, 24/7 emergency response, and live WhatsApp updates for overseas children.",
    fullDesc: "Peace of mind for children living in Canada, USA, UK, or Australia. SilverCare provides a single accountable care manager in Panchkula to oversee your parents' health, nutrition, and emergency safety.",
    keyFeatures: [
      "Dedicated Senior Clinical Care Manager Assigned to Parents",
      "Real-time Digital WhatsApp Health Reports & Bi-weekly Doctor Reviews",
      "Doorstep Medicine Refills, Lab Tests & Hospital Escort",
      "24/7 Priority Emergency Transport in Panchkula & Tricity"
    ],
    startingPrice: "Custom Monthly & Annual NRI Care Plans",
    responseTime: "Instant Global Onboarding",
    coveredSectors: ["Panchkula Sectors 1-21", "MDC Swastik Vihar", "Sector 20"],
    recommendedFor: "Aging parents residing independently in Panchkula with adult children overseas.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 7,
    id: "home-icu-setup-panchkula",
    title: "Home ICU Setup & Medical Equipment Rental in Panchkula",
    badgeTag: "Critical Life Support",
    category: "specialized",
    rating: 4.9,
    reviewCount: 210,
    shortDesc: "Hospital-grade ICU setup at home including Ventilators, BiPAP/CPAP, 5-Function Motorized Beds, Multipara Monitors, and 24/7 Critical Care Nurses in Panchkula.",
    fullDesc: "Transform any room into a high-dependency clinical unit in Panchkula. Delivered and installed with same-day readiness by certified biomedical technicians, backed by experienced ICU registered nurses.",
    keyFeatures: [
      "Motorized 3 & 5 Function Hospital ICU Beds & Air Mattresses",
      "Invasive/Non-Invasive Ventilators, BiPAP & CPAP Units",
      "Multipara Patient Monitors & Medical Grade Suction Units",
      "24/7 Critical Care ICU Registered Nurse Coverage"
    ],
    startingPrice: "Equipment rental from ₹300/day • Complete ICU setup custom",
    responseTime: "Fast Delivery & Setup in Panchkula",
    coveredSectors: ["All Panchkula Sectors", "MDC", "Pinjore", "Kalka"],
    recommendedFor: "Critically ill patients requiring life support or post-ICU step-down recovery at home.",
    doctorSupervised: true,
    icon: Building2,
  },
  {
    rank: 8,
    id: "doorstep-lab-tests-panchkula",
    title: "Doorstep Pathology Blood Collection & Health Checkups Panchkula",
    badgeTag: "NABL Certified",
    category: "clinical",
    rating: 4.8,
    reviewCount: 290,
    shortDesc: "Painless home sample collection for Complete Senior Health Profiles, Diabetes, Thyroid, Lipid, KFT, LFT with digital reports in 6 hours.",
    fullDesc: "Skip diagnostic clinic visits. Certified phlebotomists collect blood samples gently at your Panchkula residence with sterile equipment and NABL-accredited processing.",
    keyFeatures: [
      "Painless Blood & Urine Sample Collection at Home",
      "Complete Senior Executive Health Package (65+ Parameters)",
      "NABL & ICMR Accredited Diagnostic Labs",
      "Digital WhatsApp & Email Report Delivery in 6 Hours"
    ],
    startingPrice: "Packages from ₹499",
    responseTime: "Morning Slots Available",
    coveredSectors: ["All Panchkula Sectors", "MDC", "Pinjore", "Kalka"],
    recommendedFor: "Routine diabetic monitoring, lipid profiles, and mobility-impaired elders.",
    doctorSupervised: true,
    icon: Sparkles,
  },
  {
    rank: 9,
    id: "senior-companionship-panchkula",
    title: "Senior Daycare, Companionship & Errands Assistance Panchkula",
    badgeTag: "Emotional Wellness",
    category: "support",
    rating: 4.8,
    reviewCount: 170,
    shortDesc: "Cultured, educated companions for morning walks in Cactus Garden / Town Park, Mansa Devi temple visits, reading, and doctor escorts in Panchkula.",
    fullDesc: "Combat senior loneliness and stay socially vibrant. Our verified companions assist with outings, mandir visits, bank/grocery errands, and joyful daily conversations.",
    keyFeatures: [
      "Accompaniment for Walks in Town Park & Cactus Garden Panchkula",
      "Escort to Clinics, Mansa Devi Temple & Bank Errands",
      "Mental Stimulation Games, Reading & Tech/Smartphone Assistance",
      "Empathetic Friendship & Daily Activity Assistance"
    ],
    startingPrice: "₹800 / session (4-6 Hours)",
    responseTime: "Same-Day Deployment",
    coveredSectors: ["Sectors 1 to 21", "MDC Swastik Vihar", "Sector 20"],
    recommendedFor: "Independent seniors seeking enriching social engagement and assistance with outside errands.",
    doctorSupervised: false,
    icon: Heart,
  },
  {
    rank: 10,
    id: "emergency-ambulance-panchkula",
    title: "24/7 Priority Emergency Ambulance & Hospital Triage Panchkula",
    badgeTag: "24/7 Emergency",
    category: "support",
    rating: 4.9,
    reviewCount: 380,
    shortDesc: "Urgent senior helpline with ALS/BLS ICU ambulances, oxygen support, and fast-track admissions to Alchemist, Paras, or Command Hospital Panchkula.",
    fullDesc: "Rapid-response emergency ambulances equipped with defibrillators, oxygen, paramedics, and seamless hospital triage in Panchkula & Chandimandir.",
    keyFeatures: [
      "24/7 Dedicated Senior Emergency Helpline",
      "Advanced Life Support (ALS) & Basic Life Support (BLS) Ambulances",
      "Fast-Track Admission Protocols with Alchemist & Paras Hospitals",
      "On-Board Emergency Paramedic & Critical Oxygenation"
    ],
    startingPrice: "Standard Distance Tariff",
    responseTime: "Immediate Emergency Dispatch",
    coveredSectors: ["Entire Panchkula District & Chandimandir"],
    recommendedFor: "Acute medical emergencies, sudden cardiac symptoms, breathing difficulty, or severe falls.",
    doctorSupervised: true,
    icon: PhoneCall,
  }
];

// Panchkula Fall Risk Questions
const FALL_RISK_QUESTIONS = [
  { q: "Has your elderly loved one experienced a slip or fall in the last 6 months?", key: "pastFall" },
  { q: "Do they require assistance or a walking stick/walker to stand up or walk?", key: "mobilityAid" },
  { q: "Do they take 4 or more daily medications for BP, diabetes, or sleep?", key: "medications" },
  { q: "Do they feel dizzy when getting out of bed or have poor bathroom grip?", key: "bathroomRisk" }
];

// FAQs for Panchkula Eldercare
const PANCHKULA_FAQS = [
  {
    q: "Why is SilverCare rated as the best elderly healthcare service in Panchkula?",
    a: "SilverCare is the #1 rated provider in Panchkula due to our 100% police-verified nursing staff, specialized veteran & senior officer protocols, coverage across Sectors 1-21 and MDC, direct hospital coordination with Alchemist & Command Hospital, and dedicated care managers for NRI families."
  },
  {
    q: "How quickly can SilverCare deploy a nurse or caregiver to my sector in Panchkula?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with prompt same-day availability across Panchkula Sectors 1 to 21, MDC Swastik Vihar, Mansa Devi Complex, and Pinjore-Kalka."
  },
  {
    q: "What is the cost of hiring a 24-hour home nurse in Panchkula?",
    a: "Attendant care starts from ₹1,200 per day (12-hour shift) and ₹2,200 per day for 24-hour registered GNM/B.Sc nurses. Affordable monthly packages with doctor visits and physio sessions are also available."
  },
  {
    q: "Do you have special care plans for retired defense officers & veterans in Panchkula?",
    a: "Yes! Panchkula has a prominent defense community. We provide disciplined, respectful care attendants experienced in escorting elders to Command Hospital Chandimandir and administering structured health regimes."
  },
  {
    q: "Can SilverCare assist NRI parents living alone in Panchkula?",
    a: "Yes. SilverCare specializes in NRI parent care in Panchkula. We assign a dedicated Clinical Care Manager who handles routine doctor visits, medicine delivery, regular health vitals monitoring, and sends digital WhatsApp updates to children living abroad."
  },
  {
    q: "Can I get ICU medical equipment like a ventilator or motorized bed delivered to Panchkula?",
    a: "Yes. SilverCare provides same-day delivery of ICU beds, ventilators, BiPAP/CPAP, oxygen concentrators, and multipara monitors across all Panchkula sectors, supported by 24/7 biomedical engineers."
  }
];

export default function ElderlyCarePanchkula() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState("In-Home Nursing Care Panchkula");
  
  // Fall Risk Assessment State
  const [fallAnswers, setFallAnswers] = useState<{ [key: string]: boolean }>({});
  const [assessmentResult, setAssessmentResult] = useState<string | null>(null);

  const handleToggleAnswer = (key: string) => {
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
    return TOP_PANCHKULA_SERVICES.filter((srv) => {
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
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-panchkula";
  const pageTitle = "Best Elderly Healthcare Services in Panchkula (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Panchkula. 24/7 verified in-home nursing, doctor home visits, veteran senior care, Alchemist/Paras hospital transition, ICU setups & NRI parent care in Sectors 1-21 & MDC.";

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${canonicalUrl}#organization`,
        "name": "SilverCare India - Eldercare Services Panchkula",
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
          "streetAddress": "Sector 11 & MDC Hub, Panchkula",
          "addressLocality": "Panchkula",
          "addressRegion": "Haryana",
          "postalCode": "134109",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "30.6942",
          "longitude": "76.8606"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Panchkula Sectors 1-21" },
          { "@type": "AdministrativeArea", "name": "MDC Swastik Vihar Panchkula" },
          { "@type": "AdministrativeArea", "name": "Mansa Devi Complex" },
          { "@type": "AdministrativeArea", "name": "Sector 20 Panchkula" },
          { "@type": "AdministrativeArea", "name": "Pinjore & Kalka" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1280",
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
        "name": "Top 10 Best Elderly Healthcare Services in Panchkula",
        "description": "Ranked list of top-rated senior care and home health services in Panchkula Haryana.",
        "itemListElement": TOP_PANCHKULA_SERVICES.map((srv, index) => ({
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
            "areaServed": "Panchkula, Haryana, India",
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
        "mainEntity": PANCHKULA_FAQS.map((faq) => ({
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
            "name": "Best Elderly Healthcare Services in Panchkula",
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
        <meta name="keywords" content="Best elderly healthcare services in Panchkula, home nursing Panchkula, doctor visit at home Panchkula, veteran eldercare Panchkula, Alchemist hospital discharge Panchkula, Command hospital senior care Panchkula, 24/7 caregiver MDC Panchkula, SilverCare" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="IN-HR" />
        <meta name="geo.placename" content="Panchkula, Haryana" />
        <meta name="geo.position" content="30.6942;76.8606" />
        <meta name="ICBM" content="30.6942, 76.8606" />
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
      {/* SECTION 1: HERO BANNER FOR PANCHKULA */}
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
            <span className="text-pink-300 font-bold">Panchkula Senior Care</span>
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
                <span>🏆 Top-Ranked Senior Healthcare Provider in Panchkula</span>
              </motion.div>

              {/* Main SEO H1 Headline */}
              <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.14] tracking-tight">
                Best Elderly Healthcare Services in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F81] via-pink-300 to-amber-200">Panchkula</span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p variants={fadeInUp} className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                SilverCare brings hospital-standard 24/7 home nursing, senior MD doctor visits, veteran & officer care protocols & NRI parent concierge across Panchkula Sectors 1-21, MDC Swastik Vihar & Mansa Devi Complex.
              </motion.p>

              {/* Verified Stats Bar */}
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 pt-2 pb-2 max-w-lg">
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-center">
                  <div className="text-xl sm:text-2xl font-black text-[#FF4F81]">1,280+</div>
                  <div className="text-[11px] font-bold text-slate-200 mt-0.5">Panchkula Seniors Cared</div>
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
                  onClick={() => handleOpenBooking("Best Eldercare Consultation Panchkula")}
                  className="bg-gradient-to-r from-[#FF4F81] to-[#E91E63] hover:opacity-95 text-white font-extrabold text-sm sm:text-base h-13 px-8 rounded-2xl shadow-xl shadow-[#FF4F81]/30 border-0 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Calendar size={18} className="mr-2" /> Book Home Consultation
                </Button>

                <button 
                  type="button"
                  onClick={() => handleOpenBooking("Senior Care Consultation Panchkula")}
                  className="w-full sm:w-auto border-2 border-white/40 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm sm:text-base h-13 px-6 rounded-2xl backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <PhoneCall size={18} className="text-[#FF4F81]" /> Speak with Care Specialist
                </button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 text-xs font-bold text-pink-200/90 pt-1">
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-emerald-400" /> 100% Police Verified Staff</span>
                <span className="flex items-center gap-1.5"><Medal size={16} className="text-emerald-400" /> Veteran & Defense Protocol</span>
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
                      <h3 className="font-extrabold text-white text-base">Panchkula Hub Coverage</h3>
                      <p className="text-xs text-pink-200/80">Sectors 1-21 & MDC</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Active Hub
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 MDC & Mansa Devi Complex</span>
                    <span className="text-pink-300 font-bold">MDC Sectors 4, 5, 6 & Swastik</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 Core Panchkula Sectors</span>
                    <span className="text-pink-300 font-bold">Sec 2, 4, 6, 8, 9, 10, 11, 12, 14</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 High-Density & Extension</span>
                    <span className="text-pink-300 font-bold">Sector 20, 21 & Pinjore Road</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-200 font-semibold">📍 Tertiary Healthcare Links</span>
                    <span className="text-pink-300 font-bold">Command Hosp, Alchemist, Paras</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/15 text-center">
                  <p className="text-xs text-slate-300 mb-3 font-medium">Need medical nurse deployment in Panchkula?</p>
                  <Button 
                    onClick={() => handleOpenBooking("Fast Care Deployment Panchkula")}
                    className="w-full bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm h-11 rounded-xl shadow-md border-0"
                  >
                    Request Fast Panchkula Deployment →
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURE 1: GERIATRIC FALL-RISK & SAFETY AUDIT */}
      {/* ============================================================ */}
      <section className="py-12 bg-white border-b border-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <AlertTriangle size={14} /> Interactive Fall-Risk Assessment Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Evaluate Your Senior's Fall Risk in 30 Seconds
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl mx-auto">
              Check the boxes that apply to your elder to receive an instant risk calculation and personalized clinical safety advice.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FFF7FA] border border-pink-100 space-y-4 shadow-xs">
            <div className="space-y-3">
              {FALL_RISK_QUESTIONS.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleToggleAnswer(item.key)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    fallAnswers[item.key]
                      ? "bg-white border-[#FF4F81] text-[#2B0E1E] shadow-xs"
                      : "bg-white/60 border-pink-100 text-slate-700 hover:bg-white"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold">{item.q}</span>
                  <div className={`h-6 w-6 rounded-lg flex items-center justify-center border font-bold text-xs shrink-0 ${
                    fallAnswers[item.key] ? "bg-[#FF4F81] border-[#FF4F81] text-white" : "border-slate-300 text-transparent"
                  }`}>
                    ✓
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-pink-100">
              <Button
                onClick={calculateFallRisk}
                className="w-full sm:w-auto bg-gradient-to-r from-[#FF4F81] to-[#E91E63] text-white font-extrabold text-xs sm:text-sm h-11 px-6 rounded-xl"
              >
                Calculate Fall Risk Score →
              </Button>

              {assessmentResult && (
                <div className="text-xs sm:text-sm font-bold text-[#E91E63] bg-white px-4 py-2.5 rounded-xl border border-pink-200">
                  {assessmentResult}
                </div>
              )}
            </div>
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
                { id: "support", label: "NRI Care & Veteran" },
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
              Top 10 Rated Elderly Healthcare Services in Panchkula
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Showing verified, clinical-grade home healthcare solutions ranked by Panchkula family ratings, clinical quality, and rapid response standards.
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
                                Response in Panchkula: {service.responseTime}
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
              <SlidersHorizontal size={14} /> Panchkula Plan Cost Estimator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Calculate Your Senior Care Budget in Panchkula
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

            <Link to="/best-elderly-healthcare-services-panchkula" className="p-5 rounded-2xl bg-white border-2 border-[#FF4F81] shadow-sm text-left block">
              <div className="text-xs font-black text-[#E91E63] mb-1">📍 CURRENT HUB</div>
              <h3 className="font-extrabold text-slate-900 text-base">Panchkula</h3>
              <p className="text-xs text-slate-600 mt-1">Sectors 1-21, MDC & Pinjore</p>
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
      {/* SECTION 6: FAQ ACCORDION FOR PANCHKULA ELDERCARE */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] font-extrabold text-xs uppercase tracking-wider mb-2">
              <HelpCircle size={14} /> Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Questions About Elderly Healthcare in Panchkula
            </h2>
          </div>

          <div className="space-y-4">
            {PANCHKULA_FAQS.map((faq, index) => (
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
            Give Your Loved Ones the Dignified Healthcare They Deserve in Panchkula
          </h2>
          <p className="text-sm sm:text-base text-pink-100/90 leading-relaxed max-w-2xl mx-auto">
            Contact SilverCare today to speak directly with our Senior Clinical Care Manager and arrange a free home assessment anywhere in Panchkula.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              type="button"
              onClick={() => handleOpenBooking("Panchkula Final CTA")}
              className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm sm:text-base h-13 px-8 rounded-2xl shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center"
            >
              Request Free Consultation Call →
            </button>
            <button 
              type="button"
              onClick={() => handleOpenBooking("Panchkula Quick Callback")}
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
