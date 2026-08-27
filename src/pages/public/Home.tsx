import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, UserCheck, Stethoscope, Activity, CheckCircle2, ChevronDown, ChevronRight, MapPin, Heart, Clock, Search, Check, Users, FileText, Sparkles, PhoneCall, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import SEO from "@/src/components/seo/SEO";
import { useAppContent, fallbackServices } from "@/src/hooks/useAppContent";
import { initialBlogPosts } from "@/src/data/blogData";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import heroDoctorImg from "@/src/assets/hero-doctor.png";
import ServiceSearch from "@/src/components/shared/ServiceSearch";
import CareCalculator from "@/src/components/tools/CareCalculator";
import SilverCareBackground, { HalftoneWaveSVG, OrganicPastelBlobs } from "@/src/components/shared/SilverCareBackground";

// Motion Tokens
const premiumEase = [0.22, 1, 0.36, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: premiumEase } }
};

const heroStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const staggerCards = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: premiumEase } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: premiumEase } }
};

// Sequence of authentic SilverCare services for Hero rotating animation
const HERO_ROTATING_SERVICES = [
  "Caregivers",
  "Nursing Care",
  "Physiotherapy",
  "Doctor Visits",
  "Senior Companionship",
  "Telemedicine"
];

// Animated Counter Component for Verified Statistics
function CounterNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        let start = 0;
        const end = value;
        const duration = 1400;
        const increment = Math.max(1, Math.ceil(end / (duration / 20)));
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 20);
      }}
      transition={{ duration: 0.5, ease: premiumEase }}
      className="inline-block"
    >
      {count.toLocaleString('en-IN')}{suffix}
    </motion.span>
  );
}

