import React from "react";
import { 
  Stethoscope, 
  UserCheck, 
  Activity, 
  ShieldCheck, 
  Heart
} from "lucide-react";
import LocationPageTemplate, { 
  LocationRankedService, 
  LocationHub, 
  LocationFAQ 
} from "@/src/components/location/LocationPageTemplate";

// Ranked Eldercare Services in Kharar Dataset
const TOP_KHARAR_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-kharar",
    title: "24/7 Skilled In-Home Nursing & Attendant Care in Kharar",
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
    id: "doctor-visit-at-home-kharar",
    title: "Doctor Home Visits & Bedside Geriatric Consultation in Kharar",
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
    id: "physiotherapy-at-home-kharar",
    title: "Specialized Geriatric & Neuro Physiotherapy at Home Kharar",
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
    id: "icu-setup-at-home-kharar",
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
    id: "pathology-diagnostics-kharar",
    title: "Doorstep Pathology & Diagnostic Blood Sample Collection Kharar",
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
    coveredSectors: ["Entire Kharar & Greater Mohali", "Sunny Enclave", "Gillco Valley", "Landran Road"],
    recommendedFor: "Quarterly diabetic reviews, senior health checks, bedridden routine tests.",
    doctorSupervised: true,
    icon: UserCheck
  }
];

// Kharar Residential Hubs
const KHARAR_HUBS: LocationHub[] = [
  { name: "Sunny Enclave (Sectors 123-125)", status: "Active Care Hub", coverage: "Daily Nurse & Attendant Visits" },
  { name: "Gillco Valley & Gillco Parkhills", status: "Active Care Hub", coverage: "Rapid Caregiver Deployment" },
  { name: "Shivalik City & Model Town", status: "Active Care Hub", coverage: "Geriatric Physio & Bedside Care" },
  { name: "Omega City & Darpan City", status: "Active Care Hub", coverage: "24/7 Live-In Caregivers" },
  { name: "Kharar-Landran Highway Belts", status: "Active Care Hub", coverage: "Home Health Checkups" },
  { name: "TDI City & Aman City Kharar", status: "Active Care Hub", coverage: "Emergency & Attendant Care" }
];

// FAQs for Kharar Eldercare
const KHARAR_FAQS: LocationFAQ[] = [
  {
    q: "How quickly can SilverCare deploy a nurse or attendant in Sunny Enclave, Kharar?",
    a: "We provide same-day caregiver placement across Sunny Enclave, Gillco Valley, and all Kharar localities with 100% background-verified and medically trained staff."
  },
  {
    q: "Do you provide doctor visits at home for senior citizens in Kharar?",
    a: "Yes. Our senior MBBS and MD geriatric physicians conduct bedside checkups, portable ECG diagnostics, prescription updates, and routine chronic illness management in your home in Kharar."
  },
  {
    q: "What are the charges for 24-hour eldercare nursing in Kharar?",
    a: "We offer customized, transparent care packages starting at ₹1,200/day for trained attendants and ₹2,200/day for qualified GNM/B.Sc registered nurses."
  },
  {
    q: "Can you provide medical ICU equipment on rent at home in Kharar?",
    a: "Yes, SilverCare supplies hospital-grade motorized beds, oxygen concentrators, BiPAP/CPAP machines, and multi-para monitors with complete home installation in Kharar."
  }
];

export default function ElderlyCareKharar() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-kharar";
  const pageTitle = "Best Elderly Healthcare Services in Kharar | SilverCare India";
  const pageDesc = "Top-rated senior eldercare and home nursing in Kharar, Sunny Enclave & Gillco Valley. 24/7 live-in nurses, doctor home visits, home physio & ICU setup. Call +91 800-14-800-75.";
  const keywords = "Best elderly healthcare services in Kharar, home nursing Kharar, Sunny Enclave eldercare, Gillco Valley senior care, doctor visit at home Kharar, home ICU setup Kharar, caregiver in Kharar";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare Eldercare & Senior Home Healthcare Kharar",
    "image": "https://silvercareindia.com/hero-doctor.png",
    "telephone": "+918001480075",
    "email": "care@silvercareindia.com",
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
      cityName="Kharar"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="📍 Sunny Enclave • Gillco Valley • Shivalik City"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Kharar"
      heroSubtitle="Compassionate, doctor-supervised in-home senior care in Kharar. 24/7 skilled nursing attendants, bedside doctor visits, physiotherapy, and hospital-grade ICU setups delivered directly to your doorstep."
      stats={[
        { value: "980+", label: "Kharar Families" },
        { value: "4.9", label: "Google Rating" },
        { value: "100%", label: "Verified Caregivers" },
        { value: "24/7", label: "Care Assistance" },
      ]}
      services={TOP_KHARAR_SERVICES}
      servicesSectionTitle="Top Ranked Eldercare Services in Kharar"
      servicesSectionSubtitle="Explore comprehensive home healthcare solutions tailored for senior citizens living in Kharar and surrounding residential townships."
      faqs={KHARAR_FAQS}
      sectorHubs={KHARAR_HUBS}
      sectorHubsTitle="Kharar & Sunny Enclave Residential Hubs"
      sectorHubsSubtitle="Select your locality to check active caregiver readiness and fast dispatch in Kharar."
      ctaHeading="Need Immediate Eldercare Assistance in Kharar?"
      ctaDescription="Our 24/7 clinical coordinators will connect you with qualified nurses and physiotherapists in Kharar within minutes."
    />
  );
}
