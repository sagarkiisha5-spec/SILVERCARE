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
  PhoneCall 
} from "lucide-react";
import LocationPageTemplate, { 
  LocationRankedService, 
  LocationHub, 
  LocationFAQ, 
  LocationStatItem 
} from "@/src/components/location/LocationPageTemplate";

// Top 10 Best Elderly Healthcare Services in Chandigarh Dataset
const TOP_CHANDIGARH_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care",
    title: "24/7 Skilled In-Home Nursing & Attendant Care",
    badgeTag: "#1 Choice in Chandigarh",
    category: "nursing",
    rating: 4.9,
    reviewCount: 480,
    shortDesc: "Comprehensive 12-hour and 24-hour live-in registered nurses (GNM/B.Sc) and trained geriatric caregivers for seniors.",
    fullDesc: "SilverCare provides Chandigarh's top-rated in-home nursing care. Certified GNM and B.Sc nurses specialize in bedridden care, post-stroke recovery, tracheostomy care, catheterization, aseptic wound dressing, and IV infusions under doctor supervision.",
    keyFeatures: [
      "12-Hour & 24-Hour Live-In Qualified GNM/B.Sc Registered Nurses",
      "Vitals Logging, Medication Management & Sugar/BP Monitoring",
      "Tracheostomy, Feeding Tube (Ryle's Tube) & Catheter Care",
      "Guaranteed 24-Hour Caregiver Replacement across Chandigarh"
    ],
    startingPrice: "₹1,200 / day (Attendant) • ₹2,200 / day (Skilled Nurse)",
    responseTime: "Prompt Same-Day Deployment",
    coveredSectors: ["Sectors 1-60", "Mohali Phase 1-11", "Panchkula Sectors 1-20", "Zirakpur"],
    recommendedFor: "Bedridden seniors, post-surgical recovery, chronic illness, and elderly mobility assistance.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 2,
    id: "doctor-visit-at-home",
    title: "Senior Physician Doorstep Visits & Geriatric Audits",
    badgeTag: "Top Clinical Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 395,
    shortDesc: "Experienced MBBS & MD Physicians visiting your residence in Chandigarh for thorough geriatric consultations and prescription setups.",
    fullDesc: "Eliminate stressful hospital waiting rooms. Our experienced physicians conduct thorough in-home physical examinations, portable 12-lead ECGs, medicine audits, and personalized care planning across all Chandigarh sectors.",
    keyFeatures: [
      "Senior MD Physicians with PGIMER & GMCH-32 Clinical Background",
      "Doorstep 12-Lead ECG, Blood Pressure & O2 Saturation Checks",
      "Medication Optimization & Polypharmacy Review",
      "Fast-Track Admission Coordination with Top Tricity Hospitals"
    ],
    startingPrice: "₹1,500 - ₹2,000 per consultation",
    responseTime: "Same-Day Appointment Available",
    coveredSectors: ["Sector 1-60", "Sector 8, 9, 10, 11, 15", "Sector 33, 34, 35, 44"],
    recommendedFor: "Elderly with mobility challenges, chronic disease management, multi-morbidity, and routine preventative reviews.",
    doctorSupervised: true,
    icon: UserCheck,
  },
  {
    rank: 3,
    id: "dementia-alzheimers-care",
    title: "Specialized Dementia & Alzheimer's Memory Care",
    badgeTag: "Memory Care Leader",
    category: "specialized",
    rating: 4.8,
    reviewCount: 310,
    shortDesc: "Compassionate memory care attendants certified in cognitive stimulation, wandering prevention, and empathetic behavior therapy.",
    fullDesc: "Managing Alzheimer's and dementia requires structured routines and gentle empathy. SilverCare memory caregivers help Chandigarh seniors maintain daily independence, engage in mental stimulation, and prevent disorientation.",
    keyFeatures: [
      "Cognitive Stimulation Therapy & Memory Orientation Games",
      "Home Safety & Anti-Wandering Security Protocols",
      "Empathetic Behavioral Management & Sleep Regularization",
      "Family Counseling & Caregiver Respite Solutions"
    ],
    startingPrice: "₹1,400 / day or Custom Monthly Package",
    responseTime: "Fast Caregiver Placement",
    coveredSectors: ["All Chandigarh Sectors", "Mohali", "Panchkula MDC"],
    recommendedFor: "Seniors with Alzheimer's disease, Vascular Dementia, Parkinson's, or memory decline.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 4,
    id: "physiotherapy-at-home",
    title: "Geriatric Physiotherapy & Neuro-Rehabilitation",
    badgeTag: "Fastest Recovery",
    category: "rehab",
    rating: 4.9,
    reviewCount: 420,
    shortDesc: "Licensed Master of Physiotherapy (MPT) practitioners delivering stroke rehab, knee/hip surgery mobilization, and balance therapy at home.",
    fullDesc: "Restore confident mobility and independence. SilverCare physiotherapists bring electrotherapy modalities (TENS/IFT/Ultrasound), parallel balance trainers, and manual therapies directly into your Chandigarh home.",
    keyFeatures: [
      "Certified MPT Physiotherapists Specialized in Geriatric Rehab",
      "Post Total Knee/Hip Replacement Mobilization Programs",
      "Stroke Neuro-Rehabilitation & Fall Prevention Gait Training",
      "Portable Electrotherapy Equipment Included"
    ],
    startingPrice: "₹800 - ₹1,200 per session • ₹18,000 / 15 sessions",
    responseTime: "Same-Day Session Booking",
    coveredSectors: ["Sectors 8, 9, 10, 11, 15", "Sectors 33, 34, 35, 44", "All Tricity"],
    recommendedFor: "Post-op joint surgeries, stroke recovery, Parkinson's mobility, arthritis, and fall rehabilitation.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 5,
    id: "post-operative-cardiac-care",
    title: "Post-Hospitalization & Cardiac Recovery Care",
    badgeTag: "Hospital Grade Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 290,
    shortDesc: "Seamless transition from PGIMER, Fortis, or Max Mohali to home with sterile surgical wound dressing, drain management, and vitals monitoring.",
    fullDesc: "Prevent hospital re-admissions. SilverCare establishes a sterile, hospital-standard recovery environment at your residence with ICU-trained nurses, infection prevention protocols, and continuous doctor supervision.",
    keyFeatures: [
      "Aseptic Surgical Dressing & Post-CABG Vitals Tracking",
      "Drain Tube, Foley Catheter & Stoma Management",
      "IV Infusion Administration & Medication Timelines",
      "Daily Doctor Review & Clinical Discharge Liaison"
    ],
    startingPrice: "₹2,500 / day (Full Clinical Package)",
    responseTime: "Pre-Discharge Bedside Setup",
    coveredSectors: ["Greater Chandigarh", "Mohali", "Panchkula", "Zirakpur"],
    recommendedFor: "Patients discharged after cardiac bypass (CABG), orthopedic surgeries, oncology, or intensive care.",
    doctorSupervised: true,
    icon: ShieldCheck,
  },
  {
    rank: 6,
    id: "nri-parent-care",
    title: "NRI Parent Health Management & Dedicated Care Concierge",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 510,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor appointments, medicine deliveries, emergency response, and live WhatsApp updates for overseas children.",
    fullDesc: "Peace of mind across ocean boundaries. Designed for NRIs residing in Canada, USA, UK, and Australia, SilverCare provides a single accountable care manager to oversee your parents' health, nutrition, and daily safety in Chandigarh.",
    keyFeatures: [
      "Dedicated Senior Clinical Care Manager Assigned to Parents",
      "Real-time Digital WhatsApp Health Reports & Bi-weekly Doctor Calls",
      "Doorstep Medicine Refills, Lab Tests & Hospital Escorts",
      "24/7 Priority Emergency Evacuation & Admission Desk"
    ],
    startingPrice: "Custom Monthly & Annual Plans",
    responseTime: "Instant Global Onboarding",
    coveredSectors: ["Chandigarh Sectors 1-60", "Mohali", "Panchkula"],
    recommendedFor: "Aging parents living independently in Chandigarh while children reside overseas.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 7,
    id: "icu-setup-medical-equipment",
    title: "Home ICU Setup & Biomedical Equipment Rental",
    badgeTag: "Critical Care",
    category: "specialized",
    rating: 4.9,
    reviewCount: 260,
    shortDesc: "Complete hospital-grade ICU setup at home including Ventilators, BiPAP/CPAP, 5-Function Motorized Beds, Multipara Monitors, and Critical Care Nurses.",
    fullDesc: "Deliver hospital-level intensive care at home. Our biomedical engineering team installs certified ICU equipment with immediate availability, backed by registered critical care nurses.",
    keyFeatures: [
      "High-End Invasive/Non-Invasive Ventilators & BiPAP/CPAP",
      "5-Function Motorized Hospital ICU Beds & Air Mattresses",
      "5-Lead Multipara Cardiac Monitors & Suction Units",
      "24/7 Critical Care (ICU) Registered Nurse Staffing"
    ],
    startingPrice: "Equipment from ₹300/day • Complete ICU setup custom",
    responseTime: "Fast Equipment Delivery & Setup",
    coveredSectors: ["Entire Chandigarh Tricity Region"],
    recommendedFor: "Critically ill seniors, ventilator-dependent patients, and palliative home care.",
    doctorSupervised: true,
    icon: Building2,
  },
  {
    rank: 8,
    id: "senior-companionship-daycare",
    title: "Senior Companionship, Daycare & Social Well-being",
    badgeTag: "Emotional Wellness",
    category: "support",
    rating: 4.8,
    reviewCount: 195,
    shortDesc: "Educated, compassionate senior companions for morning walks in Sukhna Lake/Rose Garden, reading, clinic escorts, and lively conversation.",
    fullDesc: "Eliminate loneliness and maintain active social vitality. Our verified companions assist with outings, mandir/gurdwara visits, digital tech guidance, and daily hobbies.",
    keyFeatures: [
      "Accompaniment to Sukhna Lake, Rose Garden & Community Centers",
      "Medical & Bank Appointment Escort Services",
      "Mind Fitness, Book Reading, and Tech/Smartphone Assistance",
      "Empathetic Friendship & Daily Activity Assistance"
    ],
    startingPrice: "₹800 / session (4-6 Hours)",
    responseTime: "Same-Day Deployment",
    coveredSectors: ["Chandigarh Sectors 8, 9, 10, 11, 15, 18, 33, 34, 35, 44"],
    recommendedFor: "Independent seniors seeking enriching social engagement and assistance with outside errands.",
    doctorSupervised: false,
    icon: Heart,
  },
  {
    rank: 9,
    id: "pathology-diagnostics-home",
    title: "Doorstep Phlebotomy & NABL Lab Diagnostics",
    badgeTag: "NABL Certified",
    category: "clinical",
    rating: 4.8,
    reviewCount: 340,
    shortDesc: "Painless home sample collection for 65+ senior executive health parameters with accurate digital reports delivered within 6 hours.",
    fullDesc: "Skip diagnostic center queues. Certified phlebotomists collect blood and urine samples gently at your doorstep and process them in NABL & ICMR accredited laboratories.",
    keyFeatures: [
      "100% Sterile, Painless Blood & Urine Sample Collection",
      "Comprehensive Senior Wellness Profiles (Sugar, Lipid, KFT, LFT, CBC, Thyroid)",
      "Digital WhatsApp & Email Report Delivery in 6 Hours",
      "Free Doctor Tele-Consultation on Lab Findings"
    ],
    startingPrice: "Packages from ₹499 • Routine Tests Standard Rates",
    responseTime: "Morning Home Slots Available",
    coveredSectors: ["All Chandigarh Sectors", "Mohali", "Panchkula", "Zirakpur"],
    recommendedFor: "Diabetic monitoring, routine health screening, and mobility-impaired elders.",
    doctorSupervised: true,
    icon: Sparkles,
  },
  {
    rank: 10,
    id: "emergency-eldercare-ambulance",
    title: "24/7 Priority Emergency Ambulance & Hospital Triage",
    badgeTag: "24/7 Emergency",
    category: "support",
    rating: 4.9,
    reviewCount: 430,
    shortDesc: "Dedicated senior emergency SOS helpline with ALS/BLS ICU ambulances, oxygen support, and fast-track admission to PGIMER, GMCH-32, and Fortis.",
    fullDesc: "When emergencies strike, every second is precious. SilverCare provides rapid-response ICU ambulances equipped with defibrillators, oxygen, paramedics, and guaranteed hospital triage.",
    keyFeatures: [
      "24/7 Dedicated Senior Emergency SOS Helpline",
      "Advanced Cardiac Life Support (ACLS) Ambulances",
      "Direct Admission Coordination with PGIMER, GMCH 32, Fortis",
      "On-Board Emergency Paramedic & Critical Oxygenation"
    ],
    startingPrice: "Standard Distance Tariff",
    responseTime: "Immediate Emergency Dispatch",
    coveredSectors: ["Entire Chandigarh & Tricity Region"],
    recommendedFor: "Sudden breathing difficulty, cardiac distress, acute fall trauma, or stroke symptoms.",
    doctorSupervised: true,
    icon: PhoneCall,
  }
];

