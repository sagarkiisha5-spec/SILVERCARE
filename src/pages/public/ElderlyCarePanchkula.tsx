import React from "react";
import { 
  Stethoscope, 
  UserCheck, 
  Activity, 
  ShieldCheck, 
  Star, 
  Clock, 
  CheckCircle2, 
  Heart, 
  Sparkles, 
  Building2, 
  Globe, 
  Medal, 
  PhoneCall 
} from "lucide-react";
import LocationPageTemplate, { 
  LocationRankedService, 
  LocationHub,
  LocationFAQ, 
  LocationStatItem 
} from "@/src/components/location/LocationPageTemplate";

// Top 10 Best Elderly Healthcare Services in Panchkula Dataset (with Sector 15 explicitly included)
const TOP_PANCHKULA_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-panchkula",
    title: "24/7 Skilled Home Nursing & Attendant Care in Panchkula",
    badgeTag: "#1 Choice in Panchkula",
    category: "nursing",
    rating: 4.9,
    reviewCount: 390,
    shortDesc: "Comprehensive 12-hour & 24-hour GNM/B.Sc registered nurses for bedridden, post-op, and senior daily living assistance in Panchkula Sector 15, Sectors 1-21 & MDC.",
    fullDesc: "SilverCare is Panchkula's premier home healthcare provider. Our qualified GNM and B.Sc nurses specialize in bedridden patient care, tracheostomy care, catheterization, wound dressing, IV medications, and stroke rehabilitation across all Panchkula sectors.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM/B.Sc Registered Nurses",
      "Comprehensive Care across Sector 15, Panchkula Sectors 1-21, MDC Swastik Vihar & Kalka",
      "Specialized Post-Surgery Care (Direct Discharge Support from Command & Alchemist Hospitals)",
      "100% Police Verified & Background Checked Caregivers"
    ],
    responseTime: "Prompt Same-Day Deployment",
    coveredSectors: ["Sector 15 Panchkula", "Panchkula Sectors 1-21", "MDC Swastik Vihar", "Mansa Devi Complex", "Pinjore & Kalka"],
    recommendedFor: "Bedridden seniors, post-surgical recovery, chronic illness, and elderly mobility assistance.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 2,
    id: "doctor-home-visits-panchkula",
    title: "Senior Physician & Geriatric Doctor Home Visits in Panchkula",
    badgeTag: "Top Clinical Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 340,
    shortDesc: "Senior MD & MBBS Physicians visiting homes across Panchkula for routine health exams, bedside ECG, prescription optimization, and chronic disease audits.",
    fullDesc: "No more waiting in hospital queues for your elderly parents. SilverCare doctors conduct comprehensive doorstep checkups, portable 12-lead ECGs, blood pressure audits, and geriatric management across Panchkula.",
    keyFeatures: [
      "Experienced Senior MD Physicians with Tertiary Hospital Background",
      "At-Home 12-Lead ECG, Blood Pressure & Pulse Oximetry Diagnostics",
      "Medication Review & Reduction of Adverse Drug Interactions",
      "Direct Admission Coordination with Alchemist & Paras Hospitals Panchkula"
    ],
    responseTime: "Same-Day Appointment Available",
    coveredSectors: ["Sector 15 Panchkula", "Sector 1 to 21", "MDC Sector 4, 5, 6", "Sec 8 & 10", "Sector 20"],
    recommendedFor: "Elderly with hypertension, diabetes, arthritis, multi-morbidity, and routine geriatric checkups.",
    doctorSupervised: true,
    icon: UserCheck,
  },
  {
    rank: 3,
    id: "veteran-defense-care-panchkula",
    title: "Veteran & Senior Defense Officer Dedicated Care",
    badgeTag: "Defense & Veteran Protocol",
    category: "support",
    rating: 5.0,
    reviewCount: 410,
    shortDesc: "Specialized healthcare tailored for retired armed forces officers, veterans, and civil services families in Panchkula & Chandimandir.",
    fullDesc: "Panchkula is home to distinguished defense veterans. SilverCare provides disciplined, compassionate caregivers who assist with medication schedules, mobility, clinic escorts to Command Hospital, and daily companionship.",
    keyFeatures: [
      "Disciplined, Background-Verified Healthcare Protocols",
      "Seamless Medical Appointment Escort to Command Hospital & Alchemist",
      "Daily Vitals Recording, Physical Fitness & Mobility Guidance",
      "Priority Care Manager for Retired Officers & Senior Citizens"
    ],
    responseTime: "Fast Caregiver Placement",
    coveredSectors: ["Sector 15", "Chandimandir Cantt", "Sector 2, 4, 6, 8, 9", "MDC Swastik Vihar"],
    recommendedFor: "Retired defense personnel, civil officers, and independent elderly couples seeking respectful assistance.",
    doctorSupervised: true,
    icon: Medal,
  },
  {
    rank: 4,
    id: "physiotherapy-stroke-rehab-panchkula",
    title: "Senior Physiotherapy, Joint Replacement Rehab & Fall Recovery",
    badgeTag: "Fastest Recovery",
    category: "rehab",
    rating: 4.9,
    reviewCount: 360,
    shortDesc: "Licensed Master of Physiotherapy (MPT) practitioners delivering stroke rehab, knee/hip replacement recovery, and balance training at home in Panchkula.",
    fullDesc: "Restore confident walking and eliminate chronic pain. Our certified physiotherapists bring advanced electrotherapy modalities (TENS/IFT/Ultrasound), parallel balance trainers, and manual therapy to your Panchkula residence.",
    keyFeatures: [
      "Master of Physiotherapy (MPT) Certified Practitioners",
      "Post-Knee & Hip Replacement Rapid Mobilization Programs",
      "Stroke Neuro-Rehabilitation & Fall Prevention Gait Training",
      "Pain Relief Therapy for Spondylosis, Sciatica & Arthritis"
    ],
    responseTime: "Same-Day Session Booking",
    coveredSectors: ["Sector 15", "Sectors 1-21", "MDC Panchkula", "Pinjore & Kalka"],
    recommendedFor: "Post-op joint surgery recovery, stroke rehabilitation, arthritis, and fall recovery.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 5,
    id: "dementia-alzheimers-care-panchkula",
    title: "Specialized Dementia, Alzheimer's & Memory Care in Panchkula",
    badgeTag: "Memory Care Leader",
    category: "specialized",
    rating: 4.8,
    reviewCount: 260,
    shortDesc: "Compassionate memory care specialists certified in cognitive stimulation, anti-wandering protocols, and dementia behavioral management.",
    fullDesc: "Managing dementia requires gentle empathy and structured daily routines. SilverCare's trained memory attendants help Panchkula seniors stay engaged, calm, and safe in familiar home surroundings.",
    keyFeatures: [
      "Memory Stimulation Exercises & Reminiscence Therapy",
      "Anti-Wandering & Home Safety Hazard Audits",
      "Gentle Behavioral Management & Emotional Reassurance",
      "Family Counseling & Caregiver Respite Solutions"
    ],
    responseTime: "Fast Caregiver Placement",
    coveredSectors: ["Sector 15 Panchkula", "All Panchkula Sectors", "MDC Swastik Vihar", "Sector 20"],
    recommendedFor: "Seniors with Alzheimer's disease, Vascular Dementia, Parkinson's, or memory decline.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 6,
    id: "nri-parent-care-panchkula",
    title: "NRI Parent Healthcare & Dedicated Care Manager in Panchkula",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 440,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor checkups, medicines delivery, 24/7 emergency response, and live WhatsApp updates for overseas children.",
    fullDesc: "Peace of mind for children living in Canada, USA, UK, or Australia. SilverCare provides a single accountable care manager in Panchkula to oversee your parents' health, nutrition, and emergency safety.",
    keyFeatures: [
      "Dedicated Senior Clinical Care Manager Assigned to Parents",
      "Real-time Digital WhatsApp Health Reports & Bi-weekly Doctor Reviews",
      "Doorstep Medicine Refills, Lab Tests & Hospital Escort",
      "24/7 Priority Emergency Transport in Panchkula & Tricity"
    ],
    responseTime: "Instant Global Onboarding",
    coveredSectors: ["Sector 15", "Panchkula Sectors 1-21", "MDC Swastik Vihar", "Sector 20"],
    recommendedFor: "Aging parents residing independently in Panchkula with adult children overseas.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 7,
    id: "home-icu-setup-panchkula",
    title: "Home ICU Setup & Medical Equipment Rental in Panchkula",
    badgeTag: "Critical Life Support",
    category: "specialized",
    rating: 4.9,
    reviewCount: 210,
    shortDesc: "Hospital-grade ICU setup at home including Ventilators, BiPAP/CPAP, 5-Function Motorized Beds, Multipara Monitors, and 24/7 Critical Care Nurses in Panchkula.",
    fullDesc: "Transform any room into a high-dependency clinical unit in Panchkula. Delivered and installed with same-day readiness by certified biomedical technicians, backed by experienced ICU registered nurses.",
    keyFeatures: [
      "Motorized 3 & 5 Function Hospital ICU Beds & Air Mattresses",
      "Invasive/Non-Invasive Ventilators, BiPAP & CPAP Units",
      "Multipara Patient Monitors & Medical Grade Suction Units",
      "24/7 Critical Care ICU Registered Nurse Coverage"
    ],
    responseTime: "Fast Delivery & Setup in Panchkula",
    coveredSectors: ["Sector 15", "All Panchkula Sectors", "MDC", "Pinjore", "Kalka"],
    recommendedFor: "Critically ill patients requiring life support or post-ICU step-down recovery at home.",
    doctorSupervised: true,
    icon: Building2,
  },
  {
    rank: 8,
    id: "doorstep-lab-tests-panchkula",
    title: "Doorstep Pathology Blood Collection & Health Checkups Panchkula",
    badgeTag: "NABL Certified",
    category: "clinical",
    rating: 4.8,
    reviewCount: 290,
    shortDesc: "Painless home sample collection for Complete Senior Health Profiles, Diabetes, Thyroid, Lipid, KFT, LFT with digital reports in 6 hours.",
    fullDesc: "Skip diagnostic clinic visits. Certified phlebotomists collect blood samples gently at your Panchkula residence with sterile equipment and NABL-accredited processing.",
    keyFeatures: [
      "Painless Blood & Urine Sample Collection at Home",
      "Complete Senior Executive Health Package (65+ Parameters)",
      "NABL & ICMR Accredited Diagnostic Labs",
      "Digital WhatsApp & Email Report Delivery in 6 Hours"
    ],
    responseTime: "Morning Slots Available",
    coveredSectors: ["Sector 15", "All Panchkula Sectors", "MDC", "Pinjore", "Kalka"],
    recommendedFor: "Routine diabetic monitoring, lipid profiles, and mobility-impaired elders.",
    doctorSupervised: true,
    icon: Sparkles,
  },
  {
    rank: 9,
    id: "senior-companionship-panchkula",
    title: "Senior Daycare, Companionship & Errands Assistance Panchkula",
    badgeTag: "Emotional Wellness",
    category: "support",
    rating: 4.8,
    reviewCount: 170,
    shortDesc: "Cultured, educated companions for morning walks in Cactus Garden / Town Park, Mansa Devi temple visits, reading, and doctor escorts in Panchkula.",
    fullDesc: "Combat senior loneliness and stay socially vibrant. Our verified companions assist with outings, mandir visits, bank/grocery errands, and joyful daily conversations.",
    keyFeatures: [
      "Accompaniment for Walks in Town Park & Cactus Garden Panchkula",
      "Escort to Clinics, Mansa Devi Temple & Bank Errands",
      "Mental Stimulation Games, Reading & Tech/Smartphone Assistance",
      "Empathetic Friendship & Daily Activity Assistance"
    ],
    responseTime: "Same-Day Deployment",
    coveredSectors: ["Sector 15", "Sectors 1 to 21", "MDC Swastik Vihar", "Sector 20"],
    recommendedFor: "Independent seniors seeking enriching social engagement and assistance with outside errands.",
    doctorSupervised: false,
    icon: Heart,
  },
  {
    rank: 10,
    id: "emergency-ambulance-panchkula",
    title: "24/7 Priority Emergency Ambulance & Hospital Triage Panchkula",
    badgeTag: "24/7 Emergency",
    category: "support",
    rating: 4.9,
    reviewCount: 380,
    shortDesc: "Urgent senior helpline with ALS/BLS ICU ambulances, oxygen support, and fast-track admissions to Alchemist, Paras, or Command Hospital Panchkula.",
    fullDesc: "Rapid-response emergency ambulances equipped with defibrillators, oxygen, paramedics, and seamless hospital triage in Panchkula & Chandimandir.",
    keyFeatures: [
      "24/7 Dedicated Senior Emergency Helpline",
      "Advanced Life Support (ALS) & Basic Life Support (BLS) Ambulances",
      "Fast-Track Admission Protocols with Alchemist & Paras Hospitals",
      "On-Board Emergency Paramedic & Critical Oxygenation"
    ],
    responseTime: "Immediate Emergency Dispatch",
    coveredSectors: ["Sector 15", "Entire Panchkula District & Chandimandir"],
    recommendedFor: "Acute medical emergencies, sudden cardiac symptoms, breathing difficulty, or severe falls.",
    doctorSupervised: true,
    icon: PhoneCall,
  }
];

