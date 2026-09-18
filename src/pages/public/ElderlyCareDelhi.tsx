import React from "react";
import { 
  Stethoscope, 
  UserCheck, 
  Activity, 
  ShieldCheck, 
  Heart, 
  Globe, 
  Building2, 
  Sparkles 
} from "lucide-react";
import LocationPageTemplate, { 
  LocationRankedService, 
  LocationHub, 
  LocationFAQ 
} from "@/src/components/location/LocationPageTemplate";

// Top 10 Ranked Eldercare Services in Delhi
const TOP_DELHI_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-delhi",
    title: "24/7 Skilled In-Home Nursing & Attendant Care in Delhi",
    badgeTag: "#1 Choice in Delhi NCR",
    category: "nursing",
    rating: 5.0,
    reviewCount: 680,
    shortDesc: "Hospital-trained 12-hour and 24-hour live-in registered nurses (GNM/B.Sc) and compassionate senior caregivers across South Delhi, Central Delhi & Dwarka.",
    fullDesc: "SilverCare brings hospital-standard home nursing directly to seniors across Delhi. Certified GNM and B.Sc nurses specialize in bedridden care, post-surgical recovery, tracheostomy management, catheterization, and IV infusions with clinical doctor oversight.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM & B.Sc Registered Nurses",
      "Comprehensive Vitals Logging, Medication Management & Sugar/BP Tracking",
      "Tracheostomy, Ryle's Feeding Tube & Foley Catheter Care",
      "Guaranteed Caregiver Replacement across All Delhi Zones"
    ],
    responseTime: "Prompt Same-Day Deployment in Delhi",
    coveredSectors: ["South Delhi (Greater Kailash, Hauz Khas, Saket)", "Dwarka & Janakpuri", "Vasant Kunj & Vasant Vihar", "Civil Lines & Central Delhi", "Preet Vihar & East Delhi"],
    recommendedFor: "Bedridden seniors, post-stroke recovery, chronic illness support & 24/7 live-in care.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 2,
    id: "doctor-home-visits-delhi",
    title: "Senior Physician & Geriatric Doctor Home Visits in Delhi",
    badgeTag: "Bedside Medical Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 540,
    shortDesc: "Experienced MBBS and MD geriatric physicians visiting senior residences across Delhi for bedside clinical checkups and prescription audits.",
    fullDesc: "Avoid traffic delays and crowded hospital OPDs in AIIMS, Max, and Apollo. Our senior physicians conduct comprehensive bedside evaluations, portable 12-lead ECGs, and continuous chronic care management in your home.",
    keyFeatures: [
      "Senior MD Geriatric Specialists visiting patient's residence",
      "At-Home 12-Lead ECG, Vitals & Chronic Disease Assessment",
      "Medication Optimization & Polypharmacy Review",
      "Direct Hospital Referral Coordination across Delhi NCR"
    ],
    responseTime: "Scheduled Same-Day Visits Available",
    coveredSectors: ["Greater Kailash 1 & 2", "Defence Colony", "Vasant Kunj", "Dwarka Sectors", "Punjabi Bagh"],
    recommendedFor: "Hypertension, chronic diabetes, post-discharge reviews, dementia assessment.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 3,
    id: "physiotherapy-at-home-delhi",
    title: "Geriatric Physiotherapy & Joint Replacement Rehab in Delhi",
    badgeTag: "Expert Neuro & Ortho Rehab",
    category: "rehab",
    rating: 4.9,
    reviewCount: 490,
    shortDesc: "Certified Master of Physiotherapy (MPT) practitioners providing paralysis recovery, knee/hip replacement rehab, and gait training.",
    fullDesc: "Restore confident mobility in your own home. Our certified physiotherapists bring portable electrotherapy units (TENS/IFT/Ultrasound) and balance training equipment directly to seniors across Delhi.",
    keyFeatures: [
      "Certified MPT/BPT Geriatric Specialists",
      "Post-Total Knee & Hip Replacement Mobilization Programs",
      "Stroke Neuro-Rehabilitation & Fall Prevention Training",
      "Portable Electrotherapy Equipment Included in Every Session"
    ],
    responseTime: "Within 2 to 4 Hours",
    coveredSectors: ["All South & West Delhi", "Dwarka", "Rohini", "East Delhi Belts"],
    recommendedFor: "Post-op joint surgeries, stroke recovery, arthritis, sciatica, and fall rehabilitation.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 4,
    id: "dementia-alzheimers-care-delhi",
    title: "Specialized Dementia & Alzheimer's Memory Care Delhi",
    badgeTag: "Memory Care Specialist",
    category: "specialized",
    rating: 4.9,
    reviewCount: 380,
    shortDesc: "Compassionate memory care specialists certified in cognitive stimulation, anti-wandering safety protocols, and behavioral support.",
    fullDesc: "Managing dementia requires patient, vigilant caregivers. SilverCare's dementia caregivers provide cognitive therapy, emotional reassurance, and safety routines tailored for elders with memory decline.",
    keyFeatures: [
      "Door & Balcony Anti-Wandering Protocols",
      "Cognitive Stimulation Therapy & Memory Orientation Games",
      "Gentle Behavioral Management & Emotional Reassurance",
      "Caregiver Respite & Family Guidance Support"
    ],
    responseTime: "Fast Caregiver Placement",
    coveredSectors: ["Entire Delhi Region", "South Delhi", "West Delhi", "North Delhi"],
    recommendedFor: "Seniors with Alzheimer's, Parkinson's disease, or age-related memory impairment.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 5,
    id: "nri-parent-care-delhi",
    title: "NRI Parent Healthcare & Dedicated Care Manager in Delhi",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 620,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor checkups, medicine refills, 24/7 emergency response, and live digital updates for overseas children.",
    fullDesc: "Complete peace of mind for families settled in USA, Canada, UK, Europe, or Australia. Our senior care managers visit your parents, oversee doctor consultations, and provide real-time updates.",
    keyFeatures: [
      "Dedicated Senior Clinical Care Manager Assigned",
      "Real-time Digital Health Reports & Doctor Tele-Reviews",
      "Doorstep Medicine Refills, Lab Tests & Hospital Escort",
      "24/7 Priority Emergency Evacuation across Delhi NCR"
    ],
    responseTime: "Instant Global Onboarding",
    coveredSectors: ["All Delhi Colonies", "Greater Kailash", "Chanakyapuri", "Vasant Vihar"],
    recommendedFor: "Aging parents residing independently in Delhi with adult children abroad.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 6,
    id: "home-icu-setup-delhi",
    title: "Hospital-Grade Home ICU Setup & Equipment in Delhi",
    badgeTag: "Critical Life Support",
    category: "specialized",
    rating: 4.9,
    reviewCount: 310,
    shortDesc: "Complete ICU setup at home including Ventilators, BiPAP/CPAP, Motorized Beds, Cardiac Multipara Monitors, and 24/7 Critical Care Nurses.",
    fullDesc: "Safe transition from hospital ICUs to home. Installed by certified biomedical technicians and staffed by experienced ICU registered nurses with continuous doctor supervision.",
    keyFeatures: [
      "Motorized 3 & 5 Function Hospital ICU Beds & Air Mattresses",
      "High-End Invasive/Non-Invasive Ventilators & BiPAP/CPAP Units",
      "Multipara Cardiac Monitors & Infusion Syringe Pumps",
      "24/7 Critical Care Qualified Registered Nurse Coverage"
    ],
    responseTime: "Emergency 2 to 4-Hour Deployment",
    coveredSectors: ["All Delhi Localities", "South Delhi", "West Delhi", "Dwarka"],
    recommendedFor: "Post-ICU step-down recovery, tracheostomy, advanced respiratory care.",
    doctorSupervised: true,
    icon: Building2,
  },
  {
    rank: 7,
    id: "doorstep-lab-tests-delhi",
    title: "Doorstep Pathology Blood Sample Collection in Delhi",
    badgeTag: "NABL Certified",
    category: "clinical",
    rating: 4.8,
    reviewCount: 450,
    shortDesc: "Painless home sample collection for Complete Senior Health Profiles, Diabetes, Thyroid, Lipid, KFT, LFT with digital reports in 6 hours.",
    fullDesc: "Skip hospital queues. Certified phlebotomists collect blood samples at your residence with sterile vacuum tubes and NABL-accredited diagnostic processing.",
    keyFeatures: [
      "Painless Blood & Urine Sample Collection at Home",
      "Complete Senior Executive Health Package (65+ Parameters)",
      "NABL & ICMR Accredited Diagnostic Labs",
      "Digital WhatsApp & Email Report Delivery in 6 Hours"
    ],
    responseTime: "Early Morning Slots from 6:30 AM",
    coveredSectors: ["All Delhi Neighborhoods", "South Delhi", "Dwarka", "Rohini"],
    recommendedFor: "Quarterly diabetic reviews, senior health checks, bedridden routine tests.",
    doctorSupervised: true,
    icon: Sparkles,
  },
  {
    rank: 8,
    id: "senior-companionship-delhi",
    title: "Senior Companionship, Errands & Outing Assistance Delhi",
    badgeTag: "Emotional Wellness",
    category: "support",
    rating: 4.8,
    reviewCount: 290,
    shortDesc: "Warm, educated companions for morning park walks, grocery and bank visits, cognitive games, and doctor escorts in Delhi.",
    fullDesc: "Prevent elder isolation and loneliness. Our verified companions keep elderly parents active, safe, and mentally stimulated during daily routines and community visits.",
    keyFeatures: [
      "Accompaniment for Walks in Residential Parks & Clubs",
      "Escort to Clinics, Supermarkets & Bank Visits",
      "Mental Stimulation Games, Reading & Smartphone Assistance",
      "Empathetic Friendship & Daily Activity Support"
    ],
    responseTime: "Same-Day Deployment",
    coveredSectors: ["South Delhi", "Vasant Kunj", "Dwarka", "Central Delhi"],
    recommendedFor: "Independent seniors seeking social engagement and assistance with outside errands.",
    doctorSupervised: false,
    icon: UserCheck,
  }
];

