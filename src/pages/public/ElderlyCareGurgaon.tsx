import React from "react";
import { 
  Stethoscope, 
  Activity, 
  ShieldCheck, 
  Heart
} from "lucide-react";
import LocationPageTemplate, { 
  LocationRankedService, 
  LocationHub, 
  LocationFAQ 
} from "@/src/components/location/LocationPageTemplate";

// Ranked Eldercare Services in Gurgaon Dataset
const TOP_GURGAON_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-gurgaon",
    title: "24/7 Skilled In-Home Nursing & Attendant Care in Gurgaon",
    badgeTag: "#1 Choice in Gurgaon & DLF Belt",
    category: "nursing",
    rating: 4.9,
    reviewCount: 520,
    shortDesc: "Hospital-trained 12-hour and 24-hour registered nurses (GNM/B.Sc) and dedicated senior caregivers across Gurgaon.",
    fullDesc: "SilverCare operates a dedicated hub in Sector 33 Gurgaon, serving DLF Phases, Golf Course Road, Sohna Road, and Nirvana Country. We provide specialized bedside nursing, post-surgical dressing, tracheostomy management, and live-in attendant care.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM/B.Sc Registered Nurses",
      "Vitals Logging, Medication Management & Sugar/BP Monitoring",
      "Tracheostomy, Ryle's Tube Feeding & Foley Catheter Care",
      "Guaranteed 24-Hour Caregiver Replacement across Gurgaon"
    ],
    startingPrice: "₹1,400 / day (Attendant) • ₹2,500 / day (Skilled Nurse)",
    responseTime: "Rapid Same-Day Deployment in Gurgaon",
    coveredSectors: ["Sector 33 Hub", "DLF Phase 1-5", "Golf Course Road", "Sohna Road", "Sushant Lok", "Nirvana Country"],
    recommendedFor: "Bedridden seniors, stroke recovery, post-joint replacement surgery.",
    doctorSupervised: true,
    icon: Heart
  },
  {
    rank: 2,
    id: "doctor-visit-at-home-gurgaon",
    title: "Doctor Home Visits & Geriatric Consultation in Gurgaon",
    badgeTag: "Sector 33 Dedicated Doctor Hub",
    category: "clinical",
    rating: 4.9,
    reviewCount: 410,
    shortDesc: "Experienced MBBS and MD geriatric physicians visiting your residence in Gurgaon for comprehensive bedside evaluations.",
    fullDesc: "Save senior parents from congested Gurgaon traffic and hospital OPD waiting rooms. Our senior doctors conduct detailed home assessments, review medications, and coordinate ongoing care directly.",
    keyFeatures: [
      "Senior MBBS / MD Geriatric Specialists visiting patient's home",
      "Comprehensive Bedside Clinical Review, ECG & Vitals Assessment",
      "Instant Digital Prescription & Nurse Care Coordination",
      "Avoid hospital trips for routine and chronic reviews"
    ],
    startingPrice: "₹1,500 per consultation visit",
    responseTime: "Scheduled Same-Day Visits",
    coveredSectors: ["All Gurgaon Sectors", "South City 1 & 2", "Ardee City", "Cyber City Belt"],
    recommendedFor: "Hypertension, chronic diabetes, post-discharge reviews, dementia assessment.",
    doctorSupervised: true,
    icon: Stethoscope
  },
  {
    rank: 3,
    id: "physiotherapy-at-home-gurgaon",
    title: "Specialized Geriatric & Ortho Physiotherapy at Home Gurgaon",
    badgeTag: "Expert Physiotherapists",
    category: "rehab",
    rating: 4.9,
    reviewCount: 360,
    shortDesc: "Licensed BPT/MPT physiotherapists bringing electrotherapy, gait training, and mobility equipment to senior homes in Gurgaon.",
    fullDesc: "Tailored physical rehabilitation for senior citizens recovering from knee/hip replacements, fractures, or stroke. We focus on fall prevention, muscle strengthening, and independent mobility.",
    keyFeatures: [
      "Certified MPT/BPT Neuro & Orthopedic Specialists",
      "Portable Ultrasound, TENS & Muscle Stimulator Units",
      "Post-Knee & Hip Arthroplasty specialized rehabilitation protocols",
      "Fall prevention, balance training & gait re-education"
    ],
    startingPrice: "₹799 / session • Monthly rehabilitation packages",
    responseTime: "Within 2-4 Hours",
    coveredSectors: ["Golf Course Ext Road", "DLF 1-5", "Sohna Road", "Sectors 45-57"],
    recommendedFor: "Joint stiffness, paralysis recovery, post-fall mobility restoration.",
    doctorSupervised: true,
    icon: Activity
  },
  {
    rank: 4,
    id: "icu-setup-at-home-gurgaon",
    title: "Complete ICU & Critical Care Setup at Home Gurgaon",
    badgeTag: "Hospital-Grade ICU Setup",
    category: "specialized",
    rating: 4.9,
    reviewCount: 220,
    shortDesc: "Complete hospital-grade ICU infrastructure at home with multi-para monitors, ventilators, and 24/7 critical care nurses in Gurgaon.",
    fullDesc: "Step down safely from Medanta, Fortis, Max or Artemis to home. SilverCare sets up medical-grade critical care equipment with 24/7 ICU-trained nurses and continuous intensivist oversight.",
    keyFeatures: [
      "Motorized ICU 3-Function & 5-Function Medical Beds",
      "Mechanical Ventilators, BiPAP / CPAP & High-Flow Oxygen Support",
      "5-Para Cardiac Monitors, Syringe Pumps & Suction Machines",
      "24/7 Dedicated Critical Care Qualified Nursing Officers"
    ],
    startingPrice: "Custom ICU Package starting ₹4,800 / day",
    responseTime: "Emergency 2 to 4-Hour Setup in Gurgaon",
    coveredSectors: ["Entire Gurgaon & Delhi NCR", "Golf Course Road", "DLF Phase 1-5", "Sohna Road"],
    recommendedFor: "Tracheostomy patients, advanced COPD, coma care, end-stage respiratory support.",
    doctorSupervised: true,
    icon: ShieldCheck
  }
];

