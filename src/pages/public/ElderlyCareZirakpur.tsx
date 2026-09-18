import React from "react";
import { 
  Stethoscope, 
  UserCheck, 
  Activity, 
  Heart, 
  Sparkles, 
  Building2, 
  Globe,
  Layers,
  PhoneCall
} from "lucide-react";
import LocationPageTemplate, { 
  LocationRankedService, 
  LocationHub, 
  LocationFAQ 
} from "@/src/components/location/LocationPageTemplate";

// Ranked Eldercare Services in Zirakpur Dataset
const TOP_ZIRAKPUR_SERVICES: LocationRankedService[] = [
  {
    rank: 1,
    id: "nursing-attendant-care-zirakpur",
    title: "24/7 Skilled In-Home Nursing & Attendant Care in Zirakpur",
    badgeTag: "#1 Flagship Hub in Zirakpur",
    category: "nursing",
    rating: 5.0,
    reviewCount: 450,
    shortDesc: "SilverCare's flagship central headquarters is based in Zirakpur! Delivering rapid deployment of qualified GNM/B.Sc registered nurses across VIP Road, Dhakoli, & Peer Muchalla.",
    fullDesc: "Because SilverCare's central clinical operations are headquartered at Green Lotus Avenue Complex, Zirakpur, our eldercare teams offer rapid deployment for 12h/24h nursing, catheterization, bedridden care, and post-operative recovery across all Zirakpur societies.",
    keyFeatures: [
      "Headquarters Proximity: Immediate Caregiver Deployment in Zirakpur",
      "12-Hour & 24-Hour Live-In Qualified GNM & B.Sc Registered Nurses",
      "Coverage Across VIP Road, Dhakoli, Peer Muchalla, Gazipur & PR7 Airport Road",
      "100% Police Verified & Doctor-Supervised Clinical Staff"
    ],
    startingPrice: "₹1,200 / day (Attendant) • ₹2,200 / day (Skilled Nurse)",
    responseTime: "Prompt Same-Day Deployment",
    coveredSectors: ["VIP Road & VIP Galleria", "Dhakoli & Peer Muchalla", "Singhpura & Gazipur Road", "Patiala Highway & Ambala Highway"],
    recommendedFor: "Bedridden elders, post-surgical recovery, chronic illness care, and 24/7 senior assistance.",
    doctorSupervised: true,
    icon: Stethoscope,
  },
  {
    rank: 2,
    id: "doctor-home-visits-zirakpur",
    title: "Senior Physician & Geriatric Doctor Home Visits in Zirakpur",
    badgeTag: "Top Clinical Care",
    category: "clinical",
    rating: 4.9,
    reviewCount: 380,
    shortDesc: "Senior MBBS & MD Physicians visiting residential apartments across Zirakpur for thorough health checkups, portable ECG, and prescription audits.",
    fullDesc: "Skip chaotic traffic on Chandigarh-Ambala highway. SilverCare doctors conduct bedside consultations, 12-lead ECG, blood pressure checks, and chronic care management in your Zirakpur apartment.",
    keyFeatures: [
      "Senior MD Physicians Visiting Your High-Rise Apartment",
      "At-Home 12-Lead ECG, Blood Pressure & Pulse Oximetry Diagnostics",
      "Medication Optimization & Polypharmacy Review",
      "Direct Hospital Referral Coordination across Tricity"
    ],
    startingPrice: "₹1,500 - ₹2,000 per consultation",
    responseTime: "Same-Day Appointment Available",
    coveredSectors: ["VIP Road Societies", "PR7 Airport Road", "Maya Garden", "Highland Park", "Savitry Greens"],
    recommendedFor: "Seniors with mobility issues, routine checkups, hypertension, diabetes, and multi-morbidity care.",
    doctorSupervised: true,
    icon: UserCheck,
  },
  {
    rank: 3,
    id: "highrise-apartment-care-zirakpur",
    title: "High-Rise Society Eldercare & Lift-Assisted Mobility Protocol",
    badgeTag: "High-Rise Specialist",
    category: "support",
    rating: 5.0,
    reviewCount: 395,
    shortDesc: "Specialized care designed for senior citizens living in multi-storey gated societies along VIP Road, PR7, and Dhakoli with dedicated elevator-assisted mobility.",
    fullDesc: "Navigating elevators, high-rise balconies, and large society podiums requires vigilant caregivers. Our attendants provide safe wheelchair transfers, park walk accompaniment, and emergency evacuation protocols.",
    keyFeatures: [
      "Wheelchair & Lift Transition Assistance in Multi-Storey Towers",
      "Accompaniment to Society Clubhouses, Parks & Temple Complexes",
      "Direct Gate-Pass & Society Security Liaison for Smooth Access",
      "Rapid Elevator Emergency Evacuation Protocols"
    ],
    startingPrice: "₹1,200 / day or Custom Monthly Package",
    responseTime: "Fast Society Gate Dispatch",
    coveredSectors: ["Maya Garden City", "Highland Park", "Savitry Greens", "Motiaz Royal", "Sushma Grande"],
    recommendedFor: "Seniors residing in 4th to 15th-floor apartments requiring mobility and outdoor assistance.",
    doctorSupervised: false,
    icon: Layers,
  },
  {
    rank: 4,
    id: "physiotherapy-stroke-rehab-zirakpur",
    title: "Geriatric Physiotherapy & Joint Surgery Rehab at Home",
    badgeTag: "Fastest Recovery",
    category: "rehab",
    rating: 4.9,
    reviewCount: 370,
    shortDesc: "Certified Master of Physiotherapy (MPT) practitioners delivering stroke paralysis recovery, knee replacement rehab, and gait training in Zirakpur.",
    fullDesc: "Restore confident mobility without travelling to clinics. Our certified physiotherapists bring electrotherapy equipment (TENS/IFT/Ultrasound), balance trainers, and manual therapies directly to your Zirakpur apartment.",
    keyFeatures: [
      "Certified MPT Physiotherapists Specialized in Geriatrics",
      "Post-Total Knee/Hip Replacement Mobilization Programs",
      "Stroke Neuro-Rehabilitation & Fall Prevention Gait Training",
      "Portable Electrotherapy Equipment Included in Every Session"
    ],
    startingPrice: "₹800 - ₹1,200 per session • ₹18,000 / 15 sessions",
    responseTime: "Same-Day Session Booking",
    coveredSectors: ["VIP Road", "PR7 Airport Road", "Dhakoli", "Peer Muchalla", "Singhpura"],
    recommendedFor: "Post-op joint surgeries, stroke recovery, arthritis, sciatica, and fall rehabilitation.",
    doctorSupervised: true,
    icon: Activity,
  },
  {
    rank: 5,
    id: "dementia-alzheimers-care-zirakpur",
    title: "Specialized Dementia & Alzheimer's Memory Care Zirakpur",
    badgeTag: "Memory Care Leader",
    category: "specialized",
    rating: 4.8,
    reviewCount: 280,
    shortDesc: "Compassionate memory care specialists certified in cognitive stimulation, balcony/door anti-wandering protocols, and dementia behavioral management.",
    fullDesc: "Managing dementia in high-rise societies requires safety protocols to prevent balcony falls and elevator wandering. SilverCare's memory caregivers provide 24/7 vigilant reassurance.",
    keyFeatures: [
      "High-Rise Apartment Balcony & Door Anti-Wandering Protocols",
      "Cognitive Stimulation Therapy & Memory Orientation Games",
      "Gentle Behavioral Management & Emotional Reassurance",
      "Caregiver Respite & Family Counseling Support"
    ],
    startingPrice: "₹1,400 / day or Custom Monthly Package",
    responseTime: "Fast Caregiver Placement",
    coveredSectors: ["All Zirakpur Societies", "VIP Road", "Peer Muchalla", "Dhakoli"],
    recommendedFor: "Seniors with Alzheimer's, Parkinson's disease, or age-related memory decline.",
    doctorSupervised: true,
    icon: Heart,
  },
  {
    rank: 6,
    id: "nri-parent-care-zirakpur",
    title: "NRI Parent Healthcare & Dedicated Care Manager in Zirakpur",
    badgeTag: "Global NRI Preferred",
    category: "support",
    rating: 5.0,
    reviewCount: 470,
    shortDesc: "Dedicated Clinical Care Managers coordinating doctor checkups, medicines delivery, 24/7 emergency response, and live WhatsApp updates for overseas children.",
    fullDesc: "Peace of mind for Punjabis settled in Canada, USA, UK, or Australia. Because SilverCare is based in Zirakpur, our senior care managers personally visit and oversee your parents' health daily.",
    keyFeatures: [
      "Dedicated Senior Clinical Care Manager Assigned from HQ",
      "Real-time Digital WhatsApp Health Reports & Bi-weekly Doctor Calls",
      "Doorstep Medicine Refills, Lab Tests & Hospital Escort",
      "24/7 Priority Emergency Evacuation across Zirakpur & Tricity"
    ],
    startingPrice: "Custom Monthly & Annual NRI Care Plans",
    responseTime: "Instant Global Onboarding",
    coveredSectors: ["Entire Zirakpur Area", "VIP Road", "Singhpura", "Dhakoli"],
    recommendedFor: "Aging parents residing independently in Zirakpur with adult children overseas.",
    doctorSupervised: true,
    icon: Globe,
  },
  {
    rank: 7,
    id: "home-icu-setup-zirakpur",
    title: "Home ICU Setup & Biomedical Equipment Rental in Zirakpur",
    badgeTag: "Critical Life Support",
    category: "specialized",
    rating: 4.9,
    reviewCount: 240,
    shortDesc: "Hospital-grade ICU setup at home including Ventilators, BiPAP/CPAP, 5-Function Motorized Beds, Multipara Monitors, and 24/7 Critical Care Nurses in Zirakpur.",
    fullDesc: "Delivered directly from our central Zirakpur medical warehouse! Installed by certified biomedical engineers and staffed by experienced ICU registered nurses.",
    keyFeatures: [
      "Direct Delivery from Central Zirakpur Medical Depot",
      "Motorized 3 & 5 Function Hospital ICU Beds & Ripple Mattresses",
      "High-End Invasive/Non-Invasive Ventilators & BiPAP/CPAP",
      "24/7 Critical Care ICU Registered Nurse Coverage"
    ],
    startingPrice: "Equipment rental from ₹300/day • Complete ICU setup custom",
    responseTime: "Fast Warehouse Dispatch",
    coveredSectors: ["All Zirakpur Societies", "Dhakoli", "Peer Muchalla", "Panchkula Border"],
    recommendedFor: "Critically ill patients requiring life support or post-ICU step-down recovery at home.",
    doctorSupervised: true,
    icon: Building2,
  },
  {
    rank: 8,
    id: "doorstep-lab-tests-zirakpur",
    title: "Doorstep Pathology Blood Collection & Health Checkups Zirakpur",
    badgeTag: "NABL Certified",
    category: "clinical",
    rating: 4.8,
    reviewCount: 320,
    shortDesc: "Painless home sample collection for Complete Senior Health Profiles, Diabetes, Thyroid, Lipid, KFT, LFT with digital reports in 6 hours.",
    fullDesc: "Skip traffic and clinic queues. Certified phlebotomists collect blood samples gently at your Zirakpur residence with sterile equipment and NABL-accredited processing.",
    keyFeatures: [
      "Painless Blood & Urine Sample Collection at Home",
      "Complete Senior Executive Health Package (65+ Parameters)",
      "NABL & ICMR Accredited Diagnostic Labs",
      "Digital WhatsApp & Email Report Delivery in 6 Hours"
    ],
    startingPrice: "Packages from ₹499",
    responseTime: "Morning Slots Available",
    coveredSectors: ["All Zirakpur Societies", "VIP Road", "PR7", "Dhakoli"],
    recommendedFor: "Routine diabetic monitoring, lipid profiles, and mobility-impaired elders.",
    doctorSupervised: true,
    icon: Sparkles,
  },
  {
    rank: 9,
    id: "senior-companionship-zirakpur",
    title: "Senior Daycare, Companionship & Errands Assistance Zirakpur",
    badgeTag: "Emotional Wellness",
    category: "support",
    rating: 4.8,
    reviewCount: 190,
    shortDesc: "Warm, educated companions for morning walks inside gated societies, grocery shopping on VIP Road, reading, and doctor escorts in Zirakpur.",
    fullDesc: "Combat senior isolation in high-rise apartments. Our verified companions keep elderly parents mentally engaged, active, and safe during daily outings or indoor reading.",
    keyFeatures: [
      "Accompaniment for Walks in Society Gardens & Parks",
      "Escort to Clinics, D-Mart / Supermarket & Bank Errands",
      "Mental Stimulation Games, Reading & Tech/Smartphone Assistance",
      "Empathetic Friendship & Daily Activity Assistance"
    ],
    startingPrice: "₹800 / session (4-6 Hours)",
    responseTime: "Same-Day Deployment",
    coveredSectors: ["VIP Road", "PR7 Airport Road", "Dhakoli", "Peer Muchalla"],
    recommendedFor: "Independent seniors seeking enriching social engagement and assistance with outside errands.",
    doctorSupervised: false,
    icon: Heart,
  },
  {
    rank: 10,
    id: "emergency-ambulance-zirakpur",
    title: "24/7 Priority Emergency Ambulance & Hospital Triage Zirakpur",
    badgeTag: "24/7 Emergency",
    category: "support",
    rating: 4.9,
    reviewCount: 420,
    shortDesc: "Urgent senior helpline with ALS/BLS ICU ambulances, oxygen support, and fast-track admissions across Chandigarh, Mohali, and Panchkula hospitals.",
    fullDesc: "Rapid-response emergency ambulances stationed at Zirakpur junction with quick access to Chandigarh, Mohali, and Panchkula tertiary hospitals.",
    keyFeatures: [
      "24/7 Dedicated Senior Emergency Helpline",
      "Advanced Life Support (ALS) & Basic Life Support (BLS) Ambulances",
      "Direct Highway Corridor Access to PGIMER, Fortis & Alchemist",
      "On-Board Emergency Paramedic & Critical Oxygenation"
    ],
    startingPrice: "Standard Distance Tariff",
    responseTime: "Immediate Emergency Dispatch",
    coveredSectors: ["Entire Zirakpur, Dhakoli, Peer Muchalla, Gazipur"],
    recommendedFor: "Acute medical emergencies, sudden cardiac distress, breathing difficulty, or severe falls.",
    doctorSupervised: true,
    icon: PhoneCall,
  }
];

