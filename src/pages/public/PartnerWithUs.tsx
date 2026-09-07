import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Handshake, 
  TrendingUp, 
  GraduationCap, 
  Megaphone, 
  Laptop, 
  Settings, 
  Globe, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Building, 
  ShieldCheck, 
  Award,
  Heart,
  Activity,
  Stethoscope,
  UserCheck,
  Headphones,
  UserPlus,
  Compass,
  Lightbulb,
  HeartHandshake,
  Layers,
  PhoneCall,
  Mail,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import SEO from '@/src/components/seo/SEO';
import { submitServiceRequest } from '@/src/lib/requestManager';
import { HalftoneWaveSVG } from '@/src/components/shared/SilverCareBackground';

const partnerFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number").max(15),
  email: z.string().email("Please enter a valid email address"),
  cityState: z.string().min(2, "City / Preferred State is required"),
  investmentCapacity: z.string().min(1, "Please select investment capacity"),
  experience: z.string().optional(),
  message: z.string().optional(),
});

type PartnerFormValues = z.infer<typeof partnerFormSchema>;

const INVESTMENT_RANGES = [
  "₹10 Lakhs - ₹20 Lakhs",
  "₹20 Lakhs - ₹35 Lakhs",
  "₹35 Lakhs - ₹50 Lakhs",
  "₹50 Lakhs+"
];

// Top Benefits from Poster #2
const TOP_PARTNER_BENEFITS = [
  {
    icon: TrendingUp,
    title: "GROWING DEMAND",
    subtitle: "Tap into the rapidly growing senior care industry.",
    color: "from-purple-600 to-indigo-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    icon: DollarSign,
    title: "PROFITABLE BUSINESS MODEL",
    subtitle: "Proven model with strong margins and recurring revenue potential.",
    color: "from-emerald-600 to-teal-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200"
  },
  {
    icon: ShieldCheck,
    title: "TRUSTED BRAND",
    subtitle: "Build your business with the trust and recognition of SilverCare.",
    color: "from-pink-600 to-rose-700",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200"
  },
  {
    icon: Headphones,
    title: "COMPLETE SUPPORT",
    subtitle: "From training to operations, we're with you every step of the way.",
    color: "from-sky-600 to-blue-700",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200"
  },
  {
    icon: HeartHandshake,
    title: "MAKE A MEANINGFUL IMPACT",
    subtitle: "Improve lives and strengthen your community.",
    color: "from-amber-600 to-orange-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200"
  }
];

// 6 Roadmap Pillars from Poster #1 ("We Are With You, Every Step Of The Way")
const SUPPORT_STEPS = [
  {
    icon: TrendingUp,
    title: "Strong & Scalable Business Opportunity",
    desc: "Built on a resilient framework with high recurring customer retention.",
    accent: "bg-purple-600 text-white"
  },
  {
    icon: Megaphone,
    title: "Marketing & Branding Support",
    desc: "National digital marketing, local promotional materials, and brand campaigns.",
    accent: "bg-emerald-600 text-white"
  },
  {
    icon: Settings,
    title: "End-to-End Setup Assistance",
    desc: "Turnkey assistance for office setup, licensing, and operational workflows.",
    accent: "bg-pink-600 text-white"
  },
  {
    icon: GraduationCap,
    title: "Operational Training & Guidance",
    desc: "Comprehensive staff, caregiver, and administrative training programs.",
    accent: "bg-sky-600 text-white"
  },
  {
    icon: Lightbulb,
    title: "Continuous Growth & Innovation",
    desc: "Regular updates to telehealth features, care protocols, and service offerings.",
    accent: "bg-purple-700 text-white"
  },
  {
    icon: UserCheck,
    title: "Dedicated Relationship Manager",
    desc: "Direct single-point support officer to guide your franchise expansion.",
    accent: "bg-amber-600 text-white"
  }
];

// 4 Care Principles from Poster #3
const CARE_PRINCIPLES = [
  { icon: Heart, title: "Compassionate Care", desc: "Patient-first empathy in every home visit." },
  { icon: ShieldCheck, title: "Trusted Services", desc: "Vetted, background-checked medical staff." },
  { icon: Users, title: "Senior First", desc: "Dedicated care tailored to elder dignity." },
  { icon: HeartHandshake, title: "Care Like Family", desc: "Warmth & emotional support for loved ones." }
];

