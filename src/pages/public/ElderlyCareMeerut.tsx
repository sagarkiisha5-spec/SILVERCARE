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

// Top 6 Ranked Eldercare Services in Meerut
const TOP_MEERUT_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-meerut",
    title: "24/7 Skilled In-Home Nursing & Attendant Care in Meerut",
    badgeTag: "#1 Choice in Meerut & Shastri Nagar",
    category: "nursing",
    rating: 5.0,
    reviewCount: 380,
    shortDesc: "Hospital-trained 12-hour and 24-hour live-in registered nurses (GNM/B.Sc) and dedicated senior caregivers across Shastri Nagar, Saket, Ganga Nagar & Meerut Cantt.",
    fullDesc: "SilverCare brings trusted hospital-standard nursing care to homes across Meerut. Certified nurses assist with post-surgical recovery, vitals tracking, injections, wound dressing, and bedside comfort under strict doctor supervision.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM/B.Sc Registered Nurses",
      "Vitals Logging, Medication Management & Sugar/BP Monitoring",
      "Tracheostomy, Catheterization & Mobility Support",
      "Reliable Caregiver Replacement Guarantee across Meerut"
    ],
    responseTime: "Prompt Same-Day Deployment in Meerut",
    coveredSectors: ["Shastri Nagar", "Saket & Civil Lines", "Ganga Nagar & Mawana Road", "Meerut Cantt & Mall Road", "Modipuram & Delhi Road", "Pallavpuram"],
    recommendedFor: "Bedridden seniors, post-stroke recovery, chronic care support.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 2,
    id: "doctor-home-visits-meerut",
    title: "Doctor Home Visits & Senior Health Checkups in Meerut",
    badgeTag: "Doorstep Medical Consultation",
    category: "clinical",
    rating: 4.9,
    reviewCount: 310,
    shortDesc: "Experienced MBBS and MD geriatric physicians visiting your residence in Meerut for bedside examinations, portable ECG, and prescription audits.",
    fullDesc: "Avoid crowded hospital OPDs. Our senior doctors conduct thorough bedside clinical checkups, review prescription medications, and guide family members in your home.",
    keyFeatures: [
      "Senior MBBS / MD Geriatricians visiting patient's home",
      "Comprehensive Bedside Clinical Review & Vitals Assessment",
      "Direct Guidance for Home Nursing Attendants",
      "Convenient consultation for elderly with mobility limits"
    ],
    responseTime: "Scheduled Same-Day Visits Available",
    coveredSectors: ["Shastri Nagar", "Saket", "Civil Lines", "Ganga Nagar"],
    recommendedFor: "Hypertension, chronic diabetes, post-discharge review.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 3,
    id: "physiotherapy-at-home-meerut",
    title: "Home Physiotherapy & Senior Mobility Therapy Meerut",
    badgeTag: "Certified Rehab Specialists",
    category: "rehab",
    rating: 4.9,
    reviewCount: 290,
    shortDesc: "Licensed BPT/MPT physiotherapists bringing electrotherapy, gait training, and mobility equipment to senior homes in Meerut.",
    fullDesc: "Restore walking confidence and joint flexibility without traveling across town. Our therapists provide personalized exercise programs and electrotherapy at home.",
    keyFeatures: [
      "Certified MPT/BPT Neuro & Orthopedic Specialists",
      "Post-Knee & Hip Arthroplasty specialized recovery",
      "Portable Ultrasound & TENS electrotherapy machines",
      "Gait retraining, fall prevention & balance enhancement"
    ],
    responseTime: "Within 2 to 4 Hours",
    coveredSectors: ["Entire Meerut", "Shastri Nagar", "Saket", "Modipuram"],
    recommendedFor: "Joint pain, post-fracture recovery, elderly balance issues.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 4,
    id: "icu-setup-at-home-meerut",
    title: "Hospital-Grade ICU & Critical Care Setup at Home in Meerut",
    badgeTag: "Critical Care Excellence",
    category: "specialized",
    rating: 4.9,
    reviewCount: 180,
    shortDesc: "Complete hospital-grade ICU infrastructure at home with multi-para monitors, ventilators, and 24/7 critical care nurses in Meerut.",
    fullDesc: "Safe transition from hospital ICUs to home. SilverCare sets up medical-grade critical care equipment with 24/7 ICU-trained nurses and continuous intensivist oversight.",
    keyFeatures: [
      "Motorized ICU 3-Function & 5-Function Medical Beds",
      "Mechanical Ventilators, BiPAP / CPAP & High-Flow Oxygen Support",
      "5-Para Cardiac Monitors, Syringe Pumps & Suction Machines",
      "24/7 Dedicated Critical Care Qualified Nursing Officers"
    ],
    responseTime: "Emergency 2 to 4-Hour Deployment",
    coveredSectors: ["All Residential Localities in Meerut", "Shastri Nagar", "Civil Lines"],
    recommendedFor: "Tracheostomy patients, advanced COPD, coma care, end-stage respiratory care.",
    doctorSupervised: true,
    icon: ShieldCheck,
  },
  {
    rank: 5,
    id: "nri-parent-care-meerut",
    title: "NRI Parent Healthcare & Dedicated Care Manager in Meerut",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 320,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor checkups, medicines delivery, 24/7 emergency response, and live digital updates for overseas children.",
    fullDesc: "Complete peace of mind for families settled abroad. Our senior care managers personally visit and oversee your parents' health in Meerut, managing doctor appointments and daily logs.",
    keyFeatures: [
      "Dedicated Senior Clinical Care Manager Assigned",
      "Real-time Digital WhatsApp Health Reports & Doctor Tele-Reviews",
      "Doorstep Medicine Refills, Lab Tests & Hospital Escort",
      "24/7 Priority Emergency Evacuation across Meerut & NCR"
    ],
    responseTime: "Instant Global Onboarding",
    coveredSectors: ["Shastri Nagar", "Saket", "Civil Lines", "Pallavpuram"],
    recommendedFor: "Aging parents residing independently in Meerut with adult children overseas.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 6,
    id: "pathology-diagnostics-meerut",
    title: "Doorstep Pathology & Diagnostic Blood Sample Collection Meerut",
    badgeTag: "NABL Accredited Labs",
    category: "clinical",
    rating: 4.8,
    reviewCount: 240,
    shortDesc: "Painless home sample collection for Complete Senior Health Profiles, Diabetes, Thyroid, Lipid, KFT, LFT with digital reports in 6 hours.",
    fullDesc: "Skip diagnostic clinic queues. Certified phlebotomists collect blood and urine samples at your Meerut residence with sterile equipment and NABL-accredited processing.",
    keyFeatures: [
      "Painless Blood & Urine Sample Collection at Home",
      "Complete Senior Citizen Health Screening Panels",
      "NABL & ICMR Accredited Diagnostic Labs",
      "Digital WhatsApp & Email Report Delivery in 6 Hours"
    ],
    responseTime: "Morning Slots from 6:30 AM",
    coveredSectors: ["All Meerut Localities", "Shastri Nagar", "Ganga Nagar"],
    recommendedFor: "Quarterly diabetic reviews, senior health checks, bedridden routine tests.",
    doctorSupervised: true,
    icon: Sparkles,
  }
];