// Zirakpur Top Gated Societies Locator Data
const ZIRAKPUR_SOCIETIES: LocationHub[] = [
  { name: "Maya Garden City / Phase 1-3", status: "Active Care Hub", coverage: "Daily Nurse & Attendant Visits on VIP Road" },
  { name: "Highland Park / Terraces", status: "Active Care Hub", coverage: "Home Caregivers on Standby (Patiala Highway)" },
  { name: "Savitry Greens 1 & 2", status: "Active Care Hub", coverage: "Fast Doorstep Dispatch on VIP Road" },
  { name: "Motiaz Royal City / Heights", status: "Active Care Hub", coverage: "24/7 Live-In Caregivers (Ambala Highway)" },
  { name: "Sushma Grande / Crescent", status: "Active Care Hub", coverage: "Geriatric Physio & Nursing on PR7 Airport Road" },
  { name: "Green Lotus Avenue / Saksham", status: "Headquarters Hub", coverage: "Central Management & Medical Depot (Singhpura)" },
  { name: "Orbit Apartments & Motia Blue Ridge", status: "Active Care Hub", coverage: "Home Health Checkups & Attendant Care" },
  { name: "Trident Hills & Peer Muchalla Societies", status: "Active Care Hub", coverage: "Emergency & Attendant Care in Peer Muchalla" }
];