// Panchkula Sector Coverage & Hospital Care Desks
const PANCHKULA_SECTOR_HUBS: LocationHub[] = [
  { name: "Sector 15 & Geeta Mandir Hub", status: "Priority Care Hub", coverage: "Standby Nurse & Attendant Visits in Sector 15" },
  { name: "Sectors 1 to 10 (DC & Officers Belt)", status: "Active Sector Hub", coverage: "Daily Skilled Nursing & Attendant Care" },
  { name: "Sectors 11 to 21 & Sec 20 Belts", status: "Active Sector Hub", coverage: "Bedside Doctor Checkups & Home Physio" },
  { name: "MDC Swastik Vihar & Mansa Devi", status: "Active Sector Hub", coverage: "24/7 Live-In Caregivers & Dementia Care" },
  { name: "Command Hospital & Chandimandir", status: "Active Hospital Desk", coverage: "Veteran Care Escort & Hospital Transition" },
  { name: "Pinjore-Kalka & Surajpur Corridor", status: "Active Sector Hub", coverage: "ICU Equipment Setup & Phlebotomy" }
];

// Panchkula Fall Risk Questions
const FALL_RISK_QUESTIONS = [
  { q: "Has your elderly loved one experienced a slip or fall in the last 6 months?", key: "pastFall" },
  { q: "Do they require assistance or a walking stick/walker to stand up or walk?", key: "mobilityAid" },
  { q: "Do they take 4 or more daily medications for BP, diabetes, or sleep?", key: "medications" },
  { q: "Do they feel dizzy when getting out of bed or have poor bathroom grip?", key: "bathroomRisk" }
];