// Delhi Residential Hubs
const DELHI_HUBS: LocationHub[] = [
  { name: "South Delhi (GK, Saket, Hauz Khas)", status: "Active Care Hub", coverage: "Daily Skilled Nursing & Attendant Care" },
  { name: "Dwarka & Janakpuri (Sectors 1-23)", status: "Active Care Hub", coverage: "Bedside Doctor Checkups & Home Physio" },
  { name: "Vasant Kunj & Vasant Vihar", status: "Active Care Hub", coverage: "24/7 Live-In Caregivers & Dementia Care" },
  { name: "Defence Colony & Lajpat Nagar", status: "Active Care Hub", coverage: "ICU Equipment Setup & Phlebotomy" },
  { name: "Rohini & Pitampura Belt", status: "Active Care Hub", coverage: "Home Health Checkups & Attendants" },
  { name: "Civil Lines & Central Delhi", status: "Active Care Hub", coverage: "Rapid Caregiver Deployment" },
  { name: "Preet Vihar & Mayur Vihar", status: "Active Care Hub", coverage: "Emergency & Attendant Care" },
  { name: "Punjabi Bagh & Paschim Vihar", status: "Active Care Hub", coverage: "Geriatric Physio & Nursing" }
];

// FAQs for Delhi Eldercare
const DELHI_FAQS: LocationFAQ[] = [
  {
    q: "How quickly can SilverCare assign an in-home nurse in Delhi?",
    a: "We provide same-day caregiver placement across South Delhi, Dwarka, Vasant Kunj, and all Delhi localities with 100% background-verified and medically trained nurses."
  },
  {
    q: "Do you offer doctor home visits for seniors in Delhi?",
    a: "Yes. Our senior MBBS and MD geriatric physicians conduct comprehensive bedside consultations, portable 12-lead ECG checks, and chronic care management at your residence."
  },
  {
    q: "Can SilverCare look after NRI parents living independently in Delhi?",
    a: "Yes! Many NRI families in the USA, Canada, UK, and Australia trust SilverCare. Our local care managers coordinate doctor visits, medicine delivery, and provide real-time updates to family members abroad."
  },
  {
    q: "Can you provide medical ICU equipment on rent at home in Delhi?",
    a: "Yes, SilverCare supplies hospital-grade motorized beds, oxygen concentrators, BiPAP/CPAP machines, and multi-para monitors with complete home installation."
  }
];

