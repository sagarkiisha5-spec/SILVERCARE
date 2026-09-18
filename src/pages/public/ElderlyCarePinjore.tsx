import React from "react";
import { 
  Stethoscope, 
  Activity, 
  Heart
} from "lucide-react";
import LocationPageTemplate, { 
  LocationRankedService, 
  LocationHub, 
  LocationFAQ 
} from "@/src/components/location/LocationPageTemplate";

// Ranked Eldercare Services in Pinjore & Kalka Dataset
const TOP_PINJORE_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-pinjore",
    title: "24/7 In-Home Nursing & Attendant Care in Pinjore & Kalka",
    badgeTag: "#1 Choice in Pinjore-Kalka Belt",
    category: "nursing",
    rating: 4.9,
    reviewCount: 240,
    shortDesc: "Dedicated 12-hour and 24-hour qualified registered nurses (GNM/B.Sc) and senior attendants for seniors in Pinjore and Kalka.",
    fullDesc: "SilverCare brings trusted hospital-standard nursing care to Pinjore, Kalka, and Surajpur. Certified nurses assist with post-surgical recovery, vitals tracking, injections, wound dressing, and bedside comfort.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM/B.Sc Registered Nurses",
      "Vitals Logging, Medication Management & Sugar/BP Monitoring",
      "Tracheostomy, Catheterization & Mobility Support",
      "Reliable Caregiver Replacement across Pinjore & Kalka"
    ],
    startingPrice: "₹1,200 / day (Attendant) • ₹2,200 / day (Skilled Nurse)",
    responseTime: "Same-Day Dispatch from Panchkula Hub",
    coveredSectors: ["Pinjore Main", "HMT Township", "Bitna Road", "Kalka Town", "Surajpur", "Panchkula Ext"],
    recommendedFor: "Bedridden seniors, post-stroke recovery, chronic care support.",
    doctorSupervised: true,
    icon: Heart
  },
  {
    rank: 2,
    id: "physiotherapy-at-home-pinjore",
    title: "Home Physiotherapy & Senior Mobility Therapy Pinjore",
    badgeTag: "Expert Physical Therapists",
    category: "rehab",
    rating: 4.9,
    reviewCount: 190,
    shortDesc: "Certified physiotherapists visiting homes in Pinjore & Kalka for knee/hip recovery, paralysis rehabilitation, and arthritis care.",
    fullDesc: "Restore walking confidence and joint flexibility without traveling to Panchkula or Chandigarh. Our therapists provide personalized exercise programs and electrotherapy at home.",
    keyFeatures: [
      "Certified MPT/BPT Neuro & Orthopedic Specialists",
      "Post-Knee & Hip Arthroplasty specialized recovery",
      "Portable Ultrasound & TENS electrotherapy machines",
      "Gait retraining, fall prevention & balance enhancement"
    ],
    startingPrice: "₹699 / session • Monthly rehabilitation packages",
    responseTime: "Within 2-4 Hours",
    coveredSectors: ["Pinjore-Kalka Highway", "Surajpur", "HMT Complex", "Bitna Road"],
    recommendedFor: "Joint pain, post-fracture recovery, elderly balance issues.",
    doctorSupervised: true,
    icon: Activity
  },
  {
    rank: 3,
    id: "doctor-visit-at-home-pinjore",
    title: "Doctor Home Visits & Senior Health Checkups Pinjore",
    badgeTag: "Doorstep Medical Consultation",
    category: "clinical",
    rating: 4.8,
    reviewCount: 210,
    shortDesc: "Qualified physicians visiting senior citizens at home in Pinjore & Kalka for comprehensive medical reviews.",
    fullDesc: "Avoid bumpy journeys into city OPDs. Our senior doctors conduct thorough bedside clinical checkups, review prescription medications, and guide family members.",
    keyFeatures: [
      "Senior MBBS Physicians visiting patient's residence",
      "Comprehensive Bedside Clinical Review & Vitals Assessment",
      "Direct guidance for home nursing attendants",
      "Convenient consultation for elderly with mobility limits"
    ],
    startingPrice: "₹1,499 per consultation visit",
    responseTime: "Scheduled Same-Day Visits",
    coveredSectors: ["Entire Pinjore & Kalka Region", "Surajpur", "HMT Township"],
    recommendedFor: "Hypertension, chronic diabetes, post-discharge review.",
    doctorSupervised: true,
    icon: Stethoscope
  }
];

