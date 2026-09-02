import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Check, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  PhoneCall, 
  ArrowRight, 
  Calendar, 
  Activity, 
  UserCheck, 
  Stethoscope, 
  Brain, 
  Wind, 
  Bone, 
  CheckCircle2, 
  Star,
  Users,
  Award
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import SEO from "@/src/components/seo/SEO";
import { useAppContent } from "@/src/hooks/useAppContent";
import heroDoctorImg from "@/src/assets/hero-doctor.png";
import AutoBookingModal from "@/src/components/shared/AutoBookingModal";

// Motion Tokens
const premiumEase = [0.22, 1, 0.36, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: premiumEase } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

export interface PlanPackage {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  originalPrice: string;
  discountedPrice: string;
  period: string;
  icon: any;
  colorScheme: {
    primary: string;
    secondary: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    shadow: string;
    accentGradient: string;
  };
  monthlyFeatures: string[];
  quarterlyFeatures: string[];
  bannerImage: string;
}

const CARE_PLANS: PlanPackage[] = [
  {
    id: "healthy-age-package",
    number: 1,
    title: "Healthy Age Package",
    subtitle: "For Healthy Seniors (60+)",
    tagline: "Essential wellness monitoring & routine home care visits",
    badge: "Healthy Seniors",
    originalPrice: "₹1,999",
    discountedPrice: "₹999",
    period: "/month",
    icon: Heart,
    colorScheme: {
      primary: "#E65100",
      secondary: "#FFF3E0",
      badgeBg: "bg-orange-100",
      badgeText: "text-orange-800",
      border: "border-orange-200",
      shadow: "shadow-orange-100",
      accentGradient: "bg-[linear-gradient(135deg,#FF6D00,#FF8F00)]"
    },
    monthlyFeatures: [
      "1 Nursing home visit",
      "BP, Pulse, SpO₂, Temperature check",
      "Weight & BMI tracking",
      "Fall risk assessment",
      "Glucose level (Glucometer)",
      "Medication review",
      "Diet consultation",
      "Monthly family report"
    ],
    quarterlyFeatures: [
      "HbA1c test",
      "Lipid Profile",
      "Kidney Function Test (Creatinine/eGFR)",
      "Urine Microalbumin"
    ],
    bannerImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "chronic-care-package",
    number: 2,
    title: "Chronic Care Package",
    subtitle: "For Diabetes, Hypertension & Heart Disease",
    tagline: "Continuous vitals monitoring, ECG & specialized doctor teleconsults",
    badge: "Chronic Support",
    originalPrice: "₹3,499",
    discountedPrice: "₹2,499",
    period: "/month",
    icon: Activity,
    colorScheme: {
      primary: "#C62828",
      secondary: "#FFEBEE",
      badgeBg: "bg-red-100",
      badgeText: "text-red-800",
      border: "border-red-200",
      shadow: "shadow-red-100",
      accentGradient: "bg-[linear-gradient(135deg,#D32F2F,#E53935)]"
    },
    monthlyFeatures: [
      "2 Nursing visits",
      "BP monitoring",
      "Blood Sugar (Glucometer)",
      "SpO₂ & Weight tracking",
      "Physical examination",
      "Medication review",
      "ECG at home (1/month)",
      "Doctor teleconsultation",
      "Diet consultation",
      "Physiotherapy (1 session)"
    ],
    quarterlyFeatures: [
      "HbA1c test",
      "Lipid Profile",
      "Kidney Function Test (Creatinine/eGFR)",
      "Urine Microalbumin"
    ],
    bannerImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "heart-care-package",
    number: 3,
    title: "Heart Care Package",
    subtitle: "For Heart Patients",
    tagline: "Cardio physiotherapy, breathlessness assessment & cardiologist teleconsults",
    badge: "Heart Care",
    originalPrice: "₹3,999",
    discountedPrice: "₹2,999",
    period: "/month",
    icon: Stethoscope,
    colorScheme: {
      primary: "#1B5E20",
      secondary: "#E8F5E9",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-800",
      border: "border-emerald-200",
      shadow: "shadow-emerald-100",
      accentGradient: "bg-[linear-gradient(135deg,#2E7D32,#388E3C)]"
    },
    monthlyFeatures: [
      "ECG at home (1/month)",
      "BP monitoring",
      "Blood Sugar (Glucometer)",
      "2 Nursing visits",
      "Pulse respiration check",
      "SpO₂ & Weight tracking",
      "Cardio physiotherapy (1 session)",
      "Breathlessness assessment",
      "Medication review",
      "Cardiologist teleconsultation"
    ],
    quarterlyFeatures: [
      "Lipid Profile",
      "Kidney Function Test",
      "Electrolytes (Na / K)",
      "Fasting blood glucose / F"
    ],
    bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "dementia-memory-care",
    number: 4,
    title: "Dementia & Memory Care",
    subtitle: "For Memory & Cognitive Support",
    tagline: "Specialized cognitive stimulation & structured daily care",
    badge: "Memory Support",
    originalPrice: "₹3,499",
    discountedPrice: "₹2,499",
    period: "/month",
    icon: Brain,
    colorScheme: {
      primary: "#7B2CBF",
      secondary: "#F5E8FF",
      badgeBg: "bg-purple-100",
      badgeText: "text-purple-800",
      border: "border-purple-200",
      shadow: "shadow-purple-100",
      accentGradient: "bg-[linear-gradient(135deg,#7B2CBF,#9D4EDD)]"
    },
    monthlyFeatures: [
      "Cognitive stimulation",
      "Memory games",
      "Orientation exercises",
      "Medication review",
      "Behaviour monitoring",
      "Fall prevention",
      "Caregiver counselling",
      "Nutrition review",
      "Doctor teleconsultation",
      "2 Nursing visits"
    ],
    quarterlyFeatures: [
      "Depression screening",
      "Nutrition review"
    ],
    bannerImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "respiratory-care",
    number: 5,
    title: "Respiratory Care Package",
    subtitle: "COPD / Asthma Support",
    tagline: "For Breathing Disorder Support",
    badge: "Breathing Support",
    originalPrice: "₹3,499",
    discountedPrice: "₹2,499",
    period: "/month",
    icon: Wind,
    colorScheme: {
      primary: "#17345E",
      secondary: "#EBF3FF",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-900",
      border: "border-blue-200",
      shadow: "shadow-blue-100",
      accentGradient: "bg-[linear-gradient(135deg,#17345E,#1E40AF)]"
    },
    monthlyFeatures: [
      "2 Nursing visits",
      "SpO₂ monitoring",
      "Respiratory rate check",
      "Peak Flow Meter reading",
      "Inhaler technique assessment",
      "Chest physiotherapy guidance",
      "Oxygen concentrator check (if applicable)"
    ],
    quarterlyFeatures: [
      "Spirometry test (Free)",
      "Chest physician teleconsultation"
    ],
    bannerImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "mobility-bone-health",
    number: 6,
    title: "Mobility & Bone Health Package",
    subtitle: "For Stronger Bones & Better Mobility",
    tagline: "Physiotherapy, fall prevention & bone density care",
    badge: "Bone & Mobility",
    originalPrice: "₹2,999",
    discountedPrice: "₹2,199",
    period: "/month",
    icon: Bone,
    colorScheme: {
      primary: "#2E7D32",
      secondary: "#E8F5E9",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-800",
      border: "border-emerald-200",
      shadow: "shadow-emerald-100",
      accentGradient: "bg-[linear-gradient(135deg,#2E7D32,#4CAF50)]"
    },
    monthlyFeatures: [
      "2 Nursing visits",
      "Fall risk assessment",
      "Balance test",
      "2 Physiotherapy visits",
      "Pain assessment",
      "Weight & nutrition review",
      "Medication review",
      "Monthly health report"
    ],
    quarterlyFeatures: [
      "Vitamin D screening",
      "Calcium level check",
      "Vitamin B12 screening"
    ],
    bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
  }
];