// FAQs for Panchkula Eldercare
const PANCHKULA_FAQS: LocationFAQ[] = [
  {
    q: "Why is SilverCare rated as the best elderly healthcare service in Panchkula?",
    a: "SilverCare is the #1 rated provider in Panchkula due to our 100% police-verified nursing staff, specialized veteran & senior officer protocols, dedicated presence across Sector 15 and Sectors 1-21, MDC, direct hospital coordination with Alchemist & Command Hospital, and dedicated care managers for NRI families."
  },
  {
    q: "How quickly can SilverCare deploy a nurse or caregiver to Sector 15 or other sectors in Panchkula?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with prompt same-day availability across Sector 15, Sectors 1 to 21, MDC Swastik Vihar, Mansa Devi Complex, and Pinjore-Kalka. Sector 15 has our priority care response team on standby."
  },
  {
    q: "What is the cost of hiring a 24-hour home nurse in Panchkula?",
    a: "SilverCare provides customized, transparent eldercare plans tailored to specific health requirements and shift durations following a clinical assessment."
  },
  {
    q: "Do you have special care plans for retired defense officers & veterans in Panchkula?",
    a: "Yes! Panchkula has a prominent defense community. We provide disciplined, respectful care attendants experienced in escorting elders to Command Hospital Chandimandir and administering structured health regimes."
  },
  {
    q: "Can SilverCare assist NRI parents living alone in Sector 15 and Panchkula?",
    a: "Yes. SilverCare specializes in NRI parent care in Panchkula (including Sector 15, Sector 2, 4, 8, 10, 11, 20 & MDC). We assign a dedicated Clinical Care Manager who handles routine doctor visits, medicine delivery, regular health vitals monitoring, and sends digital WhatsApp updates to children living abroad."
  },
  {
    q: "Can I get ICU medical equipment like a ventilator or motorized bed delivered to Panchkula?",
    a: "Yes. SilverCare provides same-day delivery of ICU beds, ventilators, BiPAP/CPAP, oxygen concentrators, and multipara monitors across Sector 15 and all Panchkula sectors, supported by 24/7 biomedical engineers."
  }
];

