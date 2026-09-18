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

// Ranked Eldercare Services in Derabassi Dataset
const TOP_DERABASSI_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-derabassi",
    title: "24/7 Skilled In-Home Nursing & Attendant Care in Derabassi",
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
    id: "doctor-visit-at-home-derabassi",
    title: "Doctor Home Visits & Bedside Consultation in Derabassi",
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
    id: "physiotherapy-at-home-derabassi",
    title: "Home Physiotherapy & Stroke Rehabilitation Derabassi",
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
    coveredSectors: ["Entire Derabassi & Zirakpur-Derabassi Highway", "ATS Golf Meadows", "Gulmohar City"],
    recommendedFor: "Joint stiffness, paralysis recovery, post-fall rehabilitation.",
    doctorSupervised: true,
    icon: Activity
  },
  {
    rank: 4,
    id: "icu-setup-at-home-derabassi",
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
    coveredSectors: ["All Residential Societies in Derabassi", "ATS Golf Meadows", "Silver City"],
    recommendedFor: "Post-ICU step-down, tracheostomy, advanced respiratory care.",
    doctorSupervised: true,
    icon: ShieldCheck
  }
];

// Derabassi Residential Hubs
const DERABASSI_HUBS: LocationHub[] = [
  { name: "ATS Golf Meadows & ATS Pride", status: "Active Care Hub", coverage: "Daily Nurse & Attendant Visits on Barwala Road" },
  { name: "Gulmohar City & Gulmohar Trends", status: "Active Care Hub", coverage: "24/7 Live-In Caregivers on Haibatpur Road" },
  { name: "Silver City & Bella Green", status: "Active Care Hub", coverage: "Bedside Doctor Checkups & Home Physio" },
  { name: "Derabassi Main & College Road", status: "Active Care Hub", coverage: "Rapid Caregiver Deployment" },
  { name: "Barwala Road Societies", status: "Active Care Hub", coverage: "Home Health Checkups & Attendant Care" }
];

// FAQs for Derabassi Eldercare
const DERABASSI_FAQS: LocationFAQ[] = [
  {
    q: "How fast can a caregiver or nurse reach ATS Golf Meadows or Gulmohar City in Derabassi?",
    a: "Because our central operations are right next door in Zirakpur, we provide rapid same-day caregiver placement across all Derabassi townships including ATS Golf Meadows, Gulmohar City, and Barwala Road."
  },
  {
    q: "Are the home nurses and attendants in Derabassi background-checked?",
    a: "Yes. Every SilverCare caregiver undergoes rigorous background verification, police verification, and clinical screening before placement."
  },
  {
    q: "Do you provide doctor visits at home in Derabassi?",
    a: "Yes. Our senior MBBS and MD geriatric physicians visit homes across Derabassi for thorough health reviews, 12-lead ECG, blood pressure monitoring, and prescription management."
  },
  {
    q: "Can I rent medical equipment like oxygen concentrators or ICU beds in Derabassi?",
    a: "Yes. We deliver and install hospital-grade motorized beds, BiPAP machines, and oxygen concentrators directly from our central depot."
  }
];

export default function ElderlyCareDerabassi() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-derabassi";
  const pageTitle = "Best Elderly Healthcare Services in Derabassi | SilverCare India";
  const pageDesc = "Trusted eldercare and home nursing in Derabassi, ATS Golf Meadows, and Gulmohar City. 24/7 live-in nurses, doctor home visits & home physio. Call +91 800-14-800-75.";
  const keywords = "Best elderly healthcare services in Derabassi, home nursing Derabassi, ATS Golf Meadows eldercare, Gulmohar City caregiver, doctor visit at home Derabassi, home ICU setup Derabassi";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare Eldercare & Senior Home Healthcare Derabassi",
    "image": "https://silvercareindia.com/hero-doctor.png",
    "telephone": "+918001480075",
    "email": "care@silvercareindia.com",
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
      cityName="Derabassi"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="📍 ATS Golf Meadows • Gulmohar City • Barwala Road"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Derabassi"
      heroSubtitle="Dedicated in-home senior healthcare and nursing care in Derabassi. 24/7 skilled nursing attendants, bedside doctor visits, home physiotherapy, and medical ICU setups dispatched promptly."
      stats={[
        { value: "760+", label: "Derabassi Families" },
        { value: "4.9", label: "Google Rating" },
        { value: "100%", label: "Verified Caregivers" },
        { value: "24/7", label: "Care Assistance" },
      ]}
      services={TOP_DERABASSI_SERVICES}
      servicesSectionTitle="Top Ranked Eldercare Services in Derabassi"
      servicesSectionSubtitle="Explore comprehensive clinical home healthcare solutions designed for seniors living in Derabassi and surrounding townships."
      faqs={DERABASSI_FAQS}
      sectorHubs={DERABASSI_HUBS}
      sectorHubsTitle="Derabassi Residential Hubs & Societies"
      sectorHubsSubtitle="Select your locality to check active caregiver readiness and fast dispatch in Derabassi."
      ctaHeading="Need Fast Eldercare Deployment in Derabassi?"
      ctaDescription="Our 24/7 care coordination desk will match certified nursing attendants and physiotherapists in Derabassi immediately."
    />
  );
}