export default function Plans() {
  const { siteSettings } = useAppContent();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const phone = siteSettings.phone || "+91 800-14-800-75";
  const rawPhone = phone.replace(/[^0-9+]/g, '');

  const handleBookPlan = (planTitle: string) => {
    setSelectedPlan(planTitle);
    setIsModalOpen(true);
  };

  return (
    <>
      <SEO 
        title="Freedom Care Plans | SilverCare Home Healthcare Packages" 
        description="Explore SilverCare Freedom Care Plans including Dementia & Memory Care, Respiratory Care, and Mobility & Bone Health packages for comprehensive home eldercare."
      />

      <div className="flex flex-col font-sans text-slate-800 bg-white">
        
        {/* HERO BANNER SECTION */}
        <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 bg-[linear-gradient(135deg,#FFF0F5_0%,#F8F1FF_50%,#FFFFFF_100%)] border-b border-slate-100 overflow-hidden">
          {/* Subtle Background Glow Blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[1440px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column Text Content */}
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={staggerContainer}
                className="lg:col-span-7 text-left"
              >
                {/* Freedom Care Badge */}
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-[#FF4F81] font-extrabold text-xs sm:text-sm mb-6 shadow-xs">
                  <Sparkles size={16} className="text-[#FF3E72] animate-pulse" />
                  Trusted Home Healthcare Packages For Every Need
                </motion.div>

                {/* Main Headline */}
                <motion.h1 
                  variants={fadeInUp} 
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#17345E] tracking-tight leading-[1.08] mb-6"
                >
                  <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF3E72,#E91E63,#7B2CBF)]">FREEDOM CARE</span> PLANS
                </motion.h1>

                <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
                  Comprehensive, doctor-guided monthly eldercare & healthcare packages delivered at home across North India. Designed for dignity, comfort, and continuous medical support.
                </motion.p>

                {/* 4 Feature Pillars Grid */}
                <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { title: "Expert Care At Home", icon: ShieldCheck, color: "text-[#E91E63]" },
                    { title: "Compassionate Caregivers", icon: Heart, color: "text-[#7B2CBF]" },
                    { title: "Personalized Care Plans", icon: UserCheck, color: "text-[#FF4F81]" },
                    { title: "Regular Monitoring", icon: Activity, color: "text-[#17345E]" }
                  ].map((pillar, i) => (
                    <motion.div variants={fadeInUp} key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-slate-100 shadow-2xs">
                      <div className={`p-2 rounded-xl bg-pink-50 ${pillar.color}`}>
                        <pillar.icon size={20} />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800">{pillar.title}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Call to Action */}
                <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
                  <a href="#packages-list" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-[linear-gradient(90deg,#FF4F81,#E91E63)] text-white font-extrabold text-base h-14 px-8 rounded-xl shadow-lg shadow-pink-500/25 border-0 hover:opacity-95 transition-all">
                      Explore All Packages
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </a>
                  <a href={`tel:${rawPhone}`} className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-800 font-extrabold text-base h-14 px-6 rounded-xl hover:border-[#E91E63] hover:text-[#E91E63] transition-all">
                      <PhoneCall size={18} className="mr-2 text-[#E91E63]" />
                      Call {phone}
                    </Button>
                  </a>
                </motion.div>
              </motion.div>

              {/* Right Column Visual: Brand Ambassador & Trust Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: premiumEase }}
                className="lg:col-span-5 relative flex flex-col items-center justify-center"
              >
                <div className="relative w-full max-w-[580px]">
                  <img 
                    src={siteSettings.heroImageUrl && siteSettings.heroImageUrl.startsWith('http') ? siteSettings.heroImageUrl : heroDoctorImg}
                    alt={siteSettings.doctorName || "Rakesh Bedi - SilverCare Brand Ambassador"} 
                    className="w-full h-auto object-contain object-bottom max-h-[580px] lg:max-h-[640px] transition-transform duration-500 hover:scale-[1.01]"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />

                  {/* Brand Ambassador Badge ("TRUSTED BY RAKESH BEDI") */}
                  <div className="absolute bottom-0 right-4 sm:bottom-1 sm:right-6 bg-white/95 backdrop-blur-md border border-pink-100/90 shadow-[0_10px_30px_rgba(233,30,99,0.18)] rounded-2xl px-4 py-2.5 flex items-center gap-3 z-20 transition-all duration-300 hover:scale-105">
                    <div className="w-10 h-10 rounded-xl bg-[linear-gradient(135deg,#FF4F81,#E91E63)] text-white flex items-center justify-center shrink-0 shadow-md">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#FF4F81] leading-none mb-1">
                        Brand Ambassador
                      </span>
                      <span className="block text-xs sm:text-sm font-black text-[#17345E] tracking-tight">
                        TRUSTED BY RAKESH BEDI
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* FREEDOM CARE PACKAGES LIST SECTION */}
        <section id="packages-list" className="py-16 sm:py-20 lg:py-24 bg-slate-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#FF4F81] mb-2 block">
                Doctor-Guided Monthly Care
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17345E] tracking-tight">
                Select Your Freedom Care Plan
              </h2>
              <p className="text-slate-600 mt-4 text-base sm:text-lg">
                Transparent monthly pricing with zero hidden charges. Cancel or upgrade anytime with complete peace of mind.
              </p>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {CARE_PLANS.map((plan) => {
                const IconComponent = plan.icon;
                return (
                  <motion.div
                    key={plan.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={fadeInUp}
                    className={`bg-white rounded-3xl border-2 ${plan.colorScheme.border} shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1`}
                  >
                    <div>
                      {/* Card Header Banner */}
                      <div className={`p-6 ${plan.colorScheme.accentGradient} text-white relative overflow-hidden`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs">
                            <IconComponent size={16} /> Plan #{plan.number}
                          </span>
                          <span className="text-xs font-bold bg-white/90 text-slate-900 px-3 py-1 rounded-full uppercase tracking-wider">
                            {plan.badge}
                          </span>
                        </div>

                        <h3 className="text-2xl font-black text-white leading-snug mb-1">
                          {plan.title}
                        </h3>
                        <p className="text-xs font-semibold text-white/90">
                          {plan.subtitle}
                        </p>

                        {/* Price Tag */}
                        <div className="mt-6 flex items-baseline gap-3 bg-white/10 p-3 rounded-2xl backdrop-blur-xs">
                          <span className="text-xs text-white/70 line-through font-bold">
                            {plan.originalPrice}
                          </span>
                          <span className="text-3xl sm:text-4xl font-black text-white">
                            {plan.discountedPrice}
                          </span>
                          <span className="text-xs text-white/80 font-bold">
                            {plan.period}
                          </span>
                        </div>
                      </div>

                      {/* Card Body - Monthly & Quarterly Features */}
                      <div className="p-6 space-y-6">
                        
                        {/* Every Month Features */}
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                            <Calendar size={14} className="text-[#FF4F81]" />
                            EVERY MONTH INCLUDED:
                          </div>
                          <ul className="space-y-2.5">
                            {plan.monthlyFeatures.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                                <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check size={12} strokeWidth={3} />
                                </div>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Every Quarter Features */}
                        <div className="pt-4 border-t border-slate-100">
                          <div className="text-xs font-black uppercase tracking-wider text-purple-700 mb-3 flex items-center gap-2">
                            <Sparkles size={14} className="text-purple-600" />
                            EVERY QUARTER INCLUDED:
                          </div>
                          <ul className="space-y-2.5">
                            {plan.quarterlyFeatures.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-purple-900 bg-purple-50/60 p-2 rounded-xl">
                                <div className="h-5 w-5 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center shrink-0 mt-0.5">
                                  <Star size={12} fill="#7B2CBF" />
                                </div>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </div>

                    {/* Card Footer Button */}
                    <div className="p-6 pt-0">
                      <Button
                        onClick={() => handleBookPlan(`${plan.title} (Plan #${plan.number})`)}
                        size="lg"
                        className="w-full bg-[linear-gradient(90deg,#17345E,#2A4D7C)] hover:opacity-95 text-white font-extrabold text-sm h-12 rounded-xl shadow-md border-0 group-hover:bg-[linear-gradient(90deg,#FF4F81,#E91E63)] transition-all"
                      >
                        Book {plan.title}
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* TRUST BANNER SECTION */}
        <section className="py-16 bg-[#17345E] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <ShieldCheck size={48} className="mx-auto text-[#FF4F81] mb-4 animate-bounce-subtle" />
            <h3 className="text-2xl sm:text-3xl font-black mb-4">
              Need a Customized Eldercare Plan for Your Loved Ones?
            </h3>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              Our clinical care managers evaluate medical history, mobility needs, and caregiver schedules to tailor a personalized freedom plan.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={() => handleBookPlan("Custom Freedom Care Plan")}
                size="lg"
                className="bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white font-extrabold text-base h-14 px-8 rounded-xl shadow-lg border-0"
              >
                Request Custom Plan Consultation
              </Button>
              <a href={`tel:${rawPhone}`}>
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white/40 text-white font-extrabold text-base h-14 px-8 rounded-xl hover:bg-white hover:text-[#17345E] transition-all">
                  <PhoneCall size={18} className="mr-2" />
                  Call Advisor: {phone}
                </Button>
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* Auto Booking Modal popup when triggered */}
      {isModalOpen ? (
        <AutoBookingModal 
          forceOpen={true} 
          initialService={selectedPlan || undefined} 
          onClose={() => setIsModalOpen(false)} 
        />
      ) : (
        <AutoBookingModal />
      )}
    </>
  );
}
