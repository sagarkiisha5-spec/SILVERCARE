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
  bio?: string;
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
  ceoPhotoUrl?: string;
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
  ceoPhotoUrl: "/navin-chauhan.png",
  phone: "+91 800-14-800-75",
  emergencyPhone: "+91 800-14-800-75",
  whatsapp: "+918001480075",
  email: "info@silvercareindia.com",
  address: "SCO 110, 1st Floor, Green Lotus Avenue Complex, Near, Singhpura Rd, Chandigarh, Zirakpur, Punjab 140603",
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
    aliases: ['blood test', 'lab test', 'pathology', 'diagnostics', 'urine test', 'health checkup', 'home sample collection'] 
  },
  { 
    id: 'sc-5', 
    title: 'Telemedicine Consultation', 
    slug: 'telemedicine-consultation', 
    category: 'Clinical Consultations', 
    shortDescription: 'Instant video consultations with verified physicians and specialists from the comfort and safety of home.', 
    description: 'Connect with expert doctors and medical specialists via secure video call. Perfect for second opinions, lab report reviews, routine follow-ups, and urgent clinical guidance without the hassle of stepping outside.', 
    icon: 'stethoscope', 
    isActive: true, 
    isFeatured: true,
    aliases: ['online doctor', 'teleconsult', 'video consultation', 'telemedicine', 'doctor call'] 
  },
  { 
    id: 'sc-6', 
    title: 'Medical Equipment Rental', 
    slug: 'medical-equipment-rental', 
    category: 'Equipment & Infrastructure', 
    shortDescription: 'Certified hospital-grade medical equipment for rent and purchase with free home delivery, installation, and demonstration.', 
    description: 'Hospital-grade medical equipment delivered and installed directly at your home. From oxygen concentrators, hospital beds, and BiPAP/CPAP machines to wheelchairs, suction apparatus, and cardiac monitors, we provide sanitized, tested gear with full demonstration.', 
    icon: 'shieldcheck', 
    isActive: true, 
    isFeatured: true,
    aliases: ['oxygen concentrator', 'hospital bed', 'bipap', 'cpap', 'wheelchair', 'suction machine', 'patient monitor', 'equipment'] 
  },
  { 
    id: 'sc-7', 
    title: 'ICU Setup at Home', 
    slug: 'icu-setup-at-home', 
    category: 'Equipment & Infrastructure', 
    shortDescription: 'Complete critical care infrastructure at home with multi-parameter monitors, ventilators, and 24/7 dedicated critical care nursing.', 
    description: 'Transform your home into a fully functional critical care unit. Designed for patients needing tracheostomy care, mechanical ventilation, invasive monitoring, and post-ICU step-down support, supervised by experienced intensivists and specialized critical care nurses.', 
    icon: 'heartpulse', 
    isActive: true, 
    isFeatured: true,
    aliases: ['home icu', 'critical care', 'ventilator at home', 'tracheostomy care', 'icu setup', 'step down care'] 
  },
  { 
    id: 'sc-8', 
    title: 'Mother & Baby Care', 
    slug: 'mother-baby-care', 
    category: 'Mother & Baby Care', 
    shortDescription: 'Specialized post-natal care for mothers and comprehensive newborn care by certified nurses and trained Jhaia caregivers at home.', 
    description: 'Comprehensive post-partum support for new mothers and delicate care for newborns. Our experienced maternity nurses and certified baby care attendants assist with newborn hygiene, feeding support, lactation guidance, maternal post-recovery, baby massage, and round-the-clock newborn monitoring at home.', 
    icon: 'heartpulse', 
    isActive: true, 
    isFeatured: true,
    aliases: ['mother and baby care', 'jhaiya', 'jhaiya care', 'newborn care', 'maternity care', 'postnatal care', 'postpartum care', 'baby care', 'nanhi care', 'mother care'] 
  }
];