// Meerut Residential Hubs
const MEERUT_HUBS: LocationHub[] = [
  { name: "Shastri Nagar & Saket Colony", status: "Active Care Hub", coverage: "Daily Skilled Nursing & Attendant Care" },
  { name: "Civil Lines & Meerut Cantt", status: "Active Care Hub", coverage: "Bedside Doctor Checkups & Home Physio" },
  { name: "Ganga Nagar & Mawana Road", status: "Active Care Hub", coverage: "24/7 Live-In Caregivers & Dementia Care" },
  { name: "Modipuram & Pallavpuram Belts", status: "Active Care Hub", coverage: "ICU Equipment Setup & Phlebotomy" },
  { name: "Delhi Road & Rithani Societies", status: "Active Care Hub", coverage: "Rapid Caregiver Deployment" }
];

// FAQs for Meerut Eldercare
const MEERUT_FAQS: LocationFAQ[] = [
  {
    q: "How quickly can SilverCare deploy an in-home nurse in Meerut?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with prompt same-day availability across Shastri Nagar, Saket, Ganga Nagar, and all Meerut localities."
  },
  {
    q: "Do you provide doctor home visits for seniors in Meerut?",
    a: "Yes. Our senior MBBS and MD geriatric physicians conduct bedside consultations, 12-lead ECG checks, and chronic care management across all Meerut neighborhoods."
  },
  {
    q: "Can SilverCare look after NRI parents living independently in Meerut?",
    a: "Yes! Many NRI families trust SilverCare. Our local care managers coordinate doctor visits, medicine delivery, and provide real-time updates to family members abroad."
  },
  {
    q: "Can you provide medical ICU equipment on rent at home in Meerut?",
    a: "Yes, SilverCare supplies hospital-grade motorized beds, oxygen concentrators, BiPAP/CPAP machines, and multi-para monitors with complete home installation in Meerut."
  }
];

export default function ElderlyCareMeerut() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-meerut";
  const pageTitle = "Best Elderly Healthcare Services in Meerut (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Meerut. 24/7 verified in-home nursing, doctor home visits, geriatric physiotherapy, home ICU setup & NRI parent support across Shastri Nagar, Saket & Ganga Nagar.";
  const keywords = "Best elderly healthcare services in Meerut, home nursing Meerut, doctor visit at home Meerut, Shastri Nagar Meerut eldercare, Saket Meerut caregiver, home ICU setup Meerut, SilverCare Meerut";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "SilverCare India - Eldercare & Senior Home Healthcare Meerut",
    "image": "https://silvercareindia.com/hero-doctor.png",
    "telephone": "+918001480075",
    "email": "care@silvercareindia.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Meerut Operations Hub",
      "addressLocality": "Meerut",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "250001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.9845,
      "longitude": 77.7064
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
      cityName="Meerut"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="🏆 Top-Ranked Senior Healthcare Provider in Meerut"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Meerut"
      heroSubtitle="SilverCare brings hospital-standard 24/7 home nursing, senior MD doctor visits, post-hospitalization rehab & NRI parent concierge across Shastri Nagar, Saket, Ganga Nagar & Meerut Cantt."
      stats={[
        { value: "1,150+", label: "Meerut Families Cared" },
        { value: "4.9", label: "Google Rating" },
        { value: "100%", label: "Verified Caregivers" },
        { value: "24/7", label: "Care Assistance" },
      ]}
      services={TOP_MEERUT_SERVICES}
      servicesSectionTitle="Top Rated Elderly Healthcare Services in Meerut"
      servicesSectionSubtitle="Showing verified, clinical-grade home healthcare solutions ranked by family ratings, clinical excellence, and rapid response standards in Meerut."
      faqs={MEERUT_FAQS}
      sectorHubs={MEERUT_HUBS}
      sectorHubsTitle="Meerut Residential Hubs & Colonies"
      sectorHubsSubtitle="Select your locality or residential colony below to check active caregiver readiness and fast dispatch in Meerut."
      ctaHeading="Give Your Loved Ones the Dignified Healthcare They Deserve in Meerut"
      ctaDescription="Contact SilverCare today to speak directly with our Senior Clinical Care Team and arrange a comprehensive home healthcare assessment anywhere in Meerut."
    />
  );
}
