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
  Settings,
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
  Lightbulb,
  HeartHandshake,
  PhoneCall,
  Mail,
  MapPin,
  ChevronDown,
  Clock,
  FileCheck2,
  Lock,
  Briefcase
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
  "Tier 2 & 3 Cities – ₹3 Lakhs",
  "Metro Cities – ₹5 Lakhs",
  "City Master Franchise – ₹7 Lakhs"
];

// 5 Core Advantages aligned with SilverCare Brand Principles
const CORE_PARTNER_BENEFITS = [
  {
    icon: TrendingUp,
    badge: "EXPONENTIAL DEMAND",
    title: "Booming Senior Care Market",
    subtitle: "India's eldercare market is projected to reach ₹1.2 Lakh Crore. Tap into massive, unfulfilled demand for home healthcare.",
    stat: "22% CAGR",
    color: "from-purple-600 to-indigo-700",
    bgColor: "bg-white",
    borderColor: "border-purple-100",
    iconBg: "bg-purple-50 text-purple-600"
  },
  {
    icon: DollarSign,
    badge: "PREDICTABLE CASHFLOW",
    title: "High-Margin Recurring Model",
    subtitle: "Elder care packages generate recurring monthly subscriptions with high customer retention across 6-12 month patient journeys.",
    stat: "78% Retention",
    color: "from-emerald-600 to-teal-700",
    bgColor: "bg-white",
    borderColor: "border-emerald-100",
    iconBg: "bg-emerald-50 text-emerald-600"
  },
  {
    icon: ShieldCheck,
    badge: "TRUSTED NATIONWIDE",
    title: "Brand Trust & Credibility",
    subtitle: "Operate under SilverCare's recognized name, backed by national campaigns with brand ambassador Rakesh Bedi and verified doctors.",
    stat: "10,000+ Families",
    color: "from-pink-600 to-rose-700",
    bgColor: "bg-white",
    borderColor: "border-pink-100",
    iconBg: "bg-pink-50 text-[#E91E63]"
  },
  {
    icon: Headphones,
    badge: "TURNKEY PLAYBOOK",
    title: "100% Operational Support",
    subtitle: "From nurse recruitment, clinical onboarding, and local digital marketing to billing and EHR systems — we guide every single step.",
    stat: "Full Onboarding",
    color: "from-sky-600 to-blue-700",
    bgColor: "bg-white",
    borderColor: "border-sky-100",
    iconBg: "bg-sky-50 text-sky-600"
  },
  {
    icon: HeartHandshake,
    badge: "NOBLE PURPOSE",
    title: "Make a Meaningful Impact",
    subtitle: "Build a profitable business that brings dignity, medical excellence, and genuine emotional relief to seniors and their families.",
    stat: "High Social Impact",
    color: "from-amber-600 to-orange-700",
    bgColor: "bg-white",
    borderColor: "border-amber-100",
    iconBg: "bg-amber-50 text-amber-600"
  }
];

// 4-Stage Franchise Journey
const PARTNERSHIP_STEPS = [
  {
    step: "01",
    title: "Discovery & Territory Allocation",
    desc: "Initial consultation to assess city demand, demographic potential, and assign exclusive regional franchise territory.",
    icon: MapPin,
  },
  {
    step: "02",
    title: "Legal Agreement & Turnkey Setup",
    desc: "Complete licensing documentation, office setup guidelines, clinical protocol provisioning, and marketing collateral kits.",
    icon: FileCheck2,
  },
  {
    step: "03",
    title: "Caregiver Training & Clinical SOPs",
    desc: "Comprehensive onboarding of nurses, GDAs, and physiotherapists with verified SilverCare quality standards.",
    icon: GraduationCap,
  },
  {
    step: "04",
    title: "Grand Launch & Lead Generation",
    desc: "National marketing kickoff, hyper-local digital campaigns, doctor referral network activations, and CRM launch.",
    icon: Megaphone,
  }
];

