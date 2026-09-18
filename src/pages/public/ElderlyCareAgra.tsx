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

// Top 8 Ranked Eldercare Services in Agra
const TOP_AGRA_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-agra",
    title: "24/7 Skilled In-Home Nursing & Attendant Care in Agra",
    badgeTag: "#1 Choice in Agra & Sanjay Place",
    category: "nursing",
    rating: 5.0,
    reviewCount: 420,
    shortDesc: "Hospital-trained 12-hour and 24-hour live-in registered nurses (GNM/B.Sc) and dedicated senior caregivers across Sanjay Place, Dayalbagh, Kamla Nagar & Fatehabad Road.",
    fullDesc: "SilverCare brings trusted hospital-standard nursing care to homes across Agra. Certified nurses assist with post-surgical recovery, vitals tracking, injections, wound dressing, and bedside comfort under strict doctor supervision.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM/B.Sc Registered Nurses",
      "Vitals Logging, Medication Management & Sugar/BP Monitoring",
      "Tracheostomy, Catheterization & Mobility Support",
      "Reliable Caregiver Replacement Guarantee across Agra"
    ],
    responseTime: "Prompt Same-Day Deployment in Agra",
    coveredSectors: ["Sanjay Place", "Dayalbagh", "Kamla Nagar", "Fatehabad Road", "Civil Lines Agra", "Tajganj & Sikandra"],
    recommendedFor: "Bedridden seniors, post-stroke recovery, chronic care support.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 2,
    id: "doctor-home-visits-agra",
    title: "Doctor Home Visits & Senior Health Checkups in Agra",
    badgeTag: "Doorstep Medical Consultation",
    category: "clinical",
    rating: 4.9,
    reviewCount: 350,
    shortDesc: "Experienced MBBS and MD geriatric physicians visiting your residence in Agra for bedside examinations, portable ECG, and prescription audits.",
    fullDesc: "Avoid crowded hospital OPDs. Our senior doctors conduct thorough bedside clinical checkups, review prescription medications, and guide family members right at home in Agra.",
    keyFeatures: [
      "Senior MBBS / MD Geriatricians visiting patient's home",
      "Comprehensive Bedside Clinical Review & Vitals Assessment",
      "Direct Guidance for Home Nursing Attendants",
      "Convenient consultation for elderly with mobility limits"
    ],
    responseTime: "Scheduled Same-Day Visits Available",
    coveredSectors: ["Sanjay Place", "Dayalbagh", "Kamla Nagar", "Fatehabad Road"],
    recommendedFor: "Hypertension, chronic diabetes, post-discharge review.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 3,
    id: "physiotherapy-at-home-agra",
    title: "Home Physiotherapy & Senior Mobility Therapy Agra",
    badgeTag: "Certified Rehab Specialists",
    category: "rehab",
    rating: 4.9,
    reviewCount: 310,
    shortDesc: "Licensed BPT/MPT physiotherapists bringing electrotherapy, gait training, and mobility equipment to senior homes in Agra.",
    fullDesc: "Restore walking confidence and joint flexibility without traveling across town. Our therapists provide personalized exercise programs and electrotherapy at home.",
    keyFeatures: [
      "Certified MPT/BPT Neuro & Orthopedic Specialists",
      "Post-Knee & Hip Arthroplasty specialized recovery",
      "Portable Ultrasound & TENS electrotherapy machines",
      "Gait retraining, fall prevention & balance enhancement"
    ],
    responseTime: "Within 2 to 4 Hours",
    coveredSectors: ["Entire Agra", "Dayalbagh", "Kamla Nagar", "Sikandra"],
    recommendedFor: "Joint pain, post-fracture recovery, elderly balance issues.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 4,
    id: "icu-setup-at-home-agra",
    title: "Hospital-Grade ICU & Critical Care Setup at Home in Agra",
    badgeTag: "Critical Care Excellence",
    category: "specialized",
    rating: 4.9,
    reviewCount: 190,
    shortDesc: "Complete hospital-grade ICU infrastructure at home with multi-para monitors, ventilators, and 24/7 critical care nurses in Agra.",
    fullDesc: "Safe transition from hospital ICUs to home. SilverCare sets up medical-grade critical care equipment with 24/7 ICU-trained nurses and continuous intensivist oversight.",
    keyFeatures: [
      "Motorized ICU 3-Function & 5-Function Medical Beds",
      "Mechanical Ventilators, BiPAP / CPAP & High-Flow Oxygen Support",
      "5-Para Cardiac Monitors, Syringe Pumps & Suction Machines",
      "24/7 Dedicated Critical Care Qualified Nursing Officers"
    ],
    responseTime: "Emergency 2 to 4-Hour Deployment",
    coveredSectors: ["All Residential Localities in Agra", "Sanjay Place", "Dayalbagh"],
    recommendedFor: "Tracheostomy patients, advanced COPD, coma care, end-stage respiratory care.",
    doctorSupervised: true,
    icon: ShieldCheck,
  },
  {
    rank: 5,
    id: "nri-parent-care-agra",
    title: "NRI Parent Healthcare & Dedicated Care Manager in Agra",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 370,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor checkups, medicines delivery, 24/7 emergency response, and live digital updates for overseas children.",
    fullDesc: "Complete peace of mind for families settled abroad. Our senior care managers personally visit and oversee your parents' health in Agra, managing doctor appointments and daily logs.",
    keyFeatures: [
      "Dedicated Senior Clinical Care Manager Assigned",
      "Real-time Digital WhatsApp Health Reports & Doctor Tele-Reviews",
      "Doorstep Medicine Refills, Lab Tests & Hospital Escort",
      "24/7 Priority Emergency Evacuation across Agra & NCR"
    ],
    responseTime: "Instant Global Onboarding",
    coveredSectors: ["Sanjay Place", "Dayalbagh", "Kamla Nagar", "Civil Lines"],
    recommendedFor: "Aging parents residing independently in Agra with adult children overseas.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 6,
    id: "pathology-diagnostics-agra",
    title: "Doorstep Pathology & Diagnostic Blood Sample Collection Agra",
    badgeTag: "NABL Accredited Labs",
    category: "clinical",
    rating: 4.8,
    reviewCount: 280,
    shortDesc: "Painless home sample collection for Complete Senior Health Profiles, Diabetes, Thyroid, Lipid, KFT, LFT with digital reports in 6 hours.",
    fullDesc: "Skip diagnostic clinic queues. Certified phlebotomists collect blood and urine samples at your Agra residence with sterile equipment and NABL-accredited processing.",
    keyFeatures: [
      "Painless Blood & Urine Sample Collection at Home",
      "Complete Senior Citizen Health Screening Panels",
      "NABL & ICMR Accredited Diagnostic Labs",
      "Digital WhatsApp & Email Report Delivery in 6 Hours"
    ],
    responseTime: "Morning Slots from 6:30 AM",
    coveredSectors: ["All Agra Localities", "Dayalbagh", "Kamla Nagar"],
    recommendedFor: "Quarterly diabetic reviews, senior health checks, bedridden routine tests.",
    doctorSupervised: true,
    icon: Sparkles,
  },
  {
    rank: 7,
    id: "dementia-alzheimers-care-agra",
    title: "Specialized Dementia & Alzheimer's Memory Care Agra",
    badgeTag: "Memory Care Specialist",
    category: "specialized",
    rating: 4.8,
    reviewCount: 210,
    shortDesc: "Compassionate memory care specialists certified in cognitive stimulation, door anti-wandering protocols, and dementia behavioral management.",
    fullDesc: "Managing dementia requires patience and safety routines. SilverCare's dementia caregivers provide cognitive therapy, emotional reassurance, and safety routines tailored for elders with memory decline.",
    keyFeatures: [
      "Door & Balcony Anti-Wandering Protocols",
      "Cognitive Stimulation Therapy & Memory Orientation Games",
      "Gentle Behavioral Management & Emotional Reassurance",
      "Caregiver Respite & Family Counseling Support"
    ],
    responseTime: "Fast Caregiver Placement",
    coveredSectors: ["All Agra Sectors", "Kamla Nagar", "Civil Lines"],
    recommendedFor: "Seniors with Alzheimer's, Parkinson's disease, or age-related memory decline.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 8,
    id: "senior-companionship-agra",
    title: "Senior Companionship, Errands & Outing Assistance Agra",
    badgeTag: "Emotional Wellness",
    category: "support",
    rating: 4.8,
    reviewCount: 190,
    shortDesc: "Warm, educated companions for morning walks in colony parks, grocery shopping, temple accompaniment, and doctor escorts in Agra.",
    fullDesc: "Combat senior loneliness and isolation. Our verified companions keep elderly parents mentally engaged, active, and safe during daily outings or reading.",
    keyFeatures: [
      "Accompaniment for Walks in Local Parks & Gardens",
      "Escort to Clinics, Supermarkets & Bank Visits",
      "Mental Stimulation Games, Reading & Smartphone Assistance",
      "Empathetic Friendship & Daily Activity Assistance"
    ],
    responseTime: "Same-Day Deployment",
    coveredSectors: ["Sanjay Place", "Dayalbagh", "Civil Lines"],
    recommendedFor: "Independent seniors seeking social engagement and assistance with outside errands.",
    doctorSupervised: false,
    icon: UserCheck,
  }
];

