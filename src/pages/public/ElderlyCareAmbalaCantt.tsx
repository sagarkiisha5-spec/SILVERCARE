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

// Top 6 Ranked Eldercare Services in Ambala Cantt
const TOP_AMBALA_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-ambala",
    title: "24/7 Skilled In-Home Nursing & Attendant Care in Ambala Cantt",
    badgeTag: "#1 Choice in Ambala & Defence Colony",
    category: "nursing",
    rating: 5.0,
    reviewCount: 350,
    shortDesc: "Hospital-trained 12-hour and 24-hour live-in registered nurses (GNM/B.Sc) and dedicated senior attendants across Ambala Cantt, Defence Colony, Sadar Bazaar & Model Town.",
    fullDesc: "SilverCare brings trusted hospital-standard nursing care to Ambala Cantt and Ambala City. Certified nurses assist with post-surgical recovery, vitals tracking, injections, wound dressing, and bedside comfort under strict doctor supervision.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM/B.Sc Registered Nurses",
      "Vitals Logging, Medication Management & Sugar/BP Monitoring",
      "Tracheostomy, Catheterization & Mobility Support",
      "Reliable Caregiver Replacement Guarantee across Ambala"
    ],
    responseTime: "Prompt Same-Day Deployment in Ambala",
    coveredSectors: ["Defence Colony Ambala", "Sadar Bazaar & Nicholson Road", "Model Town Ambala City", "Babyal & Mahesh Nagar", "Staff Road & Military Area", "GT Road Belts"],
    recommendedFor: "Bedridden seniors, veteran officers, post-stroke recovery, chronic care support.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 2,
    id: "doctor-home-visits-ambala",
    title: "Doctor Home Visits & Senior Health Checkups in Ambala Cantt",
    badgeTag: "Doorstep Medical Consultation",
    category: "clinical",
    rating: 4.9,
    reviewCount: 290,
    shortDesc: "Experienced MBBS and MD geriatric physicians visiting your residence in Ambala for bedside clinical checkups, portable ECG, and prescription audits.",
    fullDesc: "Avoid traffic delays and hospital queues. Our senior doctors conduct thorough bedside clinical checkups, review prescription medications, and guide family members right at home.",
    keyFeatures: [
      "Senior MBBS / MD Geriatricians visiting patient's home",
      "Comprehensive Bedside Clinical Review & Vitals Assessment",
      "Direct Guidance for Home Nursing Attendants",
      "Convenient consultation for elderly with mobility limits"
    ],
    responseTime: "Scheduled Same-Day Visits Available",
    coveredSectors: ["Defence Colony", "Sadar Bazaar", "Model Town", "Mahesh Nagar"],
    recommendedFor: "Hypertension, chronic diabetes, post-discharge review.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 3,
    id: "physiotherapy-at-home-ambala",
    title: "Home Physiotherapy & Senior Mobility Therapy Ambala",
    badgeTag: "Certified Rehab Specialists",
    category: "rehab",
    rating: 4.9,
    reviewCount: 270,
    shortDesc: "Licensed BPT/MPT physiotherapists bringing electrotherapy, gait training, and mobility equipment to senior homes in Ambala Cantt.",
    fullDesc: "Restore walking confidence and joint flexibility without traveling to Chandigarh. Our therapists provide personalized exercise programs and electrotherapy at home.",
    keyFeatures: [
      "Certified MPT/BPT Neuro & Orthopedic Specialists",
      "Post-Knee & Hip Arthroplasty specialized recovery",
      "Portable Ultrasound & TENS electrotherapy machines",
      "Gait retraining, fall prevention & balance enhancement"
    ],
    responseTime: "Within 2 to 4 Hours",
    coveredSectors: ["Entire Ambala Cantt & City", "Defence Colony", "Model Town"],
    recommendedFor: "Joint pain, post-fracture recovery, elderly balance issues.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 4,
    id: "icu-setup-at-home-ambala",
    title: "Hospital-Grade ICU & Critical Care Setup at Home Ambala",
    badgeTag: "Critical Care Excellence",
    category: "specialized",
    rating: 4.9,
    reviewCount: 160,
    shortDesc: "Complete hospital-grade ICU infrastructure at home with multi-para monitors, ventilators, and 24/7 critical care nurses in Ambala.",
    fullDesc: "Safe transition from hospital ICUs to home. SilverCare sets up medical-grade critical care equipment with 24/7 ICU-trained nurses and continuous intensivist oversight.",
    keyFeatures: [
      "Motorized ICU 3-Function & 5-Function Medical Beds",
      "Mechanical Ventilators, BiPAP / CPAP & High-Flow Oxygen Support",
      "5-Para Cardiac Monitors, Syringe Pumps & Suction Machines",
      "24/7 Dedicated Critical Care Qualified Nursing Officers"
    ],
    responseTime: "Emergency 2 to 4-Hour Deployment",
    coveredSectors: ["All Residential Localities in Ambala", "Defence Colony", "Model Town"],
    recommendedFor: "Tracheostomy patients, advanced COPD, coma care, end-stage respiratory care.",
    doctorSupervised: true,
    icon: ShieldCheck,
  },
  {
    rank: 5,
    id: "nri-parent-care-ambala",
    title: "NRI Parent Healthcare & Dedicated Care Manager in Ambala",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 310,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor checkups, medicines delivery, 24/7 emergency response, and live digital updates for overseas children.",
    fullDesc: "Complete peace of mind for families settled in Canada, UK, USA, or Australia. Our senior care managers personally visit and oversee your parents' health in Ambala, managing doctor appointments and daily logs.",
    keyFeatures: [
      "Dedicated Senior Clinical Care Manager Assigned",
      "Real-time Digital WhatsApp Health Reports & Doctor Tele-Reviews",
      "Doorstep Medicine Refills, Lab Tests & Hospital Escort",
      "24/7 Priority Emergency Evacuation across Ambala & Tricity"
    ],
    responseTime: "Instant Global Onboarding",
    coveredSectors: ["Defence Colony", "Sadar Bazaar", "Model Town", "Military Area"],
    recommendedFor: "Aging parents residing independently in Ambala with adult children overseas.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 6,
    id: "pathology-diagnostics-ambala",
    title: "Doorstep Pathology & Diagnostic Blood Sample Collection Ambala",
    badgeTag: "NABL Accredited Labs",
    category: "clinical",
    rating: 4.8,
    reviewCount: 220,
    shortDesc: "Painless home sample collection for Complete Senior Health Profiles, Diabetes, Thyroid, Lipid, KFT, LFT with digital reports in 6 hours.",
    fullDesc: "Skip diagnostic clinic queues. Certified phlebotomists collect blood and urine samples at your Ambala residence with sterile equipment and NABL-accredited processing.",
    keyFeatures: [
      "Painless Blood & Urine Sample Collection at Home",
      "Complete Senior Citizen Health Screening Panels",
      "NABL & ICMR Accredited Diagnostic Labs",
      "Digital WhatsApp & Email Report Delivery in 6 Hours"
    ],
    responseTime: "Morning Slots from 6:30 AM",
    coveredSectors: ["All Ambala Localities", "Defence Colony", "Model Town"],
    recommendedFor: "Quarterly diabetic reviews, senior health checks, bedridden routine tests.",
    doctorSupervised: true,
    icon: Sparkles,
  }
];