// FAQs for Zirakpur Eldercare
const ZIRAKPUR_FAQS: LocationFAQ[] = [
  {
    q: "Why is SilverCare rated as the best elderly healthcare service in Zirakpur?",
    a: "SilverCare is headquartered in Zirakpur at Green Lotus Avenue Complex! Because our central management, medical depot, and nurse training hubs are based here, we offer prompt same-day deployment across all VIP Road, PR7, Dhakoli, and Peer Muchalla gated societies with 100% police-verified staff."
  },
  {
    q: "How fast can a nurse reach my high-rise apartment on VIP Road or PR7 Airport Road?",
    a: "We deploy qualified GNM/B.Sc nurses and attendants with prompt availability to any society in Zirakpur, including Maya Garden, Savitry Greens, Highland Park, Motiaz, and Sushma Grande."
  },
  {
    q: "What are the rates for hiring a 24-hour home nurse in Zirakpur?",
    a: "SilverCare provides customized, transparent eldercare plans tailored to specific health requirements and shift durations following a clinical assessment."
  },
  {
    q: "Do you provide special elevator and balcony safety care for high-rise apartments in Zirakpur?",
    a: "Yes! High-rise apartment living requires specialized protocols to ensure senior mobility in elevators, clubhouse accompaniment, anti-wandering measures, and rapid emergency evacuation."
  },
  {
    q: "Can SilverCare look after NRI parents living in Zirakpur while children are abroad?",
    a: "Yes! Many NRI families with parents in Zirakpur rely on SilverCare. Our local HQ care manager visits your parents, manages doctor consultations, delivers medications, and provides daily WhatsApp health logs to children in Canada, USA, UK, or Australia."
  },
  {
    q: "How fast can I get ICU medical equipment delivered to my home in Zirakpur?",
    a: "Because our central medical equipment warehouse is located in Zirakpur, motorized ICU beds, ventilators, BiPAP/CPAP machines, oxygen concentrators, and patient monitors can be delivered and set up on the same day."
  }
];