export default function Home() {
  const { services, testimonials, faqs, siteSettings, loading } = useAppContent();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const [availabilityResult, setAvailabilityResult] = useState<{ checked: boolean; isAvailable: boolean; locationName: string }>({
    checked: false,
    isAvailable: false,
    locationName: ""
  });

  // Continuous cinematic rotation (2.1 seconds per service word)
  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % HERO_ROTATING_SERVICES.length);
    }, 2100);
    return () => clearInterval(timer);
  }, []);

  const getIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'heartpulse': return Heart;
      case 'usercheck': return UserCheck;
      case 'activity': return Activity;
      default: return Stethoscope;
    }
  };

  const displayServices = services.length > 0 ? services : fallbackServices;

  // Alternating soft gradient themes for service cards
  const iconThemes = [
    { bg: "bg-[#FFF0F5]", text: "text-[#FF4F81]" }, // soft pink
    { bg: "bg-[#F5E8FF]", text: "text-[#7B2CBF]" }, // soft lavender
    { bg: "bg-[#FFF6F1]", text: "text-[#FF9F43]" }, // soft peach
    { bg: "bg-[#F8F1FF]", text: "text-[#9D4EDD]" }, // soft purple
    { bg: "bg-[#FFF0F0]", text: "text-[#FF6B6B]" }, // soft coral
    { bg: "bg-[#F3E5F5]", text: "text-[#8E24AA]" }, // soft lilac
  ];

  return (
    <>
      <SEO 
        title="SilverCare India | Home Eldercare & Healthcare Services" 
        description="Professional home healthcare and eldercare services including nursing care, physiotherapy, doctor visits, senior companionship and diagnostics across Gurgaon & North India."
      />
      <div className="flex flex-col font-sans text-slate-800 bg-white">
        
        {/* 1. HERO SECTION WITH PROMINENT DEDICATED ROTATING SERVICE FEATURE */}
        <section 
          className="relative pt-6 sm:pt-8 lg:pt-10 pb-16 lg:pb-24 overflow-hidden border-b border-slate-100 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: 'url(/home-bg-1.png)' }}
        >
          {/* Right Side Soft Lightening Overlay (Top-Right & Bottom-Right Purple Lightening) */}
          <div className="absolute inset-y-0 right-0 w-[65%] bg-[radial-gradient(ellipse_at_center_right,rgba(255,255,255,0.55)_0%,rgba(255,248,252,0.4)_60%,transparent_100%)] pointer-events-none z-0" />




          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1480px] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Content Column */}
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={heroStagger} 
                className="max-w-2xl text-left"
              >
                {/* 1. Trusted Eldercare Badge */}
                <motion.div 
                  variants={fadeInUp} 
                  className="inline-flex items-center gap-2 rounded-full bg-[#FFF0F5] border border-[#FFD6E5] px-4 py-1.5 text-xs sm:text-sm font-bold text-[#FF4F81] mb-6 shadow-xs"
                >
                  <Sparkles size={16} className="text-[#FF3E72] animate-pulse" /> Trusted Eldercare & Healthcare Services
                </motion.div>
                
                {/* 2. Main Fixed Headline (Synchronized 2-Line Desktop Layout) */}
                <motion.h1 
                  variants={fadeInUp} 
                  className="text-3xl sm:text-4xl md:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.2rem] font-black tracking-tight text-[#17345E] leading-[1.08] mb-4"
                >
                  <span className="block whitespace-nowrap">Professional care,</span>
                  <span className="block whitespace-nowrap">
                    with <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#17345E,#7B2CBF,#9D4EDD)]">compassion.</span>
                  </span>
                </motion.h1>

                {/* 3. DEDICATED PROMINENT ROTATING SERVICE LINE */}
                <motion.div variants={fadeInUp} className="mt-4 mb-6">
                  <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#FF4F81] mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF4F81] animate-ping"></span>
                    Dedicated Support For
                  </div>
                  
                  {/* Reserved Fixed-Height Container to PREVENT ANY LAYOUT SHIFT */}
                  <div className="h-10 sm:h-12 md:h-14 lg:h-16 relative overflow-hidden flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={HERO_ROTATING_SERVICES[rotatingIndex]}
                        initial={{ y: 22, opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -22, opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.48, ease: premiumEase }}
                        className="absolute left-0 text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3rem] font-black bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF3E72,#FF7A45,#7B2CBF)] tracking-tight whitespace-nowrap leading-none drop-shadow-xs"
                      >
                        {HERO_ROTATING_SERVICES[rotatingIndex]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
                
                {/* 4. Subtitle Paragraph */}
                <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                  Hospital-quality healthcare and compassionate eldercare, delivered safely to your home. From nursing and doctor visits to physiotherapy and senior companionship, SilverCare helps your loved ones receive the care they deserve.
                </motion.p>
                
                {/* 5. CTA Buttons */}
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                  <Link to="/book" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 border-0 text-white font-extrabold text-lg h-14 px-8 shadow-[0_8px_22px_rgba(233,30,99,0.25)] rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 group">
                      Book a Home Visit
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <Link to="/services" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-800 hover:bg-pink-50/50 hover:border-[#E91E63] hover:text-[#E91E63] font-extrabold text-lg h-14 px-8 rounded-xl transition-all duration-300 group">
                      Explore Services
                      <ArrowRight size={18} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Button>
                  </Link>
                </motion.div>

                {/* 6. Premium Icon-Led Trust Badge Row Below CTA Buttons */}
                <motion.div 
                  variants={heroStagger} 
                  className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-bold text-slate-700"
                >
                  <motion.div variants={fadeInUp} className="flex items-center gap-2.5 bg-pink-50/50 border border-pink-100/60 rounded-xl px-3.5 py-2.5 shadow-2xs">
                    <ShieldCheck size={18} className="text-[#E91E63] shrink-0" /> 
                    <span>Verified professionals</span>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex items-center gap-2.5 bg-pink-50/50 border border-pink-100/60 rounded-xl px-3.5 py-2.5 shadow-2xs">
                    <Stethoscope size={18} className="text-[#E91E63] shrink-0" /> 
                    <span>Doctor-guided plans</span>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="flex items-center gap-2.5 bg-pink-50/50 border border-pink-100/60 rounded-xl px-3.5 py-2.5 shadow-2xs">
                    <Heart size={18} className="text-[#FF4F81] shrink-0" /> 
                    <span>Transparent care</span>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* 7. Right Visual Column - Direct Role Model Portrait Seamlessly Integrated */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: premiumEase }}
                className="relative mt-10 lg:mt-0 flex flex-col items-center justify-center"
              >
                <img 
                  src={siteSettings.heroImageUrl && siteSettings.heroImageUrl.startsWith('http') ? siteSettings.heroImageUrl : heroDoctorImg}
                  alt={siteSettings.doctorName || "Senior Healthcare Specialist in SilverCare uniform"} 
                  className="w-full h-auto object-contain object-bottom max-h-[580px] lg:max-h-[640px] mix-blend-multiply transition-transform duration-500 hover:scale-[1.01]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </motion.div>



            </div>
          </div>
        </section>

        {/* 2. STATS BAR SECTION */}
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerCards}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            >
              {[
                { value: "50,000+", label: "Eldercare Visits Completed", icon: CheckCircle2 },
                { value: "98.5%", label: "Satisfaction Rate", icon: Heart },
                { value: "100%", label: "Verified Caregivers", icon: ShieldCheck },
                { value: "24/7", label: "Care Assistance", icon: Clock },
              ].map((stat, i) => (
                <motion.div variants={fadeInUp} key={i} className="p-4 rounded-2xl bg-pink-50/30 border border-pink-100/50 flex flex-col items-center">
                  <stat.icon size={24} className="text-[#E91E63] mb-2" />
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#17345E]">{stat.value}</span>
                  <span className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. SERVICES SECTION */}
        <section className="relative py-20 lg:py-28 bg-[linear-gradient(180deg,#FFFFFF_0%,#FAF6FF_50%,#FFFFFF_100%)] overflow-hidden border-b border-slate-100">
          <OrganicPastelBlobs variant="services" />
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
            <HalftoneWaveSVG density="subtle" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#FF4F81] mb-2 block">Our Core Capabilities</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#17345E]">Comprehensive Home Healthcare</h2>
              </div>
              <Link to="/services" className="mt-4 md:mt-0 text-[#E91E63] font-bold hover:underline flex items-center gap-1">
                View All Services <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayServices.map((service, index) => {
                const ServiceIcon = getIcon(service.icon);
                return (
                  <motion.div
                    key={service.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      <div className="h-14 w-14 rounded-2xl bg-pink-50 text-[#E91E63] flex items-center justify-center mb-6 group-hover:bg-[#E91E63] group-hover:text-white transition-colors duration-300">
                        <ServiceIcon size={28} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#FF4F81] bg-pink-50 px-3 py-1 rounded-full mb-3 inline-block">
                        {service.category || 'Home Care'}
                      </span>
                      <h3 className="text-xl font-extrabold text-[#17345E] mb-3 group-hover:text-[#E91E63] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link to={`/services/${service.slug}`} className="text-sm font-extrabold text-[#E91E63] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Learn More <ChevronRight size={16} />
                      </Link>
                      <Link to={`/book?service=${service.slug}`}>
                        <Button size="sm" variant="ghost" className="text-slate-700 hover:text-[#E91E63] font-bold">
                          Book Visit
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. COMPASSION SECTION */}
        <section className="relative py-20 lg:py-24 bg-[#FFF0F5] border-y border-[#FCE4EC] overflow-hidden">
          <OrganicPastelBlobs variant="about" />
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-60">
            <HalftoneWaveSVG density="medium" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1340px] relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
              
              {/* Left Content Column (7 Cols) */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideInLeft} className="lg:col-span-7">
                <h2 className="text-3xl md:text-[2.5rem] font-extrabold text-[#17345E] leading-[1.2] mb-6">
                  Compassionate Care That <br />
                  <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF5C7A,#E91E63)]">Feels Like Family</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                  SilverCare believes every senior deserves to age with dignity, comfort and independence. Our healthcare professionals and caregivers provide medical support alongside genuine companionship, helping families feel confident that their loved ones are in safe hands.
                </p>
                
                {/* Clean 2-Column Benefit Checklist */}
                <motion.div variants={staggerCards} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-xl">
                  {[
                    "Healthcare at home",
                    "Trained & verified caregivers",
                    "Doctor-led care plans",
                    "Single-point coordination",
                    "Transparent pricing",
                    "Personalised support"
                  ].map((benefit, i) => (
                    <motion.div variants={fadeInUp} key={i} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#FCE4EC] text-[#E91E63] flex items-center justify-center shrink-0 border border-pink-200 shadow-2xs">
                        <Check size={16} strokeWidth={2.5} />
                      </div>
                      <span className="text-slate-700 font-semibold text-sm sm:text-base">{benefit}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Subtle Horizontal Divider */}
                <div className="w-full max-w-xl h-px bg-[#FCE4EC] mt-8 mb-6"></div>

                {/* Founder Trust Strip - Anchored Left Button with Founder Shifted Right */}
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, ease: premiumEase }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-8 sm:gap-14 md:gap-[72px] lg:gap-[84px] xl:gap-[96px] pt-0 w-full max-w-xl"
                >
                  {/* Left: About Us Pill Button (Anchored Left) */}
                  <Link to="/about" className="shrink-0">
                    <Button 
                      size="lg" 
                      className="bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white font-extrabold text-base h-[54px] px-8 min-w-[175px] sm:min-w-[182px] rounded-full shadow-md shadow-[#FF4F81]/25 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95 group flex items-center justify-center gap-2.5 border-0"
                    >
                      <span>About Us</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>

                  {/* Right: Founder Profile (Shifted Right to Align with Content Edge) */}
                  <div className="flex items-center gap-4 group shrink-0">
                    <div className="relative shrink-0">
                      <img 
                        src={siteSettings.ceoPhotoUrl && siteSettings.ceoPhotoUrl.startsWith('http') ? siteSettings.ceoPhotoUrl : "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png"} 
                        alt="Navin Chauhan, Founder and CEO of SilverCare" 
                        className="h-[76px] w-[76px] rounded-full border-2 border-pink-200 shadow-md object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-lg sm:text-xl text-[#17345E] leading-tight group-hover:text-[#E91E63] transition-colors">
                        Navin Chauhan
                      </h4>
                      <p className="text-xs font-extrabold uppercase tracking-widest text-[#FF4F81] mt-1">
                        CEO, FOUNDER
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Visual Column (5 Cols - Larger Prominent Healthcare Image) */}
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-100px" }} 
                variants={slideInRight}
                className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0"
              >
                <div className="relative w-full max-w-[500px] lg:max-w-[560px] xl:max-w-[580px] rounded-[36px] overflow-hidden shadow-xl border border-pink-100/60 bg-white group">
                  <img 
                    src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200&fmt=webp" 
                    alt="Professional interacting warmly with senior" 
                    className="w-full h-[460px] sm:h-[500px] lg:h-[530px] xl:h-[550px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-[#FF4F81] mix-blend-color opacity-5"></div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 5. WHY SILVERCARE SECTION */}
        <section className="relative py-20 lg:py-28 bg-[linear-gradient(180deg,#FAF5FF_0%,#FFF5F9_100%)] overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-45">
            <HalftoneWaveSVG density="subtle" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#17345E] mb-4">Why families choose <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF5C7A,#E91E63)]">SilverCare</span></h2>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerCards} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Verified Professionals", icon: ShieldCheck, desc: "Background-checked and trained healthcare professionals." },
                { title: "Personalised Care Plans", icon: FileText, desc: "Care designed around the individual's health and daily needs." },
                { title: "Doctor-Guided Support", icon: Stethoscope, desc: "Care plans coordinated with qualified healthcare professionals." },
                { title: "One Point of Coordination", icon: Users, desc: "Families don't have to manage multiple service providers." },
                { title: "Transparent Care", icon: Activity, desc: "Clear communication and straightforward service information." },
                { title: "Care With Dignity", icon: Heart, desc: "Support that respects the senior's comfort, privacy and independence." }
              ].map((feature, i) => (
                <motion.div variants={fadeInUp} key={i} className="bg-white border border-pink-100/80 p-8 rounded-[24px] hover:shadow-[0_12px_36px_rgba(233,30,99,0.08)] hover:-translate-y-1.5 transition-all duration-300 group">
                  <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 origin-left inline-block">
                    <feature.icon size={32} className="text-[#E91E63] mb-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#17345E] mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. HOW IT WORKS SECTION (Sequential Step Progression) */}
        <section className="relative py-20 lg:py-28 bg-[#FFF0F5] overflow-hidden border-t border-[#FCE4EC]">
          <OrganicPastelBlobs variant="subpage" />
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
            <HalftoneWaveSVG density="subtle" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold mb-16 text-[#17345E]">Quality care, without the complexity.</motion.h2>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerCards} className="grid grid-cols-1 md:grid-cols-4 gap-8 relative max-w-5xl mx-auto">
              <motion.div 
                initial={{ scaleX: 0 }} 
                whileInView={{ scaleX: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                style={{ transformOrigin: "left" }} 
                className="hidden md:block absolute top-10 left-[12%] right-[12%] h-[2.5px] bg-[#F8BBD0] z-0"
              ></motion.div>
              
              {[
                { step: "01", title: "Tell us what you need", color: "bg-[#E91E63]" },
                { step: "02", title: "Speak with our care coordinator", color: "bg-[#FF4F81]" },
                { step: "03", title: "We match the right professional", color: "bg-[#FF80AB]" },
                { step: "04", title: "Care begins at your home", color: "bg-[#E91E63]" }
              ].map((item, i) => (
                <motion.div variants={fadeInUp} key={i} className="relative z-10 flex flex-col items-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className={`w-20 h-20 ${item.color} rounded-full border-4 border-white flex items-center justify-center text-white font-extrabold text-xl mb-6 shadow-xl transition-transform cursor-default`}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-lg font-bold w-3/4 leading-snug text-[#17345E]">{item.title}</h3>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-16">
              <Link to="/book">
                <Button size="lg" className="bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 border-0 text-white font-extrabold text-lg h-14 px-10 rounded-xl shadow-[0_8px_20px_rgba(233,30,99,0.22)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 group">
                  Book Your Care Consultation
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 7. VERIFIED STATISTICS NUMBER COUNTERS */}
        <section className="py-20 bg-white border-b border-[#EFE5F7]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={staggerCards} 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#EFE5F7]"
            >
              <motion.div variants={fadeInUp} className="px-4">
                <div className="text-4xl lg:text-5xl font-black text-[#17345E] mb-2">
                  <CounterNumber value={5000} suffix="+" />
                </div>
                <div className="text-slate-500 font-semibold text-sm sm:text-base">Families Supported</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="px-4">
                <div className="text-4xl lg:text-5xl font-black text-[#17345E] mb-2">
                  <CounterNumber value={200} suffix="+" />
                </div>
                <div className="text-slate-500 font-semibold text-sm sm:text-base">Care Professionals</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="px-4">
                <div className="text-4xl lg:text-5xl font-black text-[#17345E] mb-2">
                  <CounterNumber value={12} suffix="" />
                </div>
                <div className="text-slate-500 font-semibold text-sm sm:text-base">Cities Served</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="px-4">
                <div className="text-4xl lg:text-5xl font-black text-[#17345E] mb-2">
                  4.9/5
                </div>
                <div className="text-slate-500 font-semibold text-sm sm:text-base">Family Satisfaction</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section className="relative py-24 bg-[#FFF8FB] overflow-hidden">
          <OrganicPastelBlobs variant="subpage" />
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-55">
            <HalftoneWaveSVG density="medium" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#17345E]">What families say about SilverCare</h2>
              <p className="text-slate-600 mt-2 text-base">Real experiences from families across North India</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerCards} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {(testimonials.length > 0 ? testimonials : [
                {
                  id: 't1',
                  patientName: 'Suresh Wadhwa (Sec 34 Chandigarh)',
                  content: "SilverCare’s nursing service has been a true blessing for our family. The nurse was highly trained, compassionate, and treated my father with dignity and patience. From medication management to daily care, everything was handled professionally.",
                  rating: 5
                },
                {
                  id: 't2',
                  patientName: 'Rajeev Aggarwal (Aerocity Mohali)',
                  content: "The physiotherapy sessions provided by SilverCare helped me regain mobility after my knee surgery. The therapist was punctual, knowledgeable and customized exercises as per my condition. Within a few weeks, I noticed significant improvement in strength and flexibility. Highly recommended for senior citizens.",
                  rating: 5
                }
              ]).map((testimonial) => (
                <motion.div variants={fadeInUp} key={testimonial.id} className="bg-white p-8 rounded-[24px] shadow-xs border border-[#F4C7DB] flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex text-[#FF9F43] mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-slate-700 mb-8 italic leading-relaxed flex-grow">"{testimonial.content}"</p>
                  <div>
                    <p className="font-bold text-[#17345E]">{testimonial.patientName}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 8.5 STORIES & HEALTHCARE INSIGHTS PREVIEW */}
        <section className="py-20 bg-[#FAF5FF] border-t border-[#EFE5F7]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-[#7B2CBF] font-extrabold text-xs uppercase tracking-wider mb-2">
                  <BookOpen size={14} /> Care Journal & Insights
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#17345E]">Stories & Insights</h2>
                <p className="text-slate-600 mt-2 text-base max-w-xl">
                  Real care journeys, useful senior-health guidance and ideas to help families make better care decisions.
                </p>
              </div>
              <Link to="/blog" className="inline-flex items-center font-extrabold text-sm text-[#7B2CBF] hover:text-[#6A24A6] group">
                Explore All Stories <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Editorial Layout: 1 Featured (Left 7 Cols) + 2 Compact (Right 5 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Featured Left Card */}
              {initialBlogPosts[0] && (
                <div className="lg:col-span-7 bg-white rounded-[24px] border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                    <img 
                      src={initialBlogPosts[0].imageUrl} 
                      alt={initialBlogPosts[0].title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-[#7B2CBF]">
                      {initialBlogPosts[0].category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold mb-2">
                      <span><Calendar size={12} className="inline mr-1" />{initialBlogPosts[0].publishedAt}</span>
                      <span>•</span>
                      <span><Clock size={12} className="inline mr-1" />{initialBlogPosts[0].readTime}</span>
                    </div>
                    <h3 className="font-extrabold text-xl text-[#17345E] mb-3 leading-snug group-hover:text-[#7B2CBF] transition-colors">
                      <Link to={`/blog/${initialBlogPosts[0].slug}`}>
                        {initialBlogPosts[0].title}
                      </Link>
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {initialBlogPosts[0].excerpt}
                    </p>
                    <Link to={`/blog/${initialBlogPosts[0].slug}`} className="mt-auto font-extrabold text-xs text-[#7B2CBF] flex items-center group-hover:translate-x-1 transition-transform">
                      Read Full Story <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Stacked Right Cards */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {initialBlogPosts.slice(1, 4).map((post) => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group bg-white p-5 rounded-[20px] border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-200 transition-all flex items-start gap-4"
                  >
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-24 h-24 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF4F81] block mb-1">
                          {post.category}
                        </span>
                        <h4 className="font-extrabold text-sm text-[#17345E] group-hover:text-[#7B2CBF] transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 mt-2 flex items-center">
                        <Clock size={11} className="mr-1" /> {post.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* 9. SERVICE AREA CHECKER */}
        <section className="py-20 bg-white border-t border-slate-100">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs uppercase tracking-wider mb-3">
              <MapPin size={14} className="text-emerald-600" /> Doorstep Service Coverage
            </span>
            <h2 className="text-3xl font-extrabold text-[#17345E] mb-3">Bringing care closer to home</h2>
            <p className="text-slate-600 mb-8 text-base sm:text-lg">Check instant eldercare service availability in your city or PIN code.</p>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!pinCode.trim()) return;
                
                const query = pinCode.trim().toLowerCase();
                const numPin = parseInt(query);

                const isGurgaon = query.includes("gurgaon") || query.includes("gurugram") || (numPin >= 122001 && numPin <= 122050);
                const isDelhi = query.includes("delhi") || query.includes("noida") || query.includes("faridabad") || (numPin >= 110001 && numPin <= 110096);
                const isChd = query.includes("chandigarh") || (numPin >= 160001 && numPin <= 160099);
                const isMohali = query.includes("mohali") || (numPin >= 140301 && numPin <= 140308);
                const isPanchkula = query.includes("panchkula") || (numPin >= 134109 && numPin <= 134117);
                const isLudhiana = query.includes("ludhiana") || (numPin >= 141001 && numPin <= 141015);

                const isAvailable = isGurgaon || isDelhi || isChd || isMohali || isPanchkula || isLudhiana || (!isNaN(numPin) && (numPin >= 110000 && numPin <= 175000));

                let matchedCity = "your location";
                if (isGurgaon) matchedCity = "Gurgaon & Sector 33 Hub";
                else if (isDelhi) matchedCity = "Delhi NCR Region";
                else if (isChd) matchedCity = "Chandigarh Tri-City Area";
                else if (isMohali) matchedCity = "Mohali Region";
                else if (isPanchkula) matchedCity = "Panchkula Sector Zone";
                else if (isLudhiana) matchedCity = "Ludhiana Care Zone";
                else matchedCity = pinCode.trim();

                setAvailabilityResult({
                  checked: true,
                  isAvailable,
                  locationName: matchedCity
                });
              }}
              className="space-y-4 max-w-xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <div className="relative flex-1">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Enter City or PIN (e.g. 160047, 122001, Gurgaon)" 
                    className="w-full pl-11 pr-5 py-4 bg-[#FFF5F8] border border-pink-100 rounded-xl outline-none focus:border-[#E91E63] focus:ring-2 focus:ring-pink-100 transition-all text-slate-800 font-bold text-sm"
                    value={pinCode}
                    onChange={(e) => {
                      setPinCode(e.target.value);
                      if (availabilityResult.checked) setAvailabilityResult({ checked: false, isAvailable: false, locationName: "" });
                    }}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-[#17345E] hover:bg-[#2A1E59] text-white h-[54px] px-8 rounded-xl font-extrabold text-sm hover:-translate-y-0.5 active:scale-95 transition-all shadow-md shrink-0"
                >
                  Check Availability
                </Button>
              </div>
            </form>

            {/* Instant Result Card */}
            <AnimatePresence>
              {availabilityResult.checked && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 max-w-xl mx-auto"
                >
                  {availabilityResult.isAvailable ? (
                    <div className="p-6 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-left shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <CheckCircle2 size={22} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-base">
                            24/7 Eldercare Service Available!
                          </h4>
                          <p className="text-xs text-emerald-800 font-medium mt-0.5">
                            Full home nursing, doctor visits & physio active in <strong>{availabilityResult.locationName}</strong>.
                          </p>
                          <p className="text-[11px] text-slate-500 font-bold mt-1">
                            ⏱️ Estimated Professional Dispatch: 30 - 45 Minutes
                          </p>
                        </div>
                      </div>
                      <Link to="/book" className="w-full sm:w-auto shrink-0">
                        <Button size="sm" className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs h-10 px-5 rounded-xl border-0 shadow-xs">
                          Book Visit Now →
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-amber-50/90 border border-amber-200 text-left shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="h-10 w-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <PhoneCall size={20} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-base">
                            Priority Dispatch Available
                          </h4>
                          <p className="text-xs text-amber-900 font-medium mt-0.5">
                            We deploy specialist care to <strong>{availabilityResult.locationName}</strong> on direct call confirmation.
                          </p>
                        </div>
                      </div>
                      <Link to="/book" className="w-full sm:w-auto shrink-0">
                        <Button size="sm" className="w-full sm:w-auto bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs h-10 px-5 rounded-xl border-0 shadow-xs">
                          Book Visit Now →
                        </Button>
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* 10. BOOKING CTA WITH AMBIENT MOTION */}
        <section className="py-24 bg-[linear-gradient(135deg,#AD1457_0%,#E91E63_50%,#FF4F81_100%)] text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
            <HalftoneWaveSVG density="medium" />
          </div>
          <motion.div 
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
            className="absolute inset-0 opacity-[0.06] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(#FFF 2px, transparent 2px)', backgroundSize: '40px 40px' }}
          ></motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Not sure what kind of care your loved one needs?</h2>
            <p className="text-lg text-white/90 mb-10 leading-relaxed">
              Tell us what your loved one needs and our care team will help you understand the most suitable SilverCare service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/book" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#E91E63] font-extrabold h-14 px-10 rounded-xl text-lg shadow-lg shadow-[#880E4F]/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group">
                  Book a Home Visit
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[linear-gradient(90deg,#FF7A45,#FF9E4A)] border-0 text-white hover:opacity-95 font-extrabold h-14 px-10 rounded-xl text-lg shadow-lg shadow-[#4B2378]/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group">
                  Request a Call Back
                  <ArrowRight size={18} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>


      </div>
    </>
  );
}