const PANCHKULA_STATS: LocationStatItem[] = [
  { value: "1,280+", label: "Panchkula Seniors Cared", icon: CheckCircle2 },
  { value: "4.9", label: "Google Rating", icon: Star },
  { value: "100%", label: "Verified Staff", icon: ShieldCheck },
  { value: "24/7", label: "Clinical Support", icon: Clock },
];

export default function ElderlyCarePanchkula() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-panchkula";
  const pageTitle = "Best Elderly Healthcare Services in Panchkula (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Panchkula. 24/7 verified in-home nursing, doctor home visits, veteran senior care, Alchemist/Paras hospital transition, ICU setups & NRI parent care in Sectors 1-21, Sector 15 & MDC.";
  const keywords = "Best elderly healthcare services in Panchkula, elderly care sector 15 panchkula, home nursing sector 15 panchkula, doctor visit sector 15 panchkula, senior care panchkula sector 15, home nursing Panchkula, doctor visit at home Panchkula, veteran eldercare Panchkula, Alchemist hospital discharge Panchkula, Command hospital senior care Panchkula, 24/7 caregiver MDC Panchkula, SilverCare";

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${canonicalUrl}#organization`,
        "name": "SilverCare India - Eldercare Services Panchkula",
        "url": canonicalUrl,
        "logo": "https://silvercareindia.com/silvercare-logo.png",
        "image": "https://silvercareindia.com/hero-doctor.png",
        "description": pageDesc,
        "telephone": "+918001480075",
        "email": "care@silvercareindia.com",
        "priceRange": "₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Credit Card, UPI, Net Banking",
        "medicalSpecialty": "Geriatric",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sector 11, Sector 15 & MDC Hub, Panchkula",
          "addressLocality": "Panchkula",
          "addressRegion": "Haryana",
          "postalCode": "134109",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "30.6942",
          "longitude": "76.8606"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Sector 15 Panchkula" },
          { "@type": "AdministrativeArea", "name": "Panchkula Sectors 1-21" },
          { "@type": "AdministrativeArea", "name": "MDC Swastik Vihar Panchkula" },
          { "@type": "AdministrativeArea", "name": "Mansa Devi Complex" },
          { "@type": "AdministrativeArea", "name": "Sector 20 Panchkula" },
          { "@type": "AdministrativeArea", "name": "Pinjore & Kalka" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1280",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": pageTitle,
        "description": pageDesc,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://silvercareindia.com/#website",
          "name": "SilverCare India",
          "url": "https://silvercareindia.com/"
        }
      },
      {
        "@type": "ItemList",
        "name": "Top 10 Best Elderly Healthcare Services in Panchkula",
        "description": "Ranked list of top-rated senior care and home health services in Panchkula.",
        "itemListElement": TOP_PANCHKULA_SERVICES.map((srv, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "name": srv.title,
            "description": srv.shortDesc,
            "provider": {
              "@type": "MedicalBusiness",
              "name": "SilverCare India"
            }
          }
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": PANCHKULA_FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <LocationPageTemplate
      cityName="Panchkula"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="🏆 Top-Ranked Senior Healthcare Provider in Panchkula"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Panchkula"
      heroSubtitle="SilverCare brings hospital-standard 24/7 home nursing, senior MD doctor visits, veteran & officer care protocols & NRI parent concierge across Panchkula Sector 15, Sectors 1-21, MDC Swastik Vihar & Mansa Devi Complex."
      stats={PANCHKULA_STATS}
      services={TOP_PANCHKULA_SERVICES}
      servicesSectionTitle="Top 10 Rated Elderly Healthcare Services in Panchkula"
      servicesSectionSubtitle="Showing verified, clinical-grade home healthcare solutions ranked by Panchkula family ratings, clinical quality, and rapid response standards."
      faqs={PANCHKULA_FAQS}
      sectorHubs={PANCHKULA_SECTOR_HUBS}
      sectorHubsTitle="Panchkula Coverage & Sector Desks"
      sectorHubsSubtitle="Select your sector zone below to check active caregiver readiness and fast dispatch in Panchkula."
      fallRiskQuestions={FALL_RISK_QUESTIONS}
      ctaHeading="Give Your Loved Ones the Dignified Healthcare They Deserve in Panchkula"
      ctaDescription="Contact SilverCare today to speak directly with our Senior Clinical Care Manager and arrange a free home assessment anywhere in Sector 15 or Panchkula."
    />
  );
}
