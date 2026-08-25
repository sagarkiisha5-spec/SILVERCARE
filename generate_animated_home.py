content = """import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, UserCheck, Stethoscope, Activity, CheckCircle2, ChevronDown, MapPin, Heart, Clock, Search, Check, Users, FileText } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import SEO from "@/src/components/seo/SEO";
import { useAppContent, fallbackServices } from "@/src/hooks/useAppContent";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import heroDoctorImg from "@/src/assets/hero-doctor.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Home() {
  const { services, testimonials, faqs, siteSettings, loading } = useAppContent();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pinCode, setPinCode] = useState("");

  const getIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'heartpulse': return Heart;
      case 'usercheck': return UserCheck;
      case 'activity': return Activity;
      default: return Stethoscope;
    }
  };

  const displayServices = services.length > 0 ? services : fallbackServices;

  // Colors for alternating service cards
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
        title="SilverCare | Home Healthcare & Eldercare Services" 
        description="Professional home healthcare and eldercare services including nursing, physiotherapy, doctor visits, senior care and home sample collection with SilverCare."
      />
      <div className="flex flex-col font-sans text-slate-800 bg-white">
        
        {/* 1. SPLIT HERO SECTION */}
        <section className="relative pt-12 md:pt-16 lg:pt-24 pb-16 lg:pb-32 bg-[linear-gradient(135deg,#FFF7FB_0%,#F8ECFF_50%,#FDEBFF_100%)] overflow-hidden">
          {/* Subtle decorative pattern background */}
          <motion.div 
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-[0.03]" 
            style={{ backgroundImage: 'radial-gradient(#7B2CBF 2px, transparent 2px)', backgroundSize: '30px 30px' }}
          ></motion.div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Content */}
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-[#FFF0F6] border border-[#F4C7DB] px-4 py-2 text-sm font-semibold text-[#D93B72] mb-6 shadow-sm">
                  <ShieldCheck size={18} className="text-[#FF4F81]" /> Trusted Healthcare & Eldercare at Home
                </motion.div>
                
                <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-[4.2rem] font-extrabold tracking-tight text-[#17345E] leading-[1.1] mb-6">
                  Professional care, <br />
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF5B7F,#FF8A45,#9D4EDD)]"
                  >
                    with compassion.
                  </motion.span>
                </motion.h1>
                
                <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                  Hospital-quality healthcare and compassionate eldercare, delivered safely to your home. From nursing and doctor visits to physiotherapy and senior companionship, SilverCare helps your loved ones receive the care they deserve.
                </motion.p>
                
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                  <Link to="/book" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] hover:opacity-90 border-0 text-white font-bold text-lg h-14 px-8 shadow-[0_8px_20px_rgba(123,44,191,0.22)] rounded-xl transition-all group">
                      Book a Home Visit
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/services" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white border-2 border-[#DCC7EF] text-[#4D2A7A] hover:bg-[#F5E8FF] hover:border-[#7B2CBF] font-bold text-lg h-14 px-8 rounded-xl transition-all group">
                      Explore Services
                      <ArrowRight size={18} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Button>
                  </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div variants={staggerContainer} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm font-medium text-slate-600">
                  <motion.div variants={fadeInUp} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#9D4EDD]" /> Trained & verified professionals</motion.div>
                  <motion.div variants={fadeInUp} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#9D4EDD]" /> Doctor-guided care</motion.div>
                  <motion.div variants={fadeInUp} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#9D4EDD]" /> Transparent coordination</motion.div>
                </motion.div>
              </motion.div>
              
              {/* Right Visual */}
              <div className="relative mt-8 lg:mt-0 block">
                {/* Subtle Glow Behind Image */}
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-[radial-gradient(circle,rgba(211,165,255,0.4),transparent_60%)] scale-125 -z-10"
                ></motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.97, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/80 bg-slate-100 max-w-lg mx-auto lg:max-w-none"
                >
                  <img 
                    src={siteSettings.heroImageUrl && siteSettings.heroImageUrl.startsWith('http') ? siteSettings.heroImageUrl : heroDoctorImg}
                    alt={siteSettings.doctorName || "Senior Healthcare Specialist in SilverCare uniform"} 
                    className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover object-top"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17345E]/30 to-transparent"></div>
                  
                  {/* Floating Trust Card 1 */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white flex items-center gap-4"
                  >
                    <div className="h-12 w-12 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#FF4F81] shrink-0">
                      <Heart size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#17345E]">Patient-First Care</h4>
                      <p className="text-sm text-slate-500">Personalised around your family</p>
                    </div>
                  </motion.div>

                  {/* Floating Trust Card 2 */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="absolute top-8 right-[-1rem] lg:right-[-2rem] hidden md:flex bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white items-center gap-4"
                  >
                    <div className="h-12 w-12 rounded-full bg-[#F5E8FF] flex items-center justify-center text-[#7B2CBF] shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#17345E]">Trusted Professionals</h4>
                      <p className="text-sm text-slate-500">Verified & trained</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. FLOATING SEARCH */}
        <section className="relative z-20 -mt-8 sm:-mt-10 mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="container mx-auto max-w-4xl"
          >
            <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(80,40,120,0.08)] border border-[#EFE5F7] p-4 sm:p-6 flex items-center focus-within:ring-2 focus-within:ring-[#F5E8FF] focus-within:border-[#D946EF] transition-all duration-300">
              <Search className="text-[#9B8CB4] mr-3 shrink-0" size={24} />
              <input 
                type="text" 
                placeholder="What care do you need? (e.g. Home Nursing, Physiotherapy...)" 
                className="w-full text-lg outline-none text-slate-700 placeholder:text-slate-400 bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link to={`/search?q=${encodeURIComponent(searchQuery)}`}>
                <Button className="ml-4 bg-[#2A1E59] hover:bg-[#7B2CBF] text-white rounded-xl px-6 h-12 hidden sm:flex transition-colors">
                  Search
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* 3. QUICK SERVICE SELECTOR */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#17345E] mb-4">How can we help you today?</h2>
              <p className="text-lg text-slate-600">Choose the care your loved one needs.</p>
            </motion.div>
            
            {loading ? (
              <div className="p-12 text-center text-slate-500">Loading services...</div>
            ) : (
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {displayServices.slice(0, 8).map((service: any, index: number) => {
                  const IconComponent = getIcon(service.icon);
                  const theme = iconThemes[index % iconThemes.length];
                  return (
                    <motion.div variants={fadeInUp} key={service.id} className="h-full">
                      <Link to={`/services/${service.slug}`} className="group bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-[0_10px_30px_rgba(123,44,191,0.08)] hover:border-[#F5E8FF] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full relative overflow-hidden">
                        <div className={`${theme.bg} ${theme.text} p-4 rounded-2xl transition-all duration-300 group-hover:scale-105 w-max mb-5`}>
                          <IconComponent size={28} />
                        </div>
                        <h4 className="font-bold text-xl text-[#17345E] mb-2">{service.title}</h4>
                        <p className="text-slate-600 leading-relaxed mb-6">{service.shortDescription}</p>
                        <div className={`mt-auto font-semibold ${theme.text} flex items-center group-hover:translate-x-2 transition-transform`}>
                          Learn More <ArrowRight size={16} className="ml-2" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
            
            <div className="text-center mt-12">
              <Link to="/services" className="inline-flex items-center text-[#4D2A7A] font-bold hover:text-[#7B2CBF] transition-colors group">
                View All Services <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. COMPASSION SECTION */}
        <section className="py-20 lg:py-28 bg-[#FFF8FB] border-y border-[#FDF2F7] overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideInLeft}>
                <h2 className="text-3xl md:text-[2.5rem] font-bold text-[#17345E] leading-[1.2] mb-6">
                  Compassionate Care That <br />
                  <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF5C7A,#FF9B43)]">Feels Like Family</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  SilverCare believes every senior deserves to age with dignity, comfort and independence. Our healthcare professionals and caregivers provide medical support alongside genuine companionship, helping families feel confident that their loved ones are in safe hands.
                </p>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    "Healthcare at home",
                    "Single-point coordination",
                    "Trained & verified caregivers",
                    "Transparent pricing",
                    "Doctor-led care plans",
                    "Personalised support"
                  ].map((benefit, i) => (
                    <motion.div variants={fadeInUp} key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-[#F5E8FF] rounded-full p-1"><Check size={14} className="text-[#7B2CBF]" /></div>
                      <span className="text-slate-700 font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideInRight}
                className="relative rounded-[32px] overflow-hidden shadow-2xl group"
              >
                <img 
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200&fmt=webp" 
                  alt="Professional interacting warmly with senior" 
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-[#FF4F81] mix-blend-color opacity-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. WHY SILVERCARE */}
        <section className="py-20 lg:py-28 bg-[#FAF5FF]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#17345E] mb-4">Why families choose <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B6B,#9D4EDD)]">SilverCare</span></h2>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Verified Professionals", icon: ShieldCheck, desc: "Background-checked and trained healthcare professionals." },
                { title: "Personalised Care Plans", icon: FileText, desc: "Care designed around the individual's health and daily needs." },
                { title: "Doctor-Guided Support", icon: Stethoscope, desc: "Care plans coordinated with qualified healthcare professionals." },
                { title: "One Point of Coordination", icon: Users, desc: "Families don't have to manage multiple service providers." },
                { title: "Transparent Care", icon: Activity, desc: "Clear communication and straightforward service information." },
                { title: "Care With Dignity", icon: Heart, desc: "Support that respects the senior's comfort, privacy and independence." }
              ].map((feature, i) => (
                <motion.div variants={fadeInUp} key={i} className="bg-white border border-[#EFE5F7] p-8 rounded-[24px] hover:shadow-[0_10px_30px_rgba(123,44,191,0.06)] hover:-translate-y-1 transition-all group">
                  <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 origin-left inline-block">
                    <feature.icon size={32} className="text-[#9D4EDD] mb-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[#17345E] mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. HOW IT WORKS */}
        <section className="py-20 lg:py-28 bg-[#FFF2F8] overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-16 text-[#17345E]">Quality care, without the complexity.</motion.h2>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-4 gap-8 relative max-w-5xl mx-auto">
              <motion.div 
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                style={{ transformOrigin: "left" }} 
                className="hidden md:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-[#F4C7DB] z-0"
              ></motion.div>
              
              {[
                { step: "01", title: "Tell us what you need", color: "bg-[#7B2CBF]" },
                { step: "02", title: "Speak with our care coordinator", color: "bg-[#FF4F81]" },
                { step: "03", title: "We match the right professional", color: "bg-[#FF9F43]" },
                { step: "04", title: "Care begins at your home", color: "bg-[#7B2CBF]" }
              ].map((item, i) => (
                <motion.div variants={fadeInUp} key={i} className="relative z-10 flex flex-col items-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className={`w-20 h-20 ${item.color} rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xl mb-6 shadow-xl transition-transform`}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-lg font-bold w-3/4 leading-snug text-[#17345E]">{item.title}</h3>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mt-16">
              <Link to="/book">
                <Button size="lg" className="bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] hover:opacity-90 border-0 text-white font-bold text-lg h-14 px-10 rounded-xl shadow-[0_8px_20px_rgba(123,44,191,0.22)] transition-transform hover:-translate-y-0.5 active:scale-95 group">
                  Book Your Care Consultation
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 7. TRUST / STATISTICS */}
        <section className="py-20 bg-white border-b border-[#EFE5F7]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#EFE5F7]">
              <motion.div variants={fadeInUp} className="px-4">
                <div className="text-4xl lg:text-5xl font-extrabold text-[#17345E] mb-2">5,000+</div>
                <div className="text-slate-500 font-medium">Families Supported</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="px-4">
                <div className="text-4xl lg:text-5xl font-extrabold text-[#17345E] mb-2">200+</div>
                <div className="text-slate-500 font-medium">Care Professionals</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="px-4">
                <div className="text-4xl lg:text-5xl font-extrabold text-[#17345E] mb-2">12</div>
                <div className="text-slate-500 font-medium">Cities Served</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="px-4">
                <div className="text-4xl lg:text-5xl font-extrabold text-[#17345E] mb-2">4.9/5</div>
                <div className="text-slate-500 font-medium">Family Satisfaction</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        {!loading && testimonials.length > 0 && (
          <section className="py-24 bg-[#FFF8FB]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#17345E]">What families say about SilverCare</h2>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.slice(0, 3).map((testimonial) => (
                  <motion.div variants={fadeInUp} key={testimonial.id} className="bg-white p-8 rounded-[24px] shadow-sm border border-[#F4C7DB] flex flex-col hover:shadow-md transition-shadow">
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
        )}

        {/* 9. SERVICE AREA CHECKER */}
        <section className="py-20 bg-white">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-[#17345E] mb-4">Bringing care closer to home</h2>
            <p className="text-slate-600 mb-10 text-lg">Check service availability in your area.</p>
            <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-4">
              <input 
                type="text" 
                placeholder="Enter your city or PIN code" 
                className="w-full px-5 py-4 bg-[#FAF5FF] border border-[#EFE5F7] rounded-xl outline-none focus:border-[#D946EF] focus:ring-2 focus:ring-[#F5E8FF] transition-all text-slate-700"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
              <Button className="bg-[#17345E] hover:bg-[#2A1E59] text-white h-[56px] px-8 rounded-xl font-bold hover:-translate-y-0.5 active:scale-95 transition-transform">
                Check Availability
              </Button>
            </div>
          </motion.div>
        </section>

        {/* 10. BOOKING CTA */}
        <section className="py-24 bg-[linear-gradient(135deg,#4B2378_0%,#7B2CBF_50%,#D64B8F_100%)] text-white relative overflow-hidden">
          <motion.div 
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
            className="absolute inset-0 opacity-[0.05]" 
            style={{ backgroundImage: 'radial-gradient(#FFF 2px, transparent 2px)', backgroundSize: '40px 40px' }}
          ></motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Not sure what kind of care your loved one needs?</h2>
            <p className="text-lg text-white/90 mb-10 leading-relaxed">
              Tell us what your loved one needs and our care team will help you understand the most suitable SilverCare service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/book" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#7B2CBF] font-bold h-14 px-10 rounded-xl text-lg shadow-lg shadow-[#4B2378]/30 hover:-translate-y-0.5 active:scale-95 transition-transform group">
                  Book a Home Visit
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[linear-gradient(90deg,#FF7A45,#FF9E4A)] border-0 text-white hover:opacity-90 font-bold h-14 px-10 rounded-xl text-lg shadow-lg shadow-[#4B2378]/30 hover:-translate-y-0.5 active:scale-95 transition-transform group">
                  Request a Call Back
                  <ArrowRight size={18} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-white/80">
              Or call us directly at <a href="tel:+918001480075" className="text-white font-bold hover:text-[#FF9E4A] transition-colors">+91 800-14-800-75</a>
            </p>
          </motion.div>
        </section>

      </div>
    </>
  );
}
"""

with open('src/pages/public/Home.tsx', 'w') as f:
    f.write(content)
