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

// Top 8 Ranked Eldercare Services in Faridabad
const TOP_FARIDABAD_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-faridabad",
    title: "24/7 Skilled In-Home Nursing & Attendant Care in Faridabad",
    badgeTag: "#1 Choice in Faridabad & Neharpar",
    category: "nursing",
    rating: 5.0,
    reviewCount: 430,
    shortDesc: "Hospital-trained 12-hour and 24-hour live-in registered nurses (GNM/B.Sc) and dedicated senior caregivers across Sectors 14-21, Green Field Colony & Greater Faridabad.",
    fullDesc: "SilverCare provides premier home nursing services across Faridabad. Certified nurses manage medication, IV infusions, post-operative surgical dressings, and bedridden patient support under strict physician supervision.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM/B.Sc Registered Nurses",
      "Vitals Logging, Medication Management & Sugar/BP Monitoring",
      "Tracheostomy, Ryle's Tube Feeding & Catheter Care",
      "Guaranteed Caregiver Replacement across All Faridabad Sectors"
    ],
    responseTime: "Prompt Same-Day Deployment in Faridabad",
    coveredSectors: ["Sectors 14, 15, 16 & 17", "Sectors 19, 21 & 28", "Green Field Colony & Charmwood", "Greater Faridabad (Neharpar Sectors 75-89)", "NIT Faridabad"],
    recommendedFor: "Bedridden seniors, post-hospitalization recovery & post-operative care.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 2,
    id: "doctor-home-visits-faridabad",
    title: "Doctor Home Visits & Bedside Geriatric Consultation in Faridabad",
    badgeTag: "Bedside Medical Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 380,
    shortDesc: "Experienced MBBS and MD geriatric physicians visiting your residence in Faridabad for comprehensive health checkups, portable ECG, and prescription reviews.",
    fullDesc: "Save senior parents from congested traffic and long hospital queues. Our senior doctors conduct detailed bedside examinations, adjust medications, order necessary tests, and coordinate continuous chronic care.",
    keyFeatures: [
      "Senior MBBS / MD Geriatricians visiting patient's home",
      "Complete Bedside Vitals Check, 12-Lead ECG & Chronic Review",
      "Digital Prescription & Direct Coordination with Home Nurses",
      "Hospital OPD Avoidance for frail and immobile seniors"
    ],
    responseTime: "Scheduled Same-Day Visits Available",
    coveredSectors: ["Sectors 14-17", "Sector 21 & 28", "Green Field", "Neharpar"],
    recommendedFor: "Hypertension, diabetes management, dementia evaluation & post-discharge follow-ups.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 3,
    id: "physiotherapy-at-home-faridabad",
    title: "Specialized Geriatric & Neuro Physiotherapy at Home Faridabad",
    badgeTag: "Certified Rehab Specialists",
    category: "rehab",
    rating: 4.9,
    reviewCount: 340,
    shortDesc: "Licensed BPT/MPT physiotherapists bringing electrotherapy, ultrasound, and mobility equipment directly to senior homes in Faridabad.",
    fullDesc: "Restore joint mobility, muscle strength, and balance after knee/hip replacements, fractures, or paralytic strokes. Our physical therapists design customized rehabilitation programs with daily progress tracking.",
    keyFeatures: [
      "Certified MPT/BPT Neuro & Orthopedic Specialists",
      "Portable Ultrasound, TENS & Muscle Stimulator Units",
      "Fall Prevention, Balance Training & Gait Re-education",
      "Post-Knee & Hip Arthroplasty specialized protocols"
    ],
    responseTime: "Within 2 to 4 Hours",
    coveredSectors: ["Entire Faridabad", "Sectors 14-21", "Neharpar", "Charmwood Village"],
    recommendedFor: "Paralysis recovery, Arthritis pain, Parkinson's mobility & Post-fracture rehab.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 4,
    id: "icu-setup-at-home-faridabad",
    title: "Hospital-Grade ICU & Critical Care Setup at Home in Faridabad",
    badgeTag: "Hospital-Grade Critical Care",
    category: "specialized",
    rating: 4.9,
    reviewCount: 210,
    shortDesc: "Complete hospital-grade ICU infrastructure at home with multi-para monitors, ventilators, oxygen concentrators, and ICU nurses in Faridabad.",
    fullDesc: "Safe transition from hospital ICUs (Amrita, Fortis, Sarvodaya, Metro) to the warmth of home. SilverCare sets up medical-grade critical care equipment with 24/7 ICU-trained nurses and continuous intensivist oversight.",
    keyFeatures: [
      "Motorized ICU 3-Function / 5-Function Medical Beds",
      "Mechanical Ventilator, BiPAP / CPAP & High-Flow Oxygen Support",
      "5-Para Cardiac Monitors, Syringe Pumps & Suction Machines",
      "24/7 Dedicated Critical Care Qualified Nursing Officers"
    ],
    responseTime: "Emergency 2 to 4-Hour Setup in Faridabad",
    coveredSectors: ["All Faridabad Sectors", "Greater Faridabad", "Green Field Colony"],
    recommendedFor: "Tracheostomy patients, advanced COPD, coma care, end-stage respiratory care.",
    doctorSupervised: true,
    icon: ShieldCheck,
  },
  {
    rank: 5,
    id: "nri-parent-care-faridabad",
    title: "NRI Parent Healthcare & Dedicated Care Manager in Faridabad",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 390,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor checkups, medicines delivery, 24/7 emergency response, and live digital updates for overseas children.",
    fullDesc: "Peace of mind for families settled abroad. Our senior care managers personally visit and oversee your parents' health in Faridabad, managing doctor consultations, medication refills, and daily updates.",
    keyFeatures: [
      "Dedicated Senior Clinical Care Manager Assigned",
      "Real-time Digital WhatsApp Health Reports & Doctor Tele-Reviews",
      "Doorstep Medicine Refills, Lab Tests & Hospital Escort",
      "24/7 Priority Emergency Evacuation across Faridabad & NCR"
    ],
    responseTime: "Instant Global Onboarding",
    coveredSectors: ["Sectors 14-17", "Sector 21", "Charmwood Village", "Green Field"],
    recommendedFor: "Aging parents residing independently in Faridabad with adult children overseas.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 6,
    id: "dementia-alzheimers-care-faridabad",
    title: "Specialized Dementia & Alzheimer's Memory Care Faridabad",
    badgeTag: "Memory Care Specialist",
    category: "specialized",
    rating: 4.8,
    reviewCount: 260,
    shortDesc: "Compassionate memory care specialists certified in cognitive stimulation, door anti-wandering protocols, and dementia behavioral management.",
    fullDesc: "Managing dementia requires patience and safety routines. SilverCare's dementia caregivers provide cognitive therapy, emotional reassurance, and safety routines tailored for elders with memory decline.",
    keyFeatures: [
      "Door & Balcony Anti-Wandering Protocols",
      "Cognitive Stimulation Therapy & Memory Orientation Games",
      "Gentle Behavioral Management & Emotional Reassurance",
      "Caregiver Respite & Family Counseling Support"
    ],
    responseTime: "Fast Caregiver Placement",
    coveredSectors: ["All Faridabad Sectors", "Neharpar", "NIT Faridabad"],
    recommendedFor: "Seniors with Alzheimer's, Parkinson's disease, or age-related memory decline.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 7,
    id: "pathology-diagnostics-faridabad",
    title: "Doorstep Pathology & Diagnostic Blood Sample Collection Faridabad",
    badgeTag: "NABL Accredited Labs",
    category: "clinical",
    rating: 4.8,
    reviewCount: 310,
    shortDesc: "Painless home sample collection for Complete Senior Health Profiles, Diabetes, Thyroid, Lipid, KFT, LFT with digital reports in 6 hours.",
    fullDesc: "Skip diagnostic clinic queues. Certified phlebotomists collect blood and urine samples at your Faridabad residence with sterile equipment and NABL-accredited processing.",
    keyFeatures: [
      "Painless Blood & Urine Sample Collection at Home",
      "Complete Senior Citizen Health Screening Panels",
      "NABL & ICMR Accredited Diagnostic Labs",
      "Digital WhatsApp & Email Report Delivery in 6 Hours"
    ],
    responseTime: "Morning Slots from 6:30 AM",
    coveredSectors: ["All Faridabad Sectors", "Greater Faridabad", "Green Field"],
    recommendedFor: "Quarterly diabetic reviews, senior health checks, bedridden routine tests.",
    doctorSupervised: true,
    icon: Sparkles,
  },
  {
    rank: 8,
    id: "senior-companionship-faridabad",
    title: "Senior Companionship, Errands & Outing Assistance Faridabad",
    badgeTag: "Emotional Wellness",
    category: "support",
    rating: 4.8,
    reviewCount: 200,
    shortDesc: "Warm, educated companions for morning walks in colony parks, grocery shopping, club accompaniment, and doctor escorts in Faridabad.",
    fullDesc: "Combat senior loneliness and isolation. Our verified companions keep elderly parents mentally engaged, active, and safe during daily outings or reading.",
    keyFeatures: [
      "Accompaniment for Walks in Sector Parks",
      "Escort to Clinics, Supermarkets & Bank Visits",
      "Mental Stimulation Games, Reading & Smartphone Assistance",
      "Empathetic Friendship & Daily Activity Assistance"
    ],
    responseTime: "Same-Day Deployment",
    coveredSectors: ["Sectors 14-21", "Charmwood Village", "Green Field"],
    recommendedFor: "Independent seniors seeking social engagement and assistance with outside errands.",
    doctorSupervised: false,
    icon: UserCheck,
  }
];