export default function PartnerWithUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      cityState: '',
      investmentCapacity: '₹10 Lakhs - ₹20 Lakhs',
      experience: '',
      message: ''
    }
  });

  const onSubmit = async (data: PartnerFormValues) => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      await submitServiceRequest({
        patientName: data.fullName,
        phone: data.phone,
        city: data.cityState,
        careType: `Franchise Partner Inquiry (${data.investmentCapacity})`,
        email: data.email,
        message: `Exp: ${data.experience || 'N/A'} | Msg: ${data.message || 'N/A'}`,
        consent: true,
      });
      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error("Partner form submission failed", err);
      setErrorMessage("Failed to submit inquiry. Please call our franchise hotline +91 800-14-800-75 directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Partner With Us | Eldercare Franchise Opportunities | SilverCare India"
        description="Join India's trusted home healthcare brand. Open a SilverCare franchise in your city and build a profitable, purpose-driven healthcare business with 100% operational support."
      />

      <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
        
        {/* HERO SECTION WITH RAKESH BEDI BRAND AMBASSADOR */}
        <section className="relative bg-[linear-gradient(135deg,#0F172A_0%,#1E1B4B_40%,#4A0E4E_100%)] text-white pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <HalftoneWaveSVG density="high" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm font-medium text-slate-300 mb-8">
              <Link to="/" className="hover:text-[#FF4F81] transition-colors">Home</Link>
              <span className="mx-2 text-slate-500">/</span>
              <span className="text-[#FF4F81] font-bold">Partner With Us</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-extrabold text-pink-200 mb-6">
                  <Sparkles size={16} className="text-[#FF4F81] animate-pulse" />
                  FRANCHISE OPPORTUNITIES NOW OPEN
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                  Be a Part of India's <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B9B,#FF4F81,#E91E63)]">Most Trusted</span> Eldercare Brand
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
                  SilverCare is committed to enhancing the quality of life for seniors with compassion, dignity & trust. Partner with us to bring quality healthcare and peace of mind to families in your city.
                </motion.p>

                {/* 4 Care Principles Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {CARE_PRINCIPLES.map((cp, idx) => {
                    const IconComp = cp.icon;
                    return (
                      <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 text-center flex flex-col items-center">
                        <IconComp className="w-5 h-5 text-[#FF4F81] mb-1.5" />
                        <span className="text-xs font-bold text-white block">{cp.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Rakesh Bedi Brand Ambassador Card */}
              <div className="lg:col-span-5">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative bg-gradient-to-br from-purple-900/95 via-purple-950/95 to-pink-950/95 backdrop-blur-xl border border-white/25 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col items-center text-center">
                  <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF4F81]/25 rounded-full blur-3xl pointer-events-none"></div>
                  
                  {/* Large Clear Photo showing SilverCare Embroidered Logo on Green Shirt */}
                  <div className="relative mb-5 group">
                    <img 
                      src="/hero-doctor.png" 
                      alt="Rakesh Bedi - Brand Ambassador SilverCare India" 
                      className="w-48 sm:w-56 h-60 sm:h-64 rounded-2xl object-cover object-top border-4 border-[#FF4F81] shadow-2xl bg-slate-900 transition-transform group-hover:scale-105"
                    />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FF4F81] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1">
                      <ShieldCheck size={14} className="text-white shrink-0" />
                      SilverCare Ambassador
                    </div>
                  </div>

                  <div className="mt-2 mb-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-white">Rakesh Bedi</h3>
                    <p className="text-xs sm:text-sm text-pink-200 font-bold italic mt-0.5">"Dhurandhar of Comedy. Champion of Care."</p>
                  </div>

                  <blockquote className="text-sm sm:text-base text-slate-100 font-semibold italic leading-relaxed mb-4 bg-white/10 p-4 rounded-2xl border-l-4 border-[#FF4F81]">
                    “Let's build a kinder tomorrow for our elders — because they cared for our tomorrow.”
                  </blockquote>

                  <div className="w-full p-3 rounded-2xl bg-white/10 border border-white/10 text-xs text-slate-200 flex items-center justify-center gap-2 font-semibold">
                    <Sparkles className="text-[#FF4F81] shrink-0" size={16} />
                    <span>Join India's Most Trusted Eldercare Brand</span>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* STATS COUNTER STRIP */}
        <section className="bg-white border-b border-slate-200 py-10 shadow-xs">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 border-r border-slate-100 last:border-0">
                <div className="text-3xl sm:text-4xl font-black text-[#17345E] mb-1">10,000+</div>
                <div className="text-xs sm:text-sm font-bold text-slate-500">Families Served</div>
              </div>
              <div className="p-4 border-r border-slate-100 last:border-0">
                <div className="text-3xl sm:text-4xl font-black text-[#E91E63] mb-1">50+</div>
                <div className="text-xs sm:text-sm font-bold text-slate-500">Cities (and growing)</div>
              </div>
              <div className="p-4 border-r border-slate-100 last:border-0">
                <div className="text-3xl sm:text-4xl font-black text-purple-700 mb-1">95%</div>
                <div className="text-xs sm:text-sm font-bold text-slate-500">Client Satisfaction</div>
              </div>
              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-black text-emerald-600 mb-1">100%</div>
                <div className="text-xs sm:text-sm font-bold text-slate-500">Operational Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* TOP BENEFITS SECTION (FROM POSTER #2) */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-[#E91E63] bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100 inline-block mb-3">
                Top Benefits
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#17345E] tracking-tight mb-4">
                Top Benefits of Being a <span className="text-[#E91E63]">SilverCare Partner</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Build a purpose-driven healthcare business that cares for today and tomorrow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {TOP_PARTNER_BENEFITS.map((b, idx) => {
                const IconComp = b.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className={`rounded-3xl p-6 border ${b.borderColor} ${b.bgColor} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                  >
                    <div>
                      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${b.color} text-white flex items-center justify-center mb-4 shadow-md`}>
                        <IconComp size={24} />
                      </div>
                      <h3 className="text-base font-extrabold text-[#17345E] mb-2 leading-snug">
                        {b.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {b.subtitle}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1 text-[11px] font-bold text-[#E91E63]">
                      <span>Guaranteed Advantage</span>
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Tagline Banner */}
            <div className="mt-12 bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] text-white rounded-3xl p-6 sm:p-8 text-center shadow-lg">
              <p className="text-lg sm:text-xl font-extrabold tracking-wide uppercase">
                Partner with SilverCare and build a business that cares for today and tomorrow.
              </p>
            </div>
          </div>
        </section>

        {/* WE ARE WITH YOU EVERY STEP OF THE WAY (FROM POSTER #1) */}
        <section className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-[#7B2CBF] bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 inline-block mb-3">
                Complete Franchise Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#17345E] tracking-tight mb-4">
                We Are With You, <span className="text-[#7B2CBF]">Every Step of the Way</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                From initial launch and operational setup to staff training and marketing campaigns, SilverCare provides 360-degree support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SUPPORT_STEPS.map((step, idx) => {
                const IconComp = step.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex items-start gap-5"
                  >
                    <div className={`h-12 w-12 rounded-2xl ${step.accent} flex items-center justify-center shrink-0 shadow-md`}>
                      <IconComp size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#17345E] mb-1.5 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Dual Commitment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-[linear-gradient(135deg,#2A0845_0%,#6441A5_100%)] text-white rounded-3xl p-7 flex items-center gap-5 shadow-lg">
                <Handshake size={36} className="text-pink-300 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-xl mb-1">Your Success is Our Commitment</h4>
                  <p className="text-xs text-purple-100">Dedicated guidance, clinical oversight, and ongoing mentorship to ensure strong ROI.</p>
                </div>
              </div>

              <div className="bg-[linear-gradient(135deg,#11998e_0%,#38ef7d_100%)] text-white rounded-3xl p-7 flex items-center gap-5 shadow-lg">
                <TrendingUp size={36} className="text-white shrink-0" />
                <div>
                  <h4 className="font-extrabold text-xl mb-1">Together, Let's Build a Stronger Tomorrow</h4>
                  <p className="text-xs text-emerald-50">Expanding healthcare access across 50+ cities in India with quality and dignity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APPLICATION FORM & CONTACT */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white relative overflow-hidden" id="partner-form">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-pink-300 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 inline-block">
                  Partner Application
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  Start Your <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B9B,#FF4F81)]">Franchise Journey</span> Today
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Take the first step toward owning a SilverCare franchise. Submit your details below and our franchise development directors will get in touch with you.
                </p>

                <div className="space-y-4 pt-4 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="text-[#FF4F81]" size={20} />
                    <span>Franchise Hotline: <strong>+91 800-14-800-75</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-[#FF4F81]" size={20} />
                    <span>Email: <strong>franchise@silvercareindia.com</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-[#FF4F81]" size={20} />
                    <span>Corporate HQ: Flat No-60, SF Sector-33, Gurgaon, Haryana 122001</span>
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div className="lg:col-span-6">
                <div className="bg-white text-slate-800 rounded-3xl p-7 sm:p-10 shadow-2xl border border-slate-200">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-[#17345E] mb-2">Apply for Franchise Partnership</h3>
                    <p className="text-slate-500 text-xs sm:text-sm">Fill out the form below for immediate franchise consultation.</p>
                  </div>

                  {isSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                      <CheckCircle2 size={48} className="text-emerald-600 mx-auto" />
                      <h4 className="text-xl font-extrabold text-emerald-900">Application Submitted!</h4>
                      <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed">
                        Thank you for your interest in partnering with SilverCare India. Our franchise expansion team will review your application and reach out shortly.
                      </p>
                      <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-2 text-xs font-bold">
                        Submit Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {errorMessage && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                          {errorMessage}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                          <Input 
                            {...register('fullName')} 
                            placeholder="Enter your full name" 
                            className="h-11 rounded-xl text-sm border-slate-200"
                          />
                          {errors.fullName && <p className="text-rose-500 text-[11px] mt-1">{errors.fullName.message}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                          <Input 
                            {...register('phone')} 
                            placeholder="10-digit mobile number" 
                            className="h-11 rounded-xl text-sm border-slate-200"
                          />
                          {errors.phone && <p className="text-rose-500 text-[11px] mt-1">{errors.phone.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                          <Input 
                            {...register('email')} 
                            placeholder="name@example.com" 
                            className="h-11 rounded-xl text-sm border-slate-200"
                          />
                          {errors.email && <p className="text-rose-500 text-[11px] mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Preferred City / State *</label>
                          <Input 
                            {...register('cityState')} 
                            placeholder="e.g. Chandigarh, Jaipur, Lucknow" 
                            className="h-11 rounded-xl text-sm border-slate-200"
                          />
                          {errors.cityState && <p className="text-rose-500 text-[11px] mt-1">{errors.cityState.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Investment Capacity *</label>
                        <select 
                          {...register('investmentCapacity')}
                          className="w-full h-11 rounded-xl text-sm border border-slate-200 bg-white px-3 text-slate-700 font-medium focus:ring-2 focus:ring-[#E91E63] focus:outline-none"
                        >
                          {INVESTMENT_RANGES.map(range => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Business / Healthcare Experience (Optional)</label>
                        <Input 
                          {...register('experience')} 
                          placeholder="e.g. 5 years in business management / nursing" 
                          className="h-11 rounded-xl text-sm border-slate-200"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Additional Remarks (Optional)</label>
                        <textarea 
                          {...register('message')} 
                          rows={3} 
                          placeholder="Tell us about your city plans or questions..." 
                          className="w-full rounded-xl text-sm border border-slate-200 p-3 text-slate-700 focus:ring-2 focus:ring-[#E91E63] focus:outline-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-[linear-gradient(90deg,#E91E63,#FF4F81)] hover:opacity-95 text-white font-extrabold h-12 text-sm rounded-xl shadow-lg border-0 transition-transform active:scale-95"
                      >
                        {isSubmitting ? "Submitting Application..." : "Submit Partner Inquiry →"}
                      </Button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}
