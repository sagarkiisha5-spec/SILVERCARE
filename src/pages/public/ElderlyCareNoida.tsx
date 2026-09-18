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

// Top 8 Ranked Eldercare Services in Noida
const TOP_NOIDA_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-noida",
    title: "24/7 Skilled In-Home Nursing & Attendant Care in Noida",
    badgeTag: "#1 Choice in Noida & Noida Expressway",
    category: "nursing",
    rating: 5.0,
    reviewCount: 510,
    shortDesc: "Hospital-trained 12-hour and 24-hour live-in registered nurses (GNM/B.Sc) and dedicated senior attendants across Noida Sectors 1-168 and Greater Noida.",
    fullDesc: "SilverCare delivers comprehensive in-home eldercare services across Noida. Certified nurses manage medication, IV infusions, post-operative surgical dressings, and bedridden patient support under strict physician oversight.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM/B.Sc Registered Nurses",
      "Vitals Logging, Medication Management & Sugar/BP Monitoring",
      "Tracheostomy, Ryle's Tube Feeding & Catheter Care",
      "Guaranteed 24-Hour Caregiver Replacement across Noida High-Rises"
    ],
    responseTime: "Prompt Same-Day Deployment in Noida",
    coveredSectors: ["Noida Expressway Sectors (128, 137, 93, 143)", "Central Noida (Sectors 50, 62, 74-79)", "Sector 15, 18, 27 & 39", "Greater Noida West (Noida Extension)"],
    recommendedFor: "Bedridden seniors, post-hospitalization recovery & post-operative care.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 2,
    id: "doctor-home-visits-noida",
    title: "Doctor Home Visits & Bedside Geriatric Consultation in Noida",
    badgeTag: "Bedside Medical Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 420,
    shortDesc: "Experienced MBBS and MD geriatric physicians visiting your residence in Noida for complete health checkups, portable ECG, and prescription audits.",
    fullDesc: "Avoid traffic delays and crowded hospital waiting rooms. Our senior doctors conduct detailed bedside examinations, adjust medications, order lab tests, and coordinate continuous chronic disease management.",
    keyFeatures: [
      "Senior MBBS / MD Geriatricians visiting patient's home",
      "Complete Bedside Vitals Check, 12-Lead ECG & Chronic Review",
      "Digital Prescription & Direct Coordination with Home Nurses",
      "Hospital OPD Avoidance for frail and immobile seniors"
    ],
    responseTime: "Scheduled Same-Day Visits Available",
    coveredSectors: ["Sectors 50, 44, 47, 93A", "Expressway Societies", "Sector 62 & 76", "Jaypee Greens"],
    recommendedFor: "Hypertension, diabetes management, dementia evaluation & post-discharge follow-ups.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 3,
    id: "physiotherapy-at-home-noida",
    title: "Specialized Geriatric & Neuro Physiotherapy at Home Noida",
    badgeTag: "Certified Rehab Specialists",
    category: "rehab",
    rating: 4.9,
    reviewCount: 390,
    shortDesc: "Licensed BPT/MPT physiotherapists bringing electrotherapy, ultrasound, and mobility equipment directly to senior homes in Noida.",
    fullDesc: "Restore joint mobility, muscle strength, and balance after knee/hip replacements, fractures, or paralytic strokes. Our physical therapists design customized rehabilitation programs with daily progress tracking.",
    keyFeatures: [
      "Certified MPT/BPT Neuro & Orthopedic Specialists",
      "Portable Ultrasound, TENS & Muscle Stimulator Units",
      "Fall Prevention, Balance Training & Gait Re-education",
      "Post-Knee & Hip Arthroplasty specialized protocols"
    ],
    responseTime: "Within 2 to 4 Hours",
    coveredSectors: ["Noida Expressway", "Sector 50 & 70s Belts", "Greater Noida West", "Sector 137"],
    recommendedFor: "Paralysis recovery, Arthritis pain, Parkinson's mobility & Post-fracture rehab.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 4,
    id: "icu-setup-at-home-noida",
    title: "Hospital-Grade ICU & Critical Care Setup at Home in Noida",
    badgeTag: "Hospital-Grade Critical Care",
    category: "specialized",
    rating: 4.9,
    reviewCount: 260,
    shortDesc: "Complete hospital-grade ICU infrastructure at home with multi-para monitors, ventilators, oxygen concentrators, and ICU nurses in Noida.",
    fullDesc: "Safe transition from hospital ICUs to the warmth of home. SilverCare sets up medical-grade critical care equipment with 24/7 ICU-trained nurses and continuous intensivist oversight.",
    keyFeatures: [
      "Motorized ICU 3-Function / 5-Function Medical Beds",
      "Mechanical Ventilator, BiPAP / CPAP & High-Flow Oxygen Support",
      "5-Para Cardiac Monitors, Syringe Pumps & Suction Machines",
      "24/7 Dedicated Critical Care Qualified Nursing Officers"
    ],
    responseTime: "Emergency 2 to 4-Hour Setup in Noida",
    coveredSectors: ["Entire Noida & Greater Noida", "Expressway High-Rises", "Sector 50", "Sector 137"],
    recommendedFor: "Tracheostomy patients, advanced COPD, coma care, end-stage respiratory care.",
    doctorSupervised: true,
    icon: ShieldCheck,
  },
  {
    rank: 5,
    id: "nri-parent-care-noida",
    title: "NRI Parent Healthcare & Dedicated Care Manager in Noida",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 480,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor checkups, medicines delivery, 24/7 emergency response, and live digital updates for overseas children.",
    fullDesc: "Complete peace of mind for families settled abroad. Our senior care managers personally visit and oversee your parents' health, managing doctor appointments and daily logs.",
    keyFeatures: [
      "Dedicated Senior Clinical Care Manager Assigned",
      "Real-time Digital WhatsApp Health Reports & Doctor Tele-Reviews",
      "Doorstep Medicine Refills, Lab Tests & Hospital Escort",
      "24/7 Priority Emergency Evacuation across Noida & Delhi NCR"
    ],
    responseTime: "Instant Global Onboarding",
    coveredSectors: ["All Noida High-Rise Societies", "Sector 50", "Noida Expressway", "Sector 137"],
    recommendedFor: "Aging parents residing independently in Noida with adult children overseas.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 6,
    id: "dementia-alzheimers-care-noida",
    title: "Specialized Dementia & Alzheimer's Memory Care Noida",
    badgeTag: "Memory Care Specialist",
    category: "specialized",
    rating: 4.8,
    reviewCount: 310,
    shortDesc: "Compassionate memory care specialists certified in cognitive stimulation, high-rise balcony/door anti-wandering protocols, and dementia behavioral management.",
    fullDesc: "Managing dementia in high-rise societies requires safety protocols to prevent elevator wandering and balcony hazards. SilverCare's memory caregivers provide 24/7 reassuring supervision.",
    keyFeatures: [
      "High-Rise Apartment Balcony & Door Anti-Wandering Protocols",
      "Cognitive Stimulation Therapy & Memory Orientation Games",
      "Gentle Behavioral Management & Emotional Reassurance",
      "Caregiver Respite & Family Counseling Support"
    ],
    responseTime: "Fast Caregiver Placement",
    coveredSectors: ["All Noida Societies", "Noida Expressway", "Sector 74-79", "Sector 50"],
    recommendedFor: "Seniors with Alzheimer's, Parkinson's disease, or age-related memory decline.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 7,
    id: "pathology-diagnostics-noida",
    title: "Doorstep Pathology & Diagnostic Blood Sample Collection Noida",
    badgeTag: "NABL Accredited Labs",
    category: "clinical",
    rating: 4.8,
    reviewCount: 360,
    shortDesc: "Painless home sample collection for Complete Senior Health Profiles, Diabetes, Thyroid, Lipid, KFT, LFT with digital reports in 6 hours.",
    fullDesc: "Skip crowded clinics. Certified phlebotomists collect blood and urine samples at your Noida residence with sterile equipment and NABL-accredited processing.",
    keyFeatures: [
      "Painless Blood & Urine Sample Collection at Home",
      "Complete Senior Citizen Health Screening Panels",
      "NABL & ICMR Accredited Diagnostic Labs",
      "Digital WhatsApp & Email Report Delivery in 6 Hours"
    ],
    responseTime: "Morning Slots from 6:30 AM",
    coveredSectors: ["All Noida Sectors", "Noida Expressway", "Greater Noida West"],
    recommendedFor: "Quarterly diabetic reviews, senior health checks, bedridden routine tests.",
    doctorSupervised: true,
    icon: Sparkles,
  },
  {
    rank: 8,
    id: "senior-companionship-noida",
    title: "Senior Companionship & High-Rise Society Assistance Noida",
    badgeTag: "Emotional Wellness",
    category: "support",
    rating: 4.8,
    reviewCount: 230,
    shortDesc: "Warm, educated companions for morning walks inside gated societies, grocery shopping, club accompaniment, and doctor escorts in Noida.",
    fullDesc: "Combat senior isolation in multi-storey apartments. Our verified companions keep elderly parents mentally engaged, active, and safe during daily outings or reading.",
    keyFeatures: [
      "Accompaniment for Walks in Society Podium Parks",
      "Escort to Clinics, Supermarkets & Bank Visits",
      "Mental Stimulation Games, Reading & Smartphone Assistance",
      "Empathetic Friendship & Daily Activity Assistance"
    ],
    responseTime: "Same-Day Deployment",
    coveredSectors: ["Noida Expressway", "Sector 50", "Sector 137", "Sector 76"],
    recommendedFor: "Independent seniors seeking social engagement and assistance with outside errands.",
    doctorSupervised: false,
    icon: UserCheck,
  }
];