// Gurgaon Sector Hubs
const GURGAON_HUBS: LocationHub[] = [
  { name: "Sector 33 & Sohna Road Hub", status: "Active Care Hub", coverage: "Primary Operations Desk & Rapid Dispatch" },
  { name: "DLF Phase 1, 2, 3, 4 & 5", status: "Active Care Hub", coverage: "Daily Skilled Nursing & Attendant Care" },
  { name: "Golf Course Road & Ext Road", status: "Active Care Hub", coverage: "Geriatric Physio & Bedside Consultations" },
  { name: "Nirvana Country & South City", status: "Active Care Hub", coverage: "24/7 Live-In Caregivers & Dementia Care" },
  { name: "Sushant Lok 1, 2 & 3", status: "Active Care Hub", coverage: "Bedside Health Checkups & Phlebotomy" },
  { name: "Sectors 45 to 57 Belt", status: "Active Care Hub", coverage: "ICU Equipment Setup & Nursing" }
];

// FAQs for Gurgaon Eldercare
const GURGAON_FAQS: LocationFAQ[] = [
  {
    q: "Where is SilverCare located in Gurgaon?",
    a: "SilverCare operates a dedicated clinical coordination hub in Sector 33, Gurgaon, providing rapid deployment across DLF Phases 1-5, Golf Course Road, Sohna Road, Nirvana Country, and surrounding sectors."
  },
  {
    q: "How are the nurses and attendants screened in Gurgaon?",
    a: "All our caregivers undergo strict identity verification, police background checks, clinical skills validation, and continuous geriatric training."
  },
  {
    q: "Can SilverCare assist with step-down ICU care after discharge from Medanta, Fortis or Artemis?",
    a: "Yes. We coordinate directly with hospital discharge teams to install motorized ICU beds, ventilators, cardiac monitors, and assign 24/7 ICU nurses before the patient arrives home."
  },
  {
    q: "Do you offer doctor home visits in Gurgaon?",
    a: "Yes. Our senior MBBS and MD geriatric physicians conduct comprehensive bedside consultations, portable 12-lead ECG checks, and chronic care management across all Gurgaon residential societies."
  }
];

export default function ElderlyCareGurgaon() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-gurgaon";
  const pageTitle = "Best Elderly Healthcare Services in Gurgaon | SilverCare India";
  const pageDesc = "Top-rated senior eldercare and home nursing in Gurgaon, Sector 33, DLF & Golf Course Road. 24/7 live-in nurses, doctor home visits & ICU setup. Call +91 800-14-800-75.";
  const keywords = "Best elderly healthcare services in Gurgaon, home nursing Gurgaon, Sector 33 eldercare, DLF senior care, Golf Course Road nursing, doctor visit at home Gurgaon, home ICU setup Gurgaon";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare Eldercare & Senior Home Healthcare Gurgaon",
    "image": "https://silvercareindia.com/hero-doctor.png",
    "telephone": "+918001480075",
    "email": "care@silvercareindia.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sector 33 Hub & DLF Belt",
      "addressLocality": "Gurgaon",
      "addressRegion": "Haryana",
      "postalCode": "122001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.4595,
      "longitude": 77.0266
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
      cityName="Gurgaon"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="📍 Sector 33 Hub • DLF 1-5 • Golf Course Road • Sohna Road"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Gurgaon"
      heroSubtitle="Hospital-grade, doctor-led in-home senior care in Gurgaon. 24/7 skilled nursing attendants, bedside doctor visits, home physiotherapy, and medical ICU setups delivered across all sectors."
      stats={[
        { value: "1,850+", label: "NCR Families" },
        { value: "4.9", label: "Google Rating" },
        { value: "100%", label: "Verified Caregivers" },
        { value: "24/7", label: "Care Assistance" },
      ]}
      services={TOP_GURGAON_SERVICES}
      servicesSectionTitle="Top Ranked Eldercare Services in Gurgaon"
      servicesSectionSubtitle="Comprehensive home healthcare solutions for elderly parents living in Gurgaon, Delhi NCR, and gated residential communities."
      faqs={GURGAON_FAQS}
      sectorHubs={GURGAON_HUBS}
      sectorHubsTitle="Gurgaon Sector Coverage & Residential Hubs"
      sectorHubsSubtitle="Select your sector or residential locality below to check active caregiver readiness and fast dispatch in Gurgaon."
      ctaHeading="Looking for Senior Care Services in Gurgaon?"
      ctaDescription="Our Sector-33 clinical desk coordinates verified nursing attendants and home doctor visits across Gurgaon within hours."
    />
  );
}