// Pinjore Residential Hubs
const PINJORE_HUBS: LocationHub[] = [
  { name: "HMT Township & Surajpur", status: "Active Care Hub", coverage: "Daily Skilled Nursing & Attendant Care" },
  { name: "Bitna Road & Pinjore Main", status: "Active Care Hub", coverage: "Rapid Caregiver Placement" },
  { name: "Kalka Town & Railway Colony", status: "Active Care Hub", coverage: "Bedside Health Checkups & Attendants" },
  { name: "Pinjore-Panchkula Expressway Belt", status: "Active Care Hub", coverage: "Home Physiotherapy & Emergency Nursing" }
];

// FAQs for Pinjore Eldercare
const PINJORE_FAQS: LocationFAQ[] = [
  {
    q: "How fast can SilverCare send a caregiver to Pinjore or Kalka?",
    a: "Our caregivers are dispatched directly from our regional Panchkula/Pinjore desk, ensuring fast same-day deployment for 12h/24h nursing."
  },
  {
    q: "Are your caregivers trained for bedridden eldercare?",
    a: "Yes. Our GNM/B.Sc nurses and attendants are trained in catheter care, tube feeding, bed bathing, vitals tracking, and medication administration."
  },
  {
    q: "Do you offer physiotherapy for knee pain and stroke recovery in Pinjore?",
    a: "Yes. Our licensed physiotherapists bring electrotherapy, ultrasound, and balance training equipment directly to your home."
  }
];

export default function ElderlyCarePinjore() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-pinjore";
  const pageTitle = "Best Elderly Healthcare Services in Pinjore & Kalka | SilverCare India";
  const pageDesc = "Top senior eldercare and home nursing in Pinjore, Kalka & Surajpur. 24/7 live-in nurses, doctor home visits & home physiotherapy. Call +91 800-14-800-75.";
  const keywords = "Best elderly healthcare services in Pinjore, home nursing Pinjore, Kalka eldercare, Surajpur senior care, doctor visit at home Pinjore, home physiotherapy Pinjore";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare Eldercare & Senior Home Healthcare Pinjore Kalka",
    "image": "https://silvercareindia.com/hero-doctor.png",
    "telephone": "+918001480075",
    "email": "care@silvercareindia.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pinjore - Kalka Highway Belt",
      "addressLocality": "Pinjore",
      "addressRegion": "Haryana",
      "postalCode": "134102",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.7965,
      "longitude": 76.9168
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
      cityName="Pinjore & Kalka"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="📍 Pinjore • Kalka • HMT Township • Surajpur"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Pinjore & Kalka"
      heroSubtitle="Compassionate in-home senior care and registered nursing support in Pinjore and Kalka. 24/7 skilled attendants, bedside doctor visits, and rehabilitation therapy delivered directly at home."
      stats={[
        { value: "620+", label: "Families Cared" },
        { value: "4.9", label: "Google Rating" },
        { value: "100%", label: "Verified Caregivers" },
        { value: "24/7", label: "Care Assistance" },
      ]}
      services={TOP_PINJORE_SERVICES}
      servicesSectionTitle="Top Ranked Eldercare Services in Pinjore & Kalka"
      servicesSectionSubtitle="Explore comprehensive home healthcare solutions for seniors living in Pinjore, Kalka, and surrounding areas."
      faqs={PINJORE_FAQS}
      sectorHubs={PINJORE_HUBS}
      sectorHubsTitle="Pinjore & Kalka Residential Belts"
      sectorHubsSubtitle="Select your locality to check active caregiver readiness and fast dispatch in Pinjore & Kalka."
      ctaHeading="Need Senior Home Care in Pinjore or Kalka?"
      ctaDescription="Our Panchkula-Pinjore care desk is available 24/7 to assign certified nurses and attendants immediately."
    />
  );
}