// Agra Residential Hubs
const AGRA_HUBS: LocationHub[] = [
  { name: "Sanjay Place & Civil Lines", status: "Active Care Hub", coverage: "Daily Skilled Nursing & Attendant Care" },
  { name: "Dayalbagh & Sikandra Belt", status: "Active Care Hub", coverage: "Bedside Doctor Checkups & Home Physio" },
  { name: "Kamla Nagar & Balkeshwar", status: "Active Care Hub", coverage: "24/7 Live-In Caregivers & Dementia Care" },
  { name: "Fatehabad Road & Tajganj", status: "Active Care Hub", coverage: "ICU Equipment Setup & Phlebotomy" },
  { name: "Khandari & Shahganj Areas", status: "Active Care Hub", coverage: "Rapid Caregiver Deployment" }
];

// FAQs for Agra Eldercare
const AGRA_FAQS: LocationFAQ[] = [
  {
    q: "How quickly can SilverCare deploy an in-home nurse in Agra?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with prompt same-day availability across Sanjay Place, Dayalbagh, Kamla Nagar, Fatehabad Road, and all Agra localities."
  },
  {
    q: "Do you provide doctor home visits for seniors in Agra?",
    a: "Yes. Our senior MBBS and MD geriatric physicians conduct bedside consultations, 12-lead ECG checks, and chronic care management across all Agra neighborhoods."
  },
  {
    q: "Can SilverCare look after NRI parents living independently in Agra?",
    a: "Yes! Many NRI families trust SilverCare. Our local care managers coordinate doctor visits, medicine delivery, and provide real-time updates to family members abroad."
  },
  {
    q: "Can you provide medical ICU equipment on rent at home in Agra?",
    a: "Yes, SilverCare supplies hospital-grade motorized beds, oxygen concentrators, BiPAP/CPAP machines, and multi-para monitors with complete home installation in Agra."
  }
];