// Ambala Residential Hubs
const AMBALA_HUBS: LocationHub[] = [
  { name: "Defence Colony & Staff Road", status: "Active Care Hub", coverage: "Daily Skilled Nursing & Attendant Care" },
  { name: "Sadar Bazaar & Nicholson Road", status: "Active Care Hub", coverage: "Bedside Doctor Checkups & Home Physio" },
  { name: "Model Town Ambala City", status: "Active Care Hub", coverage: "24/7 Live-In Caregivers & Dementia Care" },
  { name: "Babyal & Mahesh Nagar Belts", status: "Active Care Hub", coverage: "ICU Equipment Setup & Phlebotomy" },
  { name: "Ambala-Chandigarh Highway Societies", status: "Active Care Hub", coverage: "Rapid Caregiver Deployment" }
];

// FAQs for Ambala Eldercare
const AMBALA_FAQS: LocationFAQ[] = [
  {
    q: "How quickly can SilverCare deploy an in-home nurse in Ambala Cantt?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with prompt same-day availability across Defence Colony, Sadar Bazaar, Model Town, and all Ambala localities."
  },
  {
    q: "Do you provide doctor home visits for seniors in Ambala?",
    a: "Yes. Our senior MBBS and MD geriatric physicians conduct bedside consultations, 12-lead ECG checks, and chronic care management across all Ambala neighborhoods."
  },
  {
    q: "Can SilverCare look after NRI parents living independently in Ambala?",
    a: "Yes! Many NRI families in Canada, the UK, USA, and Australia trust SilverCare. Our local care managers coordinate doctor visits, medicine delivery, and provide real-time updates to family members abroad."
  },
  {
    q: "Can you provide medical ICU equipment on rent at home in Ambala?",
    a: "Yes, SilverCare supplies hospital-grade motorized beds, oxygen concentrators, BiPAP/CPAP machines, and multi-para monitors with complete home installation in Ambala."
  }
];

