const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection } = require('firebase/firestore');
const appletConfig = require('../firebase-applet-config.json');

const firebaseConfig = {
  apiKey: appletConfig.apiKey,
  authDomain: appletConfig.authDomain,
  projectId: appletConfig.projectId,
  storageBucket: appletConfig.storageBucket,
  messagingSenderId: appletConfig.messagingSenderId,
  appId: appletConfig.appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, appletConfig.firestoreDatabaseId);

const siteSettings = {
  heroTitle: "Professional care,\nwith compassion.",
  heroSubtitle: "Professional eldercare services delivered at home across North India. From nursing care to doctor visits, we bring comprehensive healthcare to your loved ones.",
  heroBadge: "Trusted Eldercare & Medical Services",
  heroImageUrl: "/hero-doctor.png",
  doctorName: "Navin Chauhan",
  doctorTitle: "CEO & Founder, SilverCare India",
  doctorImageUrl: "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png",
  doctorBadge: "Patient-First Approach",
  phone: "+91 800-14-800-75",
  emergencyPhone: "+91 800-14-800-75",
  whatsapp: "+918001480075",
  email: "care@silvercareindia.com",
  address: "Flat No-60, SF Sector-33, Gurgaon, Haryana, India 122001",
  workingHours: "24/7 Care & Emergency Support",
  experienceYears: "10+",
  happyPatients: "10,000+",
  verifiedStaff: "100%",
  updatedAt: Date.now()
};

const services = [
  { 
    id: 'sc-1', 
    title: 'Nursing & Attendant Care', 
    slug: 'nursing-attendant-care', 
    category: 'Medical & Daily Care', 
    shortDescription: 'Professional registered nurses and trained attendants providing round-the-clock medical care and daily living support at home.', 
    description: 'Our professional nurses and trained attendants deliver compassionate, structured care tailored to your family’s specific medical and daily living needs. From medication management, wound dressing, and vital sign tracking to hygiene, mobility support, and post-operative recovery, SilverCare ensures your loved ones stay safe and comfortable at home.', 
    icon: 'heartpulse', 
    isActive: true, 
    isFeatured: true,
    aliases: ['home nursing', 'nurse', 'attendant', 'caregiver', 'icu at home', 'injection', 'dressing'] 
  },
  { 
    id: 'sc-2', 
    title: 'Doctor Visit at Home', 
    slug: 'doctor-visit-at-home', 
    category: 'Clinical Consultations', 
    shortDescription: 'Qualified physicians providing medical consultations, treatment reviews, and ongoing care coordination at your doorstep.', 
    description: 'Avoid stressful travel and hospital waiting rooms. Our experienced doctors visit your home to conduct comprehensive health assessments, routine medical checkups, chronic disease management, and prescription reviews in a comfortable, familiar environment.', 
    icon: 'stethoscope', 
    isActive: true, 
    isFeatured: true,
    aliases: ['doctor visit', 'home doctor', 'physician consultation', 'medical checkup'] 
  },
  { 
    id: 'sc-3', 
    title: 'Physiotherapy at Home', 
    slug: 'physiotherapy-at-home', 
    category: 'Rehabilitation & Mobility', 
    shortDescription: 'Certified physiotherapists delivering rehabilitation and mobility therapy for post-surgical recovery, stroke rehabilitation, and chronic pain management.', 
    description: 'Regain strength, mobility, and independence with personalized physical therapy at home. Our licensed physiotherapists specialize in post-operative rehab, stroke recovery, joint replacement recovery, neurological rehabilitation, and pain management.', 
    icon: 'activity', 
    isActive: true, 
    isFeatured: true,
    aliases: ['physio', 'physiotherapy', 'rehab', 'rehabilitation', 'joint pain', 'stroke rehab'] 
  },
  { 
    id: 'sc-4', 
    title: 'Pathology & Diagnostics', 
    slug: 'pathology-diagnostics', 
    category: 'Diagnostics & Lab', 
    shortDescription: 'Convenient home sample collection with reliable laboratory testing and digital report delivery for routine and specialized investigations.', 
    description: 'Hygienic and timely blood and urine sample collection at your doorstep. We partner with NABL-accredited diagnostic laboratories to deliver fast, digital lab test reports directly to your email and WhatsApp.', 
    icon: 'usercheck', 
    isActive: true, 
    isFeatured: true,
    aliases: ['lab test', 'pathology', 'blood test', 'diagnostics', 'home sample'] 
  },
  { 
    id: 'sc-5', 
    title: 'Telemedicine', 
    slug: 'telemedicine', 
    category: 'Virtual Care', 
    shortDescription: 'Online doctor consultations for routine medical advice, chronic disease follow-ups, and prescription guidance from the comfort of home.', 
    description: 'Connect virtually with qualified doctors and specialists for routine healthcare guidance, prescription renewals, and medical follow-ups without stepping out of home.', 
    icon: 'stethoscope', 
    isActive: true, 
    isFeatured: false,
    aliases: ['teleconsultation', 'online doctor', 'virtual consultation', 'telehealth'] 
  },
  { 
    id: 'sc-6', 
    title: 'Medical Equipment Rental & Delivery', 
    slug: 'medical-equipment', 
    category: 'Equipment & Supplies', 
    shortDescription: 'Rental and home delivery of essential medical equipment including oxygen concentrators, hospital beds, wheelchairs, and monitoring devices.', 
    description: 'Fast home delivery and technical setup of hospital-grade medical equipment. Rent or purchase oxygen concentrators, ICU hospital beds, wheelchairs, CPAP/BiPAP units, suction machines, and multipara patient monitors.', 
    icon: 'usercheck', 
    isActive: true, 
    isFeatured: false,
    aliases: ['medical equipment', 'oxygen concentrator', 'hospital bed', 'wheelchair', 'bipap'] 
  },
  { 
    id: 'sc-7', 
    title: 'Daycare & Companionship', 
    slug: 'daycare-companionship', 
    category: 'Eldercare & Engagement', 
    shortDescription: 'Social engagement, activities, and emotional support for seniors to prevent isolation and enhance mental well-being.', 
    description: 'Prevent loneliness and promote mental agility. Our trained companions provide warm conversation, cognitive exercises, recreational activities, accompaniment on walks, and dedicated emotional support.', 
    icon: 'heartpulse', 
    isActive: true, 
    isFeatured: true,
    aliases: ['companionship', 'senior daycare', 'elder companionship', 'dementia care', 'senior engagement'] 
  }
];