// Noida Residential Hubs
const NOIDA_HUBS: LocationHub[] = [
  { name: "Noida Expressway (Sec 128, 137, 93, 143)", status: "Active Care Hub", coverage: "Daily Skilled Nursing & Attendant Care" },
  { name: "Central Noida (Sectors 50, 51, 62, 70s)", status: "Active Care Hub", coverage: "Bedside Doctor Checkups & Home Physio" },
  { name: "Sector 15, 18, 27, 29 & 39 Belts", status: "Active Care Hub", coverage: "24/7 Live-In Caregivers & Dementia Care" },
  { name: "Greater Noida West (Noida Extension)", status: "Active Care Hub", coverage: "ICU Equipment Setup & Phlebotomy" },
  { name: "Jaypee Greens & Pari Chowk (Gr. Noida)", status: "Active Care Hub", coverage: "Rapid Caregiver Deployment" },
  { name: "Sectors 74, 75, 76, 77, 78 & 79", status: "Active Care Hub", coverage: "Geriatric Physio & Nursing" }
];

// FAQs for Noida Eldercare
const NOIDA_FAQS: LocationFAQ[] = [
  {
    q: "How fast can SilverCare deploy an in-home nurse in Noida high-rise societies?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with prompt same-day availability to any high-rise society across the Noida Expressway, Central Noida, and Greater Noida."
  },
  {
    q: "Do you provide doctor home visits for seniors in Noida?",
    a: "Yes. Our senior MBBS and MD geriatric physicians conduct bedside consultations, 12-lead ECG checks, and chronic care management across all Noida sectors."
  },
  {
    q: "Can SilverCare look after NRI parents living independently in Noida?",
    a: "Yes! Many NRI families in the USA, Canada, UK, and Australia trust SilverCare. Our local care managers coordinate doctor visits, medicine delivery, and provide real-time updates to family members abroad."
  },
  {
    q: "Can you provide medical ICU equipment on rent at home in Noida?",
    a: "Yes, SilverCare supplies hospital-grade motorized beds, oxygen concentrators, BiPAP/CPAP machines, and multi-para monitors with complete home installation."
  }
];