// Chandigarh Sector Navigator Data
const CHANDIGARH_SECTOR_HUBS: LocationHub[] = [
  { name: "Sector 8 & 9 (VIP Belt)", status: "Active Sector Hub", coverage: "Daily Nurse & Attendant Coverage" },
  { name: "Sector 10 & 11 (North Zone)", status: "Active Sector Hub", coverage: "Home Caregivers on Standby" },
  { name: "Sector 15 & 16 (Near GMCH)", status: "Priority Medical Hub", coverage: "Fast Hospital Discharge Support" },
  { name: "Sector 17 & 22 (City Center)", status: "Active Sector Hub", coverage: "Doctor & Nursing Visits" },
  { name: "Sector 33, 34 & 35 (South Zone)", status: "Priority Care Hub", coverage: "24/7 Live-In Caregivers" },
  { name: "Sector 44, 45 & 46 (South-East)", status: "Active Sector Hub", coverage: "Geriatric Physio & Nursing" },
  { name: "Manimajra & IT Park", status: "Active Sector Hub", coverage: "Home Health Checkups" },
  { name: "Mohali Border Sectors (48-60)", status: "Tricity Connector Hub", coverage: "Rapid Dispatch & ICU Care" }
];

// FAQs for Chandigarh Eldercare
const CHANDIGARH_FAQS: LocationFAQ[] = [
  {
    q: "Why is SilverCare rated as the best elderly healthcare service in Chandigarh?",
    a: "SilverCare is the leading eldercare provider in Chandigarh due to our 100% background-checked & police-verified nursing staff, direct clinical doctor supervision for every senior, comprehensive coverage across all sectors, and dedicated care managers for NRI families living abroad. We provide 12h/24h skilled nursing with a guaranteed 24-hour caregiver replacement."
  },
  {
    q: "How quickly can SilverCare deploy a nurse or attendant to my sector in Chandigarh?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with same-day prompt availability across Sectors 1-60, Mohali, and Panchkula. For post-hospital discharges from PGIMER, GMCH-32, or Fortis, our team coordinates with the hospital to set up equipment and care staff before the patient reaches home."
  },
  {
    q: "What are the charges for hiring a 24-hour home nurse in Chandigarh?",
    a: "SilverCare offers transparent and personalized care plans based on patient dependency, clinical needs, and duration. Our care managers provide a complete custom plan following a clinical assessment."
  },
  {
    q: "How does SilverCare support NRI children living in Canada, USA, UK, or Australia?",
    a: "SilverCare assigns a dedicated Senior Clinical Care Manager who coordinates regular physician checkups, doorstep medicine delivery, emergency transport, and sends real-time WhatsApp vitals updates and audio-video briefings directly to family members overseas."
  },
  {
    q: "Can SilverCare set up a full ICU with ventilator support at home in Chandigarh?",
    a: "Yes. SilverCare provides hospital-grade ICU setups at home in Chandigarh, including motorized ICU beds, mechanical ventilators, BiPAP/CPAP, multipara cardiac monitors, suction units, oxygen concentrators, and 24/7 critical care ICU registered nurses."
  },
  {
    q: "Are SilverCare doctors affiliated with local Chandigarh hospitals?",
    a: "Our visiting doctors and clinical directors have extensive medical experience across top North Indian tertiary centers including PGIMER Chandigarh, GMCH Sector 32, Fortis Mohali, and Max Super Speciality Hospital, ensuring seamless coordination and fast-track admissions if needed."
  }
];