// Faridabad Residential Hubs
const FARIDABAD_HUBS: LocationHub[] = [
  { name: "Sectors 14, 15, 16 & 17 (VIP Belt)", status: "Active Care Hub", coverage: "Daily Skilled Nursing & Attendant Care" },
  { name: "Sectors 19, 21A-D & Sector 28", status: "Active Care Hub", coverage: "Bedside Doctor Checkups & Home Physio" },
  { name: "Green Field Colony & Charmwood Village", status: "Active Care Hub", coverage: "24/7 Live-In Caregivers & Dementia Care" },
  { name: "Greater Faridabad (Neharpar Sec 75-89)", status: "Active Care Hub", coverage: "ICU Equipment Setup & Phlebotomy" },
  { name: "NIT Faridabad (1, 2, 3, 4 & 5)", status: "Active Care Hub", coverage: "Home Health Checkups & Attendants" },
  { name: "Sectors 29, 30, 31 & 37 Belts", status: "Active Care Hub", coverage: "Rapid Caregiver Deployment" }
];

// FAQs for Faridabad Eldercare
const FARIDABAD_FAQS: LocationFAQ[] = [
  {
    q: "How quickly can SilverCare deploy an in-home nurse in Faridabad?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with prompt same-day availability across Sectors 14-21, Green Field, and Greater Faridabad."
  },
  {
    q: "Do you provide doctor home visits for seniors in Faridabad?",
    a: "Yes. Our senior MBBS and MD geriatric physicians conduct bedside consultations, 12-lead ECG checks, and chronic care management across all Faridabad sectors."
  },
  {
    q: "Can SilverCare assist with step-down ICU care after discharge from Amrita, Fortis or Sarvodaya hospital?",
    a: "Yes. We coordinate directly with hospital discharge teams to install motorized ICU beds, ventilators, cardiac monitors, and assign 24/7 ICU nurses before the patient arrives home."
  },
  {
    q: "Can you look after NRI parents living independently in Faridabad?",
    a: "Yes! Many NRI families trust SilverCare. Our local care managers coordinate doctor visits, medicine delivery, and provide real-time WhatsApp updates to family members abroad."
  }
];