export default function ElderlyCareAmbalaCantt() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-ambala-cantt";
  const pageTitle = "Best Elderly Healthcare Services in Ambala Cantt (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Ambala Cantt. 24/7 verified in-home nursing, doctor home visits, geriatric physiotherapy, home ICU setup & NRI parent support across Defence Colony, Sadar Bazaar & Model Town.";
  const keywords = "Best elderly healthcare services in Ambala Cantt, home nursing Ambala, doctor visit at home Ambala, Defence Colony Ambala eldercare, Sadar Bazaar caregiver, home ICU setup Ambala, SilverCare Ambala";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare India - Eldercare & Senior Home Healthcare Ambala Cantt",
    "image": "https://silvercareindia.com/hero-doctor.png",
    "telephone": "+918001480075",
    "email": "care@silvercareindia.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ambala Cantt Operations Hub",
      "addressLocality": "Ambala Cantt",
      "addressRegion": "Haryana",
      "postalCode": "133001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.3782,
      "longitude": 76.7767
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
      cityName="Ambala Cantt"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="🏆 Top-Ranked Senior Healthcare Provider in Ambala Cantt"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Ambala Cantt"
      heroSubtitle="SilverCare brings hospital-standard 24/7 home nursing, senior MD doctor visits, post-hospitalization rehab & NRI parent concierge across Defence Colony, Sadar Bazaar, Model Town & Mahesh Nagar."
      stats={[
        { value: "980+", label: "Ambala Families Cared" },
        { value: "4.9", label: "Google Rating" },
        { value: "100%", label: "Verified Caregivers" },
        { value: "24/7", label: "Care Assistance" },
      ]}
      services={TOP_AMBALA_SERVICES}
      servicesSectionTitle="Top Rated Elderly Healthcare Services in Ambala Cantt"
      servicesSectionSubtitle="Showing verified, clinical-grade home healthcare solutions ranked by family ratings, clinical excellence, and rapid response standards in Ambala."
      faqs={AMBALA_FAQS}
      sectorHubs={AMBALA_HUBS}
      sectorHubsTitle="Ambala Cantt Residential Hubs & Colonies"
      sectorHubsSubtitle="Select your locality or residential colony below to check active caregiver readiness and fast dispatch in Ambala."
      ctaHeading="Give Your Loved Ones the Dignified Healthcare They Deserve in Ambala Cantt"
      ctaDescription="Contact SilverCare today to speak directly with our Senior Clinical Care Team and arrange a comprehensive home healthcare assessment anywhere in Ambala."
    />
  );
}