const CHANDIGARH_STATS: LocationStatItem[] = [
  { value: "1,500+", label: "Chandigarh Families Cared", icon: CheckCircle2 },
  { value: "4.9", label: "Google Rating", icon: Star },
  { value: "100%", label: "Verified Caregivers", icon: ShieldCheck },
  { value: "24/7", label: "Clinical Support", icon: Clock },
];

export default function ElderlyCareChandigarh() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-chandigarh";
  const pageTitle = "Best Elderly Healthcare Services in Chandigarh (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Chandigarh. 24/7 verified in-home nursing, senior MD doctor home visits, NRI parent care, dementia support, bedridden patient attendants & ICU setup across Sectors 1-60.";
  const keywords = "Best elderly healthcare services in Chandigarh, top senior care Chandigarh, 24/7 home nursing Chandigarh, doctor visit at home Chandigarh, NRI parent care Chandigarh, dementia care Chandigarh, geriatric physiotherapy Chandigarh, ICU setup home Chandigarh, bedridden senior care Chandigarh, SilverCare";

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${canonicalUrl}#organization`,
        "name": "SilverCare India - Eldercare Services Chandigarh",
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
          "streetAddress": "Sector 17 & Sector 35 Hub, Chandigarh",
          "addressLocality": "Chandigarh",
          "addressRegion": "Chandigarh UT",
          "postalCode": "160017",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "30.7333",
          "longitude": "76.7794"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Chandigarh Sectors 1-60" },
          { "@type": "AdministrativeArea", "name": "Sector 1-30 VIP Zone Chandigarh" },
          { "@type": "AdministrativeArea", "name": "Sector 31-60 South Chandigarh" },
          { "@type": "AdministrativeArea", "name": "Mohali" },
          { "@type": "AdministrativeArea", "name": "Panchkula" },
          { "@type": "AdministrativeArea", "name": "Zirakpur" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1480",
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
        "name": "Top 10 Best Elderly Healthcare Services in Chandigarh",
        "description": "Ranked list of top-rated senior care and home health services in Chandigarh.",
        "itemListElement": TOP_CHANDIGARH_SERVICES.map((srv, index) => ({
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
        "mainEntity": CHANDIGARH_FAQS.map((faq) => ({
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
      cityName="Chandigarh"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="🏆 Top-Ranked Senior Healthcare Provider in Chandigarh"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Chandigarh"
      heroSubtitle="SilverCare brings hospital-standard 24/7 home nursing, senior MD doctor visits, NRI parent management & intensive rehabilitation directly to senior citizens across Chandigarh Sectors 1-60, Mohali & Panchkula."
      stats={CHANDIGARH_STATS}
      services={TOP_CHANDIGARH_SERVICES}
      servicesSectionTitle="Top 10 Rated Elderly Healthcare Services in Chandigarh"
      servicesSectionSubtitle="Showing verified, clinical-grade home healthcare solutions ranked by Chandigarh family ratings, clinical quality, and rapid response standards."
      faqs={CHANDIGARH_FAQS}
      sectorHubs={CHANDIGARH_SECTOR_HUBS}
      sectorHubsTitle="Chandigarh Sector Coverage Navigator"
      sectorHubsSubtitle="Select your sector zone below to view active local caregiver coverage and one-click assistance."
      ctaHeading="Give Your Loved Ones the Dignified Healthcare They Deserve in Chandigarh"
      ctaDescription="Contact SilverCare today to speak directly with our Senior Clinical Care Manager and arrange a free home assessment anywhere in Chandigarh."
    />
  );
}