// Frequently Asked Questions
const FRANCHISE_FAQS = [
  {
    q: "Do I need a medical or healthcare background to open a SilverCare franchise?",
    a: "No medical background is required. SilverCare provides complete clinical protocols, standard operating procedures, and training for all your hired nursing and caregiver staff. Business acumen and a passion for quality care are what matter most."
  },
  {
    q: "How does SilverCare support franchisee staff recruitment?",
    a: "Our centralized HR and clinical talent team helps source, background-check, and certify nurses, GDAs (General Duty Assistants), and physiotherapists before they visit client homes in your city."
  },
  {
    q: "What is the typical setup timeline from agreement to launch?",
    a: "Our streamlined turnkey setup takes between 30 to 45 days. This includes territory licensing, staff recruitment, software configuration, and initial local marketing campaigns."
  },
  {
    q: "How do patient inquiries and bookings get generated?",
    a: "SilverCare runs national digital campaigns, brand ambassador campaigns with Rakesh Bedi, search engine optimization, and corporate tie-ups. All qualified patient leads for your assigned territory are routed directly to your franchise CRM."
  },
  {
    q: "What ongoing operational support does SilverCare provide?",
    a: "You receive a dedicated Franchise Relationship Manager, 24/7 technical support for our management software, continuous clinical training updates, and recurring marketing asset kits."
  }
];