export default function ElderlyCareAgra() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-agra";
  const pageTitle = "Best Elderly Healthcare Services in Agra (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Agra. 24/7 verified in-home nursing, doctor home visits, geriatric physiotherapy, home ICU setup & NRI parent support across Sanjay Place, Dayalbagh & Kamla Nagar.";
  const keywords = "Best elderly healthcare services in Agra, home nursing Agra, doctor visit at home Agra, Sanjay Place Agra eldercare, Dayalbagh Agra caregiver, home ICU setup Agra, SilverCare Agra";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare India - Eldercare & Senior Home Healthcare Agra",
    "image": "https://silvercareindia.com/hero-doctor.png",
    "telephone": "+918001480075",
    "email": "care@silvercareindia.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Agra Operations Hub",
      "addressLocality": "Agra",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "282001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.1767,
      "longitude": 78.0081
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
      cityName="Agra"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="🏆 Top-Ranked Senior Healthcare Provider in Agra"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Agra"
      heroSubtitle="SilverCare brings hospital-standard 24/7 home nursing, senior MD doctor visits, post-hospitalization rehab & NRI parent concierge across Sanjay Place, Dayalbagh, Kamla Nagar & Fatehabad Road."
      stats={[
        { value: "1,200+", label: "Agra Families Cared" },
        { value: "4.9", label: "Google Rating" },
        { value: "100%", label: "Verified Caregivers" },
        { value: "24/7", label: "Care Assistance" },
      ]}
      services={TOP_AGRA_SERVICES}
      servicesSectionTitle="Top Rated Elderly Healthcare Services in Agra"
      servicesSectionSubtitle="Showing verified, clinical-grade home healthcare solutions ranked by family ratings, clinical excellence, and rapid response standards in Agra."
      faqs={AGRA_FAQS}
      sectorHubs={AGRA_HUBS}
      sectorHubsTitle="Agra Residential Hubs & Colonies"
      sectorHubsSubtitle="Select your locality or residential colony below to check active caregiver readiness and fast dispatch in Agra."
      ctaHeading="Give Your Loved Ones the Dignified Healthcare They Deserve in Agra"
      ctaDescription="Contact SilverCare today to speak directly with our Senior Clinical Care Team and arrange a comprehensive home healthcare assessment anywhere in Agra."
    />
  );
}