export default function ElderlyCareNoida() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-noida";
  const pageTitle = "Best Elderly Healthcare Services in Noida (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Noida. 24/7 verified in-home nursing, doctor home visits, geriatric physiotherapy, home ICU setup & NRI parent support across Noida Expressway, Sector 50 & Greater Noida.";
  const keywords = "Best elderly healthcare services in Noida, home nursing Noida, doctor visit at home Noida, Noida Expressway eldercare, Sector 50 senior care, Sector 137 caregiver, home ICU setup Noida, SilverCare Noida";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare India - Eldercare & Senior Home Healthcare Noida",
    "image": "https://silvercareindia.com/hero-doctor.png",
    "telephone": "+918001480075",
    "email": "care@silvercareindia.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Noida & Greater Noida Hub",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201301",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.5355,
      "longitude": 77.3910
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
      cityName="Noida"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="🏆 Top-Ranked Senior Healthcare Provider in Noida"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Noida"
      heroSubtitle="SilverCare brings hospital-standard 24/7 home nursing, senior MD doctor visits, high-rise lift assistance & NRI parent concierge across Noida Expressway, Sector 50, Sector 137 & Greater Noida."
      stats={[
        { value: "1,650+", label: "Noida Families Cared" },
        { value: "4.9", label: "Google Rating" },
        { value: "100%", label: "Verified Caregivers" },
        { value: "24/7", label: "Care Assistance" },
      ]}
      services={TOP_NOIDA_SERVICES}
      servicesSectionTitle="Top Rated Elderly Healthcare Services in Noida"
      servicesSectionSubtitle="Showing verified, clinical-grade home healthcare solutions ranked by family ratings, clinical excellence, and rapid response standards in Noida."
      faqs={NOIDA_FAQS}
      sectorHubs={NOIDA_HUBS}
      sectorHubsTitle="Noida Sector Coverage & Gated Societies"
      sectorHubsSubtitle="Select your sector or residential society below to check active caregiver readiness and fast dispatch in Noida."
      ctaHeading="Give Your Loved Ones the Dignified Healthcare They Deserve in Noida"
      ctaDescription="Contact SilverCare today to speak directly with our Senior Clinical Care Team and arrange a comprehensive home healthcare assessment anywhere in Noida."
    />
  );
}
