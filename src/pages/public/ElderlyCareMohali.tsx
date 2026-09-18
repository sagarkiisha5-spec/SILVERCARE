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

// Top 10 Best Elderly Healthcare Services in Mohali Dataset
const TOP_MOHALI_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-mohali",
    title: "24/7 Skilled Home Nursing & Attendant Care in Mohali",
    badgeTag: "#1 Choice in SAS Nagar Mohali",
    category: "nursing",
    rating: 4.9,
    reviewCount: 420,
    shortDesc: "Qualified 12-hour & 24-hour GNM/B.Sc registered nurses for post-op, bedridden, and senior daily assistance across Mohali Phases 1-11 & Aerocity.",
    fullDesc: "SilverCare is Mohali's premier home healthcare provider. Located in close proximity to Fortis & Max Hospitals Mohali, our certified nurses handle tracheostomy, catheterization, IV medications, stroke rehab, and complete bedridden care.",
    keyFeatures: [
      "24-Hour Live-In & 12-Hour Shift Qualified GNM/B.Sc Registered Nurses",
      "Comprehensive Care across Mohali Phases 1-11, Aerocity & Sector 70",
      "Specialized Post-Surgery Care (Direct Discharge Support from Fortis/Max Mohali)",
      "100% Police Verified & Background Checked Caregivers"
    ],
    startingPrice: "₹1,200 / day (Attendant) • ₹2,200 / day (Skilled Nurse)",
    responseTime: "Prompt Same-Day Deployment",
    coveredSectors: ["Mohali Phase 1-11", "Sector 68, 69, 70, 71", "Aerocity & IT City", "Sector 79, 80, 82"],
    recommendedFor: "Bedridden elders, stroke rehabilitation, post-cardiac surgery care, and chronic illness management.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 2,
    id: "doctor-home-visits-mohali",
    title: "Senior Doctor Home Visits & Health Checkups in Mohali",
    badgeTag: "Top Clinical Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 360,
    shortDesc: "Senior MBBS & MD Geriatric Physicians visiting elders at home in Mohali for routine checkups, ECG, prescription reviews, and chronic care.",
    fullDesc: "Skip crowded outpatient clinics. SilverCare doctors conduct comprehensive physical examinations, bedside ECG, oxygen saturation, diabetes & hypertension audits right in the comfort of your Mohali residence.",
    keyFeatures: [
      "Experienced Senior MD Physicians at Your Doorstep",
      "In-Home 12-Lead ECG, Blood Pressure & Vitals Assessment",
      "Medication Optimization & Polypharmacy Review",
      "Priority Referral with Fortis, Max, & Ivy Hospitals Mohali"
    ],
    startingPrice: "₹1,500 - ₹2,000 per visit",
    responseTime: "Same-Day Appointment Available",
    coveredSectors: ["Phase 1 to 11", "Sector 70, 71, 78, 79", "Aerocity & Wave Estate"],
    recommendedFor: "Elderly parents needing routine medical attention, multi-morbidity reviews, or post-hospital follow-ups.",
    doctorSupervised: true,
    icon: UserCheck,
  },
  {
    rank: 3,
    id: "post-surgery-hospital-discharge-mohali",
    title: "Hospital-to-Home Post-Surgery Transition Care",
    badgeTag: "Hospital Grade Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 310,
    shortDesc: "Specialized post-discharge nursing aligned with Fortis Mohali, Max Hospital Phase 6, and Ivy Hospital Sector 71 for fast surgical recovery.",
    fullDesc: "We take over clinical care right as you leave Fortis or Max Mohali. Our team sets up sterile wound dressing, drain management, and IV infusions at home before you arrive.",
    keyFeatures: [
      "Aseptic Surgical Wound Dressing & Suture Care",
      "Post-Cardiac Bypass & Joint Replacement Protocols",
      "Foley Catheter, Ryle's Tube & Drain Tube Management",
      "Direct Medical Updates Shared with Operating Surgeon"
    ],
    startingPrice: "₹2,500 / day (Full Clinical Care Package)",
    responseTime: "Pre-Discharge Bedside Setup",
    coveredSectors: ["All Mohali Phases", "Kharar Road", "Aerocity", "Sector 82"],
    recommendedFor: "Patients discharged after orthopedic, cardiac, oncology, or general surgeries.",
    doctorSupervised: true,
    icon: ShieldCheck,
  },
  {
    rank: 4,
    id: "physiotherapy-stroke-rehab-mohali",
    title: "Stroke Rehab & Orthopedic Physiotherapy at Home",
    badgeTag: "Fastest Recovery",
    category: "rehab",
    rating: 4.9,
    reviewCount: 380,
    shortDesc: "Certified Master of Physiotherapy (MPT) specialists delivering stroke paralysis recovery, knee replacement rehab, and gait training in Mohali.",
    fullDesc: "Bring rehabilitation clinic equipment directly to your Mohali living room. Our physiotherapists bring electrotherapy modalities (TENS/IFT/Ultrasound) and custom mobilization regimes.",
    keyFeatures: [
      "Master of Physiotherapy (MPT) Certified Specialists",
      "Post-Knee & Hip Replacement Rapid Mobilization",
      "Stroke Neuro-Rehabilitation & Balance Training",
      "Pain Management for Severe Arthritis & Sciatica"
    ],
    startingPrice: "₹800 - ₹1,200 per session • ₹18,000 / 15 sessions",
    responseTime: "Same-Day Session Available",
    coveredSectors: ["Phase 1 to 11", "Sector 68 to 82", "Aerocity & IT City"],
    recommendedFor: "Stroke survivors, post-knee replacement seniors, and elderly with mobility impairment.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 5,
    id: "dementia-alzheimers-care-mohali",
    title: "Specialized Dementia & Alzheimer's Memory Care in Mohali",
    badgeTag: "Memory Care Leader",
    category: "specialized",
    rating: 4.8,
    reviewCount: 275,
    shortDesc: "Trained memory care attendants providing cognitive stimulation, wandering prevention, and empathetic behavior management in Mohali.",
    fullDesc: "Compassionate memory care tailored to seniors suffering from Alzheimer's, vascular dementia, or Parkinson's disease. We create a structured, calming home routine.",
    keyFeatures: [
      "Cognitive Stimulation Therapy & Memory Exercises",
      "Anti-Wandering & Home Safety Protocol Setup",
      "Gentle Behavioral Management & Emotional Reassurance",
      "Caregiver Respite & Family Counseling Support"
    ],
    startingPrice: "₹1,400 / day or Customized Monthly Plan",
    responseTime: "Fast Caregiver Placement",
    coveredSectors: ["Mohali Phase 1-11", "Sector 70, 71", "Aerocity", "Wave Estate"],
    recommendedFor: "Seniors with Alzheimer's, Parkinson's disease, or age-related cognitive decline.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 6,
    id: "nri-parent-care-mohali",
    title: "NRI Parent Health Management & Concierge Care in Mohali",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 460,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor visits, lab tests, pharmacy deliveries, and sending live WhatsApp health updates to children in Canada, USA, UK.",
    fullDesc: "Peace of mind for Punjabis settled abroad. SilverCare assigns an accountable care manager in Mohali to oversee all aspects of your parents' well-being and medical routines.",
    keyFeatures: [
      "Dedicated Eldercare Companion & Clinical Manager",
      "Live WhatsApp Vitals Logs & Video Call Updates",
      "Routine Doctor Visits, Lab Tests & Medicine Delivery",
      "24/7 Priority Emergency Transport in Mohali & Tricity"
    ],
    startingPrice: "Custom Monthly & Annual Plans",
    responseTime: "Instant Global Onboarding",
    coveredSectors: ["All Mohali Phases", "Sector 68-82", "Aerocity", "IT City"],
    recommendedFor: "NRI families living in Canada, USA, UK, or Australia with aging parents in Mohali.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 7,
    id: "home-icu-setup-mohali",
    title: "Home ICU Setup & Biomedical Equipment Rental in Mohali",
    badgeTag: "Critical Life Support",
    category: "specialized",
    rating: 4.9,
    reviewCount: 230,
    shortDesc: "Hospital-grade ICU setup at home including Ventilators, BiPAP/CPAP, 5-Function Motorized Beds, Multipara Monitors, and 24/7 ICU Nurses in Mohali.",
    fullDesc: "Transform any room into a high-dependency clinical unit in Mohali. Backed by critical care nurses and biomedical engineers available for prompt delivery and setup.",
    keyFeatures: [
      "Motorized 3 & 5 Function Hospital ICU Beds",
      "Invasive/Non-Invasive Ventilators, BiPAP & CPAP Units",
      "Multipara Patient Monitors & Medical Grade Suction Units",
      "24/7 Critical Care ICU Registered Nurse Coverage"
    ],
    startingPrice: "Equipment rental from ₹300/day • Complete ICU setup custom",
    responseTime: "Fast Delivery & Setup in Mohali",
    coveredSectors: ["Mohali Phase 1-11", "Sector 70, 71, 79, 80", "Aerocity", "Kharar"],
    recommendedFor: "Critically ill patients requiring life support or post-ICU step-down care at home.",
    doctorSupervised: true,
    icon: Building2,
  },
  {
    rank: 8,
    id: "doorstep-lab-tests-mohali",
    title: "Doorstep Blood Sample Collection & Pathology in Mohali",
    badgeTag: "NABL Certified",
    category: "clinical",
    rating: 4.8,
    reviewCount: 310,
    shortDesc: "Painless home sample collection for Senior Health Profiles, Diabetes, Thyroid, Lipid, KFT, LFT with digital reports delivered in 6 hours.",
    fullDesc: "Certified phlebotomists collect blood samples gently at your Mohali home with sterile vacutainers, processed via NABL-accredited labs.",
    keyFeatures: [
      "Painless Blood & Urine Sample Collection at Home",
      "Complete Senior Executive Health Package (65+ Parameters)",
      "NABL & ICMR Accredited Diagnostic Labs",
      "Digital WhatsApp & Email Report Delivery in 6 Hours"
    ],
    startingPrice: "Packages from ₹499",
    responseTime: "Morning Slots Available",
    coveredSectors: ["All Mohali Phases", "Sector 68-82", "Aerocity", "Kharar"],
    recommendedFor: "Diabetic monitoring, routine health checkups, and seniors with mobility challenges.",
    doctorSupervised: true,
    icon: Sparkles,
  },
  {
    rank: 9,
    id: "senior-companionship-mohali",
    title: "Senior Daycare, Companionship & Errands Assistance in Mohali",
    badgeTag: "Emotional Wellness",
    category: "support",
    rating: 4.8,
    reviewCount: 180,
    shortDesc: "Warm, educated companions for morning park walks, mandir/gurdwara visits, bank errands, and engaging conversations in Mohali.",
    fullDesc: "Combat senior isolation. Our verified companions keep elderly parents mentally engaged, active, and safe during daily outings or indoor reading.",
    keyFeatures: [
      "Accompaniment for Walks in Mohali Silvi Park & Gurdwara Amb Sahib",
      "Escort to Hospitals, Clinics & Grocery/Bank Errands",
      "Mental Stimulation Games, Reading & Tech/Smartphone Guidance",
      "Empathetic Friendship & Daily Activity Support"
    ],
    startingPrice: "₹800 / session (4-6 Hours)",
    responseTime: "Same-Day Deployment",
    coveredSectors: ["Phase 1 to 11", "Sector 70, 71", "Aerocity", "Wave Estate"],
    recommendedFor: "Independent seniors seeking emotional companionship, errand support, or social wellness.",
    doctorSupervised: false,
    icon: Heart,
  },
  {
    rank: 10,
    id: "emergency-ambulance-mohali",
    title: "24/7 Priority Emergency Ambulance & Hospital Triage Mohali",
    badgeTag: "24/7 Emergency",
    category: "support",
    rating: 4.9,
    reviewCount: 390,
    shortDesc: "Urgent senior helpline with ALS/BLS ICU ambulances, oxygen support, and fast-track admissions to Fortis, Max, or Ivy Hospital Mohali.",
    fullDesc: "Rapid-response emergency ambulances equipped with defibrillators, oxygen, paramedics, and seamless hospital triage in SAS Nagar Mohali.",
    keyFeatures: [
      "24/7 Dedicated Senior Emergency Helpline",
      "Advanced Life Support (ALS) & Basic Life Support (BLS) Ambulances",
      "Fast-Track Admission into Fortis, Max, and Ivy Mohali",
      "On-Board Paramedic & Critical Oxygenation Support"
    ],
    startingPrice: "Standard Distance Tariff",
    responseTime: "Immediate Emergency Dispatch",
    coveredSectors: ["All Mohali Phases", "Sector 68-82", "Aerocity", "Kharar Road"],
    recommendedFor: "Acute medical emergencies, sudden cardiac symptoms, breathing difficulty, or severe falls.",
    doctorSupervised: true,
    icon: PhoneCall,
  }
];