export default function ElderlyCareDelhi() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-delhi";
  const pageTitle = "Best Elderly Healthcare Services in Delhi (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Delhi. 24/7 verified in-home nursing, doctor home visits, geriatric physiotherapy, home ICU setup & NRI parent support across South Delhi, Dwarka & Central Delhi.";
  const keywords = "Best elderly healthcare services in Delhi, home nursing Delhi, doctor visit at home Delhi, South Delhi eldercare, Dwarka senior care, Vasant Kunj caregiver, home ICU setup Delhi, SilverCare Delhi";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare India - Eldercare & Senior Home Healthcare Delhi",
    "image": "https://silvercareindia.com/hero-doctor.png",
    "telephone": "+918001480075",
    "email": "care@silvercareindia.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Delhi NCR Operations Hub",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.6139,
      "longitude": 77.2090
    },
    "url": canonicalUrl,
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
    <LocationPageTemplate
      cityName="Delhi"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="🏆 Top-Ranked Senior Healthcare Provider in Delhi"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Delhi"
      heroSubtitle="SilverCare brings hospital-standard 24/7 home nursing, senior MD doctor visits, post-hospitalization rehab & NRI parent concierge across South Delhi, Dwarka, Vasant Kunj & Central Delhi."
      stats={[
        { value: "2,400+", label: "Delhi Families Cared" },
        { value: "4.9", label: "Google Rating" },
        { value: "100%", label: "Verified Caregivers" },
        { value: "24/7", label: "Care Assistance" },
      ]}
      services={TOP_DELHI_SERVICES}
      servicesSectionTitle="Top Rated Elderly Healthcare Services in Delhi"
      servicesSectionSubtitle="Showing verified, clinical-grade home healthcare solutions ranked by family ratings, clinical excellence, and rapid response standards in Delhi."
      faqs={DELHI_FAQS}
      sectorHubs={DELHI_HUBS}
      sectorHubsTitle="Delhi Sector Coverage & Residential Hubs"
      sectorHubsSubtitle="Select your locality or residential colony below to check active caregiver readiness and fast dispatch in Delhi."
      ctaHeading="Give Your Loved Ones the Dignified Healthcare They Deserve in Delhi"
      ctaDescription="Contact SilverCare today to speak directly with our Senior Clinical Care Team and arrange a comprehensive home healthcare assessment anywhere in Delhi."
    />
  );
}