const professionals = [
  {
    id: 'p1',
    name: 'Navin Chauhan',
    designation: 'Founder & CEO',
    qualification: 'Over 15+ years experience in Healthcare Administration (Healthians, Atulaya Healthcare)',
    experience: '15+ Years',
    imageUrl: 'https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png',
    isActive: true
  },
  {
    id: 'p2',
    name: 'Dr. Vikas Sharma',
    designation: 'Co-founder & Chief Operating Officer',
    qualification: '25+ Years in Diagnostics & Pharma (Dr. Reddy’s, Lupin, Dr Lal PathLabs)',
    experience: '25+ Years',
    imageUrl: 'https://silvercareindia.com/wp-content/uploads/2026/04/Vikas_sharma.png',
    isActive: true
  },
  {
    id: 'p3',
    name: 'Komal Gupta',
    designation: 'Co-founder & Chief Product Officer',
    qualification: 'M.Tech NIT Karnataka, 13+ Years in Biopharma & Eldercare',
    experience: '13+ Years',
    imageUrl: 'https://silvercareindia.com/wp-content/uploads/2026/04/IMG_1291-e1775877168885.jpg',
    isActive: true
  },
  {
    id: 'p4',
    name: 'Dr. Kirandeep Kaur',
    designation: 'General Physician',
    qualification: 'MBBS - General Physician & Senior Eldercare Specialist',
    experience: '8+ Years',
    imageUrl: 'https://silvercareindia.com/wp-content/uploads/2025/12/dr-kirandeep-300x300.png',
    isActive: true
  },
  {
    id: 'p5',
    name: 'Ms. Jasbir Kour',
    designation: 'Nursing Trainer',
    qualification: 'Experienced Nursing Trainer & Clinical Care Supervisor',
    experience: '10+ Years',
    imageUrl: 'https://silvercareindia.com/wp-content/uploads/2025/12/nurse-2-300x300.png',
    isActive: true
  },
  {
    id: 'p6',
    name: 'Ms. Tejinder Sharma',
    designation: 'Nursing Supervisor',
    qualification: 'Expert in Patient Care Management & Bedside Excellence',
    experience: '12+ Years',
    imageUrl: 'https://silvercareindia.com/wp-content/uploads/2025/12/Ms-Tejinder-300x300.png',
    isActive: true
  },
  {
    id: 'p7',
    name: 'Dr. Pashdeep Sharma',
    designation: 'General Physician',
    qualification: 'MBBS Qualified General Physician & Home Health Specialist',
    experience: '6+ Years',
    imageUrl: 'https://silvercareindia.com/wp-content/uploads/2025/12/Dr-Pashdeep-300x300.png',
    isActive: true
  },
  {
    id: 'p8',
    name: 'Dr. Ramandeep Reetwal',
    designation: 'General Physician',
    qualification: 'MBBS - AIIMS Bathinda Clinical Experience',
    experience: '5+ Years',
    imageUrl: 'https://silvercareindia.com/wp-content/uploads/2025/12/Dr-Ramandeep-300x300.png',
    isActive: true
  }
];

const testimonials = [
  {
    id: 't1',
    patientName: 'Suresh Wadhwa',
    content: 'SilverCare provided exceptional home nursing care for my elderly mother after her hip surgery. The attendants were polite, punctual, and highly professional.',
    rating: 5,
    isApproved: true,
    createdAt: Date.now()
  },
  {
    id: 't2',
    patientName: 'Rajeev Aggarwal',
    content: 'The doctor home visits and physiotherapy sessions saved us so many trips to the hospital. Truly compassionate eldercare team in Gurgaon.',
    rating: 5,
    isApproved: true,
    createdAt: Date.now()
  }
];

async function syncToFirebase() {
  console.log('🚀 Starting Firebase Firestore sync...');

  // 1. Sync Site Settings
  await setDoc(doc(db, 'settings', 'site_settings'), siteSettings);
  console.log('✅ Site Settings synced.');

  // 2. Sync Services
  for (const srv of services) {
    await setDoc(doc(db, 'services', srv.id), srv);
  }
  console.log(`✅ ${services.length} Services synced to Firestore.`);

  // 3. Sync Professionals
  for (const pro of professionals) {
    await setDoc(doc(db, 'professionals', pro.id), pro);
  }
  console.log(`✅ ${professionals.length} Professionals synced to Firestore.`);

  // 4. Sync Testimonials
  for (const test of testimonials) {
    await setDoc(doc(db, 'testimonials', test.id), test);
  }
  console.log(`✅ ${testimonials.length} Testimonials synced to Firestore.`);

  console.log('🎉 Firebase sync complete!');
  process.exit(0);
}

syncToFirebase().catch((err) => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});