// Mohali Hospital Bridge & Sector Data
const MOHALI_SECTOR_HUBS: LocationHub[] = [
  { name: "Fortis Hospital Mohali (Sec 62)", status: "Active Hospital Desk", coverage: "Direct discharge transfer & post-cardiac CABG recovery." },
  { name: "Max Super Speciality (Phase 6)", status: "Active Hospital Desk", coverage: "Specialized neuro, orthopedic & oncology home step-down care." },
  { name: "Phases 1-5 & Phase 3B2 Hub", status: "Active Sector Hub", coverage: "Daily Nurse, Attendant & Doctor Home Visits." },
  { name: "Phases 7-11 & Sector 70 Hub", status: "Priority Care Hub", coverage: "24/7 Live-In Attendants & Geriatric Physio." },
  { name: "Aerocity, IT City & Wave Estate", status: "Active Sector Hub", coverage: "Rapid Dispatch & ICU Medical Equipment Setup." }
];

// FAQs for Mohali Eldercare
const MOHALI_FAQS: LocationFAQ[] = [
  {
    q: "Why is SilverCare rated as the best elderly healthcare service in Mohali (SAS Nagar)?",
    a: "SilverCare is Mohali's #1 eldercare choice due to our 100% police-verified nursing staff, close proximity to Fortis and Max Hospitals for immediate hospital step-down care, comprehensive coverage across Phases 1-11 & Aerocity, and dedicated care managers for Punjabi NRI families living abroad."
  },
  {
    q: "How quickly can SilverCare send a nurse to my home in Mohali?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with prompt same-day availability anywhere in Mohali Phases 1-11, Sector 68 to 82, Aerocity, and Wave Estate. For patients getting discharged from Fortis or Max Mohali, we arrange the bedside care setup in advance."
  },
  {
    q: "What is the daily cost of a 24-hour home nurse in Mohali?",
    a: "SilverCare offers transparent and personalized eldercare plans based on patient dependency, clinical needs, and shift duration following a comprehensive assessment."
  },
  {
    q: "Can SilverCare handle post-surgery recovery after heart or knee surgery in Mohali?",
    a: "Yes. Our nurses are specially trained for post-CABG cardiac monitoring, surgical drain care, sterile wound dressings, catheterization, and knee/hip replacement mobility in coordination with your treating surgeon."
  },
  {
    q: "Does SilverCare offer care for NRI parents in Mohali whose children live in Canada/USA?",
    a: "Yes! A large percentage of our Mohali families are NRIs. We assign a dedicated Clinical Care Manager who coordinates doctor visits, medicine deliveries, emergency hospital runs, and sends daily WhatsApp vitals reports to children living abroad."
  },
  {
    q: "Can I rent ICU equipment like an oxygen concentrator or hospital bed in Mohali?",
    a: "Yes. We provide same-day home delivery, installation, and demonstration of hospital beds, oxygen concentrators, BiPAP/CPAP, and multipara monitors across Mohali and surrounding areas."
  }
];