export default function PartnerWithUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

      <div className="bg-[#FAF8FC] min-h-screen font-sans text-slate-800 selection:bg-[#E91E63] selection:text-white">

        {/* ========================================================================= */}
        {/* HERO SECTION: LIGHT LAVENDER / PINK SILVERCARE HEALTHCARE BRAND HERO      */}
        {/* ========================================================================= */}
        <section
          className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden border-b border-pink-100/60"
          style={{
            background: 'linear-gradient(135deg, #FFF5F8 0%, #FAF0F8 45%, #F4EEFB 100%)'
          }}
        >
          {/* Subtle Halftone Wave Background Motif */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-35">
            <HalftoneWaveSVG density="medium" />
          </div>

          {/* Soft ambient blur accent circles */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none -z-0"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-0"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
            {/* Breadcrumb */}
            <nav className="flex items-center text-xs sm:text-sm font-semibold text-slate-500 mb-8">
              <Link to="/" className="hover:text-[#E91E63] transition-colors">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-[#E91E63] font-bold">Partner With Us</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

              {/* Left Column: Heading, Value Prop, Trust Badges */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/70 px-4 py-1.5 text-xs sm:text-sm font-bold text-[#E91E63] mb-6 shadow-xs"
                >
                  <Sparkles size={16} className="text-[#E91E63] animate-pulse" />
                  <span>Franchise & Partnership Opportunities 2026</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#17345E] mb-6 leading-[1.15]"
                >
                  Be a Part of India's <br className="hidden sm:inline" />
                  <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF4F81,#E91E63)]">
                    Most Trusted
                  </span> Eldercare Brand
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-medium"
                >
                  SilverCare brings hospital-grade clinical nursing, elder companionship, and doctor care straight to patient homes. Partner with us to launch a resilient, recurring-revenue healthcare franchise in your city.
                </motion.p>

                {/* Key Metric Counters in Hero (Clean White Premium Cards) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 mb-8">
                  <div className="bg-white/95 backdrop-blur-md border border-pink-100 rounded-2xl p-4 text-center shadow-xs">
                    <div className="text-xl sm:text-2xl font-black text-[#17345E]">10,000+</div>
                    <div className="text-[11px] font-bold text-slate-500 mt-0.5">Families Served</div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md border border-pink-100 rounded-2xl p-4 text-center shadow-xs">
                    <div className="text-xl sm:text-2xl font-black text-[#E91E63]">50+</div>
                    <div className="text-[11px] font-bold text-slate-500 mt-0.5">Operating Cities</div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md border border-pink-100 rounded-2xl p-4 text-center shadow-xs">
                    <div className="text-xl sm:text-2xl font-black text-purple-700">100%</div>
                    <div className="text-[11px] font-bold text-slate-500 mt-0.5">Turnkey Support</div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-md border border-pink-100 rounded-2xl p-4 text-center shadow-xs">
                    <div className="text-xl sm:text-2xl font-black text-emerald-600">12-16 Mo</div>
                    <div className="text-[11px] font-bold text-slate-500 mt-0.5">Expected Payback</div>
                  </div>
                </div>

                {/* Action CTA buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#partner-form"
                    className="inline-flex items-center justify-center bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white font-extrabold px-7 py-4 rounded-xl shadow-[0_10px_25px_rgba(233,30,99,0.25)] transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base group cursor-pointer"
                  >
                    Apply for Franchise Territory
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="tel:+918001480075"
                    className="inline-flex items-center justify-center bg-white hover:bg-slate-50 border-2 border-slate-200 text-[#17345E] hover:border-[#E91E63] hover:text-[#E91E63] font-bold px-6 py-4 rounded-xl shadow-xs transition-all duration-300 text-sm sm:text-base cursor-pointer"
                  >
                    <PhoneCall size={18} className="mr-2 text-[#E91E63]" />
                    Call: +91 800-14-800-75
                  </a>
                </div>
              </div>

              {/* Right Column: Clean, Polished White Franchise Inquiry Form Card */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative bg-white rounded-3xl p-7 sm:p-9 shadow-[0_20px_50px_rgba(233,30,99,0.08)] border border-pink-100/90 overflow-hidden"
                >
                  {/* Subtle top card glow */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-pink-100/50 rounded-full blur-3xl pointer-events-none"></div>

                  {/* Card Title */}
                  <div className="mb-5 relative z-10">
                    <span className="inline-block bg-pink-50 border border-pink-200/80 text-[#E91E63] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2 shadow-2xs">
                      Priority Assessment
                    </span>
                    <h2 className="text-2xl font-black text-[#17345E] tracking-tight">
                      Franchise Inquiry Form
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                      Check territory availability & receive our confidential Franchise Information Deck.
                    </p>
                  </div>

                  {/* Quick Application Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 relative z-10">
                    <div>
                      <label className="block text-[11px] font-bold text-[#17345E] uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <Input
                        {...register('fullName')}
                        placeholder="e.g. Rajesh Sharma"
                        className="bg-slate-50/70 border-slate-200 text-[#17345E] placeholder:text-slate-400 h-11 rounded-xl focus:bg-white focus:border-[#E91E63] focus:ring-2 focus:ring-[#E91E63]/20 transition-all text-sm"
                      />
                      {errors.fullName && <p className="text-rose-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#17345E] uppercase tracking-wider mb-1">
                          Phone Number *
                        </label>
                        <Input
                          {...register('phone')}
                          placeholder="10-digit number"
                          className="bg-slate-50/70 border-slate-200 text-[#17345E] placeholder:text-slate-400 h-11 rounded-xl focus:bg-white focus:border-[#E91E63] focus:ring-2 focus:ring-[#E91E63]/20 transition-all text-sm"
                        />
                        {errors.phone && <p className="text-rose-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#17345E] uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <Input
                          {...register('email')}
                          type="email"
                          placeholder="rajesh@example.com"
                          className="bg-slate-50/70 border-slate-200 text-[#17345E] placeholder:text-slate-400 h-11 rounded-xl focus:bg-white focus:border-[#E91E63] focus:ring-2 focus:ring-[#E91E63]/20 transition-all text-sm"
                        />
                        {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#17345E] uppercase tracking-wider mb-1">
                          Target City / State *
                        </label>
                        <Input
                          {...register('cityState')}
                          placeholder="e.g. Pune / Maharashtra"
                          className="bg-slate-50/70 border-slate-200 text-[#17345E] placeholder:text-slate-400 h-11 rounded-xl focus:bg-white focus:border-[#E91E63] focus:ring-2 focus:ring-[#E91E63]/20 transition-all text-sm"
                        />
                        {errors.cityState && <p className="text-rose-500 text-xs mt-1">{errors.cityState.message}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#17345E] uppercase tracking-wider mb-1">
                          Investment Range *
                        </label>
                        <select
                          {...register('investmentCapacity')}
                          className="w-full h-11 rounded-xl bg-slate-50/70 border border-slate-200 text-[#17345E] text-xs px-3 focus:bg-white focus:border-[#E91E63] focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none transition-all"
                        >
                          {INVESTMENT_RANGES.map((range) => (
                            <option key={range} value={range} className="text-slate-800 bg-white">
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                        {errorMessage}
                      </div>
                    )}

                    {isSuccess && (
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                        <span>Inquiry received! Our franchise development team will contact you within 24 hours.</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white font-extrabold h-12 text-sm rounded-xl shadow-[0_8px_20px_rgba(233,30,99,0.25)] border-0 transition-all duration-200 active:scale-95 cursor-pointer mt-2"
                    >
                      {isSubmitting ? "Submitting Inquiry..." : "Submit Confidential Inquiry →"}
                    </Button>
                  </form>

                  {/* Clean, Subtle Brand Ambassador Credibility Endorsement */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3.5 relative z-10">
                    <img
                      src="/rakesh-bedi-blazer-portrait.jpg"
                      alt="Rakesh Bedi - SilverCare Ambassador"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#E91E63] shadow-xs shrink-0"
                    />
                    <div className="text-left">
                      <p className="text-xs text-slate-700 italic font-semibold leading-tight">
                        “Because they took care of us, now it's our turn.”
                      </p>
                      <span className="text-[11px] font-bold text-[#E91E63] block mt-0.5">
                        Rakesh Bedi • Brand Ambassador
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* EXECUTIVE METRICS STRIP: CLEAN WHITE BACKGROUND, REFINED TYPOGRAPHY        */}
        {/* ========================================================================= */}
        <section className="bg-white border-b border-slate-200/70 py-10 shadow-2xs relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-3 md:border-r border-slate-100 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">India Eldercare Market</span>
                <div className="text-2xl sm:text-3xl font-black text-[#17345E]">₹1.2 Lakh Cr</div>
                <p className="text-xs text-slate-500 mt-1">Expanding at 22%+ annually</p>
              </div>
              <div className="p-3 md:border-r border-slate-100 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Setup to Launch</span>
                <div className="text-2xl sm:text-3xl font-black text-[#E91E63]">30-45 Days</div>
                <p className="text-xs text-slate-500 mt-1">Turnkey clinical & staff onboarding</p>
              </div>
              <div className="p-3 md:border-r border-slate-100 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Customer Retention</span>
                <div className="text-2xl sm:text-3xl font-black text-purple-700">78% Monthly</div>
                <p className="text-xs text-slate-500 mt-1">High lifetime patient value</p>
              </div>
              <div className="p-3 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Support Guarantee</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600">100% Guidance</div>
                <p className="text-xs text-slate-500 mt-1">Dedicated territory manager</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHY PARTNER WITH SILVERCARE (CORE VALUE PILLARS)                          */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24 bg-[#FAF8FC]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-[#E91E63] bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100 inline-block mb-3">
                The Business Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#17345E] tracking-tight mb-4">
                Why Invest in a <span className="text-[#E91E63]">SilverCare Franchise</span>?
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Combine high financial rewards with immense social purpose in one of India's fastest-growing healthcare sectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {CORE_PARTNER_BENEFITS.map((benefit, idx) => {
                const IconComp = benefit.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className={`rounded-3xl p-6 border ${benefit.borderColor} ${benefit.bgColor} shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                  >
                    <div>
                      <div className={`h-12 w-12 rounded-2xl ${benefit.iconBg} flex items-center justify-center mb-5 shadow-2xs`}>
                        <IconComp size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#E91E63] block mb-1">
                        {benefit.badge}
                      </span>
                      <h3 className="text-base font-black text-[#17345E] mb-2 leading-snug">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {benefit.subtitle}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#17345E]">
                      <span>{benefit.stat}</span>
                      <CheckCircle2 size={14} className="text-emerald-500" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Franchise Commitment Strip */}
            <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Handshake size={24} />
                </div>
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-[#17345E]">Territory Exclusivity Guarantee</h4>
                  <p className="text-xs sm:text-sm text-slate-500">Every franchise partner is awarded exclusive municipal zones to ensure high inquiry volume without internal competition.</p>
                </div>
              </div>
              <a
                href="#partner-form"
                className="shrink-0 bg-[#17345E] hover:bg-[#E91E63] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors duration-200 cursor-pointer shadow-xs"
              >
                Check Territory Availability →
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4-STAGE ROADMAP: WE ARE WITH YOU EVERY STEP OF THE WAY                     */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24 bg-[#FAF8FC] border-t border-slate-200/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-[#E91E63] bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100 inline-block mb-3">
                Turnkey Implementation
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#17345E] tracking-tight mb-4">
                We Are With You, <span className="text-[#E91E63]">Every Step of the Way</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                From initial territory licensing to clinical caregiver certification and patient acquisition, our onboarding team executes everything with you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PARTNERSHIP_STEPS.map((step, idx) => {
                const IconComp = step.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-pink-300">{step.step}</span>
                        <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E91E63] flex items-center justify-center">
                          <IconComp size={20} />
                        </div>
                      </div>
                      <h3 className="text-base font-extrabold text-[#17345E] mb-2 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <CheckCircle2 size={13} />
                      <span>Full HQ Assistance</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BRAND AMBASSADOR & CLINICAL EXCELLENCE EDITORIAL SPOTLIGHT (LIGHT THEME)   */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24 bg-white border-t border-slate-200/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div
              className="rounded-3xl p-8 sm:p-12 border border-pink-100/90 shadow-sm"
              style={{ background: 'linear-gradient(135deg, #FFF6F9 0%, #FAF2FB 50%, #F5F0FF 100%)' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                {/* Ambassador Portrait */}
                <div className="md:col-span-5 flex flex-col items-center text-center">
                  <div className="relative group">
                    <img
                      src="/rakesh-bedi-blazer-portrait.jpg"
                      alt="Rakesh Bedi - National Brand Ambassador SilverCare India"
                      className="w-48 sm:w-56 h-48 sm:h-56 rounded-3xl object-cover object-top border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[linear-gradient(90deg,#FF4F81,#E91E63)] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md whitespace-nowrap flex items-center gap-1">
                      <ShieldCheck size={13} />
                      Brand Ambassador
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-xl font-black text-[#17345E]">Rakesh Bedi</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">Actor, Storyteller & Voice for India's Seniors</p>
                  </div>
                </div>

                {/* Editorial Quote & Philosophy */}
                <div className="md:col-span-7 space-y-4 text-left">
                  <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#E91E63] bg-white border border-pink-200 px-3.5 py-1 rounded-md shadow-2xs">
                    Our Shared Mission
                  </span>

                  <blockquote className="text-xl sm:text-2xl font-extrabold text-[#17345E] leading-snug italic">
                    “Because they took care of us, now it's our turn.”
                  </blockquote>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    SilverCare was founded on a simple truth: every elder deserves hospital-grade healthcare, deep emotional companionship, and dignified ageing in the sanctuary of home.
                  </p>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    When you become a SilverCare franchise partner, you don't just build a high-return enterprise — you become the guardian of health, relief, and joy for hundreds of elderly families across your region.
                  </p>

                  {/* 4 Pillars Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    <div className="bg-white rounded-xl p-2.5 text-center border border-pink-100 shadow-2xs">
                      <Heart size={14} className="text-[#E91E63] mx-auto mb-1" />
                      <span className="text-[11px] font-bold text-[#17345E] block">Compassion</span>
                    </div>
                    <div className="bg-white rounded-xl p-2.5 text-center border border-pink-100 shadow-2xs">
                      <ShieldCheck size={14} className="text-[#E91E63] mx-auto mb-1" />
                      <span className="text-[11px] font-bold text-[#17345E] block">Trusted Care</span>
                    </div>
                    <div className="bg-white rounded-xl p-2.5 text-center border border-pink-100 shadow-2xs">
                      <Users size={14} className="text-[#E91E63] mx-auto mb-1" />
                      <span className="text-[11px] font-bold text-[#17345E] block">Senior First</span>
                    </div>
                    <div className="bg-white rounded-xl p-2.5 text-center border border-pink-100 shadow-2xs">
                      <HeartHandshake size={14} className="text-[#E91E63] mx-auto mb-1" />
                      <span className="text-[11px] font-bold text-[#17345E] block">Like Family</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMPREHENSIVE FRANCHISE APPLICATION SECTION                               */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24 bg-[#FAF8FC] border-t border-slate-200/60" id="partner-form">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Direct Call, Requirements */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-[#E91E63] bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100 inline-block">
                  Apply Today
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17345E] leading-tight">
                  Launch Your <span className="text-[#E91E63]">SilverCare Franchise</span>
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Fill out our official franchise application. Our corporate franchise committee reviews applications within 24 hours and arranges a one-on-one virtual discovery session.
                </p>

                <div className="space-y-4 pt-2 text-sm text-slate-700">
                  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-pink-100 shadow-2xs">
                    <PhoneCall className="text-[#E91E63] shrink-0" size={20} />
                    <div>
                      <span className="text-xs text-slate-500 block">Direct Franchise Hotline</span>
                      <strong className="text-base text-[#17345E]">+91 800-14-800-75</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-pink-100 shadow-2xs">
                    <Mail className="text-[#E91E63] shrink-0" size={20} />
                    <div>
                      <span className="text-xs text-slate-500 block">Corporate Mail ID</span>
                      <strong className="text-sm text-[#17345E]">Info@silvercareindia.com</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-pink-100 shadow-2xs">
                    <MapPin className="text-[#E91E63] shrink-0" size={20} />
                    <div>
                      <span className="text-xs text-slate-500 block">Corporate Centre</span>
                      <strong className="text-xs text-[#17345E]">Gurgaon & Chandigarh</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1">
                    <Lock size={14} className="text-emerald-600" /> Confidential Non-Disclosure
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-sky-600" /> 24-Hr Callback
                  </span>
                </div>
              </div>

              {/* Right Column: Full Form */}
              <div className="lg:col-span-7">
                <div className="bg-white border border-pink-100/90 rounded-3xl p-7 sm:p-10 shadow-xs">
                  {isSuccess ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                        <CheckCircle2 size={36} />
                      </div>
                      <h3 className="text-2xl font-black text-[#17345E]">Application Submitted Successfully!</h3>
                      <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                        Thank you for your interest in partnering with SilverCare. Our Franchise Development Director will contact you within 24 hours to present territory viability.
                      </p>
                      <Button
                        onClick={() => setIsSuccess(false)}
                        className="bg-[#17345E] hover:bg-[#E91E63] text-white font-bold text-xs rounded-xl px-6 py-2.5 mt-2 cursor-pointer"
                      >
                        Submit Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#17345E] mb-1">Full Name *</label>
                          <Input
                            {...register('fullName')}
                            placeholder="e.g. Ramesh Chandra"
                            className="h-11 rounded-xl text-sm border-slate-200 bg-slate-50/70 focus:bg-white focus:border-[#E91E63]"
                          />
                          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#17345E] mb-1">Phone Number (WhatsApp) *</label>
                          <Input
                            {...register('phone')}
                            placeholder="10-digit mobile number"
                            className="h-11 rounded-xl text-sm border-slate-200 bg-slate-50/70 focus:bg-white focus:border-[#E91E63]"
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#17345E] mb-1">Email Address *</label>
                          <Input
                            {...register('email')}
                            type="email"
                            placeholder="ramesh@company.com"
                            className="h-11 rounded-xl text-sm border-slate-200 bg-slate-50/70 focus:bg-white focus:border-[#E91E63]"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#17345E] mb-1">Preferred City / State *</label>
                          <Input
                            {...register('cityState')}
                            placeholder="e.g. Indore, Madhya Pradesh"
                            className="h-11 rounded-xl text-sm border-slate-200 bg-slate-50/70 focus:bg-white focus:border-[#E91E63]"
                          />
                          {errors.cityState && <p className="text-red-500 text-xs mt-1">{errors.cityState.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#17345E] mb-1">Available Investment Capital *</label>
                        <select
                          {...register('investmentCapacity')}
                          className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50/70 text-sm px-3 text-[#17345E] focus:bg-white focus:border-[#E91E63] focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none"
                        >
                          {INVESTMENT_RANGES.map((range) => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#17345E] mb-1">Current Background / Business Experience (Optional)</label>
                        <Input
                          {...register('experience')}
                          placeholder="e.g. 8 years in Pharma / Retail Distribution / Healthcare"
                          className="h-11 rounded-xl text-sm border-slate-200 bg-slate-50/70 focus:bg-white focus:border-[#E91E63]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#17345E] mb-1">Questions or Specific City Details (Optional)</label>
                        <textarea
                          {...register('message')}
                          rows={3}
                          placeholder="Tell us why you want to bring eldercare to your city..."
                          className="w-full rounded-xl text-sm border border-slate-200 bg-slate-50/70 p-3 text-[#17345E] focus:bg-white focus:border-[#E91E63] focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none"
                        />
                      </div>

                      {errorMessage && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                          {errorMessage}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white font-extrabold h-12 text-sm rounded-xl shadow-md border-0 transition-transform active:scale-95 cursor-pointer"
                      >
                        {isSubmitting ? "Submitting Application..." : "Submit Confidential Application →"}
                      </Button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FREQUENTLY ASKED QUESTIONS (ACCORDION)                                    */}
        {/* ========================================================================= */}
        <section className="py-16 md:py-24 bg-white border-t border-slate-200/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-14">
              <span className="text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100 inline-block mb-3">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#17345E] tracking-tight mb-4">
                Franchise <span className="text-purple-700">Frequently Asked Questions</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Everything you need to know about becoming a certified SilverCare healthcare partner.
              </p>
            </div>

            <div className="space-y-4">
              {FRANCHISE_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-slate-50/60 border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left font-extrabold text-sm sm:text-base text-[#17345E] flex items-center justify-between gap-4 cursor-pointer hover:text-[#E91E63] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 transition-transform duration-200 text-slate-400 ${isOpen ? 'rotate-180 text-[#E91E63]' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL CLOSING CTA BANNER                                                  */}
        {/* ========================================================================= */}
        <section className="py-14 bg-gradient-to-r from-[#17345E] via-[#2A1B4E] to-[#17345E] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
              Ready to Bring Compassionate Eldercare to Your City?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Partner with SilverCare to build a high-demand, profitable healthcare enterprise with turnkey clinical support.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#partner-form"
                className="bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-sm cursor-pointer"
              >
                Apply for Franchise Territory →
              </a>
              <a
                href="tel:+918001480075"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl backdrop-blur-md transition-colors text-sm cursor-pointer flex items-center gap-2"
              >
                <PhoneCall size={16} className="text-[#FF4F81]" />
                <span>Call Franchise Director: +91 800-14-800-75</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