export const fallbackProfessionals: Professional[] = [
  {
    id: 'p1',
    name: 'Navin Chauhan',
    designation: 'Founder & CEO',
    qualification: 'Over 15+ years experience in Healthcare Administration (Healthians, Atulaya Healthcare)',
    experience: '15+ Years',
    imageUrl: '/navin-chauhan.png',
    bio: 'Visionary healthcare leader dedicated to bridging the hospital-to-home eldercare gap with clinical excellence.',
    isActive: true
  },
  {
    id: 'p3',
    name: 'Komal Gupta',
    designation: 'Co-founder & Chief Product Officer',
    qualification: 'M.Tech NIT Karnataka, 13+ Years in Biopharma & Eldercare',
    experience: '13+ Years',
    imageUrl: '/team/komal-gupta.jpg',
    bio: 'Product strategist focused on clinical quality oversight, protocol standardization, and specialized caregiver training.',
    isActive: true
  },
  {
    id: 'p4',
    name: 'Dr. Kirandeep Kaur',
    designation: 'General Physician',
    qualification: 'MBBS - General Physician & Senior Eldercare Specialist',
    experience: '8+ Years',
    imageUrl: '/team/dr-kirandeep.jpg',
    bio: 'Specializes in geriatric home consultations, chronic illness management, and compassionate preventive senior care.',
    isActive: true
  },
  {
    id: 'p5',
    name: 'Ms. Jasbir Kour',
    designation: 'Nursing Trainer',
    qualification: 'Experienced Nursing Trainer & Clinical Care Supervisor',
    experience: '10+ Years',
    imageUrl: '/team/nurse-jasbir.jpg',
    bio: 'Leads clinical nursing supervision, ICU-level attendant training, and patient safety monitoring across homes.',
    isActive: true
  },
  {
    id: 'p6',
    name: 'Ms. Tejinder Sharma',
    designation: 'Nursing Supervisor',
    qualification: 'Expert in Patient Care Management & Bedside Excellence',
    experience: '12+ Years',
    imageUrl: '/team/nurse-tejinder.jpg',
    bio: 'Oversees round-the-clock eldercare routines, bedside palliative support, and emergency medical response protocols.',
    isActive: true
  },
  {
    id: 'p7',
    name: 'Dr. Pashdeep Sharma',
    designation: 'General Physician',
    qualification: 'MBBS Qualified General Physician & Home Health Specialist',
    experience: '6+ Years',
    imageUrl: '/team/dr-pashdeep.jpg',
    bio: 'Focused on comprehensive doorstep clinical diagnostics, post-hospitalization recovery, and personalized senior treatment plans.',
    isActive: true
  },
  {
    id: 'p8',
    name: 'Dr. Ramandeep Reetwal',
    designation: 'General Physician',
    qualification: 'MBBS - AIIMS Bathinda Clinical Experience',
    experience: '5+ Years',
    imageUrl: '/team/dr-ramandeep.jpg',
    bio: 'AIIMS-trained physician committed to evidence-based eldercare, acute symptom management, and continuity of care.',
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
      let deletedIds: string[] = [];
      try {
        const d = localStorage.getItem("silvercare_deleted_professionals");
        if (d) deletedIds = JSON.parse(d);
      } catch {}

      const activeDefaults = fallbackProfessionals.filter(f => !deletedIds.includes(f.id));

      if (!snap.empty) {
        const loaded = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as Professional))
          .filter(p => !deletedIds.includes(p.id) && (p as any).isDeleted !== true);
        const loadedMap = new Map(loaded.map(p => [p.id, p]));
        const merged = activeDefaults.map(f => loadedMap.get(f.id) || f);
        loaded.forEach(l => {
          if (!activeDefaults.some(f => f.id === l.id)) {
            merged.push(l);
          }
        });
        setProfessionals(merged);
      } else {
        setProfessionals(activeDefaults);
      }
    }, () => {
      let deletedIds: string[] = [];
      try {
        const d = localStorage.getItem("silvercare_deleted_professionals");
        if (d) deletedIds = JSON.parse(d);
      } catch {}
      setProfessionals(fallbackProfessionals.filter(f => !deletedIds.includes(f.id)));
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