const MOHALI_STATS: LocationStatItem[] = [
  { value: "1,340+", label: "Mohali Seniors Cared", icon: CheckCircle2 },
  { value: "4.9", label: "Google Rating", icon: Star },
  { value: "100%", label: "Verified Staff", icon: ShieldCheck },
  { value: "24/7", label: "Clinical Support", icon: Clock },
];

export default function ElderlyCareMohali() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-mohali";
  const pageTitle = "Best Elderly Healthcare Services in Mohali (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Mohali (SAS Nagar). 24/7 verified in-home nursing, Fortis/Max hospital transition care, doctor home visits, stroke rehab & NRI parent concierge across Phases 1-11, Aerocity & Sec 70.";
  const keywords = "Best elderly healthcare services in Mohali, home nursing Mohali, 24/7 caregiver SAS Nagar Mohali, doctor visit at home Mohali, Fortis hospital discharge care Mohali, Max hospital elder care Mohali, stroke rehabilitation Mohali, NRI parent care Mohali, SilverCare";

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${canonicalUrl}#organization`,
        "name": "SilverCare India - Eldercare Services Mohali",
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
          "streetAddress": "Phase 7 & Sector 70 Care Desk, SAS Nagar",
          "addressLocality": "Mohali",
          "addressRegion": "Punjab",
          "postalCode": "160062",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "30.7046",
          "longitude": "76.7179"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Mohali Phases 1-11" },
          { "@type": "AdministrativeArea", "name": "Sector 68-82 Mohali" },
          { "@type": "AdministrativeArea", "name": "Aerocity & IT City Mohali" },
          { "@type": "AdministrativeArea", "name": "Chandigarh" },
          { "@type": "AdministrativeArea", "name": "Kharar" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1340",
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
        "name": "Top 10 Best Elderly Healthcare Services in Mohali",
        "description": "Ranked list of top-rated senior care and home health services in Mohali (SAS Nagar).",
        "itemListElement": TOP_MOHALI_SERVICES.map((srv, index) => ({
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
        "mainEntity": MOHALI_FAQS.map((faq) => ({
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
      cityName="Mohali (SAS Nagar)"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="🏆 Top-Ranked Senior Healthcare Provider in Mohali (SAS Nagar)"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Mohali"
      heroSubtitle="SilverCare provides hospital-standard 24/7 home nursing, senior MD doctor visits, post-discharge recovery from Fortis/Max Mohali & NRI parent management across Phases 1-11, Aerocity & Sector 68-82."
      stats={MOHALI_STATS}
      services={TOP_MOHALI_SERVICES}
      servicesSectionTitle="Top 10 Rated Elderly Healthcare Services in Mohali"
      servicesSectionSubtitle="Showing verified, clinical-grade home healthcare solutions ranked by Mohali family ratings, clinical quality, and rapid response standards."
      faqs={MOHALI_FAQS}
      sectorHubs={MOHALI_SECTOR_HUBS}
      sectorHubsTitle="Mohali Coverage & Hospital Care Desks"
      sectorHubsSubtitle="Select your phase or hospital coordination desk below to check standby nursing support."
      ctaHeading="Give Your Loved Ones the Dignified Healthcare They Deserve in Mohali"
      ctaDescription="Contact SilverCare today to speak directly with our Senior Clinical Care Manager and arrange a free home assessment anywhere in Mohali."
    />
  );
}