export default function ElderlyCareFaridabad() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-faridabad";
  const pageTitle = "Best Elderly Healthcare Services in Faridabad (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Faridabad. 24/7 verified in-home nursing, doctor home visits, geriatric physiotherapy, home ICU setup & NRI parent support across Sectors 14-21, Green Field & Greater Faridabad.";
  const keywords = "Best elderly healthcare services in Faridabad, home nursing Faridabad, doctor visit at home Faridabad, Sector 15 Faridabad eldercare, Green Field Colony senior care, Neharpar caregiver, home ICU setup Faridabad, SilverCare Faridabad";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare India - Eldercare & Senior Home Healthcare Faridabad",
    "image": "https://silvercareindia.com/hero-doctor.png",
    "telephone": "+918001480075",
    "email": "care@silvercareindia.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Faridabad & Greater Faridabad Hub",
      "addressLocality": "Faridabad",
      "addressRegion": "Haryana",
      "postalCode": "121001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.4089,
      "longitude": 77.3178
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
      cityName="Faridabad"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="🏆 Top-Ranked Senior Healthcare Provider in Faridabad"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Faridabad"
      heroSubtitle="SilverCare brings hospital-standard 24/7 home nursing, senior MD doctor visits, post-hospitalization rehab & NRI parent concierge across Sectors 14-21, Green Field, Charmwood & Greater Faridabad."
      stats={[
        { value: "1,450+", label: "Faridabad Families Cared" },
        { value: "4.9", label: "Google Rating" },
        { value: "100%", label: "Verified Caregivers" },
        { value: "24/7", label: "Care Assistance" },
      ]}
      services={TOP_FARIDABAD_SERVICES}
      servicesSectionTitle="Top Rated Elderly Healthcare Services in Faridabad"
      servicesSectionSubtitle="Showing verified, clinical-grade home healthcare solutions ranked by family ratings, clinical excellence, and rapid response standards in Faridabad."
      faqs={FARIDABAD_FAQS}
      sectorHubs={FARIDABAD_HUBS}
      sectorHubsTitle="Faridabad Sector Coverage & Residential Hubs"
      sectorHubsSubtitle="Select your sector or residential locality below to check active caregiver readiness and fast dispatch in Faridabad."
      ctaHeading="Give Your Loved Ones the Dignified Healthcare They Deserve in Faridabad"
      ctaDescription="Contact SilverCare today to speak directly with our Senior Clinical Care Team and arrange a comprehensive home healthcare assessment anywhere in Faridabad."
    />
  );
}
