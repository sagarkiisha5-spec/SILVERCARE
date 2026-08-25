import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

export interface Service {
  id: string;
  title: string;
  slug: string;
  category?: string;
  shortDescription: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  isActive: boolean;
  isFeatured?: boolean;
  aliases?: string[];
  createdAt?: number;
  updatedAt?: number;
}

export interface Professional {
  id: string;
  name: string;
  designation: string;
  qualification?: string;
  experience?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export interface Testimonial {
  id: string;
  patientName: string;
  content: string;
  rating: number;
  isApproved: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImageUrl: string;
  doctorName: string;
  doctorTitle: string;
  doctorImageUrl: string;
  doctorBadge: string;
  phone: string;
  emergencyPhone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  experienceYears: string;
  happyPatients: string;
  verifiedStaff: string;
  updatedAt?: number;
}

export const defaultSiteSettings: SiteSettings = {
  heroTitle: "Professional care,\nwith compassion.",
  heroSubtitle: "Professional eldercare services delivered at home across North India. From nursing care to doctor visits, we bring comprehensive healthcare to your loved ones.",
  heroBadge: "Trusted Eldercare & Medical Services",
  heroImageUrl: "/hero-doctor.png",
  doctorName: "Navin Chauhan",
  doctorTitle: "CEO & Founder, SilverCare India",
  doctorImageUrl: "/hero-doctor.png",
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
};

export const fallbackServices: Service[] = [
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

export const fallbackProfessionals: Professional[] = [
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

export function useAppContent() {
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>(fallbackProfessionals);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Live listener for Site Settings
    const unsubSettings = onSnapshot(doc(db, 'siteSettings', 'homepage'), (docSnap) => {
      if (docSnap.exists()) {
        setSiteSettings((prev) => ({
          ...prev,
          ...docSnap.data() as Partial<SiteSettings>
        }));
      }
    }, (err) => {
      console.warn("Site settings fallback in use:", err?.message);
    });

    // 2. Live listener for Active Services
    const srvQuery = query(collection(db, 'services'), where('isActive', '==', true));
    const unsubServices = onSnapshot(srvQuery, (snap) => {
      if (!snap.empty) {
        setServices(snap.docs.map(d => ({ id: d.id, ...d.data() } as Service)));
      } else {
        setServices(fallbackServices);
      }
      setLoading(false);
    }, (err) => {
      console.warn("Using fallback services:", err?.message);
      setLoading(false);
    });

    // 3. Live listener for Testimonials
    const tstQuery = query(collection(db, 'testimonials'), where('isApproved', '==', true));
    const unsubTestimonials = onSnapshot(tstQuery, (snap) => {
      if (!snap.empty) {
        setTestimonials(snap.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial)));
      }
    }, () => {});

    // 4. Live listener for FAQs
    const faqQuery = query(collection(db, 'faqs'), where('isActive', '==', true));
    const unsubFaqs = onSnapshot(faqQuery, (snap) => {
      if (!snap.empty) {
        setFaqs(snap.docs.map(d => ({ id: d.id, ...d.data() } as Faq)).sort((a, b) => (a.order || 0) - (b.order || 0)));
      }
    }, () => {});

    // 5. Live listener for Professionals
    const proQuery = query(collection(db, 'professionals'), where('isActive', '==', true));
    const unsubProfessionals = onSnapshot(proQuery, (snap) => {
      if (!snap.empty) {
        setProfessionals(snap.docs.map(d => ({ id: d.id, ...d.data() } as Professional)));
      } else {
        setProfessionals(fallbackProfessionals);
      }
    }, () => {
      setProfessionals(fallbackProfessionals);
    });

    return () => {
      unsubSettings();
      unsubServices();
      unsubTestimonials();
      unsubFaqs();
      unsubProfessionals();
    };
  }, []);

  return { services, testimonials, faqs, professionals, siteSettings, loading };
}