export default function ElderlyCareZirakpur() {
  const canonicalUrl = "https://silvercareindia.com/best-elderly-healthcare-services-zirakpur";
  const pageTitle = "Best Elderly Healthcare Services in Zirakpur (2026) | SilverCare™";
  const pageDesc = "Rated #1 Best Elderly Healthcare Services in Zirakpur. 24/7 verified in-home nursing, doctor home visits, high-rise society senior care, ICU setup & NRI parent support across VIP Road, PR7 Airport Road & Dhakoli.";
  const keywords = "Best elderly healthcare services in Zirakpur, home nursing Zirakpur, doctor visit at home Zirakpur, VIP Road Zirakpur eldercare, PR7 Airport Road nursing, Maya Garden senior care, 24/7 caregiver Dhakoli, SilverCare Zirakpur";

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": `${canonicalUrl}#organization`,
        "name": "SilverCare India - Central Headquarters & Eldercare Hub Zirakpur",
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
          "streetAddress": "SCO 110, 1st Floor, Green Lotus Avenue Complex, Zirakpur",
          "addressLocality": "Zirakpur",
          "addressRegion": "Punjab",
          "postalCode": "140603",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "30.6425",
          "longitude": "76.8173"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "VIP Road Zirakpur" },
          { "@type": "AdministrativeArea", "name": "PR7 Airport Road Zirakpur" },
          { "@type": "AdministrativeArea", "name": "Dhakoli Zirakpur" },
          { "@type": "AdministrativeArea", "name": "Peer Muchalla Zirakpur" },
          { "@type": "AdministrativeArea", "name": "Singhpura Zirakpur" },
          { "@type": "AdministrativeArea", "name": "Maya Garden City & Sushma Square" }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "1520",
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
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", ".hero-subtext", ".ranked-service-title"]
        }
      },
      {
        "@type": "ItemList",
        "name": "Top 10 Best Elderly Healthcare Services in Zirakpur",
        "description": "Ranked list of top-rated senior care and home health services in Zirakpur Punjab.",
        "itemListElement": TOP_ZIRAKPUR_SERVICES.map((srv, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "name": srv.title,
            "description": srv.shortDesc,
            "provider": {
              "@type": "MedicalBusiness",
              "name": "SilverCare India"
            },
            "areaServed": "Zirakpur, Punjab, India",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": srv.rating.toString(),
              "reviewCount": srv.reviewCount.toString()
            }
          }
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": ZIRAKPUR_FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://silvercareindia.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://silvercareindia.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Best Elderly Healthcare Services in Zirakpur",
            "item": canonicalUrl
          }
        ]
      }
    ]
  };

  return (
    <LocationPageTemplate
      cityName="Zirakpur"
      canonicalUrl={canonicalUrl}
      pageTitle={pageTitle}
      pageDesc={pageDesc}
      keywords={keywords}
      schemaData={schemaData}
      eyebrowBadgeText="🏆 Central Headquarters & Senior Care Hub in Zirakpur"
      h1TitleStart="Best Elderly Healthcare Services in "
      h1CityHighlighted="Zirakpur"
      heroSubtitle="Headquartered at Green Lotus Avenue Complex, SilverCare provides verified home nursing, doctor visits, high-rise lift assistance & home ICU setups across VIP Road, PR7 & Dhakoli."
      stats={[
        { value: "1,520+", label: "Zirakpur Families" },
        { value: "5.0", label: "Google Rating" },
        { value: "100%", label: "Verified Caregivers" },
        { value: "24/7", label: "Central HQ Support" },
      ]}
      services={TOP_ZIRAKPUR_SERVICES}
      servicesSectionTitle="Top 10 Rated Elderly Healthcare Services in Zirakpur"
      servicesSectionSubtitle="Showing verified, clinical-grade home healthcare solutions ranked by Zirakpur family ratings, headquarters response speed, and clinical quality."
      faqs={ZIRAKPUR_FAQS}
      sectorHubs={ZIRAKPUR_SOCIETIES}
      sectorHubsTitle="Zirakpur Gated Societies Dispatch Navigator"
      sectorHubsSubtitle="Click your residential society below to view active local coverage and fast dispatch from our central Zirakpur hub."
      ctaHeading="Give Your Loved Ones the Dignified Healthcare They Deserve in Zirakpur"
      ctaDescription="Contact SilverCare headquarters today to speak directly with our Senior Clinical Care Manager and arrange a free home assessment in your society."
    />
  );
}
